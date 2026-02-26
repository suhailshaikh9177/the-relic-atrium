import React, { useRef, useEffect, useCallback, useState } from 'react';

/*
  WebGL Video Stage with real pixel displacement.
  The cursor acts as a finger through a pond — displacing video pixels
  outward from the trail path, with momentum and gradual settling.
*/

interface TrailPoint {
    nx: number; // normalized 0-1
    ny: number;
    strength: number;
}

const MAX_TRAIL = 32;

// Vertex shader — fullscreen quad
const VERT_SRC = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
    v_uv = a_position * 0.5 + 0.5;
    v_uv.y = 1.0 - v_uv.y; // flip Y for video
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// Fragment shader — displacement from trail points
const FRAG_SRC = `
precision mediump float;
uniform sampler2D u_video;
uniform vec2 u_trail[${MAX_TRAIL}];
uniform float u_strength[${MAX_TRAIL}];
uniform int u_trailCount;
uniform float u_aspect;
varying vec2 v_uv;

void main() {
    vec2 totalDisp = vec2(0.0);

    for (int i = 0; i < ${MAX_TRAIL}; i++) {
        if (i >= u_trailCount) break;

        vec2 trailPos = u_trail[i];
        float str = u_strength[i];

        // Aspect-corrected distance
        vec2 diff = v_uv - trailPos;
        diff.x *= u_aspect;
        float dist = length(diff);

        // Ripple: displacement ring around trail point
        float ring = smoothstep(0.12, 0.02, dist);
        float wave = sin(dist * 40.0 - str * 2.0) * 0.5 + 0.5;
        float influence = ring * str * (0.6 + wave * 0.4);

        vec2 dir = normalize(diff + 0.0001);
        totalDisp += dir * influence;
    }

    // Apply displacement to UV
    vec2 uv = v_uv + totalDisp * 0.035;
    uv = clamp(uv, 0.0, 1.0);

    vec4 color = texture2D(u_video, uv);

    gl_FragColor = color;
}
`;

interface VideoStageProps {
    videoSrc: string;
    accentColor: string;
    isActive: boolean;
    index: number;
    onExpand: () => void;
}

