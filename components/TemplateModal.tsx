

import React, { useState } from 'react';
import { Template } from '../types';
import { X, Copy, Check, Share2, Bookmark, ImageIcon } from 'lucide-react';

interface TemplateModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TemplateModal: React.FC<TemplateModalProps> = ({ template, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !template) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(template.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const isImagePrompt = template.type === 'image' && template.imageUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-4xl bg-zinc-950/90 border border-zinc-800 shadow-[0_0_50px_rgba(57,255,20,0.1)] flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Decorative corner lines */}
        <div className="absolute top-0 left-0 w-20 h-[1px] bg-gradient-to-r from-neon to-transparent"></div>
        <div className="absolute top-0 left-0 w-[1px] h-20 bg-gradient-to-b from-neon to-transparent"></div>

        {/* Modal Header */}
        <div className="flex items-start justify-between p-8 border-b border-zinc-800">
          <div className="flex-1 mr-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 text-xs font-mono font-bold bg-neon/10 text-neon border border-neon/30 uppercase tracking-widest">
                {template.category}
              </span>
               {isImagePrompt && (
                   <span className="px-3 py-1 text-xs font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30 uppercase tracking-widest flex items-center gap-1">
                     <ImageIcon size={12}/> Visual_Protocol
                   </span>
               )}
              <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">// ID: {template.id}</span>
            </div>
            <h2 className="text-3xl font-tech font-bold text-white tracking-wide">{template.title}</h2>
            <p className="text-zinc-400 mt-2 text-lg font-light">{template.description}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-sm hover:bg-zinc-900 text-zinc-500 hover:text-white transition-colors border border-transparent hover:border-zinc-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
          
          <div className="flex flex-col lg:flex-row gap-8">
             <div className="flex-1 space-y-4">
                 <div className="relative group">
                    <div className="absolute right-4 top-4 flex gap-2 z-10">
                      <button 
                        onClick={handleCopy}
                        className={`flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-mono font-bold uppercase tracking-wider transition-all border ${
                          copied 
                            ? 'bg-neon text-black border-neon' 
                            : 'bg-black/50 text-neon border-neon/50 hover:bg-neon/10 hover:border-neon backdrop-blur-md'
                        }`}
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? 'COPIED_TO_CLIPBOARD' : 'COPY_SOURCE'}
                      </button>
                    </div>
                    
                    <div className="w-full bg-black border border-zinc-800 rounded-sm relative overflow-hidden">
                       {/* Terminal Header */}
                       <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/50 border-b border-zinc-800">
                          <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                            <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                          </div>
                          <span className="text-[10px] font-mono text-zinc-500 uppercase">prompt_source.txt</span>
                       </div>
                       
                       <pre className="p-6 text-sm text-zinc-300 whitespace-pre-wrap font-mono overflow-x-auto leading-relaxed selection:bg-neon/30 selection:text-white">
                          <span className="text-neon block mb-4">root@prompt101:~$ cat prompt.txt</span>
                          {template.content}
                          <span className="text-neon inline-block mt-4 animate-pulse">_</span>
                       </pre>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-xs font-bold text-zinc-500 mb-3 uppercase tracking-widest font-mono">Tags / Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {template.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono hover:border-neon hover:text-neon transition-colors cursor-default uppercase">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
             </div>

             {isImagePrompt && (
               <div className="w-full lg:w-1/3">
                  <div className="sticky top-0">
                     <h4 className="text-xs font-bold text-zinc-500 mb-3 uppercase tracking-widest font-mono flex items-center gap-2">
                        <ImageIcon size={14} className="text-neon"/> Output_Preview
                     </h4>
                     <div className="border border-zinc-800 rounded-sm overflow-hidden bg-black relative group">
                        <img src={template.imageUrl} alt="Result Preview" className="w-full h-auto object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                           <span className="text-[10px] font-mono text-white bg-black/50 px-2 py-1 rounded backdrop-blur">Sample Output</span>
                        </div>
                     </div>
                  </div>
               </div>
             )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-zinc-800 bg-zinc-900/30 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-neon font-bold font-mono overflow-hidden">
               {template.authorAvatar ? (
                  <img src={template.authorAvatar} alt={template.author} className="w-full h-full object-cover" />
               ) : (
                  template.author.charAt(0)
               )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white font-mono uppercase">{template.author}</span>
              <span className="text-[10px] text-zinc-500 font-mono tracking-widest">AUTHOR_ID: {template.authorId}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="p-2 text-zinc-500 hover:text-neon hover:bg-neon/10 rounded-sm border border-transparent hover:border-neon/30 transition-colors">
              <Share2 size={20} />
            </button>
             <button className="p-2 text-zinc-500 hover:text-neon hover:bg-neon/10 rounded-sm border border-transparent hover:border-neon/30 transition-colors">
              <Bookmark size={20} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};