import { motion } from "motion/react";

interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  className?: string;
}

export default function Marquee({ items, reverse = false, className = "" }: MarqueeProps) {
  return (
    <div className={`flex overflow-hidden whitespace-nowrap py-12 ${className}`}>
      <motion.div
        animate={{
          x: reverse ? [0, -1000] : [-1000, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-16 min-w-full items-center"
      >
        {/* Duplicate items for seamless loop */}
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-7xl md:text-9xl font-black tracking-tighter text-outline select-none transition-colors duration-500 hover:text-blue-500/10"
          >
            {item.toUpperCase()}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
