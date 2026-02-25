import './home.css';

export default function LandingPage() {
  return (
    <div className="landing-page">

      {/* ── NAV ── */}
      <nav className="nav">
        <a href="/" className="nav-logo">
          <img src="/logo.png" alt="Get ElevateED" className="nav-logo-img" />
          <span className="nav-logo-text">Get <span>ElevateED</span></span>
        </a>
        <ul className="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
        </ul>
        <div className="nav-actions">
          <a href="/login" className="nav-login">Log In</a>
          <a href="#contact" className="nav-cta">Book Free Consult</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg-glow" />
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          SAT/ACT Prep &amp; On-Demand Tutoring
        </div>
        <h1 className="hero-headline">
          Unlock Your Child&apos;s{' '}
          <span className="hero-headline-accent">Academic Potential</span>
        </h1>
        <p className="hero-sub">
          Personalized tutoring from background-checked experts. Measurable results,
          unwavering support — whether your student needs to catch up, keep up, or get ahead.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn-primary">
            Book Free Consultation →
          </a>
          <a href="#services" className="btn-secondary">
            Explore Services
          </a>
        </div>

        <div className="stats-strip">
          <div className="stat-item">
            <div className="stat-number">200+</div>
            <div className="stat-desc">Students Helped</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">150+</div>
            <div className="stat-desc">Avg. SAT Score Increase</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-desc">Family Satisfaction Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-desc">Background-Checked Tutors</div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="services-section">
        <div className="services-inner">
          <div className="services-header">
            <span className="section-label">What We Offer</span>
            <h2 className="section-title">Comprehensive Support for Every Student</h2>
            <p className="section-body" style={{ margin: '0 auto' }}>
              From standardized test prep to subject-specific tutoring, we meet students
              exactly where they are and build them up to where they need to be.
            </p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">📈</div>
              <div className="service-name">SAT / ACT Prep</div>
              <p className="service-desc">
                Strategic, score-focused preparation built around your student&apos;s baseline.
                We target weak areas with precision and build test-taking confidence.
              </p>
              <ul className="service-features">
                <li>Diagnostic assessment to identify gaps</li>
                <li>Full-length timed practice tests</li>
                <li>Math, Reading, Writing &amp; Science modules</li>
                <li>Score tracking and improvement reports</li>
                <li>Flexible scheduling around school &amp; sports</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">📚</div>
              <div className="service-name">On-Demand Tutoring</div>
              <p className="service-desc">
                One-on-one tutoring tailored to each student&apos;s current coursework,
                delivered by experienced tutors who specialize in their subject.
              </p>
              <ul className="service-features">
                <li>Math, English, Science, Social Studies &amp; more</li>
                <li>In-person and virtual sessions available</li>
                <li>Homework help and assignment review</li>
                <li>Grade tracking from session to session</li>
                <li>Real-time progress updates for parents</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="how-section">
        <div className="how-inner">
          <div className="how-header">
            <span className="section-label">The Process</span>
            <h2 className="section-title">Simple. Structured. Effective.</h2>
            <p className="section-body" style={{ margin: '0 auto' }}>
              Getting started takes minutes. Seeing results takes dedication —
              and we&apos;ll be right there with you every step of the way.
            </p>
          </div>
          <div className="steps-grid">
            <div className="steps-connector" />
            <div className="step-card">
              <div className="step-number">01</div>
              <div className="step-title">Book a Free Consultation</div>
              <p className="step-desc">
                Tell us about your student — their grade, subjects, goals, and schedule.
                We listen, assess, and build a plan.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">02</div>
              <div className="step-title">Get Matched with a Tutor</div>
              <p className="step-desc">
                We pair your student with a background-checked tutor who specializes
                in the right subjects and fits their learning style.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">03</div>
              <div className="step-title">Track Progress in Real Time</div>
              <p className="step-desc">
                Sessions are logged, grades are tracked, and parents receive updates
                after every session. No more guessing if it&apos;s working.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── ABOUT US ── */}
      <section id="about" className="about-section">
        <div className="about-inner">
          <div className="about-logo-wrap">
            <img src="/logo.png" alt="Get ElevateED LLC" className="about-logo" />
          </div>
          <div className="about-content">
            <span className="section-label">Our Mission</span>
            <h2 className="section-title">About Get ElevateED</h2>
            <p className="section-body">
              Dedicated to helping families navigate the path to college success, Get ElevateED
              offers comprehensive SAT/ACT prep and on-demand tutoring tailored to each student&apos;s
              needs. Our experienced, background-checked tutors deliver personalized instruction,
              measurable results, and unwavering support — whether your child needs to catch up,
              keep up, or get ahead. With a focus on building confidence and achieving top scores,
              we&apos;re here to guide your student every step of the way.
            </p>
            <div className="about-highlights">
              <div className="about-highlight">
                <span className="about-highlight-icon">🛡️</span>
                <div className="about-highlight-text">
                  <strong>Background-Checked Tutors</strong>
                  Every tutor is vetted, experienced, and held to the highest standards.
                </div>
              </div>
              <div className="about-highlight">
                <span className="about-highlight-icon">🎯</span>
                <div className="about-highlight-text">
                  <strong>Personalized Instruction</strong>
                  Every student gets a plan built around their unique needs and goals.
                </div>
              </div>
              <div className="about-highlight">
                <span className="about-highlight-icon">📊</span>
                <div className="about-highlight-text">
                  <strong>Measurable Results</strong>
                  Track grade improvements and score gains session by session.
                </div>
              </div>
              <div className="about-highlight">
                <span className="about-highlight-icon">🤝</span>
                <div className="about-highlight-text">
                  <strong>Unwavering Support</strong>
                  We&apos;re a partner to your family — not just a tutoring service.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="why-section">
        <div className="why-inner">
          <div className="why-header">
            <span className="section-label">Why Families Choose Us</span>
            <h2 className="section-title">Built Different, By Design</h2>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <span className="why-icon">✅</span>
              <div className="why-title">Fully Vetted Tutors</div>
              <p className="why-desc">Background checks, subject interviews, and ongoing quality reviews before anyone works with your student.</p>
            </div>
            <div className="why-card">
              <span className="why-icon">🧠</span>
              <div className="why-title">Personalized Plans</div>
              <p className="why-desc">No cookie-cutter curriculum. Every plan is built from a diagnostic assessment of where your student actually is.</p>
            </div>
            <div className="why-card">
              <span className="why-icon">📱</span>
              <div className="why-title">Parent Visibility</div>
              <p className="why-desc">Log in anytime to see session notes, grade trends, homework status, and upcoming sessions — all in one place.</p>
            </div>
            <div className="why-card">
              <span className="why-icon">⚡</span>
              <div className="why-title">Flexible Scheduling</div>
              <p className="why-desc">Evening and weekend sessions available. We work around school schedules, sports seasons, and family life.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="testimonials-section">
        <div className="testimonials-inner">
          <div className="testimonials-header">
            <span className="section-label">What Families Are Saying</span>
            <h2 className="section-title">Real Results, Real Stories</h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-quote">
                &ldquo;My son&apos;s SAT score jumped 180 points after just 8 weeks with his tutor.
                The progress tracking kept us informed every step of the way. Worth every penny.&rdquo;
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">TM</div>
                <div>
                  <div className="testimonial-name">Tanya M.</div>
                  <div className="testimonial-role">Parent of 11th Grader</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-quote">
                &ldquo;I went from a C+ to a B+ in math in one semester. My tutor actually
                explains things in a way that makes sense, and I feel way more
                confident going into tests now.&rdquo;
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">JR</div>
                <div>
                  <div className="testimonial-name">Jordan R.</div>
                  <div className="testimonial-role">Student, Grade 10</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-quote">
                &ldquo;The dashboard shows me exactly how my daughter is doing after every session.
                As a busy parent, having that visibility without having to chase updates is
                a game changer.&rdquo;
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">DL</div>
                <div>
                  <div className="testimonial-name">David L.</div>
                  <div className="testimonial-role">Parent of 9th &amp; 12th Graders</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section id="contact" className="cta-section">
        <div className="cta-inner">
          <span className="section-label">Get Started Today</span>
          <h2 className="cta-title">
            Ready to <span>Elevate</span> Your Student&apos;s Future?
          </h2>
          <p className="cta-sub">
            Book a free, no-obligation consultation. We&apos;ll assess your student&apos;s needs,
            answer your questions, and show you exactly how we can help.
          </p>
          <div className="cta-actions">
            <a href="/login" className="btn-primary btn-large">
              Book Free Consultation →
            </a>
            <a href="#services" className="btn-secondary btn-large">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="/logo.png" alt="Get ElevateED" className="footer-logo-img" />
                <span className="footer-logo-text">Get <span>ElevateED</span></span>
              </div>
              <p className="footer-tagline">
                Helping families navigate the path to college success through personalized
                SAT/ACT prep and on-demand tutoring.
              </p>
            </div>
            <div>
              <div className="footer-col-title">Services</div>
              <ul className="footer-links">
                <li><a href="#services">SAT / ACT Prep</a></li>
                <li><a href="#services">On-Demand Tutoring</a></li>
                <li><a href="#services">Math Tutoring</a></li>
                <li><a href="#services">English Tutoring</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                <li><a href="#about">About Us</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Platform</div>
              <ul className="footer-links">
                <li><a href="/login">Student Login</a></li>
                <li><a href="/login">Parent Login</a></li>
                <li><a href="/login">Tutor Login</a></li>
                <li><a href="#contact">Get Started</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">
              © 2025 <span>Get ElevateED LLC</span>. All rights reserved.
            </p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
