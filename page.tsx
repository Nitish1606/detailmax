'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

/* ── Animated Counter ── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Fade-up variant ── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.15 } } };

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const heroY = useTransform(scrollYProgress, [0, 0.25], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  const services = [
    { title: 'Ceramic Coating', img: '/images/ceramic_application.png', desc: 'Liquid-glass protection that repels water, dirt and UV, keeping your paint flawless for years.', span: 'md:col-span-2' },
    { title: 'PPF Installation', img: '/images/ppf_installation.png', desc: 'Self-healing urethane film — an invisible shield against chips, scratches and road debris.', span: '' },
    { title: 'Interior Rejuvenation', img: '/images/interior_luxury.png', desc: 'Deep conditioning and protection for every surface inside your cabin.', span: '' },
    { title: 'Exterior Correction', img: '/images/ext_1.png', desc: 'Multi-stage paint correction to eliminate swirls, scratches and oxidation.', span: 'md:col-span-2' },
  ];

  const testimonials = [
    { name: 'Arjun Mehta', car: 'Mercedes GLE 450', text: 'The attention to detail is unmatched. My car looks better than the day it left the showroom.' },
    { name: 'Priya Kapoor', car: 'BMW 5 Series', text: 'Worth every rupee. The ceramic coating they applied is absolutely flawless — water just sheets off.' },
    { name: 'Rohan Desai', car: 'Porsche Cayenne', text: 'Detailmax is the only studio I trust with my Cayenne. Professional, precise and passionate.' },
  ];

  return (
    <main ref={containerRef} style={{ backgroundColor: 'var(--background)', overflowX: 'hidden' }}>

      {/* ── HERO ──────────────────────────────────── */}
      <section style={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#050505' }}>
        <motion.div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/images/hero_dark.png)',
            backgroundSize: 'cover', backgroundPosition: 'center',
            y: heroY, opacity: heroOpacity, scale: 1.05,
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,5,5,0.5) 0%, rgba(5,5,5,0.3) 50%, rgba(5,5,5,0.8) 100%)' }} />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: '#E8E3DC', padding: '0 1.5rem' }}
        >
          <motion.p variants={fadeUp} className="gold-label" style={{ marginBottom: '1.5rem' }}>
            Premium Automotive Care
          </motion.p>
          <motion.h1 variants={fadeUp} style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3.5rem, 8vw, 8rem)', fontWeight: 300, letterSpacing: '0.04em', lineHeight: 1, marginBottom: '2rem' }}>
            THE PINNACLE<br />OF PROTECTION
          </motion.h1>
          <motion.p variants={fadeUp} style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: 'rgba(232,227,220,0.65)', letterSpacing: '0.08em', marginBottom: '3rem', maxWidth: '500px', margin: '0 auto 3rem' }}>
            Ceramic Coating &amp; Paint Protection Film<br />engineered for those who demand perfection.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/models" className="btn-primary" style={{ backgroundColor: '#B8934A', color: '#fff', border: 'none', padding: '1rem 2.5rem', fontSize: '0.7rem', letterSpacing: '0.2em', fontWeight: 600 }}>
              EXPLORE SERVICES
            </Link>
            <Link href="/gallery" className="btn-outline" style={{ padding: '1rem 2.5rem', fontSize: '0.7rem', letterSpacing: '0.2em', fontWeight: 600, border: '1px solid rgba(232,227,220,0.4)', color: '#E8E3DC' }}>
              VIEW GALLERY
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(232,227,220,0.4)', fontWeight: 600 }}>SCROLL</span>
          <div className="scroll-indicator" style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(184,147,74,0.8), transparent)' }} />
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--dark-bg)', padding: '5rem clamp(1.5rem, 5vw, 4rem)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '3rem', textAlign: 'center' }}>
          {[
            { value: 1200, suffix: '+', label: 'Cars Protected' },
            { value: 8, suffix: '+', label: 'Years of Mastery' },
            { value: 99, suffix: '%', label: 'Client Satisfaction' },
            { value: 15, suffix: '+', label: 'Brand Certifications' },
          ].map((s) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: 'var(--accent-gold)', fontWeight: 300, lineHeight: 1 }}>
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--dark-muted)', marginTop: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PHILOSOPHY ────────────────────────────── */}
      <section style={{ padding: 'var(--section-pad) clamp(1.5rem, 5vw, 4rem)', backgroundColor: 'var(--background)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '6rem', alignItems: 'center' }}>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <motion.p variants={fadeUp} className="gold-label">Our Philosophy</motion.p>
            <div className="gold-line" />
            <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', marginBottom: '2rem', lineHeight: 1.1 }}>
              Craftsmanship<br /><em>Refined</em>
            </motion.h2>
            <motion.p variants={fadeUp} style={{ color: 'var(--accent)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2rem' }}>
              At Detailmax, we believe that true luxury lives in the details. Every car that enters our studio is treated as a work of art — deserving of absolute precision, premium materials, and uncompromising care.
            </motion.p>
            <motion.p variants={fadeUp} style={{ color: 'var(--accent)', lineHeight: 1.8, fontSize: '1.05rem' }}>
              Our technicians are factory-trained, our products are hand-selected from the world's finest brands, and our process is documented to the last micron.
            </motion.p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} style={{ position: 'relative' }}>
            <div style={{ aspectRatio: '4/5', backgroundImage: 'url(/images/studio_exterior.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ position: 'absolute', bottom: '-2rem', left: '-2rem', width: '60%', aspectRatio: '1', backgroundImage: 'url(/images/products_lineup.png)', backgroundSize: 'cover', backgroundPosition: 'center', border: '6px solid var(--background)' }} />
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES BENTO ────────────────────────── */}
      <section style={{ backgroundColor: 'var(--surface)', padding: 'var(--section-pad) clamp(1.5rem, 5vw, 4rem)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <p className="gold-label">What We Do</p>
              <div className="gold-line" />
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}>Our Services</h2>
            </div>
            <Link href="/models" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', fontWeight: 600, color: 'var(--accent-gold)', borderBottom: '1px solid var(--accent-gold)', paddingBottom: '2px' }}>
              VIEW ALL PACKAGES →
            </Link>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                style={{ position: 'relative', height: '420px', overflow: 'hidden', cursor: 'pointer' }}
              >
                <div
                  style={{ position: 'absolute', inset: 0, backgroundImage: `url(${s.img})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0.4) 50%, transparent 100%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#E8E3DC', marginBottom: '0.75rem' }}>{s.title}</h3>
                  <p style={{ color: 'rgba(232,227,220,0.65)', fontSize: '0.9rem', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--dark-bg)', padding: 'var(--section-pad) clamp(1.5rem, 5vw, 4rem)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <p className="gold-label">How We Work</p>
            <div className="gold-line" style={{ margin: '1.5rem auto' }} />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: 'var(--dark-text)' }}>The Detailmax Process</h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem' }}>
            {[
              { step: '01', title: 'Consultation', desc: 'We assess your vehicle and understand your goals, recommending the ideal protection package.' },
              { step: '02', title: 'Decontamination', desc: 'Multi-stage wash, clay bar treatment and paint inspection to prepare the surface perfectly.' },
              { step: '03', title: 'Correction', desc: 'Machine polishing to remove imperfections, swirls and oxidation before any coating.' },
              { step: '04', title: 'Protection', desc: 'Application of your chosen coating or PPF in our climate-controlled studio.' },
            ].map((p, i) => (
              <motion.div key={p.step} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.12 }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '4rem', color: 'rgba(184,147,74,0.2)', lineHeight: 1, marginBottom: '1rem' }}>{p.step}</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--dark-text)', marginBottom: '1rem' }}>{p.title}</h3>
                <p style={{ color: 'var(--dark-muted)', lineHeight: 1.7, fontSize: '0.9rem' }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────── */}
      <section style={{ backgroundColor: 'var(--background)', padding: 'var(--section-pad) clamp(1.5rem, 5vw, 4rem)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <p className="gold-label">Client Stories</p>
            <div className="gold-line" style={{ margin: '1.5rem auto' }} />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}>What Our Clients Say</h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.12 }}
                style={{ padding: '3rem', backgroundColor: 'var(--surface)', borderLeft: '2px solid var(--accent-gold)' }}>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', lineHeight: 1.7, color: 'var(--foreground)', marginBottom: '2rem', fontStyle: 'italic' }}>
                  "{t.text}"
                </p>
                <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--foreground)' }}>{t.name}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.05em', marginTop: '0.25rem' }}>{t.car}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────── */}
      <section style={{ position: 'relative', height: '60vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/ext_2.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(5,5,5,0.7)' }} />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
          style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: '#E8E3DC', padding: '0 1.5rem' }}>
          <p className="gold-label" style={{ marginBottom: '1.5rem' }}>Ready to Elevate Your Vehicle?</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 5rem)', marginBottom: '2.5rem', fontWeight: 300 }}>
            Book Your Consultation
          </h2>
          <Link href="/contact" className="btn-primary" style={{ backgroundColor: '#B8934A', color: '#fff', border: 'none', padding: '1.1rem 3rem', fontSize: '0.75rem', letterSpacing: '0.2em' }}>
            GET IN TOUCH
          </Link>
        </motion.div>
      </section>

    </main>
  );
}
