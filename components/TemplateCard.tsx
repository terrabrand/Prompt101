

import React, { useState } from 'react';
import { Template } from '../types';
import { Heart, Clock, CheckCircle, XCircle, Copy, Check, Terminal, ImageIcon } from 'lucide-react';

interface TemplateCardProps {
  template: Template;
  onClick: (template: Template) => void;
  showStatus?: boolean;
  onAuthorClick?: (userId: string) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onClick, showStatus = false, onAuthorClick }) => {
  const [copied, setCopied] = useState(false);
  const isImagePrompt = template.type === 'image' && template.imageUrl;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(template.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAuthorClick = (e: React.MouseEvent) => {
    if (onAuthorClick) {
      e.stopPropagation();
      onAuthorClick(template.authorId);
    }
  };

  const getStatusBadge = () => {
    switch (template.status) {
      case 'pending':
        return (
          <div className="absolute top-0 right-0 z-10 bg-yellow-900/80 border-b border-l border-yellow-500 text-yellow-500 text-[10px] font-mono uppercase tracking-wider px-3 py-1 flex items-center gap-2">
            <Clock size={10} /> PENDING
          </div>
        );
      case 'rejected':
        return (
          <div className="absolute top-0 right-0 z-10 bg-red-900/80 border-b border-l border-red-500 text-red-500 text-[10px] font-mono uppercase tracking-wider px-3 py-1 flex items-center gap-2">
            <XCircle size={10} /> REJECTED
          </div>
        );
      case 'approved':
        return showStatus ? (
           <div className="absolute top-0 right-0 z-10 bg-neon/10 border-b border-l border-neon text-neon text-[10px] font-mono uppercase tracking-wider px-3 py-1 flex items-center gap-2">
            <CheckCircle size={10} /> VERIFIED
          </div>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div 
      onClick={() => onClick(template)}
      className="group relative flex flex-col h-full cursor-pointer transition-all duration-300"
    >
      {/* Corner Brackets */}
      <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-zinc-700 group-hover:border-neon transition-colors z-20"></div>
      <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-zinc-700 group-hover:border-neon transition-colors z-20"></div>
      <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-zinc-700 group-hover:border-neon transition-colors z-20"></div>
      <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-zinc-700 group-hover:border-neon transition-colors z-20"></div>

      <div className={`relative flex flex-col h-full bg-zinc-900/40 backdrop-blur-md border border-zinc-800 group-hover:border-zinc-700 group-hover:bg-zinc-900/60 overflow-hidden`}>
        {showStatus && getStatusBadge()}

        {/* Featured Image for Image Prompts */}
        {isImagePrompt && (
          <div className="w-full h-48 relative overflow-hidden border-b border-zinc-800">
             <div className="absolute inset-0 bg-neon/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors"></div>
             <img src={template.imageUrl} alt={template.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
             <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur border border-zinc-700 px-2 py-1 rounded-sm z-20">
                <span className="text-[10px] font-mono text-white flex items-center gap-1"><ImageIcon size={10} className="text-neon"/> IMG_PROTOCOL</span>
             </div>
          </div>
        )}

        <div className="p-6 flex flex-col flex-1 relative">
             {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_2px,3px_100%] opacity-20"></div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="inline-flex items-center px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-700 text-zinc-400 group-hover:text-neon group-hover:border-neon/50 transition-colors">
                  <Terminal size={10} className="mr-1.5" />
                  {template.category}
                </span>
                {template.status === 'approved' && !showStatus && (
                  <div className="flex items-center text-zinc-500 text-xs gap-3 font-mono">
                    <span className="flex items-center gap-1 group-hover:text-neon transition-colors">
                      <Heart size={12} className={template.likes > 50 ? "fill-current" : ""} /> {template.likes}
                    </span>
                  </div>
                )}
              </div>

              <h3 className="text-lg font-tech font-bold text-white mb-2 line-clamp-1 group-hover:text-neon transition-colors tracking-wide">
                {template.title}
              </h3>
              
              <p className="text-zinc-500 text-sm mb-6 line-clamp-2 flex-grow leading-relaxed">
                {template.description}
              </p>

              {template.status === 'rejected' && template.adminComment && (
                 <div className="mb-4 p-2 bg-red-950/30 border border-red-900 rounded-sm text-xs text-red-400 font-mono">
                   <strong className="text-red-500">ROOT_USER_MSG:</strong> {template.adminComment}
                 </div>
              )}

              <div className="mt-auto pt-4 border-t border-zinc-800 flex items-center justify-between">
                <button 
                  onClick={handleAuthorClick}
                  className={`flex items-center gap-2 text-xs text-zinc-500 font-mono transition-colors ${onAuthorClick ? 'hover:text-neon hover:underline' : ''}`}
                >
                  <div className={`w-5 h-5 rounded-full overflow-hidden flex items-center justify-center text-[10px] font-bold border border-zinc-700 ${
                    template.author === 'You' ? 'bg-neon text-black border-neon' : 'bg-black text-zinc-400'
                  }`}>
                    {template.authorAvatar ? (
                      <img src={template.authorAvatar} alt={template.author} className="w-full h-full object-cover" />
                    ) : (
                      template.author.charAt(0)
                    )}
                  </div>
                  <span className="uppercase">{template.author}</span>
                </button>
                
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                     {template.tags.slice(0, 2).map(tag => (
                       <span key={tag} className="text-[10px] text-zinc-600 px-1 font-mono group-hover:text-neon/70 transition-colors">
                         #{tag}
                       </span>
                     ))}
                  </div>
                  <button 
                    onClick={handleCopy}
                    className={`p-1.5 rounded transition-colors z-20 relative border ${
                      copied 
                        ? 'bg-neon/20 border-neon text-neon' 
                        : 'bg-black border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500'
                    }`}
                    title="Copy prompt"
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};