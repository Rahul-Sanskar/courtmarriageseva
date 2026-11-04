import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BadgeCheck, CalendarDays, Check,
  ChevronDown, ChevronRight, Clock3, FileCheck2, HeartHandshake, Landmark,
  Mail, MapPin, Menu, MessageCircle, Phone, ShieldCheck, Sparkles, Users,
  X, Instagram, Facebook, Youtube, Quote, ClipboardCheck, Scale, Heart,
  FileText, CircleHelp, Play, Camera, BookOpen, Send
} from 'lucide-react'

const phone = '+91 98765 43210' // Replace with the verified business phone number.
const whatsappNumber = '919876543210' // Replace with the verified WhatsApp number, digits only.
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello, I would like guidance about court marriage / marriage registration.')}`

const photos = {
  hero: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85',
  couple: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=82',
  rings: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=82',
  hands: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1000&q=82',
  portrait: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=82',
  flowers: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1000&q=82',
  ceremony: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=82',
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
  ['01', 'Share your situation', 'Tell us the kind of marriage assistance you need and where you plan to apply.'],
  ['02', 'Understand the requirements', 'Get guidance on eligibility, documents, notices and the process relevant to your case.'],
  ['03', 'Prepare your documents', 'Organise the required paperwork and clarify questions before your appointment.'],
  ['04', 'Proceed with confidence', 'Follow the applicable process with clear, professional guidance at each stage.'],
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
          <span className="brand-mark"><Heart size={22} strokeWidth={1.7} /></span>
          <span className="brand-copy"><strong>Court Marriage <em>Seva</em></strong><small>GUIDANCE FOR YOUR NEW BEGINNING</small></span>
        </Link>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <X /> : <Menu />}</button>
        <nav className={open ? 'main-nav is-open' : 'main-nav'}>
          {links.map(([label, path]) => <NavLink key={path} to={path} onClick={close} end={path === '/'}>{label}</NavLink>)}
          <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noreferrer">Talk to our team <ArrowUpRight size={15} /></a>
        </nav>
      </div>
    </header>
  </>
}

function Footer() {
  return <footer className="footer">
    <div className="container footer-main">
      <div className="footer-brand">
        <Link to="/" className="brand brand-light"><span className="brand-mark"><Heart size={22} /></span><span className="brand-copy"><strong>Court Marriage <em>Seva</em></strong><small>GUIDANCE FOR YOUR NEW BEGINNING</small></span></Link>
        <p>Making your marriage journey simpler with clear information, thoughtful support and professional guidance.</p>
        <div className="socials"><a href="#" aria-label="Instagram"><Instagram size={17}/></a><a href="#" aria-label="Facebook"><Facebook size={17}/></a><a href="#" aria-label="YouTube"><Youtube size={17}/></a></div>
      </div>
      <div><h4>Explore</h4><Link to="/about">About Us</Link><Link to="/process">Marriage Process</Link><Link to="/gallery">Gallery</Link><Link to="/testimonials">Testimonials</Link></div>
      <div><h4>Our Services</h4><Link to="/process">Court Marriage</Link><Link to="/process">Marriage Registration</Link><Link to="/process">Interfaith Marriage</Link><Link to="/process">Arya Samaj Guidance</Link></div>
      <div className="footer-contact"><h4>Let's talk</h4><a href={`tel:${phone.replace(/\s/g, '')}`}><Phone size={16}/>{phone}</a><a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp our team</a><a href="mailto:info@courtmarriageseva.com"><Mail size={16}/> info@courtmarriageseva.com</a><span><MapPin size={16}/> Pan-India assistance</span></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} Court Marriage Seva. All rights reserved.</span><div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms & Disclaimer</Link></div></div>
    <div className="container footer-note">Court Marriage Seva provides guidance and assistance. It is not a government portal. Legal requirements and procedures vary by applicable law and jurisdiction. Final decisions and certificates are issued by the relevant authorities.</div>
  </footer>
}

function FloatingContact() {
  return <div className="floating-contact">
    <a href={`tel:${phone.replace(/\s/g, '')}`} aria-label="Call Court Marriage Seva"><Phone size={19}/></a>
    <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={20}/></a>
  </div>
}

function SectionEyebrow({ children }: { children: React.ReactNode }) { return <div className="eyebrow"><span />{children}</div> }

function PageIntro({ eyebrow, title, text, image }: { eyebrow: string; title: React.ReactNode; text: string; image?: string }) {
  return <section className="page-intro">
    <div className="container page-intro-grid">
      <div><SectionEyebrow>{eyebrow}</SectionEyebrow><h1>{title}</h1><p>{text}</p></div>
      {image && <div className="page-intro-image"><img src={image} alt="A couple celebrating their new beginning" /></div>}
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
  return <form className={`enquiry-form ${compact ? 'form-compact' : ''}`} onSubmit={submit}>
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
          <div className="hero-actions"><a className="button button-gold" href={whatsappUrl} target="_blank" rel="noreferrer">Talk to our team <ArrowUpRight size={17}/></a><Link className="text-link text-link-light" to="/process">Explore the process <ArrowDownRight size={17}/></Link></div>
          <div className="hero-trust"><span><ShieldCheck size={17}/> Clear, practical guidance</span><span><MapPin size={17}/> Across India</span></div>
        </div>
        <div className="hero-side-note"><span className="side-note-line"/><span>Every journey deserves<br/>a thoughtful beginning.</span></div>
      </div>
      <div className="hero-bottom"><span>01 — A LITTLE CLARITY GOES A LONG WAY</span><span>SCROLL TO EXPLORE <ChevronDown size={14}/></span></div>
    </section>

    <section className="intro-section section-pad">
      <div className="container intro-grid">
        <div className="intro-image-wrap"><img className="intro-image" src={photos.couple} alt="Couple celebrating together" /><div className="image-caption"><Heart size={18}/><span>Here for the important moments</span></div><div className="intro-stamp"><span>CARE</span><Heart size={20}/><span>CLARITY</span></div></div>
        <div className="intro-copy"><SectionEyebrow>WELCOME TO COURT MARRIAGE SEVA</SectionEyebrow><h2>A meaningful milestone.<br/><em>A clearer way forward.</em></h2><p className="lead">Marriage formalities can feel unfamiliar. We’re here to make the journey easier to understand.</p><p>Court Marriage Seva is a legal assistance service offering guidance for court marriages and marriage registration across India. We help couples understand relevant procedures, prepare necessary documents and navigate formalities with more confidence.</p><Link className="text-link" to="/about">Get to know us <ArrowRight size={16}/></Link><div className="intro-signoff"><span className="signoff-rule"/><span>Thoughtful support, at every step.</span></div></div>
      </div>
    </section>

    <section className="services-section section-pad section-tint">
      <div className="container"><div className="section-heading"><div><SectionEyebrow>HOW WE CAN HELP</SectionEyebrow><h2>Guidance for your<br/><em>kind of beginning.</em></h2></div><p>Every couple’s circumstances are different. Explore the assistance you need and let’s work out the right next step together.</p></div>
        <div className="services-grid">{services.map((s, i) => <Link className="service-card" to="/process" key={s.title}><div className="service-top"><span className="service-icon"><s.icon size={22}/></span><span className="service-number">0{i+1}</span></div><h3>{s.title}</h3><p>{s.text}</p><span className="service-link">Explore service <ArrowUpRight size={16}/></span></Link>)}</div>
        <div className="section-footnote"><span className="tiny-star">✳</span> The appropriate legal route depends on your circumstances and the law applicable to your case.</div>
      </div>
    </section>

    <section className="why-section section-pad"><div className="container why-grid"><div className="why-copy"><SectionEyebrow>WHY COUPLES CHOOSE US</SectionEyebrow><h2>Good guidance makes<br/><em>all the difference.</em></h2><p>We believe support should feel personal, clear and respectful. No unnecessary confusion—just a considered approach to helping you understand the process.</p><Link to="/about" className="button button-outline">Why Court Marriage Seva <ArrowRight size={16}/></Link></div><div className="benefit-grid">{[['01','Professional legal guidance','Understand relevant procedures with guidance from qualified professionals.'],['02','Clear documentation support','Know which documents may be needed before you begin.'],['03','Personal attention','Ask questions and get support based on your stated requirements.'],['04','Transparent communication','Clear explanations about process, next steps and limitations.'],['05','Support across India','Guidance for couples navigating procedures in different locations.'],['06','Convenient assistance','Reach out by phone, WhatsApp or the enquiry form.']].map(([n,t,d])=><div className="benefit" key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div><Check size={17}/></div>)}</div></div></section>

    <section className="process-preview section-pad"><div className="container"><div className="section-heading"><div><SectionEyebrow>A SIMPLE, THOUGHTFUL PROCESS</SectionEyebrow><h2>One step at a time.<br/><em>With clarity.</em></h2></div><Link className="text-link" to="/process">View full process <ArrowRight size={16}/></Link></div><div className="steps-grid">{steps.map(([n,t,d])=><div className="step-card" key={n}><span className="step-no">{n}</span><div className="step-rule"/><h3>{t}</h3><p>{d}</p></div>)}</div></div></section>

    <section className="gallery-preview section-pad section-tint"><div className="container"><div className="section-heading"><div><SectionEyebrow>REAL MOMENTS, BEAUTIFULLY REMEMBERED</SectionEyebrow><h2>A gallery of <em>new beginnings.</em></h2></div><Link className="text-link" to="/gallery">Explore the gallery <ArrowRight size={16}/></Link></div><div className="photo-mosaic"><Link to="/gallery" className="mosaic-large"><img src={photos.ceremony} alt="Wedding ceremony details"/><span>Moments that matter <ArrowUpRight size={16}/></span></Link><Link to="/gallery" className="mosaic-tall"><img src={photos.rings} alt="Wedding rings"/><span>Small details, big meaning <ArrowUpRight size={16}/></span></Link><Link to="/gallery" className="mosaic-small"><img src={photos.flowers} alt="Wedding flowers"/><span>Celebrating together <ArrowUpRight size={16}/></span></Link></div><p className="media-note">Images shown are visual placeholders. Replace them with approved client photographs and videos before launch.</p></div></section>

    <section className="faq-section section-pad"><div className="container faq-grid"><div><SectionEyebrow>GOOD TO KNOW</SectionEyebrow><h2>Questions, answered<br/><em>with care.</em></h2><p>Start with the basics. If your situation is specific, reach out for guidance tailored to your circumstances.</p><Link className="text-link" to="/contact">Ask us a question <ArrowRight size={16}/></Link></div><div className="faq-list">{faqs.map(([q,a])=><details key={q} className="faq-item"><summary>{q}<ChevronDown size={18}/></summary><p>{a}</p></details>)}</div></div></section>

    <section className="home-enquiry section-pad"><div className="container enquiry-grid"><div className="enquiry-copy"><SectionEyebrow>TAKE THE FIRST STEP</SectionEyebrow><h2>Let’s make the next<br/><em>step feel simpler.</em></h2><p>Tell us a little about the assistance you’re looking for. Our team can help you understand what to do next.</p><div className="enquiry-contact"><a href={`tel:${phone.replace(/\s/g, '')}`}><span><Phone size={18}/></span><div><small>CALL OUR TEAM</small><strong>{phone}</strong></div></a><a href={whatsappUrl} target="_blank" rel="noreferrer"><span><MessageCircle size={18}/></span><div><small>QUICK QUESTION?</small><strong>Chat on WhatsApp</strong></div></a></div><p className="response-note"><ShieldCheck size={16}/> Your details are treated with care and used to respond to your enquiry.</p></div><EnquiryForm/></div></section>
  </>
}

