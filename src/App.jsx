import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/common/Navbar/Navbar";
import Footer from "./components/common/FooterNew";
import Loader from "./components/common/Loader";

import Home from "./pages/Home";
import Booking from "./pages/Booking";

import "./App.css";

const App = () => {
    const location = useLocation();

    const [showLoader, setShowLoader] = useState(true);

    const handleLoaderComplete = useCallback(() => {
        setShowLoader(false);
    }, []);

    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <>
            {showLoader && <Loader onComplete={handleLoaderComplete} />}

            <main inert={showLoader} aria-busy={showLoader}>
                <Navbar />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/booking" element={<Booking />} />
                </Routes>

                <Footer />
            </main>
        </>
    );
};

export default App;
