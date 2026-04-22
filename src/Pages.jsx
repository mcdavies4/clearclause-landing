// ── Shared page layout wrapper ────────────────────────────────
export function PageLayout({ title, eyebrow, children }) {
  return (
    <div style={{
      maxWidth: 760, margin: "0 auto", padding: "64px 48px 80px",
      animation: "fadeUp 0.35s ease both"
    }}>
      <p style={{
        fontFamily: "DM Mono, monospace", fontSize: 11, letterSpacing: 3,
        textTransform: "uppercase", color: "var(--amber)", marginBottom: 12
      }}>{eyebrow}</p>
      <h1 style={{
        fontFamily: "Playfair Display, serif", fontSize: "clamp(30px, 4vw, 44px)",
        fontWeight: 900, color: "var(--cream)", marginBottom: 32, lineHeight: 1.15
      }}>{title}</h1>
      {children}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <h2 style={{
        fontFamily: "Playfair Display, serif", fontSize: 20,
        color: "var(--cream)", marginBottom: 12
      }}>{title}</h2>
      <div style={{ fontSize: 15, color: "var(--text-dim)", lineHeight: 1.8 }}>
        {children}
      </div>
    </div>
  );
}

function P({ children }) {
  return <p style={{ marginBottom: 12 }}>{children}</p>;
}

function Ul({ items }) {
  return (
    <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
      {items.map((item, i) => (
        <li key={i} style={{ marginBottom: 6 }}>{item}</li>
      ))}
    </ul>
  );
}

function Divider() {
  return <div style={{ borderTop: "1px solid var(--border)", margin: "40px 0" }} />;
}

function LastUpdated({ date }) {
  return (
    <p style={{
      fontFamily: "DM Mono, monospace", fontSize: 11, color: "var(--text-dim)",
      letterSpacing: 1, marginBottom: 40
    }}>Last updated: {date}</p>
  );
}

// ── PRIVACY PAGE ─────────────────────────────────────────────
export function PrivacyPage() {
  return (
    <PageLayout eyebrow="Legal" title="Privacy Policy">
      <LastUpdated date="April 2025" />

      <Section title="Who we are">
        <P>ClearClause is an AI-powered document analysis tool operated by The 36th Company Ltd, a company registered in England and Wales. Our service helps individuals understand legal and contractual documents in plain English.</P>
        <P>If you have any questions about this policy, contact us at: <a href="mailto:privacy@clearclause.co.uk" style={{ color: "var(--amber)" }}>privacy@clearclause.co.uk</a></P>
      </Section>

      <Divider />

      <Section title="What data we collect">
        <P>We collect the minimum data necessary to provide the service:</P>
        <Ul items={[
          "Email address — to create and manage your account",
          "Password — stored securely as a hashed value, never in plain text",
          "Usage data — how many analyses you've run in the current billing period",
          "Document metadata — document type and risk level from your analyses (stored for your history)",
          "Payment information — handled entirely by Stripe. We never see or store your card details.",
        ]} />
        <P><strong style={{ color: "var(--cream)" }}>We do not store the content of documents you upload.</strong> Your PDF or text is sent to our analysis service and immediately discarded after the result is returned. We do not use your documents to train AI models.</P>
      </Section>

      <Divider />

      <Section title="How we use your data">
        <Ul items={[
          "To provide and improve the ClearClause service",
          "To manage your account and subscription",
          "To enforce usage limits on the free plan",
          "To send essential service emails (account confirmation, password reset)",
          "To process payments and manage subscriptions via Stripe",
        ]} />
        <P>We do not sell your data. We do not use your data for advertising. We do not share your data with third parties except as described in this policy.</P>
      </Section>

      <Divider />

      <Section title="Third-party services">
        <P>We use the following trusted third parties to operate the service:</P>
        <Ul items={[
          "Supabase — authentication and database hosting (EU region)",
          "Stripe — payment processing (PCI-DSS compliant)",
          "Anthropic — AI analysis of your documents (data processed transiently, not stored)",
          "Vercel — frontend hosting",
          "Railway — backend API hosting",
        ]} />
        <P>Each of these providers has their own privacy policy and security practices. We select providers that meet appropriate data protection standards.</P>
      </Section>

      <Divider />

      <Section title="Your rights under UK GDPR">
        <P>As a UK resident, you have the following rights regarding your personal data:</P>
        <Ul items={[
          "Right to access — request a copy of the data we hold about you",
          "Right to rectification — correct inaccurate data",
          "Right to erasure — request deletion of your account and data",
          "Right to restrict processing — limit how we use your data",
          "Right to data portability — receive your data in a machine-readable format",
          "Right to object — object to processing based on legitimate interests",
        ]} />
        <P>To exercise any of these rights, email us at <a href="mailto:privacy@clearclause.co.uk" style={{ color: "var(--amber)" }}>privacy@clearclause.co.uk</a>. We will respond within 30 days.</P>
      </Section>

      <Divider />

      <Section title="Cookies">
        <P>ClearClause uses only essential cookies required to keep you signed in. We do not use tracking cookies, advertising cookies, or analytics cookies.</P>
      </Section>

      <Divider />

      <Section title="Data retention">
        <P>We retain your account data for as long as your account is active. If you delete your account, your personal data is permanently deleted within 30 days. Analysis history metadata is deleted at the same time.</P>
      </Section>

      <Divider />

      <Section title="Changes to this policy">
        <P>We may update this policy from time to time. We will notify you of significant changes by email. Continued use of the service after changes constitutes acceptance of the updated policy.</P>
      </Section>
    </PageLayout>
  );
}

