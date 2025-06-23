import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InteractiveCalendar = ({ selectedTimes, onTimeToggle }) => {
  const [hoveredTime, setHoveredTime] = useState(null);

  const days = [
    { key: 'monday', label: 'Lundi', short: 'Lun' },
    { key: 'tuesday', label: 'Mardi', short: 'Mar' },
    { key: 'wednesday', label: 'Mercredi', short: 'Mer' },
    { key: 'thursday', label: 'Jeudi', short: 'Jeu' },
    { key: 'friday', label: 'Vendredi', short: 'Ven' },
    { key: 'saturday', label: 'Samedi', short: 'Sam' },
    { key: 'sunday', label: 'Dimanche', short: 'Dim' }
  ];

  const timeSlots = [
    { key: 'morning', label: 'Matin', time: '8h-12h', icon: '🌅' },
    { key: 'afternoon', label: 'Après-midi', time: '12h-17h', icon: '☀️' },
    { key: 'evening', label: 'Soirée', time: '17h-22h', icon: '🌆' }
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

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          📅 Votre Disponibilité
        </h3>
        <p className="text-gray-600">
          Cliquez sur les créneaux où vous êtes disponible
        </p>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-8 gap-3">
        {/* Header Row */}
        <div className="h-12"></div> {/* Empty corner */}
        {days.map((day) => (
          <motion.div
            key={day.key}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            className="h-12 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-900">{day.short}</div>
              <div className="text-xs text-gray-500">{day.label}</div>
            </div>
          </motion.div>
        ))}

        {/* Time Slots */}
        {timeSlots.map((timeSlot, timeIndex) => (
          <div key={timeSlot.key} className="space-y-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + timeIndex * 0.1, duration: 0.6, ease: "easeOut" }}
              className="h-20 flex flex-col items-center justify-center text-center"
            >
              <div className="text-lg mb-1">{timeSlot.icon}</div>
              <div className="text-xs font-medium text-gray-700">{timeSlot.label}</div>
              <div className="text-xs text-gray-500">{timeSlot.time}</div>
            </motion.div>
          </div>
        ))}

        {/* Calendar Cells */}
        {timeSlots.map((timeSlot, timeIndex) => (
          <div key={timeSlot.key} className="space-y-3">
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
                    scale: 1.08,
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
                    w-16 h-16 rounded-xl border-2 transition-all duration-300 ease-out
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
                        <div className="text-white text-xl font-bold">✓</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {!isSelected && (
                    <motion.div
                      animate={{ 
                        opacity: isHovered ? 0.4 : 0,
                        scale: isHovered ? 1.3 : 1
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
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-8 text-sm">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-xs font-bold">+</span>
            </div>
            <span className="text-gray-600">Non sélectionné</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-green-600 border-2 border-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
            <span className="text-gray-600">Disponible</span>
          </div>
        </div>
      </div>

      {/* Selected Count */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
        className="mt-6 text-center"
      >
        <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-6 py-3 rounded-full border border-green-200">
          <span className="text-lg font-semibold">
            {selectedTimes.length} créneau{selectedTimes.length > 1 ? 'x' : ''} sélectionné{selectedTimes.length > 1 ? 's' : ''}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveCalendar; 