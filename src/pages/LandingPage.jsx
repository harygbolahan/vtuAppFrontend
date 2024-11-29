/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight, Shield, Smartphone, Users, Zap, Menu, XIcon } from 'lucide-react'

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
}

function AnimatedSection({ children }) {
    const controls = useAnimation()
    const [ref, inView] = useInView({ triggerOnce: true })

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

    return (
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={stagger}
        >
            {children}
        </motion.div>
    )
}

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className="flex min-h-screen flex-col bg-white text-gray-900">
            <header className="sticky top-0 z-50 border-b bg-white">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link className="flex items-center gap-2 text-2xl font-bold text-[#8B0000]" href="#">
                        <Zap className="h-8 w-8" />
                        DataFlow
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        {['Home', 'Services', 'About', 'Contact'].map((item) => (
                            <Link key={item} className="text-sm font-medium hover:text-[#8B0000] transition-colors" href="#">
                                {item}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex gap-4">
                        <Link to='/login'>
                        <button className="hidden md:inline-flex items-center justify-center rounded-md border-2 border-[#8B0000]  bg-white px-4 py-2 text-sm font-medium text-[#8B0000] hover:bg-[#8B0000]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            Login
                        </button>
                        </Link>
                        <Link to='/register'>
                        <button className="hidden md:inline-flex items-center justify-center rounded-md bg-[#8B0000] px-4 py-2 text-sm font-medium text-white hover:bg-[#A52A2A] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            Sign Up
                        </button>
                        </Link>
                        <button
                            className="md:hidden text-[#8B0000]"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <XIcon /> : <Menu />}
                        </button>
                    </div>
                </div>
                {isMenuOpen && (
                    <motion.div
                        className="md:hidden"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <nav className="flex flex-col items-center py-4">
                            {['Home', 'Services', 'About', 'Contact'].map((item) => (
                                <Link key={item} className="py-2 text-sm font-medium hover:text-[#8B0000] transition-colors" href="#">
                                    {item}
                                </Link>
                            ))}
                            <Link to='/login'>
                            <button className="mt-4 inline-flex items-center justify-center rounded-md bg-[#8B0000] px-4 py-2 text-sm font-medium text-white hover:bg-[#A52A2A] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                Login / Signup
                            </button>
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </header>

            <main className="flex-1">
                <AnimatedSection>
                    <section className="w-full py-12 md:py-24 lg:py-32">
                        <div className="container mx-auto grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
                            <motion.div className="space-y-6" variants={fadeInUp}>
                                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                                    Transform Your <span className="text-[#8B0000]">Data Business</span> in Nigeria
                                </h1>
                                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    The ultimate platform for data reselling. Start earning with instant delivery, competitive rates, and automated services.
                                </p>
                                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                                    <Link to='/login'>
                                    <button className="inline-flex items-center justify-center rounded-md bg-[#8B0000] px-4 py-2 text-sm font-medium text-white hover:bg-[#A52A2A] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                                    </button>
                                    </Link>
                                    <button className="inline-flex items-center justify-center rounded-md border border-[#8B0000] px-4 py-2 text-sm font-medium text-[#8B0000] hover:bg-[#8B0000] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] focus-visible:ring-opacity-75">
                                        Learn More
                                    </button>
                                </div>
                            </motion.div>
                            <motion.div className="flex justify-center" variants={fadeInUp}>
                                <img
                                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRhdGElMjBhcHB8ZW58MHx8MHx8fDA%3D"
                                    alt="Data App Screenshot"
                                    width={550}
                                    height={550}
                                    className="rounded-xl shadow-lg"
                                />
                            </motion.div>
                        </div>
                    </section>
                </AnimatedSection>

                <AnimatedSection>
                    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
                        <div className="container mx-auto px-4 md:px-6">
                            <motion.div variants={fadeInUp} className="text-center mb-10">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    Everything You <span className="text-[#8B0000]">Need</span>
                                </h2>
                                <p className="mt-4 max-w-[900px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Powerful features to help you manage and grow your data reselling business.
                                </p>
                            </motion.div>
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {[
                                    { icon: Zap, title: "Instant Delivery", description: "Automated system ensures instant data delivery to your customers." },
                                    { icon: Shield, title: "Secure Transactions", description: "Bank-grade security for all your transactions and customer data." },
                                    { icon: Users, title: "User Management", description: "Easily manage your customers and track their transactions." },
                                ].map((feature, index) => (
                                    <motion.div
                                        key={feature.title}
                                        variants={fadeInUp}
                                        className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md"
                                    >
                                        <div className="mb-4 rounded-full bg-[#8B0000] p-3 text-white">
                                            <feature.icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                                        <p className="text-gray-500">{feature.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                </AnimatedSection>

                <AnimatedSection>
                    <section className="w-full py-12 md:py-24 lg:py-32">
                        <div className="container mx-auto px-4 md:px-6">
                            <div className="grid gap-10 lg:grid-cols-2 items-center">
                                <motion.div variants={fadeInUp} className="space-y-4">
                                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                        Download Our <span className="text-[#8B0000]">App</span>
                                    </h2>
                                    <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                        Get started with our mobile app and manage your business on the go. Available on iOS and Android.
                                    </p>
                                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                        <button className="inline-flex items-center justify-center rounded-md bg-[#8B0000] px-4 py-2 text-sm font-medium text-white hover:bg-[#A52A2A] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                            <Smartphone className="mr-2 h-4 w-4" /> App Store
                                        </button>
                                        <button className="inline-flex items-center justify-center rounded-md bg-[#8B0000] px-4 py-2 text-sm font-medium text-white hover:bg-[#A52A2A] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                            <Smartphone className="mr-2 h-4 w-4" /> Play Store
                                        </button>
                                    </div>
                                </motion.div>
                                <motion.div variants={fadeInUp} className="flex justify-center">
                                    <img
                                        src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1vYmlsZSUyMGFwcHxlbnwwfHwwfHx8MA%3D%3D"
                                        alt="Mobile App"
                                        width={550}
                                        height={550}
                                        className="rounded-xl shadow-lg"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </section>
                </AnimatedSection>
            </main>

            <footer className="border-t bg-gray-50">
                <div className="container mx-auto px-4 py-8 md:py-12">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <Link className="flex items-center gap-2 text-2xl font-bold text-[#8B0000]" href="#">
                                <Zap className="h-6 w-6" />
                                DataFlow
                            </Link>
                            <p className="mt-2 text-sm text-gray-500">
                                The ultimate platform for data reselling in Nigeria.
                            </p>
                        </div>
                        {[
                            { title: 'Company', items: ['About', 'Careers', 'Contact'] },
                            { title: 'Services', items: ['Data Plans', 'Airtime', 'Bill Payments'] },
                            { title: 'Support', items: ['Help Center', 'Terms of Service', 'Legal'] },
                        ].map((section) => (
                            <div key={section.title}>
                                <h3 className="font-semibold text-gray-900">{section.title}</h3>
                                <ul className="mt-4 space-y-2">
                                    {section.items.map((item) => (
                                        <li key={item}>
                                            <Link href="#" className="text-sm text-gray-500 hover:text-[#8B0000]">
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-xs text-gray-500">© 2024 DataFlow. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link href="#" className="text-gray-400 hover:text-[#8B0000]">
                                <span className="sr-only">Facebook</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-[#8B0000]">
                                <span className="sr-only">Instagram</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784
.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-[#8B0000]">
                                <span className="sr-only">Twitter</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

