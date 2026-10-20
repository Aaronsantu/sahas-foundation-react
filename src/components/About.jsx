import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { REGISTRATION, STORY, TIMELINE } from '../data'
import Reveal from './Reveal'

function Timeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 })

  return (
    <ol className="timeline" ref={ref}>
      <span className="timeline-rail" aria-hidden="true">
        <motion.span className="timeline-fill" style={{ scaleY }} />
      </span>
      {TIMELINE.map((t) => (
        <Reveal as="li" key={t.when} x={-14} y={10} className="timeline-item">
          <span className="timeline-dot" aria-hidden="true" />
          <span className="timeline-when">{t.when}</span>
          <p>{t.text}</p>
        </Reveal>
      ))}
    </ol>
  )
}

export default function About() {
  const [open, setOpen] = useState(false)

  return (
    <section id="about">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">About</span>
          <h2>Sahas Foundation</h2>
        </Reveal>

        <Reveal className="about-copy">
          <p>
            The foundation is registered with the Charity Commissioner of Mumbai under the Societies Registration Act, 1860. A formal certificate has also been obtained from the appropriate authority that all donations to the Foundation are tax-free* to the donors.
          </p>
          <dl className="reg-facts">
            <div>
              <dt>Registration No.</dt>
              <dd>{REGISTRATION.number}</dd>
            </div>
            <div>
              <dt>Date of registration</dt>
              <dd>{REGISTRATION.date}</dd>
            </div>
            <div>
              <dt>Issued by</dt>
              <dd>{REGISTRATION.authority}</dd>
            </div>
            <div>
              <dt>Registered under</dt>
              <dd>{REGISTRATION.act}</dd>
            </div>
          </dl>
          <p>
            Donations to the society are exempt under section 80G(5) of the IT Act 1961 vide provisional certificate no. ABVAS8438DF20231, dated 13/03/2023, issued by Commissioner of IT, valid till 31-03-2026.
          </p>
        </Reveal>

        <div className="story">
          <Reveal className="story-head">
            <span className="eyebrow">Our Story</span>
            <h2>How SAHAS began</h2>
          </Reveal>

          <div className="story-grid">
            <Timeline />

            <Reveal className="story-side" delay={0.1}>
              <aside className="story-pull">
                <p>&ldquo;For every project that we conceive, YOU, the people of India, are needed. Become our member if you like, or remain a donor if you so wish. But please be there to help the less privileged.&rdquo;</p>
                <div className="who">The founding SAHASIs</div>
              </aside>

              <button className="story-toggle" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
                {open ? 'Hide the full story' : 'Read the full story'}
                <span className={'caret' + (open ? ' up' : '')} aria-hidden="true" />
              </button>
            </Reveal>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                className="story-full"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="story-full-inner">
                  {STORY.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
