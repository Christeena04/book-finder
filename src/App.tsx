import { useState } from 'react';

export default function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  const searchBooks = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError('');
    setBooks([]);
    
    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${query}`);
      const data = await response.json();
      
      if (data.docs && data.docs.length > 0) {
        setBooks(data.docs.slice(0, 20));
      } else {
        setError('No books found. Try a different search term.');
      }
    } catch (err) {
      setError('Error fetching data. Please try again.');
    }
    
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchBooks();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80" 
            alt="Books"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/90"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
              Discover Your Next
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Great Read
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Search through millions of books from the Open Library collection
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative">
              <div className="flex bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
                <div className="flex items-center pl-6 text-slate-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search by book title, author, or ISBN..."
                  className="flex-1 px-6 py-6 text-lg text-slate-900 focus:outline-none"
                />
                <button
                  onClick={searchBooks}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-6 font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    'Search'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

        

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <p className="mt-6 text-slate-600 text-lg font-medium">Searching our library...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-sm">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="ml-3">
                  <p className="text-red-800 font-medium">{error}</p>
                  <p className="text-red-700 text-sm mt-1">Please try another search term or check your connection.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State - Show when no search has been made */}
        {!loading && !error && books.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-3xl mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80" 
                alt="Library"
                className="w-full h-64 object-cover rounded-2xl shadow-xl mb-8"
              />
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Start Your Literary Journey</h2>
              <p className="text-slate-600 text-lg mb-8">
                Enter a book title above to explore millions of books from around the world
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <button 
                  onClick={() => { setQuery('Harry Potter'); searchBooks(); }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-lg transition font-medium"
                >
                  Harry Potter
                </button>
                <button 
                  onClick={() => { setQuery('The Hobbit'); searchBooks(); }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-lg transition font-medium"
                >
                  The Hobbit
                </button>
                <button 
                  onClick={() => { setQuery('Pride and Prejudice'); searchBooks(); }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-lg transition font-medium"
                >
                  Jane Austen
                </button>
                <button 
                  onClick={() => { setQuery('1984'); searchBooks(); }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-lg transition font-medium"
                >
                  1984
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Grid */}
        {books.length > 0 && (
          <div className="w-full">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Search Results</h2>
                <p className="text-slate-600 mt-1">
                  Found <span className="font-semibold text-blue-600">{books.length}</span> books matching "{query}"
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {books.map((book, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedBook(book)}
                  className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1 border border-slate-200"
                  style={{
                    animation: `fadeInUp 0.4s ease-out ${index * 0.03}s both`
                  }}
                >
                  <div className="relative overflow-hidden bg-slate-100 aspect-[2/3]">
                    {book.cover_i ? (
                      <img
                        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-gradient-to-br from-slate-100 to-slate-200">
                        <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span className="text-xs font-medium">No Cover</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="text-white text-sm font-semibold">View Details</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900 mb-1 line-clamp-2 text-sm group-hover:text-blue-600 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-slate-600 text-xs mb-2 line-clamp-1">
                      {book.author_name ? book.author_name[0] : 'Unknown Author'}
                    </p>
                    {book.first_publish_year && (
                      <span className="inline-block px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
                        {book.first_publish_year}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Book Details Modal */}
      {selectedBook && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedBook(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={() => setSelectedBook(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-slate-100 transition z-10 border border-slate-200"
              >
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="flex flex-col md:flex-row gap-8 p-8">
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  {selectedBook.cover_i ? (
                    <img
                      src={`https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg`}
                      alt={selectedBook.title}
                      className="w-64 h-96 object-cover rounded-xl shadow-2xl"
                    />
                  ) : (
                    <div className="w-64 h-96 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center text-slate-400">
                      <div className="text-center">
                        <svg className="w-20 h-20 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span className="text-sm">No Cover Available</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-slate-900 mb-3">{selectedBook.title}</h2>
                  <p className="text-xl text-slate-600 mb-6">
                    {selectedBook.author_name ? selectedBook.author_name.join(', ') : 'Unknown Author'}
                  </p>
                  
                  <div className="space-y-4 bg-slate-50 rounded-xl p-6">
                    {selectedBook.first_publish_year && (
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-slate-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <span className="font-semibold text-slate-700">First Published</span>
                          <p className="text-slate-600">{selectedBook.first_publish_year}</p>
                        </div>
                      </div>
                    )}
                    
                    {selectedBook.publisher && (
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-slate-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <span className="font-semibold text-slate-700">Publisher</span>
                          <p className="text-slate-600">{selectedBook.publisher[0]}</p>
                        </div>
                      </div>
                    )}
                    
                    {selectedBook.number_of_pages_median && (
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-slate-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                        </svg>
                        <div>
                          <span className="font-semibold text-slate-700">Pages</span>
                          <p className="text-slate-600">{selectedBook.number_of_pages_median}</p>
                        </div>
                      </div>
                    )}
                    
                    {selectedBook.isbn && (
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-slate-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z" clipRule="evenodd" />
                          <path d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z" />
                        </svg>
                        <div>
                          <span className="font-semibold text-slate-700">ISBN</span>
                          <p className="text-slate-600 text-sm">{selectedBook.isbn[0]}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {selectedBook.key && (
                    <a
                      href={`https://openlibrary.org${selectedBook.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      View on Open Library
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Book Finder</h3>
              <p className="text-slate-400">
                Your gateway to millions of books from the Open Library collection. 
                Discover, explore, and find your next favorite read.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="https://openlibrary.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Open Library</a></li>
                <li><a href="https://openlibrary.org/developers" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">API Documentation</a></li>
              </ul>
            </div>
            
            </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2025 Book Finder. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}