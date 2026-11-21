import { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { navLinks } from "../../../../constants";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const closeMenu = () => setIsOpen(false);
    const toggleMenu = () => setIsOpen((previous) => !previous);

    // Navbar scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Menu scroll lock and Escape key
    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    return (
        <>
            {/* Navbar */}
            <header className="fixed inset-x-0 top-0 z-[70]">
                <nav
                    className={`flex h-[76px] items-center justify-between px-5 transition-all duration-500 ease-out sm:h-[88px] sm:px-8 lg:px-12 ${
                        isScrolled
                            ? "border-b border-white/20 bg-black/30 backdrop-blur-xl shadow-lg"
                            : "border-b border-transparent bg-transparent backdrop-blur-none shadow-none"
                    }`}
                >
                    {/* Logo */}
                    <HashLink
                        smooth
                        to="/#hero"
                        onClick={closeMenu}
                        aria-label="Hotel Ambasewana home"
                        className="transition-transform duration-300 hover:scale-105"
                    >
                        <img
                            src="/assets/logo/logo-1.png"
                            alt="Hotel Ambasewana"
                            className="w-[82px] sm:w-[100px]"
                        />
                    </HashLink>

                    {/* Menu Toggle */}
                    <button
                        type="button"
                        onClick={toggleMenu}
                        aria-label={
                            isOpen
                                ? "Close navigation menu"
                                : "Open navigation menu"
                        }
                        aria-expanded={isOpen}
                        aria-controls="fullscreen-navigation"
                        className="relative z-[80] flex size-12 items-center justify-center rounded-full border border-white/40 text-white transition-all duration-300 ease-out cursor-pointer hover:scale-105 hover:border-main hover:bg-main hover:text-bg active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main"
                    >
                        <span className="relative flex h-5 w-5 items-center justify-center">
                            <span
                                className={`absolute h-[2px] w-5 rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                    isOpen ? "rotate-45" : "-translate-y-[5px]"
                                }`}
                            />

                            <span
                                className={`absolute h-[2px] w-5 rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                    isOpen ? "-rotate-45" : "translate-y-[5px]"
                                }`}
                            />
                        </span>
                    </button>
                </nav>
            </header>

            {/* Full-screen Navigation */}
            <div
                id="fullscreen-navigation"
                aria-hidden={!isOpen}
                inert={!isOpen}
                className={`fixed inset-0 z-[60] flex h-[100dvh] flex-col overflow-hidden bg-[#121212]/95 backdrop-blur-2xl transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                    isOpen
                        ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                        : "pointer-events-none -translate-y-2 scale-[1.02] opacity-0"
                }`}
            >
                {/* Navigation Links */}
                <div className="flex min-h-0 flex-1 items-center justify-center px-6 py-5 sm:px-10 lg:px-16">
                    <div className="flex w-full max-w-3xl flex-col gap-3 sm:gap-5">
                        {navLinks.map((link, index) => (
                            <HashLink
                                key={link.id}
                                smooth
                                to={`/#${link.id}`}
                                onClick={closeMenu}
                                tabIndex={isOpen ? 0 : -1}
                                style={{
                                    transitionDelay: isOpen
                                        ? `${150 + index * 90}ms`
                                        : "0ms",
                                }}
                                className={`group flex items-center justify-between border-b border-white/15 py-[clamp(0.55rem,1.5vh,1rem)] transition-[opacity,transform,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none hover:border-main ${
                                    isOpen
                                        ? "translate-y-0 opacity-100"
                                        : "translate-y-8 opacity-0"
                                }`}
                            >
                                <span className="font-heading text-[clamp(1.5rem,4vw,3rem)] font-normal leading-tight text-white transition-colors duration-300 ease-out group-hover:text-main">
                                    {link.title}
                                </span>
                            </HashLink>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