function About() {
  return <>
    <PageIntro eyebrow="OUR STORY" title={<>Guidance with care.<br/><em>Clarity at every step.</em></>} text="We believe the legal steps around marriage should be easier to understand. Court Marriage Seva helps couples navigate the process with professional guidance, clear communication and personal attention." image={photos.hands}/>
    <section className="section-pad"><div className="container story-grid"><div><SectionEyebrow>OUR APPROACH</SectionEyebrow><h2>Because your new beginning deserves <em>peace of mind.</em></h2></div><div className="story-body"><p className="lead">We turn complicated-sounding formalities into clearer, more manageable next steps.</p><p>From understanding which legal route may apply to preparing a document checklist, our aim is to help couples feel informed before they approach the relevant authority. We listen first, explain the process plainly and recognise that every situation is different.</p><p>Our role is to provide assistance and guidance—not to replace a Marriage Officer, government department or independent legal advice where it is needed.</p><div className="values-row"><div><HeartHandshake/><strong>Respectful</strong><span>Every situation deserves care.</span></div><div><FileCheck2/><strong>Clear</strong><span>Understand the next step.</span></div><div><ShieldCheck/><strong>Responsible</strong><span>Honest about requirements.</span></div></div></div></div></section>
    <section className="section-pad section-tint"><div className="container"><div className="center-heading"><SectionEyebrow>WHAT YOU CAN EXPECT</SectionEyebrow><h2>Support built around <em>you.</em></h2><p>Professional, practical and considerate assistance—designed to make the process easier to navigate.</p></div><div className="about-pillars">{[['Professional guidance','Understand the legal route and procedures relevant to your circumstances.'],['Documentation support','Get clarity on the documents and information that may be required.'],['Transparent communication','Know what is within our role and what is decided by authorities.'],['Pan-India assistance','Get initial guidance for the location where you intend to proceed.']].map(([t,d],i)=><div className="pillar" key={t}><span>0{i+1}</span><h3>{t}</h3><p>{d}</p></div>)}</div></div></section>
    <Callout/>
  </>
}

