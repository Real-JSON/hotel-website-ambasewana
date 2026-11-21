import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Central event catalog: add or edit event objects here to scale cards and modal details
const events = [
    {
        id: "birthdays",
        name: "Birthday Parties",
        price: "From LKR 85,000",
        description:
            "Celebrate milestones with tailored setups, curated dining options, and a warm, lively atmosphere.",
        rating: "4.8",
        tags: ["Custom Decor", "Private Lounge"],
        imgPath: "/assets/event-images/event-1.jpg",
    },
    {
        id: "weddings",
        name: "Weddings",
        price: "From LKR 450,000",
        description:
            "Host unforgettable ceremonies and receptions with dedicated event coordination and scenic backdrops.",
        rating: "4.9",
        tags: ["Full Planning", "Banquet & Lawn"],
        imgPath: "/assets/event-images/event-2.jpg",
    },
    {
        id: "parties",
        name: "Night Parties",
        price: "From LKR 125,000",
        description:
            "Evening gatherings featuring ambient lighting, signature refreshments, and energetic music setups.",
        rating: "4.7",
        tags: ["Evening Vibe", "Sound & Lighting"],
        imgPath: "/assets/event-images/event-3.jpg",
    },
];

// Returns today's date formatted as YYYY-MM-DD for date input defaults and min bounds
const getTodayISO = () => new Date().toISOString().split("T")[0];

