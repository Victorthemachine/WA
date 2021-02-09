import React from "react";

function Footer() {
    return (
        <footer>
            <p>
                &copy; {new Date().getFullYear()}{" "}
                <a href="mailto:david.mitic@student.gyarab.cz">UwU Meister and professional E-boy</a>
            </p>
        </footer>
    );
}

export default Footer;