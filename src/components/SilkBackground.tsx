import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// =============================================================================
// MAROON SILK DRAPE — Spline "Purple Web" faithful recreation
//
// Key visual characteristics from reference:
// - Multiple sheet-like mesh surfaces draped like curtains around the viewer
// - Ultra-fine wireframe lines (very dense grid = fine netting)
// - Volumetric glow filling the space between/behind layers
// - Smooth flowing folds, mostly vertical (curtain-like)  
// - Very close camera, immersive, almost inside the mesh
// - Rich purple/maroon with bright glow on fold peaks
// =============================================================================

const noiseGLSL = `
    vec3 mod289v3(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289v2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permutev3(vec3 x) { return mod289v3(((x*34.0)+1.0)*x); }
    float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289v2(i);
        vec3 p = permutev3(permutev3(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m; m = m*m;
        vec3 x2 = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x2) - 0.5;
        vec3 ox = floor(x2 + 0.5);
        vec3 a0 = x2 - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
    }
`;

// Vertex shader: displaces along normal to create billowing cloth folds
const makeVertexShader = (seed: number) => `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uScroll;

    varying vec2 vUv;
    varying float vDisplacement;
    varying vec3 vNormal2;
    varying vec3 vViewPos;
    varying float vFresnel;

    ${noiseGLSL}

    void main() {
        vUv = uv;
        vec3 pos = position;
        vec3 norm = normal;

        float seed = ${seed.toFixed(1)};

        // Large flowing folds
        float d1 = snoise(vec2(uv.x * 1.5 + uTime * 0.08 + seed, uv.y * 2.0 - uTime * 0.06)) * 1.2;
        float d2 = snoise(vec2(uv.x * 3.0 - uTime * 0.05 + seed * 1.3, uv.y * 1.5 + uTime * 0.1)) * 0.6;
        float d3 = snoise(vec2(uv.x * 0.8 + uv.y * 0.5 + uTime * 0.03 + seed * 2.0, uTime * 0.04)) * 0.8;
        // Fine fabric ripple  
        float d4 = snoise(vec2(uv.x * 6.0 + uTime * 0.15, uv.y * 5.0 - uTime * 0.1 + seed)) * 0.15;

        // Cursor interaction — push geometry along normal near mouse
        vec3 worldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
        vec2 mouseWorld = vec2(uMouse.x * 4.0, uMouse.y * 3.0);
        float distToMouse = length(worldPos.xy - mouseWorld);
        float cursorPush = 0.8 * exp(-distToMouse * distToMouse / 3.0);

        float totalDisp = d1 + d2 + d3 + d4 + cursorPush;

        // Dampen on scroll
        float scrollDamp = 1.0 - smoothstep(0.0, 0.7, uScroll);
        totalDisp *= scrollDamp;
        vDisplacement = totalDisp;

        // Displace along normal (not just Y — this creates cloth-like billowing)
        pos += norm * totalDisp * 0.5;

        // Recompute normal
        float eps = 0.02;
        float dx = snoise(vec2((uv.x + eps) * 1.5 + uTime * 0.08 + seed, uv.y * 2.0 - uTime * 0.06))
                 - snoise(vec2((uv.x - eps) * 1.5 + uTime * 0.08 + seed, uv.y * 2.0 - uTime * 0.06));
        float dy = snoise(vec2(uv.x * 1.5 + uTime * 0.08 + seed, (uv.y + eps) * 2.0 - uTime * 0.06))
                 - snoise(vec2(uv.x * 1.5 + uTime * 0.08 + seed, (uv.y - eps) * 2.0 - uTime * 0.06));
        vec3 pertNormal = normalize(norm + vec3(-dx, -dy, 0.0) * 3.0);
        vNormal2 = normalize(normalMatrix * pertNormal);

        vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
        vViewPos = -mvPos.xyz;

        // Fresnel
        vec3 viewDir = normalize(-mvPos.xyz);
        vFresnel = pow(1.0 - abs(dot(normalize(normalMatrix * norm), viewDir)), 2.5);

        gl_Position = projectionMatrix * mvPos;
    }
`;

const fragmentShader = `
    uniform float uTime;
    uniform float uScroll;
    uniform vec3 uColor;
    uniform vec3 uGlowColor;
    uniform float uOpacity;

    varying vec2 vUv;
    varying float vDisplacement;
    varying vec3 vNormal2;
    varying vec3 vViewPos;
    varying float vFresnel;

    void main() {
        vec3 normal = normalize(vNormal2);
        vec3 viewDir = normalize(vViewPos);

        // Lighting — multiple lights for rich illumination
        vec3 light1 = normalize(vec3(1.0, 1.0, 0.5));
        vec3 light2 = normalize(vec3(-0.5, 0.5, 1.0));

        float diff1 = max(dot(normal, light1), 0.0);
        float diff2 = max(dot(normal, light2), 0.0);
        float diff = diff1 * 0.7 + diff2 * 0.3;

        // Specular sheen
        vec3 half1 = normalize(light1 + viewDir);
        float spec = pow(max(dot(normal, half1), 0.0), 60.0) * 0.5;
        float broadSpec = pow(max(dot(normal, half1), 0.0), 12.0) * 0.2;

        // Displacement-based brightness (fold peaks glow)
        float dispGlow = smoothstep(0.0, 2.0, vDisplacement);

        // Build color
        vec3 color = uColor * 0.15; // Deep base

        // Diffuse lighting reveals the color
        color += uColor * diff * 0.5;

        // Fold peaks get a brighter, glowing treatment  
        color += uGlowColor * dispGlow * 0.4;

        // Specular highlights
        color += uGlowColor * (spec + broadSpec);

        // Fresnel rim glow — edges catch light beautifully
        color += uGlowColor * vFresnel * 0.6;

        // Scroll fade
        float fadeOut = smoothstep(0.1, 0.8, uScroll);
        color = mix(color, vec3(0.0), fadeOut);

        // Alpha: visible based on lighting + fresnel
        float alpha = uOpacity * (0.3 + diff * 0.35 + vFresnel * 0.5 + dispGlow * 0.25);
        alpha *= (1.0 - fadeOut);

        gl_FragColor = vec4(color, alpha);
    }
`;

