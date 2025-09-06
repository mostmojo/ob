import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <div className="glass-nav sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button 
            onClick={() => window.history.back()}
            className="text-black/70 hover:text-black transition-colors"
          >
            ← Back to App
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h1 className="text-4xl font-bold text-black mb-8">Privacy Policy</h1>
          <p className="text-black/70 mb-8">Last Updated: 03/09/2025</p>

          <div className="space-y-8 text-black/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">1. Information We Collect</h2>
              <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include your name, email address, and other information you choose to provide.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and communicate with you about products, services, and promotional offers.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">3. Information Sharing</h2>
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this privacy policy. We may share your information in certain limited circumstances, such as to comply with legal requirements.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">4. Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">5. Data Retention</h2>
              <p>We retain your personal information for as long as necessary to provide you with our services and as described in this privacy policy. We may also retain and use this information as necessary to comply with legal obligations and resolve disputes.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">6. Your Rights</h2>
              <p>Depending on your location, you may have certain rights regarding your personal information, such as the right to access, update, or delete the information we have about you. Please contact us if you wish to exercise these rights.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">7. Cookies and Tracking</h2>
              <p>We use cookies and similar tracking technologies to collect information about your browsing activities and to provide you with a personalized experience. You can control cookie settings through your browser preferences.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">8. Third-Party Services</h2>
              <p>Our service may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third-party services. We encourage you to review their privacy policies.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">9. Changes to This Policy</h2>
              <p>We may update this privacy policy from time to time. We will notify you of any material changes by posting the new privacy policy on this page and updating the "Last Updated" date.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">10. Contact Us</h2>
              <p>If you have any questions about this privacy policy, please contact us through the appropriate channels provided in our application.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;