// ── TERMS PAGE ───────────────────────────────────────────────
export function TermsPage() {
  return (
    <PageLayout eyebrow="Legal" title="Terms of Service">
      <LastUpdated date="April 2025" />

      <Section title="Agreement to terms">
        <P>By accessing or using ClearClause, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use the service.</P>
        <P>ClearClause is operated by The 36th Company Ltd, registered in England and Wales.</P>
      </Section>

      <Divider />

      <Section title="Description of service">
        <P>ClearClause is an AI-powered tool that analyses legal and contractual documents and provides plain English summaries, clause explanations, and risk assessments.</P>
        <P><strong style={{ color: "var(--amber)" }}>Important: ClearClause is not a law firm and does not provide legal advice.</strong> Our outputs are for informational purposes only. For legal advice on specific matters, you should consult a qualified solicitor.</P>
      </Section>

      <Divider />

      <Section title="Accounts and eligibility">
        <Ul items={[
          "You must be at least 18 years old to create an account",
          "You must provide accurate and complete information when registering",
          "You are responsible for maintaining the security of your account credentials",
          "You may not share your account with others or create multiple accounts to circumvent usage limits",
          "We reserve the right to suspend or terminate accounts that violate these terms",
        ]} />
      </Section>

      <Divider />

      <Section title="Free and paid plans">
        <P>The free plan includes 3 document analyses per calendar month. This resets on the same date each month.</P>
        <P>Pro and Business plans are billed in advance on a monthly or annual basis. By upgrading, you authorise us to charge your payment method on a recurring basis until you cancel.</P>
        <P>You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period — you will not receive a refund for the remaining period unless you request one within 7 days of your most recent charge.</P>
      </Section>

      <Divider />

      <Section title="Acceptable use">
        <P>You agree not to use ClearClause to:</P>
        <Ul items={[
          "Upload documents containing illegal content",
          "Attempt to reverse-engineer or scrape the service",
          "Use the service in a way that could harm or defraud others",
          "Circumvent usage limits or access controls",
          "Resell or sublicense access to the service without our written consent",
        ]} />
      </Section>

      <Divider />

      <Section title="Intellectual property">
        <P>The ClearClause platform, brand, and all associated software are the intellectual property of The 36th Company Ltd. You may not copy, modify, or distribute any part of the service without written permission.</P>
        <P>Documents you upload remain your property. By uploading, you grant us a limited, transient licence to process your document solely for the purpose of providing the analysis service. This licence ends as soon as the analysis is complete.</P>
      </Section>

      <Divider />

      <Section title="Disclaimer of warranties">
        <P>ClearClause is provided "as is" without warranties of any kind. We do not guarantee that the service will be error-free, uninterrupted, or that analysis results will be accurate in all cases. AI systems can make mistakes — always verify important legal matters with a qualified professional.</P>
      </Section>

      <Divider />

      <Section title="Limitation of liability">
        <P>To the fullest extent permitted by law, The 36th Company Ltd shall not be liable for any indirect, incidental, or consequential damages arising from your use of ClearClause. Our total liability to you in any circumstances shall not exceed the amount you paid us in the 12 months preceding the claim.</P>
      </Section>

      <Divider />

      <Section title="Governing law">
        <P>These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the English courts.</P>
      </Section>

      <Divider />

      <Section title="Contact">
        <P>Questions about these terms? Email us at <a href="mailto:legal@clearclause.co.uk" style={{ color: "var(--amber)" }}>legal@clearclause.co.uk</a></P>
      </Section>
    </PageLayout>
  );
}

