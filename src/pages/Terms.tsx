import React from 'react';

const Terms = () => {
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
          <h1 className="text-4xl font-bold text-black mb-8">Terms of Service</h1>
          <p className="text-black/70 mb-8">Last Updated: 03/09/2025</p>

          <div className="space-y-8 text-black/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service govern your use of our platform and all related services, features, content, and applications.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">2. Use License</h2>
              <p>Permission is granted to temporarily use this service for personal, non-commercial transitory viewing only. This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">3. User Responsibilities</h2>
              <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">4. Prohibited Uses</h2>
              <p>You may not use our service for any illegal or unauthorized purpose. You must not, in the use of the service, violate any laws in your jurisdiction or any applicable international laws.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">5. Service Availability</h2>
              <p>We strive to maintain high availability of our services, but we do not guarantee uninterrupted access. The service may be temporarily unavailable for maintenance, updates, or unforeseen circumstances.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">6. Limitation of Liability</h2>
              <p>In no event shall our company or its suppliers be liable for any damages arising out of the use or inability to use the materials on our service, even if we or our authorized representative has been notified of the possibility of such damage.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">7. Modifications</h2>
              <p>We may revise these terms of service at any time without notice. By using this service, you agree to be bound by the current version of these Terms of Service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">8. Contact Information</h2>
              <p>If you have any questions about these Terms of Service, please contact us through the appropriate channels provided in our application.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;