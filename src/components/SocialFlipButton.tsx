"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
    FaGithub,
    FaTwitter,
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaEnvelope,
    FaDiscord,
} from "react-icons/fa";

// Local helper to replace @/lib/utils cn
function cn(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

export interface SocialItem {
    letter: string;
    icon: React.ReactNode;
    label: string;
    href?: string;
    onClick?: () => void;
}

interface SocialFlipButtonProps {
    items?: SocialItem[];
    className?: string;
    itemClassName?: string;
    frontClassName?: string;
    backClassName?: string;
}

const defaultItems: SocialItem[] = [
    { letter: "C", icon: <FaInstagram />, label: "Instagram", href: "#" },
    { letter: "O", icon: <FaFacebook />, label: "Facebook", href: "#" },
    { letter: "N", icon: <FaTwitter />, label: "Twitter", href: "#" },
    { letter: "T", icon: <FaLinkedin />, label: "LinkedIn", href: "#" },
    { letter: "A", icon: <FaGithub />, label: "Github", href: "#" },
    { letter: "C", icon: <FaEnvelope />, label: "Email", href: "mailto:hello@brewandcrumbs.com" },
    { letter: "T", icon: <FaDiscord />, label: "Discord", href: "#" },
];

const SocialFlipNode = ({
    item,
    index,
    isHovered,
    itemClassName,
    frontClassName,
    backClassName,
}: {
    item: SocialItem;
    index: number;
    isHovered: boolean;
    itemClassName?: string;
    frontClassName?: string;
    backClassName?: string;
}) => {
    const Wrapper = item.href ? "a" : "div";
    const wrapperProps = item.href
        ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
        : { onClick: item.onClick };

    return (
        <Wrapper
            {...wrapperProps}
            className={cn("social-flip-node", itemClassName)}
            data-label={item.label}
            style={{ "--index": index } as React.CSSProperties}
        >
            <motion.div
                className="social-flip-node-inner"
                initial={false}
                animate={{ rotateY: isHovered ? 180 : 0 }}
                transition={{
                    duration: 0.8,
                    type: "spring",
                    stiffness: 120,
                    damping: 15,
                    delay: index * 0.08,
                }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front - Letter */}
                <div
                    className={cn("social-flip-node-front", frontClassName)}
                    style={{ backfaceVisibility: "hidden" }}
                >
                    {item.letter}
                </div>

                {/* Back - Icon */}
                <div
                    className={cn("social-flip-node-back", `back-${item.label.toLowerCase()}`, backClassName)}
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    {item.icon}
                </div>
            </motion.div>
        </Wrapper>
    );
};

export default function SocialFlipButton({
    items = defaultItems,
    className,
    itemClassName,
    frontClassName,
    backClassName,
}: SocialFlipButtonProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={cn("social-flip-component-outer-wrapper", className)}>
            <div
                className="social-flip-component-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    setIsHovered(false);
                }}
            >
                {/* Animated Border Lines */}
                <div className="social-flip-borders-clip">
                    <div className="moving-border-line moving-border-top" />
                    <div className="moving-border-line moving-border-bottom" />
                </div>

                {items.map((item, index) => (
                    <SocialFlipNode
                        key={index}
                        item={item}
                        index={index}
                        isHovered={isHovered}
                        itemClassName={itemClassName}
                        frontClassName={frontClassName}
                        backClassName={backClassName}
                    />
                ))}
            </div>
        </div>
    );
}
