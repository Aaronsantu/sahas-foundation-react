import { useState } from 'react'
import { CONTACT, REGISTRATION } from '../data'
import { copyText } from './copy'
import Icon from './Icon'

function CopyRow({ href, text, label }) {
  const [copied, setCopied] = useState(false)
  const onCopy = async () => {
    if (await copyText(text)) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    }
  }
  return (
    <div className="footer-contact-row">
      <a href={href}>{text}</a>
      <button
        type="button"
        onClick={onCopy}
        aria-label={label}
        className={'copy-icon-btn' + (copied ? ' copied' : '')}
      >
        <Icon name={copied ? 'check' : 'copy'} size={14} strokeWidth={2} />
      </button>
    </div>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState(null)

  const onSubmit = (e) => {
    e.preventDefault()
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    setMsg(
      ok
        ? { ok: true, text: "Newsletter signup isn't connected yet, so your email wasn't saved." }
        : { ok: false, text: 'Enter a valid email address.' }
    )
  }

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-col">
          <h3>Sahas Foundation</h3>
          <p>Spreading Aid, Health and Smiles. Mumbai, India.</p>
          <p className="mono" style={{ fontSize: '13px', marginTop: '6px' }}>
            Reg. No. {REGISTRATION.number}, {REGISTRATION.authority}
          </p>
          <p className="mono" style={{ fontSize: '13px' }}>
            Registered on {REGISTRATION.date}
          </p>
        </div>

        <div className="footer-col">
          <h4>Registered Address</h4>
          <address>
            B-144, Kalpataru Sparkle<br />
            Gandhi Nagar, Bandra (E)<br />
            Mumbai – 400051, India
          </address>
        </div>

        <div className="footer-col">
          <h4>Reach us</h4>
          <CopyRow href={"tel:" + CONTACT.phone} text={CONTACT.phone} label="Copy phone number" />
          <CopyRow href={'mailto:' + CONTACT.email} text={CONTACT.email} label="Copy email address" />
        </div>

        <div className="footer-col">
          <h4>Be the first to know</h4>
          <p>Sign up to our newsletter to stay informed.</p>
          <form className="newsletter-form" onSubmit={onSubmit} noValidate>
            <label className="visually-hidden" htmlFor="nlEmail">
              Email address
            </label>
            <input
              id="nlEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              autoComplete="email"
            />
            <button className="btn btn-primary" type="submit">
              Subscribe
            </button>
          </form>
          {msg && (
            <p className={'news-msg' + (msg.ok ? '' : ' bad')} role="status" style={{ marginTop: '8px', fontSize: '12.5px' }}>
              {msg.text}
            </p>
          )}
        </div>
      </div>

      <div className="wrap footer-bottom">
        <p>© 2026 Sahas Foundation. All contributions are tax-exempt under Section 80G(5).</p>
      </div>
    </footer>
  )
}
