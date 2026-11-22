import { useCallback, useEffect, useState } from "react";

const LOGO_PATH = "/assets/logo/logo-1.png";
const HERO_PATH = "/assets/hero-image/hero-image.jpg";

const MINIMUM_DISPLAY_TIME = 900;
const MAXIMUM_LOADING_TIME = 5000;
const PROGRESS_COMPLETION_TIME = 1000;
const EXIT_DURATION = 750;

// Preload and decode an image.
const loadImage = (src) =>
    new Promise((resolve) => {
        const image = new Image();
        let settled = false;

        const finish = async (loaded) => {
            if (settled) return;
            settled = true;

            if (!loaded) {
                resolve(false);
                return;
            }

            try {
                await image.decode();
            } catch {
                // Continue if image decoding fails.
            }

            resolve(image.naturalWidth > 0);
        };

        image.onload = () => finish(true);
        image.onerror = () => finish(false);

        image.src = src;

        if (image.complete) {
            finish(image.naturalWidth > 0);
        }
    });

const Loader = ({ onComplete }) => {
    const [isExiting, setIsExiting] = useState(false);
    const [isLogoLoaded, setIsLogoLoaded] = useState(false);
    const [progress, setProgress] = useState(0);

    const completeLoading = useCallback(() => {
        onComplete?.();
    }, [onComplete]);

    useEffect(() => {
        let isMounted = true;
        let progressInterval;
        let exitTimer;

        const startTime = performance.now();

        // Simulate smooth progress while assets are loading.
        progressInterval = setInterval(() => {
            if (!isMounted) return;

            const elapsedTime = performance.now() - startTime;

            // Progress gradually approaches 90%.
            const nextProgress = 90 * (1 - Math.exp(-elapsedTime / 1500));

            setProgress(Math.min(90, nextProgress));
        }, 40);

        const prepareWebsite = async () => {
            const assetLoading = Promise.allSettled([
                loadImage(LOGO_PATH),
                loadImage(HERO_PATH),
                document.fonts.ready,
            ]);

            // Maximum loading time safeguard.
            await Promise.race([
                assetLoading,
                new Promise((resolve) =>
                    setTimeout(resolve, MAXIMUM_LOADING_TIME),
                ),
            ]);

            if (!isMounted) return;

            // Stop simulated progress.
            clearInterval(progressInterval);

            // Smoothly complete the progress bar.
            setProgress(100);

            await new Promise((resolve) =>
                setTimeout(resolve, PROGRESS_COMPLETION_TIME),
            );

            if (!isMounted) return;

            // Respect minimum loader display time.
            const elapsedTime = performance.now() - startTime;

            const remainingTime = Math.max(
                0,
                MINIMUM_DISPLAY_TIME - elapsedTime,
            );

            if (remainingTime > 0) {
                await new Promise((resolve) =>
                    setTimeout(resolve, remainingTime),
                );
            }

            if (!isMounted) return;

            // Reveal the website only after progress completes.
            setIsExiting(true);

            exitTimer = setTimeout(() => {
                if (isMounted) {
                    completeLoading();
                }
            }, EXIT_DURATION);
        };

        prepareWebsite();

        return () => {
            isMounted = false;

            clearInterval(progressInterval);
            clearTimeout(exitTimer);
        };
    }, [completeLoading]);

    return (
        <>
            <style>
                {`
                    @keyframes loader-reveal {
                        from {
                            opacity: 0;
                            transform: translateY(18px) scale(0.97);
                        }

                        to {
                            opacity: 1;
                            transform: translateY(0) scale(1);
                        }
                    }

                    @media (prefers-reduced-motion: reduce) {
                        .site-loader,
                        .site-loader__content,
                        .site-loader__logo,
                        .site-loader__progress-fill {
                            animation: none !important;
                            transition: none !important;
                        }
                    }
                `}
            </style>

            <div
                className={`
                    site-loader
                    fixed inset-0 z-9999
                    flex min-h-svh w-full
                    items-center justify-center
                    bg-bg
                    transition-[opacity,visibility]
                    duration-750
                    ease-[cubic-bezier(0.76,0,0.24,1)]
                    ${
                        isExiting
                            ? "pointer-events-none invisible opacity-0"
                            : "visible opacity-100"
                    }
                `}
                role="status"
                aria-label="Loading Hotel Ambasewana"
                aria-busy={!isExiting}
            >
                <div
                    className="
                        site-loader__content
                        flex w-[85%] max-w-90
                        flex-col items-center
                        text-center
                    "
                    style={{
                        animation:
                            "loader-reveal 900ms cubic-bezier(0.16, 1, 0.3, 1) both",
                    }}
                >
                    {/* Logo and fallback */}
                    <div
                        className="
                            relative flex min-h-22.5
                            w-full max-w-65
                            items-center justify-center
                        "
                    >
                        <span
                            className={`
                                absolute inset-0
                                flex items-center justify-center
                                font-[Playfair_Display]
                                text-[30px] font-semibold
                                tracking-[0.12em]
                                text-main
                                transition-opacity duration-500
                                ${isLogoLoaded ? "opacity-0" : "opacity-100"}
                            `}
                            aria-hidden="true"
                        >
                            AMBASEWANA
                        </span>

                        <img
                            src={LOGO_PATH}
                            alt="Hotel Ambasewana"
                            decoding="async"
                            fetchPriority="high"
                            onLoad={async (event) => {
                                try {
                                    await event.currentTarget.decode();
                                } catch {
                                    // Continue if decoding fails.
                                }

                                setIsLogoLoaded(true);
                            }}
                            className={`
                                site-loader__logo
                                relative block h-auto w-full
                                max-w-65 object-contain
                                transition-opacity duration-700
                                ${isLogoLoaded ? "opacity-100" : "opacity-0"}
                            `}
                        />
                    </div>

                    {/* Tagline */}
                    <p
                        className="
                            mt-3
                            font-[Montserrat]
                            text-[9px] font-medium
                            leading-relaxed
                            tracking-[0.24em]
                            text-main
                        "
                    >
                        WHERE HERITAGE MEETS LUXURY
                    </p>

                    {/* Progress bar */}
                    <div
                        className="
                            relative mt-9.5
                            h-0.5 w-45
                            overflow-hidden
                            bg-white/15
                        "
                        role="progressbar"
                        aria-label="Website loading progress"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={Math.round(progress)}
                    >
                        <span
                            className="
                                site-loader__progress-fill
                                absolute inset-y-0 left-0
                                bg-main
                                transition-[width]
                                duration-1000
                                ease-[cubic-bezier(0.22,1,0.36,1)]
                            "
                            style={{
                                width: `${progress}%`,
                            }}
                        />
                    </div>

                    {/* Loading text */}
                    <span
                        className="
                            mt-3.75
                            font-[Montserrat]
                            text-[9px] font-normal
                            leading-relaxed
                            tracking-[0.2em]
                            text-white/50
                        "
                    >
                        PREPARING YOUR EXPERIENCE
                    </span>
                </div>
            </div>
        </>
    );
};

export default Loader;
