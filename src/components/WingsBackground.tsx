// @ts-nocheck
import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame, Canvas, extend } from '@react-three/fiber';
import { MathUtils, Vector3, Color, IcosahedronGeometry } from 'three';
import { Environment } from '@react-three/drei';
import { EffectComposer, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

extend({ IcosahedronGeometry });

/*
  WingsBackground — Three.js animated blob with Perlin noise displacement.
  Uses multiple wing accent colors that blend together.
  Floats in a dark void with subtle noise post-processing.
*/

const vertexShader = `
uniform float u_intensity;
uniform float u_time;

varying vec2 vUv;
varying float vDisplacement;

vec4 permute(vec4 x) {
    return mod(((x*34.0)+1.0)*x, 289.0);
}

vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec3 P) {
    vec3 Pi0 = floor(P);
    vec3 Pi1 = Pi0 + vec3(1.0);
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P);
    vec3 Pf1 = Pf0 - vec3(1.0);
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
}

void main() {
    vUv = uv;
    vDisplacement = cnoise(position + vec3(2.0 * u_time));
    vec3 newPosition = position + normal * (u_intensity * vDisplacement);
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
}
`;

const fragmentShader = `
uniform float u_intensity;
uniform float u_time;
uniform vec3 u_color;
uniform int u_multiColor;
uniform vec3 u_colors[6]; 

varying vec2 vUv;
varying float vDisplacement;

void main() {
    float distort = 2.0 * vDisplacement * u_intensity * sin(vUv.y * 10.0 + u_time);
    
    vec3 finalColor;

    if (u_multiColor == 1) {
        // Multi-color blend mode (Landing Page)
        // Spatially distribute all 6 colors across the geometry at the same time
        
        // Base spatial gradient using UV and displacement
        float spatialDist = vUv.x * 1.2 + vUv.y * 0.8 + vDisplacement * 1.5 + u_time * 0.2;
        
        // Add some non-linear wrapping to get swirls of colors
        float blendIndex = mod(spatialDist * 2.5, 6.0);
        
        int i0 = int(floor(blendIndex));
        int i1 = i0 + 1;
        if (i1 >= 6) i1 = 0;
        
        float f = fract(blendIndex);
        f = smoothstep(0.0, 1.0, f);
        
        vec3 c0;
        vec3 c1;
        
        // Unroll loop for WebGL 1 compatibility
        if (i0 == 0) c0 = u_colors[0];
        else if (i0 == 1) c0 = u_colors[1];
        else if (i0 == 2) c0 = u_colors[2];
        else if (i0 == 3) c0 = u_colors[3];
        else if (i0 == 4) c0 = u_colors[4];
        else c0 = u_colors[5];
        
        if (i1 == 0) c1 = u_colors[0];
        else if (i1 == 1) c1 = u_colors[1];
        else if (i1 == 2) c1 = u_colors[2];
        else if (i1 == 3) c1 = u_colors[3];
        else if (i1 == 4) c1 = u_colors[4];
        else c1 = u_colors[5];

        vec3 mixedColor = mix(c0, c1, f);
        
        vec3 deepColor = mixedColor * 0.15;
        vec3 highlightColor = mixedColor * 0.8;
        finalColor = mix(deepColor, highlightColor, clamp(distort + 0.3, 0.0, 1.0));

    } else {
        // Single accent color mode (Archive Wings)
        vec3 deepColor = u_color * 0.15;
        vec3 highlightColor = u_color * 0.8;
        finalColor = mix(deepColor, highlightColor, clamp(distort, 0.0, 1.0));
    }
    
    gl_FragColor = vec4(finalColor, 1.0);
}
`;

interface BlobProps {
    color?: string; // Optional — if omitted, uses multi-color mode
}

const WING_COLORS = [
    new Color('#FF8C00'), // Energy
    new Color('#4A90E2'), // Transport
    new Color('#00FF41'), // Computation
    new Color('#00FFFF'), // Communication
    new Color('#D32F2F'), // Warfare
    new Color('#6A0DAD'), // Instruments
];

const LANDING_COLORS = [
    new Color('#800000'), // Maroon
    new Color('#000080'), // Navy Blue
    new Color('#000000'), // Black
    new Color('#800000'), // Maroon
    new Color('#000080'), // Navy Blue
    new Color('#000000'), // Black
];

const Blob: React.FC<BlobProps> = ({ color }) => {
    const mesh = useRef(null);
    const hover = useRef(false);

    // Default to the first color to avoid undefined errors initially if no color passed
    const targetColor = useRef(new Color(color || WING_COLORS[0]));

    const uniforms = useMemo(
        () => ({
            u_time: { value: 0 },
            u_intensity: { value: 0.3 },
            u_color: { value: new Color(color || WING_COLORS[0]) },
            u_multiColor: { value: color ? 0 : 1 },
            u_colors: { value: color ? WING_COLORS : LANDING_COLORS },
        }),
        []
    );

    // Smoothly lerp to new accent color if provided
    useEffect(() => {
        if (color) {
            targetColor.current = new Color(color);
            if (mesh.current) {
                mesh.current.material.uniforms.u_multiColor.value = 0;
                mesh.current.material.uniforms.u_colors.value = WING_COLORS;
            }
        } else {
            if (mesh.current) {
                mesh.current.material.uniforms.u_multiColor.value = 1;
                mesh.current.material.uniforms.u_colors.value = LANDING_COLORS;
            }
        }
    }, [color]);

    const targetPosition = useRef(new Vector3(0, 0, 0));
    const currentPosition = useRef(new Vector3(0, 0, 0));

    useFrame((state) => {
        const { clock, mouse } = state;

        if (mesh.current) {
            const material = mesh.current.material;

            // Slowed down animation (was 0.4)
            material.uniforms.u_time.value = 0.15 * clock.getElapsedTime();

            material.uniforms.u_intensity.value = MathUtils.lerp(
                material.uniforms.u_intensity.value,
                hover.current ? 0.3 : 0.5,
                0.02
            );

            // Smooth color transition for single color mode
            if (color) {
                material.uniforms.u_color.value.lerp(targetColor.current, 0.03);
            }

            // Subtle mouse follow
            targetPosition.current.set(mouse.x * 0.3, mouse.y * 0.3, 0);
            currentPosition.current.lerp(targetPosition.current, 0.03);
            mesh.current.position.copy(currentPosition.current);
        }
    });

    return (
        <mesh
            ref={mesh}
            scale={1.5}
            position={[0, 0, 0]}
            onPointerOver={() => (hover.current = true)}
            onPointerOut={() => (hover.current = false)}
        >
            <icosahedronGeometry args={[2, 20]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
};

interface WingsBackgroundProps {
    accentColor?: string; // Optional -> multi-color if omitted
    activeIndex: number;
}

export const WingsBackground: React.FC<WingsBackgroundProps> = ({ accentColor, activeIndex }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0,
            background: '#000000',
            pointerEvents: 'none',
            opacity: activeIndex === 0 ? 0 : 1,
            visibility: activeIndex === 0 ? 'hidden' : 'visible',
            transition: 'opacity 0.8s ease, visibility 0.8s ease',
        }}>
            <Canvas
                camera={{ position: [0.0, 0.0, 8.0], fov: 15 }}
                style={{ width: '100%', height: '100%' }}
                gl={{ antialias: true, alpha: false }}
            >
                <color attach="background" args={['#000000']} />

                <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    decay={0}
                    intensity={Math.PI}
                />
                <Environment preset="city" environmentIntensity={0.3} />
                <directionalLight intensity={1.5} position={[0, 2, 3]} />

                <Blob color={accentColor} />
            </Canvas>
        </div>
    );
};
