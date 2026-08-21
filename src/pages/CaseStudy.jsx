import { Link, useParams, Navigate } from 'react-router-dom'
import { bySlug, nextOf } from '../data/projects'
import { Nav, Reveal, Phone, Arrow, Footer } from '../components/bits'

export default function CaseStudy() {
  const { slug } = useParams()
  const p = bySlug(slug)
  if (!p) return <Navigate to="/" replace />
  const next = nextOf(slug)

  return (
    <>
      <Nav sections={[
        { id: 'work', label: 'Work' },
        { id: 'experience', label: 'Experience' },
        { id: 'skills', label: 'Skills' },
      ]} />

      <header className="cs-hero">
        <div className="glow g1" />
        <div className="shell">
          <Link className="cs-back mono" to="/#work">← All work</Link>
          <span className="mono dim" style={{ display: 'block', marginBottom: 20 }}>
            {p.num} — {p.category} · {p.years}
          </span>
          <h1 className="cs">{p.name}</h1>
          <p className="cs-tag">{p.tagline}</p>
          <div className="cs-badges">
            {p.store && (
              <a className="store" href={p.store.url} target="_blank" rel="noopener noreferrer">
                <b />{p.store.label}
              </a>
            )}
            {p.ghost && <span className="store" style={{ borderStyle: 'dashed' }}>{p.ghost}</span>}
            {p.ghost2 && <span className="store" style={{ borderStyle: 'dashed' }}>{p.ghost2}</span>}
          </div>
        </div>
      </header>

      <div className="shell">
        <Reveal className="gallery">
          {p.shots.map(([src, cap]) => (
            <div className="shot" key={src}>
              <Phone src={src} alt={cap} />
              <div className="cap-t">{cap}</div>
            </div>
          ))}
        </Reveal>
      </div>

      <div className="shell cs-body">
        <Reveal as="aside" className="cs-meta">
          <dl>
            {p.meta.map(([k, v]) => (
              <div className="r" key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <main className="cs-main">
          {p.sections.map((s) => (
            <Reveal className="blk" key={s.title}>
              <h2>{s.title}</h2>
              {s.paras?.map((t, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: t }} />
              ))}
              {s.lead && <p className="lead-in">{s.lead}</p>}
              {s.bullets && (
                <ul className="feat">
                  {s.bullets.map((b, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: b }} />
                  ))}
                </ul>
              )}
              {s.probs?.map(([h, body]) => (
                <div className="prob" key={h}>
                  <h3>{h}</h3>
                  <p dangerouslySetInnerHTML={{ __html: body }} />
                </div>
              ))}
              {s.stack && (
                <table className="stack-t">
                  <thead>
                    <tr><th>Technology</th><th>Why</th></tr>
                  </thead>
                  <tbody>
                    {s.stack.map(([tech, why]) => (
                      <tr key={tech}>
                        <td><code>{tech}</code></td>
                        <td>{why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Reveal>
          ))}
        </main>
      </div>

      <div className="nextup">
        <div className="shell">
          <Link to={`/work/${next.slug}`}>
            <div>
              <span className="mono dim" style={{ display: 'block', marginBottom: 12 }}>
                Next case study — {next.num}
              </span>
              <h3>{next.name}</h3>
            </div>
            <span className="arrow">Read <Arrow /></span>
          </Link>
        </div>
      </div>

      <Footer right="praisetaiwo24@gmail.com" />
    </>
  )
}
