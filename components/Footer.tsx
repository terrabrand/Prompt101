
import React from 'react';
import { AppView } from '../types';

interface FooterProps {
  onChangeView: (view: AppView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onChangeView }) => {
  return (
    <footer className="border-t border-zinc-800 bg-black py-12 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
           <h4 className="text-xl font-tech font-bold text-white uppercase tracking-widest mb-2">Prompt 101</h4>
           <p className="text-xs text-zinc-500 font-mono">System v2.1 // Authorized Access Only</p>
        </div>
        
        <div className="flex gap-8 text-sm font-mono uppercase tracking-wider">
           <button onClick={() => onChangeView('example-apps')} className="text-zinc-400 hover:text-neon transition-colors">
             Example_Apps
           </button>
           <button onClick={() => onChangeView('contact')} className="text-zinc-400 hover:text-neon transition-colors">
             Advertise_Here
           </button>
        </div>
        
        <div className="text-xs text-zinc-600 font-mono">
           &copy; {new Date().getFullYear()} Prompt Matrix. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