// ========================
// DRAPED MESH LAYER
// ========================
interface DrapeProps {
    seed: number;
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
    color: string;
    glowColor: string;
    opacity: number;
    segments: [number, number];
    globalMouse: { x: number; y: number };
    scrollProgress: number;
}

const DrapedMesh: React.FC<DrapeProps> = ({
    seed, position, rotation, scale, color, glowColor, opacity,
    segments, globalMouse, scrollProgress,
}) => {
    const matRef = useRef<THREE.ShaderMaterial>(null);
    const smoothMouse = useRef(new THREE.Vector2(0, 0));

    const shaderArgs = useMemo(
        () => ({
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2(0, 0) },
                uScroll: { value: 0 },
                uColor: { value: new THREE.Color(color) },
                uGlowColor: { value: new THREE.Color(glowColor) },
                uOpacity: { value: opacity },
            },
            vertexShader: makeVertexShader(seed),
            fragmentShader,
            transparent: true,
            wireframe: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        }),
        [seed, color, glowColor, opacity]
    );

    useFrame((state) => {
        if (!matRef.current) return;
        matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        matRef.current.uniforms.uScroll.value = scrollProgress;

        smoothMouse.current.x += (globalMouse.x - smoothMouse.current.x) * 0.04;
        smoothMouse.current.y += (globalMouse.y - smoothMouse.current.y) * 0.04;
        matRef.current.uniforms.uMouse.value.copy(smoothMouse.current);
    });

    return (
        <mesh position={position} rotation={rotation} scale={scale}>
            <planeGeometry args={[6, 8, segments[0], segments[1]]} />
            <shaderMaterial ref={matRef} attach="material" args={[shaderArgs]} />
        </mesh>
    );
};

// ========================
// EXPORTED COMPONENT
// ========================
interface SilkBackgroundProps {
    globalMouse?: { x: number; y: number };
    scrollProgress?: number;
}

export const SilkBackground: React.FC<SilkBackgroundProps> = (props) => {
    const { globalMouse = { x: 0, y: 0 }, scrollProgress = 0 } = props;

    const richMaroon = '#6b1020';
    const brightCrimson = '#c02040';

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                background: '#030101',
                overflow: 'hidden',
                pointerEvents: 'none',
            }}
        >
            {/* Volumetric maroon glow 1 — center */}
            <div style={{
                position: 'absolute',
                top: '40%', left: '45%',
                transform: 'translate(-50%, -50%)',
                width: '80vw', height: '70vh',
                background: 'radial-gradient(ellipse, rgba(120,20,35,0.5) 0%, rgba(80,12,20,0.25) 35%, transparent 65%)',
                zIndex: 0, pointerEvents: 'none', filter: 'blur(50px)',
            }} />
            {/* Volumetric glow 2 — upper right */}
            <div style={{
                position: 'absolute',
                top: '20%', right: '10%',
                width: '40vw', height: '40vh',
                background: 'radial-gradient(ellipse, rgba(140,25,45,0.35) 0%, transparent 60%)',
                zIndex: 0, pointerEvents: 'none', filter: 'blur(60px)',
            }} />
            {/* Volumetric glow 3 — lower left */}
            <div style={{
                position: 'absolute',
                bottom: '15%', left: '15%',
                width: '35vw', height: '35vh',
                background: 'radial-gradient(ellipse, rgba(100,15,30,0.4) 0%, transparent 60%)',
                zIndex: 0, pointerEvents: 'none', filter: 'blur(50px)',
            }} />

            {/* Vignette */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(3,1,1,0.15) 50%, rgba(3,1,1,0.7) 100%)',
                zIndex: 2, pointerEvents: 'none',
            }} />

            <Canvas
                camera={{ position: [0, 0, 2.8], fov: 75, near: 0.1, far: 30 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                dpr={[1, 1.5]}
                style={{ zIndex: 1 }}
            >
                {/* Single full-viewport mesh */}
                <DrapedMesh
                    seed={0}
                    position={[0, 0, -0.5]}
                    rotation={[-0.15, 0, 0]}
                    scale={[1.6, 1.4, 1]}
                    color={richMaroon}
                    glowColor={brightCrimson}
                    opacity={0.85}
                    segments={[160, 200]}
                    globalMouse={globalMouse}
                    scrollProgress={scrollProgress}
                />
            </Canvas>
        </div>
    );
};
