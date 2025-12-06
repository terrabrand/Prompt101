
import React from 'react';
import { FeaturedMCP } from '../types';
import { ArrowLeft, Box } from 'lucide-react';

interface AllMCPsPageProps {
  mcps: FeaturedMCP[];
  onMCPClick: (mcp: FeaturedMCP) => void;
  onBack: () => void;
}

export const AllMCPsPage: React.FC<AllMCPsPageProps> = ({ mcps, onMCPClick, onBack }) => {
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
          <h2 className="text-3xl font-tech font-bold text-white mb-2 uppercase tracking-tight">System Protocol Registry</h2>
          <p className="text-zinc-500 font-mono text-sm">> Full database of available Model Context Protocols.</p>
        </div>
        <div className="text-right hidden md:block">
           <span className="text-xs font-mono text-neon bg-neon/10 px-3 py-1 rounded-sm border border-neon/20">
             TOTAL_ENTRIES: {mcps.length}
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mcps.map(mcp => (
          <button
            key={mcp.id}
            onClick={() => onMCPClick(mcp)}
            className="group flex items-start gap-4 p-6 bg-zinc-950 border border-zinc-800 hover:border-neon/50 rounded-sm transition-all hover:bg-zinc-900 text-left relative overflow-hidden"
          >
            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-zinc-800 group-hover:border-neon/30 transition-colors"></div>

            <div className="w-12 h-12 rounded-full bg-black border border-zinc-700 flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:border-neon transition-colors">
              {mcp.image ? (
                <img src={mcp.image} alt={mcp.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-lg font-bold text-white group-hover:text-neon">
                  {mcp.logo ? mcp.logo.charAt(0) : <Box size={20}/>}
                </span>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
               <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-white font-mono group-hover:text-neon transition-colors mb-2 truncate pr-2">
                    {mcp.name}
                  </h3>
               </div>
               <p className="text-sm text-zinc-500 font-mono line-clamp-2 leading-relaxed group-hover:text-zinc-400 transition-colors">
                 {mcp.description}
               </p>
               <div className="mt-4 flex items-center gap-2 text-[10px] text-zinc-600 uppercase font-bold tracking-widest group-hover:text-neon transition-colors">
                  <span>View_Protocol</span>
                  <div className="h-[1px] flex-1 bg-zinc-800 group-hover:bg-neon/30"></div>
               </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
