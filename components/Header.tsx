
import React from 'react';
import { Search, Plus, LogOut, LayoutDashboard, Terminal } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenCreate: () => void;
  currentUser: User | null;
  onLogin: () => void;
  onLogout: () => void;
  currentView: string;
  onChangeView: (view: any) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  onOpenCreate, 
  currentUser, 
  onLogin, 
  onLogout,
  currentView,
  onChangeView
}) => {
  const handleDashboardClick = () => {
    if (currentUser?.role === 'admin') {
      onChangeView('admin');
    } else {
      onChangeView('user');
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-zinc-800 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button onClick={() => onChangeView('market')} className="group flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-zinc-900 border border-neon/30 text-neon p-2 rounded group-hover:neon-shadow transition-all duration-300">
              <Terminal size={24} />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xl font-tech font-bold text-white tracking-widest uppercase">Prompt 101</span>
              <span className="text-[10px] text-neon tracking-[0.2em] uppercase">System v2.1</span>
            </div>
          </button>

          {/* Navigation Links */}
          {currentUser && (
            <nav className="hidden md:flex items-center gap-2">
              <button
                onClick={() => onChangeView('market')}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded border transition-all duration-300 ${
                  currentView === 'market' 
                    ? 'bg-neon/10 border-neon text-neon neon-shadow' 
                    : 'border-transparent text-zinc-500 hover:text-white hover:bg-zinc-900'
                }`}
              >
                Market_Data
              </button>
            </nav>
          )}
        </div>

        {currentView === 'market' && (
          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-neon transition-colors" size={16} />
            <input
              type="text"
              placeholder="SEARCH_DIRECTORIES..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-zinc-900/50 border border-zinc-800 text-white placeholder-zinc-600 rounded-full text-xs font-mono focus:border-neon focus:ring-1 focus:ring-neon focus:bg-black transition-all outline-none"
            />
          </div>
        )}

        <div className="flex items-center gap-4">
          {currentUser ? (
            <>
               <button 
                  onClick={handleDashboardClick}
                  className={`flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-bold font-mono uppercase tracking-wider transition-all border ${
                     currentView === 'admin' || currentView === 'user'
                     ? 'bg-zinc-800 text-white border-zinc-600'
                     : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-600'
                  }`}
                >
                  <LayoutDashboard size={14} />
                  Dashboard
                </button>

              {(currentUser.role === 'user' || currentUser.role === 'admin') && (
                <button 
                  onClick={onOpenCreate}
                  className="hidden sm:flex items-center gap-2 bg-neon text-black px-5 py-2 rounded-sm text-xs font-bold font-mono tracking-wider hover:bg-white transition-colors neon-shadow"
                >
                  <Plus size={14} strokeWidth={3} />
                  NEW_ENTRY
                </button>
              )}
              
              <div className="flex items-center gap-4 pl-4 border-l border-zinc-800">
                <div className="w-10 h-10 rounded bg-zinc-900 border border-zinc-700 flex items-center justify-center text-neon font-bold font-mono shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                  {currentUser.name.charAt(0)}
                </div>
                <button 
                  onClick={onLogout}
                  className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                  title="Disconnect"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button 
                onClick={onLogin}
                className="flex items-center gap-2 text-xs font-bold font-mono text-black bg-neon hover:bg-white px-6 py-2.5 rounded-sm transition-colors neon-shadow"
              >
                <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                CONNECT
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
