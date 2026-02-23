import { useState, useEffect } from 'react'
import './index.css'

// =====================================================
// ⚠️ REPLACE WITH YOUR ACTUAL SUPABASE VALUES
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
// =====================================================

const db = {
  async getComments() {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/comments?select=*&order=created_at.desc`, {
      headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
    })
    if (!res.ok) throw new Error('Failed')
    return res.json()
  },
  async postComment(data) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/comments`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Failed')
    return res.json()
  }
}

// ── NAV ──────────────────────────────────────────────
function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { id: 'about',     label: 'About',     num: '01' },
    { id: 'skills',    label: 'Skills',    num: '02' },
    { id: 'projects',  label: 'Projects',  num: '03' },
    { id: 'guestbook', label: 'Guestbook', num: '04' },
    { id: 'contact',   label: 'Contact',   num: '05' },
  ]

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        <a href="#hero" className="logo" onClick={e => { e.preventDefault(); scrollTo('hero') }}>
          <span className="dim">[</span>RJB<span className="dim">]</span>
        </a>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={e => { e.preventDefault(); scrollTo(l.id) }}>
                <span className="nav-num">{l.num}</span>{l.label}
              </a>
            </li>
          ))}
        </ul>
        <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span/><span/><span/>
        </button>
      </div>
      <div className={`nav-mobile ${menuOpen ? 'open' : ''}`}>
        {links.map(l => (
          <a key={l.id} href={`#${l.id}`} onClick={e => { e.preventDefault(); scrollTo(l.id) }}>
            <span className="nav-num">{l.num}</span> {l.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

// ── HERO ─────────────────────────────────────────────
function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <section id="hero" className="hero">
      <div className="hero-bg-text" aria-hidden>PORTFOLIO</div>
      <div className="hero-content">
        <p className="hero-eye au">Hello, world — I'm</p>
        <h1 className="hero-name au d1">Ranzel John<br/>Binggoy</h1>
        <div className="hero-row au d2">
          <span className="hero-line"/>
          <span className="hero-role">Web Developer &amp; Designer</span>
        </div>
        <p className="hero-desc au d3">
          I craft thoughtful digital experiences — blending clean code with intentional design.
          Currently studying at Asia Pacific College, passionate about building things that matter.
        </p>
        <div className="hero-cta au d4">
          <button className="btn-p" onClick={() => scrollTo('projects')}>View Work</button>
          <button className="btn-g" onClick={() => scrollTo('contact')}>Get in Touch</button>
        </div>
      </div>
      <div className="scroll-hint">
        <span/><p>scroll</p>
      </div>
    </section>
  )
}

// ── ABOUT ────────────────────────────────────────────
function About() {
  const [imgError, setImgError] = useState(false)

  return (
    <section id="about">
      <div className="container">
        <div className="sec-hdr">
          <span className="sec-num">01</span>
          <h2 className="sec-title">About Me</h2>
        </div>
        <div className="about-grid">
          <div className="img-wrap">
            <div className="img-box">
              {/* Upload photo.jpg to frontend/public/ in GitHub to show your photo */}
              {!imgError ? (
                <img
                  src="/photo.jpg"
                  alt="Ranzel John Binggoy"
                  onError={() => setImgError(true)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              ) : (
                <span style={{ fontFamily: 'monospace', fontSize: '.7rem', color: '#444', letterSpacing: '.15em', textAlign: 'center', padding: '1rem' }}>
                  Upload photo.jpg<br/>to /public folder
                </span>
              )}
            </div>
            <div className="img-accent"/>
          </div>
          <div className="about-text">
            <p className="about-lead">
              I'm a passionate developer currently pursuing my degree in
              Information Technology at Asia Pacific College.
            </p>
            <p>
              My journey in tech started with curiosity — breaking things just to understand
              how they work. Today I build full-stack web applications using modern frameworks
              and love turning complex problems into elegant solutions.
            </p>
            <p>
              When I'm not coding, you'll find me gaming, exploring new technologies,
              or finding the best food spots around the city.
            </p>
            <div className="facts">
              <div className="fact">
                <span className="fact-l">Location</span>
                <span>📍 Philippines</span>
              </div>
              <div className="fact">
                <span className="fact-l">School</span>
                <span>Asia Pacific College</span>
              </div>
              <div className="fact">
                <span className="fact-l">Course</span>
                <span>Information Technology</span>
              </div>
              <div className="fact">
                <span className="fact-l">Focus</span>
                <span>Full-Stack Development</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── SKILLS ───────────────────────────────────────────
const skillGroups = [
  { icon: '⬡', cat: 'Frontend', skills: ['Vue.js', 'React', 'HTML5', 'CSS3', 'JavaScript'] },
  { icon: '⬢', cat: 'Backend',  skills: ['NestJS', 'Node.js', 'Flask', 'REST APIs'] },
  { icon: '◈', cat: 'Database', skills: ['Supabase', 'PostgreSQL', 'MySQL'] },
  { icon: '◎', cat: 'Tools',    skills: ['Git', 'GitHub', 'Vite', 'Vercel', 'VS Code'] },
]

function Skills() {
  return (
    <section id="skills" className="alt">
      <div className="container">
        <div className="sec-hdr">
          <span className="sec-num">02</span>
          <h2 className="sec-title">Skills</h2>
        </div>
        <div className="skills-grid">
          {skillGroups.map(g => (
            <div className="skill-card" key={g.cat}>
              <div className="sk-hdr">
                <span className="sk-icon">{g.icon}</span>
                <span className="sk-cat">{g.cat}</span>
              </div>
              <div className="tags">
                {g.skills.map(s => <span className="tag" key={s}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── PROJECTS ─────────────────────────────────────────
const projects = [
  {
    title: 'Personal Website Finals',
    desc: 'Full-stack personal portfolio with live guestbook. React frontend calling Supabase directly. Fully responsive, deployed on Vercel.',
    tags: ['React', 'Supabase', 'Vercel'],
    demo: 'https://your-site.vercel.app',
    repo: 'https://github.com/ranzelb'
  },
  {
    title: 'Project Two',
    desc: 'Describe your second project here. What problem did it solve? What technologies did you use?',
    tags: ['Vue.js', 'NestJS', 'PostgreSQL'],
    demo: '',
    repo: ''
  },
  {
    title: 'Project Three',
    desc: 'Describe your third project here. Keep it concise and highlight the most impressive parts.',
    tags: ['Python', 'Flask', 'MySQL'],
    demo: '',
    repo: ''
  },
]

function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <div className="sec-hdr">
          <span className="sec-num">03</span>
          <h2 className="sec-title">Projects</h2>
        </div>
        <div className="proj-list">
          {projects.map((p, i) => (
            <div className="proj-card" key={p.title}>
              <div className="proj-n">{String(i+1).padStart(2,'0')}</div>
              <div>
                <h3 className="proj-title">{p.title}</h3>
                <p className="proj-desc">{p.desc}</p>
                <div className="tags">{p.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
              </div>
              <div className="proj-links">
                {p.demo && <a href={p.demo} target="_blank" className="proj-link">↗ Demo</a>}
                {p.repo && <a href={p.repo} target="_blank" className="proj-link">⌥ Repo</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── GUESTBOOK ────────────────────────────────────────
function Guestbook() {
  const [comments, setComments] = useState([])
  const [loading, setLoading]   = useState(true)
  const [form, setForm]         = useState({ name: '', location: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess]   = useState(false)
  const [error, setError]       = useState('')

  const fetchComments = async () => {
    setLoading(true)
    try { setComments(await db.getComments()) } catch {}
    finally { setLoading(false) }
  }

  useEffect(() => { fetchComments() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true); setSuccess(false); setError('')
    try {
      await db.postComment({
        name:     form.name.trim(),
        location: form.location.trim() || null,
        message:  form.message.trim()
      })
      setForm({ name: '', location: '', message: '' })
      setSuccess(true)
      await fetchComments()
      setTimeout(() => setSuccess(false), 4000)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const fmt = (d) => new Date(d).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' })

  return (
    <section id="guestbook" className="alt">
      <div className="container">
        <div className="sec-hdr">
          <span className="sec-num">04</span>
          <h2 className="sec-title">Guestbook</h2>
          <p className="sec-sub">Leave a message — I'd love to hear from you.</p>
        </div>

        {/* POST — Submit a comment */}
        <form className="guest-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-grp">
              <label className="form-lbl">Name *</label>
              <input className="form-inp" placeholder="Your name" required
                value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div className="form-grp">
              <label className="form-lbl">From</label>
              <input className="form-inp" placeholder="City, Country"
                value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
            </div>
          </div>
          <div className="form-grp">
            <label className="form-lbl">Message *</label>
            <textarea className="form-ta" rows="4" placeholder="Say something nice..." required
              value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
          </div>
          <button type="submit" className="btn-p" disabled={submitting}>
            {submitting ? 'Sending...' : 'Sign Guestbook ✦'}
          </button>
          {success && <p className="form-ok">✓ Message posted! Thanks for signing.</p>}
          {error   && <p className="form-err">✗ {error}</p>}
        </form>

        {/* GET — List of comments */}
        <div className="comments-hdr">
          {loading ? 'Loading...' : `${comments.length} message${comments.length !== 1 ? 's' : ''}`}
        </div>
        {loading && <div className="dots"><span/><span/><span/></div>}
        {!loading && comments.length === 0 && (
          <p className="no-msg">No messages yet. Be the first to sign!</p>
        )}
        {!loading && comments.length > 0 && (
          <div className="c-list">
            {comments.map(c => (
              <div className="c-card" key={c.id}>
                <div className="c-av">{c.name.charAt(0).toUpperCase()}</div>
                <div style={{flex:1}}>
                  <div className="c-meta">
                    <span className="c-name">{c.name}</span>
                    {c.location && <span className="c-loc">📍 {c.location}</span>}
                    <span className="c-time">{fmt(c.created_at)}</span>
                  </div>
                  <p className="c-msg">{c.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// ── CONTACT ──────────────────────────────────────────
function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <div className="sec-hdr">
          <span className="sec-num">05</span>
          <h2 className="sec-title">Contact</h2>
        </div>
        <div className="contact-grid">
          <div>
            <p className="contact-lead">Let's build something together.</p>
            <p className="contact-sub">
              I'm always open to new opportunities, collaborations,
              or just a good conversation about tech.
            </p>
          </div>
          <div className="contact-links">
            <a href="mailto:rpbinggoy@student.apc.edu.ph" className="c-link">
              <span className="c-ico">✉</span>
              <div>
                <span className="c-lbl">Email</span>
                <span className="c-val">rpbinggoy@student.apc.edu.ph</span>
              </div>
            </a>
            <a href="https://github.com/ranzelb" target="_blank" className="c-link">
              <span className="c-ico">⌥</span>
              <div>
                <span className="c-lbl">GitHub</span>
                <span className="c-val">@ranzelb</span>
              </div>
            </a>
            <a href="https://linkedin.com/in/ranzelb" target="_blank" className="c-link">
              <span className="c-ico">◈</span>
              <div>
                <span className="c-lbl">LinkedIn</span>
                <span className="c-val">Ranzel John Binggoy</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── FOOTER ───────────────────────────────────────────
function Footer() {
  return (
    <footer>
      <div className="foot-inner">
        <span>© 2026 — Ranzel John Binggoy</span>
        <span>Built with React + Supabase</span>
      </div>
    </footer>
  )
}

// ── APP ──────────────────────────────────────────────
export default function App() {
  return (
    <>
      <NavBar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Guestbook />
      <Contact />
      <Footer />
    </>
  )
}
