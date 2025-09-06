import React from 'react';

const Disclosure = () => {
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
          <h1 className="text-4xl font-bold text-black mb-8">AI Disclosure</h1>
          <p className="text-black/70 mb-8">Last Updated: 03/09/2025</p>

          <div className="bg-yellow-50 border border-yellow-200 p-6 mb-8 rounded-lg">
            <h2 className="text-xl font-semibold text-yellow-800 mb-3">Important Notice About AI-Generated Content</h2>
            <p className="text-black/80">OneBag utilizes artificial intelligence to provide business coaching, advice, and recommendations. By using this service, you acknowledge and agree to the following important disclaimers and limitations.</p>
          </div>

          <div className="space-y-8 text-black/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">1. No Professional Advice</h2>
              <p className="mb-4">The AI-generated content provided through OneBag is for informational and educational purposes only. It does not constitute professional business advice, legal advice, financial advice, tax advice, or any other form of professional consultation.</p>
              <p>You should not rely solely on AI-generated recommendations for making important business decisions. Always consult with qualified professionals in relevant fields before taking significant actions based on information provided by this platform.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">2. AI Limitations and Potential Errors</h2>
              <p className="mb-4">Artificial intelligence systems, including those used by OneBag, have inherent limitations:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>AI may generate inaccurate, incomplete, or outdated information</li>
                <li>AI may "hallucinate" or create plausible-sounding but false information</li>
                <li>AI responses are based on training data that may contain biases or errors</li>
                <li>AI cannot replace human judgment, experience, or expertise</li>
                <li>AI may not fully understand context or nuanced situations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">3. User Responsibility</h2>
              <p className="mb-4">As a user of OneBag, you are responsible for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Independently verifying any information or recommendations provided</li>
                <li>Using critical thinking when evaluating AI-generated content</li>
                <li>Seeking professional advice when appropriate</li>
                <li>Making your own informed decisions based on your unique circumstances</li>
                <li>Not sharing sensitive business information that could compromise your competitive advantage</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">4. Limitation of Liability</h2>
              <p className="mb-4">OneBag, its owners, operators, and affiliates shall not be liable for any damages, losses, or consequences arising from:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Reliance on AI-generated content or recommendations</li>
                <li>Business decisions made based on information provided by the platform</li>
                <li>Inaccurate, incomplete, or misleading AI-generated content</li>
                <li>Technical errors, system failures, or service interruptions</li>
                <li>Any direct, indirect, incidental, or consequential damages</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">5. Use at Your Own Risk</h2>
              <p>By using OneBag, you acknowledge that you are using the service at your own risk. You understand that AI-generated content is not a substitute for professional expertise and that you are solely responsible for any actions you take based on the information provided.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">6. No Guarantee of Results</h2>
              <p>OneBag makes no guarantees about the effectiveness, accuracy, or results of implementing any strategies, recommendations, or advice provided by the AI system. Business success depends on numerous factors beyond the scope of AI assistance.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">7. Updates to AI Systems</h2>
              <p>OneBag may update, modify, or change its AI systems at any time without notice. These changes may affect the nature, quality, or availability of AI-generated content.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">8. Contact Information</h2>
              <p>If you have questions about this AI Disclosure or need clarification about the limitations of our AI systems, please contact us through the appropriate support channels provided within the platform.</p>
            </section>

            <div className="bg-blue-50 border border-blue-200 p-6 mt-8 rounded-lg">
              <p className="text-blue-800 font-semibold text-center">
                Remember: AI is a tool to assist your thinking, not replace it. Always apply critical judgment and seek professional advice when making important business decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclosure;