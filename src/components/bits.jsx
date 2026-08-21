import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------- scroll progress bar ---------- */
export function ScrollBar() {
  const ref = useRef(null)
  useEffect(() => {
    const on = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      if (ref.current) ref.current.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%'
    }
    on()
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])
  return <div id="bar" ref={ref} />
}

/* ---------- theme toggle (dark default, light alternative) ---------- */
const readTheme = () => {
  try {
    return localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState(readTheme)

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    root.style.colorScheme = theme
    try { localStorage.setItem('theme', theme) } catch { /* private mode */ }
  }, [theme])

  const flip = () => {
    const root = document.documentElement
    root.classList.add('theming')
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
    setTimeout(() => root.classList.remove('theming'), 320)
  }

  const light = theme === 'light'
  return (
    <button
      className="tt"
      onClick={flip}
      aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
      title={light ? 'Dark mode' : 'Light mode'}
    >
      {light ? (
        /* moon — offers dark */
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z"
            stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"
          />
        </svg>
      ) : (
        /* sun — offers light */
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.7" />
          <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <path d="M12 2.4v2.3M12 19.3v2.3M2.4 12h2.3M19.3 12h2.3" />
            <path d="M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
          </g>
        </svg>
      )}
    </button>
  )
}

/* ---------- nav ----------
   `sections` are plain ids, e.g. ['work','experience','contact'].
   On the home page they smooth-scroll and track the active section.
   On any other page they navigate home to that hash via the router.   */
export function Nav({ sections = [] }) {
  const [solid, setSolid] = useState(false)
  const [active, setActive] = useState('')
  const { pathname } = useLocation()
  const home = pathname === '/'

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24)
    on()
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])

  // active-section tracking (home only)
  useEffect(() => {
    if (!home) return
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean)
    if (!els.length) return
    const io = new IntersectionObserver(
      (es) => {
        const vis = es.filter((e) => e.isIntersecting)
        if (vis.length) setActive(vis[0].target.id)
      },
      { rootMargin: '-84px 0px -55% 0px', threshold: 0.05 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [home, sections])

  const go = (e, id) => {
    if (!home) return // let the router handle it
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.replaceState(null, '', `#${id}`)
      setActive(id)
    }
  }

  return (
    <nav className={'nav' + (solid ? ' solid' : '')}>
      <div className="nav-in">
        <Link className="logo" to="/">
          Praise Taiwo<i />
        </Link>
        <div className="nav-r">
          {sections
            .filter((s) => !s.cta)
            .map((s) =>
              home ? (
                <a
                  key={s.id}
                  className={'lk' + (active === s.id ? ' on' : '')}
                  href={`#${s.id}`}
                  onClick={(e) => go(e, s.id)}
                >
                  {s.label}
                </a>
              ) : (
                <Link key={s.id} className="lk" to={`/#${s.id}`}>
                  {s.label}
                </Link>
              )
            )}
          <ThemeToggle />
          {home ? (
            <a className="lk cta pill" href="#contact" onClick={(e) => go(e, 'contact')}>
              Contact
            </a>
          ) : (
            <Link className="lk cta pill" to="/#contact">
              Contact
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

/* ---------- reveal on scroll ---------- */
export function Reveal({ as: Tag = 'div', children, className = '', ...rest }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (reduced()) return setOn(true)
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (setOn(true), io.unobserve(e.target))),
      { threshold: 0.1, rootMargin: '0px 0px -70px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`rv${on ? ' on' : ''} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  )
}

/* ---------- device frame ---------- */
export function Phone({ src, alt, mini = false, eager = false }) {
  return (
    <div className={'ph' + (mini ? ' mini' : '')}>
      <div className="ph-scr">
        <img src={`/shots/${src}.jpg`} alt={alt} loading={eager ? 'eager' : 'lazy'} />
        <div className="ph-glare" />
      </div>
    </div>
  )
}

/* ---------- hero phone fan with pointer parallax ---------- */
export function PhoneFan({ shots }) {
  const ref = useRef(null)
  useEffect(() => {
    if (reduced()) return
    const fan = ref.current
    if (!fan) return
    const phs = [...fan.querySelectorAll('.ph')]
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = null
    const loop = () => {
      cx += (tx - cx) * 0.08
      cy += (ty - cy) * 0.08
      phs.forEach((p, i) => {
        const shift = i === 0 ? '-52%' : i === 2 ? '52%' : '0'
        const depth = 1 + i * 0.35
        p.style.transform =
          `translateX(${shift}) rotate(${(i - 1) * 7}deg) scale(${i === 1 ? 1 : 0.9}) ` +
          `translate3d(${cx * 12 * depth}px,${cy * 10 * depth}px,0)`
      })
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) raf = requestAnimationFrame(loop)
      else raf = null
    }
    const move = (e) => {
      const r = fan.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2
      if (!raf) raf = requestAnimationFrame(loop)
    }
    const out = () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(loop) }
    fan.addEventListener('mousemove', move)
    fan.addEventListener('mouseleave', out)
    return () => {
      fan.removeEventListener('mousemove', move)
      fan.removeEventListener('mouseleave', out)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <div className="fan" ref={ref}>
      {shots.map((s) => (
        <Phone key={s[0]} src={s[0]} alt={s[1]} eager />
      ))}
    </div>
  )
}

/* ---------- word-by-word fade ---------- */
export function WordFade({ html, className = 'stmt' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.innerHTML = html.replace(/(\S+)/g, (m) =>
      m.charAt(0) === '<' ? m : `<span class="w">${m}</span>`
    )
    const words = [...el.querySelectorAll('.w')]
    if (reduced()) return words.forEach((w) => w.classList.add('on'))
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return
          words.forEach((w, i) => setTimeout(() => w.classList.add('on'), i * 34))
          io.unobserve(e.target)
        }),
      { threshold: 0.35 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [html])
  return <p className={className} ref={ref} />
}

/* ---------- count-up ---------- */
export function CountUp({ to, dec = 0, suffix = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced()) { el.textContent = to.toFixed(dec) + suffix; return }
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return
          let t0 = null
          const step = (ts) => {
            if (t0 === null) t0 = ts
            const p = Math.min((ts - t0) / 1500, 1)
            el.textContent = (to * (1 - Math.pow(1 - p, 3))).toFixed(dec) + suffix
            if (p < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
          io.unobserve(e.target)
        }),
      { threshold: 0.6 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to, dec, suffix])
  return <b ref={ref}>0</b>
}

/* ---------- arrow ---------- */
export const Arrow = () => (
  <svg width="20" height="8" viewBox="0 0 20 8" fill="none">
    <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="1.3" />
  </svg>
)

/* ---------- footer ---------- */
export function Footer({ right }) {
  return (
    <footer>
      <div className="shell foot-in">
        <span className="mono">© {new Date().getFullYear()} Praise Taiwo Oluwatobiloba</span>
        <span className="mono">{right || 'Lagos, Nigeria · GMT+1'}</span>
      </div>
    </footer>
  )
}

/* ---------- scroll to top / hash on route change ---------- */
export function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // wait a frame so the target route has painted
      const id = requestAnimationFrame(() => {
        const el = document.getElementById(hash.slice(1))
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return () => cancelAnimationFrame(id)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}
