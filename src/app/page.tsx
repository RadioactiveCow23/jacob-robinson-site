"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { Mail, Play, Menu, X } from "lucide-react";
import { easeOut } from "framer-motion";

/* -------------------- Animation helpers -------------------- */
const ease = easeOut;

const fade = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};
const fadeSlow = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

/* -------------------- Small components -------------------- */

// Scroll progress bar
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.2,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-stone-900"
    />
  );
}

// Hover link underline (for desktop)
function HoverLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      className="relative"
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
      <motion.span
        className="absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-stone-900"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease }}
      />
    </motion.a>
  );
}

// Magnetic button
function MagneticButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.15);
    y.set(dy * 0.15);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }
  return (
    <motion.a
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x, y }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

// Animated headline
function AnimatedHeadline({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <motion.h1
      className={className}
      variants={stagger}
      initial="hidden"
      animate="show"
      aria-label={text}
    >
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.4ch]">
          {word.split("").map((char, ci) => (
            <motion.span
              key={wi + "-" + ci}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 30, rotate: 6, filter: "blur(6px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.55, ease },
                },
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}

/* ========================================================== */

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-stone-900 selection:bg-amber-200 selection:text-stone-900">
      <ScrollProgress />
      <Header />
      <Hero />
      <Logos />
      <About />
      <Speaking />
      <Video />
      <Gallery />
      <CTA />
      <Footer />
    </main>
  );
}

/* =================== HEADER =================== */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      className="sticky top-0 z-40 bg-transparent transition-all duration-500"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="#" className="text-lg font-semibold tracking-tight text-stone-900">
          Jacob Robinson
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-stone-900">
          <HoverLink href="#about">About</HoverLink>
          <HoverLink href="#speaking">Keynotes</HoverLink>
          <HoverLink href="#gallery">Community</HoverLink>

          {/* Book Jacob Button with bottom-fill animation */}
          <a
            href="#book"
            className="relative inline-flex items-center justify-center rounded-full border-2 border-stone-900 px-4 py-2 font-medium overflow-hidden group"
          >
            <span className="relative z-10 text-stone-900 transition-colors duration-300 group-hover:text-white">
              Book Jacob
            </span>
            <span
              className="absolute inset-0 bg-stone-900 scale-y-0 origin-bottom transition-transform duration-700 ease-out group-hover:scale-y-100"
            />
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center text-stone-900"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile Nav - Full Screen */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white text-stone-900 flex flex-col justify-between px-8 py-8 text-center md:hidden"
          >
            {/* Header row inside menu */}
            <div className="flex justify-between items-center">
              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
                className="text-lg font-semibold text-stone-900"
              >
                Jacob Robinson
              </Link>
              <X
                className="h-7 w-7 text-stone-900"
                onClick={() => setMenuOpen(false)}
              />
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col items-center justify-center flex-grow space-y-6 text-stone-900">
              <a href="#about" onClick={() => setMenuOpen(false)} className="text-2xl font-medium">
                About
              </a>
              <a href="#speaking" onClick={() => setMenuOpen(false)} className="text-2xl font-medium">
                Keynotes
              </a>
              <a href="#gallery" onClick={() => setMenuOpen(false)} className="text-2xl font-medium">
                Community
              </a>
              <a href="#learn" onClick={() => setMenuOpen(false)} className="text-2xl font-medium">
                Learn
              </a>
            </div>

            {/* Footer button with slower bottom-fill animation */}
            <div className="pb-8">
              <a
                href="#book"
                onClick={() => setMenuOpen(false)}
                className="relative block mx-auto w-full max-w-xs rounded-full border-2 border-stone-900 text-stone-900 py-3 text-lg font-semibold overflow-hidden group"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  Book Jacob
                </span>
                <span
                  className="absolute inset-0 bg-stone-900 scale-y-0 origin-bottom transition-transform duration-700 ease-out group-hover:scale-y-100"
                />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* =================== HERO =================== */
