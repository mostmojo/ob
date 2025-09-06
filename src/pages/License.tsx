import React from 'react';

const License = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h1 className="text-4xl font-bold text-black mb-4">License & Support</h1>
          <p className="text-black/70 mb-6">This product is licensed for personal use by the purchaser. Sharing access, GPT links, or training materials outside your authorized account is prohibited and may result in removal from future updates.</p>

          <h2 className="text-2xl font-semibold text-black mb-3">License Terms</h2>
          <ul className="list-disc list-inside text-black/80 mb-6">
            <li>License is granted to the original purchaser for personal and internal business use.</li>
            <li>Do not redistribute, resell, or share access to GPT links, videos, or documents.</li>
            <li>Modifying content for internal use is permitted; publishing or selling modified materials is not allowed without express permission.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-black mb-3">Support</h2>
          <p className="text-black/80 mb-4">For support or license inquiries, contact: <a href="mailto:jacob@modernmaker.co" className="text-blue-600">jacob@modernmaker.co</a></p>

          <div className="mt-6">
            <button onClick={() => window.history.back()} className="px-4 py-2 rounded-md bg-neutral-100 border">Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default License;