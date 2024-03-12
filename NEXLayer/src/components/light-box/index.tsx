"use client";
import React, { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { StaticImageData } from "next/image";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";

interface Slide {
    src: string;
    width: number;
    height: number;
    srcSet: { src: string; width: number; height: number }[];
}

interface ArtworksProps {
    artwork: StaticImageData[];
    auto?: boolean;
    isMobile?: boolean;
}

const createSlides = (imageUrls: StaticImageData[], auto: boolean): Slide[] => {
    return imageUrls.map((url) => {
        const { width, height } = url;

        return {
            src: url.src,
            width,
            height,
            srcSet: [{ src: url.src, width, height }],
        };
    });
};

const Artworks: React.FC<ArtworksProps> = ({
    artwork,
    auto = false,
    //   isMobile = false,
}) => {
    const [index, setIndex] = useState(0);
    const [slides, setSlides] = useState(createSlides(artwork, auto));
    const [isMobile, setisMobile] = useState(false);
    const [delay ] = React.useState(3000);
    const [autoplay] = React.useState(true);
    useEffect(() => {
        window.addEventListener("resize", () => setisMobile(window.innerWidth <= 768));
        return () => window.removeEventListener("resize", () => setisMobile(window.innerWidth <= 768));

    }, []);

    useEffect(() => {
        setSlides(createSlides(artwork, auto));
    }, [artwork, auto]);

    const updateIndex = ({ index: current }: { index: number }) => setIndex(current);

    return (
        <div className="mx-auto sm:px-2 sm:py-6 lg:max-w-7xl rounded-md shadow shadow-gray-400 mt-10 md:mt-30">
            <Lightbox
                index={index}
                slides={slides}
                fullscreen={{ auto }}
                plugins={isMobile ? [Inline, Fullscreen,Slideshow] : [Inline, Thumbnails, Fullscreen,Slideshow]}
                on={{
                    view: updateIndex,
                    click: () => setIndex((prevIndex) => prevIndex + 1),
                }}
                carousel={{
                    padding: 4,
                    spacing: 4,
                    imageFit: "contain",
                }}
                inline={{
                    style: {
                        width: "100%",
                        aspectRatio: "3 / 2",
                        margin: "0 auto",
                    },
                }}
                slideshow={{ autoplay, delay }}
                thumbnails={{
                    position: isMobile ? "start" : "bottom",
                    width: 120,
                    height: 80,
                    border: 1,
                    borderRadius: 4,
                    padding: 4,
                    gap: 16,
                    showToggle: true,
                }}
            />
        </div>
    );
};

export default Artworks;
