import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* base-aware asset path — works under "/" (prod) and "/10and2" (intranet) */
const asset = (p: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${p.replace(/^\//, "")}`;

/* Jake Rosenberg — pilot artist. Edge-to-edge portfolio grid. */
const JAKE = {
  name: "JAKE ROSENBERG",
  work: [
    "/images/talent-8.png",
    "/images/talent-2.png",
    "/images/talent-6.png",
    "/images/talent-1.png",
    "/images/talent-7.png",
    "/images/talent-3.png",
    "/images/talent-4.png",
    "/images/talent-5.png",
  ],
};

/* contact spread images (left portrait · right street) */
const CONTACT_SPREAD = { left: "/images/talent-2.png", right: "/images/talent-3.png" };

/* ----------------------------------------------------------------
   tiny hash router — home | artist | contact
   ---------------------------------------------------------------- */
type Route = "home" | "artist" | "contact";
function useHashRoute(): [Route, (r: Route) => void] {
  const parse = (): Route => {
    const h = window.location.hash.replace(/^#\/?/, "");
    return h === "artist" || h === "contact" ? (h as Route) : "home";
  };
  const [route, setRoute] = useState<Route>(parse);
  useEffect(() => {
    const onHash = () => {
      setRoute(parse());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const go = (r: Route) => {
    window.location.hash = r === "home" ? "/" : `/${r}`;
  };
  return [route, go];
}

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
};

/* ----------------------------------------------------------------
   NAV — ARTIST (left) · 10&2 (center) · CONTACT (right)
   showBrand=false on Home (big logo already centered in body)
   ---------------------------------------------------------------- */
function Nav({
  go,
  current,
  showBrand = true,
}: {
  go: (r: Route) => void;
  current: Route;
  showBrand?: boolean;
}) {
  return (
    <header className="topnav">
      <button
        className={`topnav__link topnav__link--left${current === "artist" ? " is-active" : ""}`}
        onClick={() => go("artist")}
      >
        Artist
      </button>
      {showBrand ? (
        <button className="topnav__brand" onClick={() => go("home")} aria-label="10&2 — home">
          <img src={asset("logo-wordmark.png")} alt="10&2" />
        </button>
      ) : (
        <span />
      )}
      <button
        className={`topnav__link topnav__link--right${current === "contact" ? " is-active" : ""}`}
        onClick={() => go("contact")}
      >
        Contact
      </button>
    </header>
  );
}

/* ----------------------------------------------------------------
   PAGE 1 — HOME / SPLASH  (top-left mockup)
   centered wordmark · tagline · CONTACT bottom-center
   ---------------------------------------------------------------- */
function Home({ go }: { go: (r: Route) => void }) {
  return (
    <motion.section className="home" {...fade}>
      <motion.img
        src={asset("logo-wordmark.png")}
        alt="10&2"
        className="home__mark"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      />
      <span className="home__tag">Creative Talent Representation</span>
      <button className="home__contact" onClick={() => go("contact")}>
        Contact
      </button>
    </motion.section>
  );
}

/* ----------------------------------------------------------------
   PAGE 2 — CONTACT  (bottom-left mockup)
   full-bleed 2-image spread + giant white 10&2, info below
   ---------------------------------------------------------------- */
function Contact() {
  return (
    <motion.section className="contactpage" {...fade}>
      <div className="cspread">
        <div className="cspread__img"><img src={asset(CONTACT_SPREAD.left)} alt="" aria-hidden="true" /></div>
        <div className="cspread__img"><img src={asset(CONTACT_SPREAD.right)} alt="" aria-hidden="true" /></div>
        <span className="cspread__mark" aria-hidden="true">10&amp;2</span>
      </div>
      <div className="cinfo">
        <div className="cinfo__col">
          <h4>General Inquiries</h4>
          <a href="mailto:info@10and2talent.com" className="link-line">info@10and2talent.com</a>
        </div>
        <div className="cinfo__col">
          <h4>Artist Submissions</h4>
          <a href="mailto:submissions@10and2talent.com" className="link-line">submissions@10and2talent.com</a>
        </div>
        <div className="cinfo__col">
          <h4>Location</h4>
          <p>220 W Ivy Ave, Inglewood, CA 90302</p>
        </div>
      </div>
    </motion.section>
  );
}

/* ----------------------------------------------------------------
   PAGE 3 — ARTIST / Jake Rosenberg  (bottom-right mockup)
   edge-to-edge masonry grid + artist name
   ---------------------------------------------------------------- */
function Artist() {
  return (
    <motion.section className="artistpage" {...fade}>
      <div className="awall">
        {JAKE.work.map((src, i) => (
          <figure className="awall__item" key={i}>
            <img src={asset(src)} alt={`${JAKE.name} — work`} loading="lazy" />
          </figure>
        ))}
      </div>
      <footer className="aname">
        <span className="aname__role">Photographer</span>
        <h1>{JAKE.name}</h1>
      </footer>
    </motion.section>
  );
}

/* ----------------------------------------------------------------
   APP
   ---------------------------------------------------------------- */
export default function App() {
  const [route, go] = useHashRoute();
  return (
    <>
      <Nav go={go} current={route} showBrand={route !== "home"} />
      <AnimatePresence mode="wait">
        {route === "home" && <Home key="home" go={go} />}
        {route === "contact" && <Contact key="contact" />}
        {route === "artist" && <Artist key="artist" />}
      </AnimatePresence>
    </>
  );
}
