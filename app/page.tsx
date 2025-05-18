
'use client';

import { useState, useEffect, useRef } from 'react';
import { Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
  SiLinkedin,
  SiGithub,
  SiInstagram,
  SiVuedotjs,
  SiPhp,
  SiMysql,
  SiNuxtdotjs,
  SiLaravel,
  SiNodedotjs,
  SiMongodb,
  SiDocker,
} from 'react-icons/si';
import { RiTelegramLine } from 'react-icons/ri';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { MotionDiv, MotionButton, MotionA, MotionH1, MotionP } from '../components/MotionComponents';

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const homeRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = [homeRef, skillsRef, projectsRef, contactRef];
    sections.forEach((ref) => ref.current && observer.observe(ref.current));
    return () => sections.forEach((ref) => ref.current && observer.unobserve(ref.current));
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ message: '', type: null });
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      if (!data.name || !data.email || !data.message) {
        throw new Error('Please fill in all required fields');
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      setFormStatus({ message: 'Message sent successfully! Redirecting...', type: 'success' });
      setTimeout(() => {
        window.location.href = '/thank-you';
      }, 2000);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message.includes('Failed to fetch')
            ? 'Failed to connect to server. Please check your internet connection.'
            : error.message
          : 'An unexpected error occurred.';
      setFormStatus({ message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const navItems = ['home', 'skills', 'projects', 'contact'];
  const skills = [
    { icon: SiHtml5, title: 'HTML5', color: 'hover:text-orange-500' },
    { icon: SiCss3, title: 'CSS3', color: 'hover:text-blue-500' },
    { icon: SiJavascript, title: 'JavaScript', color: 'hover:text-yellow-400' },
    { icon: SiTypescript, title: 'TypeScript', color: 'hover:text-blue-600' },
    { icon: SiReact, title: 'React', color: 'hover:text-cyan-500' },
    { icon: SiNextdotjs, title: 'Next.js', color: 'hover:text-black' },
    { icon: SiTailwindcss, title: 'Tailwind CSS', color: 'hover:text-sky-400' },
    { icon: SiGit, title: 'Git', color: 'hover:text-red-500' },
    { icon: SiVuedotjs, title: 'Vue.js', color: 'hover:text-green-500' },
    { icon: SiPhp, title: 'PHP', color: 'hover:text-purple-600' },
    { icon: SiMysql, title: 'MySQL', color: 'hover:text-blue-700' },
    { icon: SiNuxtdotjs, title: 'Nuxt.js', color: 'hover:text-green-600' },
    { icon: SiLaravel, title: 'Laravel', color: 'hover:text-red-600' },
    { icon: SiNodedotjs, title: 'Node.js', color: 'hover:text-green-700' },
    { icon: SiMongodb, title: 'MongoDB', color: 'hover:text-green-800' },
    { icon: SiDocker, title: 'Docker', color: 'hover:text-blue-800' },
  ];
  const projects = [
    {
      title: 'Portfolio Website',
      image: '/project1.jpg',
      description: 'A sleek portfolio built with Next.js and Tailwind CSS.',
      repoUrl: 'https://github.com/kirubel01/portfolio',
      tags: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      title: 'Task Manager App',
      image: '/project2.jpg',
      description: 'A task management app with real-time updates and dark mode.',
      repoUrl: 'https://github.com/kirubel01/task-manager',
      tags: ['React', 'Firebase', 'Tailwind CSS', 'Authentication'],
    },
    {
      title: 'Weather App',
      image: '/project3.jpg',
      description: 'A responsive weather app using OpenWeatherMap API.',
      repoUrl: 'https://github.com/kirubel01/weather-app',
      tags: ['JavaScript', 'API', 'CSS', 'Responsive Design'],
    },
  ];
  const socialLinks = [
    { href: 'https://linkedin.com/in/kirubel-tadesse', icon: SiLinkedin, color: 'hover:text-blue-500', label: 'LinkedIn' },
    { href: 'https://github.com/kirubel01', icon: SiGithub, color: 'hover:text-gray-800', label: 'GitHub' },
    {
      href: 'https://x.com/kirubel01',
      icon: ({ className }: { className?: string }) => <FontAwesomeIcon icon={faXTwitter} className={className} />,
      color: 'hover:text-black',
      label: 'X',
    },
    { href: 'https://instagram.com/kirubel01', icon: SiInstagram, color: 'hover:text-purple-500', label: 'Instagram' },
    { href: 'https://t.me/dropthed', icon: RiTelegramLine, color: 'hover:text-blue-500', label: 'Telegram' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-[#0f172a] dark:text-white transition-all duration-300">
      {/* Navigation */}
      <nav className="fixed bottom-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <MotionDiv
          className="pointer-events-auto bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-xl max-w-md w-full mx-4 py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
        >
          <div className="flex items-center justify-between md:justify-center md:space-x-6">
            <MotionDiv
              className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 text-transparent bg-clip-text md:hidden"
              whileHover={{ scale: 1.05 }}
            >
              KT
            </MotionDiv>
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <MotionA
                  key={item}
                  href={`#${item}`}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                    activeSection === item
                      ? 'text-blue-600 dark:text-cyan-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-cyan-500 dark:after:from-blue-400 dark:after:to-cyan-300'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400'
                  } rounded-md capitalize`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </MotionA>
              ))}
            </div>
            <button
              className={`md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hamburger ${isMenuOpen ? 'open' : ''} pointer-events-auto`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12h16" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 18h16" />
              </svg>
            </button>
          </div>
        </MotionDiv>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed bottom-4 left-0 right-0 z-40 flex justify-center md:hidden bg-black/50 backdrop-blur-sm pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={toggleMenu}
            >
              <motion.div
                className="bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-xl max-w-sm w-full mx-4 p-6 rounded-2xl shadow-xl mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <a
                      key={item}
                      href={`#${item}`}
                      className={`block py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                        activeSection === item
                          ? 'text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-cyan-900/30'
                          : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      } capitalize`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item);
                      }}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all z-50"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
      </button>

      {/* Hero Section */}
      <MotionDiv
        id="home"
        ref={homeRef}
        className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-[#1e293b] dark:to-[#111a2f] pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
          <div className="text-center md:text-left">
            <MotionH1
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hello, I'm{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 text-transparent bg-clip-text">
                Kirubel Tadesse
              </span>
            </MotionH1>
            <MotionP
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              A passionate Computer Science graduate crafting modern web experiences.
            </MotionP>
            <MotionButton
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-full shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Connect
            </MotionButton>
          </div>
          <MotionDiv
            className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-white">KT</div>
          </MotionDiv>
        </div>
      </MotionDiv>

      {/* Skills Section */}
      <MotionDiv
        id="skills"
        ref={skillsRef}
        className="py-20 px-6 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Skills</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 justify-items-center text-4xl text-gray-700 dark:text-gray-300">
          {skills.map(({ icon: Icon, title, color }) => (
            <Icon key={title} title={title} className={`${color} transition`} />
          ))}
        </div>
      </MotionDiv>

      {/* Projects Section */}
      <MotionDiv
        id="projects"
        ref={projectsRef}
        className="py-24 px-6 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 text-transparent bg-clip-text">
            Featured Projects
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="bg-white/70 dark:bg-slate-800/70 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs font-medium px-2 py-1 rounded-full bg-blue-600/80 text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-3">{project.description}</p>
                <div className="flex justify-between items-center">
                  <MotionA
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-cyan-400 font-medium hover:underline"
                    whileHover={{ x: 5 }}
                  >
                    View Code <span className="ml-1">→</span>
                  </MotionA>
                  <MotionButton
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Like project"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </MotionButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </MotionDiv>

      {/* Contact Section */}
      <MotionDiv
        id="contact"
        ref={contactRef}
        className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-[#1e293b] dark:to-[#0f172a] py-24 px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 text-transparent bg-clip-text">
              Get in Touch
            </span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-12 text-center max-w-2xl mx-auto">
            Feel free to reach out for collaboration, projects, or just to connect!
          </p>
          <div className="grid md:grid-cols-5 gap-12 items-start">
            {/* Contact Form */}
            <MotionDiv
              className="md:col-span-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Send Me a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                {formStatus.message && (
                  <MotionDiv
                    className={`p-4 rounded-lg ${
                      formStatus.type === 'success'
                        ? 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    } text-center`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {formStatus.message}
                  </MotionDiv>
                )}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700/70 dark:border-gray-600 dark:text-white transition-all duration-200"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700/70 dark:border-gray-600 dark:text-white transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700/70 dark:border-gray-600 dark:text-white transition-all duration-200"
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>
                </div>
                <MotionButton
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </MotionButton>
              </form>
            </MotionDiv>

            {/* Contact Info & Social */}
            <MotionDiv
              className="md:col-span-2 space-y-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Connect With Me</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">kirubel.tadesse@example.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Addis Ababa, Ethiopia</span>
                  </div>
                </div>
                <div className="mt-8">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">FIND ME ON</h4>
                  <div className="flex flex-wrap gap-4">
                    {socialLinks.map(({ href, icon: Icon, color, label }) => (
                      <MotionA
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 ${color} dark:text-gray-300 transition-colors`}
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={label}
                      >
                        <Icon className="text-xl" />
                      </MotionA>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-blue-600/10 dark:bg-blue-400/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-blue-100 dark:border-blue-900/20">
                <h3 className="text-blue-600 dark:text-blue-400 font-medium mb-3">Looking for a Developer?</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">I'm available for freelance or full-time positions.</p>
                <MotionButton
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium"
                  whileHover={{ x: 5 }}
                  onClick={() => scrollToSection('home')}
                >
                  View Resume <span className="ml-1">→</span>
                </MotionButton>
              </div>
            </MotionDiv>
          </div>
          {/* Footer */}
          <MotionDiv
            className="mt-20 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p>© {new Date().getFullYear()} Kirubel Tadesse. All rights reserved.</p>
            <p className="mt-2">Built with Next.js, Tailwind CSS, and Framer Motion</p>
            <div className="mt-4 flex justify-center gap-4">
              {socialLinks.map(({ href, icon: Icon, color, label }) => (
                <MotionA
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-500 ${color} dark:text-gray-400 transition-colors`}
                  whileHover={{ y: -3 }}
                  aria-label={label}
                >
                  <Icon className="text-xl" />
                </MotionA>
              ))}
            </div>
          </MotionDiv>
        </div>
      </MotionDiv>
    </div>
  );
}
