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
    { key: 'morning', label: 'Matin', time: '8h-12h' },
    { key: 'afternoon', label: 'Après-midi', time: '12h-17h' },
    { key: 'evening', label: 'Soirée', time: '17h-22h' }
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
    
    return `${selectedTimes.length} créneau${selectedTimes.length > 1 ? 'x' : ''} sur ${dayCount} jour${dayCount > 1 ? 's' : ''}`;
  };

  const selectAll = () => {
    const allSlots = [];
    days.forEach(day => {
      timeSlots.forEach(time => {
        allSlots.push(`${day.key}-${time.key}`);
      });
    });
    // Add all slots that aren't already selected
    allSlots.forEach(slot => {
      if (!selectedTimes.includes(slot)) {
        onTimeToggle(slot);
      }
    });
  };

  const selectWeekends = () => {
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
  };

  const selectWeekdays = () => {
    const weekdaySlots = [];
    ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].forEach(day => {
      timeSlots.forEach(time => {
        weekdaySlots.push(`${day}-${time.key}`);
      });
    });
    weekdaySlots.forEach(slot => {
      if (!selectedTimes.includes(slot)) {
        onTimeToggle(slot);
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Votre Disponibilité Hebdomadaire
        </h3>
        <p className="text-gray-600 text-lg">
          Sélectionnez vos créneaux disponibles
        </p>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mb-8"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={selectAll}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-xl text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200 ease-out"
          >
            Tout Sélectionner
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={selectWeekends}
            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 ease-out"
          >
            Weekends
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={selectWeekdays}
            className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 ease-out"
          >
            Semaine
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTimeToggle('clear-all')}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 ease-out"
          >
            Effacer Tout
          </motion.button>
        </div>
      </motion.div>

      {/* Calendar Grid - 7x3 (7 days × 3 time slots) */}
      <div className="grid grid-cols-8 gap-4">
        {/* Empty corner */}
        <div className="h-16"></div>
        
        {/* Header Row - Days */}
        {days.map((day, dayIndex) => (
          <motion.div
            key={day.key}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.1 + dayIndex * 0.05, 
              duration: 0.6, 
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            className="h-16 flex flex-col items-center justify-center text-center"
          >
            <div className="text-sm font-semibold text-gray-900">{day.short}</div>
            <div className="text-xs text-gray-500">{day.label}</div>
          </motion.div>
        ))}

        {/* Calendar Rows - Time Slots */}
        {timeSlots.map((timeSlot, timeIndex) => (
          <div key={timeSlot.key} className="contents">
            {/* Time Slot Label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: 0.2 + timeIndex * 0.1, 
                duration: 0.6, 
                ease: [0.25, 0.46, 0.45, 0.94] 
              }}
              className="h-20 flex flex-col items-center justify-center text-center"
            >
              <div className="text-sm font-semibold text-gray-900">{timeSlot.label}</div>
              <div className="text-xs text-gray-500">{timeSlot.time}</div>
            </motion.div>

            {/* Day cells for this time slot */}
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
                    transition: { duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }
                  }}
                  whileTap={{ 
                    scale: 0.92,
                    transition: { duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
                  }}
                  transition={{ 
                    delay: 0.3 + (timeIndex * 7 + dayIndex) * 0.02,
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  onMouseEnter={() => setHoveredTime(`${day.key}-${timeSlot.key}`)}
                  onMouseLeave={() => setHoveredTime(null)}
                  onClick={(e) => handleTimeClick(e, day.key, timeSlot.key)}
                  className={`
                    w-20 h-20 rounded-xl border-2 transition-all duration-200 ease-out
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
                        transition={{ 
                          type: "spring", 
                          stiffness: 500, 
                          damping: 30,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
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
                      transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mt-10 pt-8 border-t border-gray-200"
      >
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
      </motion.div>

      {/* Selected Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mt-8 text-center"
      >
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-50 to-blue-50 text-gray-700 px-8 py-4 rounded-full border border-green-200 shadow-lg">
          <motion.div 
            key={getSelectedCount()}
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-lg font-bold">{getSelectedCount()}</span>
          </motion.div>
          <div className="text-left">
            <div className="text-lg font-semibold">{getSelectedSummary()}</div>
            <div className="text-sm text-gray-500">Créneaux sélectionnés</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveCalendar; 