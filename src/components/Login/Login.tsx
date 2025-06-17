import { useState, FormEvent, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { LogIn, Check, AlertCircle, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Setting from '../../utils/Settings';

export const Login = () => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.1 });

    const [formState, setFormState] = useState({
        email: '',
        password: '',
    });

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        // Simulate login request
        setTimeout(() => {
            if (formState.email === 'test@example.com' && formState.password === 'password') {
                setStatus('success');
                navigate('/'+Setting.getLocation()+'/EditProfile')
            } else {
                setStatus('error');
            }

            setTimeout(() => {
                setStatus('idle');
            }, 3000);
        }, 1500);
    };

    return (
        <section className="py-20 bg-slate-500/20 dark:bg-gray-500/20 backdrop-blur-sm rounded-t-xl">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold mb-4 text-center bg-gradient-to-br from-slate-400 via-slate-700 to-slate-200 dark:from-fuchsia-200 dark:via-slate-300 dark:to-blue-400 bg-clip-text text-transparent cursor-default">
                        {"Login to Your Account".split('').map((letter, idx) => (
                            <motion.span
                                key={idx}
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.05, delay: idx * 0.05 }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </h2>
                    <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-xl mx-auto">
                        Welcome back! Please enter your credentials to continue.
                    </p>
                </motion.div>

                <div className="max-w-md mx-auto">
                    <motion.form
                        onSubmit={handleSubmit}
                        className="transition-all duration-300 rounded-xl border-l-4 border-primary shadow-lg hover:shadow-xl hover:border-l-0 cursor-default bg-slate-100/40 dark:bg-slate-700/40 backdrop-blur-md p-8"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        {/* Email Input */}
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formState.email}
                                onChange={handleChange}
                                required
                                className="input transition-all duration-300 rounded-xl border-l-4 border-primary shadow-lg bg-slate-100/40 dark:bg-slate-900/40 backdrop-blur-sm"
                                disabled={status === 'submitting' || status === 'success'}
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formState.password}
                                onChange={handleChange}
                                required
                                className="input transition-all duration-300 rounded-xl border-l-4 border-primary shadow-lg bg-slate-100/40 dark:bg-slate-900/40 backdrop-blur-sm"
                                disabled={status === 'submitting' || status === 'success'}
                            />
                        </div>

                        {/* Login Button */}
                        <motion.button
                            type="submit"
                            disabled={status === 'submitting' || status === 'success'}
                            className="btn btn-primary w-full flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {status === 'idle' && (
                                <>
                                    Log In <LogIn className="w-4 h-4" />
                                </>
                            )}

                            {status === 'submitting' && <>Logging in...</>}

                            {status === 'success' && (
                                <>
                                    Success <Check className="w-4 h-4" />
                                </>
                            )}

                            {status === 'error' && (
                                <>
                                    Invalid Credentials <AlertCircle className="w-4 h-4" />
                                </>
                            )}
                        </motion.button>

                        {/* Status Messages */}
                        {status === 'success' && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 text-center text-green-600 dark:text-green-400"
                            >
                                Login successful!
                            </motion.p>
                        )}
                        {status === 'error' && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 text-center text-red-600 dark:text-red-400"
                            >
                                Invalid email or password. Try again.
                            </motion.p>
                        )}
                    </motion.form>

                    {/* Register Navigation */}
                    <motion.div
                        className="mt-6 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <button
                            type="button"
                            onClick={() => navigate('/Register')}
                            className="text-sm text-primary hover:underline flex items-center justify-center gap-1 mx-auto"
                        >
                            <UserPlus className="w-4 h-4" />
                            Don't have an account? <span className="font-semibold">Register</span>
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
