import React from 'react';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans text-white bg-slate-900">

      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1763753743258-18170f65dd55?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
      >
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]"></div>
      </div>

      {/* Main Content Centered */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8 animate-fade-in">
        
        {/* Glitchy 404 Text */}
        <div className="relative">
          <h1 className="relative text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-black via-gray-500 to-white sm:text-[12rem] drop-shadow-[0_0_35px_rgba(0,0,0,1)]">
            
            {/* Glitch layers */}
            <span className="absolute inset-0 text-black opacity-30 -translate-x-1 animate-pulse">404</span>
            <span className="absolute inset-0 text-white opacity-30 translate-x-1 animate-pulse delay-75">404</span>
            404
          </h1>
        </div>

        {/* Subtitle */}
        <h2 className="mt-2 text-3xl font-bold tracking-widest text-white uppercase sm:text-4xl text-shadow-neon">
          Page Not Found
        </h2>
        <div className="mt-4 h-1 w-24 bg-linear-to-r from-black to-white rounded-full shadow-[0_0_10px_rgba(0,0,0,0.8)]"></div>

        {/* Description Paragraph */}
        <p className="mt-8 max-w-lg text-lg leading-relaxed text-slate-300 font-light tracking-wide">
          The system cannot locate the sector you are looking for. 
          It may have been purged from the mainframe or drifted into the digital void.
        </p>

        {/* Back Button */}
        <div className="mt-12">
          <button 
            onClick={() => navigate("/")}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold tracking-wider text-white uppercase transition-all duration-300 bg-transparent border-2 border-black rounded-none hover:bg-gray-500/10 hover:shadow-[0_0_30px_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <Home className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
            <span className="group-hover:text-white">Return to Base</span>
            
            {/* Corner decorations for button */}
            <span className="absolute -top-1 -left-1 h-3 w-3 border-t-2 border-l-2 border-white"></span>
            <span className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-white"></span>
          </button>
        </div>
      </div>

      {/* CSS Animations & Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        /* Custom text shadow for that neon glow feel */
        .text-shadow-neon {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 
                       0 0 20px rgba(168, 85, 247, 0.3);
        }
      `}</style>
    </div>
  );
};

export default NotFound;