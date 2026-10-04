import React from 'react';
import { Star, Trash2, Edit3, CheckCircle2, Clock, Bookmark } from 'lucide-react';

export default function BookCard({ book, onDelete, onEdit }) {
  // kitabın okunma durumlarına göre ikonlar
  const statusConfig = {
    'Bitti': {
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      icon: <CheckCircle2 size={14} className="mr-1" />
    },
    'Okunuyor': {
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      icon: <Clock size={14} className="mr-1" />
    },
    'Okunacak': {
      badge: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      icon: <Bookmark size={14} className="mr-1" />
    }
  };

  const currentStatus = statusConfig[book.status] || statusConfig['Okunacak'];

  return (
    <article className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/20">
      <div>
        {/* Üst Kısım: Tür ve Durum Rozeti */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-medium text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/50">
            {book.category}
          </span>
          <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${currentStatus.badge}`}>
            {currentStatus.icon}
            {book.status}
          </span>
        </div>

        {/* Kitap ismi ve Yazar */}
        <h3 className="text-lg font-bold text-slate-100 line-clamp-1 mb-1" title={book.title}>
          {book.title}
        </h3>
        <p className="text-sm font-medium text-indigo-300 mb-3">
          {book.author}
        </p>

        {/* puanı */}
        <div className="flex items-center space-x-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={16}
              className={star <= book.rating ? "text-amber-400 fill-amber-400" : "text-slate-700"}
            />
          ))}
          <span className="text-xs font-medium text-slate-400 ml-1.5">
            {book.rating}/5
          </span>
        </div>

        {/* varsa review */}
        {book.review && (
          <p className="text-xs text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60 italic line-clamp-3 mb-4">
            "{book.review}"
          </p>
        )}
      </div>

      {/* Alt Kısım: Tarih ve Eylemler (Düzenle / Sil) */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span>Eklenme: {book.addedAt || 'Bugün'}</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(book)}
            className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Düzenle"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => onDelete(book.id)}
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Sil"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}