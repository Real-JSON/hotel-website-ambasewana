import { useState, useEffect, useCallback, useRef } from "react";

// Add new image objects here to easily expand the gallery
const GALLERY_IMAGES = [
    { id: 1, src: "/assets/image-gallery/1-1.jpg", alt: "Scenic view 1" },
    { id: 2, src: "/assets/image-gallery/1-2.jpg", alt: "Scenic view 2" },
    { id: 3, src: "/assets/image-gallery/1-3.jpg", alt: "Scenic view 3" },
    { id: 4, src: "/assets/image-gallery/1-4.jpg", alt: "Scenic view 4" },
    { id: 5, src: "/assets/image-gallery/2-1.jpg", alt: "Scenic view 5" },
    { id: 6, src: "/assets/image-gallery/2-2.jpg", alt: "Scenic view 6" },
    { id: 7, src: "/assets/image-gallery/2-3.jpg", alt: "Scenic view 7" },
    { id: 8, src: "/assets/image-gallery/2-4.jpg", alt: "Scenic view 8" },
    { id: 9, src: "/assets/image-gallery/2-5.jpg", alt: "Scenic view 9" },
    { id: 10, src: "/assets/image-gallery/3-1.jpg", alt: "Scenic view 10" },
    { id: 11, src: "/assets/image-gallery/3-2.jpg", alt: "Scenic view 11" },
    { id: 12, src: "/assets/image-gallery/3-3.jpg", alt: "Scenic view 12" },
    { id: 13, src: "/assets/image-gallery/3-4.jpg", alt: "Scenic view 13" },
    { id: 14, src: "/assets/image-gallery/3-5.jpg", alt: "Scenic view 14" },
];

// Default initial count outside tablet view
const DEFAULT_INITIAL_COUNT = 5;

// Initial count for tablet view (2 images per row x 4 rows = 8 separate images)
const TABLET_INITIAL_COUNT = 8;

// Minimum horizontal swipe distance in pixels to trigger slide change
const SWIPE_THRESHOLD = 50;

// Helper function to assign Bento grid column spans across breakpoints
const getBentoSpanClasses = (index) => {
    const pos = index % 7;

    // Tablet (md: 768px-1023px): 2 equal columns, each image takes 1 column
    // Desktop (lg: >= 1024px, 6 cols): Row 1 (4+2), Row 2 (2+2+2), Row 3 (2+4)
    let desktopSpan = "lg:col-span-2";
    if (pos === 0 || pos === 6) {
        desktopSpan = "lg:col-span-4";
    }

    return `col-span-1 md:col-span-1 ${desktopSpan}`;
};

