import { motion, AnimatePresence } from 'framer-motion';

const CourtSelector = ({ selectedCourt, onCourtSelect }) => {
  const courts = [
    {
      id: 'saint-viateur',
      name: 'Terrains Saint-Viateur',
      shortName: 'Saint-Viateur',
      location: 'Avenue Saint-Viateur',
      description: '4 terrains extérieurs avec éclairage',
      features: ['Éclairage', 'Parking', 'Transport en commun'],
      color: 'from-emerald-400 to-green-500',
      icon: '🏟️'
    },
    {
      id: 'fx-garneau',
      name: 'FX-Garneau',
      shortName: 'FX-Garneau',
      location: 'Avenue FX-Garneau',
      description: '2 terrains extérieurs avec éclairage',
      features: ['Éclairage', 'Parking', 'Transport en commun'],
      color: 'from-blue-400 to-indigo-500',
      icon: '🎾'
    },
    {
      id: 'joyce',
      name: 'Joyce',
      shortName: 'Joyce',
      location: 'Avenue Joyce',
      description: '2 terrains extérieurs avec éclairage',
      features: ['Éclairage', 'Parking', 'Transport en commun'],
      color: 'from-purple-400 to-pink-500',
      icon: '🏆'
    }
  ];

  const buttonVariants = {
    hover: {
      scale: 1.05,
      y: -5,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Choisissez Votre Terrain
        </h3>
        <p className="text-gray-600 text-lg">
          Sélectionnez le terrain où vous souhaitez jouer
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {courts.map((court, index) => {
          const isSelected = selectedCourt === court.id;
          
          return (
            <motion.div
              key={court.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => onCourtSelect(court.id)}
              className={`
                relative cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 ease-out
                ${isSelected 
                  ? 'border-emerald-500 bg-emerald-50 shadow-lg ring-2 ring-emerald-200' 
                  : 'border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50 shadow-md hover:shadow-lg'
                }
              `}
            >
              {/* Selection Indicator */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="absolute top-4 right-4 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center"
                  >
                    <div className="text-white text-sm font-bold">✓</div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Court Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${court.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl">{court.icon}</span>
              </div>

              {/* Court Info */}
              <div className="text-center">
                <h4 className="text-lg font-bold text-gray-900 mb-2">{court.shortName}</h4>
                <p className="text-sm text-gray-600 mb-3">{court.location}</p>
                <p className="text-sm text-gray-500 mb-4">{court.description}</p>

                {/* Features */}
                <div className="flex flex-wrap justify-center gap-2">
                  {court.features.map((feature, featureIndex) => (
                    <motion.span
                      key={feature}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + featureIndex * 0.1, duration: 0.4, ease: "easeOut" }}
                      className={`
                        px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ease-out
                        ${isSelected 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-gray-100 text-gray-600 group-hover:bg-emerald-100 group-hover:text-emerald-700'
                        }
                      `}
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Hover Effect */}
              {!isSelected && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                  className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-2xl -z-10"
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Selection Summary */}
      {selectedCourt && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-50 to-blue-50 text-gray-700 px-6 py-3 rounded-full border border-emerald-200 shadow-lg">
            <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold">
                Terrain sélectionné: {courts.find(c => c.id === selectedCourt)?.shortName}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CourtSelector; 