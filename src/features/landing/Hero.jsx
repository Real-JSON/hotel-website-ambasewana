function Hero() {
    return (
        <section className="relative isolate flex min-h-svh w-full items-end overflow-hidden bg-bg">
            {/* Hero Image */}
            <img
                src="/assets/hero-image/hero-image.jpg"
                alt=""
                className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
            />

            {/* Image Overlay */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

            {/* Hero Content */}
            <div className="mx-auto w-full max-w-7xl px-5 pb-12 pt-32 sm:px-8 sm:pb-16 md:px-12 lg:pb-20">
                <div className="max-w-4xl">
                    <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.25em] text-main sm:text-sm">
                        Welcome to Hotel
                    </p>

                    <h1 className="font-heading text-[clamp(2.8rem,8.5vw,7.5rem)] font-medium leading-[0.95] tracking-tight text-white">
                        Ambasewana
                    </h1>

                    <p className="mt-4 max-w-xl font-description text-[clamp(1.25rem,3vw,2rem)] italic leading-snug text-white/90">
                        Where Heritage Meets Luxury!
                    </p>

                    <button
                        type="button"
                        className="group mt-8 inline-flex min-h-14 items-center gap-5 rounded-full border border-white/70 px-6 py-3 font-body text-sm font-semibold uppercase tracking-wider text-white transition-colors duration-300 hover:border-main hover:bg-main hover:text-bg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main"
                    >
                        Book Now
                        <span className="flex size-8 items-center justify-center rounded-full bg-main text-bg transition-transform duration-300 group-hover:rotate-45">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="size-4"
                                aria-hidden="true"
                            >
                                <path d="M7 17 17 7M7 7h10v10" />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Hero;
