import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Submit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    level: '',
    availability: [],
    courts: [],
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const levels = [
    { value: 'beginner', label: 'Beginner (0-2 years)' },
    { value: 'intermediate', label: 'Intermediate (2-5 years)' },
    { value: 'advanced', label: 'Advanced (5+ years)' },
    { value: 'expert', label: 'Expert/Competitive' }
  ];

  const availabilityOptions = [
    { value: 'monday-morning', label: 'Monday Morning' },
    { value: 'monday-afternoon', label: 'Monday Afternoon' },
    { value: 'monday-evening', label: 'Monday Evening' },
    { value: 'tuesday-morning', label: 'Tuesday Morning' },
    { value: 'tuesday-afternoon', label: 'Tuesday Afternoon' },
    { value: 'tuesday-evening', label: 'Tuesday Evening' },
    { value: 'wednesday-morning', label: 'Wednesday Morning' },
    { value: 'wednesday-afternoon', label: 'Wednesday Afternoon' },
    { value: 'wednesday-evening', label: 'Wednesday Evening' },
    { value: 'thursday-morning', label: 'Thursday Morning' },
    { value: 'thursday-afternoon', label: 'Thursday Afternoon' },
    { value: 'thursday-evening', label: 'Thursday Evening' },
    { value: 'friday-morning', label: 'Friday Morning' },
    { value: 'friday-afternoon', label: 'Friday Afternoon' },
    { value: 'friday-evening', label: 'Friday Evening' },
    { value: 'saturday-morning', label: 'Saturday Morning' },
    { value: 'saturday-afternoon', label: 'Saturday Afternoon' },
    { value: 'sunday-morning', label: 'Sunday Morning' },
    { value: 'sunday-afternoon', label: 'Sunday Afternoon' }
  ];

  const courtOptions = [
    { value: 'outremont-park', label: 'Outremont Park Courts' },
    { value: 'bernard-park', label: 'Bernard Park Courts' },
    { value: 'other', label: 'Other Courts' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get existing players from localStorage
    const existingPlayers = JSON.parse(localStorage.getItem('tennisPlayers') || '[]');
    
    // Add new player with timestamp
    const newPlayer = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    localStorage.setItem('tennisPlayers', JSON.stringify([...existingPlayers, newPlayer]));

    setIsSubmitting(false);
    navigate('/players');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-12"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Join the Tennis Community
          </h1>
          <p className="text-lg text-gray-600">
            Tell us about yourself and your tennis preferences
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          onSubmit={handleSubmit}
          className="card space-y-6"
        >
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            
            <div>
              <label htmlFor="name" className="label">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="input-field"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="label">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="input-field"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="phone" className="label">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter your phone number (optional)"
              />
            </div>
          </div>

          {/* Tennis Level */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Tennis Level *</h3>
            <div className="space-y-2">
              {levels.map((level) => (
                <label key={level.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="level"
                    value={level.value}
                    checked={formData.level === level.value}
                    onChange={handleInputChange}
                    required
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <span className="text-gray-700">{level.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Availability *</h3>
            <p className="text-sm text-gray-600">Select all times when you're available to play</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {availabilityOptions.map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={formData.availability.includes(option.value)}
                    onChange={(e) => handleCheckboxChange(e, 'availability')}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-gray-700 text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Preferred Courts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Preferred Courts</h3>
            <div className="space-y-2">
              {courtOptions.map((court) => (
                <label key={court.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    value={court.value}
                    checked={formData.courts.includes(court.value)}
                    onChange={(e) => handleCheckboxChange(e, 'courts')}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-gray-700">{court.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label htmlFor="notes" className="label">Additional Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={4}
              className="input-field"
              placeholder="Any additional information about your playing style, preferences, or special requirements..."
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting...</span>
              </div>
            ) : (
              'Submit Profile'
            )}
          </motion.button>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default Submit; 