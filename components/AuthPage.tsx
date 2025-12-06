import React, { useState } from 'react';
import { UserRole } from '../types';
import { ShieldCheck, User as UserIcon, ArrowRight, Mail, Lock, UserPlus, Terminal, Cpu } from 'lucide-react';

interface AuthPageProps {
  onDemoLogin: (role: UserRole) => void;
  onFormLogin: (email: string) => void;
  onRegister: (name: string, email: string) => void;
  onNavigateToMarket: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onDemoLogin, onFormLogin, onRegister, onNavigateToMarket }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      if (name && email) onRegister(name, email);
    } else {
      if (email) onFormLogin(email);
    }
  };

  return (
    <div className="min-h-screen bg-black bg-grid-pattern flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="mb-10 text-center cursor-pointer z-10" onClick={onNavigateToMarket}>
        <div className="flex flex-col items-center gap-2 mb-4 group">
          <div className="bg-black border border-neon text-neon p-4 rounded-sm neon-shadow group-hover:bg-neon group-hover:text-black transition-all duration-500">
            <Terminal size={32} />
          </div>
          <span className="text-4xl font-tech font-bold text-white tracking-widest uppercase mt-4">Prompt<span className="text-neon"> 101</span></span>
        </div>
        <p className="text-zinc-500 font-mono text-xs tracking-[0.3em] uppercase">Secure Access Portal v2.4</p>
      </div>

      <div className="bg-zinc-950/80 backdrop-blur-xl w-full max-w-md rounded-sm border border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden z-10 relative">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon to-transparent"></div>

        {/* Tabs */}
        <div className="flex border-b border-zinc-800 bg-zinc-900/50">
          <button 
            className={`flex-1 py-4 text-xs font-bold font-mono uppercase tracking-wider transition-all ${!isRegister ? 'text-neon border-b-2 border-neon bg-zinc-900' : 'text-zinc-500 hover:text-white hover:bg-zinc-900'}`}
            onClick={() => setIsRegister(false)}
          >
            Identify
          </button>
          <button 
            className={`flex-1 py-4 text-xs font-bold font-mono uppercase tracking-wider transition-all ${isRegister ? 'text-neon border-b-2 border-neon bg-zinc-900' : 'text-zinc-500 hover:text-white hover:bg-zinc-900'}`}
            onClick={() => setIsRegister(true)}
          >
            Register_New
          </button>
        </div>

        <div className="p-8">
          <h2 className="text-lg font-bold text-white mb-6 font-mono uppercase flex items-center gap-2">
            <Cpu size={18} className="text-zinc-600"/> 
            {isRegister ? 'Initialize User Protocol' : 'Enter Credentials'}
          </h2>

          <form className="space-y-5 mb-8" onSubmit={handleSubmit}>
            {isRegister && (
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 mb-1 font-mono uppercase tracking-wider">Designation / Name</label>
                <div className="relative group">
                  <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-neon transition-colors" size={16} />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-black border border-zinc-800 rounded-sm focus:border-neon focus:ring-1 focus:ring-neon outline-none transition-all text-white font-mono text-sm placeholder-zinc-800" 
                    placeholder="ENTER_NAME" 
                    required={isRegister}
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 mb-1 font-mono uppercase tracking-wider">Comms_ID / Email</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-neon transition-colors" size={16} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black border border-zinc-800 rounded-sm focus:border-neon focus:ring-1 focus:ring-neon outline-none transition-all text-white font-mono text-sm placeholder-zinc-800" 
                  placeholder="USER@DOMAIN.COM" 
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 mb-1 font-mono uppercase tracking-wider">Passcode</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-neon transition-colors" size={16} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black border border-zinc-800 rounded-sm focus:border-neon focus:ring-1 focus:ring-neon outline-none transition-all text-white font-mono text-sm placeholder-zinc-800" 
                  placeholder="••••••••" 
                  required
                />
              </div>
            </div>
            <button className="w-full bg-neon hover:bg-white text-black py-3 rounded-sm font-bold font-mono uppercase tracking-wider transition-all neon-shadow mt-4">
              {isRegister ? 'Execute_Registration' : 'Authenticate'}
            </button>
          </form>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-zinc-950 text-zinc-500 font-mono uppercase tracking-widest">Bypass_Protocols</span>
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => onDemoLogin('admin')}
              className="w-full flex items-center justify-between px-4 py-3 border border-zinc-800 bg-zinc-900/30 hover:border-purple-500 hover:bg-purple-900/20 rounded-sm group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-zinc-900 border border-zinc-700 text-purple-400 rounded-sm">
                  <ShieldCheck size={16} />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white font-mono uppercase">Admin_Root</p>
                  <p className="text-[10px] text-zinc-500 font-mono">Full system control</p>
                </div>
              </div>
              <ArrowRight size={14} className="text-zinc-600 group-hover:text-purple-400 transition-colors" />
            </button>

            <button 
              onClick={() => onDemoLogin('user')}
              className="w-full flex items-center justify-between px-4 py-3 border border-zinc-800 bg-zinc-900/30 hover:border-blue-500 hover:bg-blue-900/20 rounded-sm group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-zinc-900 border border-zinc-700 text-blue-400 rounded-sm">
                  <UserIcon size={16} />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white font-mono uppercase">Standard_User</p>
                  <p className="text-[10px] text-zinc-500 font-mono">Read/Write access</p>
                </div>
              </div>
              <ArrowRight size={14} className="text-zinc-600 group-hover:text-blue-400 transition-colors" />
            </button>
          </div>
        </div>
      </div>
      
      <button onClick={onNavigateToMarket} className="mt-8 text-zinc-600 hover:text-neon text-xs font-mono uppercase tracking-widest transition-colors">
        &larr; Return to Grid
      </button>
    </div>
  );
};