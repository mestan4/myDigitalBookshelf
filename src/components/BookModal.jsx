import React, { useState, useEffect } from 'react';
import { X, Star } from 'lucide-react';

export default function BookModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'Roman',
    status: 'Okunuyor',
    rating: 5,
    review: ''
  });

  // Eğer düzenleme modundaysak gelen verileri forma doldur, yoksa sıfırla
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: '',
        author: '',
        category: 'Roman',
        status: 'Okunuyor',
        rating: 5,
        review: ''
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.author.trim()) {
      alert('Lütfen kitap adı ve yazar alanlarını doldurun.');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        
        {/* Modal Başlığı */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <h3 className="text-base font-bold text-slate-100">
            {initialData ? 'Kitabı Düzenle' : 'Kitaplığına Yeni Eser Ekle'}
          </h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Alanı */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Kitap Adı *</label>
            <input
              type="text"
              required
              placeholder="Örn: Otostopçunun Galaksi Rehberi"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Yazar *</label>
            <input
              type="text"
              required
              placeholder="Örn: Douglas Adams"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Kategori / Tür</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 outline-none transition-colors"
              >
                <option value="Felsefe">Felsefe</option>
                <option value="Bilim Kurgu">Bilim Kurgu</option>
                <option value="Klasik">Klasik</option>
                <option value="Roman">Roman</option>
                <option value="Şiir">Şiir</option>
                <option value="Tarih / İnceleme">Tarih / İnceleme</option>
                <option value="Yazılım / Teknoloji">Yazılım / Teknoloji</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Okuma Durumu</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 outline-none transition-colors"
              >
                <option value="Okunuyor">Okunuyor</option>
                <option value="Bitti">Bitti</option>
                <option value="Okunacak">Okunacak</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Puanın (1 - 5)</label>
            <div className="flex items-center space-x-2 py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="cursor-pointer transition-transform hover:scale-110"
                >
                  <Star
                    size={22}
                    className={star <= formData.rating ? "text-amber-400 fill-amber-400" : "text-slate-700"}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Kişisel İnceleme / Not</label>
            <textarea
              rows="3"
              placeholder="Kitap hakkında aklında kalanlar, altını çizdiğin fikirler..."
              value={formData.review}
              onChange={(e) => setFormData({ ...formData, review: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 outline-none transition-colors resize-none"
            />
          </div>

          {/* Aksiyon Butonları */}
          <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              {initialData ? 'Değişiklikleri Kaydet' : 'Kitaplığa Ekle'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}