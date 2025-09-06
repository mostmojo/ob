import React from 'react';

interface Training {
  title: string;
  description: string;
  embedUrl: string;
  supportingDoc: string;
}

interface ClassroomModuleProps {
  training: Training;
  onBack: () => void;
}

const ClassroomModule: React.FC<ClassroomModuleProps> = ({ training, onBack }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-6"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 15L7.5 10L12.5 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to Classroom
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Section - Takes up 2 columns */}
        <div className="lg:col-span-2">
          {training.embedUrl ? (
            <div className="aspect-video bg-black rounded-2xl overflow-hidden mb-6">
              <iframe
                src={training.embedUrl}
                title={training.title}
                className="w-full h-full"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : null}

          <h1 className="text-3xl font-bold text-black mb-4">{training.title}</h1>
          <p className="text-lg text-black leading-relaxed">{training.description}</p>
        </div>

        {/* Support Document Section - Takes up 1 column */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-2xl p-6 sticky top-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Resources</h3>

            {training.supportingDoc !== '#' ? (
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Supporting Document</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Access the companion document with templates, worksheets, and additional resources.
                  </p>
                  <button
                    onClick={() => window.open(training.supportingDoc, '_blank', 'noopener')}
                    className="w-full bg-[#F1D07C] text-black py-2 px-4 rounded-[8px] hover:brightness-95 transition-all"
                  >
                    Open Document
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No additional resources available for this training.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassroomModule;
