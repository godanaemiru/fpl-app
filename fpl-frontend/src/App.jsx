import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerTable from './components/PlayerTable';
import { Search, Zap, Star } from 'lucide-react'; // Added icons for the toggle

function App() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('top'); // 'top' or 'differentials'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        // Dynamic URL based on the 'view' state
        const endpoint = view === 'top' ? 'top' : 'differentials';
        const response = await axios.get(`http://localhost:5000/api/players/${endpoint}`);
        setPlayers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchPlayers();
  }, [view]); // The effect re-runs whenever 'view' changes

const filteredPlayers = (players || []).filter(player =>
  player?.name?.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                FPL <span className="text-emerald-600">Analytics</span>
              </h1>
              <p className="text-slate-500 text-sm">Pro-grade metrics for your mini-league.</p>
            </div>

            {/* View Toggle and Search Container */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Toggle Buttons */}
              <div className="flex bg-slate-200 p-1 rounded-xl">
                <button
                  onClick={() => setView('top')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    view === 'top' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Star size={16} /> High Value
                </button>
                <button
                  onClick={() => setView('differentials')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    view === 'differentials' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Zap size={16} /> Differentials
                </button>
              </div>

              {/* Search bar */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : (
          <PlayerTable 
            players={filteredPlayers} 
            title={view === 'top' ? "Top Value Assets" : "Differential Gems (<10% Ownership)"} 
          />
        )}
      </div>
    </div>
  );
}

export default App;