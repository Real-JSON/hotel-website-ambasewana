import Hero from "../features/landing/Hero";
import About from "../features/landing/About";
import Rooms from "../features/landing/Rooms";
import Events from "../features/landing/Events";
import Gallery from "../features/landing/Gallery";
import FAQ from "../features/landing/FAQ";

const Home = () => {
    return (
        <>
            <title>Hotel Ambasewana | Ussapitiya</title>
            <meta
                name="description"
                content="Book your stay at Ambasewana Hotel. Luxury rooms, weddings, and events in Ussapitiya. Best prices guaranteed."
            />
            <meta
                name="keywords"
                content="hotel, sri lanka, rooms, wedding hall, ambasewana"
            />
            <section id="hero">
                <Hero />
            </section>
            <section id="about">
                <About />
            </section>
            <section id="rooms">
                <Rooms />
            </section>
            <section id="events">
                <Events />
            </section>
            <section id="gallery">
                <Gallery />
            </section>
            <section id="location">
                <FAQ />
            </section>
        </>
    );
};

export default Home;
