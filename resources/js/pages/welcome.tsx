import { Model } from '@/components/Card/Card';
import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';

function AnimatedModel() {
    const ref = useRef<any>(null);
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.5;
        }
    });
    return <Model ref={ref} />;
}

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Iniciar Sesion
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* Contenedor central que mantiene el Canvas perfectamente centrado */}
                <div className="mt-10 flex w-full items-center justify-center lg:mt-0 lg:grow">
                    <div className="flex h-[420px] w-full max-w-[420px] items-center justify-center lg:h-[520px] lg:max-w-[520px]">
                        <Canvas
                            camera={{ position: [15, 20, 15], fov: 45 }}
                            className="rounded-xl"
                        >
                            <Suspense fallback={null}>
                                <ambientLight intensity={0.7} />
                                <directionalLight
                                    position={[10, 10, 5]}
                                    intensity={4}
                                />
                                <AnimatedModel />
                                <OrbitControls
                                    enableZoom={false}
                                    enablePan={false}
                                />
                            </Suspense>
                        </Canvas>
                    </div>
                </div>

                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
