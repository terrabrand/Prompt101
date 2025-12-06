
import React from 'react';
import { FeaturedJob } from '../types';
import { ArrowLeft, ArrowRight, Briefcase, MapPin, Building, Globe } from 'lucide-react';

interface AllJobsPageProps {
  jobs: FeaturedJob[];
  onJobClick: (job: FeaturedJob) => void;
  onBack: () => void;
}

export const AllJobsPage: React.FC<AllJobsPageProps> = ({ jobs, onJobClick, onBack }) => {
  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-zinc-800 pb-6 gap-4">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-white mb-4 group transition-colors uppercase tracking-widest"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back_To_Main
          </button>
          <h2 className="text-3xl font-tech font-bold text-white mb-2 uppercase tracking-tight">Open Contract Database</h2>
          <p className="text-zinc-500 font-mono text-sm">> Active recruitment signals and opportunities.</p>
        </div>
        <div className="text-right hidden md:block">
           <span className="text-xs font-mono text-neon bg-neon/10 px-3 py-1 rounded-sm border border-neon/20">
             ACTIVE_CONTRACTS: {jobs.length}
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {jobs.map(job => (
          <div 
            key={job.id}
            className="group relative bg-zinc-950 border border-zinc-800 p-6 hover:border-neon/50 transition-all cursor-pointer overflow-hidden flex flex-col h-full rounded-sm"
            onClick={() => onJobClick(job)}
          >
            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight size={18} className="text-neon -rotate-45" />
            </div>

            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded flex items-center justify-center text-white text-lg font-bold font-mono group-hover:border-neon/30 group-hover:text-neon transition-colors shadow-lg">
                 {job.logo ? job.logo.charAt(0) : <Briefcase size={20} />}
              </div>
            </div>

            <div className="mb-4">
               <h4 className="text-lg font-bold text-white font-mono group-hover:text-neon transition-colors line-clamp-1 mb-2">
                {job.title}
              </h4>
              <div className="flex flex-col gap-1.5 text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                <div className="flex items-center gap-2">
                   <Building size={12}/> {job.company}
                </div>
                 <div className="flex items-center gap-2">
                   <MapPin size={12}/> {job.location}
                </div>
                <div className="flex items-center gap-2">
                    <Globe size={12} className={job.type === 'Remote' ? 'text-neon' : ''} /> 
                    <span className={job.type === 'Remote' ? 'text-neon' : ''}>{job.type}</span>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-zinc-900">
               <p className="text-xs text-zinc-500 line-clamp-2 mb-4 h-8 leading-relaxed">
                  {job.description}
                </p>
              <button className="w-full text-[10px] font-bold bg-zinc-900 text-zinc-400 py-2.5 rounded-sm group-hover:bg-neon group-hover:text-black transition-all uppercase tracking-wider neon-shadow-hover">
                Access_Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
