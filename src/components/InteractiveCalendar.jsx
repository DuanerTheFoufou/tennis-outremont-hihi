import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InteractiveCalendar = ({ selectedTimes, onTimeToggle }) => {
  const [hoveredTime, setHoveredTime] = useState(null);

  const days = [
    { key: 'monday', label: 'Lundi', short: 'Lun', emoji: '🌅' },
    { key: 'tuesday', label: 'Mardi', short: 'Mar', emoji: '🌤️' },
    { key: 'wednesday', label: 'Mercredi', short: 'Mer', emoji: '☀️' },
    { key: 'thursday', label: 'Jeudi', short: 'Jeu', emoji: '🌤️' },
    { key: 'friday', label: 'Vendredi', short: 'Ven', emoji: '🌅' },
    { key: 'saturday', label: 'Samedi', short: 'Sam', emoji: '🎾' },
    { key: 'sunday', label: 'Dimanche', short: 'Dim', emoji: '🏆' }
  ];

  const timeSlots = [
    { key: 'morning', label: 'Matin', time: '8h-12h', icon: '🌅', description: 'Tôt le matin' },
    { key: 'afternoon', label: 'Après-midi', time: '12h-17h', icon: '☀️', description: 'Après le travail' },
    { key: 'evening', label: 'Soirée', time: '17h-22h', icon: '🌆', description: 'En soirée' }
  ];

  const handleTimeClick = (e, day, time) => {
    e.preventDefault();
    e.stopPropagation();
    const timeKey = `${day}-${time}`;
    onTimeToggle(timeKey);
  };

  const isTimeSelected = (day, time) => {
    const timeKey = `${day}-${time}`;
    return selectedTimes.includes(timeKey);
  };

  const getSelectedCount = () => {
    return selectedTimes.length;
  };

  const getSelectedSummary = () => {
    if (selectedTimes.length === 0) return "Aucun créneau sélectionné";
    
    const dayCount = new Set(selectedTimes.map(t => t.split('-')[0])).size;
    const timeCount = new Set(selectedTimes.map(t => t.split('-')[1])).size;
    
    return `${selectedTimes.length} créneau${selectedTimes.length > 1 ? 'x' : ''} sur ${dayCount} jour${dayCount > 1 ? 's' : ''}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          📅 Votre Disponibilité Hebdomadaire
        </h3>
        <p className="text-gray-600 text-lg">
          Sélectionnez tous vos créneaux disponibles pour la semaine
        </p>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-8 gap-4">
        {/* Header Row */}
        <div className="h-16"></div> {/* Empty corner */}
        {days.map((day, dayIndex) => (
          <motion.div
            key={day.key}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + dayIndex * 0.05, duration: 0.6, ease: "easeOut" }}
            className="h-16 flex flex-col items-center justify-center"
          >
            <div className="text-center">
              <div className="text-lg mb-1">{day.emoji}</div>
              <div className="text-sm font-semibold text-gray-900">{day.short}</div>
              <div className="text-xs text-gray-500">{day.label}</div>
            </div>
          </motion.div>
        ))}

        {/* Time Slots */}
        {timeSlots.map((timeSlot, timeIndex) => (
          <div key={timeSlot.key} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + timeIndex * 0.1, duration: 0.6, ease: "easeOut" }}
              className="h-20 flex flex-col items-center justify-center text-center"
            >
              <div className="text-xl mb-1">{timeSlot.icon}</div>
              <div className="text-sm font-medium text-gray-700">{timeSlot.label}</div>
              <div className="text-xs text-gray-500">{timeSlot.time}</div>
              <div className="text-xs text-gray-400 mt-1">{timeSlot.description}</div>
            </motion.div>
          </div>
        ))}

        {/* Calendar Cells */}
        {timeSlots.map((timeSlot, timeIndex) => (
          <div key={timeSlot.key} className="space-y-4">
            {days.map((day, dayIndex) => {
              const isSelected = isTimeSelected(day.key, timeSlot.key);
              const isHovered = hoveredTime === `${day.key}-${timeSlot.key}`;
              
              return (
                <motion.button
                  key={`${day.key}-${timeSlot.key}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    backgroundColor: isSelected ? '#16a34a' : isHovered ? '#f0fdf4' : '#ffffff',
                    borderColor: isSelected ? '#16a34a' : isHovered ? '#bbf7d0' : '#e5e7eb'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: isSelected ? '#15803d' : '#f0fdf4',
                    borderColor: isSelected ? '#15803d' : '#bbf7d0',
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    transition: { duration: 0.1 }
                  }}
                  transition={{ 
                    delay: 0.3 + (timeIndex * 7 + dayIndex) * 0.02,
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                  onMouseEnter={() => setHoveredTime(`${day.key}-${timeSlot.key}`)}
                  onMouseLeave={() => setHoveredTime(null)}
                  onClick={(e) => handleTimeClick(e, day.key, timeSlot.key)}
                  className={`
                    w-20 h-20 rounded-xl border-2 transition-all duration-300 ease-out
                    flex items-center justify-center relative overflow-hidden
                    ${isSelected ? 'shadow-lg ring-2 ring-green-200' : 'shadow-sm hover:shadow-md'}
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                  `}
                  type="button"
                >
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="text-white text-2xl font-bold">✓</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {!isSelected && (
                    <motion.div
                      animate={{ 
                        opacity: isHovered ? 0.4 : 0,
                        scale: isHovered ? 1.2 : 1
                      }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="text-gray-400 text-lg font-bold"
                    >
                      +
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-10 pt-8 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-8 text-sm">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-sm font-bold">+</span>
            </div>
            <span className="text-gray-600">Non sélectionné</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-green-600 border-2 border-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <span className="text-gray-600">Disponible</span>
          </div>
        </div>
      </div>

      {/* Selected Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
        className="mt-8 text-center"
      >
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-50 to-blue-50 text-gray-700 px-8 py-4 rounded-full border border-green-200 shadow-lg">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white text-lg font-bold">{getSelectedCount()}</span>
          </div>
          <div className="text-left">
            <div className="text-lg font-semibold">{getSelectedSummary()}</div>
            <div className="text-sm text-gray-500">Créneaux sélectionnés</div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      {selectedTimes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
          className="mt-6 text-center"
        >
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTimeToggle('clear-all')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-all duration-300 ease-out"
            >
              🗑️ Effacer tout
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                // Select all weekend slots
                const weekendSlots = [];
                ['saturday', 'sunday'].forEach(day => {
                  timeSlots.forEach(time => {
                    weekendSlots.push(`${day}-${time.key}`);
                  });
                });
                weekendSlots.forEach(slot => {
                  if (!selectedTimes.includes(slot)) {
                    onTimeToggle(slot);
                  }
                });
              }}
              className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium transition-all duration-300 ease-out"
            >
              🎾 Weekends
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default InteractiveCalendar; 