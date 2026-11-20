import { useState } from "react";
import { HashLink } from "react-router-hash-link";

import { navLinks } from "../../../../constants";

import "./Navbar.css";

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <header>
            <nav>
                <ul
                    className="sidebar"
                    style={{ display: isSidebarOpen ? "flex" : "none" }}
                >
                    <li className="close-btn" onClick={toggleSidebar}>
                        <i className="bx bx-x"></i>
                    </li>

                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <HashLink
                                smooth
                                to={`/#${link.id}`}
                                onClick={toggleSidebar}
                            >
                                {link.title}
                            </HashLink>
                        </li>
                    ))}
                </ul>

                {/* --- Desktop Navbar --- */}
                <ul className="navbar">
                    <li className="logo">
                        <HashLink smooth to="/#hero">
                            <img
                                src="/assets/logo/logo-1.png"
                                alt="site-logo"
                            />
                        </HashLink>
                    </li>

                    {/* Nav Links  */}
                    {navLinks.map((link) => (
                        <li key={link.id} className="hideOnMobile">
                            <HashLink smooth to={`/#${link.id}`}>
                                {link.title}
                            </HashLink>
                        </li>
                    ))}

                    <li className="menu-btn">
                        <button
                            type="button"
                            onClick={toggleSidebar}
                            aria-label="Open navigation menu"
                        >
                            <i className="bx bx-menu"></i>
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
