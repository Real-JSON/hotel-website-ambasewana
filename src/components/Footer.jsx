import { navLinks } from "../../constants";

const HOTEL_MAP_QUERY =
    "Ambasewana Walawwa, Aranayaka Road, Mawanella, Ussapitiya, Sri Lanka";

const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    HOTEL_MAP_QUERY,
)}`;

const FooterNew = () => {
    const date = new Date();

    return (
        <footer className="px-[3%] mt-40 flex flex-col">
            <div className="flex justify-center">
                <img
                    src="/assets/logo/logo-1.png"
                    alt="site-logo"
                    className="w-32 h-auto mb-16 cursor-pointer block"
                />
            </div>

            <hr className="border-0 border-t border-white/[0.078] m-0" />

            <div className="px-[5%] py-[4%] w-full flex flex-col lg:flex-row gap-8 lg:justify-between">
                <menu className="order-first lg:order-0 flex flex-col text-center lg:text-left gap-[0.8rem] p-0 m-0 list-none">
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a
                                href={`#${link.id}`}
                                className="font-body text-[0.85rem] transition-[color] duration-250 hover:text-main no-underline"
                            >
                                {link.title}
                            </a>
                        </li>
                    ))}
                </menu>

                <menu className="flex flex-col text-center lg:text-left gap-[0.8rem] p-0 m-0 list-none">
                    <li>
                        <a
                            href="#"
                            className="font-body text-[0.85rem] transition-[color] duration-250 hover:text-main no-underline"
                        >
                            Accomodation
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="font-body text-[0.85rem] transition-[color] duration-250 hover:text-main no-underline"
                        >
                            Weddings
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="font-body text-[0.85rem] transition-[color] duration-250 hover:text-main no-underline"
                        >
                            Experiences
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="font-body text-[0.85rem] transition-[color] duration-250 hover:text-main no-underline"
                        >
                            Promotions
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="font-body text-[0.85rem] transition-[color] duration-250 hover:text-main no-underline"
                        >
                            Meetings
                        </a>
                    </li>
                </menu>

                <div className="order-2 lg:-order-2 text-center lg:text-left">
                    <p className="font-body text-[0.85rem] m-0 flex items-center justify-center lg:justify-start gap-2.5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="w-4 h-4 shrink-0 text-main"
                        >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <a
                            href="tel:+94 76 167 7739"
                            className="hover:text-main transition-colors duration-200 no-underline"
                        >
                            +94 76 167 7739
                        </a>
                    </p>

                    <p className="font-body pt-4 text-[0.85rem] m-0 flex items-center justify-center lg:justify-start gap-2.5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="w-4 h-4 shrink-0 text-main"
                        >
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        <a
                            href="mailto:ambasewanawalawwa1@gmail.com"
                            className="hover:text-main transition-colors duration-200 no-underline break-all sm:break-normal"
                        >
                            Inquiries: ambasewanawalawwa1@gmail.com
                        </a>
                    </p>

                    <div className="pt-4 flex justify-center lg:justify-start">
                        <a
                            href={GOOGLE_MAPS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Open Ambasewana Walawwa in Google Maps"
                            className="group/loc inline-flex items-start gap-2.5 text-center lg:text-left no-underline transition-colors duration-200 hover:text-main"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                                className="w-4 h-4 mt-0.5 shrink-0 text-main"
                            >
                                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            <p className="font-body tracking-[0.04rem] leading-6 text-[0.85rem]">
                                Ambasewana Walawwa <br />
                                Aranayaka Road, Mawanella, <br />
                                Ussapitiya, Sri Lanka.
                            </p>
                        </a>
                    </div>

                    <div className="pt-12 flex justify-center lg:justify-start gap-8">
                        <a
                            href="https://www.facebook.com/profile.php?id=100028371957309"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className="group/icon inline-flex items-center justify-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="rgba(255,255,255,1)"
                                width="24"
                                height="24"
                            >
                                <path
                                    d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47062 14 5.5 16 5.5H17.5V2.1401C17.1743 2.09685 15.943 2 14.6429 2C11.9284 2 10 3.65686 10 6.69971V9.5H7V13.5H10V22H14V13.5Z"
                                    className="transition-colors duration-250 ease-in-out group-hover/icon:fill-[#a39752]"
                                />
                            </svg>
                        </a>
                        <a
                            href="#"
                            aria-label="Twitter"
                            className="group/icon inline-flex items-center justify-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="rgba(255,255,255,1)"
                                width="24"
                                height="24"
                            >
                                <path
                                    d="M22.2125 5.65605C21.4491 5.99375 20.6395 6.21555 19.8106 6.31411C20.6839 5.79132 21.3374 4.9689 21.6493 4.00005C20.8287 4.48761 19.9305 4.83077 18.9938 5.01461C18.2031 4.17106 17.098 3.69303 15.9418 3.69434C13.6326 3.69434 11.7597 5.56661 11.7597 7.87683C11.7597 8.20458 11.7973 8.52242 11.8676 8.82909C8.39047 8.65404 5.31007 6.99005 3.24678 4.45941C2.87529 5.09767 2.68005 5.82318 2.68104 6.56167C2.68104 8.01259 3.4196 9.29324 4.54149 10.043C3.87737 10.022 3.22788 9.84264 2.64718 9.51973C2.64654 9.5373 2.64654 9.55487 2.64654 9.57148C2.64654 11.5984 4.08819 13.2892 6.00199 13.6731C5.6428 13.7703 5.27232 13.8194 4.90022 13.8191C4.62997 13.8191 4.36771 13.7942 4.11279 13.7453C4.64531 15.4065 6.18886 16.6159 8.0196 16.6491C6.53813 17.8118 4.70869 18.4426 2.82543 18.4399C2.49212 18.4402 2.15909 18.4205 1.82812 18.3811C3.74004 19.6102 5.96552 20.2625 8.23842 20.2601C15.9316 20.2601 20.138 13.8875 20.138 8.36111C20.138 8.1803 20.1336 7.99886 20.1256 7.81997C20.9443 7.22845 21.651 6.49567 22.2125 5.65605Z"
                                    className="transition-colors duration-250 ease-in-out group-hover/icon:fill-[#a39752]"
                                />
                            </svg>
                        </a>
                        <a
                            href="#"
                            aria-label="Instagram"
                            className="group/icon inline-flex items-center justify-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="rgba(255,255,255,1)"
                                width="24"
                                height="24"
                            >
                                <path
                                    d="M12.001 9C10.3436 9 9.00098 10.3431 9.00098 12C9.00098 13.6573 10.3441 15 12.001 15C13.6583 15 15.001 13.6569 15.001 12C15.001 10.3427 13.6579 9 12.001 9ZM12.001 7C14.7614 7 17.001 9.2371 17.001 12C17.001 14.7605 14.7639 17 12.001 17C9.24051 17 7.00098 14.7629 7.00098 12C7.00098 9.23953 9.23808 7 12.001 7ZM18.501 6.74915C18.501 7.43926 17.9402 7.99917 17.251 7.99917C16.5609 7.99917 16.001 7.4384 16.001 6.74915C16.001 6.0599 16.5617 5.5 17.251 5.5C17.9393 5.49913 18.501 6.0599 18.501 6.74915ZM12.001 4C9.5265 4 9.12318 4.00655 7.97227 4.0578C7.18815 4.09461 6.66253 4.20007 6.17416 4.38967C5.74016 4.55799 5.42709 4.75898 5.09352 5.09255C4.75867 5.4274 4.55804 5.73963 4.3904 6.17383C4.20036 6.66332 4.09493 7.18811 4.05878 7.97115C4.00703 9.0752 4.00098 9.46105 4.00098 12C4.00098 14.4745 4.00753 14.8778 4.05877 16.0286C4.0956 16.8124 4.2012 17.3388 4.39034 17.826C4.5591 18.2606 4.7605 18.5744 5.09246 18.9064C5.42863 19.2421 5.74179 19.4434 6.17187 19.6094C6.66619 19.8005 7.19148 19.9061 7.97212 19.9422C9.07618 19.9939 9.46203 20 12.001 20C14.4755 20 14.8788 19.9934 16.0296 19.9422C16.8117 19.9055 17.3385 19.7996 17.827 19.6106C18.2604 19.4423 18.5752 19.2402 18.9074 18.9085C19.2436 18.5718 19.4445 18.2594 19.6107 17.8283C19.8013 17.3358 19.9071 16.8098 19.9432 16.0289C19.9949 14.9248 20.001 14.5389 20.001 12C20.001 9.52552 19.9944 9.12221 19.9432 7.97137C19.9064 7.18906 19.8005 6.66149 19.6113 6.17318C19.4434 5.74038 19.2417 5.42635 18.9084 5.09255C18.573 4.75715 18.2616 4.55693 17.8271 4.38942C17.338 4.19954 16.8124 4.09396 16.0298 4.05781C14.9258 4.00605 14.5399 4 12.001 4ZM12.001 2C14.7176 2 15.0568 2.01 16.1235 2.06C17.1876 2.10917 17.9135 2.2775 18.551 2.525C19.2101 2.77917 19.7668 3.1225 20.3226 3.67833C20.8776 4.23417 21.221 4.7925 21.476 5.45C21.7226 6.08667 21.891 6.81333 21.941 7.8775C21.9885 8.94417 22.001 9.28333 22.001 12C22.001 14.7167 21.991 15.0558 21.941 16.1225C21.8918 17.1867 21.7226 17.9125 21.476 18.55C21.2218 19.2092 20.8776 19.7658 20.3226 20.3217C19.7668 20.8767 19.2076 21.22 18.551 21.475C17.9135 21.7217 17.1876 21.89 16.1235 21.94C15.0568 21.9875 14.7176 22 12.001 22C9.28431 22 8.94514 21.99 7.87848 21.94C6.81431 21.8908 6.08931 21.7217 5.45098 21.475C4.79264 21.2208 4.23514 20.8767 3.67931 20.3217C3.12348 19.7658 2.78098 19.2067 2.52598 18.55C2.27848 17.9125 2.11098 17.1867 2.06098 16.1225C2.01348 15.0558 2.00098 14.7167 2.00098 12C2.00098 9.28333 2.01098 8.94417 2.06098 7.8775C2.11014 6.8125 2.27848 6.0875 2.52598 5.45C2.78014 4.79167 3.12348 4.23417 3.67931 3.67833C4.23514 3.1225 4.79348 2.78 5.45098 2.525C6.08848 2.2775 6.81348 2.11 7.87848 2.06C8.94514 2.0125 9.28431 2 12.001 2Z"
                                    className="transition-colors duration-250 ease-in-out group-hover/icon:fill-[#a39752]"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <hr className="border-0 border-t border-white/[0.078] m-0" />

            <div className="text-white/[0.304] px-[5%] py-4 lg:flex justify-between items-start text-[0.8rem] font-body">
                <div className="text-center lg:text-left">
                    <p className="m-0">
                        <a href="" className="hover:underline no-underline">
                            Terms &amp; Conditions
                        </a>{" "}
                        |{" "}
                        <a href="" className="hover:underline no-underline">
                            Privacy Policy
                        </a>
                    </p>
                    <p className="pt-[0.8rem] m-0">
                        All Rights Reserved by Hotel Ambasewana. &copy;{" "}
                        {date.getFullYear()}
                    </p>
                </div>

                <div className="pt-[0.8rem] lg:pt-0 text-center lg:text-right">
                    <p className="m-0">
                        Website Designed and Developed by Januda Amaneth
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default FooterNew;
