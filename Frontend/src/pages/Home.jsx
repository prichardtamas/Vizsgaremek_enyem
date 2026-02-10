import { useEffect } from "react";
import Navbar from "../components/Navbar";
import H_Hero from "../components/Home/H_Hero";
import H_About from "../components/Home/H_About";
import H_Events from "../components/Home/H_Events";
import H_Contact from "../components/Home/H_Contact";
import Footer from "../components/Footer";

function Home() {
    const handleLoginClick = () => {
        alert(
            "A bejelentkezési oldal jelenleg fejlesztés alatt áll. Kérjük, próbáld újra később, vagy használd a kapcsolati űrlapot!"
        );
    };

    const handleRegisterClick = () => {
        alert(
            "A regisztrációs oldal jelenleg fejlesztés alatt áll. Kérjük, próbáld újra később, vagy használd a kapcsolati űrlapot!"
        );
    };

    const handleHeroRegisterClick = () => {
        const contact = document.getElementById("contact");
        contact?.scrollIntoView({ behavior: "smooth" });
    };

    const handleEventClick = () => {
        alert(
            "Az események részletes oldala hamarosan elérhető lesz! Addig is kérjük, használd a kapcsolati űrlapot további információkért."
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const subject = e.target.subject.value;
        const message = e.target.message.value;

        if (!name || !email || !subject || !message) {
            alert("Kérjük, töltsd ki az összes kötelező mezőt!");
            return;
        }

        alert(
            `Köszönjük üzeneted, ${name}! Hamarosan felvesszük veled a kapcsolatot a megadott email címen (${email}).`
        );

        e.target.reset();
    };

    useEffect(() => {
        const navbar = document.querySelector(".navbar");

        const handleScroll = () => {
            if (window.scrollY > 50) {
                navbar?.classList.add("scrolled");
            } else {
                navbar?.classList.remove("scrolled");
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <Navbar onLogin={handleLoginClick} onRegister={handleRegisterClick} />
            <H_Hero onRegisterClick={handleHeroRegisterClick} />
            <H_About />
            <H_Events onEventClick={handleEventClick} />
            <H_Contact onSubmit={handleSubmit} />
            <Footer />
        </>
    );
}

export default Home;
