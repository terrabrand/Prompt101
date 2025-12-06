import React from 'react';
import { Template } from '../types';
import { TemplateCard } from './TemplateCard';
import { Plus, Database } from 'lucide-react';

interface UserDashboardProps {
  templates: Template[];
  onTemplateClick: (template: Template) => void;
  onOpenCreate: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ templates, onTemplateClick, onOpenCreate }) => {
  return (
    <div className="max-w-7xl mx-auto">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
          <div className="col-span-full py-24 bg-zinc-950/50 border border-zinc-800 border-dashed rounded-lg text-center">
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
  );
};