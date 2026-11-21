import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Static room catalog displayed in the cards and booking modal (Rs. 5,000 - 10,000 range)
const rooms = [
    {
        id: "king-rooms",
        name: "King Rooms",
        price: "Rs. 6,500",
        nightlyRate: 6500,
        description:
            "Escape to a peaceful retreat tucked in lush surroundings, perfect for a slow, mindful reset.",
        rating: "4.7",
        tags: ["Nature Stay", "3 Day Escape"],
        imgPath: "/assets/rooms/room-3.jpg",
    },
    {
        id: "couple-rooms",
        name: "Couple Rooms",
        price: "Rs. 8,000",
        nightlyRate: 8000,
        description:
            "Experience a serene suite with panoramic views, private balcony, and magical sunset horizons.",
        rating: "4.8",
        tags: ["Romantic Stay", "2 Night Trip"],
        imgPath: "/assets/rooms/room-1.jpg",
    },
    {
        id: "guest-rooms",
        name: "Guest Rooms",
        price: "Rs. 9,800",
        nightlyRate: 9800,
        description:
            "Elevated comfort with floor-to-ceiling windows, warm ambient interiors, and tranquil views.",
        rating: "4.9",
        tags: ["Luxury Stay", "City Lights"],
        imgPath: "/assets/rooms/room-2.jpg",
    },
];

// Returns today's date formatted as YYYY-MM-DD for date input defaults and min bounds
const getTodayISO = () => new Date().toISOString().split("T")[0];

// Returns tomorrow's date formatted as YYYY-MM-DD for default check-out selection
const getTomorrowISO = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
};

// Computes stay duration in nights; defaults to 1 night if dates are invalid or non-positive
const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
};

