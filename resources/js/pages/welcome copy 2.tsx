import { Model } from '@/components/Card/Card';
import { dashboard, login } from '@/routes';
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
                <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-[#f7f7f5] to-[#ececf0] p-6">
                    <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        {/* === COLUMNA IZQUIERDA: TEXTO === */}
                        <div className="animate-fade-up flex flex-col gap-6">
                            <h1 className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent lg:text-5xl dark:from-blue-400 dark:to-purple-500">
                                Bienvenidos al Gift Card de Importadora Miranda
                            </h1>

                            <p className="text-lg leading-relaxed text-[#1b1b18]/80 dark:text-[#f5f5f5]/70">
                                Explora nuestro sistema de tarjetas digitales
                                para compras más rápidas, seguras y modernas.
                                Cada tarjeta está diseñada para facilitar tu
                                experiencia dentro de nuestra tienda.
                            </p>

                            <div className="mt-2 flex gap-4">
                                <Link
                                    href={login()}
                                    className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg dark:bg-blue-500 dark:hover:bg-blue-600"
                                >
                                    Iniciar Sesión
                                </Link>

                                <Link
                                    href="/"
                                    className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                                >
                                    Más Información
                                </Link>
                            </div>
                        </div>

                        {/* === COLUMNA DERECHA: MODELO 3D === */}
                        <div className="flex items-center justify-center">
                            <div className="h-[380px] w-full max-w-[360px] overflow-hidden rounded-2xl border-0 bg-transparent shadow-none sm:h-[420px] sm:max-w-[420px] lg:h-[520px] lg:max-w-[520px]">
                                <Canvas
                                    className="!rounded-none !border-none bg-transparent !shadow-none !outline-none"
                                    camera={{ position: [18, 23, 18], fov: 25 }}
                                >
                                    <Suspense fallback={null}>
                                        <ambientLight intensity={1.2} />
                                        <directionalLight
                                            position={[10, 10, 5]}
                                            intensity={1}
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
                    </div>
                </div>

                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
