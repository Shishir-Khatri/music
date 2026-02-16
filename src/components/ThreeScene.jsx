import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const mouse = { x: 0, y: 0 };
        const floatingMeshes = [];
        const clock = new THREE.Clock();

        camera.position.z = 30;

        // Create particles
        const particleCount = 150;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const color1 = new THREE.Color(0x8b5cf6);
        const color2 = new THREE.Color(0x06b6d4);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 80;
            positions[i + 1] = (Math.random() - 0.5) * 80;
            positions[i + 2] = (Math.random() - 0.5) * 40;
            const mixRatio = Math.random();
            const color = color1.clone().lerp(color2, mixRatio);
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.15,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const particleSystem = new THREE.Points(geometry, material);
        scene.add(particleSystem);

        // Create floating geometry
        const geometries = [
            new THREE.IcosahedronGeometry(1, 0),
            new THREE.OctahedronGeometry(0.8, 0),
            new THREE.TetrahedronGeometry(0.7, 0),
            new THREE.TorusGeometry(0.6, 0.2, 8, 16),
            new THREE.DodecahedronGeometry(0.6, 0),
        ];

        const floatMaterial = new THREE.MeshBasicMaterial({
            color: 0x8b5cf6,
            wireframe: true,
            transparent: true,
            opacity: 0.08,
        });

        for (let i = 0; i < 8; i++) {
            const geo = geometries[i % geometries.length];
            const mesh = new THREE.Mesh(geo, floatMaterial.clone());
            mesh.position.set(
                (Math.random() - 0.5) * 60,
                (Math.random() - 0.5) * 60,
                (Math.random() - 0.5) * 20 - 5
            );
            mesh.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.01,
                    y: (Math.random() - 0.5) * 0.01,
                    z: (Math.random() - 0.5) * 0.01,
                },
                floatSpeed: Math.random() * 0.5 + 0.5,
                floatAmount: Math.random() * 2 + 1,
                initialY: mesh.position.y
            };
            floatingMeshes.push(mesh);
            scene.add(mesh);
        }

        // Events
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        const onMouseMove = (e) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('resize', onResize);
        window.addEventListener('mousemove', onMouseMove);

        // Animation loop
        let animationId;
        const animate = () => {
            animationId = requestAnimationFrame(animate);
            const elapsed = clock.getElapsedTime();

            if (particleSystem) {
                particleSystem.rotation.y = elapsed * 0.02;
                particleSystem.rotation.x = Math.sin(elapsed * 0.01) * 0.1;
            }

            floatingMeshes.forEach((mesh) => {
                const { rotationSpeed, floatSpeed, floatAmount, initialY } = mesh.userData;
                mesh.rotation.x += rotationSpeed.x;
                mesh.rotation.y += rotationSpeed.y;
                mesh.rotation.z += rotationSpeed.z;
                mesh.position.y = initialY + Math.sin(elapsed * floatSpeed) * floatAmount;
            });

            camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02;
            camera.position.y += (mouse.y * 2 - camera.position.y) * 0.02;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', onMouseMove);
            renderer.dispose();
        };
    }, []);

    return <canvas id="three-canvas" ref={canvasRef}></canvas>;
}
