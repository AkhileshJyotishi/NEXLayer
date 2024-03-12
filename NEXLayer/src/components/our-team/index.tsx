"use client";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Team from "./card";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";


const teamMembers: TeamMember[] = [
  {
    name: "Andres Berlin",
    role: "Chief Executive Officer",
    imageSrc: "https://cdn.tuk.dev/assets/photo-1564061170517-d3907caa96ea.jfif",
    bio: "The CEO's role in raising a company's corporate IQ is to establish an atmosphere that promotes knowledge sharing and collaboration.",
    socialLinks: [
      { platform: "Github", url: "#", icon: <FaGithub className="text-[30px] p-1 rounded-md ripple-gray-300"/> },
      { platform: "Twitter", url: "#", icon: <FaInstagram className="text-[30px] p-1 rounded-md ripple-gray-300"/> },
      { platform: "Instagram", url: "#", icon: <FaLinkedin className="text-[30px] p-1 rounded-md ripple-gray-300"/> },
    ],
  },
  // Add other team members similarly
];

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-2",
        className
      )}
    >
      {items.map((item, idx) => (
        <HoverCard
          key={item.link}
          item={item}
          hovered={hoveredIndex === idx}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        />
      ))}
    </div>
  );
};

const HoverCard = ({
  item,
  hovered,
  onMouseEnter,
  onMouseLeave,
}: {
  item: {
    title: string;
    description: string;
    link: string;
  };
  hovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => (
  <div
    className="relative group block p-2 h-full w-full "
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}>

    <AnimatePresence>
      {hovered && (
        <motion.span
          className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-white/20 block rounded-3xl"
          layoutId="hoverBackground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.30 } }}
          exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.5 } }}
        />
      )}
    </AnimatePresence>
    <Card>
    <Team members={teamMembers} />
    </Card>
  </div>
);

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "rounded-2xl h-full w-full p-1 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
      className
    )}
  >
      {children}

  </div>
);



