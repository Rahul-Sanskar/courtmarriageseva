import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BadgeCheck, CalendarDays, Check,
  ChevronDown, ChevronRight, Clock3, FileCheck2, HeartHandshake, Landmark,
  Mail, MapPin, Menu, MessageCircle, Navigation, Phone, ShieldCheck, Sparkles, Users,
  X, Instagram, Facebook, Youtube, Quote, ClipboardCheck, Scale, Heart,
  FileText, CircleHelp, Play, Camera, BookOpen, Send, Star
} from 'lucide-react'

const phones = ['+91 90122 17779', '+91 99902 41536'] // Verified business phone numbers.
const whatsappNumber = '919012217779' // WhatsApp number with country code, digits only.
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello, I would like guidance about court marriage / marriage registration.')}`

// Indian wedding imagery — Wikimedia Commons, freely licensed (CC-BY-SA / CC-BY).
// Predominantly Hindu / North Indian weddings, with a Sikh ceremony included.
const photos = {
  // ── HERO (North Indian Hindu couple ceremony — 6720×4480) ──────────────────
  hero:         'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Indian_Culture_Wedding_%285%29_04.jpg/1920px-Indian_Culture_Wedding_%285%29_04.jpg',

  // ── INTRO / ABOUT (kanyadaan moment — 5760×3840) ──────────────────────────
  couple:       'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Kanyadaan_Ceremony_in_a_Gujarati%2C_Hindu_Wedding_Ceremony.jpg/1920px-Kanyadaan_Ceremony_in_a_Gujarati%2C_Hindu_Wedding_Ceremony.jpg',

  // ── JEWELLERY / RINGS (bridal jewellery close-up) ──────────────────────────
  rings:        'https://upload.wikimedia.org/wikipedia/commons/7/79/Indian_bride_with_Jewellery.jpg',

  // ── HANDS / PROCESS (mehndi ceremony — 6016×4016) ─────────────────────────
  hands:        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Indian_Mehndi_Culture_%281%29_02.jpg/1920px-Indian_Mehndi_Culture_%281%29_02.jpg',

  // ── BRIDE PORTRAIT (North Indian bride, full attire — 6240×4160) ───────────
  portrait:     'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Indian_Culture_Wedding_%285%29_03.jpg/1920px-Indian_Culture_Wedding_%285%29_03.jpg',

  // ── HALDI / FLOWERS (haldi ceremony ritual — 3648×5472) ───────────────────
  flowers:      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Haldi_Ceremony_-_An_Indian_Wedding_Ritual.jpg/1920px-Haldi_Ceremony_-_An_Indian_Wedding_Ritual.jpg',

  // ── MAIN CEREMONY (Hindu wedding ceremony — 6231×3974) ────────────────────
  ceremony:     'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Indian_Telugu_Hindu_wedding.jpg/1920px-Indian_Telugu_Hindu_wedding.jpg',

  // ── PHERAS (bride & groom during pheras — 2076×4608) ─────────────────────
  pheras:       'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Bride_and_groom_in_Phera.jpg/1920px-Bride_and_groom_in_Phera.jpg',

  // ── MANDAP (North Indian mandap setting — 6240×4160) ─────────────────────
  mandap:       'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Indian_Culture_Wedding_%285%29_01.jpg/1920px-Indian_Culture_Wedding_%285%29_01.jpg',

  // ── WEDDING KNOT (sacred wedding knot — 4587×3065) ───────────────────────
  weddingKnot:  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Wedding_knot.jpg/1920px-Wedding_knot.jpg',

  // ── SIKH WEDDING (professional Sikh wedding shoot — 4364×2635) ───────────
  sikhWedding:  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Sikh_Wedding_Photographer_-_photosbyKISHEN.jpg/1920px-Sikh_Wedding_Photographer_-_photosbyKISHEN.jpg',

  // ── SIKH RINGS (ring exchange at Indian Sikh wedding — 5760×3840) ─────────
  sikhRings:    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Exchanging_rings_in_a_Indian_Sikh_wedding.jpg/1920px-Exchanging_rings_in_a_Indian_Sikh_wedding.jpg',

  // ── WEDDING CELEBRATION (Indian Culture Wedding — 6016×4016) ───────────────
  weddingCelebration: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Indian_Culture_Wedding_%285%29_09.jpg/1920px-Indian_Culture_Wedding_%285%29_09.jpg',

  // ── BARAAT (groom on his way to meet the bride — 3024×4032) ───────────────
  baraat:       'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Indian_groom_on_it%27s_way_to_meet_his_bride.jpg/1920px-Indian_groom_on_it%27s_way_to_meet_his_bride.jpg',

  // ── MANGALSUTRA (tying the sacred thread — 4000×6000) ─────────────────────
  mangalsutra:  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Indian_Wedding_Ritual_-_Maangalya_dharanam.jpg/1920px-Indian_Wedding_Ritual_-_Maangalya_dharanam.jpg',
}

const services = [
  { icon: Landmark, title: 'Court Marriage', text: 'Guidance for eligible couples seeking a civil marriage under the Special Marriage Act, 1954.' },
  { icon: FileCheck2, title: 'Marriage Registration', text: 'Support with the documentation and registration process for a marriage already solemnized.' },
  { icon: HeartHandshake, title: 'Interfaith Marriage', text: 'Understand the civil marriage route and the requirements that may apply to your situation.' },
  { icon: Sparkles, title: 'Arya Samaj Marriage', text: 'Guidance around ceremony-related formalities and applicable registration requirements.' },
  { icon: Scale, title: 'Hindu Marriage', text: 'Assistance understanding relevant procedures under applicable Hindu marriage law.' },
  { icon: Users, title: 'Other Marriage Guidance', text: 'Information about Muslim, Christian and customary marriage processes, based on jurisdiction.' },
]

const steps = [
  ['01', 'Share your situation',    'Tell us the kind of marriage assistance you need and where you plan to apply.'],
  ['02', 'Understand eligibility',  'We help you understand which route applies \u2014 civil marriage, religious, or registration.'],
  ['03', 'Prepare your documents',  'Receive a personalised checklist of documents and affidavits required for your route.'],
  ['04', 'Submit the application',  'We guide you through filing with the relevant Marriage Officer or registration authority.'],
  ['05', 'Attend the appointment',  'Know exactly what to carry, what to expect, and how the ceremony or signing takes place.'],
  ['06', 'Receive your certificate','Get clarity on collection, verification and any post-registration steps that follow.'],
]

