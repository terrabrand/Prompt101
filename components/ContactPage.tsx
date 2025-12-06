
import React, { useState } from 'react';
import { Send, ArrowLeft, Mail, MessageSquare, User as UserIcon } from 'lucide-react';

interface ContactPageProps {
  onBack: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
     return (
        <div className="max-w-2xl mx-auto py-20 text-center animate-in fade-in">
           <div className="w-20 h-20 bg-neon/10 border border-neon rounded-full flex items-center justify-center mx-auto mb-6">
              <Send size={32} className="text-neon" />
           </div>
           <h2 className="text-3xl font-tech font-bold text-white mb-4">Transmission Sent</h2>
           <p className="text-zinc-400 font-mono mb-8">Your signal has been received by our communication node. Expect a response within 24 cycles.</p>
           <button onClick={onBack} className="text-neon border-b border-neon pb-1 font-mono text-sm uppercase hover:text-white hover:border-white transition-colors">
              Return to Grid
           </button>
        </div>
     )
  }

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
       <button 
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-white mb-8 group transition-colors uppercase tracking-widest"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        Back_To_Main
      </button>

      <div className="border border-zinc-800 bg-zinc-950/50 p-8 md:p-12 relative overflow-hidden rounded-sm">
         <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
            <Mail size={120} className="text-neon" />
         </div>

         <h2 className="text-3xl font-tech font-bold text-white mb-2 uppercase">Advertise Protocol</h2>
         <p className="text-zinc-500 font-mono text-sm mb-10 max-w-lg">Initiate a partnership request. Provide detailed specifications of your product or service for review.</p>

         <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-[10px] font-bold text-zinc-500 mb-2 font-mono uppercase tracking-wider">Identity / Name</label>
                  <div className="relative group">
                     <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-neon transition-colors" size={16} />
                     <input required type="text" className="w-full pl-10 pr-4 py-3 bg-black border border-zinc-800 focus:border-neon focus:ring-1 focus:ring-neon outline-none text-white font-mono text-sm" placeholder="ENTER_NAME" />
                  </div>
               </div>
               <div>
                  <label className="block text-[10px] font-bold text-zinc-500 mb-2 font-mono uppercase tracking-wider">Comms_ID / Email</label>
                  <div className="relative group">
                     <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-neon transition-colors" size={16} />
                     <input required type="email" className="w-full pl-10 pr-4 py-3 bg-black border border-zinc-800 focus:border-neon focus:ring-1 focus:ring-neon outline-none text-white font-mono text-sm" placeholder="EMAIL@DOMAIN.COM" />
                  </div>
               </div>
            </div>
            
            <div>
               <label className="block text-[10px] font-bold text-zinc-500 mb-2 font-mono uppercase tracking-wider">Transmission Content</label>
               <div className="relative group">
                  <MessageSquare className="absolute left-3 top-4 text-zinc-600 group-focus-within:text-neon transition-colors" size={16} />
                  <textarea required className="w-full pl-10 pr-4 py-3 bg-black border border-zinc-800 focus:border-neon focus:ring-1 focus:ring-neon outline-none text-white font-mono text-sm min-h-[150px]" placeholder="ENTER_MESSAGE_DETAILS..." />
               </div>
            </div>

            <button type="submit" className="px-8 py-3 bg-neon hover:bg-white text-black font-bold font-mono text-xs uppercase tracking-wider transition-all neon-shadow flex items-center gap-2">
               <Send size={14} /> Send_Transmission
            </button>
         </form>
      </div>
    </div>
  );
}
