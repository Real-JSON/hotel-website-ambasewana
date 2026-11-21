const About = () => {
    return (
        <section
            id="about"
            aria-labelledby="about-heading"
            className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32"
        >
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                {/* Image */}
                <div className="relative overflow-hidden rounded-2xl">
                    <img
                        src="/assets/about-image/about-us.jpg"
                        alt="The heritage architecture and surroundings of Hotel Ambasewana Walawwa"
                        className="aspect-4/5 w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                        loading="lazy"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col items-start">
                    <span className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--main-clr)]">
                        Discover Our Story
                    </span>

                    <h2
                        id="about-heading"
                        className="font-[var(--heading-font)] text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
                    >
                        A timeless escape,
                        <span className="mt-2 block italic font-normal">
                            rooted in heritage.
                        </span>
                    </h2>

                    <div className="my-8 h-px w-16 bg-[var(--main-clr)]" />

                    <p className="max-w-xl text-base leading-8 text-current/75 sm:text-lg">
                        Nestled in the serene countryside of Ussapitiya, Hotel
                        Ambasewana Walawwa is a timeless retreat that blends
                        heritage, luxury, and nature.
                    </p>

                    <p className="mt-5 max-w-xl text-base leading-8 text-current/75 sm:text-lg">
                        Built on a rich history, our hotel embodies the charm of
                        a traditional Walawwa while offering the comforts of a
                        modern stay. From its grand architecture to its warm
                        hospitality, every corner of our hotel tells a story of
                        elegance and tradition.
                    </p>

                    <p className="mt-5 max-w-xl text-base leading-8 text-current/75 sm:text-lg">
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
