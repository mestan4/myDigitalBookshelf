import React from 'react'; 
import { BookOpen, PlusCircle } from 'lucide-react';


// üstteki menü yani navbar
export default function Navbar({ onOpenAddModal, totalBooks, readBooks }) {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* sol taraf; logo ve isim */}
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-md shadow-indigo-500/20">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100 tracking-tight">
              myDigital<span className="text-indigo-400">Bookshelf</span>
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              Kişisel Okuma & İnceleme Takipçisi
            </p>
          </div>
        </div>

        {/* sağ taraf; kitap istatistikleri ve kitap ekleme alanı */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-3 text-xs font-medium text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/60">
            <span>Toplam: <strong className="text-indigo-400">{totalBooks}</strong></span>
            <span className="text-slate-600">|</span>
            <span>Bitti: <strong className="text-emerald-400">{readBooks}</strong></span>
          </div>

        {/* kitap ekleme fonksiyonunun butonu */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-md shadow-indigo-600/25 cursor-pointer active:scale-95"
          >
            <PlusCircle size={18} />
            <span>Kitap Ekle</span>
          </button>
        </div>

      </div>
    </header>
  );
}