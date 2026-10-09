import React, { useState } from 'react';

// --- Shared Components for the Styleguide ---
const Section = ({ id, title, children }: { id: string, title: string, children: React.ReactNode }) => (
  <section id={id} className="mb-24 scroll-mt-12">
    <h2 className="font-display text-4xl font-bold mb-8 pb-4 border-b-4 border-dark-brown/10">{title}</h2>
    {children}
  </section>
);

const Swatch = ({ name, hex, bgClass, textClass = 'text-dark-brown' }: any) => (
  <div className="flex flex-col gap-2">
    <div className={`h-24 w-full rounded-2xl border-heavy shadow-solid ${bgClass}`}></div>
    <div>
      <div className="font-bold text-lg">{name}</div>
      <div className="font-mono text-sm opacity-70">{hex}</div>
    </div>
  </div>
);

// --- Game UI Components ---
const Button = ({ variant = 'primary', size = 'md', className = '', children, ...props }: any) => {
  const base = "font-display font-semibold border-heavy transition-all duration-100 shadow-solid hover:shadow-solid-hover active:shadow-solid-active select-none flex items-center justify-center gap-2";
  
  const sizes = {
    sm: "text-sm px-4 py-2 rounded-xl",
    md: "text-lg px-6 py-3 rounded-2xl",
    lg: "text-xl px-8 py-4 rounded-[24px]"
  };

  const variants = {
    primary: "bg-team-purple text-white hover:bg-team-purple-dark",
    secondary: "bg-amber text-dark-brown hover:bg-[#E0941D]",
    danger: "bg-error text-white hover:bg-[#D43B40]",
    ghost: "bg-transparent text-dark-brown border-transparent shadow-none hover:bg-black/5 hover:shadow-none hover:-translate-y-0 active:translate-y-0 active:bg-black/10"
  };

  const currentVariant = variants[variant as keyof typeof variants] || variants.primary;
  const currentSize = sizes[size as keyof typeof sizes] || sizes.md;

  // Ghost removes the shadow behavior
  const finalClass = variant === 'ghost' 
    ? `font-display font-semibold transition-all duration-100 select-none flex items-center justify-center gap-2 ${currentVariant} ${currentSize} ${className}`
    : `${base} ${currentVariant} ${currentSize} ${className}`;

  return <button className={finalClass} {...props}>{children}</button>;
};

const Input = ({ label, state = 'default', placeholder = 'Enter text...' }: any) => {
  const states = {
    default: "border-dark-brown bg-white",
    focus: "border-team-purple bg-white ring-4 ring-team-purple/20",
    error: "border-error bg-[#FFF5F5] text-error",
    success: "border-success bg-[#F0FDF4]",
    disabled: "border-dark-brown/30 bg-gray-100 text-dark-brown/50 cursor-not-allowed"
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-sm">
      {label && <label className="font-bold text-sm ml-2">{label}</label>}
      <input 
        disabled={state === 'disabled'}
        className={`w-full px-4 py-3 rounded-xl border-heavy outline-none transition-all ${states[state as keyof typeof states]} font-sans`}
        placeholder={placeholder}
        defaultValue={state === 'error' ? 'Invalid entry' : ''}
      />
      {state === 'error' && <span className="text-error text-xs font-bold ml-2">This field is required</span>}
    </div>
  );
};