function Hero() {
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 400], [0, -40]);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[90vh] bg-gradient-to-b from-[#FFEFC6] to-white sm:rounded-b-[4rem]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-16 sm:pt-20 md:grid-cols-2">
        <div className="pb-12 sm:pb-24 text-center md:text-left">
        <AnimatedHeadline
            text="HEAR FROM JACOB"
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[6.5rem] leading-[0.95] font-extrabold tracking-tight text-stone-900"
          />
          <motion.p
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-xl text-stone-900 text-base sm:text-lg mx-auto md:mx-0"
          >
            Jacob helps audiences—from students to executives—take bold action,
            lead with purpose, and turn adversity into momentum.
          </motion.p>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-10"
          >
            <MagneticButton
              href="#book"
              className="inline-flex items-center rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(0,0,0,0.25)]"
            >
              <Mail className="mr-2 h-4 w-4" /> Book Jacob
            </MagneticButton>
            <motion.a
              href="#video"
              className="inline-flex items-center text-stone-900 hover:text-stone-700"
              whileHover={{ x: 3 }}
            >
              <Play className="mr-2 h-4 w-4" /> Watch clip
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          style={{ y: imgY }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative flex justify-center md:justify-end"
          >
          <div className="relative w-[160%] md:w-[130%] lg:w-[110%] h-[130vh] -mt-48 -mb-32 overflow-visible">
            <Image
              src="/jacob1.png"
              alt="Jacob Robinson"
              fill
              className="object-contain drop-shadow-2xl scale-[1.8] md:scale-[2] lg:scale-[2.2] translate-y-[-6%]"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =================== LOGOS (font and spacing responsive) =================== */
function Logos() {
  return (
    <section
      id="logos"
      className="mx-auto max-w-7xl px-6 py-12 sm:py-20 flex flex-col items-center text-center"
    >
      <motion.div
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-wrap items-center justify-center gap-8 sm:gap-16"
      >
        {["jacob_logo1.png", "jacob_logo2.png", "jacob_logo3.png"].map((logo, i) => (
          <div
            key={i}
            className="relative w-28 h-14 sm:w-36 sm:h-18 md:w-48 md:h-24 opacity-80 hover:opacity-100 transition-opacity"
          >
            <Image src={`/${logo}`} alt={`Logo ${i}`} fill className="object-contain" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}

/* =================== ABOUT =================== */
function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-7xl px-6 py-24 sm:py-32"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        {/* --- Left Column: Text --- */}
        <div>
          <motion.h2
            variants={fadeSlow}
            className="text-3xl sm:text-4xl font-semibold tracking-tight"
          >
            Finding Joy in the Valley
          </motion.h2>

          <motion.p
            variants={fade}
            className="mt-4 text-stone-700 leading-relaxed"
          >
            Jacob Robinson is a speaker and entrepreneur named one of Houston’s
            “Most Admired CEOs.” In 2025 he pitched DIG World—a first-of-its-kind
            construction theme park—on ABC’s <strong>Shark Tank</strong>. His
            deeper calling began in 2017, when his son Pierce became permanently
            disabled from bacterial meningitis—shaping Jacob’s message of
            resilience, purpose, and action.
          </motion.p>

          <motion.p
            variants={fade}
            className="mt-6 text-stone-600 italic"
          >
            “In this episode of <strong>The MakeReady Podcast</strong>, Jacob opens up
            about faith, leadership, and learning to find purpose in pain.”
          </motion.p>
        </div>

        {/* --- Right Column: Video --- */}
        <motion.div
          variants={fade}
          className="aspect-video rounded-3xl overflow-hidden shadow-2xl"
        >
          <iframe
            src="https://www.youtube.com/embed/EZdyAnEc2AM"
            title="Building Through the Pain - Jacob Robinson on The MakeReady Podcast"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* =================== SPEAKING =================== */
function Speaking() {
  const talks = [
    {
      title: "Lead Boldly",
      desc: "Empower your team to embrace challenges, make courageous choices, and lead with clarity and conviction.",
    },
    {
      title: "Purpose in Adversity",
      desc: "How to turn personal and professional setbacks into defining moments of growth and leadership.",
    },
    {
      title: "Momentum Matters",
      desc: "The small, consistent actions that drive unstoppable personal and organizational progress.",
    },
  ];

  return (
    <section
      id="speaking"
      className="mx-auto max-w-7xl px-6 py-24 sm:py-32 bg-stone-50 rounded-[3rem] my-12"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="text-center"
      >
        <motion.h2
          variants={fadeSlow}
          className="text-4xl font-bold tracking-tight"
        >
          Keynote Topics
        </motion.h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {talks.map((t, i) => (
            <motion.div
              key={i}
              variants={fade}
              className="rounded-3xl bg-white p-8 shadow-lg transition hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold">{t.title}</h3>
              <p className="mt-3 text-stone-600 leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* =================== VIDEO =================== */
function Video() {
  return (
    <section id="video" className="mx-auto max-w-5xl px-6 py-20">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-center"
      >
        <motion.h2 variants={fadeSlow} className="text-4xl font-bold">
          Watch Jacob in Action
        </motion.h2>
        <motion.div
          variants={fade}
          className="mt-8 aspect-video rounded-3xl overflow-hidden shadow-xl"
        >
          <iframe
            src="https://www.youtube.com/embed/Q61c6mxmggE"
            title="Jacob Robinson Keynote"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* =================== COMMUNITY (Rotating Gallery) =================== */
function Gallery() {
  const galleryImages = [
    "jacob_gallery1.jpeg",
    "jacob_gallery2.jpeg",
    "jacob_gallery3.jpeg",
    "jacob_gallery4.jpeg",
    "jacob_gallery5.jpeg",
    "jacob_gallery6.jpeg",
    "jacob_gallery7.jpeg",
    "jacob_gallery8.jpeg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 3) % galleryImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const currentImages = [
    galleryImages[index % galleryImages.length],
    galleryImages[(index + 1) % galleryImages.length],
    galleryImages[(index + 2) % galleryImages.length],
  ];

  return (
    <section id="gallery" className="mx-auto max-w-7xl px-6 py-24 overflow-hidden">
      <motion.div className="text-center">
        <motion.h2 variants={fadeSlow} className="text-4xl font-bold">
          Community
        </motion.h2>
        <motion.p variants={fade} className="mt-4 max-w-2xl mx-auto text-stone-600">
          “Jacob’s message brings people together — inspiring boldness, purpose, and
          connection.”
        </motion.p>

        <div className="mt-12 relative w-full flex justify-center">
          <div className="flex gap-6 overflow-hidden">
            <AnimatePresence mode="popLayout">
              {currentImages.map((file, i) => (
                <motion.div
                  key={file}
                  className="relative w-[350px] h-[240px] overflow-hidden rounded-3xl shadow-lg"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <Image
                    src={`/${file}`}
                    alt={`Community photo ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* =================== CTA =================== */
function CTA() {
  return (
    <section
      id="book"
      className="mx-auto max-w-5xl px-6 py-24 text-center rounded-[3rem] bg-gradient-to-br from-[#FFF3D4] to-[#FFEFC6]"
    >
      <motion.h2
        variants={fadeSlow}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-4xl font-bold tracking-tight"
      >
        Book Jacob for Your Next Event
      </motion.h2>
      <motion.p
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-4 text-stone-700 max-w-2xl mx-auto"
      >
        Whether it’s a conference, company meeting, or student event, Jacob’s
        story will inspire your audience to take bold action.
      </motion.p>
      <motion.div
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-8"
      >
        <MagneticButton
          href="mailto:book@jacobrobinson.com"
          className="inline-flex items-center rounded-full bg-stone-900 px-8 py-4 text-lg font-semibold text-white shadow-lg"
        >
          <Mail className="mr-3 h-5 w-5" /> Contact Jacob
        </MagneticButton>
      </motion.div>
    </section>
  );
}

/* =================== FOOTER =================== */
function Footer() {
  return (
    <footer className="mt-32 border-t border-stone-200 py-12 text-center text-sm text-stone-500">
      © {new Date().getFullYear()} Jacob Robinson. All rights reserved.
    </footer>
  );
}
