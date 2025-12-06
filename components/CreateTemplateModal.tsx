

import React, { useState } from 'react';
import { X, Send, AlertCircle, FileText, Tag, List, Type, Terminal, Image as ImageIcon, Code } from 'lucide-react';
import { Template, Category, User, TemplateType } from '../types';

interface CreateTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: Template) => void;
  currentUser: User | null;
}

export const CreateTemplateModal: React.FC<CreateTemplateModalProps> = ({ isOpen, onClose, onSave, currentUser }) => {
  const [templateType, setTemplateType] = useState<TemplateType>('text');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<Category | ''>('');
  const [tags, setTags] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!content.trim()) newErrors.content = 'Prompt content is required';
    if (!category) newErrors.category = 'Category is required';
    if (templateType === 'image' && !imageUrl.trim()) newErrors.imageUrl = 'Featured Image URL is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate() || !currentUser) return;

    const tagList = tags.split(',').map(t => t.trim()).filter(t => t.length > 0);

    const newTemplate: Template = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      content,
      category: category as Category,
      tags: tagList.length > 0 ? tagList : ['prompt'],
      author: currentUser.name,
      authorId: currentUser.id,
      authorAvatar: currentUser.avatar,
      likes: 0,
      uses: 0,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'pending',
      type: templateType,
      imageUrl: templateType === 'image' ? imageUrl : undefined
    };

    onSave(newTemplate);
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setContent('');
    setCategory('');
    setTags('');
    setImageUrl('');
    setTemplateType('text');
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      ></div>

      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 shadow-[0_0_40px_rgba(57,255,20,0.1)] flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/20">
          <div>
            <div className="flex items-center gap-2 mb-1">
               <Terminal size={16} className="text-neon" />
               <h2 className="text-lg font-mono font-bold text-white uppercase tracking-widest">Initialize_Template</h2>
            </div>
            <p className="text-zinc-500 text-xs font-mono">Submit new protocol for network approval</p>
          </div>
          <button onClick={handleClose} className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-sm transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar">
          <div className="space-y-6">

             {/* Type Selection */}
             <div className="flex gap-4 mb-6">
                <button 
                  onClick={() => setTemplateType('text')}
                  className={`flex-1 py-3 px-4 border rounded-sm flex items-center justify-center gap-2 transition-all ${templateType === 'text' ? 'bg-neon/10 border-neon text-neon' : 'bg-black border-zinc-800 text-zinc-500 hover:border-zinc-600'}`}
                >
                  <Code size={16} />
                  <span className="text-xs font-bold font-mono uppercase tracking-wider">Text Protocol</span>
                </button>
                <button 
                  onClick={() => setTemplateType('image')}
                  className={`flex-1 py-3 px-4 border rounded-sm flex items-center justify-center gap-2 transition-all ${templateType === 'image' ? 'bg-neon/10 border-neon text-neon' : 'bg-black border-zinc-800 text-zinc-500 hover:border-zinc-600'}`}
                >
                  <ImageIcon size={16} />
                  <span className="text-xs font-bold font-mono uppercase tracking-wider">Image Protocol</span>
                </button>
             </div>
            
            {/* Title & Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-2 font-mono uppercase tracking-wider flex items-center gap-2">
                  <Type size={12} className="text-neon"/> Title_ID
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Cyberpunk Cityscape"
                  className={`w-full px-4 py-3 bg-black border rounded-sm text-sm text-white font-mono placeholder-zinc-700 outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all ${errors.title ? 'border-red-500' : 'border-zinc-800'}`}
                />
                {errors.title && <span className="text-[10px] text-red-500 mt-1 font-mono uppercase">{errors.title}</span>}
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-2 font-mono uppercase tracking-wider flex items-center gap-2">
                  <List size={12} className="text-neon"/> Class_Type
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className={`w-full px-4 py-3 bg-black border rounded-sm text-sm text-white font-mono outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all appearance-none ${errors.category ? 'border-red-500' : 'border-zinc-800'}`}
                >
                  <option value="">SELECT_CLASS...</option>
                  {Object.values(Category).map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.category && <span className="text-[10px] text-red-500 mt-1 font-mono uppercase">{errors.category}</span>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-2 font-mono uppercase tracking-wider flex items-center gap-2">
                <FileText size={12} className="text-neon"/> Description_Meta
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe function parameters..."
                className={`w-full h-24 px-4 py-3 bg-black border rounded-sm text-sm text-white font-mono placeholder-zinc-700 outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all resize-none ${errors.description ? 'border-red-500' : 'border-zinc-800'}`}
              />
              {errors.description && <span className="text-[10px] text-red-500 mt-1 font-mono uppercase">{errors.description}</span>}
            </div>

            {/* Image URL if type is image */}
            {templateType === 'image' && (
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-2 font-mono uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon size={12} className="text-neon"/> Featured_Image_URL
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className={`w-full px-4 py-3 bg-black border rounded-sm text-sm text-white font-mono placeholder-zinc-700 outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all ${errors.imageUrl ? 'border-red-500' : 'border-zinc-800'}`}
                />
                {errors.imageUrl && <span className="text-[10px] text-red-500 mt-1 font-mono uppercase">{errors.imageUrl}</span>}
              </div>
            )}

            {/* Prompt Content */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-2 font-mono uppercase tracking-wider flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-neon shadow-[0_0_5px_#39ff14]"></div> {templateType === 'image' ? 'Image_Generation_Prompt' : 'Source_Code'}
              </label>
              <div className={`relative rounded-sm border transition-all overflow-hidden ${errors.content ? 'border-red-500' : 'border-zinc-800 focus-within:border-neon focus-within:ring-1 focus-within:ring-neon'}`}>
                <div className="absolute top-0 left-0 w-full h-6 bg-zinc-900 border-b border-zinc-800 flex items-center px-2 gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-zinc-600"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-zinc-600"></div>
                </div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="// Paste your full prompt sequence here..."
                  className="w-full h-48 p-4 pt-8 bg-black text-sm font-mono text-neon placeholder-zinc-800 outline-none resize-none"
                />
              </div>
              {errors.content && <span className="text-[10px] text-red-500 mt-1 font-mono uppercase">{errors.content}</span>}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-2 font-mono uppercase tracking-wider flex items-center gap-2">
                <Tag size={12} className="text-neon"/> Keywords <span className="text-zinc-600 font-normal lowercase">(comma_separated)</span>
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g. coding, python, debug"
                className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-sm text-sm text-white font-mono placeholder-zinc-700 outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-800 bg-zinc-900/30 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs text-yellow-600 bg-yellow-900/20 px-3 py-2 rounded border border-yellow-800/50 max-w-[60%]">
             <AlertCircle size={14} className="shrink-0"/>
             <span className="font-mono">WARNING: Submission requires admin verification.</span>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleClose}
              className="px-6 py-2.5 text-zinc-400 font-bold font-mono text-xs uppercase hover:text-white transition-colors tracking-wider"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-neon hover:bg-white text-black text-xs font-bold font-mono uppercase tracking-wider rounded-sm transition-all shadow-[0_0_15px_rgba(57,255,20,0.4)] flex items-center gap-2"
            >
              <Send size={14} />
              Execute
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};