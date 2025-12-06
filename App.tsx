
import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { TemplateCard } from './components/TemplateCard';
import { TemplateModal } from './components/TemplateModal';
import { CreateTemplateModal } from './components/CreateTemplateModal';
import { AdminDashboard } from './components/AdminDashboard';
import { UserDashboard } from './components/UserDashboard';
import { AuthPage } from './components/AuthPage';
import { FeaturedSection } from './components/FeaturedSection';
import { DetailPage } from './components/DetailPage';
import { AllMCPsPage } from './components/AllMCPsPage';
import { AllJobsPage } from './components/AllJobsPage';
import { Template, Category, User, UserRole, AppView, FeaturedMCP, FeaturedJob } from './types';
import { Filter, LayoutGrid, ImageIcon } from 'lucide-react';

// Mock Data
const MOCK_USERS: User[] = [
  { id: 'u1', name: 'John Doe', role: 'user', email: 'john@example.com' },
  { id: 'u2', name: 'Admin Alice', role: 'admin', email: 'admin@prompt101.com' },
  { id: 'u3', name: 'Sarah Smith', role: 'user', email: 'sarah@design.co' }
];

const INITIAL_MCPS: FeaturedMCP[] = [
  { id: 'mcp1', name: 'Encore', description: 'Backend development framework', content: 'Encore is the backend development platform for building event-driven and distributed systems.', logo: 'Encore' },
  { id: 'mcp2', name: 'Agent Evals', description: 'Evaluation framework for AI agents', content: 'Agent Evals by Galileo provides comprehensive metrics and testing for AI agent performance.', logo: 'Agent' },
  { id: 'mcp3', name: 'Midday', description: 'Productivity suite for engineers', content: 'Midday integrates with your workflow to provide seamless time tracking and productivity insights.', logo: 'Midday' },
  { id: 'mcp4', name: 'Postman', description: 'API Platform', content: 'Postman is an API platform for building and using APIs.', logo: 'Postman' },
  { id: 'mcp5', name: 'GibsonAI', description: 'Advanced robotics control', content: 'GibsonAI offers state-of-the-art simulation environments for robotics learning.', logo: 'Gibson' },
];

const INITIAL_JOBS: FeaturedJob[] = [
  { id: 'job1', title: 'Community at Cursor', company: 'Cursor', location: 'Remote', type: 'Remote', description: 'Join our team to build community, provide support, and advocate for...', content: 'Full job description for Community Manager at Cursor...', logo: 'Cursor', salary: '$120k - $160k', applyLink: 'https://cursor.sh/careers' },
  { id: 'job2', title: 'Product Engineer', company: 'Speakeasy', location: 'Remote', type: 'Remote', description: 'At Speakeasy were building the next generation of API infrastructure.', content: 'Full job description for Product Engineer at Speakeasy...', logo: 'Speakeasy', salary: '$140k - $180k' },
  { id: 'job3', title: 'Staff AI Agent Engineer', company: 'Shortwave', location: 'New York', type: 'On-site', description: 'Our AI agent is the heartbeat of our product—a sophisticated system...', content: 'Full job description for Staff AI Agent Engineer at Shortwave...', logo: 'Shortwave', applyLink: 'https://shortwave.com/jobs' },
  { id: 'job4', title: 'AI Software Baker', company: 'Mixedbread', location: 'Remote', type: 'Remote', description: 'Mixedbread (6-person seed team) bakes next-gen search; our OSS...', content: 'Full job description for AI Software Baker at Mixedbread...', logo: 'Mixedbread' },
];

