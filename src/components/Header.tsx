'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
export default function Header() {
    const router = useRouter()
    const pathname = usePathname()

    const [isOpen, setIsOpen] = useState(false)
    const [scrolled50, setScrolled50] = useState(false)
    const [showLogo, setShowLogo] = useState(false)
    const [activeSection, setActiveSection] = useState('')

    const navItems = [
        { name: 'CONVERSATIONS', href: '#conversations' },
        { name: 'COMMUNITY', href: '#community' },
        { name: 'PERSPECTIVES', href: '#perspectives' },
        { name: 'HOSTS', href: '#hosts' },
    ]

    useEffect(() => {
        const handleScroll = () => {
            setScrolled50(window.scrollY > 50)
            setShowLogo(window.scrollY > 200)

            const sectionElements = document.querySelectorAll('section[id]')
            let current = ''

            sectionElements.forEach((section) => {
                const sectionTop = (section as HTMLElement).offsetTop
                if (window.scrollY >= sectionTop - 150) {
                    current = section.getAttribute('id') || ''
                }
            })

            setActiveSection(current)
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        e.preventDefault()

        const targetId = href.replace('#', '')

        // If user is not on home page, first go home with hash
        if (pathname !== '/') {
            router.push(`/${href}`)
            setIsOpen(false)
            return
        }

        const element = document.getElementById(targetId)

        if (element) { 
            const offsetPosition =
                element.getBoundingClientRect().top + window.scrollY  

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            })
        }

        setIsOpen(false)
    }

    return (
        <header className="fixed top-0 left-0 z-50 w-full py-6 text-white font-pitch font-semibold uppercase tracking-widest text-xs lg:text-sm">
            {/* Soft blur background */}
            <div
                className={`absolute inset-0 -z-10 transition-opacity duration-700 ${scrolled50 ? 'opacity-100' : 'opacity-60'}`}
            >
                <div className="absolute inset-0 bg-linear-to-b from-[#202A44] from-0% via-[#263454ab] via-45%  via-25% to-[#34476f00] to-100%" />
            </div>

            <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:h-24">
                {/* Logo */}
                <a
                    href="/"
                    className={`
                        relative z-50 block h-16 w-16 shrink-0 transition-all duration-700 hover:scale-105
                        lg:h-24 lg:w-24 lg:ml-4
                        ${showLogo ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none lg:w-0 lg:ml-0'}
                    `}
                >
                    <Image
                        src="/t1-logo.svg"
                        alt="Table One"
                        fill
                        priority
                        className="object-contain"
                    />
                </a>

                {/* Desktop Navigation */}
                <nav
                    className={`hidden lg:flex items-center gap-x-12 transition-all duration-700`}
                >
                    {navItems.map((item) => {
                        const isActive = activeSection === item.href.replace('#', '');
                        return (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className={`Note2 transition-all duration-300   hover:text-[#B54323]
                                    ${isActive ? 'text-[#B54323]  ' : 'text-white'}
                                `}
                            >
                                {item.name}
                            </a>
                        )
                    })}
                </nav>

                {/* Action Button */}
                <div className="hidden lg:block">
                    <a
                        href="#request-seat"
                        onClick={(e) => scrollToSection(e, '#request-seat')}
                        className={`rounded-full border border-white px-4 py-2 Note2 transition-all hover:bg-white hover:text-black
                            ${activeSection === 'request-seat' ? 'bg-white text-black' : ''}
                        `}
                    >
                        REQUEST A SEAT
                    </a>
                </div>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden relative z-50 p-2 flex flex-col justify-center items-center gap-0.5 w-10 h-10 focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    <span className={`h-px w-6 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                    <span className={`h-px w-6 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ' opacity-0'}`} />
                    <span className={`h-px w-6 bg-white transition-all duration-300 ${isOpen ? '-rotate-45  ' : ''}`} />
                </button>
            </div>

            {/* Mobile Drawer */}
            <div
                className={`
                    fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#202A44]
                    transition-transform duration-300 lg:hidden
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                <nav className="flex flex-col items-center gap-y-8 text-lg">
                    {navItems.map((item) => {
                        const isActive = activeSection === item.href.replace('#', '');
                        return (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className={`transition-colors   Note2 hover:text-[#B54323]
                                    ${isActive ? 'text-[#B54323] font-bold' : 'text-white'}
                                `}
                            >
                                {item.name}
                            </a>
                        )
                    })}

                    <a
                        href="#request-seat"
                        onClick={(e) => scrollToSection(e, '#request-seat')}
                        className={`mt-4 Note2 rounded-full border border-white px-4 py-1 transition-all hover:bg-white hover:text-black
                            ${activeSection === 'request-seat' ? 'bg-white text-black' : ''}
                        `}
                    >
                        REQUEST A SEAT
                    </a>

                    <div className=" flex items-center gap-6">
                        <a
                            href="https://instagram.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="text-white transition-colors hover:text-[#B54323]"
                        >
                            <FaInstagram className="h-6 w-6" />
                        </a>

                        <a
                            href="mailto:arshiya.khosla@gmail.com"
                            aria-label="Email"
                            className="text-white transition-colors hover:text-[#B54323]"
                        >
                            <HiOutlineMail className="h-6 w-6" />
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    )
}