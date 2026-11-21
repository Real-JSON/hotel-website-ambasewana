const About = () => {
    return (
        <section
            id="about"
            aria-labelledby="about-heading"
            className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-32"
        >
            <div className="grid grid-cols-1 items-end gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
                {/* Image */}
                <div className="mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none">
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                        <img
                            src="/assets/about-image/about-us.jpg"
                            alt="The heritage architecture and surroundings of Hotel Ambasewana Walawwa"
                            className="w-full object-cover sm:aspect-square lg:aspect-4/5"
                            loading="lazy"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col items-start">
                    <span className="font-body mb-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--main-clr)] sm:mb-5 sm:text-xs sm:tracking-[0.3em]">
                        Discover Our Story
                    </span>

                    <h2
                        id="about-heading"
                        className="font-heading text-[2.15rem] font-semibold leading-[1.12] tracking-tight text-[var(--text-clr)] sm:text-5xl lg:text-[3.5rem] xl:text-[4.25rem]"
                    >
                        A timeless escape,
                        <span className="font-description mt-1.5 block text-[2.35rem] italic font-normal leading-[1.1] text-[var(--text-clr)]/95 sm:mt-2 sm:text-[3.35rem] lg:text-[3.85rem] xl:text-[4.65rem]">
                            rooted in heritage.
                        </span>
                    </h2>

                    <div className="my-6 h-px w-14 bg-[var(--main-clr)] sm:my-8 sm:w-16" />

                    <p className="font-body max-w-xl text-[15px] leading-7 text-current/75 sm:text-base sm:leading-8">
                        Nestled in the serene countryside of Ussapitiya, Hotel
                        Ambasewana Walawwa is a timeless retreat that blends
                        heritage, luxury, and nature.
                    </p>

                    <p className="font-body mt-4 max-w-xl text-[15px] leading-7 text-current/75 sm:mt-5 sm:text-base sm:leading-8">
                        Built on a rich history, our hotel embodies the charm of
                        a traditional Walawwa while offering the comforts of a
                        modern stay. From its grand architecture to its warm
                        hospitality, every corner of our hotel tells a story of
                        elegance and tradition.
                    </p>

                    <p className="font-body mt-4 max-w-xl text-[15px] leading-7 text-current/75 sm:mt-5 sm:text-base sm:leading-8">
                        Whether you&apos;re seeking a peaceful escape, a family
                        getaway, or an intimate destination for special
                        occasions, we invite you to experience the beauty and
                        warmth of Ambasewana Walawwa.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
