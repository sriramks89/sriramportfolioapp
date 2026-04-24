import React from 'react';
import { motion } from 'motion/react';

interface WordCloudProps {
  words: string[];
}

export const WordCloud: React.FC<WordCloudProps> = ({ words }) => {
  // Pre-calculate randomized visual properties for each word to avoid shifts on re-render
  const cloudItems = React.useMemo(() => {
    return words.map((word, index) => {
      // Logic for sizes: first few items are larger
      let sizeClass = "text-sm";
      let weightClass = "font-medium";
      let opacity = "opacity-70";
      
      if (index < 5) {
        sizeClass = "text-2xl md:text-3xl";
        weightClass = "font-black";
        opacity = "opacity-100";
      } else if (index < 12) {
        sizeClass = "text-xl md:text-2xl";
        weightClass = "font-bold";
        opacity = "opacity-90";
      } else if (index < 18) {
        sizeClass = "text-lg md:text-xl";
        weightClass = "font-semibold";
        opacity = "opacity-80";
      }

      // Random color logic: primary blue for top tags, neutral for others
      const isPrimary = index < 7 || word.toLowerCase().includes('ai') || word.toLowerCase().includes('rapid');
      const textColor = isPrimary ? "text-blue-500" : "text-neutral-700 dark:text-neutral-400";

      return {
        word,
        sizeClass,
        weightClass,
        opacity,
        textColor,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 4
      };
    });
  }, [words]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 max-w-5xl mx-auto py-12 px-6">
      {cloudItems.map((item, idx) => (
        <motion.span
          key={`${item.word}-${idx}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            delay: idx * 0.05,
            duration: 0.5
          }}
          className={`inline-block cursor-default select-none transition-all duration-300 hover:scale-110 hover:text-blue-400 ${item.sizeClass} ${item.weightClass} ${item.textColor} ${item.opacity}`}
          style={{
            textShadow: idx < 5 ? '0 0 20px rgba(59, 130, 246, 0.1)' : 'none'
          }}
        >
          {item.word}
        </motion.span>
      ))}
    </div>
  );
};
