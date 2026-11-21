import { useState } from "react";

const FAQ_ITEMS = [
    {
        id: "location-access",
        question:
            "Where is Ambasewana Walawwa located and how easy is it to reach?",
        answer: "We are nestled in the peaceful heart of Ussapitiya, surrounded by lush greenery and scenic views while remaining accessible for guests traveling from nearby towns and highways.",
    },
    {
        id: "booking-changes",
        question: "Can I modify or cancel my reservation after booking?",
        answer: "Yes, reservation changes or cancellations can be requested depending on your booking terms and advance notice. Reach out to our team directly and we will help with available options.",
    },
    {
        id: "check-in-out",
        question: "What are the check-in and check-out times?",
        answer: "Standard check-in and check-out windows are arranged around smooth guest arrival and room preparation. Let us know if you need an early arrival or late departure so we can check availability.",
    },
    {
        id: "surroundings",
        question: "What can guests explore around Ussapitiya?",
        answer: "Guests can enjoy quiet walks, scenic viewpoints, waterfalls, temples, and local village spots nearby—ideal if you want a calm getaway balanced with light exploration.",
    },
    {
        id: "direct-help",
        question: "How can I contact you if I have a special request?",
        answer: "You can reach out through our contact details in the footer or booking section for custom stay inquiries, group plans, or travel guidance before your visit.",
    },
];

// Replace with your own local image/media path or video modal/player handler
const FAQ_MEDIA_SRC = "/assets/image-gallery/3-3.jpg";

function FAQ() {
    const [openId, setOpenId] = useState(null);

    const toggleItem = (id) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <section
            id="faq"
            className="max-w-7xl mx-auto my-16 md:my-24 px-4 sm:px-6"
        >
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-8 md:mb-12 gap-5">
                <div className="flex flex-col items-start gap-3">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-main/15 border border-main text-main font-body text-xs sm:text-sm font-medium tracking-wide">
                        FAQs
                    </span>
                    <h2 className="font-heading text-4xl sm:text-5xl md:text-[3.2rem] font-bold leading-tight m-0">
                        Got Questions?
                        <br />
                        We&apos;re Here to Help.
                    </h2>
                </div>

                <p className="font-description text-base sm:text-lg md:text-xl opacity-85 max-w-md text-left lg:text-right leading-relaxed m-0">
                    Find quick answers to{" "}
                    <span className="font-semibold text-main">
                        common questions
                    </span>{" "}
                    about stays, reservations, Ussapitiya directions, and
                    more—so you can plan with confidence.
                </p>
            </div>

            {/* Main 2-Column Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                {/* Left Accordion List */}
                <div className="lg:col-span-6 divide-y divide-white/10 border-t border-b border-white/10">
                    {FAQ_ITEMS.map((item) => {
                        const isOpen = openId === item.id;

                        return (
                            <div key={item.id} className="py-4 sm:py-5">
                                <button
                                    type="button"
                                    onClick={() => toggleItem(item.id)}
                                    aria-expanded={isOpen}
                                    className="w-full flex items-center justify-between gap-4 text-left bg-transparent border-0 p-0 cursor-pointer group"
                                >
                                    <span
                                        className={`font-body text-sm sm:text-base font-semibold transition-colors duration-200 ${
                                            isOpen
                                                ? "text-main"
                                                : "text-white group-hover:text-main"
                                        }`}
                                    >
                                        {item.question}
                                    </span>

                                    <span
                                        aria-hidden="true"
                                        className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-xs transition-all duration-300 ${
                                            isOpen
                                                ? "border-main bg-main text-bg rotate-180"
                                                : "border-white/20 text-white/80 group-hover:border-main group-hover:text-main"
                                        }`}
                                    >
                                        &#9662;
                                    </span>
                                </button>

                                <div
                                    className={`grid transition-all duration-300 ease-out ${
                                        isOpen
                                            ? "grid-rows-[1fr] opacity-100 pt-3"
                                            : "grid-rows-[0fr] opacity-0 pt-0"
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="font-description text-base sm:text-lg text-white/80 leading-relaxed m-0 pr-6">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Right Visual / Media Preview Card */}
                <div className="lg:col-span-6">
                    <div className="relative w-full h-[300px] sm:h-[380px] lg:h-[460px] rounded-2xl overflow-hidden bg-[#181818] border border-white/10 group">
                        <img
                            src={FAQ_MEDIA_SRC}
                            alt="Ambasewana Walawwa serene view"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover block brightness-90 group-hover:scale-105 transition-transform duration-500 ease-out"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                            <div>
                                <span className="inline-block font-body text-[11px] uppercase tracking-widest text-main mb-1">
                                    Ambasewana Walawwa
                                </span>
                                <p className="font-heading text-xl sm:text-2xl text-white m-0">
                                    Calm Stays, Clear Details
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FAQ;
