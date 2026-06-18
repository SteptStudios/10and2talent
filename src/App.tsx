import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* base-aware asset path — works under "/" (prod) and "/10and2" (intranet) */
const asset = (p: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${p.replace(/^\//, "")}`;

const COPY = {
  tagline: "Creative Talent Representation",
  manifesto:
    "We represent creative talent — from photographers to creators, CD, AI, experiential, and beyond.",
};

/* feature shots chosen for face-high / space-below composition (logo never hits a face) */
const FEATURE = { left: "/images/feat-1.jpg", right: "/images/feat-2.jpg" };
/* strongest single-subject frames for the black section */
const BLACK = ["/images/black-1.jpg", "/images/black-2.jpg"];
/* Jake Rosenberg — horizontal portfolio reel */
const WORK = [
  "/images/jr-02.jpg", "/images/jr-01.jpg", "/images/jr-03.jpg", "/images/jr-06.jpg",
  "/images/jr-04.jpg", "/images/jr-08.jpg", "/images/jr-05.jpg", "/images/jr-07.jpg",
];

/* scroll reveal */
function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className}
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  return (
    <header className="topnav">
      <a className="topnav__link topnav__link--left" href="#work">Artist</a>
      <a className="topnav__brand" href="#top" aria-label="10&2"><img src={asset("logo-wordmark.svg")} alt="10&2" /></a>
      <a className="topnav__link topnav__link--right" href="#contact">Contact</a>
    </header>
  );
}

/* ---------------- HERO — animated logo ---------------- */
function Hero() {
  return (
    <section className="hero" id="top">
      <motion.div className="hero__mark"
        initial={{ clipPath: "inset(0 100% 0 0)", scale: 1.05, opacity: 0.4 }}
        animate={{ clipPath: "inset(0 0% 0 0)", scale: 1, opacity: 1 }}
        transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}>
        <img src={asset("logo-wordmark.svg")} alt="10&2" />
      </motion.div>
      <motion.span className="hero__tag"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.0 }}>
        {COPY.tagline}
      </motion.span>
      <motion.a className="hero__cue" href="#feature" aria-label="Scroll"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>↓</motion.a>
    </section>
  );
}

/* ---------------- FEATURE SPREAD — 10&2 behind, faces clear ---------------- */
function FeatureSpread() {
  return (
    <section className="spread" id="feature">
      <div className="spread__img"><img src={asset(FEATURE.left)} alt="" aria-hidden="true" /></div>
      <div className="spread__img"><img src={asset(FEATURE.right)} alt="" aria-hidden="true" /></div>
      <img src={asset("logo-wordmark.svg")} alt="10&2" className="spread__mark" aria-hidden="true" />
    </section>
  );
}

/* ---------------- MANIFESTO ---------------- */
function Manifesto() {
  return (
    <section className="manifesto">
      <Reveal><p className="manifesto__text">{COPY.manifesto}</p></Reveal>
    </section>
  );
}

/* ---------------- JAKE ROSENBERG — horizontal scroll ---------------- */
function JakeScroll() {
  const sec = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  useEffect(() => {
    const calc = () => { if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth)); };
    const t = setTimeout(calc, 60); calc();
    window.addEventListener("resize", calc);
    return () => { clearTimeout(t); window.removeEventListener("resize", calc); };
  }, []);
  const { scrollYProgress } = useScroll({ target: sec, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  return (
    <section ref={sec} className="jake" id="work" style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="jake__sticky">
        <div className="jake__head">
          <span>Photographer</span>
          <h2>JAKE ROSENBERG</h2>
        </div>
        <motion.div ref={track} className="jake__track" style={{ x }}>
          {WORK.map((s, i) => (
            <figure className="jake__card" key={i}><img src={asset(s)} alt="Jake Rosenberg — work" /></figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- BLACK — best frames ---------------- */
function BlackShowcase() {
  return (
    <section className="black">
      <Reveal className="black__lead"><span>Represented by 10&2</span></Reveal>
      <div className="black__grid">
        {BLACK.map((s, i) => (
          <figure className="black__item" key={i}><img src={asset(s)} alt="Represented talent" /></figure>
        ))}
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact() {
  return (
    <section className="contact" id="contact">
      <img src={asset("logo-wordmark.svg")} alt="10&2" className="contact__mark" />
      <div className="contact__info">
        <div className="contact__col"><h4>General Inquiries</h4><a href="mailto:info@10and2talent.com" className="link-line">info@10and2talent.com</a></div>
        <div className="contact__col"><h4>Artist Submissions</h4><a href="mailto:submissions@10and2talent.com" className="link-line">submissions@10and2talent.com</a></div>
        <div className="contact__col"><h4>Location</h4><p>220 W Ivy Ave, Inglewood, CA 90302</p></div>
      </div>
      <span className="contact__legal">© {new Date().getFullYear()} 10&2 Talent — All rights reserved.</span>
    </section>
  );
}

/* ---------------- APP — one scroll ---------------- */
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <FeatureSpread />
        <Manifesto />
        <JakeScroll />
        <BlackShowcase />
        <Contact />
      </main>
    </>
  );
}
