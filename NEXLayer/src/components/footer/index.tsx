// Footer.js
import Link from "next/link";
import React from "react";
import { FaDribbble, FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { AnimatedTooltip } from "../ui/animated-tooltip";

const footerLinks = [
    { title: "About", url: "#" },
    { title: "Careers", url: "#" },
    { title: "History", url: "#" },
    { title: "Services", url: "#" },
    { title: "Projects", url: "#" },
    { title: "Blog", url: "#" }
];

const socialMediaIcons = [
    { name: "Facebook", url: "#", icon: <FaFacebook className="text-[24px] fill-white" /> },
    { name: "Instagram", url: "#", icon: <FaInstagram className="text-[24px] fill-white" /> },
    { name: "Twitter", url: "#", icon: <FaTwitter className="text-[24px] fill-white" /> },
    { name: "GitHub", url: "#", icon: <FaGithub className="text-[24px] fill-white" /> },
    { name: "Dribbble", url: "#", icon: <FaDribbble className="text-[24px] fill-white ripple-bg-black" /> }
];

const FooterLogo = () => {
    return <div className="flex justify-center text-teal-600">Logo Here</div>;
};

const FooterLinks = () => {
    return (
        <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
            {footerLinks.map((link, index) => (
                <li key={index}>
                    <a className="text-white transition hover:text-white/75" href={link.url}>
                        {link.title}
                    </a>
                </li>
            ))}
        </ul>
    );
};

const SocialMediaIcons = () => {
    return (
        <ul className="mt-12 flex justify-center gap-6 md:gap-8">

            {socialMediaIcons.map(( media, index) => (
                <li key={index}>
                    <Link href={media.url} rel="noreferrer" target="_blank" className="text-gray-700 transition hover:text-gray-700/75">
                        <AnimatedTooltip items={[
                            {
                                id: index,
                                name: media.name,
                                designation: "", // Example designation
                                Icon:media.icon, // Example image URL
                            },
                        ]} />
                        <span className="sr-only">{media.name}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default function Footer() {
    return (
        <footer className="bg-black mt-10 ">
            <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                <FooterLogo />
                <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-white">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt consequuntur amet culpa cum
                    itaque neque.
                </p>
                <FooterLinks />
                <SocialMediaIcons />
            </div>
        </footer>
    );
}
