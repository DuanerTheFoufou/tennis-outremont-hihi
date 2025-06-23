import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [filters, setFilters] = useState({
    level: '',
    courts: [],
    availability: []
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem('tennisPlayers') || '[]');
    setPlayers(storedPlayers);
    setFilteredPlayers(storedPlayers);
  }, []);

  useEffect(() => {
    let filtered = players;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(player =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Level filter
    if (filters.level) {
      filtered = filtered.filter(player => player.level === filters.level);
    }

    // Courts filter
    if (filters.courts.length > 0) {
      filtered = filtered.filter(player =>
        player.courts.some(court => filters.courts.includes(court))
      );
    }

    // Availability filter
    if (filters.availability.length > 0) {
      filtered = filtered.filter(player =>
        player.availability.some(time => filters.availability.includes(time))
      );
    }

    setFilteredPlayers(filtered);
  }, [players, searchTerm, filters]);

  const levels = [
    { value: 'debutant', label: 'Débutant', color: 'bg-blue-100 text-blue-800' },
    { value: 'intermediaire', label: 'Intermédiaire', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'avance', label: 'Avancé', color: 'bg-orange-100 text-orange-800' },
    { value: 'expert', label: 'Expert', color: 'bg-red-100 text-red-800' }
  ];

  const courts = [
    { id: 'saint-viateur', name: 'Terrains Saint-Viateur' },
    { id: 'fx-garneau', name: 'Terrains FX-Garneau' },
    { id: 'joyce', name: 'Terrains Joyce' }
  ];

  const timeSlots = [
    { key: 'morning', label: 'Matin' },
    { key: 'afternoon', label: 'Après-midi' },
    { key: 'evening', label: 'Soirée' }
  ];

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: Array.isArray(prev[filterType])
        ? prev[filterType].includes(value)
          ? prev[filterType].filter(item => item !== value)
          : [...prev[filterType], value]
        : value
    }));
  };

  const clearFilters = () => {
    setFilters({ level: '', courts: [], availability: [] });
    setSearchTerm('');
  };

  const resetAllData = () => {
    localStorage.removeItem('tennisPlayers');
    setPlayers([]);
    setFilteredPlayers([]);
    setShowResetModal(false);
  };

  const openPlayerModal = (player) => {
    setSelectedPlayer(player);
  };

  const closePlayerModal = () => {
    setSelectedPlayer(null);
  };

  const sendEmail = (email) => {
    window.open(`mailto:${email}?subject=Partenaire de Tennis - Outremont`, '_blank');
  };

  const formatAvailability = (availability) => {
    const days = {
      'monday': 'Lun', 'tuesday': 'Mar', 'wednesday': 'Mer',
      'thursday': 'Jeu', 'friday': 'Ven', 'saturday': 'Sam', 'sunday': 'Dim'
    };
    const times = { 'morning': 'Matin', 'afternoon': 'Après-midi', 'evening': 'Soirée' };

    const grouped = availability.reduce((acc, time) => {
      const [day, timeSlot] = time.split('-');
      if (!acc[day]) acc[day] = [];
      acc[day].push(times[timeSlot]);
      return acc;
    }, {});

    return Object.entries(grouped).map(([day, timeList]) => 
      `${days[day]}: ${timeList.join(', ')}`
    ).join(' | ');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen py-12 bg-gradient-to-br from-green-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            🎾 Joueurs de Tennis à Outremont
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="text-xl text-gray-600 mb-6"
          >
            Trouvez votre partenaire de tennis idéal
          </motion.p>
          
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-center space-x-4"
          >
            <div className="bg-white rounded-full px-6 py-3 shadow-lg border border-gray-100">
              <span className="text-lg font-semibold text-gray-900">
                {filteredPlayers.length} joueur{filteredPlayers.length > 1 ? 's' : ''} trouvé{filteredPlayers.length > 1 ? 's' : ''}
              </span>
            </div>
            <motion.button
              onClick={() => setShowResetModal(true)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out shadow-lg hover:shadow-xl"
            >
              🔄 Reset Données
            </motion.button>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Search */}
            <div>
              <label className="label">🔍 Rechercher</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nom ou email..."
                className="input-field"
              />
            </div>

            {/* Level Filter */}
            <div>
              <label className="label">🎾 Niveau</label>
              <select
                value={filters.level}
                onChange={(e) => handleFilterChange('level', e.target.value)}
                className="input-field"
              >
                <option value="">Tous les niveaux</option>
                {levels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Courts Filter */}
            <div>
              <label className="label">🏟️ Terrains</label>
              <div className="space-y-2">
                {courts.map(court => (
                  <label key={court.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.courts.includes(court.id)}
                      onChange={() => handleFilterChange('courts', court.id)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{court.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="label">⏰ Disponibilité</label>
              <div className="space-y-2">
                {timeSlots.map(time => (
                  <label key={time.key} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.availability.includes(time.key)}
                      onChange={() => handleFilterChange('availability', time.key)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{time.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="mt-6 flex justify-center">
            <motion.button
              onClick={clearFilters}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary"
            >
              🗑️ Effacer les Filtres
            </motion.button>
          </div>
        </motion.div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredPlayers.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.5, 
                  ease: "easeOut" 
                }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden cursor-pointer card-hover"
                onClick={() => openPlayerModal(player)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {player.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{player.name}</h3>
                        <p className="text-sm text-gray-500">{player.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Level */}
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">Niveau:</span>
                      {levels.find(l => l.value === player.level) && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${levels.find(l => l.value === player.level).color}`}>
                          {levels.find(l => l.value === player.level).label}
                        </span>
                      )}
                    </div>

                    {/* Courts */}
                    {player.courts && player.courts.length > 0 && (
                      <div>
                        <span className="text-sm font-medium text-gray-700">Terrains:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {player.courts.map(courtId => {
                            const court = courts.find(c => c.id === courtId);
                            return court ? (
                              <span key={courtId} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                {court.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}

                    {/* Availability */}
                    {player.availability && player.availability.length > 0 && (
                      <div>
                        <span className="text-sm font-medium text-gray-700">Disponible:</span>
                        <p className="text-xs text-gray-600 mt-1">
                          {formatAvailability(player.availability)}
                        </p>
                      </div>
                    )}

                    {/* Contact */}
                    <div className="flex space-x-2 pt-2">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          sendEmail(player.email);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 ease-out"
                      >
                        📧 Contacter
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredPlayers.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🎾</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun joueur trouvé
            </h3>
            <p className="text-gray-600">
              Essayez d'ajuster vos filtres ou créez votre propre profil !
            </p>
          </motion.div>
        )}
      </div>

      {/* Player Modal */}
      <AnimatePresence>
        {selectedPlayer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closePlayerModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      {selectedPlayer.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedPlayer.name}</h2>
                      <p className="text-gray-600">{selectedPlayer.email}</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={closePlayerModal}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                  >
                    ×
                  </motion.button>
                </div>

                <div className="space-y-4">
                  {selectedPlayer.phone && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">📞 Téléphone:</span>
                      <p className="text-gray-900">{selectedPlayer.phone}</p>
                    </div>
                  )}

                  <div>
                    <span className="text-sm font-medium text-gray-700">🎾 Niveau:</span>
                    {levels.find(l => l.value === selectedPlayer.level) && (
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-1 ${levels.find(l => l.value === selectedPlayer.level).color}`}>
                        {levels.find(l => l.value === selectedPlayer.level).label}
                      </span>
                    )}
                  </div>

                  {selectedPlayer.courts && selectedPlayer.courts.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">🏟️ Terrains préférés:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedPlayer.courts.map(courtId => {
                          const court = courts.find(c => c.id === courtId);
                          return court ? (
                            <span key={courtId} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              {court.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}

                  {selectedPlayer.availability && selectedPlayer.availability.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">📅 Disponibilité:</span>
                      <p className="text-gray-900 mt-1">
                        {formatAvailability(selectedPlayer.availability)}
                      </p>
                    </div>
                  )}

                  {selectedPlayer.notes && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">📝 Notes:</span>
                      <p className="text-gray-900 mt-1">{selectedPlayer.notes}</p>
                    </div>
                  )}

                  <div className="flex space-x-3 pt-4">
                    <motion.button
                      onClick={() => sendEmail(selectedPlayer.email)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 btn-primary"
                    >
                      📧 Envoyer un Email
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset Modal */}
      <AnimatePresence>
        {showResetModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowResetModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Reset des Données
                </h3>
                <p className="text-gray-600 mb-6">
                  Êtes-vous sûr de vouloir supprimer tous les profils de joueurs ? Cette action est irréversible.
                </p>
                
                <div className="flex space-x-3">
                  <motion.button
                    onClick={() => setShowResetModal(false)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 btn-secondary"
                  >
                    Annuler
                  </motion.button>
                  <motion.button
                    onClick={resetAllData}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-out transform hover:scale-105"
                  >
                    Confirmer
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Players; 