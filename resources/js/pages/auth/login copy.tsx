import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';

// === 3D Imports ===
import { Model } from '@/components/Card/Card';
import { Environment, Float, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Suspense, useRef } from 'react';

// === Animated & Glowing Model ===
function GlowingModel() {
    const ref = useRef<any>(null);
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.3; // rotación más suave
        }
    });

    return (
        <Float
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={0.8}
            stagger={0}
        >
            <Model ref={ref} />
        </Float>
    );
}

// === Login Props ===
interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    return (
        <>
            <Head title="Log in">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <style>{`
                body {
                    font-family: 'Instrument Sans', sans-serif;
                }
                .login-gradient-bg {
                    background: linear-gradient(135deg, #f8f4ff 0%, #fdf2f8 50%, #ffffff 100%);
                }
                @media (prefers-color-scheme: dark) {
                    .login-gradient-bg {
                        background: linear-gradient(135deg, #1a1523 0%, #1f1320 50%, #18181b 100%);
                    }
                }
            `}</style>

            <div className="login-gradient-bg flex min-h-screen items-center justify-center p-4 sm:p-6">
                <div className="grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* === Formulario === */}
                    <div className="flex flex-col justify-center rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-sm sm:p-10 dark:bg-black/60 dark:shadow-none">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                                Inicia sesión
                            </h1>
                        </div>

                        <Form
                            {...store.form()}
                            resetOnSuccess={['password']}
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-6">
                                        <div className="grid gap-2">
                                            <Label
                                                htmlFor="email"
                                                className="text-gray-800 dark:text-gray-200"
                                            >
                                                Correo electrónico
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="email"
                                                placeholder="correo@ejemplo.com"
                                            />
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <div className="flex items-center">
                                                <Label
                                                    htmlFor="password"
                                                    className="text-gray-800 dark:text-gray-200"
                                                >
                                                    Contraseña
                                                </Label>
                                            </div>
                                            <Input
                                                id="password"
                                                type="password"
                                                name="password"
                                                required
                                                tabIndex={2}
                                                autoComplete="current-password"
                                                placeholder="Contraseña"
                                            />
                                            <InputError
                                                message={errors.password}
                                            />
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                                tabIndex={3}
                                            />
                                            <Label
                                                htmlFor="remember"
                                                className="text-gray-700 dark:text-gray-300"
                                            >
                                                Recordarme
                                            </Label>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="mt-2 w-full"
                                            tabIndex={4}
                                            disabled={processing}
                                            data-test="login-button"
                                        >
                                            {processing && (
                                                <Spinner className="mr-2 h-4 w-4" />
                                            )}
                                            Iniciar sesión
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>

                        {status && (
                            <div className="mt-4 text-center text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}
                    </div>

                    {/* === COLUMNA DERECHA: Modelo 3D mejorado === */}
                    <div className="hidden items-center justify-center lg:flex">
                        <div className="h-[420px] w-full max-w-[420px] overflow-hidden">
                            <Canvas
                                className="h-full w-full !border-none !outline-none"
                                camera={{ position: [18, 23, 18], fov: 20 }}
                                gl={{
                                    antialias: true,
                                    alpha: true, // ✅ Fondo transparente
                                    preserveDrawingBuffer: true,
                                }}
                            >

                                <Suspense fallback={null}>
                                    {/* Luces mejoradas */}
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

                                    {/* Entorno reflectante (solo afecta reflejos, no el fondo) */}
                                    <Environment preset="city" />

                                    {/* Modelo animado */}
                                    <GlowingModel />

                                    {/* Controles */}
                                    <OrbitControls
                                        enableZoom={false}
                                        enablePan={false}
                                        autoRotate
                                        autoRotateSpeed={0.8}
                                    />
                                </Suspense>

                                {/* Efecto de brillo (solo en los objetos, no afecta fondo) */}
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
        </>
    );
}
