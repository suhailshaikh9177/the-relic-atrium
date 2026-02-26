import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import { TextureLoader, Mesh, ShaderMaterial, Texture, Color } from 'three';

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
    vUv = uv;
    vPosition = position;
    // No more movement
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTextureCurrent;
uniform vec3 uColor;
uniform vec2 uImageSize; // (width, height)
uniform vec2 uPlaneSize;

varying vec2 vUv;

void main() {
    // Preserve aspect ratio mapping
    vec2 ratio = vec2(
        min((uPlaneSize.x / uPlaneSize.y) / (uImageSize.x / uImageSize.y), 1.0),
        min((uPlaneSize.y / uPlaneSize.x) / (uImageSize.y / uImageSize.x), 1.0)
    );
    
    vec2 uv = vec2(
        vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    vec4 color = texture2D(uTextureCurrent, uv);
    
    // Completely removed vignette/dark edges
    gl_FragColor = color;
}
`;

interface RefractiveCanvasProps {
    imageUrl: string;
    wingColor: string;
}


const ShaderScene = ({ imageUrl, wingColor }: RefractiveCanvasProps) => {
    const meshRef = useRef<Mesh>(null);
    const materialRef = useRef<ShaderMaterial>(null);

    const [textureCurrent, setTextureCurrent] = useState<Texture | null>(null);
    const [imageSize, setImageSize] = useState([1, 1]);

    // Handle Image Loading
    useEffect(() => {
        if (!imageUrl) return;

        const loader = new TextureLoader();
        loader.load(imageUrl, (tex) => {
            setTextureCurrent(tex);
            setImageSize([tex.image.width, tex.image.height]);
        });
    }, [imageUrl]);

    const uniforms = useMemo(() => ({
        uTextureCurrent: { value: null },
        uColor: { value: new Color(wingColor) },
        uImageSize: { value: [1, 1] },
        uPlaneSize: { value: [6, 6] } // Logical plane size matching the mesh scale
    }), [wingColor]);

    useFrame(() => {
        if (!materialRef.current || !meshRef.current) return;
        // Stop movement completely here.
        if (textureCurrent) {
            materialRef.current.uniforms.uTextureCurrent.value = textureCurrent;
            materialRef.current.uniforms.uImageSize.value = imageSize;
        }
    });

    return (
        <mesh ref={meshRef} scale={[6, 6, 1]}>
            <planeGeometry args={[1, 1, 1, 1]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
            />
        </mesh>
    );
};

export const RefractiveImage: React.FC<RefractiveCanvasProps> = ({ imageUrl, wingColor }) => {
    return (
        <div style={{ width: '100%', height: '100%', cursor: 'crosshair', zIndex: 10 }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ alpha: true, antialias: true }}
                style={{ width: '100%', height: '100%' }}
            >
                <ShaderScene imageUrl={imageUrl} wingColor={wingColor} />
            </Canvas>
        </div>
    );
};
