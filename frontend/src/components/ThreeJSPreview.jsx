"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, RoundedBox } from "@react-three/drei";

function CreditCard() {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (meshRef.current && !hovered) {
            meshRef.current.rotation.y += 0.01;
            meshRef.current.rotation.x =
                Math.sin(state.clock.elapsedTime) * 0.1;
        }
    });

    return (
        <group
            ref={meshRef}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
        >
            {/* Card Base */}
            <RoundedBox
                args={[6.9, 4.14, 0.14]}
                radius={0.15}
                smoothness={4}
                position={[0, 0, 0]}
            >
                <meshStandardMaterial color="#1e40af" />
            </RoundedBox>

            {/* Card Details */}
            <Text
                position={[-2.9, 1.2, 0.084]}
                fontSize={0.414}
                color="white"
                anchorX="left"
                anchorY="middle"
                font="/fonts/Inter-Bold.ttf"
            >
                SecureBank
            </Text>

            {/* Card Number */}
            <Text
                position={[-2.9, -0.45, 0.084]}
                fontSize={0.276}
                color="#93c5fd"
                anchorX="left"
                anchorY="middle"
                font="/fonts/Inter-Regular.ttf"
            >
                4532 9876 1234 5678
            </Text>

            {/* Cardholder Name */}
            <Text
                position={[-2.9, -1.5, 0.084]}
                fontSize={0.18}
                color="#e0e7ef"
                anchorX="left"
                anchorY="middle"
                font="/fonts/Inter-Regular.ttf"
            >
                JOHN DOE
            </Text>

            {/* Expiry Date */}
            <Text
                position={[1.7, -1.5, 0.084]}
                fontSize={0.18}
                color="#e0e7ef"
                anchorX="left"
                anchorY="middle"
                font="/fonts/Inter-Regular.ttf"
            >
                12/27
            </Text>

            {/* VISA Logo */}
            <Text
                position={[2.7, -1.5, 0.084]}
                fontSize={0.207}
                color="white"
                anchorX="center"
                anchorY="middle"
                font="/fonts/Inter-Regular.ttf"
            >
                VISA
            </Text>
        </group>
    );
}

export default function ThreeJSPreview() {
    return (
        <section className="py-16 bg-gradient-to-br from-dark to-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-base mb-4">
                        Experience Modern Banking
                    </h2>
                    <p className="text-xl text-primary">
                        Interactive dashboard and secure card management
                    </p>
                </div>

                <div className="h-96 w-full">
                    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1} />
                        <pointLight
                            position={[-10, -10, -10]}
                            intensity={0.5}
                        />
                        <CreditCard />
                        <OrbitControls
                            enableZoom={false}
                            enablePan={false}
                            autoRotate={false}
                        />
                    </Canvas>
                </div>
            </div>
        </section>
    );
}
