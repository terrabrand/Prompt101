
import React, { useState, useEffect } from 'react';
import { Template, User, FeaturedMCP, FeaturedJob } from '../types';
import { Check, X, Trash2, LayoutDashboard, Users, AlertCircle, Activity, Briefcase, Box, Plus, Save, Edit2, RotateCcw, BarChart3, Globe, Zap } from 'lucide-react';

interface AdminDashboardProps {
  templates: Template[];
  users: User[];
  mcps?: FeaturedMCP[];
  jobs?: FeaturedJob[];
  googleAnalyticsId: string;
  onUpdateGAId: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string, comment: string) => void;
  onDelete: (id: string) => void;
  onAddMCP?: (mcp: FeaturedMCP) => void;
  onUpdateMCP?: (mcp: FeaturedMCP) => void;
  onDeleteMCP?: (id: string) => void;
  onAddJob?: (job: FeaturedJob) => void;
  onUpdateJob?: (job: FeaturedJob) => void;
  onDeleteJob?: (id: string) => void;
}

type AdminTab = 'overview' | 'users' | 'mcps' | 'jobs' | 'analytics';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  templates, 
  users, 
  mcps = [],
  jobs = [],
  googleAnalyticsId,
  onUpdateGAId,
  onApprove, 
  onReject, 
  onDelete,
  onAddMCP,
  onUpdateMCP,
  onDeleteMCP,
  onAddJob,
  onUpdateJob,
  onDeleteJob
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectComment, setRejectComment] = useState('');

  // Local state for forms
  const [newMCP, setNewMCP] = useState({ id: '', name: '', description: '', content: '', image: '' });
  const [editingMCPId, setEditingMCPId] = useState<string | null>(null);

  const [newJob, setNewJob] = useState({ id: '', title: '', company: '', location: '', type: 'Remote', description: '', content: '', salary: '', applyLink: '' });
  const [editingJobId, setEditingJobId] = useState<string | null>(null);

  const [gaIdInput, setGaIdInput] = useState(googleAnalyticsId);

  const pendingTemplates = templates.filter(t => t.status === 'pending');
  
  const handleRejectSubmit = (id: string) => {
    onReject(id, rejectComment);
    setRejectingId(null);
    setRejectComment('');
  };

  // --- GA Handler ---
  const handleSaveGA = () => {
    onUpdateGAId(gaIdInput);
  };

  // --- MCP Handlers ---
  const handleCreateOrUpdateMCP = () => {
    if (!newMCP.name || !newMCP.description) return;

    if (editingMCPId && onUpdateMCP) {
      onUpdateMCP({
        id: editingMCPId,
        name: newMCP.name,
        description: newMCP.description,
        content: newMCP.content || newMCP.description,
        logo: newMCP.name,
        image: newMCP.image
      });
      setEditingMCPId(null);
    } else if (onAddMCP) {
      onAddMCP({
        id: `mcp-${Date.now()}`,
        name: newMCP.name,
        description: newMCP.description,
        content: newMCP.content || newMCP.description,
        logo: newMCP.name,
        image: newMCP.image
      });
    }
    setNewMCP({ id: '', name: '', description: '', content: '', image: '' });
  };

  const handleEditMCP = (mcp: FeaturedMCP) => {
    setNewMCP({
      id: mcp.id,
      name: mcp.name,
      description: mcp.description,
      content: mcp.content,
      image: mcp.image || ''
    });
    setEditingMCPId(mcp.id);
  };

  const handleCancelEditMCP = () => {
    setEditingMCPId(null);
    setNewMCP({ id: '', name: '', description: '', content: '', image: '' });
  };

  // --- Job Handlers ---
  const handleCreateOrUpdateJob = () => {
    if (!newJob.title || !newJob.company) return;

    if (editingJobId && onUpdateJob) {
      onUpdateJob({
        id: editingJobId,
        title: newJob.title,
        company: newJob.company,
        location: newJob.location,
        type: newJob.type as any,
        description: newJob.description,
        content: newJob.content || newJob.description,
        logo: newJob.company,
        salary: newJob.salary,
        applyLink: newJob.applyLink
      });
      setEditingJobId(null);
    } else if (onAddJob) {
      onAddJob({
        id: `job-${Date.now()}`,
        title: newJob.title,
        company: newJob.company,
        location: newJob.location,
        type: newJob.type as any,
        description: newJob.description,
        content: newJob.content || newJob.description,
        logo: newJob.company,
        salary: newJob.salary,
        applyLink: newJob.applyLink
      });
    }
    setNewJob({ id: '', title: '', company: '', location: '', type: 'Remote', description: '', content: '', salary: '', applyLink: '' });
  };

  const handleEditJob = (job: FeaturedJob) => {
    setNewJob({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      description: job.description,
      content: job.content,
      salary: job.salary || '',
      applyLink: job.applyLink || ''
    });
    setEditingJobId(job.id);
  };

  const handleCancelEditJob = () => {
    setEditingJobId(null);
    setNewJob({ id: '', title: '', company: '', location: '', type: 'Remote', description: '', content: '', salary: '', applyLink: '' });
  };

  const SidebarItem = ({ id, icon: Icon, label }: { id: AdminTab, icon: any, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold font-mono uppercase tracking-wider rounded-sm transition-all border-l-2 ${
        activeTab === id 
          ? 'bg-zinc-900 text-neon border-neon' 
          : 'text-zinc-500 border-transparent hover:bg-zinc-900/50 hover:text-white'
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      
      {/* Sidebar */}
      <div className="w-full md:w-72 flex-shrink-0">
        <div className="bg-zinc-950/80 backdrop-blur rounded-sm border border-zinc-800 sticky top-24 overflow-hidden">
          <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
            <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono flex items-center gap-2">
              <Activity size={14} className="text-neon" />
              Command_Center
            </h2>
          </div>
          <div className="p-2 space-y-1">
            <SidebarItem id="overview" icon={LayoutDashboard} label="System_Overview" />
            <SidebarItem id="analytics" icon={BarChart3} label="Visitor_Analytics" />
            <SidebarItem id="users" icon={Users} label="User_Database" />
            <div className="my-2 border-t border-zinc-800"></div>
            <SidebarItem id="mcps" icon={Box} label="Manage_MCPs" />
            <SidebarItem id="jobs" icon={Briefcase} label="Manage_Jobs" />
          </div>

          <div className="p-4 mt-2">
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-sm">
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">Pending_Tasks</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-tech font-bold text-white">{pendingTemplates.length}</p>
                <Activity size={16} className="text-neon animate-pulse mb-1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="border-b border-zinc-800 pb-4">
              <h1 className="text-2xl font-tech font-bold text-white uppercase tracking-wide">Overview_Protocol</h1>
              <p className="text-zinc-500 text-sm font-mono mt-1">> Review incoming data streams and submissions.</p>
            </div>

            {/* Pending Reviews Section */}
            <div className="bg-zinc-950/50 border border-zinc-800 overflow-hidden shadow-lg">
              <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/20">
                <h3 className="font-bold text-white flex items-center gap-2 font-mono uppercase text-sm tracking-wider">
                  <AlertCircle size={16} className="text-yellow-500" />
                  Queued_For_Review
                </h3>
                <span className="bg-yellow-900/20 text-yellow-500 border border-yellow-700/50 text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase">
                  {pendingTemplates.length} In_Queue
                </span>
              </div>

              <div className="divide-y divide-zinc-800">
                {pendingTemplates.length === 0 ? (
                  <div className="p-16 text-center text-zinc-600">
                    <p className="font-mono text-sm uppercase">Queue Empty // System Idle</p>
                  </div>
                ) : (
                  pendingTemplates.map(template => (
                    <div key={template.id} className="p-6 hover:bg-zinc-900/30 transition-colors">
                      <div className="flex flex-col xl:flex-row gap-8">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold bg-zinc-800 text-zinc-300 border border-zinc-700 uppercase tracking-wider">
                              {template.category}
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-white mb-2 font-tech">{template.title}</h4>
                          <p className="text-sm text-zinc-400 mb-4 font-light">{template.description}</p>
                          <div className="bg-black border border-zinc-800 rounded-sm p-4 mb-4 relative overflow-hidden group">
                             <div className="absolute top-0 left-0 w-1 h-full bg-neon/50"></div>
                            <pre className="text-xs text-neon/80 whitespace-pre-wrap font-mono max-h-40 overflow-y-auto custom-scrollbar">
                              {template.content}
                            </pre>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                            <span className="font-bold text-zinc-300">USER_ID:</span> {template.author}
                          </div>
                        </div>

                        <div className="w-full xl:w-56 flex-shrink-0 flex flex-col gap-3">
                           {rejectingId === template.id ? (
                             <div className="bg-red-950/20 p-4 rounded-sm border border-red-900 animate-in fade-in slide-in-from-right-2">
                                <label className="block text-[10px] font-bold text-red-500 mb-2 uppercase tracking-wider font-mono">Rejection_Reason</label>
                                <textarea 
                                  value={rejectComment}
                                  onChange={(e) => setRejectComment(e.target.value)}
                                  className="w-full p-2 text-xs border border-red-900/50 rounded-sm mb-3 focus:outline-none focus:border-red-500 bg-black text-white font-mono"
                                  placeholder="// Enter reason..."
                                  autoFocus
                                />
                                <div className="flex gap-2">
                                  <button onClick={() => handleRejectSubmit(template.id)} disabled={!rejectComment.trim()} className="flex-1 py-2 bg-red-600 text-black text-xs font-bold uppercase rounded-sm">Commit</button>
                                  <button onClick={() => { setRejectingId(null); setRejectComment(''); }} className="flex-1 py-2 border border-red-900 text-red-500 text-xs font-bold uppercase rounded-sm">Abort</button>
                                </div>
                             </div>
                           ) : (
                             <>
                                <button onClick={() => onApprove(template.id)} className="w-full flex items-center justify-center gap-2 bg-neon hover:bg-white text-black py-2.5 rounded-sm text-xs font-bold font-mono uppercase tracking-wider transition-all neon-shadow"><Check size={14} /> Authorize</button>
                                <button onClick={() => setRejectingId(template.id)} className="w-full flex items-center justify-center gap-2 border border-zinc-700 hover:text-red-500 text-zinc-400 py-2.5 rounded-sm text-xs font-bold font-mono uppercase tracking-wider"><X size={14} /> Deny</button>
                                <button onClick={() => onDelete(template.id)} className="w-full flex items-center justify-center gap-2 text-zinc-600 hover:text-red-600 py-2 text-[10px] font-mono uppercase tracking-widest"><Trash2 size={12} /> Purge</button>
                             </>
                           )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="border-b border-zinc-800 pb-4">
              <h1 className="text-2xl font-tech font-bold text-white uppercase tracking-wide">Traffic_Surveillance</h1>
              <p className="text-zinc-500 text-sm font-mono mt-1">> Monitor network activity and user engagement.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Configuration Panel */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-sm">
                   <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-4 flex items-center gap-2">
                     <Globe size={16} className="text-neon" /> Configuration
                   </h3>
                   <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-500 mb-1 font-mono uppercase tracking-wider">Google Analytics Measurement ID</label>
                        <input 
                          type="text" 
                          value={gaIdInput}
                          onChange={(e) => setGaIdInput(e.target.value)}
                          placeholder="G-XXXXXXXXXX" 
                          className="w-full bg-black border border-zinc-800 p-3 text-sm font-mono text-white focus:border-neon outline-none"
                        />
                      </div>
                      <button 
                        onClick={handleSaveGA}
                        className="w-full bg-zinc-800 hover:bg-neon hover:text-black text-white text-xs font-bold font-mono uppercase py-3 rounded-sm transition-all"
                      >
                        {googleAnalyticsId ? 'Update_ID' : 'Initialize_Tracking'}
                      </button>
                      
                      {googleAnalyticsId && (
                        <div className="flex items-center gap-2 text-[10px] font-mono text-neon bg-neon/10 p-2 border border-neon/30 rounded-sm">
                          <div className="w-2 h-2 bg-neon rounded-full animate-pulse"></div>
                          System Active: Data stream established.
                        </div>
                      )}
                   </div>
                </div>

                <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-sm">
                  <h3 className="text-sm font-bold text-zinc-400 font-mono uppercase tracking-wider mb-2">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-zinc-500">Total Users</span>
                      <span className="text-white font-bold">{users.length}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-zinc-500">Active Templates</span>
                      <span className="text-white font-bold">{templates.filter(t => t.status === 'approved').length}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-zinc-500">Pending Review</span>
                      <span className="text-yellow-500 font-bold">{pendingTemplates.length}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visualization Panel */}
              <div className="lg:col-span-2">
                <div className="bg-black border border-zinc-800 p-6 rounded-sm h-full flex flex-col relative overflow-hidden">
                   {/* Background Grid */}
                   <div className="absolute inset-0 bg-[linear-gradient(rgba(57,255,20,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(57,255,20,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                   
                   <div className="relative z-10 flex justify-between items-start mb-8">
                      <div>
                        <h3 className="text-lg font-bold text-white font-tech uppercase">Live Traffic Feed</h3>
                        <p className="text-xs text-zinc-500 font-mono">Last 24 Hours Activity</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-mono">1H</span>
                        <span className="px-2 py-1 bg-neon/20 border border-neon text-[10px] text-neon font-mono">24H</span>
                        <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-mono">7D</span>
                      </div>
                   </div>

                   {/* Mock Chart Visualization */}
                   <div className="flex-1 flex items-end justify-between gap-2 relative z-10 min-h-[200px] pl-4 pb-4 border-l border-b border-zinc-800">
                      {[35, 42, 28, 45, 60, 55, 70, 65, 80, 75, 90, 85, 60, 50, 65, 75, 85, 95, 100, 90, 80, 70, 60, 55].map((height, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer">
                          <div 
                            className="bg-zinc-800 group-hover:bg-neon transition-colors duration-300 w-full rounded-t-sm relative"
                            style={{ height: `${height}%` }}
                          >
                             <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-neon opacity-0 group-hover:opacity-100 font-mono bg-black px-1 rounded border border-zinc-800">
                               {height * 12}
                             </div>
                          </div>
                        </div>
                      ))}
                   </div>
                   
                   {/* X Axis Labels */}
                   <div className="flex justify-between mt-2 text-[10px] text-zinc-600 font-mono pl-4">
                      <span>00:00</span>
                      <span>06:00</span>
                      <span>12:00</span>
                      <span>18:00</span>
                      <span>23:59</span>
                   </div>

                   {/* Decorative elements */}
                   <div className="absolute top-6 right-6 flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest">Live</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div className="space-y-8">
             <div className="border-b border-zinc-800 pb-4">
              <h1 className="text-2xl font-tech font-bold text-white uppercase tracking-wide">User_Registry</h1>
            </div>
            <div className="bg-zinc-950/50 border border-zinc-800 overflow-hidden shadow-lg">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-900/50 border-b border-zinc-800">
                      <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Identity</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Role</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Email</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-zinc-900/30">
                        <td className="px-6 py-4 font-mono text-sm text-zinc-300">{user.name}</td>
                        <td className="px-6 py-4 text-xs font-mono">{user.role}</td>
                        <td className="px-6 py-4 text-xs font-mono text-zinc-500">{user.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
          </div>
        )}

        {/* MCPs TAB */}
        {activeTab === 'mcps' && (
           <div className="space-y-8">
              <div className="border-b border-zinc-800 pb-4">
                <h1 className="text-2xl font-tech font-bold text-white uppercase tracking-wide">Manage_MCPs</h1>
              </div>

              {/* Add/Edit New Form */}
              <div className={`bg-zinc-900/30 border ${editingMCPId ? 'border-neon/50 bg-neon/5' : 'border-zinc-800'} p-6 rounded-sm transition-colors`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-sm font-bold ${editingMCPId ? 'text-neon' : 'text-white'} font-mono uppercase tracking-wider`}>
                    {editingMCPId ? 'Editing Protocol' : 'Add New Protocol'}
                  </h3>
                  {editingMCPId && (
                     <button onClick={handleCancelEditMCP} className="text-[10px] text-zinc-500 hover:text-white uppercase font-mono flex items-center gap-1">
                        <RotateCcw size={10}/> Cancel Edit
                     </button>
                  )}
                </div>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      placeholder="MCP Name" 
                      className="w-full bg-black border border-zinc-800 p-3 text-sm font-mono text-white focus:border-neon outline-none"
                      value={newMCP.name}
                      onChange={(e) => setNewMCP({...newMCP, name: e.target.value})}
                    />
                    <input 
                      placeholder="Image URL (e.g. https://...)" 
                      className="w-full bg-black border border-zinc-800 p-3 text-sm font-mono text-white focus:border-neon outline-none"
                      value={newMCP.image}
                      onChange={(e) => setNewMCP({...newMCP, image: e.target.value})}
                    />
                  </div>
                  <input 
                    placeholder="Short Description" 
                    className="w-full bg-black border border-zinc-800 p-3 text-sm font-mono text-white focus:border-neon outline-none"
                    value={newMCP.description}
                    onChange={(e) => setNewMCP({...newMCP, description: e.target.value})}
                  />
                  <textarea 
                    placeholder="Full Content / Details" 
                    className="w-full bg-black border border-zinc-800 p-3 text-sm font-mono text-white focus:border-neon outline-none h-24"
                    value={newMCP.content}
                    onChange={(e) => setNewMCP({...newMCP, content: e.target.value})}
                  />
                  <button onClick={handleCreateOrUpdateMCP} className="bg-neon text-black font-bold font-mono text-xs uppercase py-3 rounded-sm hover:bg-white transition-colors flex items-center justify-center gap-2">
                     {editingMCPId ? <Save size={14}/> : <Plus size={14}/>} {editingMCPId ? 'Save_Changes' : 'Create_MCP'}
                  </button>
                </div>
              </div>

              {/* List */}
              <div className="grid gap-4">
                 {mcps.map(mcp => (
                   <div key={mcp.id} className="bg-zinc-950 border border-zinc-800 p-4 flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 overflow-hidden flex items-center justify-center">
                          {mcp.image ? (
                            <img src={mcp.image} alt={mcp.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs font-bold text-white">{mcp.logo?.charAt(0) || 'M'}</span>
                          )}
                        </div>
                        <div>
                          <h4 className="text-white font-bold font-mono">{mcp.name}</h4>
                          <p className="text-xs text-zinc-500 font-mono">{mcp.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                         <button onClick={() => handleEditMCP(mcp)} className="text-zinc-600 hover:text-neon p-2"><Edit2 size={16}/></button>
                         <button onClick={() => onDeleteMCP && onDeleteMCP(mcp.id)} className="text-zinc-600 hover:text-red-500 p-2"><Trash2 size={16}/></button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        )}

        {/* JOBS TAB */}
        {activeTab === 'jobs' && (
           <div className="space-y-8">
              <div className="border-b border-zinc-800 pb-4">
                <h1 className="text-2xl font-tech font-bold text-white uppercase tracking-wide">Manage_Contracts</h1>
              </div>

              {/* Add/Edit Form */}
              <div className={`bg-zinc-900/30 border ${editingJobId ? 'border-neon/50 bg-neon/5' : 'border-zinc-800'} p-6 rounded-sm transition-colors`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-sm font-bold ${editingJobId ? 'text-neon' : 'text-white'} font-mono uppercase tracking-wider`}>
                    {editingJobId ? 'Editing Contract' : 'Add New Contract'}
                  </h3>
                   {editingJobId && (
                     <button onClick={handleCancelEditJob} className="text-[10px] text-zinc-500 hover:text-white uppercase font-mono flex items-center gap-1">
                        <RotateCcw size={10}/> Cancel Edit
                     </button>
                  )}
                </div>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                     <input 
                      placeholder="Job Title" 
                      className="w-full bg-black border border-zinc-800 p-3 text-sm font-mono text-white focus:border-neon outline-none"
                      value={newJob.title}
                      onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                    />
                     <input 
                      placeholder="Company" 
                      className="w-full bg-black border border-zinc-800 p-3 text-sm font-mono text-white focus:border-neon outline-none"
                      value={newJob.company}
                      onChange={(e) => setNewJob({...newJob, company: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <input 
                      placeholder="Location" 
                      className="w-full bg-black border border-zinc-800 p-3 text-sm font-mono text-white focus:border-neon outline-none"
                      value={newJob.location}
                      onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                    />
                    <select 
                      className="w-full bg-black border border-zinc-800 p-3 text-sm font-mono text-white focus:border-neon outline-none"
                      value={newJob.type}
                      onChange={(e) => setNewJob({...newJob, type: e.target.value})}
                    >
                      <option value="Remote">Remote</option>
                      <option value="On-site">On-site</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <input 
                      placeholder="Salary Range (e.g. $120k - $150k) [Optional]" 
                      className="w-full bg-black border border-zinc-800 p-3 text-sm font-mono text-white focus:border-neon outline-none placeholder-zinc-700"
                      value={newJob.salary}
                      onChange={(e) => setNewJob({...newJob, salary: e.target.value})}
                    />
                     <input 
                      placeholder="External Apply Link [Optional]" 
                      className="w-full bg-black border border-zinc-800 p-3 text-sm font-mono text-white focus:border-neon outline-none placeholder-zinc-700"
                      value={newJob.applyLink}
                      onChange={(e) => setNewJob({...newJob, applyLink: e.target.value})}
                    />
                  </div>
                  
                  <input 
                    placeholder="Short Description" 
                    className="w-full bg-black border border-zinc-800 p-3 text-sm font-mono text-white focus:border-neon outline-none"
                    value={newJob.description}
                    onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                  />
                  <textarea 
                    placeholder="Full Job Description" 
                    className="w-full bg-black border border-zinc-800 p-3 text-sm font-mono text-white focus:border-neon outline-none h-24"
                    value={newJob.content}
                    onChange={(e) => setNewJob({...newJob, content: e.target.value})}
                  />
                  <button onClick={handleCreateOrUpdateJob} className="bg-neon text-black font-bold font-mono text-xs uppercase py-3 rounded-sm hover:bg-white transition-colors flex items-center justify-center gap-2">
                     {editingJobId ? <Save size={14}/> : <Plus size={14}/>} {editingJobId ? 'Save_Changes' : 'Create_Contract'}
                  </button>
                </div>
              </div>

               {/* List */}
               <div className="grid gap-4">
                 {jobs.map(job => (
                   <div key={job.id} className="bg-zinc-950 border border-zinc-800 p-4 flex justify-between items-center">
                      <div>
                        <h4 className="text-white font-bold font-mono">{job.title}</h4>
                        <p className="text-xs text-zinc-500 font-mono">{job.company} - {job.type}</p>
                      </div>
                      <div className="flex gap-2">
                         <button onClick={() => handleEditJob(job)} className="text-zinc-600 hover:text-neon p-2"><Edit2 size={16}/></button>
                         <button onClick={() => onDeleteJob && onDeleteJob(job.id)} className="text-zinc-600 hover:text-red-500 p-2"><Trash2 size={16}/></button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        )}

      </div>
    </div>
  );
};
