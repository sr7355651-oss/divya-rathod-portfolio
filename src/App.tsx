/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  Github,
  Linkedin,
  Mail,
  Download,
  Code,
  Terminal,
  Award,
  Briefcase,
  ExternalLink,
  Menu,
  X,
  Sparkles,
  MapPin,
  Cpu,
  GraduationCap,
  ChevronRight,
  Check,
  Trophy
} from 'lucide-react';

// Imported Generated Assets
import certificateImage from './assets/images/certificate_badge_1784371441824.jpg';

export default function App() {
  // Theme management: persisted in state
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Custom Cursor state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'project' | 'social'>('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Sync dark class on document root
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Handle Custom Cursor tracking
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
      );
    };
    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sections = [
      'hero',
      'about',
      'skills',
      'experience',
      'certificates',
      'education',
      'contact',
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('sr7355651@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  // Helper to trigger hover cursor
  const triggerCursor = (type: 'default' | 'hover' | 'project' | 'social') => {
    if (!isTouchDevice) setCursorType(type);
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-brand-light text-zinc-800 dark:bg-brand-dark dark:text-zinc-200 bg-dots-light dark:bg-dots-dark">
      
      {/* Custom Cursor Effect */}
      {!isTouchDevice && (
        <>
          <div
            className="custom-cursor w-2 h-2 rounded-full bg-brand-purple fixed top-0 left-0 transition-transform duration-75"
            style={{
              transform: `translate3d(${mousePosition.x - 4}px, ${mousePosition.y - 4}px, 0)`,
            }}
          />
          <div
            className={`custom-cursor rounded-full border border-brand-purple fixed top-0 left-0 flex items-center justify-center transition-all duration-300 ${
              cursorType === 'hover'
                ? 'w-12 h-12 bg-brand-purple/15 border-brand-purple border-2 scale-110'
                : cursorType === 'project'
                ? 'w-16 h-16 bg-brand-purple/20 border-brand-purple border-2 after:content-["View"] after:text-[10px] after:text-brand-purple after:font-bold after:font-fredoka'
                : cursorType === 'social'
                ? 'w-10 h-10 bg-brand-purple/10 border-brand-purple scale-105 border-dashed'
                : 'w-6 h-6 bg-transparent border-brand-purple/40'
            }`}
            style={{
              transform: `translate3d(${
                mousePosition.x -
                (cursorType === 'hover' ? 24 : cursorType === 'project' ? 32 : cursorType === 'social' ? 20 : 12)
              }px, ${
                mousePosition.y -
                (cursorType === 'hover' ? 24 : cursorType === 'project' ? 32 : cursorType === 'social' ? 20 : 12)
              }px, 0)`,
            }}
          />
        </>
      )}

      {/* Navigation Header */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md rounded-full px-6 py-3 border border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between shadow-lg shadow-zinc-200/20 dark:shadow-none">
        <a
          href="#hero"
          onClick={() => setActiveSection('hero')}
          className="font-fredoka font-bold text-xl text-brand-purple flex items-center gap-1.5"
          onMouseEnter={() => triggerCursor('hover')}
          onMouseLeave={() => triggerCursor('default')}
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span>divya.dev</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onMouseEnter={() => triggerCursor('hover')}
              onMouseLeave={() => triggerCursor('default')}
              className={`text-sm font-medium transition-colors relative px-2 py-1 ${
                activeSection === link.id
                  ? 'text-brand-purple font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-purple rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Right Nav Utilities */}
        <div className="flex items-center gap-3">
          {/* Theme Switcher */}
          <button
            onClick={() => setIsDark(!isDark)}
            onMouseEnter={() => triggerCursor('hover')}
            onMouseLeave={() => triggerCursor('default')}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-all active:scale-95"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-brand-purple" />
            )}
          </button>

          {/* Resume Quick Access Button */}
          <a
            href="/Divya_Rathod_Resume.txt"
            download="Divya_Suresh_Rathod_Resume.txt"
            onMouseEnter={() => triggerCursor('hover')}
            onMouseLeave={() => triggerCursor('default')}
            className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-purple text-white hover:bg-brand-purple/90 transition-all shadow-sm shadow-brand-purple/30 active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            onMouseEnter={() => triggerCursor('hover')}
            onMouseLeave={() => triggerCursor('default')}
            className="p-2 lg:hidden rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm lg:hidden"
            />

            {/* Sidebar drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[280px] bg-white dark:bg-zinc-950 z-50 p-6 flex flex-col justify-between shadow-2xl border-l border-zinc-200/50 dark:border-zinc-800/50 lg:hidden"
            >
              <div className="mt-12 flex flex-col gap-1">
                <p className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-4 px-3">
                  Navigation Menu
                </p>
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-3 rounded-xl transition-all ${
                      activeSection === link.id
                        ? 'bg-brand-purple/10 text-brand-purple font-semibold'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </a>
                ))}
              </div>

              {/* Bottom utilities */}
              <div className="flex flex-col gap-3">
                <a
                  href="/Divya_Rathod_Resume.txt"
                  download="Divya_Suresh_Rathod_Resume.txt"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold bg-brand-purple text-white hover:bg-brand-purple/90 transition-all text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </a>
                <p className="text-center text-[11px] text-zinc-400">
                  sr7355651@gmail.com
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Single Page Layout */}
      <main className="w-full relative z-10 pt-24 px-4 sm:px-6 lg:px-8">
        
        {/* 1. Hero / Intro Section */}
        <section id="hero" className="min-h-[85vh] max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 py-12">
          {/* Introduction Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex flex-col items-start text-left space-y-6"
          >
            {/* Location & Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-purple/10 dark:bg-brand-purple/20 text-brand-purple rounded-full text-xs font-semibold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>Pusad, Maharashtra</span>
            </div>

            {/* Title / Name */}
            <div className="space-y-2">
              <h1 className="font-fredoka text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
                Hi, I'm <span className="text-brand-purple relative inline-block">Divya Rathod</span>
              </h1>
              <h2 className="font-fredoka text-2xl md:text-3xl font-bold text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                <Terminal className="w-6 h-6 text-brand-purple" />
                <span>Full Stack Developer</span>
              </h2>
            </div>

            {/* Tagline */}
            <p className="text-zinc-600 dark:text-zinc-300 max-w-lg text-base md:text-lg leading-relaxed">
              Enthusiastic Computer Science Engineering student building fully-interactive, performant web platforms, algorithm visualizers, and intelligent applications with clean code.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                onMouseEnter={() => triggerCursor('hover')}
                onMouseLeave={() => triggerCursor('default')}
                className="px-6 py-3 rounded-2xl font-bold bg-brand-purple text-white hover:bg-brand-purple/90 transition-all shadow-md shadow-brand-purple/30 text-sm flex items-center gap-2 active:scale-95 group"
              >
                <span>Get In Touch</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="/Divya_Rathod_Resume.txt"
                download="Divya_Suresh_Rathod_Resume.txt"
                onMouseEnter={() => triggerCursor('hover')}
                onMouseLeave={() => triggerCursor('default')}
                className="px-6 py-3 rounded-2xl font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-all text-sm flex items-center gap-2 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </div>
          </motion.div>

          {/* Interactive Profile Representation (Non-Photo Card) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="flex-1 flex justify-center relative"
          >
            {/* Ambient Background Glow Grid */}
            <div className="absolute inset-0 bg-brand-purple/10 blur-3xl rounded-full w-72 h-72 mx-auto -z-10 animate-pulse" />

            {/* Frame Box */}
            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-3xl p-6 bg-zinc-950 border-2 border-zinc-200/50 dark:border-zinc-800/50 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500 flex flex-col justify-between text-left font-mono text-[11px] leading-relaxed text-zinc-300">
              <div className="flex items-center gap-1.5 border-b border-zinc-800 pb-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-[10px] text-zinc-500 ml-2">divya.sh</span>
              </div>
              <div className="space-y-1 select-none">
                <p className="text-zinc-500"># Interactive CSE profile</p>
                <p><span className="text-brand-purple">const</span> developer = &#123;</p>
                <p className="pl-4">name: <span className="text-emerald-400">'Divya Rathod'</span>,</p>
                <p className="pl-4">role: <span className="text-emerald-400">'Full Stack Developer'</span>,</p>
                <p className="pl-4">status: <span className="text-emerald-400">'Student'</span>,</p>
                <p className="pl-4">gpa: <span className="text-amber-400">9.86</span>,</p>
                <p className="pl-4">skills: [<span className="text-amber-400">'C++'</span>, <span className="text-amber-400">'DSA'</span>, <span className="text-amber-400">'MERN'</span>]</p>
                <p>&#125;;</p>
              </div>
              <div className="border-t border-zinc-800 pt-3 mt-2 text-zinc-500 flex items-center justify-between">
                <span>compiling...</span>
                <span className="text-brand-purple font-bold">100%</span>
              </div>

              {/* Floating tech stack badge 1 */}
              <div className="absolute -top-4 -left-4 p-2.5 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200/50 dark:border-zinc-800/50 text-brand-purple transform -rotate-12 animate-bounce">
                <Code className="w-6 h-6" />
              </div>

              {/* Floating tech stack badge 2 */}
              <div className="absolute -bottom-4 -right-4 bg-brand-purple text-white px-4 py-1.5 rounded-full shadow-lg font-fredoka font-semibold text-xs tracking-wide transform rotate-6 hover:scale-105 transition-all">
                🚀 DSA Master
              </div>
            </div>
          </motion.div>
        </section>

        {/* 2. About Me Section */}
        <section id="about" className="max-w-5xl mx-auto py-24 border-t border-zinc-200/30 dark:border-zinc-800/30 scroll-mt-12">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Quick Metrics (Left column) */}
            <div className="flex-1 w-full grid grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 hover:border-brand-purple/50 dark:hover:border-brand-purple/50 transition-all flex flex-col justify-between h-40 group">
                <div className="flex items-center justify-between text-brand-purple">
                  <GraduationCap className="w-7 h-7" />
                  <span className="text-xs font-semibold bg-brand-purple/10 px-2 py-0.5 rounded-full">CSE</span>
                </div>
                <div>
                  <h3 className="font-fredoka text-3xl font-extrabold tracking-tight">9.86</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Current CGPA (SGBAU Amravati)</p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 hover:border-brand-purple/50 dark:hover:border-brand-purple/50 transition-all flex flex-col justify-between h-40">
                <div className="flex items-center justify-between text-indigo-500">
                  <Trophy className="w-7 h-7" />
                  <span className="text-xs font-semibold bg-indigo-500/10 px-2 py-0.5 rounded-full">DSA</span>
                </div>
                <div>
                  <h3 className="font-fredoka text-3xl font-extrabold tracking-tight">C++</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Strong Problem-Solver</p>
                </div>
              </div>

              <div className="col-span-2 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 hover:border-brand-purple/50 dark:hover:border-brand-purple/50 transition-all flex items-center gap-5">
                <div className="p-3.5 bg-brand-purple/10 dark:bg-brand-purple/20 text-brand-purple rounded-2xl">
                  <Cpu className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-fredoka text-lg font-bold">AI & ML Focus</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Interned as Trainee Developer designing end-to-end Machine Learning pipelines and user integrations.
                  </p>
                </div>
              </div>
            </div>

            {/* Narrative (Right column) */}
            <div className="flex-1 space-y-6 text-left">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest font-bold text-brand-purple">Who is Divya?</p>
                <h2 className="font-fredoka text-3xl md:text-4xl font-extrabold tracking-tight">
                  CSE Student & Solution Engineer
                </h2>
              </div>

              <div className="text-zinc-600 dark:text-zinc-300 space-y-4 text-sm md:text-base leading-relaxed">
                <p>
                  I am currently pursuing my **Bachelor of Engineering in Computer Science & Engineering** at **Sant Gadge Baba Amravati University** (2025–2029). From the early semesters, I focused heavily on core concepts—compiling robust solutions, mastering complex data architectures, and optimizing algorithms.
                </p>
                <p>
                  My development approach focuses on end-to-end clarity. I am passionate about crafting visual, responsive interfaces on the frontend while designing modular backend servers. 
                </p>
                <p>
                  Collaboration is at the core of my professional identity. I love working with teammates, taking leadership roles in student-driven tech projects, organizing events, and tackling intense coding marathons with high performance.
                </p>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Open for Opportunities</span>
                </div>
                <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
                <a
                  href="#contact"
                  onMouseEnter={() => triggerCursor('hover')}
                  onMouseLeave={() => triggerCursor('default')}
                  className="text-xs font-bold text-brand-purple flex items-center gap-1 hover:underline"
                >
                  <span>Let's talk tech</span>
                  <ChevronRight className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* 3. Skills/Tech Stack Section */}
        <section id="skills" className="max-w-5xl mx-auto py-24 border-t border-zinc-200/30 dark:border-zinc-800/30 scroll-mt-12">
          <div className="space-y-12 text-center">
            
            {/* Header */}
            <div className="space-y-2 max-w-xl mx-auto">
              <p className="text-xs uppercase tracking-widest font-bold text-brand-purple">Core Competencies</p>
              <h2 className="font-fredoka text-3xl md:text-4xl font-extrabold tracking-tight">
                My Skills & Tech Stack
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed">
                A carefully aggregated toolkit of programming languages, logical frameworks, and collaborative methods.
              </p>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'C++', level: 'Expert', desc: 'Primary language for DSA problem-solving and logic building.' },
                { name: 'Python', level: 'Advanced', desc: 'Utilized for AI/ML development, data science, and scripts.' },
                { name: 'JavaScript', level: 'Intermediate', desc: 'Crafting responsive user interfaces and modular interactivity.' },
                { name: 'HTML & CSS', level: 'Expert', desc: 'Highly semantic markup and modern responsive styles (Tailwind).' },
                { name: 'Data Structures (DSA)', level: 'Expert', desc: 'Advanced trees, graphs, sorting, searching, and logic.' },
                { name: 'Problem Solving', level: 'Advanced', desc: 'Algorithmic optimization and clean analytical architecture.' },
                { name: 'AI & ML Integrations', level: 'Familiar', desc: 'Model evaluation, regression pipeline integrations, and APIs.' },
                { name: 'Leadership & Teamwork', level: 'Expert', desc: 'Collaborating, presenting, and leading code operations.' },
              ].map((skill, index) => (
                <div
                  key={index}
                  onMouseEnter={() => triggerCursor('hover')}
                  onMouseLeave={() => triggerCursor('default')}
                  className="p-5 text-left rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 hover:border-brand-purple/50 dark:hover:border-brand-purple/50 shadow-sm hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-fredoka font-bold text-lg group-hover:text-brand-purple transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 5. Experience / Timeline Section */}
        <section id="experience" className="max-w-5xl mx-auto py-24 border-t border-zinc-200/30 dark:border-zinc-800/30 scroll-mt-12">
          <div className="space-y-12">
            
            {/* Header */}
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <p className="text-xs uppercase tracking-widest font-bold text-brand-purple">Work Experience</p>
              <h2 className="font-fredoka text-3xl md:text-4xl font-extrabold tracking-tight">
                Professional Journey
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Bridging academic foundations with hands-on enterprise-level software engineering paradigms.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative max-w-2xl mx-auto pl-8 border-l-2 border-brand-purple/20 space-y-12">
              
              {/* Experience timeline dot decoration */}
              <div className="absolute left-[-9px] top-0.5 w-4 h-4 rounded-full bg-brand-purple ring-4 ring-brand-purple/10 border-2 border-white dark:border-brand-dark" />

              <div className="space-y-4">
                {/* Meta details */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="font-fredoka text-xl font-bold">Trainee Developer (AI & ML)</h3>
                    <p className="text-sm font-semibold text-brand-purple">iBase Electrosoft LLP</p>
                  </div>
                  <span className="inline-block sm:self-start text-xs font-semibold px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-full">
                    Internship Completed
                  </span>
                </div>

                {/* Job description */}
                <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Collaborated as a trainee engineering developer in Pusad, contributing directly to computer vision models, regression pipelines, and modern web application linkages.
                </p>

                {/* Detailed bullet actions */}
                <ul className="text-xs md:text-sm space-y-2.5 text-zinc-600 dark:text-zinc-400 pl-4 list-disc marker:text-brand-purple">
                  <li>Engineered machine learning logic using Python, processing structured data sets and validation tests.</li>
                  <li>Linked core predictive analytical scripts with client interfaces to provide end-to-end user visualization.</li>
                  <li>Studied algorithmic scalability under senior leads, adhering to industry code standards.</li>
                  <li>Completed training successfully and was awarded an official Certificate of Performance.</li>
                </ul>
              </div>

            </div>

          </div>
        </section>

        {/* 6. Certificates Section */}
        <section id="certificates" className="max-w-5xl mx-auto py-24 border-t border-zinc-200/30 dark:border-zinc-800/30 scroll-mt-12">
          <div className="space-y-12 text-center">
            
            {/* Header */}
            <div className="space-y-2 max-w-xl mx-auto">
              <p className="text-xs uppercase tracking-widest font-bold text-brand-purple">Validations</p>
              <h2 className="font-fredoka text-3xl md:text-4xl font-extrabold tracking-tight">
                Certificates & Achievements
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Official recognitions confirming my analytical capabilities and software development performance.
              </p>
            </div>

            {/* Certificate Cards */}
            <div className="max-w-xl mx-auto">
              <div
                onMouseEnter={() => triggerCursor('hover')}
                onMouseLeave={() => triggerCursor('default')}
                className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm hover:shadow-2xl transition-all flex flex-col md:flex-row gap-6 items-center text-left"
              >
                {/* Generated Badge Icon display */}
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex-shrink-0 border border-zinc-200/50 dark:border-zinc-800/50">
                  <img
                    src={certificateImage}
                    alt="iBase Completion Certificate Badge"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-brand-purple">
                    <Award className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">iBase Electrosoft LLP</span>
                  </div>
                  <h3 className="font-fredoka text-lg font-bold leading-tight">
                    Certificate of Completion — AI & ML
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Awarded for successfully undertaking research development, algorithm implementation, and deployment training.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 7. Education Section */}
        <section id="education" className="max-w-5xl mx-auto py-24 border-t border-zinc-200/30 dark:border-zinc-800/30 scroll-mt-12">
          <div className="space-y-12">
            
            {/* Header */}
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <p className="text-xs uppercase tracking-widest font-bold text-brand-purple">Academic Background</p>
              <h2 className="font-fredoka text-3xl md:text-4xl font-extrabold tracking-tight">
                Education details
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Consistent high scholastic achievements demonstrating disciplined, long-term learning habits.
              </p>
            </div>

            {/* Education Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* BE Card */}
              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm hover:shadow-lg transition-all text-left flex flex-col justify-between min-h-[220px]">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-brand-purple">
                    <GraduationCap className="w-6 h-6" />
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-purple/10 px-2 py-0.5 rounded-full">
                      2025 - 2029
                    </span>
                  </div>
                  <h3 className="font-fredoka font-bold text-lg leading-snug">
                    Bachelor of Engineering (BE) in CSE
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Sant Gadge Baba Amravati University (SGBAU)
                  </p>
                </div>
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <p className="text-xs text-zinc-400">Outstanding CGPA</p>
                  <p className="font-fredoka text-xl font-bold text-brand-purple">9.86 / 10.00</p>
                </div>
              </div>

              {/* HSC Card */}
              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm hover:shadow-lg transition-all text-left flex flex-col justify-between min-h-[220px]">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-indigo-500">
                    <GraduationCap className="w-6 h-6" />
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 px-2 py-0.5 rounded-full">
                      HSC (Class XII)
                    </span>
                  </div>
                  <h3 className="font-fredoka font-bold text-lg leading-snug">
                    Higher Secondary Certificate
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Maharashtra State Board
                  </p>
                </div>
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <p className="text-xs text-zinc-400">Final Grade</p>
                  <p className="font-fredoka text-xl font-bold text-indigo-500">82.83%</p>
                </div>
              </div>

              {/* SSC Card */}
              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm hover:shadow-lg transition-all text-left flex flex-col justify-between min-h-[220px]">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-500">
                    <GraduationCap className="w-6 h-6" />
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      SSC (Class X)
                    </span>
                  </div>
                  <h3 className="font-fredoka font-bold text-lg leading-snug">
                    Secondary School Certificate
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Maharashtra State Board
                  </p>
                </div>
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <p className="text-xs text-zinc-400">Final Grade</p>
                  <p className="font-fredoka text-xl font-bold text-emerald-500">93.60%</p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 8. Contact Section (No form, big friendly CTA) */}
        <section id="contact" className="max-w-4xl mx-auto py-24 border-t border-zinc-200/30 dark:border-zinc-800/30 scroll-mt-12 text-center">
          <div className="p-8 md:p-12 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-2xl relative overflow-hidden">
            
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/5 blur-2xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 blur-2xl rounded-full" />

            <div className="space-y-8 relative z-10">
              
              <div className="space-y-3 max-w-xl mx-auto">
                <p className="text-xs uppercase tracking-widest font-bold text-brand-purple">Let's Connect</p>
                <h2 className="font-fredoka text-4xl font-extrabold tracking-tight">
                  Start a Conversation!
                </h2>
                <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
                  Have a challenging project, an internship opening, or just want to chat about DSA architectures and C++? My inbox is always open.
                </p>
              </div>

              {/* Big friendly Email copy action */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={() => triggerCursor('hover')}
                  onMouseLeave={() => triggerCursor('default')}
                  className="w-full sm:flex-1 py-3 px-6 rounded-2xl font-semibold bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-800/60 dark:hover:bg-zinc-800 transition-all text-xs md:text-sm flex items-center justify-center gap-2 active:scale-95 text-zinc-700 dark:text-zinc-200"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 text-brand-purple" />
                      <span>sr7355651@gmail.com</span>
                    </>
                  )}
                </button>

                <a
                  href="mailto:sr7355651@gmail.com"
                  onMouseEnter={() => triggerCursor('hover')}
                  onMouseLeave={() => triggerCursor('default')}
                  className="w-full sm:w-auto py-3 px-6 rounded-2xl font-bold bg-brand-purple text-white hover:bg-brand-purple/90 transition-all text-xs md:text-sm shadow-md shadow-brand-purple/30 active:scale-95"
                >
                  Send Direct Mail
                </a>
              </div>

              {/* Social links */}
              <div className="flex items-center justify-center gap-6 pt-4">
                <a
                  href="https://github.com/Sr7355651-oss"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => triggerCursor('social')}
                  onMouseLeave={() => triggerCursor('default')}
                  className="p-3.5 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-300 hover:text-brand-purple dark:hover:text-brand-purple hover:scale-110 transition-all shadow-sm"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>

                <a
                  href="https://www.linkedin.com/in/divya-suresh-rathod-b6804b391"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => triggerCursor('social')}
                  onMouseLeave={() => triggerCursor('default')}
                  className="p-3.5 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-300 hover:text-brand-purple dark:hover:text-brand-purple hover:scale-110 transition-all shadow-sm"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-6 border-t border-zinc-200/20 dark:border-zinc-800/20 text-center relative z-10 text-xs text-zinc-400">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-medium">
            &copy; {new Date().getFullYear()} Divya Suresh Rathod. All Rights Reserved.
          </p>
          <p className="flex items-center gap-1 font-fredoka font-medium">
            <span>Designed with</span>
            <span className="text-brand-purple animate-pulse">💜</span>
            <span>in Maharashtra, India</span>
          </p>
        </div>
      </footer>

    </div>
  );
}