// ── CONTACT PAGE ─────────────────────────────────────────────
export function ContactPage({ onSignup }) {
  return (
    <PageLayout eyebrow="Get in touch" title="Contact Us">
      <p style={{ fontSize: 17, color: "var(--text-dim)", lineHeight: 1.75, marginBottom: 48, maxWidth: 520 }}>
        We're a small team and we read every message. Whether it's a question about your account, a bug report, or a business enquiry — we'll get back to you.
      </p>

      {/* Contact cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 56 }}>
        {[
          { icon: "💬", label: "General enquiries", email: "hello@clearclause.co.uk", desc: "Questions about the product, feedback, or anything else." },
          { icon: "🔒", label: "Privacy & data", email: "privacy@clearclause.co.uk", desc: "Data requests, GDPR queries, account deletion." },
          { icon: "🏢", label: "Business & partnerships", email: "business@clearclause.co.uk", desc: "White-label, API access, team plans, integrations." },
          { icon: "⚖️", label: "Legal", email: "legal@clearclause.co.uk", desc: "Terms of service, IP, compliance matters." },
        ].map(({ icon, label, email, desc }) => (
          <div key={email} style={{
            background: "var(--navy-mid)", border: "1px solid var(--border)",
            borderRadius: 10, padding: "24px 22px",
            transition: "border-color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(232,162,48,0.3)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
          >
            <div style={{ fontSize: 24, marginBottom: 12 }}>{icon}</div>
            <div style={{ fontFamily: "Playfair Display, serif", fontSize: 16, color: "var(--cream)", marginBottom: 8 }}>{label}</div>
            <div style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.6, marginBottom: 14 }}>{desc}</div>
            <a href={`mailto:${email}`} style={{
              fontFamily: "DM Mono, monospace", fontSize: 12, color: "var(--amber)",
              textDecoration: "none", letterSpacing: 0.5,
            }}>{email}</a>
          </div>
        ))}
      </div>

      {/* Response time */}
      <div style={{
        background: "var(--navy-mid)", border: "1px solid var(--border)",
        borderRadius: 8, padding: "20px 24px", marginBottom: 48,
        display: "flex", alignItems: "center", gap: 16
      }}>
        <div style={{ fontSize: 20 }}>⏱</div>
        <div>
          <div style={{ fontSize: 14, color: "var(--cream)", fontWeight: 500, marginBottom: 4 }}>Typical response time</div>
          <div style={{ fontSize: 13, color: "var(--text-dim)" }}>We aim to respond to all enquiries within <strong style={{ color: "var(--amber)" }}>1 business day</strong>. Business enquiries may take up to 2 days.</div>
        </div>
      </div>

      {/* FAQ shortcut */}
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: 36 }}>
        <div style={{ fontFamily: "Playfair Display, serif", fontSize: 20, color: "var(--cream)", marginBottom: 12 }}>
          Looking for quick answers?
        </div>
        <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.7, marginBottom: 20 }}>
          Many common questions about pricing, how the service works, and your data are answered on our pricing page FAQ.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="mailto:hello@clearclause.co.uk" style={{
            background: "var(--amber)", color: "var(--navy)", border: "none",
            borderRadius: 6, padding: "12px 24px", fontFamily: "DM Sans, sans-serif",
            fontSize: 14, fontWeight: 500, textDecoration: "none", cursor: "pointer",
            transition: "background 0.2s", display: "inline-block"
          }}>Email us →</a>
        </div>
      </div>

      {/* Address block */}
      <div style={{ marginTop: 56, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
        <div style={{ fontFamily: "DM Mono, monospace", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 12 }}>Registered company</div>
        <div style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.9 }}>
          The 36th Company Ltd<br />
          Registered in England and Wales<br />
          <a href="mailto:hello@clearclause.co.uk" style={{ color: "var(--amber)" }}>hello@clearclause.co.uk</a>
        </div>
      </div>
    </PageLayout>
  );
}