export const VideoStage: React.FC<VideoStageProps> = ({
    videoSrc,
    accentColor,
    isActive,
    index: _index,
    onExpand,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const glRef = useRef<WebGLRenderingContext | null>(null);
    const programRef = useRef<WebGLProgram | null>(null);
    const textureRef = useRef<WebGLTexture | null>(null);
    const trailRef = useRef<TrailPoint[]>([]);
    const animRef = useRef(0);
    const prevMouseRef = useRef({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const uniformsRef = useRef<{
        trail: WebGLUniformLocation | null;
        strength: WebGLUniformLocation | null;
        trailCount: WebGLUniformLocation | null;
        aspect: WebGLUniformLocation | null;
        video: WebGLUniformLocation | null;
    }>({ trail: null, strength: null, trailCount: null, aspect: null, video: null });

    // Init WebGL
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        const video = videoRef.current;
        if (!canvas || !container || !video) return;

        const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: false });
        if (!gl) return;
        glRef.current = gl;

        // Compile shaders
        const vs = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vs, VERT_SRC);
        gl.compileShader(vs);

        const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fs, FRAG_SRC);
        gl.compileShader(fs);

        const prog = gl.createProgram()!;
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);
        gl.useProgram(prog);
        programRef.current = prog;

        // Fullscreen quad
        const verts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
        const aPos = gl.getAttribLocation(prog, 'a_position');
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

        // Video texture
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        textureRef.current = tex;

        // Uniforms
        uniformsRef.current = {
            trail: gl.getUniformLocation(prog, 'u_trail'),
            strength: gl.getUniformLocation(prog, 'u_strength'),
            trailCount: gl.getUniformLocation(prog, 'u_trailCount'),
            aspect: gl.getUniformLocation(prog, 'u_aspect'),
            video: gl.getUniformLocation(prog, 'u_video'),
        };

        gl.uniform1i(uniformsRef.current.video, 0);

        // Resize
        const resize = () => {
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform1f(uniformsRef.current.aspect!, canvas.width / canvas.height);
        };
        resize();
        const resizeObs = new ResizeObserver(resize);
        resizeObs.observe(container);

        // Mouse tracking
        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

            const dx = e.clientX - prevMouseRef.current.x;
            const dy = e.clientY - prevMouseRef.current.y;
            const speed = Math.sqrt(dx * dx + dy * dy);
            prevMouseRef.current = { x: e.clientX, y: e.clientY };

            if (speed > 1.5) {
                trailRef.current.push({
                    nx: x / rect.width,
                    ny: y / rect.height,
                    strength: Math.min(0.3 + speed * 0.015, 1.0),
                });
                if (trailRef.current.length > MAX_TRAIL) {
                    trailRef.current.shift();
                }
            }
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Render loop
        let videoReady = false;
        video.addEventListener('playing', () => { videoReady = true; });
        if (!video.paused) videoReady = true;

        const render = () => {
            animRef.current = requestAnimationFrame(render);

            // Decay trail
            for (let i = trailRef.current.length - 1; i >= 0; i--) {
                trailRef.current[i].strength -= 0.008;
                if (trailRef.current[i].strength <= 0) {
                    trailRef.current.splice(i, 1);
                }
            }

            if (!videoReady || video.readyState < 2) return;

            // Update video texture
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);

            // Upload trail data
            const count = trailRef.current.length;
            const positions = new Float32Array(MAX_TRAIL * 2);
            const strengths = new Float32Array(MAX_TRAIL);

            for (let i = 0; i < count; i++) {
                const t = trailRef.current[i];
                positions[i * 2] = t.nx;
                positions[i * 2 + 1] = t.ny;
                strengths[i] = t.strength;
            }

            gl.uniform2fv(uniformsRef.current.trail, positions);
            gl.uniform1fv(uniformsRef.current.strength, strengths);
            gl.uniform1i(uniformsRef.current.trailCount, count);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };

        animRef.current = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener('mousemove', handleMouseMove);
            resizeObs.disconnect();
            gl.deleteProgram(prog);
            gl.deleteShader(vs);
            gl.deleteShader(fs);
            gl.deleteTexture(tex);
            gl.deleteBuffer(buf);
        };
    }, []);

    // Play/pause
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        if (isActive) {
            video.play().catch(() => { });
        } else {
            video.pause();
        }
    }, [isActive]);

    // Signal CursorTrail to hide when hovering video
    useEffect(() => {
        if (isHovered) {
            document.body.setAttribute('data-cursor-over-video', 'true');
        } else {
            document.body.removeAttribute('data-cursor-over-video');
        }
        return () => { document.body.removeAttribute('data-cursor-over-video'); };
    }, [isHovered]);

    const handleClick = useCallback(() => {
        onExpand();
    }, [onExpand]);

    return (
        <div
            ref={containerRef}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                position: 'relative',
                width: '85%',
                aspectRatio: '16 / 9',
                maxHeight: '70vh',
                overflow: 'hidden',
                borderRadius: 3,
                cursor: 'none',
                WebkitMaskImage: 'radial-gradient(ellipse 90% 85% at 50% 50%, black 60%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse 90% 85% at 50% 50%, black 60%, transparent 100%)',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            }}
        >
            {/* Hidden video element — feeds WebGL texture */}
            <video
                ref={videoRef}
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                crossOrigin="anonymous"
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0,
                    pointerEvents: 'none',
                }}
            />

            {/* WebGL canvas — renders distorted video */}
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    mixBlendMode: 'screen',
                }}
            />

            {/* Accent glow */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(ellipse at center, ${accentColor}08 0%, transparent 60%)`,
                pointerEvents: 'none',
            }} />

            {/* Hover border */}
            <div style={{
                position: 'absolute',
                inset: 0,
                border: `1px solid ${isHovered ? `${accentColor}25` : 'rgba(255,255,255,0.04)'}`,
                borderRadius: 3,
                pointerEvents: 'none',
                transition: 'border-color 0.4s ease',
                zIndex: 3,
            }} />
        </div>
    );
};
