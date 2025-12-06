
import React from 'react';
import { User, Template } from '../types';
import { TemplateCard } from './TemplateCard';
import { ArrowLeft, User as UserIcon, Mail, Shield, Grid } from 'lucide-react';

interface UserProfilePageProps {
  userId: string;
  users: User[];
  templates: Template[];
  onBack: () => void;
  onTemplateClick: (template: Template) => void;
}

export const UserProfilePage: React.FC<UserProfilePageProps> = ({ userId, users, templates, onBack, onTemplateClick }) => {
  const user = users.find(u => u.id === userId);
  const userTemplates = templates.filter(t => t.authorId === userId && t.status === 'approved');

  if (!user) {
    return (
        <div className="max-w-7xl mx-auto py-20 text-center">
            <h2 className="text-xl font-mono text-red-500">USER_NOT_FOUND</h2>
            <button onClick={onBack} className="mt-4 text-zinc-500 hover:text-white uppercase font-mono text-xs">Return to Grid</button>
        </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
       <button 
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-white mb-8 group transition-colors uppercase tracking-widest"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        Back_To_Main
      </button>

      {/* Profile Header */}
      <div className="bg-zinc-950/50 border border-zinc-800 p-8 rounded-sm mb-12 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
         {/* Background accent */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-neon/5 blur-[100px] rounded-full pointer-events-none"></div>

         <div className="w-32 h-32 rounded-full bg-zinc-900 border-2 border-zinc-800 overflow-hidden flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] flex-shrink-0 relative z-10">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <UserIcon size={48} className="text-zinc-700" />
            )}
         </div>
         
         <div className="flex-1 text-center md:text-left relative z-10">
            <h1 className="text-3xl font-tech font-bold text-white mb-2 tracking-wide">{user.name}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-6">
               <span className="flex items-center gap-2 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
                 <Shield size={12} className={user.role === 'admin' ? 'text-neon' : 'text-zinc-600'} /> 
                 {user.role}
               </span>
               <span className="flex items-center gap-2 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
                 <Mail size={12} /> {user.email}
               </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-lg mx-auto md:mx-0">
               <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                  <div className="text-lg font-bold text-white font-mono">{userTemplates.length}</div>
                  <div className="text-[10px] text-zinc-500 uppercase font-mono">Protocols</div>
               </div>
                <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                  <div className="text-lg font-bold text-white font-mono">{userTemplates.reduce((acc, t) => acc + t.likes, 0)}</div>
                  <div className="text-[10px] text-zinc-500 uppercase font-mono">Reputation</div>
               </div>
            </div>
         </div>
      </div>

      <div className="flex items-center gap-2 mb-6 border-b border-zinc-800 pb-4">
         <Grid size={16} className="text-neon" />
         <h3 className="text-lg font-tech font-bold text-white uppercase tracking-wide">Published Protocols</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {userTemplates.length > 0 ? (
           userTemplates.map(template => (
             <TemplateCard 
               key={template.id} 
               template={template} 
               onClick={onTemplateClick}
             />
           ))
        ) : (
           <div className="col-span-full py-16 text-center border border-dashed border-zinc-800 rounded-sm bg-zinc-900/20">
              <p className="text-zinc-500 font-mono uppercase tracking-wider">No public protocols found in this node.</p>
           </div>
        )}
      </div>
    </div>
  );
};
