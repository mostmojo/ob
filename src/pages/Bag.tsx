import React from 'react';

const GPT_LINKS: Record<string,string> = {
  Biggie: 'https://chatgpt.com/g/g-689b10fd32488191bf7b4fe0a81f0439-biggie-the-big-idea-extractor',
  Gandalf: 'https://chatgpt.com/g/g-689424ff59b08191ac24a3fe628ded5e-gandalf',
  Danny: 'https://chatgpt.com/g/g-6876423ca23c819182301c08fe753573-danny-the-dm-slayer',
  Wally: 'https://chatgpt.com/g/g-6874f0a31ba48191adf6da7b3cb02b44-wally-the-what-insight-bot',
  Sally: 'https://chatgpt.com/g/g-68740161487c8191a34d3e0afbde4d36-sally-the-show-bot',
  Gee: 'https://chatgpt.com/g/g-68629e9f71008191bfbc31bf19fb1105-gee-the-gameplan-coach',
  FYou: 'https://chatgpt.com/g/g-683e0cf987d481918c4ca69284d04fe5-f-you-low-ticket-campaign-builder-gpt',
  MicroOffer: 'https://chatgpt.com/g/g-682dda77d7e0819189b2ead473059581-micro-offer-sales-page-gpt',
  HookStory: 'https://chatgpt.com/g/g-682c96f3884c819180db182e416e1ef0-hook-story-offer-gpt',
  ProfitablePDF: 'https://chatgpt.com/g/g-682c92d8f49081919ea105f6f5dbb863-profitable-pdf-idea-generator-gpt',
  LeadMagnetArmy: 'https://chatgpt.com/g/g-682c8ffbcbd48191b9bf00c10433dbc1-3x-lead-magnet-army-gpt',
  Iggy: 'https://chatgpt.com/g/g-681e0b3bc1148191b6c1b7e4f67a8473-iggy-the-invite-offer-blueprint-bot',
  Banger: 'https://chatgpt.com/g/g-67d27e3b2b60819196ba27da5bf6110a-banger-story-post-maker-1-gpt'
}

export default function Bag({ gpts }: { gpts: any[] }) {
  // fallback placeholder list if gpts empty
  const placeholders = [
    { id: 'biggie', name: 'Biggie', emoji: '💡' },
    { id: 'gandalf', name: 'Gandalf', emoji: '🧙' },
    { id: 'danny', name: 'Danny', emoji: '💬' },
    { id: 'wally', name: 'Wally', emoji: '🧱' },
    { id: 'sally', name: 'Sally', emoji: '🎤' },
    { id: 'gee', name: 'Gee', emoji: '📆' },
    { id: 'fyou', name: 'F*You Low Ticket', emoji: '🔥' },
    { id: 'micro', name: 'Micro Offer Sales', emoji: '💸' },
    { id: 'hook', name: 'Hook Story Offer', emoji: '🎯' },
    { id: 'pdf', name: 'Profitable PDF', emoji: '📄' },
    { id: 'army', name: '3x Lead Magnet Army', emoji: '🎯' },
    { id: 'iggy', name: 'Iggy', emoji: '🤖' },
    { id: 'banger', name: 'Banger Story', emoji: '✉️' }
  ];

  const list = (gpts && gpts.length>0) ? gpts : placeholders;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {list.map((g:any) => {
          const name = g.display_name || g.name || g.title || g.name;
          const link = GPT_LINKS[name] || g.launch_url || '#';

          return (
            <a key={g.id || name} href={link} target="_blank" rel="noreferrer" 
               className="group gpt-card p-0 overflow-hidden border bg-white block transition-all hover:shadow-lg"
               style={{borderRadius: '8px'}}>
              <div className="h-28 flex items-center justify-center text-3xl">{g.emoji ?? '⚙️'}</div>
              <div className="p-4">
                <div className="font-semibold text-lg">{name}</div>
                <div className="text-sm text-neutral-600 mt-1">AI-powered business tool</div>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
