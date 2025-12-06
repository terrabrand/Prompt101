
import React from 'react';
import { ExampleApp } from '../types';
import { ArrowLeft, Github, ExternalLink, Code } from 'lucide-react';

interface ExampleAppsPageProps {
  apps: ExampleApp[];
  onBack: () => void;
}

export const ExampleAppsPage: React.FC<ExampleAppsPageProps> = ({ apps, onBack }) => {
  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-zinc-800 pb-6 gap-4">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-white mb-4 group transition-colors uppercase tracking-widest"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back_To_Main
          </button>
          <h2 className="text-3xl font-tech font-bold text-white mb-2 uppercase tracking-tight">Example Applications</h2>
          <p className="text-zinc-500 font-mono text-sm">> Reference implementations and open source projects.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {apps.map(app => (
            <div key={app.id} className="group bg-zinc-950 border border-zinc-800 hover:border-neon/50 transition-all rounded-sm overflow-hidden flex flex-col h-full">
               {app.imageUrl ? (
                  <div className="h-48 bg-zinc-900 border-b border-zinc-800 overflow-hidden relative">
                     <div className="absolute inset-0 bg-neon/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay"></div>
                     <img src={app.imageUrl} alt={app.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
               ) : (
                  <div className="h-48 bg-zinc-900 border-b border-zinc-800 flex items-center justify-center text-zinc-700 group-hover:text-neon transition-colors">
                     <Code size={48} />
                  </div>
               )}
               
               <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white font-tech mb-2 group-hover:text-neon transition-colors">{app.name}</h3>
                  <p className="text-sm text-zinc-500 font-mono mb-6 line-clamp-3">{app.description}</p>
                  
                  <div className="mt-auto flex gap-3">
                     <a href={app.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 border border-zinc-700 hover:border-white text-zinc-400 hover:text-white text-xs font-bold font-mono uppercase rounded-sm transition-colors">
                        <Github size={14} /> Source
                     </a>
                     {app.demoUrl && (
                        <a href={app.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 bg-zinc-900 hover:bg-neon hover:text-black text-zinc-300 text-xs font-bold font-mono uppercase rounded-sm transition-colors">
                           <ExternalLink size={14} /> Live_Demo
                        </a>
                     )}
                  </div>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};
