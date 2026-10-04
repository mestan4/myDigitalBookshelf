import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BookCard from './components/BookCard';
import BookModal from './components/BookModal';
import { Search, Filter, BookOpen } from 'lucide-react';

export default function App() {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('my_digital_bookshelf');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        title: 'Kendime Düşünceler',
        author: 'Marcus Aurelius',
        category: 'Felsefe',
        status: 'Bitti',
        rating: 5,
        review: 'Zihinsel dayanıklılık, dinginlik ve iç sınırları korumak üzerine kılavuz bir eser.',
        addedAt: '2026-09-15'
      }
    ];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Hepsi');

  useEffect(() => {
    localStorage.setItem('my_digital_bookshelf', JSON.stringify(books));
  }, [books]);

  // CREATE & UPDATE (Ekleme ve Güncelleme)
  const handleSaveBook = (bookData) => {
    if (editingBook) {
      setBooks(books.map(b => b.id === editingBook.id ? { ...bookData, id: b.id } : b));
      setEditingBook(null);
    } else {
      const newBook = {
        ...bookData,
        id: Date.now().toString(),
        addedAt: new Date().toISOString().split('T')[0]
      };
      setBooks([newBook, ...books]);
    }
  };

  // DELETE (Silme)
  const handleDeleteBook = (id) => {
    if (window.confirm('Bu eseri kitaplığınızdan silmek istediğinize emin misiniz?')) {
      setBooks(books.filter(b => b.id !== id));
    }
  };

  // EDIT MODAL TETİKLEME
  const handleEditClick = (book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  // Filtreleme mantığı
  const filteredBooks = books.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'Hepsi' || b.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar 
        onOpenAddModal={() => { setEditingBook(null); setIsModalOpen(true); }}
        totalBooks={books.length}
        readBooks={books.filter(b => b.status === 'Bitti').length}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        
        {/* Filtre ve Arama Alanı */}
        <section className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Kitap veya yazar ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 outline-none transition-colors"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-slate-500 hidden sm:block" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 outline-none cursor-pointer"
            >
              <option value="Hepsi">Tüm Kategoriler</option>
              <option value="Felsefe">Felsefe</option>
              <option value="Bilim Kurgu">Bilim Kurgu</option>
              <option value="Klasik">Klasik</option>
              <option value="Roman">Roman</option>
              <option value="Şiir">Şiir</option>
              <option value="Tarih / İnceleme">Tarih / İnceleme</option>
              <option value="Yazılım / Teknoloji">Yazılım / Teknoloji</option>
            </select>
          </div>
        </section>

        {/* Kitap Kartları Izgarası (Grid) */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredBooks.map(book => (
              <BookCard 
                key={book.id} 
                book={book} 
                onDelete={handleDeleteBook}
                onEdit={handleEditClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800">
            <BookOpen size={40} className="mx-auto text-slate-600 mb-3" />
            <h4 className="text-base font-semibold text-slate-300">Henüz eşleşen bir kitap bulunamadı</h4>
            <p className="text-xs text-slate-500 mt-1">Arama filtrenizi değiştirebilir veya yeni bir kitap ekleyebilirsiniz.</p>
          </div>
        )}
      </main>

      {/* CRUD Modalı */}
      <BookModal 
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingBook(null); }}
        onSave={handleSaveBook}
        initialData={editingBook}
      />
    </div>
  );
}