const EventInquiryModal = ({ eventItem, onClose }) => {
    // Stores controlled inquiry form inputs for the selected event
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        eventDate: getTodayISO(),
        guests: "50 Guests",
        notes: "",
    });
    // Toggles between the inquiry form and confirmation summary
    const [submitted, setSubmitted] = useState(false);

    // Locks background page scroll and enables Escape key dismissal while modal is open
    useEffect(() => {
        if (!eventItem) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [eventItem, onClose]);

    // Render nothing when no event is selected
    if (!eventItem) return null;

    // Updates individual form fields from input/select/textarea controls
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Submits the inquiry form (replace with backend API or WhatsApp handoff if needed)
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    // Resets submission view before closing the modal
    const handleResetAndClose = () => {
        setSubmitted(false);
        onClose();
    };

    // Render into document.body so parent section overflow/stacking cannot clip the modal
    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-modal-title"
            onClick={handleResetAndClose}
            className="fixed inset-0 z-999 flex items-start justify-center overflow-y-auto bg-black/80 px-4 py-8 backdrop-blur-md transition-opacity duration-300 sm:px-6 sm:py-12"
        >
            {/* Prevent backdrop click handler from firing when clicking inside the dialog card */}
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative my-auto w-full max-w-xl overflow-hidden rounded-[28px] border border-amber-200/20 bg-[#1b150c] text-white shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)] transition-all duration-300"
            >
                {/* Top Event Preview Banner */}
                <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-52">
                    <img
                        src={eventItem.imgPath}
                        alt={eventItem.name}
                        className="h-full w-full object-cover"
                    />

                    {/* Warm gold-to-espresso gradient for text contrast */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(18,13,6,0.15) 0%, rgba(46,33,12,0.55) 55%, #1b150c 100%)",
                        }}
                    />

                    {/* Modal Close Button */}
                    <button
                        type="button"
                        onClick={handleResetAndClose}
                        aria-label="Close event inquiry modal"
                        className="absolute right-4 top-4 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full border border-amber-100/25 bg-black/45 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-(--main-clr) hover:bg-(--main-clr) hover:text-black active:scale-95"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="size-4"
                        >
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Event Title & Starting Price Badge */}
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-6 pb-4">
                        <div>
                            <span className="mb-1 block font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-(--main-clr)">
                                Plan Your Occasion
                            </span>
                            <h3
                                id="event-modal-title"
                                className="font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                            >
                                {eventItem.name}
                            </h3>
                        </div>

                        <span className="shrink-0 rounded-full border border-amber-200/25 bg-white/15 px-3.5 py-1 font-body text-xs font-semibold text-amber-50 backdrop-blur-md sm:text-sm">
                            {eventItem.price}
                        </span>
                    </div>
                </div>

                {/* Modal Body: Switches between inquiry confirmation and form */}
                <div className="p-6 pt-3 sm:p-7 sm:pt-3">
                    {submitted ? (
                        <div className="rounded-2xl border border-amber-200/20 bg-white/5 p-6 text-center">
                            <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-(--main-clr)/20 text-(--main-clr)">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="size-6"
                                >
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            </div>

                            <h4 className="font-heading text-2xl font-semibold text-white">
                                Event Inquiry Sent
                            </h4>
                            <p className="mx-auto mt-2 max-w-md font-body text-sm leading-relaxed text-amber-50/80">
                                Thank you,{" "}
                                <span className="font-semibold text-white">
                                    {formData.fullName || "Host"}
                                </span>
                                . Your inquiry for{" "}
                                <span className="font-semibold text-amber-100">
                                    {eventItem.name}
                                </span>{" "}
                                on{" "}
                                <span className="font-semibold text-amber-100">
                                    {formData.eventDate}
                                </span>{" "}
                                ({formData.guests}) has been received.
                            </p>

                            {/* Post-submission actions */}
                            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
                                <button
                                    type="button"
                                    onClick={() => setSubmitted(false)}
                                    className="cursor-pointer rounded-full border border-amber-200/25 bg-white/10 px-5 py-2.5 font-body text-xs font-semibold text-amber-50 transition hover:bg-white/20 sm:text-sm"
                                >
                                    Edit Details
                                </button>
                                <button
                                    type="button"
                                    onClick={handleResetAndClose}
                                    className="cursor-pointer rounded-full bg-white px-6 py-2.5 font-body text-xs font-semibold text-neutral-900 transition hover:bg-(--main-clr) hover:text-black sm:text-sm"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <p className="font-body text-xs leading-relaxed text-amber-50/80 sm:text-sm">
                                {eventItem.description}
                            </p>

                            {/* Rating & Feature Tags */}
                            <div className="flex flex-wrap items-center gap-1.5">
                                <span className="inline-flex items-center gap-1 rounded-full border border-amber-200/20 bg-white/10 px-2.5 py-1 font-body text-[11px] font-medium text-amber-50">
                                    ★ {eventItem.rating}
                                </span>
                                {eventItem.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full border border-amber-200/20 bg-white/10 px-2.5 py-1 font-body text-[11px] font-medium text-amber-50/90"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Event Date & Expected Guest Count */}
                            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="eventDate"
                                        className="mb-1.5 block font-body text-xs font-medium text-amber-100/90"
                                    >
                                        Event Date
                                    </label>
                                    <input
                                        id="eventDate"
                                        name="eventDate"
                                        type="date"
                                        min={getTodayISO()}
                                        value={formData.eventDate}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-amber-200/20 bg-white/5 px-3.5 py-2.5 font-body text-sm text-white outline-none transition focus:border-(--main-clr) focus:bg-white/10"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="guests"
                                        className="mb-1.5 block font-body text-xs font-medium text-amber-100/90"
                                    >
                                        Estimated Guests
                                    </label>
                                    <select
                                        id="guests"
                                        name="guests"
                                        value={formData.guests}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-amber-200/20 bg-[#261c0e] px-3.5 py-2.5 font-body text-sm text-white outline-none transition focus:border-(--main-clr)"
                                    >
                                        <option value="25 Guests">
                                            25 Guests
                                        </option>
                                        <option value="50 Guests">
                                            50 Guests
                                        </option>
                                        <option value="100 Guests">
                                            100 Guests
                                        </option>
                                        <option value="150+ Guests">
                                            150+ Guests
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {/* Organizer Full Name */}
                            <div>
                                <label
                                    htmlFor="fullName"
                                    className="mb-1.5 block font-body text-xs font-medium text-amber-100/90"
                                >
                                    Full Name
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    placeholder="Your full name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-amber-200/20 bg-white/5 px-3.5 py-2.5 font-body text-sm text-white placeholder:text-amber-100/35 outline-none transition focus:border-(--main-clr) focus:bg-white/10"
                                />
                            </div>

                            {/* Contact Email & Phone */}
                            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-1.5 block font-body text-xs font-medium text-amber-100/90"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-amber-200/20 bg-white/5 px-3.5 py-2.5 font-body text-sm text-white placeholder:text-amber-100/35 outline-none transition focus:border-(--main-clr) focus:bg-white/10"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="mb-1.5 block font-body text-xs font-medium text-amber-100/90"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="+94 7X XXX XXXX"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-amber-200/20 bg-white/5 px-3.5 py-2.5 font-body text-sm text-white placeholder:text-amber-100/35 outline-none transition focus:border-(--main-clr) focus:bg-white/10"
                                    />
                                </div>
                            </div>

                            {/* Optional Event Notes */}
                            <div>
                                <label
                                    htmlFor="notes"
                                    className="mb-1.5 block font-body text-xs font-medium text-amber-100/90"
                                >
                                    Event Preferences (Optional)
                                </label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    rows="2"
                                    placeholder="Catering menu, theme color palette, DJ/sound needs..."
                                    value={formData.notes}
                                    onChange={handleChange}
                                    className="w-full resize-none rounded-xl border border-amber-200/20 bg-white/5 px-3.5 py-2 font-body text-sm text-white placeholder:text-amber-100/35 outline-none transition focus:border-(--main-clr) focus:bg-white/10"
                                />
                            </div>

                            {/* Submit Event Inquiry */}
                            <button
                                type="submit"
                                className="mt-1 w-full cursor-pointer rounded-full bg-white py-3.5 font-body text-sm font-semibold text-neutral-900 shadow-sm transition-all duration-300 hover:bg-(--main-clr) hover:text-black hover:shadow-md active:scale-[0.98]"
                            >
                                Request Event Quote
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>,
        document.body,
    );
};

const Events = ({ onSelectEvent }) => {
    // Tracks saved/bookmarked state per event ID
    const [savedEvents, setSavedEvents] = useState({});
    // Holds the event currently opened in EventInquiryModal (null when closed)
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Toggles bookmark state for an event card without triggering parent handlers
    const toggleSave = (e, id) => {
        e.stopPropagation();
        setSavedEvents((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // Opens the inquiry modal for the selected event and calls optional parent handler
    const handleEventClick = (eventItem) => {
        setSelectedEvent(eventItem);
        onSelectEvent?.(eventItem);
    };

    return (
        <section
            id="events"
            aria-labelledby="events-heading"
            className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32"
        >
            {/* Section Heading */}
            <div className="mb-12 text-center sm:mb-16">
                <span className="mb-4 block font-body text-xs font-semibold uppercase tracking-[0.3em] text-(--main-clr)">
                    Celebrations & Gatherings
                </span>

                <h2
                    id="events-heading"
                    className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
                >
                    Events & Functions
                </h2>

                <div className="mx-auto mt-6 h-px w-16 bg-(--main-clr)" />
            </div>

            {/* Responsive Event Cards Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {events.map((eventItem) => {
                    const isSaved = !!savedEvents[eventItem.id];

                    return (
                        <article
                            key={eventItem.id}
                            className="group relative isolate flex aspect-[4/5.2] min-h-115 flex-col justify-between overflow-hidden rounded-[28px] border border-amber-200/15 bg-[#1b150c] p-5 shadow-lg transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-amber-300/35 hover:shadow-[0_20px_45px_-12px_rgba(212,175,55,0.22)] sm:p-6"
                        >
                            {/* Full-Bleed Background Event Photo */}
                            <img
                                src={eventItem.imgPath}
                                alt={eventItem.name}
                                loading="lazy"
                                className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />

                            {/* Warm Gold-Infused Dark Bottom Gradient */}
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 -z-10 transition-opacity duration-500"
                                style={{
                                    background:
                                        "linear-gradient(180deg, rgba(18,13,6,0.05) 0%, rgba(36,26,11,0.18) 38%, rgba(69,50,18,0.86) 68%, #261b0b 100%)",
                                }}
                            />

                            {/* Radial Gold Highlight Revealed on Card Hover */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                style={{
                                    background:
                                        "radial-gradient(circle at 75% 78%, rgba(212,175,55,0.22), transparent 60%)",
                                }}
                            />

                            {/* Masked Backdrop Blur Layer for Bottom Text Legibility */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 backdrop-blur-[2px] mask-[linear-gradient(to_top,black_55%,transparent_100%)]"
                            />

                            {/* Top Action Row: Save/Bookmark Button */}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={(e) => toggleSave(e, eventItem.id)}
                                    aria-label={
                                        isSaved
                                            ? `Remove ${eventItem.name} from saved`
                                            : `Save ${eventItem.name}`
                                    }
                                    aria-pressed={isSaved}
                                    className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-amber-100/25 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-amber-200/45 hover:bg-black/35 active:scale-95"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill={isSaved ? "currentColor" : "none"}
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={`size-4 transition-transform duration-300 ${
                                            isSaved
                                                ? "scale-110 text-(--main-clr)"
                                                : "text-white"
                                        }`}
                                    >
                                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Bottom Card Content: Title, Price, Copy, Pills & CTA */}
                            <div className="mt-auto flex flex-col gap-3.5">
                                <div className="flex items-center justify-between gap-3">
                                    <h3 className="font-heading text-xl font-semibold tracking-tight text-white sm:text-2xl">
                                        {eventItem.name}
                                    </h3>

                                    <span className="shrink-0 rounded-full border border-amber-200/25 bg-white/15 px-3 py-1 font-body text-xs font-semibold text-amber-50 backdrop-blur-md sm:text-sm">
                                        {eventItem.price}
                                    </span>
                                </div>

                                <p className="line-clamp-3 font-body text-xs leading-relaxed text-amber-50/85 sm:text-sm">
                                    {eventItem.description}
                                </p>

                                {/* Rating & Event Badges */}
                                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-200/20 bg-white/15 px-2.5 py-1 font-body text-[11px] font-medium text-amber-50 backdrop-blur-md">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            className="size-3.5 text-amber-200"
                                        >
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                        {eventItem.rating}
                                    </span>

                                    {eventItem.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full border border-amber-200/20 bg-white/15 px-2.5 py-1 font-body text-[11px] font-medium text-amber-50/90 backdrop-blur-md"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Primary Inquiry Trigger */}
                                <button
                                    type="button"
                                    onClick={() => handleEventClick(eventItem)}
                                    className="mt-1.5 w-full cursor-pointer rounded-full bg-white py-3 font-body text-sm font-semibold text-neutral-900 shadow-sm transition-all duration-300 hover:bg-(--main-clr) hover:text-black hover:shadow-md active:scale-[0.98]"
                                >
                                    Book now
                                </button>
                            </div>
                        </article>
                    );
                })}
            </div>

            {/* Event Inquiry Modal */}
            <EventInquiryModal
                eventItem={selectedEvent}
                onClose={() => setSelectedEvent(null)}
            />
        </section>
    );
};

export default Events;