function Process() {
  return <>
    <PageIntro eyebrow="THE PROCESS" title={<>A clearer path to<br/><em>your next chapter.</em></>} text="The right process depends on whether you are seeking a civil marriage or registering a marriage that has already taken place. Start by understanding which route may apply to you." image={photos.ceremony}/>
    <section className="section-pad"><div className="container"><div className="section-heading"><div><SectionEyebrow>HOW IT WORKS</SectionEyebrow><h2>From first question<br/>to <em>next steps.</em></h2></div><p>We help you understand the process and prepare for conversations with the relevant authority. Exact steps and timelines vary by law and location.</p></div><div className="process-detail-list">{steps.map(([n,t,d])=><div className="process-detail" key={n}><span className="step-no">{n}</span><div><h3>{t}</h3><p>{d}</p></div><ArrowDownRight/></div>)}</div></div></section>
    <section className="section-pad section-tint"><div className="container"><div className="center-heading"><SectionEyebrow>UNDERSTAND YOUR ROUTE</SectionEyebrow><h2>Different routes. <em>Different requirements.</em></h2><p>These are broad categories, not a substitute for checking the law and local procedure that apply to your case.</p></div><div className="route-grid">{[
      ['Court marriage','A civil marriage solemnized before a Marriage Officer under the Special Marriage Act, 1954, subject to eligibility and statutory requirements.'],
      ['Marriage registration','Registration of a marriage already solemnized under an applicable personal or other law. The relevant state process matters.'],
      ['Hindu marriage','Hindu Marriage Act, 1955 may apply to Hindu, Buddhist, Jain and Sikh marriages, subject to its provisions.'],
      ['Muslim marriage (Nikah)','Applicable personal law and state registration requirements may be relevant. Confirm the specific procedure locally.'],
      ['Christian marriage','The Indian Christian Marriage Act, 1872 and relevant procedures may apply, depending on the circumstances.'],
      ['Interfaith marriage','The Special Marriage Act may provide a civil route for eligible couples, with applicable notice and other requirements.'],
      ['Arya Samaj marriage','A ceremony according to Arya Samaj rites may be relevant for eligible couples; legal validity and registration requirements must be checked.'],
      ['Customary / traditional marriage','A customary or religious ceremony and subsequent registration may involve different legal requirements depending on the applicable law.'],
    ].map(([t,d],i)=><article className="route-card" key={t}><span className="route-index">0{i+1}</span><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>
    <section className="section-pad"><div className="container docs-grid"><div><SectionEyebrow>BEFORE YOU BEGIN</SectionEyebrow><h2>Get your documents<br/><em>in order.</em></h2><p>Requirements differ by route and jurisdiction. A typical checklist may include some of the following; it is not exhaustive and should be confirmed with the relevant authority.</p><ul className="check-list"><li><Check/> Proof of age and identity</li><li><Check/> Address / residence proof</li><li><Check/> Passport-size photographs</li><li><Check/> Affidavits or declarations, if required</li><li><Check/> Witness details and documents, if required</li><li><Check/> Evidence of previous marital status, where applicable</li></ul><p className="small-note">Do not send Aadhaar numbers, identity documents or other sensitive records through the general website enquiry form.</p></div><div className="docs-image"><img src={photos.rings} alt="Wedding rings on a detail arrangement"/><div className="docs-note"><FileText/><div><strong>Prepare with confidence</strong><span>Confirm the current checklist for your specific route and location.</span></div></div></div></div></section>
    <section className="faq-section section-pad section-tint"><div className="container faq-grid"><div><SectionEyebrow>COMMON QUESTIONS</SectionEyebrow><h2>Know before<br/><em>you begin.</em></h2></div><div className="faq-list">{faqs.map(([q,a])=><details key={q} className="faq-item"><summary>{q}<ChevronDown size={18}/></summary><p>{a}</p></details>)}</div></div></section><Callout/>
  </>
}

function Gallery() {
  const items = [
    {src: photos.ceremony, label: 'A beautiful beginning', cls: 'gallery-item tall'},
    {src: photos.rings, label: 'Little details, lasting meaning', cls: 'gallery-item'},
    {src: photos.couple, label: 'Together, into the next chapter', cls: 'gallery-item wide'},
    {src: photos.flowers, label: 'A touch of celebration', cls: 'gallery-item'},
    {src: photos.hands, label: 'Side by side', cls: 'gallery-item tall'},
    {src: photos.portrait, label: 'A moment to remember', cls: 'gallery-item'},
  ]
  const [selected, setSelected] = useState<number | null>(null)
  return <>
    <PageIntro eyebrow="THE GALLERY" title={<>Moments that matter.<br/><em>Memories that stay.</em></>} text="A visual collection celebrating connection, commitment and new beginnings. Replace these sample images with approved photographs and videos from your own work before publishing." image={photos.flowers}/>
    <section className="section-pad"><div className="container"><div className="gallery-intro"><div><SectionEyebrow>CELEBRATING NEW BEGINNINGS</SectionEyebrow><h2>Every story is <em>its own.</em></h2></div><p>Use this space for real moments, behind-the-scenes videos and client-approved stories. Always confirm permission before publishing identifiable media.</p></div><div className="gallery-grid">{items.map((item,i)=><button className={item.cls} key={item.label} onClick={()=>setSelected(i)}><img src={item.src} alt={item.label}/><span className="gallery-overlay"><span>{item.label}</span><span className="gallery-open"><ArrowUpRight size={18}/></span></span></button>)}</div><div className="gallery-video-placeholder"><div className="video-symbol"><Play size={25} fill="currentColor"/></div><div><SectionEyebrow>VIDEO STORIES</SectionEyebrow><h3>Bring your gallery to life.</h3><p>Add your own client-approved video stories here. For a production site, use an accessible video player with captions where possible.</p></div><Camera size={34} className="video-decoration"/></div></div></section>
    {selected !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image" onClick={()=>setSelected(null)}><button className="lightbox-close" onClick={()=>setSelected(null)} aria-label="Close image"><X/></button><img src={items[selected].src} alt={items[selected].label} onClick={e=>e.stopPropagation()}/><p>{items[selected].label}</p></div>}
  </>
}

function Testimonials() {
  return <>
    <PageIntro eyebrow="KIND WORDS" title={<>A little reassurance<br/><em>goes a long way.</em></>} text="A place for genuine feedback from people who have used the service. Only publish verified testimonials with permission from the people featured." image={photos.portrait}/>
    <section className="section-pad"><div className="container"><div className="center-heading"><SectionEyebrow>CLIENT EXPERIENCES</SectionEyebrow><h2>Real experiences. <em>Real voices.</em></h2><p>We value thoughtful communication and clear expectations. Add approved client feedback below before launch.</p></div><div className="testimonial-empty"><Quote size={35}/><h3>Your clients’ words belong here.</h3><p>Replace this sample area with genuine, permissioned testimonials. Do not publish invented reviews, names, ratings or success statistics.</p><a className="button button-outline" href={whatsappUrl} target="_blank" rel="noreferrer">Ask about our process <ArrowRight size={16}/></a></div><div className="testimonial-values"><div><ShieldCheck/><h3>Honest expectations</h3><p>Clear explanations about steps, limitations and what authorities decide.</p></div><div><HeartHandshake/><h3>Respectful support</h3><p>A considerate approach to personal circumstances and questions.</p></div><div><MessageCircle/><h3>Open communication</h3><p>Convenient ways to ask questions and understand what comes next.</p></div></div></div></section><Callout/>
  </>
}

const blogPosts = [
  {category:'COURT MARRIAGE', title:'Court marriage in India: understanding the basics', date:'Guide', read:'6 min read', image:photos.ceremony, text:'Learn the broad difference between a civil marriage under the Special Marriage Act and registration of a marriage already solemnized.'},
  {category:'DOCUMENTATION', title:'Preparing for a marriage registration appointment', date:'Checklist', read:'5 min read', image:photos.rings, text:'A practical starting point for organising your paperwork—while remembering that the official checklist varies by location and legal route.'},
  {category:'INTERFAITH MARRIAGE', title:'Questions to ask before choosing a legal route', date:'Explainer', read:'7 min read', image:photos.hands, text:'Understand eligibility, statutory requirements, notice procedures and why it is important to confirm details with the relevant authority.'},
]
function Blogs() {
  const [active, setActive] = useState('All articles')
  const categories = ['All articles','Court marriage','Documentation','Interfaith marriage']
  const shown = active === 'All articles' ? blogPosts : blogPosts.filter(p=>p.category.toLowerCase()===active.toLowerCase())
  return <>
    <PageIntro eyebrow="THE JOURNAL" title={<>A little more clarity<br/><em>for the journey.</em></>} text="Helpful explainers and practical starting points for understanding court marriage and registration procedures. Always confirm current requirements with the relevant authority." image={photos.rings}/>
    <section className="section-pad"><div className="container"><div className="blog-top"><div><SectionEyebrow>NOTES & GUIDES</SectionEyebrow><h2>Useful things to <em>know.</em></h2></div><div className="blog-filter">{categories.map(c=><button className={active===c?'active':''} onClick={()=>setActive(c)} key={c}>{c}</button>)}</div></div><div className="blog-grid">{shown.map((p,i)=><article className="blog-card" key={p.title}><Link to={`/blogs/${i+1}`} className="blog-image"><img src={p.image} alt="Article illustration"/><span><ArrowUpRight size={18}/></span></Link><div className="blog-meta"><span>{p.category}</span><span>{p.read}</span></div><h3><Link to={`/blogs/${i+1}`}>{p.title}</Link></h3><p>{p.text}</p><Link className="text-link" to={`/blogs/${i+1}`}>Read the guide <ArrowRight size={15}/></Link></article>)}</div><div className="editorial-note"><BookOpen/><p><strong>Editorial note:</strong> Articles are general information, not legal advice. Laws and procedures can change and may vary by jurisdiction. Review all articles with a qualified legal professional before publishing.</p></div></div></section>
  </>
}
function BlogDetail() {
  const { pathname } = useLocation()
  const index = Math.max(0, Math.min(blogPosts.length-1, Number(pathname.split('/').pop())-1 || 0))
  const post = blogPosts[index]
  return <><PageIntro eyebrow={post.category} title={<>{post.title.split(':')[0]}<br/><em>{post.title.split(':')[1] || 'A practical guide'}</em></>} text={post.text} image={post.image}/><section className="section-pad"><article className="container article-content"><p className="lead">This article is a general starting point to help you ask better questions and prepare for the next step.</p><h2>Start with the right route</h2><p>Before collecting documents or booking an appointment, identify whether you are seeking a civil marriage or registration of a marriage that has already been solemnized. Different laws and procedures may apply depending on the facts of your situation.</p><h2>Confirm local requirements</h2><p>Eligibility, forms, supporting documents, notice requirements, fees and appointment systems can vary by jurisdiction. Check the current instructions published by the relevant Marriage Officer or government authority, and seek qualified legal advice where needed.</p><h2>Prepare thoughtfully</h2><p>Make a checklist based on official requirements, keep your documents secure and ask questions before submitting sensitive information. Do not rely on generic online lists as a definitive checklist for every case.</p><div className="article-disclaimer"><CircleHelp/><p>This content is general information only and is not legal advice. Court Marriage Seva is not a government portal. Final decisions and certificates are issued by the relevant authorities.</p></div><Link to="/contact" className="button button-primary">Ask about your situation <ArrowRight size={16}/></Link></article></section></>
}

function Contact() {
  return <>
    <PageIntro eyebrow="CONTACT US" title={<>Your questions matter.<br/><em>Let’s talk.</em></>} text="Tell us what you need help understanding. We’ll help you identify practical next steps and the questions to confirm for your location." image={photos.couple}/>
    <section className="section-pad"><div className="container contact-layout"><div className="contact-info"><SectionEyebrow>GET IN TOUCH</SectionEyebrow><h2>We’re here to<br/><em>make things clearer.</em></h2><p>Choose the way that feels easiest. For urgent or detailed questions, a direct conversation may be the best place to start.</p><div className="contact-methods"><a href={`tel:${phone.replace(/\s/g, '')}`}><span><Phone/></span><div><small>CALL OUR TEAM</small><strong>{phone}</strong><em>Speak with our team</em></div><ArrowUpRight/></a><a href={whatsappUrl} target="_blank" rel="noreferrer"><span><MessageCircle/></span><div><small>WHATSAPP</small><strong>Send us a message</strong><em>Start a conversation</em></div><ArrowUpRight/></a><a href="mailto:info@courtmarriageseva.com"><span><Mail/></span><div><small>EMAIL</small><strong>info@courtmarriageseva.com</strong><em>Share your question</em></div><ArrowUpRight/></a><div className="contact-method-static"><span><MapPin/></span><div><small>SERVICE COVERAGE</small><strong>Pan-India assistance</strong><em>Procedures depend on the relevant jurisdiction</em></div></div></div><div className="contact-hours"><Clock3/><span><strong>Response hours</strong><small>Add your verified business hours here before launch.</small></span></div></div><EnquiryForm/></div></section>
    <section className="section-pad section-tint"><div className="container contact-bottom"><div><SectionEyebrow>BEFORE YOU SEND</SectionEyebrow><h2>A few details help us<br/><em>guide you better.</em></h2></div><p>Please share only the information needed for an initial enquiry. Do not include Aadhaar numbers, identity-document images, private legal records or other sensitive personal details in this form.</p></div></section>
  </>
}

function Callout() {
  return <section className="callout"><div className="container callout-inner"><div><span className="callout-kicker">YOUR NEXT STEP STARTS HERE</span><h2>Clarity for the journey.<br/><em>Care for the moment.</em></h2></div><a className="button button-gold" href={whatsappUrl} target="_blank" rel="noreferrer">Talk to our team <ArrowUpRight size={17}/></a></div></section>
}

function LegalPage({ type }: {type: 'privacy'|'terms'}) {
  return <><PageIntro eyebrow={type==='privacy'?'PRIVACY NOTICE':'TERMS & DISCLAIMER'} title={type==='privacy'?<>Your privacy<br/><em>matters to us.</em></>:<>Clear expectations.<br/><em>Responsible guidance.</em></>} text="This starter page must be reviewed and completed with the business’s actual policies and legal advice before the website goes live."/><section className="section-pad"><div className="container article-content"><h2>{type==='privacy'?'Information and use':'Important disclaimer'}</h2><p>{type==='privacy'?'The website may collect contact details and enquiry information that you choose to submit. Use those details to respond to your request, operate the service and maintain appropriate records. Add the actual data controller details, retention periods, service providers, security measures and rights process before launch.':'Court Marriage Seva provides information and legal assistance guidance; it is not an official government website or Marriage Officer. Information on this site is general and is not a substitute for advice from a qualified professional who has reviewed your circumstances.'}</p><h2>Before launch</h2><p>Replace this template with a reviewed policy that accurately describes the business, contact details, data practices, applicable law, complaint contact and any integrations used on the live website.</p><p>For privacy questions, contact <a href="mailto:info@courtmarriageseva.com">info@courtmarriageseva.com</a>.</p></div></section></>
}

export default function App() {
  return <><ScrollToTop/><Header/><main><Routes>
    <Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/process" element={<Process/>}/><Route path="/gallery" element={<Gallery/>}/><Route path="/testimonials" element={<Testimonials/>}/><Route path="/blogs" element={<Blogs/>}/><Route path="/blogs/:id" element={<BlogDetail/>}/><Route path="/contact" element={<Contact/>}/><Route path="/privacy" element={<LegalPage type="privacy"/>}/><Route path="/terms" element={<LegalPage type="terms"/>}/><Route path="*" element={<div className="not-found container"><span>404</span><h1>This page wandered off.</h1><Link className="button button-primary" to="/">Return home <ArrowRight size={16}/></Link></div>}/>
  </Routes></main><Footer/><FloatingContact/></>
}