const INITIAL_TEMPLATES: Template[] = [
  {
    id: '1',
    title: 'Senior React Engineer Persona',
    description: 'Acts as a world-class senior React engineer to help debug, refactor, and write clean TypeScript code.',
    content: `Act as a world-class senior frontend React engineer. Your goal is to provide clean, efficient, and well-documented TypeScript code. Always prefer functional components and hooks. When debugging, explain the root cause before providing the fix.`,
    category: Category.Coding,
    tags: ['react', 'typescript', 'frontend', 'web-dev'],
    author: 'DevMaster',
    authorId: 'u1',
    likes: 342,
    uses: 1205,
    createdAt: 'Oct 12, 2023',
    status: 'approved',
    type: 'text'
  },
  {
    id: '2',
    title: 'Viral LinkedIn Post Generator',
    description: 'Creates engaging, high-conversion LinkedIn posts based on a simple topic or article summary.',
    content: `You are a LinkedIn growth expert. I will provide a topic or a link. You will generate a post that uses short sentences, engaging hooks, and a call to action at the end. Use a professional but conversational tone.`,
    category: Category.Marketing,
    tags: ['social-media', 'linkedin', 'growth', 'copywriting'],
    author: 'GrowthGuru',
    authorId: 'u2',
    likes: 891,
    uses: 5600,
    createdAt: 'Nov 05, 2023',
    status: 'approved',
    type: 'text'
  },
  {
    id: '3',
    title: 'SaaS Email Sequence Writer',
    description: 'Generates a 5-email onboarding sequence for new SaaS users to improve retention.',
    content: `Write a 5-email onboarding sequence for a new SaaS product. \nEmail 1: Welcome & Value Prop\nEmail 2: First Quick Win\nEmail 3: Case Study\nEmail 4: Advanced Features\nEmail 5: Upgrade Call to Action.`,
    category: Category.Marketing,
    tags: ['email', 'saas', 'copywriting', 'onboarding'],
    author: 'SaaSWizard',
    authorId: 'u1',
    likes: 210,
    uses: 850,
    createdAt: 'Sep 20, 2023',
    status: 'approved',
    type: 'text'
  },
  {
    id: 'img1',
    title: 'Cyberpunk Neon City',
    description: 'Generates a high-fidelity futuristic city with neon lights and rain reflection.',
    content: `A futuristic city street at night, heavy rain, neon lights reflecting on wet pavement, towering skyscrapers with holographic ads, cyberpunk aesthetic, 8k resolution, cinematic lighting, photorealistic.`,
    category: Category.Design,
    tags: ['cyberpunk', 'city', 'neon', 'midjourney'],
    author: 'ArtBot',
    authorId: 'u2',
    likes: 450,
    uses: 120,
    createdAt: 'Mar 12, 2024',
    status: 'approved',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'img2',
    title: 'Retro Astronaut Portrait',
    description: 'Vintage style astronaut portrait with floral elements.',
    content: `Portrait of an astronaut in a vintage space suit, surrounded by floating colorful flowers, retro film grain style, muted colors, dreamlike atmosphere, detailed helmet reflection.`,
    category: Category.Design,
    tags: ['vintage', 'astronaut', 'surreal', 'art'],
    author: 'CosmicTraveler',
    authorId: 'u1',
    likes: 320,
    uses: 88,
    createdAt: 'Feb 28, 2024',
    status: 'approved',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'p1',
    title: 'Python Data Science Tutor',
    description: 'A tutor that explains pandas and numpy concepts simply.',
    content: `Act as a Python Data Science tutor. Explain complex concepts in simple terms using metaphors. Always provide code snippets using pandas and numpy to illustrate your points.`,
    category: Category.Coding,
    tags: ['python', 'data-science'],
    author: 'John Doe',
    authorId: 'u1',
    likes: 0,
    uses: 0,
    createdAt: 'Mar 10, 2024',
    status: 'pending',
    type: 'text'
  }
];

