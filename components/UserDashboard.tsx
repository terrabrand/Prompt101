
import React, { useState } from 'react';
import { Template, User } from '../types';
import { TemplateCard } from './TemplateCard';
import { Plus, Database, Settings, Save, User as UserIcon } from 'lucide-react';

interface UserDashboardProps {
  templates: Template[];
  onTemplateClick: (template: Template) => void;
  onOpenCreate: () => void;
  currentUser: User;
  onUpdateUser: (user: User) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ templates, onTemplateClick, onOpenCreate, currentUser, onUpdateUser }) => {
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = () => {
    setIsSaving(true);
    onUpdateUser({
      ...currentUser,
      avatar: avatarUrl
    });
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-zinc-800 pb-6 gap-4">
        <div>
          <h2 className="text-3xl font-tech font-bold text-white mb-2 uppercase tracking-tight">Personal_Node</h2>
          <p className="text-zinc-500 font-mono text-sm">> Manage your contributions to the network.</p>
        </div>
        <button 
            onClick={onOpenCreate}
            className="flex items-center gap-2 bg-neon text-black px-6 py-2.5 rounded-sm text-xs font-bold font-mono uppercase tracking-wider hover:bg-white transition-all neon-shadow"
          >
            <Plus size={14} strokeWidth={3} />
            <span>New_Submission</span>
          </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Profile Settings Panel */}
         <div className="lg:col-span-1">
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-sm sticky top-24">
               <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-6 flex items-center gap-2">
                 <Settings size={16} className="text-neon" /> Profile_Settings
               </h3>
               
               <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-black border-2 border-zinc-800 overflow-hidden flex items-center justify-center">
                     {avatarUrl ? (
                        <img src={avatarUrl} alt="Preview" className="w-full h-full object-cover" />
                     ) : (
                        <UserIcon size={32} className="text-zinc-700" />
                     )}
                  </div>
               </div>

               <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 mb-2 font-mono uppercase tracking-wider">Avatar Image URL</label>
                    <input 
                      type="text" 
                      value={avatarUrl}
                      onChange={(e) => setAvatarUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-black border border-zinc-800 p-3 text-sm font-mono text-white focus:border-neon outline-none rounded-sm placeholder-zinc-800"
                    />
                  </div>
                  <div className="bg-zinc-900/50 p-3 border border-zinc-800 rounded-sm">
                      <div className="flex justify-between text-xs font-mono mb-1">
                         <span className="text-zinc-500">Designation</span>
                         <span className="text-white">{currentUser.name}</span>
                      </div>
                      <div className="flex justify-between text-xs font-mono">
                         <span className="text-zinc-500">Comms_ID</span>
                         <span className="text-zinc-400">{currentUser.email}</span>
                      </div>
                  </div>
                  <button 
                    onClick={handleSaveProfile}
                    className="w-full bg-zinc-800 hover:bg-white hover:text-black text-white py-2 rounded-sm text-xs font-bold font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <Save size={14} /> {isSaving ? 'Updating...' : 'Save_Profile'}
                  </button>
               </div>
            </div>
         </div>

         {/* Templates Grid */}
         <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-zinc-500 font-mono uppercase tracking-wider mb-6 flex items-center gap-2">
              <Database size={16} /> My_Protocols
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {templates.length > 0 ? (
                templates.map(template => (
                  <TemplateCard 
                    key={template.id} 
                    template={template} 
                    onClick={onTemplateClick} 
                    showStatus={true}
                  />
                ))
              ) : (
                <div className="col-span-full py-20 bg-zinc-950/50 border border-zinc-800 border-dashed rounded-lg text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900/50 border border-zinc-800 mb-6 text-zinc-600">
                    <Database size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-mono uppercase tracking-wider">Memory Banks Empty</h3>
                  <p className="text-zinc-500 mb-8 font-mono text-sm">Initialize your first prompt protocol.</p>
                  <button 
                    onClick={onOpenCreate}
                    className="inline-flex items-center gap-2 text-neon font-bold font-mono text-xs uppercase tracking-wider hover:text-white transition-colors border-b border-neon hover:border-white pb-0.5"
                  >
                    Start_Sequence &rarr;
                  </button>
                </div>
              )}
            </div>
         </div>
      </div>
    </div>
  );
};