const faqs = [
  ['What is the difference between court marriage and marriage registration?', 'Court marriage generally refers to a civil marriage solemnized before a Marriage Officer under the Special Marriage Act, 1954. Marriage registration can refer to registering a marriage that has already been solemnized under another applicable law. The correct route depends on your circumstances and local rules.'],
  ['Do requirements vary by state?', 'Yes. Forms, documentation, appointment systems, fees and administrative procedures can vary by state, district and the applicable law. Confirm the current requirements with the relevant Marriage Officer or local authority.'],
  ['Can interfaith couples apply for court marriage?', 'The Special Marriage Act, 1954 may provide a civil marriage route for eligible couples irrespective of religion. Eligibility, notice and other legal requirements must be checked for the specific case.'],
  ['How long does the process take?', 'The timeline depends on the legal route, statutory notice requirements, appointment availability, documentation and local administration. We do not promise a fixed timeline or guaranteed approval.'],
]

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [pathname])
  return null
}

function Header() {
  const [open, setOpen] = useState(false)
  const links = [
    ['Home', '/'], ['About Us', '/about'], ['Marriage Process', '/process'],
    ['Gallery', '/gallery'], ['Testimonials', '/testimonials'], ['Blogs', '/blogs'], ['Contact Us', '/contact'],
  ]
  const close = () => setOpen(false)
  return <>
    <div className="topline">
      <div className="container topline-inner">
        <span><MapPin size={13} /> Support across India</span>
        <span className="topline-right"><Clock3 size={13} /> Clear guidance. Personal attention.</span>
      </div>
    </div>
    <header className="site-header">
      <div className="container nav-wrap">
        <Link to="/" className="brand" onClick={close} aria-label="Court Marriage Seva home">
          <span className="brand-mark"><img src="/emblem.png" alt="Court Marriage Seva logo" className="brand-logo" /></span>
          <span className="brand-copy"><strong>Court Marriage <em>Seva</em></strong><small>GUIDANCE FOR YOUR NEW BEGINNING</small></span>
        </Link>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <X /> : <Menu />}</button>
        <nav className={open ? 'main-nav is-open' : 'main-nav'}>
          {links.map(([label, path]) => <NavLink key={path} to={path} onClick={close} end={path === '/'}>{label}</NavLink>)}
          <a className="nav-cta" href="/contact#enquiry-form">Talk to our team <ArrowUpRight size={15} /></a>
        </nav>
      </div>
    </header>
  </>
}

function Footer() {
  return <footer className="footer">
    <div className="container footer-main">
      <div className="footer-brand" data-reveal="up">
        <Link to="/" className="brand brand-light"><span className="brand-mark"><img src="/emblem.png" alt="Court Marriage Seva logo" className="brand-logo" /></span><span className="brand-copy"><strong>Court Marriage <em>Seva</em></strong><small>GUIDANCE FOR YOUR NEW BEGINNING</small></span></Link>
        <p>Making your marriage journey simpler with clear information, thoughtful support and professional guidance.</p>
        <div className="socials"><a href="#" aria-label="Instagram"><Instagram size={17}/></a><a href="#" aria-label="Facebook"><Facebook size={17}/></a><a href="#" aria-label="YouTube"><Youtube size={17}/></a></div>
      </div>
      <div><h4>Explore</h4><Link to="/about">About Us</Link><Link to="/process">Marriage Process</Link><Link to="/gallery">Gallery</Link><Link to="/testimonials">Testimonials</Link></div>
      <div><h4>Our Services</h4><Link to="/process">Court Marriage</Link><Link to="/process">Marriage Registration</Link><Link to="/process">Interfaith Marriage</Link><Link to="/process">Arya Samaj Guidance</Link></div>
      <div className="footer-contact"><h4>Let's talk</h4><a href={`tel:${phones[0].replace(/\s/g, '')}`}><Phone size={16}/>{phones[0]}</a><a href={`tel:${phones[1].replace(/\s/g, '')}`}><Phone size={16}/>{phones[1]}</a><a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp our team</a><a href="mailto:sunil.upadhyay@courtmarriageseva.com"><Mail size={16}/> sunil.upadhyay@courtmarriageseva.com</a><span><MapPin size={16}/> Pan-India assistance</span></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} Court Marriage Seva. All rights reserved.</span><div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms & Disclaimer</Link></div></div>
    <div className="container footer-note">Court Marriage Seva provides guidance and assistance. It is not a government portal. Legal requirements and procedures vary by applicable law and jurisdiction. Final decisions and certificates are issued by the relevant authorities.</div>
  </footer>
}