const Badge = ({ children, color = 'blue' }: any) => {
  const colors = {
    blue: "bg-pitch-blue text-white",
    purple: "bg-team-purple text-white",
    amber: "bg-amber text-dark-brown",
    green: "bg-success text-white"
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border-2 border-dark-brown ${colors[color as keyof typeof colors]}`}>
      {children}
    </span>
  );
};

const PlayerCard = () => (
  <div className="bg-cream border-heavy rounded-[24px] p-4 flex items-center gap-4 shadow-diffuse w-full max-w-sm relative overflow-hidden group hover:-translate-y-1 transition-transform">
    {/* Avatar Bobble */}
    <div className="w-16 h-16 rounded-full bg-team-turq border-heavy shadow-solid flex items-center justify-center animate-bobble relative z-10">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    </div>
    
    <div className="flex-1 relative z-10">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="font-display font-bold text-xl leading-none">AlexThePro</h3>
        <Badge color="amber">Lvl 42</Badge>
      </div>
      <div className="text-sm font-semibold opacity-70">Rank: Diamond I</div>
    </div>
    
    {/* Decorative background shape */}
    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
  </div>
);

const Toast = ({ type = 'success', message }: any) => {
  const config = {
    success: { bg: 'bg-[#F0FDF4]', border: 'border-success', text: 'text-success', icon: '✓' },
    error: { bg: 'bg-[#FFF5F5]', border: 'border-error', text: 'text-error', icon: '✕' },
    warning: { bg: 'bg-[#FFFBEB]', border: 'border-warning', text: 'text-warning', icon: '!' }
  };
  const current = config[type as keyof typeof config];
  
  return (
    <div className={`${current.bg} ${current.border} border-heavy rounded-2xl p-4 flex items-center gap-4 shadow-solid max-w-sm`}>
      <div className={`w-8 h-8 rounded-full ${current.border} border-2 flex items-center justify-center font-bold ${current.text}`}>
        {current.icon}
      </div>
      <div className="font-bold">{message}</div>
    </div>
  );
};

// --- App Layout ---
export default function App() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-dark-brown flex selection:bg-amber selection:text-dark-brown">
      {/* Sidebar / TOC */}
      <nav className="w-64 fixed h-screen overflow-y-auto border-r-heavy bg-white p-8 flex flex-col gap-6 z-50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-pitch-blue rounded-xl border-heavy shadow-solid flex items-center justify-center text-white font-bold animate-bobble">
            B
          </div>
          <h1 className="font-display font-bold text-xl leading-tight tracking-tight">Bobble<br/>League</h1>
        </div>
        
        <div className="flex flex-col gap-3 font-semibold">
          <a href="#cover" className="hover:text-pitch-blue transition-colors">1. Cover</a>
          <a href="#logo" className="hover:text-pitch-blue transition-colors">2. Logo</a>
          <a href="#colors" className="hover:text-pitch-blue transition-colors">3. Colors</a>
          <a href="#typography" className="hover:text-pitch-blue transition-colors">4. Typography</a>
          <a href="#components" className="hover:text-pitch-blue transition-colors">5. Base Components</a>
          <a href="#application" className="hover:text-pitch-blue transition-colors">6. Design Application</a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-16 max-w-6xl">
        
        {/* 1. Cover */}
        <Section id="cover" title="Visual Identity Document">
          <div className="bg-cream border-heavy rounded-[32px] p-12 shadow-diffuse relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-4 bg-amber"></div>
            <h1 className="font-display text-7xl font-bold mb-4 mt-4">Bobble League</h1>
            <p className="text-2xl font-semibold opacity-70 mb-12">Tactical 3D Turn-based Football</p>
            
            <div className="flex gap-8">
              <div>
                <div className="text-sm font-bold opacity-50 uppercase tracking-widest mb-1">Version</div>
                <div className="font-bold text-xl">v1.0</div>
              </div>
              <div>
                <div className="text-sm font-bold opacity-50 uppercase tracking-widest mb-1">Date</div>
                <div className="font-bold text-xl">{new Date().toLocaleDateString()}</div>
              </div>
            </div>
            
            <div className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none">
              <svg width="400" height="400" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8"/>
                <path d="M 50 5 L 50 95 M 5 50 L 95 50" stroke="currentColor" strokeWidth="8"/>
              </svg>
            </div>
          </div>
        </Section>

        {/* 2. Logo */}
        <Section id="logo" title="Logo & Branding">
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="bg-white border-heavy rounded-3xl p-12 flex flex-col items-center justify-center gap-6 shadow-solid">
              <div className="text-sm font-bold opacity-50 uppercase tracking-widest w-full text-left">Primary (Horizontal)</div>
              
              {/* Logo construction */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-pitch-blue rounded-full border-heavy shadow-solid flex items-center justify-center relative animate-bobble">
                  {/* Stylized soccer ball + arrow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 border-white"></div>
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-amber border-b-8 border-b-transparent"></div>
                </div>
                <div className="font-display font-bold text-5xl tracking-tight text-dark-brown">Bobble League</div>
              </div>
            </div>

            <div className="bg-pitch-blue border-heavy rounded-3xl p-12 flex flex-col items-center justify-center gap-6 shadow-solid text-white">
              <div className="text-sm font-bold opacity-50 uppercase tracking-widest w-full text-left">On Dark/Brand Background</div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-full border-heavy shadow-solid flex items-center justify-center relative animate-bobble">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 border-pitch-blue"></div>
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-amber border-b-8 border-b-transparent"></div>
                </div>
                <div className="font-display font-bold text-5xl tracking-tight text-white drop-shadow-md">Bobble League</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border-heavy rounded-2xl p-6 text-sm font-semibold max-w-2xl">
            <strong>Usage Rule:</strong> The logo conveys a "physical toy" feel. The isotype represents a game piece (a bobble token) with a directional arrow indicating the drag-and-shoot mechanic.
          </div>
        </Section>

        {/* 3. Colors */}
        <Section id="colors" title="Color Palette">
          <h3 className="font-display text-2xl font-bold mb-4">Primary (Pitch & Teams)</h3>
          <div className="grid grid-cols-3 gap-6 mb-12">
            <Swatch name="Pitch Blue" hex="#2FA8E0" bgClass="bg-pitch-blue" />
            <Swatch name="Team Purple" hex="#7B4FB8" bgClass="bg-team-purple" />
            <Swatch name="Team Turquoise" hex="#1FB5B0" bgClass="bg-team-turq" />
          </div>

          <h3 className="font-display text-2xl font-bold mb-4">Secondary (UI & Surfaces)</h3>
          <div className="grid grid-cols-3 gap-6 mb-12">
            <Swatch name="Amber Orange" hex="#F5A524" bgClass="bg-amber" />
            <Swatch name="Cream Base" hex="#FFF1C9" bgClass="bg-cream" />
            <Swatch name="Dark Brown" hex="#3E2A2A" bgClass="bg-dark-brown" textClass="text-white" />
          </div>

          <h3 className="font-display text-2xl font-bold mb-4">Feedback / Status</h3>
          <div className="grid grid-cols-4 gap-6">
            <Swatch name="Success" hex="#2FB360" bgClass="bg-success" />
            <Swatch name="Error" hex="#E5484D" bgClass="bg-error" />
            <Swatch name="Warning" hex="#F2B01E" bgClass="bg-warning" />
            <Swatch name="Info" hex="#3B82F6" bgClass="bg-info" />
          </div>
        </Section>

        {/* 4. Typography */}
        <Section id="typography" title="Typography Hierarchy">
          <div className="bg-white border-heavy rounded-[32px] p-12 shadow-solid mb-8">
            <div className="grid grid-cols-[1fr_2fr] gap-12 items-start">
              <div>
                <div className="font-display text-6xl font-bold mb-2">Fredoka</div>
                <div className="font-bold opacity-70 mb-6">Display, Headers & Score</div>
                <div className="text-4xl leading-tight font-display mb-4">Aa Bb Cc Dd Ee Ff Gg<br/>0123456789</div>
                <p className="text-sm font-semibold max-w-sm">A rounded, playful font that matches the friendly "toy" aesthetic. Used for primary impact.</p>
              </div>
              <div>
                <div className="font-sans text-6xl font-bold mb-2">Nunito</div>
                <div className="font-bold opacity-70 mb-6">UI Text & Content</div>
                <div className="text-4xl leading-tight font-sans mb-4">Aa Bb Cc Dd Ee Ff Gg<br/>0123456789</div>
                <p className="text-sm font-semibold max-w-sm">Highly legible sans-serif with rounded terminals, ensuring readability without breaking the playful character.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 bg-white border-heavy rounded-[32px] p-12 shadow-solid">
            <div className="grid grid-cols-[150px_1fr] items-baseline border-b-2 border-gray-100 pb-4">
              <span className="font-bold opacity-50">Display</span>
              <span className="font-display text-6xl font-bold">Victory! 3 - 1</span>
            </div>
            <div className="grid grid-cols-[150px_1fr] items-baseline border-b-2 border-gray-100 pb-4">
              <span className="font-bold opacity-50">Heading 1</span>
              <span className="font-display text-4xl font-bold">Select Your Team</span>
            </div>
            <div className="grid grid-cols-[150px_1fr] items-baseline border-b-2 border-gray-100 pb-4">
              <span className="font-bold opacity-50">Heading 2</span>
              <span className="font-display text-2xl font-bold">Match Settings</span>
            </div>
            <div className="grid grid-cols-[150px_1fr] items-baseline border-b-2 border-gray-100 pb-4">
              <span className="font-bold opacity-50">Body L</span>
              <span className="font-sans text-lg">Drag your player to aim and set power. Release to shoot.</span>
            </div>
            <div className="grid grid-cols-[150px_1fr] items-baseline pb-4">
              <span className="font-bold opacity-50">Score / Num</span>
              <span className="font-display text-5xl font-bold tabular-nums text-pitch-blue tracking-wider">04 : 12</span>
            </div>
          </div>
        </Section>

        {/* 5. Base Components */}
        <Section id="components" title="Base Components">
          <div className="grid grid-cols-2 gap-12">
            
            {/* Buttons */}
            <div className="flex flex-col gap-6">
              <h3 className="font-display text-2xl font-bold border-b-2 border-dark-brown/10 pb-2">Buttons</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary">Play Match</Button>
                <Button variant="secondary">Settings</Button>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="danger">Forfeit</Button>
                <Button variant="ghost">Cancel</Button>
              </div>
              <div className="mt-4 p-4 bg-cream border-2 border-dark-brown/20 rounded-xl">
                <p className="text-sm font-semibold">Uses <code>shadow-solid</code> for a physical button feel. Translates down on active state.</p>
              </div>
            </div>

            {/* Inputs */}
            <div className="flex flex-col gap-6">
              <h3 className="font-display text-2xl font-bold border-b-2 border-dark-brown/10 pb-2">Inputs</h3>
              <Input label="Username" placeholder="Enter username..." />
              <Input label="Error State" state="error" />
            </div>

            {/* Cards & Badges */}
            <div className="flex flex-col gap-6">
              <h3 className="font-display text-2xl font-bold border-b-2 border-dark-brown/10 pb-2">Player Card & Badges</h3>
              <PlayerCard />
              <div className="flex gap-3 mt-4">
                <Badge color="blue">New</Badge>
                <Badge color="purple">Pro Player</Badge>
                <Badge color="green">Online</Badge>
              </div>
            </div>

            {/* Feedback / Toasts */}
            <div className="flex flex-col gap-6">
              <h3 className="font-display text-2xl font-bold border-b-2 border-dark-brown/10 pb-2">Feedback Toasts</h3>
              <Toast type="success" message="Match found!" />
              <Toast type="error" message="Connection lost." />
              <Toast type="warning" message="Turn time running out!" />
            </div>

          </div>
        </Section>

        {/* 6. Application Example */}
        <Section id="application" title="Design Application (Window Example)">
          <p className="mb-8 font-semibold max-w-3xl">
            This demonstrates how the variables, styles, and components come together to form an interactive surface (e.g., a "Find Match" modal). Notice the thick borders, playful rounded corners, solid shadows, and the pitch-patterned background inside the content area.
          </p>

          <div className="bg-white border-heavy rounded-[32px] shadow-diffuse p-8 flex items-center justify-center min-h-[600px] relative overflow-hidden bg-gray-100">
            
            {/* The Modal Window */}
            <div className="w-[600px] bg-cream border-heavy rounded-[32px] shadow-solid flex flex-col overflow-hidden relative z-10 animate-fade-in">
              {/* Top Accent Line */}
              <div className="h-3 bg-amber w-full border-b-heavy"></div>
              
              {/* Header */}
              <div className="px-6 py-5 border-b-heavy bg-white flex justify-between items-center">
                <h2 className="font-display font-bold text-2xl text-pitch-blue">Ranked Matchmaking</h2>
                <button className="w-8 h-8 rounded-full border-2 border-dark-brown flex items-center justify-center font-bold hover:bg-gray-100 transition-colors">
                  ✕
                </button>
              </div>

              {/* Content Area */}
              <div className="p-8 pitch-pattern min-h-[250px] flex flex-col items-center justify-center gap-6 relative">
                {/* Decorative Field Lines */}
                <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-0 border-t-4 border-white/40"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-4 border-white/40"></div>

                <div className="bg-white/90 backdrop-blur border-heavy rounded-2xl p-6 text-center shadow-solid relative z-10 w-full max-w-sm">
                  <div className="w-12 h-12 rounded-full bg-pitch-blue mx-auto mb-4 animate-spin" style={{ animationDuration: '3s' }}></div>
                  <h3 className="font-display font-bold text-xl mb-2">Searching for opponent...</h3>
                  <p className="font-semibold opacity-70 text-sm">Estimated wait: 0:15</p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-5 border-t-heavy bg-white flex justify-end gap-4">
                <Button variant="ghost">Cancel</Button>
                <Button variant="primary">Practice Offline</Button>
              </div>
            </div>

            {/* Example overlapping toast in context */}
            <div className="absolute bottom-8 right-8 z-50">
               <Toast type="warning" message="Ping is slightly high (85ms)" />
            </div>
            
          </div>
        </Section>

      </main>
    </div>
  );
}
