import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

/* ----------------------------------------------------------------
   data — 3 scroll beats from "10&2 Website" copy doc
   ---------------------------------------------------------------- */
const BEATS = [
  {
    copy: "CREATIVE TALENT REPRESENTATION",
    photo: "/images/talent-1.png",
    alt: "Michael B. Jordan in a racing suit",
  },
  {
    copy: "ARTIST MANAGEMENT FOR CREATIVE TALENT, BUILT ON A MODERN ARTIST-FIRST APPROACH",
    photo: "/images/talent-2.png",
    alt: "Portrait of represented talent",
  },
  {
    copy: "WE REPRESENT CREATIVE TALENT, FROM PHOTOGRAPHERS TO CREATORS, CD, AI, EXPERIENTIAL, AND BEYOND.",
    photo: "/images/talent-3.png",
    alt: "Portrait of represented talent",
  },
];

/* ----------------------------------------------------------------
   scroll reveal helper
   ---------------------------------------------------------------- */
function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ----------------------------------------------------------------
   NAV
   ---------------------------------------------------------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="nav__inner">
        <a href="#top" className="brand" aria-label="10&2 Talent — home">
          <img src="/logo-wordmark.png" alt="10&2" className="brand__logo" />
        </a>
        <div className="nav__links">
          <a href="#artists">Roster</a>
          <a href="#contact" className="btn">
            Contact <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ----------------------------------------------------------------
   BEAT — split panel: left = editorial content, right = photo
   Beat 0 = full page 6 layout (all 3 micro cols + body copy + tagline)
   Beats 1–2 = compact (wordmark + single copy line + photo)
   ---------------------------------------------------------------- */
function Beat({ beat, index }: { beat: typeof BEATS[0]; index: number }) {
  const isFirst = index === 0;
  const isLast = index === BEATS.length - 1;
  return (
    <section className="beat" id={isFirst ? "top" : undefined}>
      {/* left panel — white, editorial */}
      <div className="beat__left">
        {/* wordmark — full-bleed every beat */}
        <motion.div
          className="beat__mark-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={isFirst ? { opacity: 1, y: 0 } : undefined}
          whileInView={!isFirst ? { opacity: 1, y: 0 } : undefined}
          viewport={!isFirst ? { once: true, margin: "-10% 0px" } : undefined}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: isFirst ? 0.05 : 0 }}
        >
          <img src="/logo-wordmark.png" alt="10&2" className="beat__mark" />
        </motion.div>

        {/* copy line — same structure all three beats */}
        {isFirst ? (
          <motion.div
            className="beat__content beat__content--compact"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <p className="beat__single-copy">{beat.copy}</p>
          </motion.div>
        ) : (
          <Reveal className="beat__content beat__content--compact">
            <p className="beat__single-copy">{beat.copy}</p>
          </Reveal>
        )}

        {/* tagline — last beat only, payoff close */}
        {isLast && (
          <Reveal className="beat__tagline-wrap" delay={0.2}>
            <p className="beat__tagline">THIS IS 10&2.</p>
          </Reveal>
        )}
      </div>

      {/* right panel — full-bleed photo */}
      <div className="beat__photo">
        <img src={beat.photo} alt={beat.alt} className="beat__img" />
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   ARTISTS — roster (empty state)
   ---------------------------------------------------------------- */
function Artists() {
  return (
    <section className="section" id="artists">
      <div className="shell">
        <Reveal>
          <div className="section-head">
            <div>
              <span className="eyebrow">Represented Talent</span>
              <h2 className="section-title">The Roster</h2>
            </div>
            <span className="section-index">01 — Artists</span>
          </div>
        </Reveal>
        <div className="artists__grid">
          <Reveal>
            <div className="artists__empty">
              <p>
                Our roster is curated by submission. Directors, photographers,
                and creative talent — built for brands that refuse the forgettable.
              </p>
              <a href="mailto:contact@10and2.com">
                Contact us for artist submissions and portfolios →
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   CONTACT
   ---------------------------------------------------------------- */
function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="shell">
        <Reveal>
          <span className="eyebrow">Start a conversation</span>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="contact__big">
            Represent
            <br />
            the best.
            <br />
            <a href="mailto:contact@10and2.com">Let's talk →</a>
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="contact__row">
            <div className="contact__col">
              <h4>Sr. Agent</h4>
              <p>Meredith Rodriguez</p>
              <p>
                <a href="mailto:meredith@10and2.com" className="link-line">
                  meredith@10and2.com
                </a>
              </p>
            </div>
            <div className="contact__col">
              <h4>General Inquiries</h4>
              <p>
                <a href="mailto:contact@10and2.com" className="link-line">
                  contact@10and2.com
                </a>
              </p>
            </div>
            <div className="contact__col">
              <h4>Location</h4>
              <p>220 W Ivy Ave</p>
              <p>Inglewood, CA 90302</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   FOOTER
   ---------------------------------------------------------------- */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <a href="#top" className="brand" aria-label="10&2 Talent — back to top">
          <img src="/logo-wordmark.png" alt="10&2" className="brand__logo" />
        </a>
        <span>© {new Date().getFullYear()} 10&2 Talent — All rights reserved.</span>
        <span>Represented by 10&2</span>
      </div>
    </footer>
  );
}

/* ----------------------------------------------------------------
   APP
   ---------------------------------------------------------------- */
export default function App() {
  return (
    <>
      <Nav />
      <main>
        {BEATS.map((beat, i) => (
          <Beat key={i} beat={beat} index={i} />
        ))}
        <Artists />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
