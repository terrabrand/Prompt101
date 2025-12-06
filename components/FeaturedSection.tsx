
import React from 'react';
import { FeaturedMCP, FeaturedJob } from '../types';
import { ArrowRight, Briefcase, Cpu, Globe, MapPin, Box } from 'lucide-react';

interface FeaturedSectionProps {
  mcps: FeaturedMCP[];
  jobs: FeaturedJob[];
  onMCPClick: (mcp: FeaturedMCP) => void;
  onJobClick: (job: FeaturedJob) => void;
  onViewAllMCPs: () => void;
  onViewAllJobs: () => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({ 
  mcps, 
  jobs, 
  onMCPClick, 
  onJobClick,
  onViewAllMCPs,
  onViewAllJobs
}) => {
  // Only show a subset on the homepage
  const displayedMCPs = mcps.slice(0, 5);
  const displayedJobs = jobs.slice(0, 4);

  return (
    <div className="space-y-12 mb-12">
      
      {/* Featured MCPs Section */}
      {mcps.length > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-end mb-6 border-b border-zinc-900 pb-2">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest font-mono">Featured Protocols (MCPs)</h3>
            <button 
              onClick={onViewAllMCPs}
              className="text-[10px] text-zinc-600 font-mono flex items-center gap-1 cursor-pointer hover:text-neon transition-colors uppercase tracking-wider"
            >
              VIEW_ALL <ArrowRight size={10} />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {displayedMCPs.map(mcp => (
              <button
                key={mcp.id}
                onClick={() => onMCPClick(mcp)}
                className="group flex items-center gap-4 pl-3 pr-6 py-3 bg-zinc-900/50 border border-zinc-800 hover:border-neon/50 rounded-full transition-all hover:bg-zinc-900 neon-shadow-hover"
              >
                {/* Scaled up icon container */}
                <div className="w-10 h-10 rounded-full bg-black border border-zinc-700 flex items-center justify-center overflow-hidden group-hover:border-neon transition-colors">
                  {mcp.image ? (
                    <img src={mcp.image} alt={mcp.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold text-white group-hover:text-neon">
                      {mcp.logo ? mcp.logo.charAt(0) : <Box size={16}/>}
                    </span>
                  )}
                </div>
                {/* Scaled up text */}
                <span className="text-sm font-bold text-zinc-300 font-mono group-hover:text-white">{mcp.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Featured Jobs Section */}
      {jobs.length > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          <div className="flex justify-between items-end mb-4 border-b border-zinc-900 pb-2">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest font-mono">Open Contracts (Jobs)</h3>
             <button 
              onClick={onViewAllJobs}
              className="text-[10px] text-zinc-600 font-mono flex items-center gap-1 cursor-pointer hover:text-neon transition-colors uppercase tracking-wider"
            >
              VIEW_ALL <ArrowRight size={10} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayedJobs.map(job => (
              <div 
                key={job.id}
                className="group relative bg-zinc-950 border border-zinc-800 p-5 hover:border-zinc-600 transition-all cursor-pointer overflow-hidden"
                onClick={() => onJobClick(job)}
              >
                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={16} className="text-neon -rotate-45" />
                </div>

                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded flex items-center justify-center text-white font-bold font-mono group-hover:border-neon/30 transition-colors">
                     {job.logo ? job.logo.charAt(0) : <Briefcase size={16} />}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono mb-1 uppercase tracking-wider">
                    <span>{job.company}</span>
                    <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
                    <span className={job.type === 'Remote' ? 'text-neon' : ''}>{job.type}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-mono group-hover:text-neon transition-colors line-clamp-1">
                    {job.title}
                  </h4>
                </div>

                <p className="text-xs text-zinc-500 line-clamp-2 mb-4 h-8">
                  {job.description}
                </p>

                <div className="mt-auto pt-3 border-t border-zinc-900 flex justify-between items-center">
                  <button className="text-[10px] font-bold bg-zinc-900 text-zinc-400 px-3 py-1.5 rounded-sm group-hover:bg-zinc-800 group-hover:text-white transition-colors uppercase tracking-wider">
                    View_Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