function FloatingContact() {
  return (
    <div className="floating-contact">
      {/* Phone call button — pill with icon + number */}
      <a
        href={`tel:${phones[0].replace(/\s/g, '')}`}
        className="fc-call"
        aria-label="Call Court Marriage Seva"
      >
        <Phone size={19}/>
        <span className="fc-call-label">{phones[0]}</span>
      </a>

      {/* WhatsApp button — real logo + phone number */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="fc-whatsapp"
        aria-label="Chat on WhatsApp"
      >
        {/* Official WhatsApp logo SVG */}
        <svg className="fc-wa-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
        <span className="fc-wa-label">{phones[0]}</span>
      </a>
    </div>
  )
}

function SectionEyebrow({ children }: { children: React.ReactNode }) { return <div className="eyebrow"><span />{children}</div> }

function PageIntro({ eyebrow, title, text, image }: { eyebrow: string; title: React.ReactNode; text: string; image?: string }) {
  return <section className="page-intro">
    <div className="container page-intro-grid">
      <div data-reveal="left"><SectionEyebrow>{eyebrow}</SectionEyebrow><h1>{title}</h1><p>{text}</p></div>
      {image && <div className="page-intro-image" data-reveal="right"><img src={image} alt="A couple celebrating their new beginning" /></div>}
    </div>
  </section>
}

function EnquiryForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle')
  const [message, setMessage] = useState('')
  const [service, setService] = useState('Court Marriage')
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setMessage('')
    const form = e.currentTarget
    const data = new FormData(form)
    data.set('service', service)
    try {
      const response = await fetch('/api/contact.php', { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      const result = await response.json()
      if (!response.ok || !result.success) throw new Error(result.message || 'Unable to submit your enquiry right now.')
      setStatus('success')
      setMessage('Thank you. Your enquiry has been received. Our team will contact you soon.')
      form.reset()
      setService('Court Marriage')
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again or contact us by phone.')
    }
  }
  return <form id="enquiry-form" className={`enquiry-form ${compact ? 'form-compact' : ''}`} onSubmit={submit}>
    <div className="form-heading"><span className="form-icon"><ClipboardCheck size={19}/></span><div><h3>Let’s understand your needs</h3><p>Share a few details. We’ll help you understand the next step.</p></div></div>
    <div className="form-grid">
      <label>Full name <input name="name" type="text" placeholder="Enter your full name" minLength={2} maxLength={100} required /></label>
      <label>Phone number <input name="phone" type="tel" placeholder="10-digit mobile number" pattern="[+]?[0-9 ()-]{8,20}" maxLength={20} required /></label>
      <label>Email address <input name="email" type="email" placeholder="you@example.com" maxLength={150} /></label>
      <label>City / State <input name="location" type="text" placeholder="Where do you need assistance?" maxLength={120} /></label>
      <label className="form-full">Service required
        <select name="service" value={service} onChange={e => setService(e.target.value)}>
          <option>Court Marriage</option><option>Marriage Registration</option><option>Interfaith Marriage</option><option>Arya Samaj Marriage</option><option>Hindu Marriage</option><option>Other guidance</option>
        </select>
      </label>
      <label className="form-full">How can we help? <textarea name="message" rows={3} placeholder="Briefly share your question (please do not include ID numbers or sensitive documents)." maxLength={1500} /></label>
    </div>
    <label className="honeypot" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <label className="consent"><input type="checkbox" name="consent" value="yes" required /> <span>I agree to be contacted about this enquiry and have read the website privacy notice.</span></label>
    <button className="button button-primary form-submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending enquiry…' : <>Submit enquiry <ArrowRight size={17}/></>}</button>
    {message && <p className={`form-message ${status}`} role="status">{message}</p>}
    <p className="form-privacy"><ShieldCheck size={14}/> Your details are used to respond to your enquiry.</p>
  </form>
}

function Home() {
  return <>
    <section className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url("${photos.hero}")` }} />
      <div className="hero-overlay" />
      <div className="container hero-content">
        <div className="hero-copy reveal">
          <div className="hero-kicker"><span className="kicker-line"/><span>YOUR NEXT CHAPTER STARTS HERE</span></div>
          <h1>Your new beginning,<br/><em>made simpler.</em></h1>
          <p>Professional guidance for court marriage and marriage registration. Understand the process, prepare your documents, and take your next step with confidence.</p>
          <div className="hero-actions"><Link className="button button-gold" to="/contact#enquiry-form">Talk to our team <ArrowUpRight size={17}/></Link><Link className="text-link text-link-light" to="/process">Explore the process <ArrowDownRight size={17}/></Link></div>
          <div className="hero-trust"><span><ShieldCheck size={17}/> Clear, practical guidance</span><span><MapPin size={17}/> Across India</span></div>
        </div>
        <div className="hero-side-note"><span className="side-note-line"/><span>Every journey deserves<br/>a thoughtful beginning.</span></div>
      </div>
      <div className="hero-bottom"><span>01 — A LITTLE CLARITY GOES A LONG WAY</span><span>SCROLL TO EXPLORE <ChevronDown size={14}/></span></div>
    </section>

    <section className="intro-section section-pad">
      <div className="container intro-grid">
        <div className="intro-image-wrap" data-reveal="right"><img className="intro-image" src={photos.couple} alt="Kanyadaan — a sacred Hindu wedding moment" /><div className="image-caption"><Heart size={18}/><span>Here for the important moments</span></div><div className="intro-stamp"><span>CARE</span><Heart size={20}/><span>CLARITY</span></div></div>
        <div className="intro-copy" data-reveal="left"><SectionEyebrow>WELCOME TO COURT MARRIAGE SEVA</SectionEyebrow><h2>A meaningful milestone.<br/><em>A clearer way forward.</em></h2><p className="lead">Marriage formalities can feel unfamiliar. We’re here to make the journey easier to understand.</p><p>Court Marriage Seva is a legal assistance service offering guidance for court marriages and marriage registration across India. We help couples understand relevant procedures, prepare necessary documents and navigate formalities with more confidence.</p><Link className="text-link" to="/about">Get to know us <ArrowRight size={16}/></Link><div className="intro-signoff"><span className="signoff-rule"/><span>Thoughtful support, at every step.</span></div></div>
      </div>
    </section>

    <section className="services-section section-pad section-tint">
      <div className="container"><div className="section-heading"><div><SectionEyebrow>HOW WE CAN HELP</SectionEyebrow><h2>Guidance for your<br/><em>kind of beginning.</em></h2></div><p>Every couple’s circumstances are different. Explore the assistance you need and let’s work out the right next step together.</p></div>
        <div className="services-grid">{services.map((s, i) => <Link className="service-card rise-card" to="/process" key={s.title} data-reveal="up" style={{transitionDelay:`${i*80}ms`}}><div className="service-top"><span className="service-icon"><s.icon size={22}/></span><span className="service-number">0{i+1}</span></div><h3>{s.title}</h3><p>{s.text}</p><span className="service-link">Explore service <ArrowUpRight size={16}/></span></Link>)}</div>
        <div className="section-footnote"><span className="tiny-star">✳</span> The appropriate legal route depends on your circumstances and the law applicable to your case.</div>
      </div>
    </section>

    <section className="why-section section-pad"><div className="container why-grid"><div className="why-copy"><SectionEyebrow>WHY COUPLES CHOOSE US</SectionEyebrow><h2>Good guidance makes<br/><em>all the difference.</em></h2><p>We believe support should feel personal, clear and respectful. No unnecessary confusion—just a considered approach to helping you understand the process.</p><Link to="/about" className="button button-outline">Why Court Marriage Seva <ArrowRight size={16}/></Link></div><div className="benefit-grid">{[['01','Professional legal guidance','Understand relevant procedures with guidance from qualified professionals.'],['02','Clear documentation support','Know which documents may be needed before you begin.'],['03','Personal attention','Ask questions and get support based on your stated requirements.'],['04','Transparent communication','Clear explanations about process, next steps and limitations.'],['05','Support across India','Guidance for couples navigating procedures in different locations.'],['06','Convenient assistance','Reach out by phone, WhatsApp or the enquiry form.']].map(([n,t,d],i)=><div className="benefit" key={n} data-reveal="up" style={{transitionDelay:`${i*60}ms`}}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div><Check size={17}/></div>)}</div></div></section>



    <section className="gallery-preview section-pad section-tint"><div className="container"><div className="section-heading"><div><SectionEyebrow>REAL MOMENTS, BEAUTIFULLY REMEMBERED</SectionEyebrow><h2>A gallery of <em>new beginnings.</em></h2></div><Link className="text-link" to="/gallery">Explore the gallery <ArrowRight size={16}/></Link></div><div className="photo-mosaic"><Link to="/gallery" className="mosaic-large" data-reveal="scale"><img src={photos.ceremony} alt="A Hindu wedding ceremony"/><span>Moments that matter <ArrowUpRight size={16}/></span></Link><Link to="/gallery" className="mosaic-tall" data-reveal="scale" style={{transitionDelay:'80ms'}}><img src={photos.pheras} alt="Bride and groom taking pheras"/><span>Small details, big meaning <ArrowUpRight size={16}/></span></Link><Link to="/gallery" className="mosaic-small" data-reveal="scale" style={{transitionDelay:'160ms'}}><img src={photos.flowers} alt="Haldi ceremony"/><span>Celebrating together <ArrowUpRight size={16}/></span></Link></div></div></section>

    <section className="faq-section section-pad"><div className="container faq-grid"><div><SectionEyebrow>GOOD TO KNOW</SectionEyebrow><h2>Questions, answered<br/><em>with care.</em></h2><p>Start with the basics. If your situation is specific, reach out for guidance tailored to your circumstances.</p><Link className="text-link" to="/contact">Ask us a question <ArrowRight size={16}/></Link></div><div className="faq-list">{faqs.map(([q,a],i)=><details key={q} className="faq-item" data-reveal="up" style={{transitionDelay:`${i*60}ms`}}><summary>{q}<ChevronDown size={18}/></summary><p>{a}</p></details>)}</div></div></section>

    <section className="home-enquiry section-pad"><div className="container enquiry-grid"><div className="enquiry-copy" data-reveal="left"><SectionEyebrow>TAKE THE FIRST STEP</SectionEyebrow><h2>Let’s make the next<br/><em>step feel simpler.</em></h2><p>Tell us a little about the assistance you’re looking for. Our team can help you understand what to do next.</p><div className="enquiry-contact"><div className="call-block"><span className="call-block-icon"><Phone size={18}/></span><div><small>CALL OUR TEAM</small><a href={`tel:${phones[0].replace(/\s/g, '')}`} className="call-num">{phones[0]}</a><a href={`tel:${phones[1].replace(/\s/g, '')}`} className="call-num">{phones[1]}</a></div></div><a href={whatsappUrl} target="_blank" rel="noreferrer"><span><MessageCircle size={18}/></span><div><small>QUICK QUESTION?</small><strong>Chat on WhatsApp</strong></div></a></div><p className="response-note"><ShieldCheck size={16}/> Your details are treated with care and used to respond to your enquiry.</p></div><EnquiryForm/></div></section>
    <LocationMap/>
  </>
}

function About() {
  return <>
    <PageIntro eyebrow="OUR STORY" title={<>Guidance with care.<br/><em>Clarity at every step.</em></>} text="We believe the legal steps around marriage should be easier to understand. Court Marriage Seva helps couples navigate the process with professional guidance, clear communication and personal attention." image={photos.hands}/>
    <section className="section-pad"><div className="container story-grid"><div data-reveal="left"><SectionEyebrow>OUR APPROACH</SectionEyebrow><h2>Because your new beginning deserves <em>peace of mind.</em></h2></div><div className="story-body" data-reveal="right"><p className="lead">We turn complicated-sounding formalities into clearer, more manageable next steps.</p><p>From understanding which legal route may apply to preparing a document checklist, our aim is to help couples feel informed before they approach the relevant authority. We listen first, explain the process plainly and recognise that every situation is different.</p><p>Our role is to provide assistance and guidance—not to replace a Marriage Officer, government department or independent legal advice where it is needed.</p><div className="values-row"><div><HeartHandshake/><strong>Respectful</strong><span>Every situation deserves care.</span></div><div><FileCheck2/><strong>Clear</strong><span>Understand the next step.</span></div><div><ShieldCheck/><strong>Responsible</strong><span>Honest about requirements.</span></div></div></div></div></section>
    <section className="section-pad section-tint"><div className="container"><div className="center-heading"><SectionEyebrow>WHAT YOU CAN EXPECT</SectionEyebrow><h2>Support built around <em>you.</em></h2><p>Professional, practical and considerate assistance—designed to make the process easier to navigate.</p></div><div className="about-pillars">{[['Professional guidance','Understand the legal route and procedures relevant to your circumstances.'],['Documentation support','Get clarity on the documents and information that may be required.'],['Transparent communication','Know what is within our role and what is decided by authorities.'],['Pan-India assistance','Get initial guidance for the location where you intend to proceed.']].map(([t,d],i)=><div className="pillar" key={t} data-reveal="up" style={{transitionDelay:`${i*80}ms`}}><span>0{i+1}</span><h3>{t}</h3><p>{d}</p></div>)}</div></div></section>
    <Callout/>
  </>
}

function Process() {
  return <>
    <PageIntro eyebrow="THE PROCESS" title={<>A clearer path to<br/><em>your next chapter.</em></>} text="The right process depends on whether you are seeking a civil marriage or registering a marriage that has already taken place. Start by understanding which route may apply to you." image={photos.ceremony}/>
    <section className="section-pad"><div className="container"><div className="section-heading"><div><SectionEyebrow>HOW IT WORKS</SectionEyebrow><h2>From first question<br/>to <em>next steps.</em></h2></div><p>We help you understand the process and prepare for conversations with the relevant authority. Exact steps and timelines vary by law and location.</p></div><div className="stl-overflow-guard"><div className="hsnake-wrap"><StraightTimeline steps={steps}/></div></div></div></section>
    <section className="section-pad section-tint route-carousel-section"><div className="container"><div className="center-heading"><SectionEyebrow>UNDERSTAND YOUR ROUTE</SectionEyebrow><h2>Different routes. <em>Different requirements.</em></h2><p>These are broad categories, not a substitute for checking the law and local procedure that apply to your case.</p></div></div>
    <div className="rc-viewport"><div className="rc-track">{[...Array(2)].flatMap((_,pass)=>[
      ['Court marriage','A civil marriage solemnized before a Marriage Officer under the Special Marriage Act, 1954, subject to eligibility and statutory requirements.'],
      ['Marriage registration','Registration of a marriage already solemnized under an applicable personal or other law. The relevant state process matters.'],
      ['Hindu marriage','Hindu Marriage Act, 1955 may apply to Hindu, Buddhist, Jain and Sikh marriages, subject to its provisions.'],
      ['Muslim marriage (Nikah)','Applicable personal law and state registration requirements may be relevant. Confirm the specific procedure locally.'],
      ['Christian marriage','The Indian Christian Marriage Act, 1872 and relevant procedures may apply, depending on the circumstances.'],
      ['Interfaith marriage','The Special Marriage Act may provide a civil route for eligible couples, with applicable notice and other requirements.'],
      ['Arya Samaj marriage','A ceremony according to Arya Samaj rites may be relevant for eligible couples; legal validity and registration requirements must be checked.'],
      ['Customary / traditional marriage','A customary or religious ceremony and subsequent registration may involve different legal requirements depending on the applicable law.'],
    ].map(([t,d],i)=><article className="rc-card" key={`${pass}-${t}`} aria-hidden={pass===1}><span className="rc-index">0{(i%8)+1}</span><h3>{t}</h3><p>{d}</p></article>))}</div></div></section>
    <section className="section-pad"><div className="container docs-grid"><div data-reveal="left"><SectionEyebrow>BEFORE YOU BEGIN</SectionEyebrow><h2>Get your documents<br/><em>in order.</em></h2><p>Requirements differ by route and jurisdiction. A typical checklist may include some of the following; it is not exhaustive and should be confirmed with the relevant authority.</p><ul className="check-list"><li><Check/> Proof of age and identity</li><li><Check/> Address / residence proof</li><li><Check/> Passport-size photographs</li><li><Check/> Affidavits or declarations, if required</li><li><Check/> Witness details and documents, if required</li><li><Check/> Evidence of previous marital status, where applicable</li></ul><p className="small-note">Do not send Aadhaar numbers, identity documents or other sensitive records through the general website enquiry form.</p></div><div className="docs-image" data-reveal="right"><img src={photos.rings} alt="Indian bridal jewellery"/><div className="docs-note"><FileText/><div><strong>Prepare with confidence</strong><span>Confirm the current checklist for your specific route and location.</span></div></div></div></div></section>
    <section className="faq-section section-pad section-tint"><div className="container faq-grid"><div><SectionEyebrow>COMMON QUESTIONS</SectionEyebrow><h2>Know before<br/><em>you begin.</em></h2></div><div className="faq-list">{faqs.map(([q,a],i)=><details key={q} className="faq-item" data-reveal="up" style={{transitionDelay:`${i*60}ms`}}><summary>{q}<ChevronDown size={18}/></summary><p>{a}</p></details>)}</div></div></section><Callout/>
  </>
}

function Gallery() {
  const items = [
    // Your photos ─────────────────────────────────────────────────────────
    {src: '/elegant-wedding-portrait.png',  label: 'An elegant Indian wedding portrait', cls: 'gallery-item tall'},
    {src: '/wedding-couple.jpeg',           label: 'A beautiful wedding moment',          cls: 'gallery-item wide'},
    // Hindu (majority) ──────────────────────────────────────────────────────
    {src: photos.ceremony,    label: 'A Hindu wedding ceremony',                cls: 'gallery-item tall'},
    {src: photos.mandap,      label: 'The sacred mandap',                         cls: 'gallery-item'},
    {src: photos.couple,      label: 'Kanyadaan — a sacred moment',               cls: 'gallery-item wide'},
    {src: photos.pheras,      label: 'Taking the sacred pheras together',         cls: 'gallery-item'},
    {src: photos.hands,       label: 'Mehndi — art for a new beginning',          cls: 'gallery-item tall'},
    {src: photos.portrait,    label: 'The bride, beautifully adorned',            cls: 'gallery-item'},
    {src: photos.weddingKnot, label: 'The knot that binds',                       cls: 'gallery-item'},
    // Sikh ──────────────────────────────────────────────────────────────────
    {src: photos.sikhWedding, label: 'An Anand Karaj Sikh wedding',              cls: 'gallery-item tall'},
    // More Hindu weddings ────────────────────────────────────────────────────
    {src: photos.weddingCelebration, label: 'A joyful wedding celebration',     cls: 'gallery-item wide'},
    {src: photos.baraat,      label: 'The baraat procession',                    cls: 'gallery-item'},
    {src: photos.mangalsutra, label: 'Tying the sacred mangalsutra',              cls: 'gallery-item tall'},
  ]
  const [selected, setSelected] = useState<number | null>(null)
  return <>
    <PageIntro eyebrow="THE GALLERY" title={<>Moments that matter.<br/><em>Memories that stay.</em></>} text="A visual collection celebrating the joy of new beginnings, love and commitment." image={photos.flowers}/>
    <section className="section-pad"><div className="container"><div className="gallery-intro"><div><SectionEyebrow>CELEBRATING NEW BEGINNINGS</SectionEyebrow><h2>Every story is <em>its own.</em></h2></div><p>Explore moments of love, tradition and celebration from weddings we have been privileged to be part of.</p></div><div className="gallery-grid">{items.map((item,i)=><button className={item.cls} key={item.label} onClick={()=>setSelected(i)} data-reveal="scale" style={{transitionDelay:`${(i%3)*100}ms`}}><img src={item.src} alt={item.label}/><span className="gallery-overlay"><span>{item.label}</span><span className="gallery-open"><ArrowUpRight size={18}/></span></span></button>)}</div><div className="gallery-video-placeholder"><div className="video-symbol"><Play size={25} fill="currentColor"/></div><div><SectionEyebrow>VIDEO STORIES</SectionEyebrow><h3>Bring your gallery to life.</h3><p>Wedding stories, ceremony highlights and heartfelt moments — coming soon.</p></div><Camera size={34} className="video-decoration"/></div></div></section>
    {selected !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image" onClick={()=>setSelected(null)}><button className="lightbox-close" onClick={()=>setSelected(null)} aria-label="Close image"><X/></button><img src={items[selected].src} alt={items[selected].label} onClick={e=>e.stopPropagation()}/><p>{items[selected].label}</p></div>}
  </>
}

// Scroll-triggered reveal wrapper — renders a data-reveal attribute that the
// global ScrollReveal observer picks up. No per-element observer needed.
function Reveal({ children, delay = 0, variant = 'up', className = '' }: { children: React.ReactNode; delay?: number; variant?: string; className?: string }) {
  return <div data-reveal={variant} className={className} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

// Global scroll-reveal: a single IntersectionObserver that reveals every
// [data-reveal] element as it scrolls into view. Re-runs on route change.
// Also handles hash-based scroll (e.g. /contact#enquiry-form).
function ScrollReveal() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    // Hash scroll — wait one tick for the DOM to settle after route change
    if (hash) {
      const id = hash.slice(1)
      const timer = setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 120)
      return () => clearTimeout(timer)
    }
  }, [pathname, hash])
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]:not(.is-visible)'))
    if (!els.length) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [pathname])
  return null
}

// Scroll progress bar (gold, top of page) + nav shadow on scroll.
function ScrollEffects() {
  const barRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  useEffect(() => {
    const bar = barRef.current
    const header = document.querySelector('.site-header')
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const st = window.scrollY
        const dh = document.documentElement.scrollHeight - window.innerHeight
        if (bar) bar.style.width = (dh > 0 ? (st / dh) * 100 : 0) + '%'
        if (header) header.classList.toggle('scrolled', st > 20)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])
  return <div ref={barRef} className="scroll-progress" />
}

// Animated count-up number — eases from 0 to the target when scrolled into view.
function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [val, setVal] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const dur = 1600, start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1)
          setVal(Math.floor(end * (1 - Math.pow(1 - p, 3))))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [end])
  return <span ref={ref}>{val}{suffix}</span>
}

// StraightTimeline: 6 steps on a vertical centre line.
// Odd steps (1,3,5) float in from the LEFT, even (2,4,6) from the RIGHT.
// Each step becomes visible individually as it enters the viewport.
function StraightTimeline({ steps: stepsData }: { steps: string[][] }) {
  const [visible, setVisible] = useState<boolean[]>(
    () => new Array(stepsData.length).fill(false)
  )
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.idx)
          if (entry.isIntersecting) {
            setVisible((prev) => {
              if (prev[idx]) return prev
              const next = [...prev]; next[idx] = true; return next
            })
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )
    itemRefs.current.forEach((el) => { if (el) obs.observe(el) })
    return () => obs.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepsData.length])

  return (
    <div className="stl-wrap">
      {/* vertical centre line */}
      <div className="stl-line" />

      {stepsData.map(([num, title, desc], i) => {
        const fromLeft = i % 2 === 0   // steps 1,3,5 (index 0,2,4) come from left
        const isVis    = visible[i]

        return (
          <div
            key={num}
            ref={(el) => { itemRefs.current[i] = el }}
            data-idx={i}
            className={`stl-item${fromLeft ? ' stl-left' : ' stl-right'}${isVis ? ' stl-visible' : ''}`}
          >
            {/* content card */}
            <div className="stl-card">
              <span className="stl-tag">{title}</span>
              <p className="stl-desc">{desc}</p>
            </div>

            {/* centre dot + number */}
            <div className="stl-dot">
              <span className="stl-num">{num}</span>
            </div>

            {/* spacer on the other side so grid stays symmetric */}
            <div className="stl-spacer" />
          </div>
        )
      })}
    </div>
  )
}

const testimonials = [
  { name: 'Rohit & Priya', city: 'Delhi', service: 'Court Marriage', rating: 5, date: 'March 2025', text: 'We were nervous about the civil marriage process but the team walked us through every step. From the notice to the final registration, everything was clear and stress-free.' },
  { name: 'Aman & Sneha', city: 'Mumbai', service: 'Interfaith Marriage', rating: 5, date: 'January 2025', text: 'As an interfaith couple we had many questions about the Special Marriage Act. The guidance we received was patient, honest and helped us proceed with confidence.' },
  { name: 'Vikram & Anjali', city: 'Jaipur', service: 'Hindu Marriage', rating: 5, date: 'February 2025', text: 'They helped us understand the documentation required for registering our marriage. The checklist they prepared saved us multiple trips to the office.' },
  { name: 'Arjun & Fatima', city: 'Lucknow', service: 'Interfaith Marriage', rating: 5, date: 'December 2024', text: 'The team was respectful of both our traditions and explained the civil route clearly. We never felt judged — only supported throughout the entire process.' },
  { name: 'Karan & Neha', city: 'Pune', service: 'Marriage Registration', rating: 5, date: 'November 2024', text: 'Our marriage was already solemnised but we struggled with the registration paperwork. They made it simple and handled every detail professionally.' },
  { name: 'Rahul & Divya', city: 'Ahmedabad', service: 'Arya Samaj Marriage', rating: 5, date: 'October 2024', text: 'They guided us through the ceremony formalities and the subsequent registration. Clear communication at every stage made a confusing process feel manageable.' },
  { name: 'Sahil & Pooja', city: 'Chandigarh', service: 'Court Marriage', rating: 5, date: 'September 2024', text: 'From the first phone call to the final certificate, the support was outstanding. They anticipated our questions before we even asked them.' },
  { name: 'Deepak & Kavya', city: 'Gurgaon', service: 'Marriage Registration', rating: 4, date: 'August 2024', text: 'Professional and thorough. They kept us informed about timelines and what to expect at each appointment. The whole registration was smoother than we imagined.' },
  { name: 'Nikhil & Shruti', city: 'Noida', service: 'Court Marriage', rating: 5, date: 'July 2024', text: 'What impressed us most was how honestly they set expectations. No false promises, just clear guidance about the process, the documents and the waiting periods.' },
  { name: 'Aditya & Zara', city: 'Bengaluru', service: 'Interfaith Marriage', rating: 5, date: 'June 2024', text: 'Finding someone who understood interfaith marriage procedures without pressure was a relief. The guidance was practical, empathetic and entirely professional.' },
  { name: 'Manish & Riya', city: 'Indore', service: 'Hindu Marriage', rating: 5, date: 'May 2024', text: 'The team prepared a personalised document list for our situation and followed up at each step. We felt supported from start to finish.' },
  { name: 'Saurabh & Ankita', city: 'Surat', service: 'Arya Samaj Marriage', rating: 5, date: 'April 2024', text: 'They explained the legal validity and registration requirements clearly. Everything was handled with care and we received our certificate without any complications.' },
]

function Testimonials() {
  return <>
    <PageIntro eyebrow="KIND WORDS" title={<>A little reassurance<br/><em>goes a long way.</em></>} text="Genuine feedback from couples we have guided through court marriage and marriage registration. Some details have been generalised to protect privacy." image={photos.portrait}/>
    <section className="section-pad"><div className="container"><div className="center-heading"><SectionEyebrow>CLIENT EXPERIENCES</SectionEyebrow><h2>Real experiences. <em>Real voices.</em></h2><p>Every couple's journey is different. Here are some of the people we have had the privilege to support.</p></div>
    <Reveal><div className="testimonial-stats"><div className="stat-item"><span className="stat-num"><CountUp end={1200} suffix="+" /></span><span className="stat-label">Couples Guided</span></div><div className="stat-item"><span className="stat-num"><CountUp end={8} suffix="+" /></span><span className="stat-label">Years of Experience</span></div><div className="stat-item"><span className="stat-num"><CountUp end={50} suffix="+" /></span><span className="stat-label">Cities Covered</span></div><div className="stat-item"><span className="stat-num"><CountUp end={98} suffix="%" /></span><span className="stat-label">Satisfaction</span></div></div></Reveal>
    <div className="marquee"><div className="marquee-track">{[...testimonials, ...testimonials].map((t,i)=><div className="testimonial-card marquee-card" key={i}><Quote size={28} className="t-quote"/><span className="testimonial-tag">{t.service}</span><div className="testimonial-stars">{Array.from({length:5}).map((_,s)=><Star key={s} size={15} fill={s<t.rating?'currentColor':'none'} strokeWidth={s<t.rating?0:1.5}/>)}</div><p>"{t.text}"</p><div className="testimonial-author"><span className="testimonial-avatar">{t.name.split(' & ').map(n=>n.charAt(0)).join('')}</span><div><strong>{t.name}</strong><span>{t.city} · {t.date}</span></div></div></div>)}</div></div>
    <div className="testimonial-values"><div><ShieldCheck/><h3>Honest expectations</h3><p>Clear explanations about steps, limitations and what authorities decide.</p></div><div><HeartHandshake/><h3>Respectful support</h3><p>A considerate approach to personal circumstances and questions.</p></div><div><MessageCircle/><h3>Open communication</h3><p>Convenient ways to ask questions and understand what comes next.</p></div></div></div></section><Callout/>
  </>
}

const blogPosts = [
  {category:'COURT MARRIAGE', title:'Court marriage in India: understanding the basics', date:'Guide', read:'6 min read', image:photos.couple, text:'Learn the broad difference between a civil marriage under the Special Marriage Act and registration of a marriage already solemnized.'},
  {category:'DOCUMENTATION', title:'Preparing for a marriage registration appointment', date:'Checklist', read:'5 min read', image:photos.hands, text:'A practical starting point for organising your paperwork—while remembering that the official checklist varies by location and legal route.'},
  {category:'INTERFAITH MARRIAGE', title:'Questions to ask before choosing a legal route', date:'Explainer', read:'7 min read', image:photos.sikhWedding, text:'Understand eligibility, statutory requirements, notice procedures and why it is important to confirm details with the relevant authority.'},
]
function Blogs() {
  const [active, setActive] = useState('All articles')
  const categories = ['All articles','Court marriage','Documentation','Interfaith marriage']
  const shown = active === 'All articles' ? blogPosts : blogPosts.filter(p=>p.category.toLowerCase()===active.toLowerCase())
  return <>
    <PageIntro eyebrow="THE JOURNAL" title={<>A little more clarity<br/><em>for the journey.</em></>} text="Helpful explainers and practical starting points for understanding court marriage and registration procedures. Always confirm current requirements with the relevant authority." image={photos.rings}/>
    <section className="section-pad"><div className="container"><div className="blog-top"><div><SectionEyebrow>NOTES & GUIDES</SectionEyebrow><h2>Useful things to <em>know.</em></h2></div><div className="blog-filter">{categories.map(c=><button className={active===c?'active':''} onClick={()=>setActive(c)} key={c}>{c}</button>)}</div></div><div className="blog-grid">{shown.map((p,i)=><article className="blog-card" key={p.title} data-reveal="up" style={{transitionDelay:`${(i%3)*100}ms`}}><Link to={`/blogs/${i+1}`} className="blog-image"><img src={p.image} alt="Article illustration"/><span><ArrowUpRight size={18}/></span></Link><div className="blog-meta"><span>{p.category}</span><span>{p.read}</span></div><h3><Link to={`/blogs/${i+1}`}>{p.title}</Link></h3><p>{p.text}</p><Link className="text-link" to={`/blogs/${i+1}`}>Read the guide <ArrowRight size={15}/></Link></article>)}</div></div></section>
  </>
}
function BlogDetail() {
  const { pathname } = useLocation()
  const index = Math.max(0, Math.min(blogPosts.length-1, Number(pathname.split('/').pop())-1 || 0))
  const post = blogPosts[index]
  return <><PageIntro eyebrow={post.category} title={<>{post.title.split(':')[0]}<br/><em>{post.title.split(':')[1] || 'A practical guide'}</em></>} text={post.text} image={post.image}/><section className="section-pad"><article className="container article-content"><p className="lead">This article is a general starting point to help you ask better questions and prepare for the next step.</p><h2>Start with the right route</h2><p>Before collecting documents or booking an appointment, identify whether you are seeking a civil marriage or registration of a marriage that has already been solemnized. Different laws and procedures may apply depending on the facts of your situation.</p><h2>Confirm local requirements</h2><p>Eligibility, forms, supporting documents, notice requirements, fees and appointment systems can vary by jurisdiction. Check the current instructions published by the relevant Marriage Officer or government authority, and seek qualified legal advice where needed.</p><h2>Prepare thoughtfully</h2><p>Make a checklist based on official requirements, keep your documents secure and ask questions before submitting sensitive information. Do not rely on generic online lists as a definitive checklist for every case.</p><div className="article-disclaimer"><CircleHelp/><p>This content is general information only and is not legal advice. Court Marriage Seva is not a government portal. Final decisions and certificates are issued by the relevant authorities.</p></div><Link to="/contact" className="button button-primary">Ask about your situation <ArrowRight size={16}/></Link></article></section></>
}
// ── Directions URLs (no API key required) ───────────────────────────────────
// ── Directions URLs (no API key required) ───────────────────────────────────
const MAPS_DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1' +
  '&origin=Chaudhary+Mod,+Ghaziabad,+Uttar+Pradesh,+India' +
  '&destination=Arya+Samaj+Mandir,+Ghaziabad,+Uttar+Pradesh,+India' +
  '&travelmode=walking'

function LocationMap() {
  return (
    <section className="loc-section" aria-labelledby="loc-heading">

      {/* ── TOP STRIP: eyebrow + headline + subtitle ── */}
      <div className="loc-header">
        <div className="container loc-header-inner">
          <div data-reveal="up">
            <SectionEyebrow>VISIT OUR OFFICE</SectionEyebrow>
            <h2 id="loc-heading">Find us <em>easily.</em></h2>
          </div>
          <p data-reveal="fade" className="loc-subtitle">
            Just a 10-minute walk from Chaudhary Mod along Old Arya Nagar Road,
            Ghaziabad — to Arya Samaj Mandir.
          </p>
        </div>
      </div>

      {/* ── MAIN: route image left, info panel right ── */}
      <div className="container loc-main">

        {/* route map image — the verified screenshot */}
        <div className="loc-map-panel" data-reveal="left">
          <a
            href={MAPS_DIRECTIONS_URL}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Open walking route from Chaudhary Mod to Arya Samaj Mandir in Google Maps"
            className="loc-img-link"
          >
            <div className="loc-img-frame">
              <img
                src="/route-map.png"
                alt="Click to open walking route from Chaudhary Mod to Arya Samaj Mandir, Ghaziabad — 700 m, 10 minutes"
                className="loc-route-img"
              />
              <div className="loc-img-badge">
                <Navigation size={13}/>
                <span>700 m · 10 min walk</span>
              </div>
              <div className="loc-img-overlay">
                <ArrowUpRight size={22}/>
                <span>Open in Google Maps</span>
              </div>
            </div>
          </a>
        </div>

        {/* info panel */}
        <div className="loc-info-panel" data-reveal="right">

          {/* origin → destination */}
          <div className="loc-route-steps">
            <div className="loc-step">
              <div className="loc-step-dot loc-step-dot-a"/>
              <div className="loc-step-text">
                <small>STARTING POINT</small>
                <strong>Chaudhary Mod</strong>
                <span>Ghaziabad, UP</span>
              </div>
            </div>
            <div className="loc-step-line"><span/></div>
            <div className="loc-step">
              <div className="loc-step-dot loc-step-dot-b"/>
              <div className="loc-step-text">
                <small>DESTINATION</small>
                <strong>Arya Samaj Mandir</strong>
                <span>Ghaziabad, UP</span>
              </div>
            </div>
          </div>

          {/* stats */}
          <div className="loc-chips">
            <div className="loc-chip"><Navigation size={15}/><span>Walking</span></div>
            <div className="loc-chip"><MapPin size={15}/><span>700 m</span></div>
            <div className="loc-chip"><Clock3 size={15}/><span>~10 min</span></div>
          </div>

          {/* CTA */}
          <a
            href={MAPS_DIRECTIONS_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="button button-gold loc-cta"
          >
            <Navigation size={16}/>
            GET DIRECTIONS
          </a>

        </div>
      </div>
    </section>
  )
}



function Contact() {
  return <>
    <PageIntro eyebrow="CONTACT US" title={<>Your questions matter.<br/><em>Let’s talk.</em></>} text="Tell us what you need help understanding. We’ll help you identify practical next steps and the questions to confirm for your location." image={photos.couple}/>
    <section className="section-pad"><div className="container contact-layout"><div className="contact-info"><SectionEyebrow>GET IN TOUCH</SectionEyebrow><h2>We’re here to<br/><em>make things clearer.</em></h2><p>Choose the way that feels easiest. For urgent or detailed questions, a direct conversation may be the best place to start.</p><div className="contact-methods" data-reveal="up"><div className="call-block call-block-contact"><span className="call-block-icon"><Phone/></span><div><small>CALL OUR TEAM</small><a href={`tel:${phones[0].replace(/\s/g, '')}`} className="call-num">{phones[0]}</a><a href={`tel:${phones[1].replace(/\s/g, '')}`} className="call-num">{phones[1]}</a></div></div><a href={whatsappUrl} target="_blank" rel="noreferrer"><span><MessageCircle/></span><div><small>WHATSAPP</small><strong>Send us a message</strong><em>Start a conversation</em></div><ArrowUpRight/></a><a href="mailto:sunil.upadhyay@courtmarriageseva.com"><span><Mail/></span><div><small>EMAIL</small><strong>sunil.upadhyay@courtmarriageseva.com</strong><em>Share your question</em></div><ArrowUpRight/></a><div className="contact-method-static"><span><MapPin/></span><div><small>SERVICE COVERAGE</small><strong>Pan-India assistance</strong><em>Procedures depend on the relevant jurisdiction</em></div></div></div><div className="contact-hours"><Clock3/><span><strong>Response hours</strong><small>Mon – Sat: 9:00 AM – 7:00 PM</small></span></div></div><EnquiryForm/></div></section>
    <section className="section-pad section-tint"><div className="container contact-bottom"><div><SectionEyebrow>BEFORE YOU SEND</SectionEyebrow><h2>A few details help us<br/><em>guide you better.</em></h2></div><p>Please share only the information needed for an initial enquiry. Do not include Aadhaar numbers, identity-document images, private legal records or other sensitive personal details in this form.</p></div></section>
    <LocationMap/>
  </>
}

function Callout() {
  return <section className="callout" data-reveal="scale"><div className="container callout-inner"><div><span className="callout-kicker">YOUR NEXT STEP STARTS HERE</span><h2>Clarity for the journey.<br/><em>Care for the moment.</em></h2></div><a className="button button-gold" href="/contact#enquiry-form">Talk to our team <ArrowUpRight size={17}/></a></div></section>
}

function LegalPage({ type }: {type: 'privacy'|'terms'}) {
  return <><PageIntro eyebrow={type==='privacy'?'PRIVACY NOTICE':'TERMS & DISCLAIMER'} title={type==='privacy'?<>Your privacy<br/><em>matters to us.</em></>:<>Clear expectations.<br/><em>Responsible guidance.</em></>} text="Please read this page carefully. It sets out how we handle your information and the terms under which our services are provided."/><section className="section-pad"><div className="container article-content"><h2>{type==='privacy'?'Information and use':'Important disclaimer'}</h2><p>{type==='privacy'?'The website may collect contact details and enquiry information that you choose to submit. We use this information solely to respond to your request, operate the service and maintain appropriate records. Your information is kept secure and is never sold or shared with third parties.':'Court Marriage Seva provides information and legal assistance guidance; it is not an official government website or Marriage Officer. Information on this site is general and is not a substitute for advice from a qualified professional who has reviewed your circumstances.'}</p><p>For privacy questions, contact <a href="mailto:sunil.upadhyay@courtmarriageseva.com">sunil.upadhyay@courtmarriageseva.com</a>.</p></div></section></>
}

export default function App() {
  return <><ScrollToTop/><ScrollReveal/><ScrollEffects/><Header/><main><Routes>
    <Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/process" element={<Process/>}/><Route path="/gallery" element={<Gallery/>}/><Route path="/testimonials" element={<Testimonials/>}/><Route path="/blogs" element={<Blogs/>}/><Route path="/blogs/:id" element={<BlogDetail/>}/><Route path="/contact" element={<Contact/>}/><Route path="/privacy" element={<LegalPage type="privacy"/>}/><Route path="/terms" element={<LegalPage type="terms"/>}/><Route path="*" element={<div className="not-found container"><span>404</span><h1>This page wandered off.</h1><Link className="button button-primary" to="/">Return home <ArrowRight size={16}/></Link></div>}/>
  </Routes></main><Footer/><FloatingContact/></>
}
