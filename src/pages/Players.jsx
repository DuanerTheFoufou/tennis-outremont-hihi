import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import InteractiveCalendar from '../components/InteractiveCalendar';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('Tous');
  const [selectedTimes, setSelectedTimes] = useState([]);
  const { currentUser } = useAuth();

  const levels = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé', 'Expert'];

  useEffect(() => {
    loadPlayers();
  }, []);

  useEffect(() => {
    filterPlayers();
  }, [players, searchTerm, levelFilter, selectedTimes]);

  const loadPlayers = async () => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('uid', '!=', currentUser?.uid));
      const querySnapshot = await getDocs(q);
      
      const playersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setPlayers(playersData);
    } catch (error) {
      console.error('Erreur lors du chargement des joueurs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPlayers = () => {
    let filtered = players.filter(player => 
      player.uid !== currentUser?.uid
    );

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(player =>
        player.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.bio?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par niveau
    if (levelFilter !== 'Tous') {
      filtered = filtered.filter(player => player.level === levelFilter);
    }

    // Filtre par disponibilité
    if (selectedTimes.length > 0) {
      filtered = filtered.filter(player => {
        if (!player.availability || player.availability.length === 0) return false;
        return selectedTimes.some(time => player.availability.includes(time));
      });
    }

    setFilteredPlayers(filtered);
  };

  const handleTimeToggle = (timeKey) => {
    if (timeKey === 'clear-all') {
      setSelectedTimes([]);
    } else {
      setSelectedTimes(prev => 
        prev.includes(timeKey) 
          ? prev.filter(t => t !== timeKey)
          : [...prev, timeKey]
      );
    }
  };

  const openPlayerModal = (player) => {
    setSelectedPlayer(player);
  };

  const closePlayerModal = () => {
    setSelectedPlayer(null);
  };

  const sendEmail = (email) => {
    window.open(`mailto:${email}?subject=Proposition de match - Tennis Outremont`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 text-lg">Chargement des joueurs...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Joueurs Disponibles
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les joueurs de tennis passionnés dans votre quartier et trouvez votre partenaire idéal
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 mb-8"
        >
          <div className="grid md:grid-cols-3 gap-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rechercher
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nom ou bio..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Niveau
              </label>
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <div className="bg-gradient-to-r from-green-100 to-blue-100 px-4 py-3 rounded-xl border border-green-200">
                <p className="text-sm text-gray-600">Joueurs trouvés</p>
                <p className="text-2xl font-bold text-gray-800">{filteredPlayers.length}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Availability Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Filtrer par disponibilité
          </h3>
          <InteractiveCalendar
            selectedTimes={selectedTimes}
            onTimeToggle={handleTimeToggle}
          />
        </motion.div>

        {/* Players Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {filteredPlayers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎾</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Aucun joueur trouvé
              </h3>
              <p className="text-gray-600">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlayers.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.8 + index * 0.1, 
                    duration: 0.6, 
                    ease: [0.25, 0.46, 0.45, 0.94] 
                  }}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                  }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 cursor-pointer hover:shadow-xl transition-all duration-200"
                  onClick={() => openPlayerModal(player)}
                >
                  {/* Player Avatar */}
                  <div className="flex items-center mb-4">
                    {player.photoURL ? (
                      <img
                        src={player.photoURL}
                        alt={player.displayName}
                        className="w-16 h-16 rounded-full mr-4"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white text-xl font-bold">
                          {player.displayName?.charAt(0).toUpperCase() || 'J'}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {player.displayName || 'Joueur'}
                      </h3>
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                        {player.level || 'Débutant'}
                      </span>
                    </div>
                  </div>

                  {/* Bio */}
                  {player.bio && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {player.bio}
                    </p>
                  )}

                  {/* Availability Preview */}
                  {player.availability && player.availability.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Disponible sur {player.availability.length} créneau{player.availability.length > 1 ? 'x' : ''}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {player.availability.slice(0, 3).map((time, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {time.split('-')[0]}
                          </span>
                        ))}
                        {player.availability.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{player.availability.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Contact Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      sendEmail(player.email);
                    }}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold py-2 px-4 rounded-xl hover:shadow-lg transition-all duration-200"
                  >
                    Contacter
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Player Modal */}
      <AnimatePresence>
        {selectedPlayer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closePlayerModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center mb-6">
                {selectedPlayer.photoURL ? (
                  <img
                    src={selectedPlayer.photoURL}
                    alt={selectedPlayer.displayName}
                    className="w-20 h-20 rounded-full mr-6"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mr-6">
                    <span className="text-white text-2xl font-bold">
                      {selectedPlayer.displayName?.charAt(0).toUpperCase() || 'J'}
                    </span>
                  </div>
                )}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedPlayer.displayName || 'Joueur'}
                  </h2>
                  <span className="inline-block px-4 py-2 bg-green-100 text-green-800 text-lg font-medium rounded-full">
                    {selectedPlayer.level || 'Débutant'}
                  </span>
                </div>
              </div>

              {/* Bio */}
              {selectedPlayer.bio && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">À propos</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedPlayer.bio}</p>
                </div>
              )}

              {/* Availability */}
              {selectedPlayer.availability && selectedPlayer.availability.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Disponibilité</h3>
                  <div className="grid grid-cols-7 gap-2">
                    {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                      <div key={day} className="text-center">
                        <div className="text-sm font-medium text-gray-600 mb-2">{day}</div>
                        {['morning', 'afternoon', 'evening'].map(time => {
                          const timeKey = `${day.toLowerCase()}-${time}`;
                          const isAvailable = selectedPlayer.availability.includes(timeKey);
                          return (
                            <div
                              key={time}
                              className={`w-8 h-8 rounded-lg mb-1 flex items-center justify-center text-xs ${
                                isAvailable 
                                  ? 'bg-green-500 text-white' 
                                  : 'bg-gray-100 text-gray-400'
                              }`}
                            >
                              {isAvailable ? '✓' : '×'}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Info */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact</h3>
                <p className="text-gray-600">{selectedPlayer.email}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => sendEmail(selectedPlayer.email)}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-200"
                >
                  Envoyer un email
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closePlayerModal}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
                >
                  Fermer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Players; 