function Gallery() {
    const [showAll, setShowAll] = useState(false);
    const [isTablet, setIsTablet] = useState(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia("(min-width: 768px) and (max-width: 1023px)")
            .matches;
    });
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [slideDirection, setSlideDirection] = useState("open"); // "open" | "next" | "prev"

    const touchStartRef = useRef({ x: 0, y: 0 });
    const touchEndRef = useRef({ x: 0, y: 0 });

    // Sync tablet viewport state (768px - 1023px)
    useEffect(() => {
        const mediaQuery = window.matchMedia(
            "(min-width: 768px) and (max-width: 1023px)",
        );

        const handleTabletChange = (e) => {
            setIsTablet(e.matches);
        };

        setIsTablet(mediaQuery.matches);
        mediaQuery.addEventListener("change", handleTabletChange);

        return () => {
            mediaQuery.removeEventListener("change", handleTabletChange);
        };
    }, []);

    const initialVisibleCount = isTablet
        ? TABLET_INITIAL_COUNT
        : DEFAULT_INITIAL_COUNT;

    const visibleImages = showAll
        ? GALLERY_IMAGES
        : GALLERY_IMAGES.slice(0, initialVisibleCount);

    const openModal = (index) => {
        setSlideDirection("open");
        setSelectedIndex(index);
    };

    const closeModal = useCallback(() => {
        setSelectedIndex(null);
    }, []);

    const handleNext = useCallback((e) => {
        if (e) e.stopPropagation();
        setSlideDirection("next");
        setSelectedIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, []);

    const handlePrev = useCallback((e) => {
        if (e) e.stopPropagation();
        setSlideDirection("prev");
        setSelectedIndex((prev) =>
            prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1,
        );
    }, []);

    // Track touch swipe gestures on mobile and tablet viewports (< 1024px)
    const handleTouchStart = (e) => {
        if (window.matchMedia("(min-width: 1024px)").matches) return;
        const touch = e.touches[0];
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
        touchEndRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchMove = (e) => {
        if (window.matchMedia("(min-width: 1024px)").matches) return;
        const touch = e.touches[0];
        touchEndRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = () => {
        if (window.matchMedia("(min-width: 1024px)").matches) return;

        const deltaX = touchEndRef.current.x - touchStartRef.current.x;
        const deltaY = touchEndRef.current.y - touchStartRef.current.y;

        // Only treat as horizontal slide when horizontal movement dominates
        if (
            Math.abs(deltaX) > SWIPE_THRESHOLD &&
            Math.abs(deltaX) > Math.abs(deltaY)
        ) {
            if (deltaX < 0) {
                handleNext();
            } else {
                handlePrev();
            }
        }
    };

    // Handle keyboard navigation and lock background scroll while modal is open
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedIndex === null) return;
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
        };

        if (selectedIndex !== null) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedIndex, closeModal, handleNext, handlePrev]);

    // Pick smooth transition animation based on open or slide direction
    const getSlideAnimationClass = () => {
        if (slideDirection === "next") return "animate-slide-next";
        if (slideDirection === "prev") return "animate-slide-prev";
        return "animate-modal-pop";
    };

    return (
        <section
            id="gallery"
            className="max-w-7xl mx-auto my-16 md:my-24 px-4 sm:px-6"
        >
            {/* Smooth Modal & Image Slide Keyframes */}
            <style>{`
                @keyframes backdropFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes modalPopIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95) translateY(8px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
                @keyframes slideFromRight {
                    from {
                        opacity: 0.25;
                        transform: translateX(36px) scale(0.985);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0) scale(1);
                    }
                }
                @keyframes slideFromLeft {
                    from {
                        opacity: 0.25;
                        transform: translateX(-36px) scale(0.985);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0) scale(1);
                    }
                }
                .animate-backdrop {
                    animation: backdropFadeIn 0.28s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
                .animate-modal-pop {
                    animation: modalPopIn 0.32s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
                .animate-slide-next {
                    animation: slideFromRight 0.34s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
                .animate-slide-prev {
                    animation: slideFromLeft 0.34s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
            `}</style>

            {/* Gallery Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 md:mb-12 gap-5">
                <div className="flex flex-col items-start gap-3">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-main/15 border border-main text-main font-body text-xs sm:text-sm font-medium tracking-wide">
                        Our Stories
                    </span>
                    <h2 className="font-heading text-4xl sm:text-5xl md:text-[3.2rem] font-bold leading-tight m-0">
                        Photo Gallery
                    </h2>
                </div>
                <p className="font-description text-base sm:text-lg opacity-80 max-w-xs text-left md:text-right leading-snug m-0">
                    Captured moments from our serene stays and scenic
                    surroundings.
                </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 auto-rows-62.5 md:auto-rows-60 lg:auto-rows-85 gap-3 md:gap-4">
                {visibleImages.map((img, index) => (
                    <div
                        key={img.id}
                        onClick={() => openModal(index)}
                        className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-[#1a1a1a] ${getBentoSpanClasses(
                            index,
                        )}`}
                    >
                        <img
                            src={img.src}
                            alt={img.alt}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover block transition-all duration-500 ease-out md:grayscale-45 md:brightness-90 md:group-hover:grayscale-0 md:group-hover:brightness-105 md:group-hover:scale-105"
                        />
                    </div>
                ))}
            </div>

            {/* Expand / Collapse Gallery Button */}
            {GALLERY_IMAGES.length > initialVisibleCount && (
                <div className="flex justify-center mt-10">
                    <button
                        type="button"
                        onClick={() => setShowAll(!showAll)}
                        className="px-8 py-3 rounded-full border border-main bg-main text-bg font-body text-sm sm:text-[0.95rem] font-semibold uppercase tracking-wider cursor-pointer transition-all duration-300 hover:bg-transparent hover:text-main"
                    >
                        {showAll ? "Show Less" : "View More"}
                    </button>
                </div>
            )}

            {/* Lightbox Modal */}
            {selectedIndex !== null && (
                <div
                    onClick={closeModal}
                    className="animate-backdrop fixed inset-0 bg-black/90 backdrop-blur-md z-9999 flex items-center justify-center p-5 overflow-hidden"
                >
                    {/* Close Button */}
                    <button
                        onClick={closeModal}
                        aria-label="Close modal"
                        className="absolute top-6 right-6 sm:right-8 bg-white/10 hover:bg-main text-white hover:text-bg text-3xl w-11 h-11 rounded-full cursor-pointer flex items-center justify-center transition-colors duration-200 z-10"
                    >
                        &times;
                    </button>

                    {/* Previous Button */}
                    <button
                        onClick={handlePrev}
                        aria-label="Previous image"
                        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-main text-white hover:text-bg text-lg sm:text-xl w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer flex items-center justify-center transition-all duration-200 active:scale-90 z-10"
                    >
                        &#10094;
                    </button>

                    {/* Modal Image Container with Mobile/Tablet Swipe Support */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        className="relative max-w-[85vw] max-h-[85vh] flex flex-col items-center overflow-hidden touch-pan-y"
                    >
                        <img
                            key={GALLERY_IMAGES[selectedIndex].id}
                            src={GALLERY_IMAGES[selectedIndex].src}
                            alt={GALLERY_IMAGES[selectedIndex].alt}
                            className={`${getSlideAnimationClass()} max-w-full max-h-[80vh] rounded-xl shadow-2xl object-contain select-none`}
                        />
                        <div className="mt-3.5 font-body text-sm text-white/75 tracking-widest">
                            {selectedIndex + 1} / {GALLERY_IMAGES.length}
                        </div>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={handleNext}
                        aria-label="Next image"
                        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-main text-white hover:text-bg text-lg sm:text-xl w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer flex items-center justify-center transition-all duration-200 active:scale-90 z-10"
                    >
                        &#10095;
                    </button>
                </div>
            )}
        </section>
    );
}

export default Gallery;
