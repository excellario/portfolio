import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { experience, education } from '../data/career'
import {
  Nav, Reveal, Phone, PhoneFan, WordFade, Arrow, Footer,
} from '../components/bits'

const SECTIONS = [
  { id: 'work', label: 'Work' },
  { id: 'approach', label: 'Approach' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
]

const MARQUEE = [
  'Flutter', 'Dart', 'BLoC', 'Riverpod', 'GetX', 'go_router', 'Dio', 'get_it',
  'Clean Architecture', 'Biometrics', 'gRPC', 'Firebase', 'CI/CD',
  'Python', 'n8n',
]

const SKILLS = [
  ['Mobile', [
    '<strong>Flutter</strong> · Dart',
    'Clean Architecture, per feature',
    'Android &amp; iOS release builds',
    'Melos monorepos',
    'Platform channels',
  ]],
  ['State &amp; routing', [
    '<strong>BLoC</strong> · bloc_concurrency',
    'Riverpod · GetX · Provider',
    'go_router, with route guards',
    '<code>get_it</code> dependency injection',
  ]],
  ['Data &amp; networking', [
    '<strong>Dio</strong>, with interceptors',
    'REST · Firebase',
    'gRPC / Protocol Buffers',
    'SQLite',
  ]],
  ['Security', [
    'Biometric authentication',
    'JWT refresh flows',
    'Encrypted storage / Keychain',
    'Root &amp; jailbreak detection',
  ]],
  ['Delivery &amp; tooling', [
    'Git · CI/CD · Docker',
    'Build flavours &amp; signing',
    '<code>bloc_test</code> · <code>mocktail</code>',
    'Play Store &amp; App Store submission',
  ]],
  ['Beyond mobile', [
    '<strong>Python</strong> — scripting &amp; automation',
    '<strong>n8n</strong> workflow automation',
    'REST API integration',
  ]],
]

const HERO_FAN = [
  ['lf-explore', 'Learners Forge course catalogue'],
  ['wb-home', 'WinBundle home screen'],
  ['ct-discover', 'CashToken Rewards discover screen'],
]

export default function Home() {
  return (
    <>
      <Nav sections={SECTIONS} />

      {/* HERO */}
      <header className="hero" id="top">
        <div className="glow g1" />
        <div className="glow g2" />
        <div className="shell hero-grid">
          <div>
            <span className="mono avail"><b /> Lagos, Nigeria · Open to Flutter roles</span>
            <h1 className="big">
              <span className="ln"><span>Flutter apps</span></span>
              <span className="ln"><span>that survive</span></span>
              <span className="ln"><span><em>production.</em></span></span>
            </h1>
            <p className="hero-p">
              I&rsquo;m Praise — a mobile developer working in Flutter and Dart. I build
              across the whole lifecycle: architecture, state management, secure
              authentication, API integration and store release. Fintech, rewards
              and education.
            </p>
            <div className="hero-btns">
              <a className="pill fill" href="#work">View case studies</a>
              <a className="pill" href="mailto:praisetaiwo24@gmail.com">Get in touch</a>
            </div>
          </div>
          <PhoneFan shots={HERO_FAN} />
        </div>
      </header>

      {/* MARQUEE */}
      <div className="marq">
        <div className="marq-t">
          {[...MARQUEE, ...MARQUEE].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>

      {/* WORK */}
      <section id="work">
        <div className="shell">
          <Reveal className="lbl mono">Selected work</Reveal>
          <Reveal as="h2" className="sec">
            Apps I&rsquo;ve architected, built and shipped.
          </Reveal>
          <Reveal as="p" className="sec-sub">
            Each write-up covers what the product does, how it&rsquo;s structured, and how
            state moves through it.
          </Reveal>
        </div>

        <div className="shell">
          {projects.map((p, i) => (
            <Reveal as="article" key={p.slug} className={'job' + (i % 2 ? ' rev' : '')}>
              <div>
                <span className="job-num">{p.num} — {p.category}</span>
                <h3>{p.name}</h3>
                <div className="role">{p.role}</div>
                <p className="blurb">{p.blurb}</p>
                <div className="tags">
                  {p.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
                <div className="job-cta">
                  <Link className="arrow" to={`/work/${p.slug}`}>
                    Read case study <Arrow />
                  </Link>
                  {p.store ? (
                    <a className="store" href={p.store.url} target="_blank" rel="noopener noreferrer">
                      <b />{p.store.label}
                    </a>
                  ) : (
                    <span className="store" style={{ borderStyle: 'dashed' }}>{p.ghost}</span>
                  )}
                </div>
              </div>
              <div className="job-vis">
                {p.cards.map((s, j) => (
                  <Phone key={s} src={s} alt={`${p.name} screen ${j + 1}`} mini={j > 0} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* APPROACH */}
      <section id="approach">
        <div className="shell stmt-grid">
          <div>
            <Reveal className="lbl mono">How I work</Reveal>
            <WordFade html="Anyone can build the happy path. I care about what happens when the session expires, the token dies, or the network drops <b>halfway through a payment.</b>" />
          </div>
          <Reveal className="stmt-side">
            <p>
              I came to mobile from an engineering degree, which is why I reach for a
              specification before I reach for a widget. Every project here has
              its <strong>architecture decisions written down</strong> — not because
              anyone asked, but because that&rsquo;s what lets a codebase survive its
              second year.
            </p>
            <p>
              In practice that means three habits. I put rules in the place that
              can enforce them — access control belongs in the router, not in a
              hidden button. I keep state explicit, so every change traces back to a
              named event. And I set builds up so a wrong configuration fails at
              start-up rather than quietly mid-session.
            </p>
            <p>
              Most of the commercial work here was built during an internship, a
              graduate traineeship and my NYSC service year. <strong>Learners Forge</strong> I
              build on my own time.
            </p>
          </Reveal>
        </div>
      </section>

      <hr className="hr" />

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="shell">
          <Reveal className="lbl mono">Experience</Reveal>
          <Reveal as="h2" className="sec">Where I&rsquo;ve been building.</Reveal>
          <div className="tl" style={{ marginTop: 52 }}>
            {experience.map((e) => (
              <Reveal className="tl-row" key={e.role + e.period}>
                <div className="tl-when">
                  <span className="mono">{e.period}</span>
                </div>
                <div className="tl-what">
                  <h3>
                    {e.role}
                    <span className="tl-type">{e.type}</span>
                  </h3>
                  <div className="tl-org">{e.org} · {e.place}</div>
                  <ul>
                    {e.points.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
            <Reveal className="tl-row">
              <div className="tl-when"><span className="mono">{education.period}</span></div>
              <div className="tl-what">
                <h3>{education.degree}</h3>
                <div className="tl-org">{education.school}</div>
                <ul><li>{education.extra}</li></ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="hr" />

      {/* SKILLS */}
      <section id="skills">
        <div className="shell">
          <Reveal className="lbl mono">Skills</Reveal>
          <Reveal as="h2" className="sec">What I work with.</Reveal>
          <Reveal as="p" className="sec-sub">
            Weighted toward what I use in production rather than everything I&rsquo;ve
            touched once.
          </Reveal>
          <Reveal className="caps" style={{ marginTop: 52 }}>
            {SKILLS.map(([h, items]) => (
              <div className="cap" key={h}>
                <h4 dangerouslySetInnerHTML={{ __html: h }} />
                <ul>
                  {items.map((it, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: it }} />
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="cta-wrap">
        <div className="glow g1" style={{ opacity: 0.6 }} />
        <div className="shell">
          <Reveal>
            <span className="mono dim">Let&rsquo;s talk</span>
            <h2 className="sec" style={{ margin: '24px auto 0' }}>
              Got something that needs shipping?
            </h2>
            <a className="mail" href="mailto:praisetaiwo24@gmail.com">praisetaiwo24@gmail.com</a>
            <div className="socials">
              <a className="pill" href="https://github.com/officialpraise" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className="pill" href="https://linkedin.com/in/praisetaiwo24" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="pill" href="/praise-taiwo-cv.pdf" target="_blank" rel="noopener noreferrer">Download CV</a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  )
}
