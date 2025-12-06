
import React from 'react';
import { FeaturedMCP, FeaturedJob } from '../types';
import { ArrowLeft, Share2, Briefcase, Globe, MapPin, Box, Terminal, Cpu, Building, DollarSign, ExternalLink } from 'lucide-react';

interface DetailPageProps {
  item: FeaturedMCP | FeaturedJob;
  type: 'mcp' | 'job';
  onBack: () => void;
}

export const DetailPage: React.FC<DetailPageProps> = ({ item, type, onBack }) => {
  const isJob = type === 'job';
  
  // Type guards for safe property access
  const getJob = () => item as FeaturedJob;
  const getMCP = () => item as FeaturedMCP;

  const handleApply = () => {
    if (isJob && getJob().applyLink) {
      window.open(getJob().applyLink, '_blank', 'noopener,noreferrer');
    } else {
      // Fallback behavior if no link
      alert('Application portal access requested. (No external link configured)');
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Back Navigation */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-white mb-8 group transition-colors uppercase tracking-widest"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        Return_To_Grid
      </button>

      <div className="bg-zinc-950/80 border border-zinc-800 rounded-sm overflow-hidden relative">
        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon to-transparent opacity-50"></div>
        
        <div className="p-8 md:p-12">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row gap-8 mb-10 border-b border-zinc-800 pb-10">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-zinc-900 border border-zinc-700 flex items-center justify-center text-3xl font-bold font-mono text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] flex-shrink-0 overflow-hidden">
               {isJob ? (
                 getJob().logo ? getJob().logo?.charAt(0) : <Briefcase />
               ) : (
                 getMCP().image ? (
                   <img src={getMCP().image} alt={getMCP().name} className="w-full h-full object-cover" />
                 ) : (
                   getMCP().logo ? getMCP().logo?.charAt(0) : <Box />
                 )
               )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                 <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border rounded-sm ${isJob ? 'bg-blue-900/20 text-blue-400 border-blue-900' : 'bg-purple-900/20 text-purple-400 border-purple-900'}`}>
                    {isJob ? 'Job_Contract' : 'MCP_Protocol'}
                 </span>
                 {isJob && (
                   <span className="text-[10px] font-mono text-neon flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-neon rounded-full animate-pulse"></div> Active
                   </span>
                 )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-tech font-bold text-white mb-4">
                {isJob ? getJob().title : getMCP().name}
              </h1>
              
              {isJob ? (
                <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <Building size={14} className="text-zinc-600"/> {getJob().company}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-zinc-600"/> {getJob().location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Globe size={14} className="text-zinc-600"/> {getJob().type}
                  </div>
                  {getJob().salary && (
                    <div className="flex items-center gap-1.5 text-neon">
                      <DollarSign size={14} /> {getJob().salary}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-sm text-zinc-400 font-mono">
                  {getMCP().description}
                </div>
              )}
            </div>

            <div className="flex md:flex-col gap-3">
              <button 
                onClick={isJob ? handleApply : undefined}
                className="flex-1 md:flex-none px-6 py-3 bg-neon hover:bg-white text-black font-bold font-mono text-xs uppercase tracking-wider rounded-sm transition-all shadow-[0_0_15px_rgba(57,255,20,0.3)] flex items-center justify-center gap-2"
              >
                {isJob ? 'Apply_Now' : 'Install_Protocol'}
                {isJob && getJob().applyLink && <ExternalLink size={14} />}
              </button>
              <button className="px-4 py-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white rounded-sm transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-lg font-bold text-white font-mono uppercase tracking-wider mb-4 flex items-center gap-2">
                   <Terminal size={18} className="text-neon" /> Details & Specifications
                </h3>
                <div className="prose prose-invert prose-sm max-w-none text-zinc-400 font-light leading-relaxed">
                   {/* Simulating rich text with whitespace preservation */}
                   <p className="whitespace-pre-wrap">{isJob ? getJob().content : getMCP().content}</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
               <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-sm">
                  <h4 className="text-xs font-bold text-white font-mono uppercase tracking-widest mb-4">System_Metadata</h4>
                  <div className="space-y-3">
                     <div className="flex justify-between text-xs font-mono">
                        <span className="text-zinc-500">ID_REF</span>
                        <span className="text-zinc-300">{item.id}</span>
                     </div>
                     <div className="flex justify-between text-xs font-mono">
                        <span className="text-zinc-500">VERIFIED</span>
                        <span className="text-neon">TRUE</span>
                     </div>
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-zinc-500">LAST_UPDATE</span>
                        <span className="text-zinc-300">2023-11-14</span>
                     </div>
                  </div>
               </div>

               {isJob && (
                 <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-sm">
                    <h4 className="text-xs font-bold text-white font-mono uppercase tracking-widest mb-4">Tech_Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'TypeScript', 'AI', 'Node.js'].map(tag => (
                        <span key={tag} className="px-2 py-1 bg-black border border-zinc-800 text-[10px] text-zinc-400 font-mono uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                 </div>
               )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};