const BookingModal = ({ room, onClose }) => {
    // Stores controlled booking form inputs
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        checkIn: getTodayISO(),
        checkOut: getTomorrowISO(),
        guests: "2 Guests",
        notes: "",
    });
    // Toggles between the booking form and confirmation view
    const [submitted, setSubmitted] = useState(false);

    // Locks background scroll and listens for Escape key while modal is active
    useEffect(() => {
        if (!room) return;

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
    }, [room, onClose]);

    // Do not render anything when no room is selected
    if (!room) return null;

    // Derive stay nights and formatted estimated total in Rs. from selected dates and nightly rate
    const nights = calculateNights(formData.checkIn, formData.checkOut);
    const estimatedTotal = room.nightlyRate
        ? `Rs. ${(room.nightlyRate * nights).toLocaleString()}`
        : null;

    // Updates form fields and keeps check-out at least one day after check-in
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            const updated = { ...prev, [name]: value };
            if (name === "checkIn" && updated.checkOut <= value) {
                const nextDay = new Date(value);
                nextDay.setDate(nextDay.getDate() + 1);
                updated.checkOut = nextDay.toISOString().split("T")[0];
            }
            return updated;
        });
    };

    // Handles form submission (replace with API call or WhatsApp integration as needed)
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    // Resets submission state before closing the modal
    const handleResetAndClose = () => {
        setSubmitted(false);
        onClose();
    };

    // Render into document.body so parent section stacking/overflow styles cannot clip the modal
    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            onClick={handleResetAndClose}
            className="fixed inset-0 z-999 flex items-start justify-center overflow-y-auto bg-black/80 px-4 py-8 backdrop-blur-md transition-opacity duration-300 sm:px-6 sm:py-12"
        >
            {/* Stop backdrop click propagation when interacting inside the modal card */}
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative my-auto w-full max-w-xl overflow-hidden rounded-[28px] border border-amber-200/20 bg-[#1b150c] text-white shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)] transition-all duration-300"
            >
                {/* Top Room Preview Banner */}
                <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-52">
                    <img
                        src={room.imgPath}
                        alt={room.name}
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
                        aria-label="Close booking modal"
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

                    {/* Room Title & Price Badge */}
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-6 pb-4">
                        <div>
                            <span className="mb-1 block font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-(--main-clr)">
                                Reserve Your Stay
                            </span>
                            <h3
                                id="booking-modal-title"
                                className="font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                            >
                                {room.name}
                            </h3>
                        </div>

                        <span className="shrink-0 rounded-full border border-amber-200/25 bg-white/15 px-3.5 py-1 font-body text-xs font-semibold text-amber-50 backdrop-blur-md sm:text-sm">
                            {room.price}
                        </span>
                    </div>
                </div>

                {/* Modal Body: Switches between confirmation summary and booking form */}
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
                                Booking Request Sent
                            </h4>
                            <p className="mx-auto mt-2 max-w-md font-body text-sm leading-relaxed text-amber-50/80">
                                Thank you,{" "}
                                <span className="font-semibold text-white">
                                    {formData.fullName || "Guest"}
                                </span>
                                . Your request for{" "}
                                <span className="font-semibold text-amber-100">
                                    {room.name}
                                </span>{" "}
                                ({nights} {nights === 1 ? "night" : "nights"},{" "}
                                {formData.guests}) has been received.
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
                                {room.description}
                            </p>

                            {/* Rating & Feature Tags */}
                            <div className="flex flex-wrap items-center gap-1.5">
                                <span className="inline-flex items-center gap-1 rounded-full border border-amber-200/20 bg-white/10 px-2.5 py-1 font-body text-[11px] font-medium text-amber-50">
                                    ★ {room.rating}
                                </span>
                                {room.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full border border-amber-200/20 bg-white/10 px-2.5 py-1 font-body text-[11px] font-medium text-amber-50/90"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Check-in & Check-out Date Inputs */}
                            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="checkIn"
                                        className="mb-1.5 block font-body text-xs font-medium text-amber-100/90"
                                    >
                                        Check-in
                                    </label>
                                    <input
                                        id="checkIn"
                                        name="checkIn"
                                        type="date"
                                        min={getTodayISO()}
                                        value={formData.checkIn}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-amber-200/20 bg-white/5 px-3.5 py-2.5 font-body text-sm text-white outline-none transition focus:border-(--main-clr) focus:bg-white/10"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="checkOut"
                                        className="mb-1.5 block font-body text-xs font-medium text-amber-100/90"
                                    >
                                        Check-out
                                    </label>
                                    <input
                                        id="checkOut"
                                        name="checkOut"
                                        type="date"
                                        min={
                                            formData.checkIn || getTomorrowISO()
                                        }
                                        value={formData.checkOut}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-amber-200/20 bg-white/5 px-3.5 py-2.5 font-body text-sm text-white outline-none transition focus:border-(--main-clr) focus:bg-white/10"
                                    />
                                </div>
                            </div>

                            {/* Guest Name & Guest Count */}
                            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
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

                                <div>
                                    <label
                                        htmlFor="guests"
                                        className="mb-1.5 block font-body text-xs font-medium text-amber-100/90"
                                    >
                                        Guests
                                    </label>
                                    <select
                                        id="guests"
                                        name="guests"
                                        value={formData.guests}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-amber-200/20 bg-[#261c0e] px-3.5 py-2.5 font-body text-sm text-white outline-none transition focus:border-(--main-clr)"
                                    >
                                        <option value="1 Guest">1 Guest</option>
                                        <option value="2 Guests">
                                            2 Guests
                                        </option>
                                        <option value="3 Guests">
                                            3 Guests
                                        </option>
                                        <option value="4 Guests">
                                            4 Guests
                                        </option>
                                    </select>
                                </div>
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

                            {/* Optional Special Requests */}
                            <div>
                                <label
                                    htmlFor="notes"
                                    className="mb-1.5 block font-body text-xs font-medium text-amber-100/90"
                                >
                                    Special Requests (Optional)
                                </label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    rows="2"
                                    placeholder="Late check-in, quiet floor, airport pickup..."
                                    value={formData.notes}
                                    onChange={handleChange}
                                    className="w-full resize-none rounded-xl border border-amber-200/20 bg-white/5 px-3.5 py-2 font-body text-sm text-white placeholder:text-amber-100/35 outline-none transition focus:border-(--main-clr) focus:bg-white/10"
                                />
                            </div>

                            {/* Estimated Stay Cost Summary */}
                            {estimatedTotal && (
                                <div className="flex items-center justify-between rounded-2xl border border-amber-200/15 bg-white/5 px-4 py-3 font-body text-xs sm:text-sm">
                                    <span className="text-amber-50/75">
                                        {room.price} × {nights}{" "}
                                        {nights === 1 ? "night" : "nights"}
                                    </span>
                                    <span className="font-semibold text-amber-100">
                                        Estimated: {estimatedTotal}
                                    </span>
                                </div>
                            )}

                            {/* Submit Booking Request */}
                            <button
                                type="submit"
                                className="mt-1 w-full cursor-pointer rounded-full bg-white py-3.5 font-body text-sm font-semibold text-neutral-900 shadow-sm transition-all duration-300 hover:bg-(--main-clr) hover:text-black hover:shadow-md active:scale-[0.98]"
                            >
                                Confirm Booking Request
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>,
        document.body,
    );
};

const Rooms = ({ onBookRoom }) => {
    // Tracks saved/bookmarked state per room ID
    const [savedRooms, setSavedRooms] = useState({});
    // Holds the room currently opened in BookingModal (null when closed)
    const [selectedRoom, setSelectedRoom] = useState(null);

    // Toggles bookmark state for a room card without triggering parent handlers
    const toggleSave = (e, id) => {
        e.stopPropagation();
        setSavedRooms((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // Opens the booking modal for the clicked room and notifies optional parent callback
    const handleBookClick = (room) => {
        setSelectedRoom(room);
        onBookRoom?.(room);
    };

    return (
        <section
            id="rooms"
            aria-labelledby="rooms-heading"
            className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32"
        >
            {/* Section Heading (Matches centered eyebrow + serif heading + gold line style) */}
            <div className="mb-12 text-center sm:mb-16">
                <span className="mb-4 block font-body text-xs font-semibold uppercase tracking-[0.3em] text-(--main-clr)">
                    Your Stay, Your Comfort
                </span>

                <h2
                    id="rooms-heading"
                    className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
                >
                    Rooms & Accommodations
                </h2>

                <div className="mx-auto mt-6 h-px w-16 bg-(--main-clr)" />
            </div>

            {/* Responsive Room Cards Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {rooms.map((room) => {
                    const isSaved = !!savedRooms[room.id];

                    return (
                        <article
                            key={room.id}
                            className="group relative isolate flex aspect-[4/5.2] min-h-115 flex-col justify-between overflow-hidden rounded-[28px] border border-amber-200/15 bg-[#1b150c] p-5 shadow-lg transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-amber-300/35 hover:shadow-[0_20px_45px_-12px_rgba(212,175,55,0.22)] sm:p-6"
                        >
                            {/* Full-Bleed Background Room Photo */}
                            <img
                                src={room.imgPath}
                                alt={room.name}
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
                                    onClick={(e) => toggleSave(e, room.id)}
                                    aria-label={
                                        isSaved
                                            ? `Remove ${room.name} from saved`
                                            : `Save ${room.name}`
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
                                        {room.name}
                                    </h3>

                                    <span className="shrink-0 rounded-full border border-amber-200/25 bg-white/15 px-3 py-1 font-body text-xs font-semibold text-amber-50 backdrop-blur-md sm:text-sm">
                                        {room.price}
                                    </span>
                                </div>

                                <p className="line-clamp-3 font-body text-xs leading-relaxed text-amber-50/85 sm:text-sm">
                                    {room.description}
                                </p>

                                {/* Rating & Category Badges */}
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
                                        {room.rating}
                                    </span>

                                    {room.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full border border-amber-200/20 bg-white/15 px-2.5 py-1 font-body text-[11px] font-medium text-amber-50/90 backdrop-blur-md"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Primary Booking Trigger */}
                                <button
                                    type="button"
                                    onClick={() => handleBookClick(room)}
                                    className="mt-1.5 w-full cursor-pointer rounded-full bg-white py-3 font-body text-sm font-semibold text-neutral-900 shadow-sm transition-all duration-300 hover:bg-(--main-clr) hover:text-black hover:shadow-md active:scale-[0.98]"
                                >
                                    Book now
                                </button>
                            </div>
                        </article>
                    );
                })}
            </div>

            {/* Room Booking Modal */}
            <BookingModal
                room={selectedRoom}
                onClose={() => setSelectedRoom(null)}
            />
        </section>
    );
};

export default Rooms;
