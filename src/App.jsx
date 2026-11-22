import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

import Home from "./pages/Home";

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
                </Routes>

                <Footer />
            </main>
        </>
    );
};

export default App;
