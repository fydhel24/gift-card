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

            {/* Fondo degradado lila-rosado → blanco */}
            <div
                className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white p-6 text-gray-900 dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-950 dark:to-gray-900 dark:text-gray-100"
                style={{
                    fontFamily: "'Instrument Sans', system-ui, sans-serif",
                }}
            >
                <header className="mb-8 w-full max-w-6xl self-end lg:mb-12">
                    <nav className="flex justify-end">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="rounded-full bg-white px-5 py-2 text-sm font-medium text-gray-800 shadow-sm ring-1 ring-gray-200 transition-all hover:bg-gray-50 hover:ring-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-700 dark:hover:bg-gray-700"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={login()}
                                className="rounded-full bg-white px-5 py-2 text-sm font-medium text-gray-800 shadow-sm ring-1 ring-gray-200 transition-all hover:bg-gray-50 hover:ring-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-700 dark:hover:bg-gray-700"
                            >
                                Iniciar Sesión
                            </Link>
                        )}
                    </nav>
                </header>

                <div className="flex min-h-[calc(100vh-120px)] w-full items-center justify-center">
                    <div className="grid w-full max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
                        {/* === TEXTO === */}
                        <div className="flex flex-col gap-6">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl dark:text-white">
                                Bienvenidos al{' '}
                                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                                    Gift Card
                                </span>{' '}
                                de Importadora Miranda
                            </h1>

                            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                                Descubre una forma más rápida, segura y moderna
                                de realizar tus compras. Nuestras tarjetas
                                digitales están diseñadas para ofrecerte la
                                mejor experiencia en cada transacción.
                            </p>

                            <div className="mt-3 flex flex-wrap gap-3">
                                <Link
                                    href={login()}
                                    className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-gray-900"
                                >
                                    Iniciar Sesión
                                </Link>

                                <Link
                                    href="/"
                                    className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                                >
                                    Más Información
                                </Link>
                            </div>
                        </div>

                        {/* === COLUMNA DERECHA: MODELO 3D === */}
                        <div className="flex items-center justify-center">
                            <div className="h-[380px] w-full max-w-[420px] overflow-hidden sm:h-[420px] lg:h-[500px]">
                                <Canvas
                                    className="h-full w-full !border-none bg-transparent !outline-none"
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

                <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} Importadora Miranda. Todos los
                    derechos reservados.
                </footer>
            </div>
        </>
    );
}
