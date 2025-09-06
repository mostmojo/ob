import React, { useState, useEffect } from 'react';
import { createClient } from '@blinkdotnew/sdk';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import './App.css';
import Community from './pages/Community';
import ChatGPTInterface from './components/ChatGPTInterface';
import ClassroomModule from './components/ClassroomModule';

const blink = createClient({
  projectId: 'onebag-ai-studio-ptcjfa7a',
  authRequired: true
});

const IggyGPT = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [responses, setResponses] = useState<{[key: string]: string}>({});
  const [finalOutput, setFinalOutput] = useState('');
  
  const questions = [
    'What is your niche?',
    'What is the main transformation you provide?',
    'What is your program timeframe?',
    'What are your 3 core components? (Please list each one)',
    'What are your 3 stage labels? (Please list each one)',
    'What is the name of your offer?',
    'What do they get in your program?',
    'What is your investment/pricing?',
    'What is your guarantee?',
    'How do they join?'
  ];

  const handleResponse = (response: string) => {
    const newResponses = { ...responses, [`q${step}`]: response };
    setResponses(newResponses);
    
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      generateFinalOffer(newResponses);
    }
  };

  const generateFinalOffer = (allResponses: {[key: string]: string}) => {
    const components = allResponses.q4?.split('\n').filter(c => c.trim()) || [];
    const stages = allResponses.q5?.split('\n').filter(s => s.trim()) || [];
    
    const offer = `
${allResponses.q6 || '[PROGRAM NAME]'}™

We aim to help you achieve ${allResponses.q2} with ${allResponses.q7?.split(',')[0] || 'KEY BENEFIT 1'}, ${allResponses.q7?.split(',')[1] || 'KEY BENEFIT 2'}, and no more than 2 hours a day of focused work.

It starts with the first ${allResponses.q3}, where our goal is creating your foundation with 3 core components:

1. ${components[0] || 'COMPONENT 1'}
This is the foundation that transforms your ${allResponses.q1} business. We'll implement this together step-by-step so you see immediate progress in your first week.

2. ${components[1] || 'COMPONENT 2'}
This is where most ${allResponses.q1} professionals miss the hidden opportunity. We'll show you the implementation process that solves the most common pain points in your market.

3. ${components[2] || 'COMPONENT 3'}
This differs from traditional approaches by compounding the results from Components 1 and 2, taking you all the way to your ultimate outcome within 12 months.

ROADMAP TO ${allResponses.q2?.toUpperCase()}

Stage 1 (${stages[0] || 'MILESTONE 1'}):
As a program participant, you'll get crystal clear on 3 things:
• Your foundation that consistently produces results
• Next steps to achieve the next level (no overwhelm or confusion)  
• The exact framework you'll be using to reach your ultimate goal

We start with clarity and a simple plan to scale your foundation and maintain consistent progress.

Stage 2 (${stages[1] || 'MILESTONE 2'}):
You'll reach your intermediate achievement once, then we'll implement only the pieces of the framework you need to consistently achieve Stage 2 results with less than 2 hours a day of focused effort.

Stage 3 (${stages[2] || 'MILESTONE 3'}):
The final step is about maximizing impact with minimum effort. With your complete system in place, we'll identify the highest-leverage opportunities in your situation and focus on activities that take you less than 1 hour a day to maintain.

Timeline to Results:
In ${allResponses.q3} you can expect your initial milestone to be achieved and the 3 fundamentals to be in place:
Your foundation that creates sustainable progress without overwhelm.
Powered by a strategy that consistently delivers results.
With optimization that amplifies your efforts.
And your entire process runs in 2 hours a day or less.

Investment:
It's easy to get started because the transformation you'll experience makes this decision simple, and you could see initial results next week.

${allResponses.q8}

${allResponses.q3} program with the option to continue or complete after that period.

Guarantees and Promises:
${allResponses.q9}

Your results depend on your commitment and consistency. Both of which I lack context on.

I will demonstrate what I would do in your situation if I were you. And you will have the option to follow my proven framework on the journey to ${allResponses.q2} so you can get there faster.

That's as much as I ethically can and will promise you.

IN A NUTSHELL

STAGE 1: We get you clear on your foundation, next steps and gameplan to ${allResponses.q2}. We start with achieving ${stages[0] || 'your first milestone'}.

STAGE 2: We work together to implement your strategy and optimize your approach to reach ${stages[1] || 'your scaling milestone'}.

STAGE 3: Armed with a proven approach that runs in less than 1 hour a day, we fine-tune your optimization to reach ${stages[2] || 'your final milestone'} with maximum efficiency.

HOW TO JOIN ${allResponses.q6?.toUpperCase() || 'YOUR PROGRAM'}

${allResponses.q10}
`;

    setFinalOutput(offer);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Iggy - G-Doc Offer Blueprint Bot</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        <div className="p-6">
          {!finalOutput ? (
            <div>
              <div className="mb-6">
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-700">
                    I'll help you create a complete Google Doc offer in the Modern Maker format. 
                    Let's go through this step by step.
                  </p>
                </div>
                <div className="flex items-center mb-4">
                  <span className="bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3">
                    {step}
                  </span>
                  <span className="text-gray-500 text-sm">Question {step} of {questions.length}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {questions[step - 1]}
                </h3>
                <textarea
                  className="w-full p-4 border border-gray-300 rounded-lg resize-none"
                  rows={4}
                  placeholder="Type your answer here..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      const target = e.target as HTMLTextAreaElement;
                      if (target.value.trim()) {
                        handleResponse(target.value);
                        target.value = '';
                      }
                    }
                  }}
                />
                <p className="text-sm text-gray-500 mt-2">Press Enter to continue, Shift+Enter for new line</p>
              </div>

              {Object.keys(responses).length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">Your Answers So Far:</h4>
                  <div className="space-y-2 text-sm">
                    {Object.entries(responses).map(([key, value]) => {
                      const questionIndex = parseInt(key.replace('q', '')) - 1;
                      return (
                        <div key={key}>
                          <span className="font-medium">{questions[questionIndex]}:</span>
                          <span className="ml-2 text-gray-600">{value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Complete G-Doc Offer:</h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed">{finalOutput}</pre>
              </div>
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => navigator.clipboard.writeText(finalOutput)}
                  className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Copy to Clipboard
                </button>
                <button
                  onClick={() => {
                    setStep(1);
                    setResponses({});
                    setFinalOutput('');
                  }}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const GPTTool = () => {
  const { toolId } = useParams();
  const navigate = useNavigate();
  
  const gptTools = {
    'iggy': {
      name: 'Iggy – G-Doc Offer Bot',
      description: 'I help you build high-converting Google Doc offers in 5 minutes using the Modern Maker framework.',
      initialPrompt: 'Let\'s create your compelling offer together! I\'ll walk you through my proven process step by step. What type of business or service are you creating an offer for?'
    },
    'gandalf': {
      name: 'Gandalf – Inner Wizard Coach',
      description: 'I remove mental blocks and install clarity using proven mindset processes.',
      initialPrompt: 'I\'m here to help you break through whatever\'s holding you back. What challenge or mental block are you currently facing in your business or life?'
    },
    'sally': {
      name: 'Sally – Show Bot',
      description: 'I create proof content from your calendar, wins, and workflows.',
      initialPrompt: 'Let\'s turn your daily wins into magnetic social proof! Tell me about a recent win, accomplishment, or positive outcome you\'ve had in your business.'
    },
    'wally': {
      name: 'Wally – The What Bot',
      description: 'I transform your lived experience into "what" content that creates demand.',
      initialPrompt: 'I specialize in turning your knowledge and experience into valuable content. What area of expertise or life experience would you like to transform into compelling content?'
    },
    'biggie': {
      name: 'Biggie – Big Idea Extractor',
      description: 'I pull unique positioning ideas from your brain and turn them into content.',
      initialPrompt: 'Let\'s discover your unique angle! Tell me about your business, your background, or what makes your approach different from others in your field.'
    },
    'danny': {
      name: 'Danny – DM Slayer',
      description: 'I handle DMs, pivots, closes, and objections with proven flows.',
      initialPrompt: 'I\'ll help you master direct message conversations that convert. Are you looking to improve your cold outreach, handle objections, or close more deals in DMs?'
    },
    'gee': {
      name: 'Gee – Gameplan Coach',
      description: 'I create full 45-day roadmaps to hit your next business milestone.',
      initialPrompt: 'Let\'s build your 45-day success roadmap! What\'s the specific business milestone or goal you want to achieve in the next 45 days?'
    },
    'micro-offer': {
      name: 'Micro Offer Sales GPT',
      description: 'I write high-converting checkout pages and upsells.',
      initialPrompt: 'Let\'s create a micro offer that converts! What product or service are you looking to sell, and who is your target audience?'
    },
    'pdf-generator': {
      name: 'Profitable PDF Generator',
      description: 'I turn content into lead magnets and digital products that sell.',
      initialPrompt: 'I\'ll help you create valuable PDF products that people want to buy. What topic or expertise do you want to package into a profitable PDF?'
    },
    'lead-magnet-value': {
      name: 'Value Lead Magnet GPT',
      description: 'I create value-based lead magnets that attract your ideal customers.',
      initialPrompt: 'Let\'s create a value magnet that your audience can\'t resist! What valuable insight, tool, or resource could you offer to attract your ideal customers?'
    },
    'lead-magnet-result': {
      name: 'Result Lead Magnet GPT',
      description: 'I create result-focused lead magnets that promise specific outcomes.',
      initialPrompt: 'Time to create a result magnet! What specific, measurable outcome could you help your audience achieve with a focused lead magnet?'
    },
    'lead-magnet-awareness': {
      name: 'Awareness Lead Magnet GPT',  
      description: 'I create awareness-building lead magnets that educate your market.',
      initialPrompt: 'Let\'s build an awareness magnet that educates your market! What important concept, mistake, or insight should your audience understand about your field?'
    },
    'campaign-builder': {
      name: 'F*You Low Ticket Campaign Builder',
      description: 'I create email campaigns that convert skeptical cold traffic.',
      initialPrompt: 'Let\'s build a campaign that converts even the most skeptical prospects! What low-ticket offer are you promoting, and what objections do you typically face?'
    },
    'story-post': {
      name: 'Banger Story Post GPT',
      description: 'I craft magnetic, narrative-style social posts that drive demand.',
      initialPrompt: 'Let\'s create a story post that stops the scroll! Share a recent experience, lesson learned, or moment from your business journey that others could learn from.'
    },
    'story-email': {
      name: 'Banger Story Email GPT',
      description: 'I write story-driven emails that build connection and convert.',
      initialPrompt: 'Time to write an email that your audience actually wants to read! What story, experience, or lesson could you share that would resonate with your subscribers?'
    }
  };

  const tool = gptTools[toolId as keyof typeof gptTools];
  
  if (!tool) {
    navigate('/');
    return null;
  }

  return (
    <ChatGPTInterface
      gptName={tool.name}
      gptDescription={tool.description}
      initialPrompt={tool.initialPrompt}
      onClose={() => navigate('/')}
      onOptionSelected={(opt) => {
        // Map option letters to in-app actions
        if (opt === 'A') {
          // A -> go to trainings
          navigate('/');
          // switch to trainings tab by navigating to root then setting hash
          setTimeout(() => {
            // use history state to open trainings - simpler: navigate to root and open trainings via event
            window.dispatchEvent(new CustomEvent('onebag:selectTab', { detail: 'trainings' }));
          }, 50);
        } else if (opt === 'B') {
          // B -> go to arsenal
          window.dispatchEvent(new CustomEvent('onebag:selectTab', { detail: 'arsenal' }));
          navigate('/');
        } else if (opt === 'C') {
          // C -> community
          window.dispatchEvent(new CustomEvent('onebag:selectTab', { detail: 'community' }));
          navigate('/');
        } else if (opt === 'D') {
          // D -> private invite
          window.dispatchEvent(new CustomEvent('onebag:selectTab', { detail: 'invite' }));
          navigate('/');
        }
      }}
    />
  );
};

const ClassroomModuleView = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  
  const trainings = [
  { title: 'Modern Maker OS', description: '', embedUrl: 'https://www.youtube.com/embed/4n9wxnQlYq8', supportingDoc: '#', locked: false },
  { title: 'Micro Snack Cartel', description: '', embedUrl: '', supportingDoc: '', locked: true, lockRedirect: 'https://boardroom.thrivecart.com/trial' },
  { title: 'Power Writer', description: '', embedUrl: '', supportingDoc: '', locked: true, lockRedirect: 'https://boardroom.thrivecart.com/trial' }
];

  const moduleIndex = parseInt(moduleId || '0');
  const training = trainings[moduleIndex];
  
  if (training?.locked && training.lockRedirect) {
    window.open(training.lockRedirect, '_blank', 'noopener');
    navigate('/');
    return null;
  }
  
  if (!training) {
    navigate('/');
    return null;
  }

  return (
    <ClassroomModule 
      training={training}
      onBack={() => navigate('/')}
    />
  );
};

const MainApp = () => {
  const [activeTab, setActiveTab] = useState('arsenal');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Listen for tab selection events from embedded tools/chat
  useEffect(() => {
    const handler = (e: any) => {
      const detail = e?.detail;
      if (typeof detail === 'string') setActiveTab(detail);
    };
    window.addEventListener('onebag:selectTab', handler as EventListener);
    return () => window.removeEventListener('onebag:selectTab', handler as EventListener);
  }, []);

  const tabs = [
    { id: 'arsenal', label: 'Bag' },
    { id: 'trainings', label: 'Classroom' },
    { id: 'community', label: 'Community' },
    { id: 'invite', label: 'Private Invite' }
  ];

  const gptTools = [
    {
      category: 'Human-Name GPTs',
      tools: [
        {
          name: 'Iggy – G-Doc Offer Bot',
          outcome: 'Builds a high-converting Google Doc offer in 5 mins.',
          description: 'Transform your ideas into compelling offers that convert visitors into buyers using the Modern Maker framework.',
          isEmbedded: true,
          externalLink: 'https://chatgpt.com/g/g-681e0b3bc1148191b6c1b7e4f67a8473-iggy-the-invite-offer-blueprint-bot'
        },
        {
          name: 'Gandalf – Inner Wizard Coach',
          outcome: 'Removes blocks and installs clarity using my mindset process.',
          description: 'Break through mental barriers with proven psychological frameworks.',
          isEmbedded: true,
          externalLink: 'https://chatgpt.com/g/g-689424ff59b08191ac24a3fe628ded5e-gandalf'
        },
        {
          name: 'Sally – Show Bot',
          outcome: 'Creates proof content from your calendar, wins, and workflows.',
          description: 'Turn your daily wins into magnetic social proof content.',
          isEmbedded: true,
          externalLink: 'https://chatgpt.com/g/g-68740161487c8191a34d3e0afbde4d36-sally-the-show-bot'
        },
        {
          name: 'Wally – The What Bot',
          outcome: 'Transforms lived experience into "what" content that creates demand.',
          description: 'Convert your knowledge into valuable content that drives engagement.',
          isEmbedded: true,
          externalLink: 'https://chatgpt.com/g/g-6874f0a31ba48191adf6da7b3cb02b44-wally-the-what-insight-bot'
        },
        {
          name: 'Biggie – Big Idea Extractor',
          outcome: 'Pulls unique positioning ideas from your brain and turns them into content.',
          description: 'Discover your unique angle and transform it into compelling content.',
          isEmbedded: true,
          externalLink: 'https://chatgpt.com/g/g-689b10fd32488191bf7b4fe0a81f0439-biggie-the-big-idea-extractor'
        },
        {
          name: 'Danny – DM Slayer',
          outcome: 'Handles DMs, pivots, closes, and objections with proven flows.',
          description: 'Master direct message conversations that convert prospects to clients.',
          isEmbedded: true,
          externalLink: 'https://chatgpt.com/g/g-6876423ca23c819182301c08fe753573-danny-the-dm-slayer'
        },
        {
          name: 'Gee – Gameplan Coach',
          outcome: 'Creates a full 45-day roadmap to hit your next business milestone.',
          description: 'Get a clear, actionable plan to reach your business goals faster.',
          isEmbedded: true,
          externalLink: 'https://chatgpt.com/g/g-68629e9f71008191bfbc31bf19fb1105-gee-the-gameplan-coach'
        }
      ]
    },
    {
      category: 'Function-Name GPTs',
      tools: [
        {
          name: 'Micro Offer Sales GPT',
          outcome: 'Writes high-converting checkout pages and upsells.',
          description: 'Create compelling sales pages that turn browsers into buyers.',
          isEmbedded: true,
          externalLink: 'https://chatgpt.com/g/g-682dda77d7e0819189b2ead473059581-micro-offer-sales-page-gpt'
        },
        {
          name: 'Profitable PDF Generator',
          outcome: 'Turns content into lead magnets and digital products that sell.',
          description: 'Transform your knowledge into valuable digital products.',
          isEmbedded: true,
          externalLink: 'https://chatgpt.com/g/g-682c92d8f49081919ea105f6f5dbb863-profitable-pdf-idea-generator-gpt'
        },
        {
          name: '3x Lead Magnet Army',
          outcome: 'Value, Result, and Awareness magnets that capture quality leads.',
          description: 'Triple your lead generation with three powerful magnet types.',
          link: '#',
          multiButton: false,
          buttons: [
            { label: 'Value Magnet', onClick: () => navigate('/bag/lead-magnet-value') },
            { label: 'Result Magnet', onClick: () => navigate('/bag/lead-magnet-result') },
            { label: 'Awareness Magnet', onClick: () => navigate('/bag/lead-magnet-awareness') }
          ]
        },
        {
          name: 'F*You Low Ticket Campaign Builder',
          outcome: 'Creates email campaigns that convert skeptical cold traffic.',
          description: 'Turn cold prospects into hot buyers with proven email sequences.',
          isEmbedded: true,
          externalLink: 'https://chatgpt.com/g/g-683e0cf987d481918c4ca69284d04fe5-f-you-low-ticket-campaign-builder-gpt'
        },
        {
          name: 'Banger Story Post GPT',
          outcome: 'Crafts magnetic, narrative-style social posts that drive demand.',
          description: 'Create scroll-stopping social media posts that build your audience.',
          isEmbedded: true,
          externalLink: 'https://chatgpt.com/g/g-67d27e3b2b60819196ba27da5bf6110a-banger-story-post-maker-1-gpt'
        },
        {
          name: 'Banger Story Email GPT',
          outcome: 'Writes story-driven emails that build connection and convert.',
          description: 'Write emails that your audience actually wants to read and act on.',
          isEmbedded: true,
          onClick: () => navigate('/bag/story-email')
        }
      ]
    }
  ];

  const trainings = [
  { title: 'Modern Maker OS', description: '', embedUrl: 'https://www.youtube.com/embed/4n9wxnQlYq8', supportingDoc: '#', locked: false },
  { title: 'Micro Snack Cartel', description: '', embedUrl: '', supportingDoc: '', locked: true, lockRedirect: 'https://boardroom.thrivecart.com/trial' },
  { title: 'Power Writer', description: '', embedUrl: '', supportingDoc: '', locked: true, lockRedirect: 'https://boardroom.thrivecart.com/trial' }
];

  
const renderArsenalTab = () => (
  <div className="max-w-6xl mx-auto px-6 py-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {gptTools.flatMap(category => category.tools).map((tool, index) => {
        const href = (tool as any).externalLink || (tool as any).link || '#';
        return (
          <a key={index} href={href} target="_blank" rel="noopener noreferrer" className="block">
            <div className="rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow border">
              <div className="h-28 bg-black text-white grid place-items-center text-lg font-semibold">Tool</div>
              <div className="p-5">
                <div className="text-lg font-semibold text-gray-900">{tool.name}</div>
                {tool.description && <div className="text-sm text-neutral-500 mt-1">{tool.description}</div>}
              </div>
            </div>
          </a>
        );
      })}
    </div>
  </div>
);
const renderTrainingsTab = () => (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainings.map((training, index) => (
          <div 
            key={index} 
            className="glass-card rounded-2xl p-0 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => navigate(`/classroom/${index}`)}
          >
            {/* Use a photo placeholder instead of play-button artwork */}
            <div className="w-full h-44 bg-black text-white flex items-center justify-center"><span className="text-xl font-semibold">{training.title}</span></div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-black mb-2">{training.title}</h3>
              <p className="text-gray-600 text-sm mb-2 leading-relaxed">{training.description}</p>
              <div className="mt-4">
                <div className="text-sm text-neutral-500">{training.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInviteTab = () => {
    window.open('https://mojo-design.notion.site/mm-hq', '_blank');
    
    return (
      <div className="max-w-4xl mx-auto px-6 py-8 text-center">
        <p className="text-lg text-gray-600">Opening your private invite...</p>
      </div>
    );
  };

  const renderCommunityTab = () => <Community />;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'arsenal':
        return renderArsenalTab();
      case 'trainings':
        return renderTrainingsTab();
      case 'community':
        return renderCommunityTab();
      case 'invite':
        return renderInviteTab();
      default:
        return renderArsenalTab();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-white/80">Loading OneBag AI Studio...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="glass-nav sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex space-x-1 py-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-1 py-3 font-medium whitespace-nowrap transition-colors ${activeTab === tab.id ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'}`}
              >
                {tab.label}
              </button>
          ))}
          </div>
        </div>
      </div>

      <div className="pb-16">
        {renderTabContent()}
      </div>

      <footer className="glass-card mx-6 mb-6 rounded-2xl p-6">
        <div className="text-center text-gray-500 text-sm">
          Jacob Pegs 2025 | Modern Maker - OneBag ™ | 
          <a href="/privacy" className="hover:text-gray-700 transition-colors mx-1">Privacy Policy</a> | 
          <a href="/terms" className="hover:text-gray-700 transition-colors mx-1">Terms</a> | 
          <a href="/disclosure" className="hover:text-gray-700 transition-colors mx-1">Disclosure</a> | 
          <a href="/license" className="hover:text-gray-700 transition-colors mx-1">License</a>
        </div>
      </footer>

    </div>
  );
};

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/bag/:toolId" element={<GPTTool />} />
        <Route path="/classroom/:moduleId" element={<ClassroomModuleView />} />
      </Routes>
  );
};

export default App;