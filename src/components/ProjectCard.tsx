import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  role: string;
  tags: string[];
  metrics: string;
  contributions?: string[];
  technologies?: string[];
}

export default function ProjectCard({ id, title, description, role, tags, metrics, contributions, technologies }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative bg-white dark:bg-neutral-900/50 hover:bg-neutral-50 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500/30 dark:hover:border-neutral-700 p-8 md:p-12 rounded-[2rem] transition-all duration-500 flex flex-col md:grid md:grid-cols-[80px_1.5fr_1fr] gap-12 mb-8 shadow-xl dark:shadow-2xl shadow-black/5 dark:shadow-black/50"
    >
      <div className="font-mono text-sm text-blue-500 font-bold">{id}</div>
      
      <div className="space-y-8">
        <h3 className="text-3xl md:text-5xl font-light tracking-tight text-neutral-900 dark:text-white">
          {title.split(' ').map((word, i, arr) => i === arr.length - 1 ? <span key={i} className="font-bold">{word} </span> : word + ' ')}
        </h3>
        
        <p className="text-lg text-neutral-800 dark:text-neutral-400 max-w-xl leading-relaxed italic">
          "{description}"
        </p>

        {contributions && (
          <ul className="space-y-4 max-w-2xl">
            {contributions.map((point, i) => (
              <li key={i} className="flex gap-3 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <span className="text-blue-500 font-bold shrink-0 mt-1">/</span>
                {point}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-2 pt-4">
          {technologies?.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-md text-[9px] font-mono tracking-widest uppercase font-bold"
            >
              {tech}
            </span>
          ))}
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-500 rounded-md text-[9px] font-mono tracking-widest uppercase font-bold"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between items-end text-right">
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 dark:text-neutral-500 mb-2 whitespace-nowrap">Measurable Impact</span>
          <span className="text-4xl md:text-6xl font-black text-blue-500 tracking-tighter shadow-blue-500/20">
            {metrics}
          </span>
        </div>
        
        <div className="mt-8 md:mt-0 flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 dark:text-neutral-400 mb-2">Specific Role</span>
          <span className="text-xl font-medium text-neutral-800 dark:text-neutral-200">{role}</span>
        </div>
      </div>

      <div className="absolute right-12 top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
        <ArrowUpRight className="w-8 h-8 text-neutral-600" />
      </div>
    </motion.div>
  );
}
