import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MoveDown, Zap, Globe, Database, ShieldCheck, Users, Quote, Building2, GraduationCap, ChevronDown, Mail, Linkedin, Calendar, Sun, Moon, Monitor } from "lucide-react";
import { PROJECTS, SKILLS, EXPERIENCE_STATS, EXPERTISE_SUMMARIES, COMPANIES, EDUCATION } from "./constants";
import Marquee from "./components/Marquee";
import { WordCloud } from "./components/WordCloud";
import ProjectCard from "./components/ProjectCard";

function RotatingExpertise() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % EXPERTISE_SUMMARIES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = EXPERTISE_SUMMARIES[index];

  return (
    <div className="h-full flex flex-col justify-between min-h-[160px]">
      <div className="flex justify-between items-start">
        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-200">
          Expertise Focus
        </h3>
        <span className="text-[8px] bg-white/10 px-2 py-0.5 rounded-full text-blue-100 uppercase tracking-widest font-bold">
          {index + 1} / {EXPERTISE_SUMMARIES.length}
        </span>
      </div>
      
      <div className="relative h-24 md:h-28 mt-4 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="absolute inset-0 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-2 text-blue-300">
              <Quote className="w-4 h-4 opacity-50" />
              <span className="text-[10px] uppercase font-bold tracking-wider">{current.category}</span>
            </div>
            <p className="text-lg md:text-xl font-medium text-white leading-snug">
              {current.text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3 mt-6">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-100 dark:text-blue-200 bg-blue-600 dark:bg-blue-700/50 px-3 py-2 rounded-xl w-fit">
          <Zap className="w-3 h-3" /> {current.tag}
        </div>
        <div className="flex gap-1 flex-1">
          {EXPERTISE_SUMMARIES.map((_, i) => (
            <div 
              key={i} 
              className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${i === index ? 'bg-blue-500 dark:bg-white' : 'bg-neutral-200 dark:bg-white/20'}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type Theme = "light" | "dark" | "system";

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || "system";
    }
    return "system";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    const applyTheme = (t: Theme) => {
      root.classList.remove("light", "dark");
      
      if (t === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        root.classList.add(systemTheme);
      } else {
        root.classList.add(t);
      }
    };

    applyTheme(theme);
    localStorage.setItem("theme", theme);

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme("system");
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);
  const [scrollPercent, setScrollPercent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollPercent(Math.round(latest * 100));
  });

  // Opacity transitions for sections
  const bgOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative w-full overflow-x-hidden font-sans antialiased text-neutral-900 dark:text-white selection:bg-blue-500 selection:text-white transition-colors duration-300">
      
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none -z-50 opacity-20 dark:opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(#00000022_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-blue-600 dark:bg-white z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-40 p-6 md:p-10 flex justify-between items-center bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-900 transition-colors duration-300">
        <div className="text-xl font-bold tracking-tighter uppercase text-neutral-900 dark:text-white transition-colors">SRIRAM<span className="text-blue-500 underline decoration-2 underline-offset-4">SRIDHARAN</span></div>
        <div className="hidden md:flex gap-8 text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-500 dark:text-neutral-400 items-center">
          <a href="#portfolio" className="hover:text-blue-500 transition-colors">Portfolio</a>
          <a href="#work" className="hover:text-blue-500 transition-colors">Projects</a>
          <a href="#expertise" className="hover:text-blue-500 transition-colors">Agile Ops</a>
          
          <div className="h-4 w-[1px] bg-neutral-200 dark:bg-neutral-800 mx-2"></div>

          {/* Theme Selector */}
          <div className="relative group">
            <button className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all">
              {theme === "light" && <Sun className="w-4 h-4 text-orange-500" />}
              {theme === "dark" && <Moon className="w-4 h-4 text-blue-400" />}
              {theme === "system" && <Monitor className="w-4 h-4 text-neutral-500" />}
            </button>
            
            <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden min-w-[140px] shadow-2xl backdrop-blur-xl">
                {(["light", "dark", "system"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors text-[10px] uppercase font-bold tracking-wider ${
                      theme === t ? "text-blue-500" : "text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    {t === "light" && <Sun className="w-3 h-3" />}
                    {t === "dark" && <Moon className="w-3 h-3" />}
                    {t === "system" && <Monitor className="w-3 h-3" />}
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <button className="text-white bg-blue-600 px-6 py-2 rounded-full text-[9px] hover:bg-blue-500 transition-all duration-300 flex items-center gap-2 font-bold tracking-[0.2em]">
              CONTACT <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
            </button>
            
            <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden min-w-[200px] shadow-2xl backdrop-blur-xl">
                <a 
                  href="mailto:Sriram.Sridharan9@gmail.com" 
                  className="flex items-center gap-3 px-5 py-4 hover:bg-white/5 transition-colors border-b border-neutral-800/50 group/item"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover/item:bg-blue-500/20 transition-colors">
                    <Mail className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-neutral-900 dark:text-white text-[11px] font-bold">Email Me</span>
                    <span className="text-neutral-500 text-[9px] lowercase font-medium">Sriram.Sridharan9@gmail.com</span>
                  </div>
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/sriramks89/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-4 hover:bg-white/5 transition-colors border-b border-neutral-800/50 group/item"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover/item:bg-blue-500/20 transition-colors">
                    <Linkedin className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-neutral-900 dark:text-white text-[11px] font-bold">LinkedIn</span>
                    <span className="text-neutral-500 text-[9px] lowercase font-medium">Professional Profile</span>
                  </div>
                </a>
                
                <a 
                  href="https://calendly.com/sriramks89" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-4 hover:bg-white/5 transition-colors group/item"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center group-hover/item:bg-blue-500 transition-colors">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-neutral-900 dark:text-white text-[11px] font-bold">Schedule</span>
                    <span className="text-neutral-500 text-[9px] lowercase font-medium">Book a discovery call</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* HERO SECTION - RESTRUCTURED AS BENTO */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 pb-24">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Main Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-4 bento-card flex flex-col justify-between p-10 md:p-16 min-h-[500px]"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border-2 border-blue-500/20 overflow-hidden shrink-0 shadow-2xl bg-neutral-100 dark:bg-neutral-800">
                    <img 
                      src="/SriramPP.jpg" 
                      alt="Sriram Sridharan"
                      className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://github.com/sriramks89.png";
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="bg-blue-500 w-12 h-1" />
                    <div className="flex items-center gap-2 text-neutral-500 text-[10px] uppercase font-bold tracking-[0.2em] mt-2">
                       <Globe className="w-3 h-3 text-blue-500" />
                       Dallas-Fort Worth Metroplex
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <a 
                        href="https://www.linkedin.com/in/sriramks89/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-500 text-[10px] uppercase font-bold tracking-[0.2em] hover:text-blue-400 transition-colors"
                      >
                         <Linkedin className="w-3 h-3" />
                         LinkedIn Profile
                      </a>
                      <div className="w-[1px] h-3 bg-neutral-200 dark:bg-neutral-800" />
                      <a 
                        href="/resume.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-500 text-[10px] uppercase font-bold tracking-[0.2em] hover:text-blue-400 transition-colors"
                      >
                         <ShieldCheck className="w-3 h-3" />
                         Download Resume
                      </a>
                    </div>
                  </div>
                </div>
                <h1 className="text-4xl md:text-7xl font-light leading-tight tracking-tight text-neutral-900 dark:text-white">
                  Building <span className="font-bold">Products.</span> Leading <span className="font-bold">Teams.</span> Driving <span className="font-bold">Outcomes.</span>
                </h1>
              </div>
            </div>
            <p className="text-neutral-800 dark:text-neutral-400 max-w-2xl text-lg md:text-xl leading-relaxed italic mt-12 md:ml-32 border-l border-neutral-200 dark:border-neutral-800 pl-8">
              "Dedicated to building high-performing technology teams and generating measurable business growth within the DFW metroplex. 
              Delivering impactful value through hands-on product management and strategic project leadership."
            </p>
          </motion.div>

          {/* Certification Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="bento-card flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-blue-500">Certifications</span>
              <div className="mt-4 space-y-3">
                <div className="text-lg font-bold leading-tight text-neutral-900 dark:text-white">CSP-SM</div>
                <div className="text-[10px] uppercase tracking-wider text-neutral-500">Scrum Professional</div>
                <div className="h-px bg-neutral-200 dark:bg-neutral-800 w-full" />
                <div className="text-lg font-bold leading-tight text-neutral-900 dark:text-white">SAFe PO/PM</div>
                <div className="text-[10px] uppercase tracking-wider text-neutral-500">Scaled Agile</div>
              </div>
            </div>
            <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-400 dark:text-neutral-600 mt-6 shrink-0">Quality Guaranteed</div>
          </motion.div>

          {/* Rotating Expertise Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="md:col-span-2 bento-card-accent flex flex-col justify-between relative overflow-hidden"
          >
             <RotatingExpertise />
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="md:col-span-1 bento-card flex flex-col justify-around py-8"
          >
            {EXPERIENCE_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-black text-blue-500 leading-none">{stat.value}</div>
                <div className="text-[9px] uppercase tracking-widest font-bold text-neutral-700 dark:text-neutral-500 mt-1 max-w-[80px] mx-auto">{stat.label}</div>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* SKILLS WORD CLOUD */}
      <section className="py-24 border-y border-neutral-200 dark:border-neutral-900 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <div className="px-4 py-1 border border-neutral-200 dark:border-neutral-800 rounded-full text-[9px] uppercase font-bold tracking-[0.3em] text-neutral-700 dark:text-neutral-500 w-fit mx-auto mb-4">
            Technical Ecosystem
          </div>
          <h2 className="text-3xl font-light tracking-tight text-neutral-900 dark:text-neutral-200">
            Rapid Prototyping & <span className="font-bold text-blue-500 italic">AI Leverage</span>
          </h2>
        </div>
        <WordCloud words={SKILLS} />
      </section>

      {/* TRUST SECTION: COMPANIES & EDUCATION */}
      <section id="portfolio" className="py-24 bg-neutral-900/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
            {/* Organizations */}
            <div>
              <div className="flex items-center gap-3 mb-10">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Building2 className="w-5 h-5 text-blue-500" />
                </div>
                <h2 className="text-xl font-black uppercase tracking-widest text-neutral-800 dark:text-neutral-300">Client Portfolio</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                {COMPANIES.map((company, idx) => (
                  <div key={idx} className={`bento-card p-4 flex items-center gap-3 hover:border-blue-500/30 transition-all group border ${company.isPrimary ? 'border-blue-500/20 bg-blue-500/5 dark:bg-blue-500/5' : 'border-neutral-200 dark:border-neutral-800'}`}>
                    <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 border border-neutral-200 dark:border-neutral-700">
                      <Building2 className="w-5 h-5 text-neutral-500 dark:text-neutral-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-[11px] text-neutral-800 dark:text-neutral-200 leading-tight">
                        {company.industry}
                        {company.isPrimary && <span className="ml-1 text-blue-500 text-[8px] uppercase tracking-tighter">*Primary</span>}
                      </h4>
                      <p className="text-[8px] text-neutral-700 dark:text-neutral-500 uppercase tracking-widest font-medium mt-0.5">{company.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="lg:pl-12 lg:border-l border-neutral-200 dark:border-neutral-900">
              <div className="flex items-center gap-3 mb-10">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-blue-500" />
                </div>
                <h2 className="text-xl font-black uppercase tracking-widest text-neutral-800 dark:text-neutral-300">Education</h2>
              </div>
              <div className="space-y-4">
                {EDUCATION.map((edu) => (
                  <div key={edu.school} className="bento-card p-6 flex items-start gap-4 hover:translate-x-1 transition-transform border border-neutral-200 dark:border-neutral-800">
                    <div className="w-14 h-14 rounded-xl bg-neutral-100 dark:bg-neutral-800 p-2 overflow-hidden shrink-0 flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
                      <img src={edu.logo} alt={edu.school} className="w-full h-full object-contain opacity-80" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-base leading-tight mb-1 text-neutral-800 dark:text-neutral-200">{edu.school}</h4>
                      <div className="flex flex-col gap-1">
                        <p className="text-[11px] text-neutral-700 dark:text-neutral-400 font-medium">{edu.degree}</p>
                        <span className="text-[10px] text-blue-500 font-black uppercase tracking-widest mt-1">Class of {edu.year}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REPLACING STATS SECTION WITH BENTO GRID INTEGRATION (Simplified in Hero) */}

      {/* PROJECTS SECTION */}
      <section id="work" className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-4xl font-bold tracking-tighter uppercase text-neutral-900 dark:text-white">
              Project <span className="text-blue-500 underline underline-offset-8">Catalog</span>
            </h2>
            <div className="px-4 py-1.5 border border-neutral-200 dark:border-neutral-800 rounded-full text-[10px] uppercase font-bold tracking-widest text-neutral-700 dark:text-neutral-500">
              Selected Impact Reports
            </div>
          </div>

          <div className="flex flex-col">
            {PROJECTS.map((project) => (
              <div key={project.id}>
                <ProjectCard 
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  role={project.role}
                  tags={project.tags}
                  metrics={project.metrics}
                  contributions={project.contributions}
                  technologies={project.technologies}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTISE GRID - Restructured as Clean Bento Grid */}
      <section id="expertise" className="py-24 px-6 md:px-12 bg-neutral-100/50 dark:bg-neutral-900/20">
        <div className="max-w-7xl mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             
             {/* Agile Box */}
             <div className="bento-card space-y-8 min-h-[400px] flex flex-col justify-between">
               <div>
                <div className="p-3 bg-neutral-200 dark:bg-neutral-800 w-fit rounded-[20px] mb-6">
                 <Users className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">Team Growth & Agile</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mt-4 text-sm italic">
                  "Fostering high-performing cultures through CSP-SM certified leadership and strategic team development."
                </p>
               </div>
               <ul className="space-y-3">
                 <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="text-xs font-bold uppercase tracking-widest text-neutral-800 dark:text-neutral-200">PI Leadership</span>
                 </li>
                 <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-neutral-300 dark:bg-neutral-700 rounded-full"></span>
                    <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Certified CSP-SM</span>
                 </li>
               </ul>
             </div>

             {/* Data/Delivery Box */}
             <div className="bento-card-accent space-y-8 min-h-[400px] flex flex-col justify-between">
               <div>
                <div className="p-3 bg-blue-700 w-fit rounded-[20px] mb-6">
                 <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white">Product Vision</h3>
                <p className="text-blue-100/70 leading-relaxed mt-4 text-sm italic">
                  "Bridging complex technical roadmaps with impactful product visions to generate measurable growth."
                </p>
               </div>
               <div className="space-y-4">
                  <div className="bg-blue-700 p-4 rounded-2xl flex justify-between items-center text-white">
                    <span className="text-xs font-bold">Project Architecture</span>
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                  <div className="bg-blue-700 p-4 rounded-2xl flex justify-between items-center text-white opacity-60">
                    <span className="text-xs font-bold">Team Synergy</span>
                    <div className="w-1.5 h-1.5 bg-white rounded-full opacity-20" />
                  </div>
               </div>
             </div>

             {/* Consulting Box */}
             <div className="bento-card-white space-y-8 min-h-[400px] flex flex-col justify-between">
               <div>
                <div className="p-3 bg-neutral-100 w-fit rounded-[20px] mb-6">
                 <ShieldCheck className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">Hands-on Consulting</h3>
                <p className="text-neutral-800 dark:text-neutral-400 leading-relaxed mt-4 text-sm italic">
                  "Delivering long-term business growth and operational excellence through dedicated strategic advisory."
                </p>
               </div>
               <div className="flex flex-wrap gap-2">
                 {["Banking", "Energy", "Tax/Accounting"].map(s => (
                   <span key={s} className="px-3 py-1 bg-black text-white text-[9px] uppercase font-bold tracking-widest rounded-lg">
                     {s}
                   </span>
                 ))}
               </div>
             </div>

           </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION AS BENTO FOOTER */}
      <section className="relative px-6 md:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="bento-card overflow-hidden relative p-0">
            <div className="p-12 md:p-24 space-y-8 text-center relative z-10">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-12 text-neutral-900 dark:text-white">
                LET'S <span className="text-blue-500">BUILD</span> <br /> THE FUTURE.
              </h2>
              <a 
                href="mailto:Sriram.Sridharan9@gmail.com" 
                className="inline-block px-12 py-5 bg-blue-600 text-white font-bold text-sm uppercase tracking-[0.3em] hover:bg-blue-500 transition-all duration-300 rounded-full shadow-lg shadow-blue-600/20"
              >
                Start Engagement
              </a>
            </div>
            {/* Background Marquee for textures */}
            <div className="absolute inset-x-0 bottom-0 opacity-[0.03] pointer-events-none mb-12 scale-150">
              <Marquee items={["Growth", "Scale", "Resilience", "Innovation"]} reverse={true} />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 md:px-12 flex flex-col md:row justify-between items-center gap-8 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-900">
        <div className="text-neutral-400 dark:text-neutral-600 font-mono text-[9px] uppercase tracking-widest font-bold">
          © 2026 SRIRAM SRIDHARAN — PORFOLIO REV. 05
        </div>
        <div className="flex gap-10 font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-500 text-[9px]">
          <a href="https://www.linkedin.com/in/sriramks89/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">LinkedIn</a>
          <a href="https://medium.com/@sriram.sridharan9" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Medium</a>
          <a href="https://github.com/sriramks89" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">GitHub</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Resume</a>
          <a href="https://calendly.com/sriramks89" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Schedule</a>
        </div>
        <div className="text-neutral-600 dark:text-neutral-500 flex items-center gap-2">
          <Globe className="w-3 h-3 text-blue-500" />
          <span className="font-bold text-[9px] uppercase tracking-widest">{new Date().toLocaleTimeString()} UTC</span>
        </div>
      </footer>

      {/* Scroll Indicator */}
      <div className="fixed bottom-12 right-12 z-50 pointer-events-none">
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <motion.circle
              cx="24"
              cy="24"
              r="20"
              stroke="white"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray="125.6"
              style={{ strokeDashoffset: useTransform(scrollYProgress, [0, 1], [125.6, 0]) }}
              className="opacity-20"
            />
          </svg>
          <div className="absolute font-mono text-[8px] uppercase tracking-widest opacity-40">
            {scrollPercent}%
          </div>
        </div>
      </div>
    </div>
  );
}
