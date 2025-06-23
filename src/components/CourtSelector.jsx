import { motion } from 'framer-motion';

const CourtSelector = ({ selectedCourts, onCourtToggle }) => {
  const courts = [
    {
      id: 'saint-viateur',
      name: 'Terrains Saint-Viateur',
      location: 'Parc Saint-Viateur',
      address: 'Avenue Laurier Ouest',
      description: 'Terrains en excellent état avec vue sur le parc',
      features: ['Éclairage', 'Parking', 'Douches'],
      image: '🏟️',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'fx-garneau',
      name: 'Terrains FX-Garneau',
      location: 'Parc FX-Garneau',
      address: 'Avenue Bernard',
      description: 'Terrains modernes avec surface professionnelle',
      features: ['Surface Pro', 'Réservation', 'Café'],
      image: '🎾',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'joyce',
      name: 'Terrains Joyce',
      location: 'Parc Joyce',
      address: 'Avenue Van Horne',
      description: 'Terrains familiaux dans un cadre verdoyant',
      features: ['Famille', 'Pique-nique', 'Jeux'],
      image: '🌳',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const isCourtSelected = (courtId) => {
    return selectedCourts.includes(courtId);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          🏟️ Terrains Préférés
        </h3>
        <p className="text-gray-600">
          Sélectionnez vos terrains de tennis favoris à Outremont
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courts.map((court, index) => {
          const isSelected = isCourtSelected(court.id);
          
          return (
            <motion.div
              key={court.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="relative"
            >
              <motion.button
                onClick={() => onCourtToggle(court.id)}
                className={`
                  w-full p-6 rounded-2xl border-2 transition-all duration-300
                  ${isSelected 
                    ? 'border-green-500 bg-green-50 shadow-lg' 
                    : 'border-gray-200 bg-white hover:border-gray-300 shadow-md hover:shadow-lg'
                  }
                `}
                whileTap={{ scale: 0.98 }}
              >
                {/* Selection Indicator */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="absolute top-3 right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-sm">✓</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Court Icon */}
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{court.image}</div>
                  <div className={`w-12 h-1 rounded-full mx-auto bg-gradient-to-r ${court.color}`}></div>
                </div>

                {/* Court Info */}
                <div className="text-center space-y-2">
                  <h4 className="font-bold text-gray-900 text-lg">{court.name}</h4>
                  <p className="text-sm text-gray-600">{court.location}</p>
                  <p className="text-xs text-gray-500">{court.address}</p>
                  
                  <div className="mt-3">
                    <p className="text-sm text-gray-700 mb-3">{court.description}</p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap justify-center gap-1">
                      {court.features.map((feature, featureIndex) => (
                        <motion.span
                          key={feature}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + featureIndex * 0.1 }}
                          className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 hover:opacity-5 transition-opacity duration-300"
                  style={{
                    background: isSelected 
                      ? 'linear-gradient(135deg, #16a34a, #15803d)' 
                      : `linear-gradient(135deg, ${court.color.split(' ')[1]}, ${court.color.split(' ')[3]})`
                  }}
                />
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* Selection Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
          <span className="text-sm font-medium">
            {selectedCourts.length} terrain{selectedCourts.length > 1 ? 's' : ''} sélectionné{selectedCourts.length > 1 ? 's' : ''}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default CourtSelector; 