function App() {
  // Global State
  const [templates, setTemplates] = useState<Template[]>(INITIAL_TEMPLATES);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [mcps, setMcps] = useState<FeaturedMCP[]>(INITIAL_MCPS);
  const [jobs, setJobs] = useState<FeaturedJob[]>(INITIAL_JOBS);
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState('');
  
  // Navigation State
  const [currentView, setCurrentView] = useState<AppView>('market');
  
  // UI State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedDetailItem, setSelectedDetailItem] = useState<FeaturedMCP | FeaturedJob | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // --- Google Analytics Effect ---
  useEffect(() => {
    if (googleAnalyticsId && !(window as any).dataLayer) {
      // Create script tag
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
      document.head.appendChild(script);

      // Initialize global GA function
      const inlineScript = document.createElement('script');
      inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${googleAnalyticsId}');
      `;
      document.head.appendChild(inlineScript);
    }
  }, [googleAnalyticsId]);

  // --- Auth Handlers ---
  const handleDemoLogin = (role: UserRole) => {
    const user = users.find(u => u.role === role);
    if (user) {
      setCurrentUser(user);
      if (role === 'admin') setCurrentView('admin');
      else setCurrentView('user');
    }
  };

  const handleFormLogin = (email: string) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      setCurrentView(user.role === 'admin' ? 'admin' : 'market');
    } else {
      alert('User not found. Try "admin@prompt101.com" or "john@example.com" or use the demo buttons.');
    }
  };

  const handleRegister = (name: string, email: string) => {
    const newUser: User = {
      id: `u${Date.now()}`,
      name,
      email,
      role: 'user',
      avatar: ''
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setCurrentView('user');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('market');
  };

  const handleLoginClick = () => {
    setCurrentView('auth');
  };

  // --- Data Logic ---
  const allApprovedTemplates = useMemo(() => {
    return templates.filter(t => t.status === 'approved').filter(template => {
      const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [templates, searchQuery, selectedCategory]);

  const textTemplates = allApprovedTemplates.filter(t => t.type !== 'image');
  const imageTemplates = allApprovedTemplates.filter(t => t.type === 'image');

  const userTemplates = useMemo(() => {
    if (!currentUser) return [];
    return templates.filter(t => t.authorId === currentUser.id);
  }, [templates, currentUser]);

  const categories = ['All', ...Object.values(Category)];

  // --- Actions ---
  const handleTemplateClick = (template: Template) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTemplate(null), 300);
  };

  const handleSaveNewTemplate = (newTemplate: Template) => {
    setTemplates(prev => [newTemplate, ...prev]);
    if (currentUser?.role === 'user') {
      setCurrentView('user');
    }
  };

  const handleApproveTemplate = (id: string) => {
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, status: 'approved' as const } : t));
  };

  const handleRejectTemplate = (id: string, comment: string) => {
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, status: 'rejected' as const, adminComment: comment } : t));
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
  };

  const handleOpenCreate = () => {
    if (!currentUser) {
      setCurrentView('auth');
      return;
    }
    setIsCreateModalOpen(true);
  };

  // --- Feature Section Handlers ---
  const handleMCPClick = (mcp: FeaturedMCP) => {
    setSelectedDetailItem(mcp);
    setCurrentView('detail-mcp');
  };

  const handleJobClick = (job: FeaturedJob) => {
    setSelectedDetailItem(job);
    setCurrentView('detail-job');
  };

  const handleAdminAddMCP = (mcp: FeaturedMCP) => {
    setMcps(prev => [...prev, mcp]);
  };

  const handleAdminUpdateMCP = (updatedMCP: FeaturedMCP) => {
    setMcps(prev => prev.map(m => m.id === updatedMCP.id ? updatedMCP : m));
  };

  const handleAdminDeleteMCP = (id: string) => {
    setMcps(prev => prev.filter(m => m.id !== id));
  };

  const handleAdminAddJob = (job: FeaturedJob) => {
    setJobs(prev => [...prev, job]);
  };

  const handleAdminUpdateJob = (updatedJob: FeaturedJob) => {
    setJobs(prev => prev.map(j => j.id === updatedJob.id ? updatedJob : j));
  };

  const handleAdminDeleteJob = (id: string) => {
    setJobs(prev => prev.filter(j => j.id !== id));
  };


  // --- Render Views ---

  if (currentView === 'auth') {
    return (
      <AuthPage 
        onDemoLogin={handleDemoLogin}
        onFormLogin={handleFormLogin}
        onRegister={handleRegister}
        onNavigateToMarket={() => setCurrentView('market')} 
      />
    );
  }

  const renderContent = () => {
    if (currentView === 'detail-mcp' && selectedDetailItem) {
      return (
        <DetailPage 
          item={selectedDetailItem} 
          type="mcp" 
          onBack={() => setCurrentView('market')} 
        />
      );
    }

    if (currentView === 'detail-job' && selectedDetailItem) {
      return (
        <DetailPage 
          item={selectedDetailItem} 
          type="job" 
          onBack={() => setCurrentView('market')} 
        />
      );
    }

    if (currentView === 'all-mcps') {
      return (
        <AllMCPsPage 
          mcps={mcps} 
          onMCPClick={handleMCPClick} 
          onBack={() => setCurrentView('market')} 
        />
      );
    }

    if (currentView === 'all-jobs') {
      return (
        <AllJobsPage 
          jobs={jobs} 
          onJobClick={handleJobClick} 
          onBack={() => setCurrentView('market')} 
        />
      );
    }

    if (currentView === 'admin' && currentUser?.role === 'admin') {
      return (
        <AdminDashboard 
          templates={templates} 
          users={users}
          mcps={mcps}
          jobs={jobs}
          googleAnalyticsId={googleAnalyticsId}
          onUpdateGAId={setGoogleAnalyticsId}
          onApprove={handleApproveTemplate}
          onReject={handleRejectTemplate}
          onDelete={handleDeleteTemplate}
          onAddMCP={handleAdminAddMCP}
          onUpdateMCP={handleAdminUpdateMCP}
          onDeleteMCP={handleAdminDeleteMCP}
          onAddJob={handleAdminAddJob}
          onUpdateJob={handleAdminUpdateJob}
          onDeleteJob={handleAdminDeleteJob}
        />
      );
    }

    if (currentView === 'user' && currentUser?.role === 'user') {
      return (
        <UserDashboard 
          templates={userTemplates}
          onTemplateClick={handleTemplateClick}
          onOpenCreate={handleOpenCreate}
        />
      );
    }

    // Default: Marketplace View
    return (
      <>
        {/* Hero / Intro */}
        <div className="mb-12 mt-4 text-center max-w-3xl mx-auto relative">
           <div className="absolute -top-20 -left-20 w-40 h-40 bg-neon/10 blur-[100px] rounded-full pointer-events-none"></div>
           <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
           
           <h1 className="text-4xl md:text-5xl font-tech font-bold text-white mb-6 tracking-tight uppercase glitch-effect relative inline-block">
            <span className="relative z-10">Prompt_Engineering_Matrix</span>
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon to-transparent opacity-50"></span>
          </h1>
          <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-xl mx-auto border-l border-zinc-800 pl-4 text-left font-mono">
            > Access high-fidelity command structures.<br/>
            > Enhance neural network output quality.<br/>
            > Browse decentralized knowledge base.
          </p>
        </div>

        {/* Featured Sections (MCPs & Jobs) */}
        <FeaturedSection 
          mcps={mcps} 
          jobs={jobs} 
          onMCPClick={handleMCPClick} 
          onJobClick={handleJobClick} 
          onViewAllMCPs={() => setCurrentView('all-mcps')}
          onViewAllJobs={() => setCurrentView('all-jobs')}
        />

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 sticky top-24 z-20 bg-black/80 backdrop-blur-md py-4 border-b border-zinc-800">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-sm text-xs font-bold font-mono uppercase tracking-wider whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? 'bg-neon text-black border-neon shadow-[0_0_15px_rgba(57,255,20,0.3)]'
                    : 'bg-black text-zinc-500 border-zinc-800 hover:border-neon/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">
             <span className="hidden md:inline flex items-center gap-2">
               <span className="w-2 h-2 bg-neon rounded-full animate-pulse"></span>
               System_Status: Online
             </span>
             <span className="text-zinc-700">|</span>
             <span>Entries: {allApprovedTemplates.length}</span>
             <div className="flex bg-zinc-900 rounded border border-zinc-800 p-0.5">
                <button className="p-1.5 bg-zinc-800 text-neon rounded-sm"><LayoutGrid size={14}/></button>
             </div>
          </div>
        </div>

        {/* Image Prompts Section */}
        {imageTemplates.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-bold text-white font-tech uppercase tracking-wide mb-6 flex items-center gap-2">
              <ImageIcon className="text-neon" size={20} />
              Visual Synthesis Protocols
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {imageTemplates.map(template => (
                <TemplateCard 
                  key={template.id} 
                  template={template} 
                  onClick={handleTemplateClick} 
                />
              ))}
            </div>
             <div className="my-10 border-t border-zinc-900"></div>
          </div>
        )}

        {/* Text Prompts Grid */}
        <div className="mb-8">
           <h3 className="text-sm font-bold text-zinc-500 font-mono uppercase tracking-widest mb-6">
              Text Command Protocols
            </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {textTemplates.length > 0 ? (
              textTemplates.map(template => (
                <TemplateCard 
                  key={template.id} 
                  template={template} 
                  onClick={handleTemplateClick} 
                />
              ))
            ) : (
              <div className="col-span-full text-center py-32 border border-dashed border-zinc-800 bg-zinc-900/20 rounded-lg">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 mb-6 neon-shadow">
                  <Filter className="text-zinc-600" size={32} />
                </div>
                <h3 className="text-xl font-tech font-bold text-white mb-2 uppercase tracking-wide">Signal Lost</h3>
                <p className="text-zinc-500 font-mono">No matching protocols found in the database.</p>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-black bg-grid-pattern relative overflow-x-hidden">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        onOpenCreate={handleOpenCreate}
        currentUser={currentUser}
        onLogin={handleLoginClick}
        onLogout={handleLogout}
        currentView={currentView}
        onChangeView={setCurrentView}
      />

      <main className="container mx-auto px-4 py-8 pb-20">
        {renderContent()}
      </main>

      <TemplateModal 
        template={selectedTemplate} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />

      <CreateTemplateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveNewTemplate}
        currentUser={currentUser}
      />
    </div>
  );
}

export default App;
