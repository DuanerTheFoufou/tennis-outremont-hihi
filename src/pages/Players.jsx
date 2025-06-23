import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const levels = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  useEffect(() => {
    // Load players from localStorage
    const storedPlayers = JSON.parse(localStorage.getItem('tennisPlayers') || '[]');
    setPlayers(storedPlayers);
    setFilteredPlayers(storedPlayers);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Filter players based on search term and level
    let filtered = players;

    if (searchTerm) {
      filtered = filtered.filter(player =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.notes.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (levelFilter !== 'all') {
      filtered = filtered.filter(player => player.level === levelFilter);
    }

    setFilteredPlayers(filtered);
  }, [players, searchTerm, levelFilter]);

  const getLevelColor = (level) => {
    const colors = {
      beginner: 'bg-blue-100 text-blue-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-orange-100 text-orange-800',
      expert: 'bg-red-100 text-red-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  const formatAvailability = (availability) => {
    if (!availability || availability.length === 0) return 'Not specified';
    
    const dayTimeMap = {
      'monday-morning': 'Mon AM',
      'monday-afternoon': 'Mon PM',
      'monday-evening': 'Mon Eve',
      'tuesday-morning': 'Tue AM',
      'tuesday-afternoon': 'Tue PM',
      'tuesday-evening': 'Tue Eve',
      'wednesday-morning': 'Wed AM',
      'wednesday-afternoon': 'Wed PM',
      'wednesday-evening': 'Wed Eve',
      'thursday-morning': 'Thu AM',
      'thursday-afternoon': 'Thu PM',
      'thursday-evening': 'Thu Eve',
      'friday-morning': 'Fri AM',
      'friday-afternoon': 'Fri PM',
      'friday-evening': 'Fri Eve',
      'saturday-morning': 'Sat AM',
      'saturday-afternoon': 'Sat PM',
      'sunday-morning': 'Sun AM',
      'sunday-afternoon': 'Sun PM'
    };

    return availability
      .map(avail => dayTimeMap[avail])
      .slice(0, 3)
      .join(', ') + (availability.length > 3 ? '...' : '');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Tennis Players in Outremont
          </h1>
          <p className="text-lg text-gray-600">
            Find your perfect tennis partner from our community
          </p>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="card mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="label">Search Players</label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field"
                placeholder="Search by name, email, or notes..."
              />
            </div>

            {/* Level Filter */}
            <div>
              <label htmlFor="level-filter" className="label">Filter by Level</label>
              <select
                id="level-filter"
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="input-field"
              >
                {levels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredPlayers.length} of {players.length} players
          </p>
        </div>

        {/* Players Grid */}
        <AnimatePresence mode="wait">
          {filteredPlayers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🎾</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No players found
              </h3>
              <p className="text-gray-600">
                {players.length === 0 
                  ? "Be the first to join our tennis community!"
                  : "Try adjusting your search or filter criteria."
                }
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlayers.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="card hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Player Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {player.name}
                      </h3>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(player.level)}`}>
                        {player.level.charAt(0).toUpperCase() + player.level.slice(1)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDate(player.createdAt)}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {player.email}
                    </div>
                    {player.phone && (
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {player.phone}
                      </div>
                    )}
                  </div>

                  {/* Availability */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Availability</h4>
                    <p className="text-sm text-gray-600">
                      {formatAvailability(player.availability)}
                    </p>
                  </div>

                  {/* Preferred Courts */}
                  {player.courts && player.courts.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Preferred Courts</h4>
                      <div className="flex flex-wrap gap-1">
                        {player.courts.map((court) => (
                          <span key={court} className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {court.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {player.notes && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Notes</h4>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {player.notes}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Players; 