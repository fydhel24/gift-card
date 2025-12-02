import { Model } from '@/components/Card/Card';
import { Particles } from '@/components/ui/particles'; // ajusta la ruta si es necesario
import { dashboard, login } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Environment, Float, OrbitControls } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';

// === Particles ===

// === Animated & Glowing Model ===
function GlowingModel() {
    const ref = useRef<any>(null);
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
            <Model ref={ref} />
        </Float>
    );
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

            {/* Fondo oscuro con partículas */}
            <div
                className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-900 p-6 text-gray-100 dark:bg-slate-950"
                style={{
                    fontFamily: "'Instrument Sans', system-ui, sans-serif",
                }}
            >
                {/* Partículas como fondo */}
                <Particles
                    className="absolute inset-0"
                    quantity={100}
                    ease={80}
                    color="#ffffff"
                    refresh
                />
                <header className="mb-8 w-full max-w-6xl self-end lg:mb-12">
                    <nav className="flex justify-end">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="rounded-full bg-gray-800 px-5 py-2 text-sm font-medium text-gray-200 shadow-sm ring-1 ring-gray-700 transition-all hover:bg-gray-700 hover:ring-gray-600"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={login()}
                                className="rounded-full bg-gray-800 px-5 py-2 text-sm font-medium text-gray-200 shadow-sm ring-1 ring-gray-700 transition-all hover:bg-gray-700 hover:ring-gray-600"
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
                            <h1 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
                                Bienvenidos al{' '}
                                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    Gift Card
                                </span>{' '}
                                de Importadora Miranda
                            </h1>

                            <p className="text-lg leading-relaxed text-gray-300">
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
                                    className="rounded-lg border border-gray-600 bg-gray-800 px-6 py-3 text-sm font-semibold text-gray-200 shadow-sm transition-all hover:bg-gray-700"
                                >
                                    Más Información
                                </Link>
                            </div>
                        </div>

                        {/* === COLUMNA DERECHA: MODELO 3D === */}
                        <div className="flex items-center justify-center">
                            <div className="h-[420px] w-full max-w-[420px] overflow-hidden">
                                <Canvas
                                    className="h-full w-full !border-none !outline-none"
                                    camera={{ position: [18, 23, 18], fov: 20 }}
                                    gl={{
                                        antialias: true,
                                        alpha: true,
                                        preserveDrawingBuffer: true,
                                    }}
                                >
                                    <Suspense fallback={null}>
                                        <ambientLight intensity={0.6} />
                                        <pointLight
                                            position={[10, 10, 10]}
                                            intensity={1.2}
                                            color="#ec4899"
                                        />
                                        <pointLight
                                            position={[-10, -5, 5]}
                                            intensity={0.8}
                                            color="#8b5cf6"
                                        />
                                        <directionalLight
                                            position={[5, 5, 5]}
                                            intensity={1}
                                        />
                                        <Environment preset="city" />
                                        <GlowingModel />
                                        <OrbitControls
                                            enableZoom={false}
                                            enablePan={false}
                                            autoRotate
                                            autoRotateSpeed={0.8}
                                        />
                                    </Suspense>

                                    <EffectComposer renderPriority={1}>
                                        <Bloom
                                            luminanceThreshold={0.2}
                                            luminanceSmoothing={0.9}
                                            intensity={0.6}
                                        />
                                    </EffectComposer>
                                </Canvas>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="mt-12 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} Importadora Miranda. Todos los
                    derechos reservados.
                </footer>
            </div>
        </>
    );
}
