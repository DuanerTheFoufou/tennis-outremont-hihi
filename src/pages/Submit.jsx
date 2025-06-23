import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import InteractiveCalendar from '../components/InteractiveCalendar';
import CourtSelector from '../components/CourtSelector';

const Submit = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    displayName: '',
    level: 'Débutant',
    phone: '',
    bio: '',
    courts: [],
    availability: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { currentUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const levels = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'];

  // Formatage automatique du numéro de téléphone canadien
  const formatPhoneNumber = (value) => {
    // Supprimer tous les caractères non numériques
    const phoneNumber = value.replace(/\D/g, '');
    
    // Limiter à 10 chiffres
    const trimmed = phoneNumber.slice(0, 10);
    
    // Appliquer le format canadien: (XXX) XXX-XXXX
    if (trimmed.length === 0) return '';
    if (trimmed.length <= 3) return `(${trimmed}`;
    if (trimmed.length <= 6) return `(${trimmed.slice(0, 3)}) ${trimmed.slice(3)}`;
    return `(${trimmed.slice(0, 3)}) ${trimmed.slice(3, 6)}-${trimmed.slice(6)}`;
  };

  const handleInputChange = (field, value) => {
    if (field === 'phone') {
      setFormData(prev => ({
        ...prev,
        [field]: formatPhoneNumber(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleCourtToggle = (courtId) => {
    setFormData(prev => ({
      ...prev,
      courts: prev.courts.includes(courtId)
        ? prev.courts.filter(id => id !== courtId)
        : [...prev.courts, courtId]
    }));
  };

  const handleTimeToggle = (timeKey) => {
    if (timeKey === 'clear-all') {
      setFormData(prev => ({
        ...prev,
        availability: []
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        availability: prev.availability.includes(timeKey)
          ? prev.availability.filter(t => t !== timeKey)
          : [...prev.availability, timeKey]
      }));
    }
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      setError('Vous devez être connecté pour créer un profil');
      return;
    }

    if (!formData.displayName.trim()) {
      setError('Le nom est requis');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Mettre à jour le profil utilisateur dans Firestore
      await updateUserProfile({
        displayName: formData.displayName,
        level: formData.level,
        phone: formData.phone,
        bio: formData.bio,
        courts: formData.courts,
        availability: formData.availability,
        updatedAt: new Date().toISOString()
      });

      // Rediriger vers la page des joueurs
      navigate('/players');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setError('Une erreur est survenue lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && !formData.displayName.trim()) {
      setError('Le nom est requis');
      return;
    }
    setError('');
    setStep(step + 1);
  };

  const prevStep = () => {
    setError('');
    setStep(step - 1);
  };

  const steps = [
    { number: 1, title: 'Informations Personnelles', icon: '👤' },
    { number: 2, title: 'Sélection des Terrains', icon: '🏟️' },
    { number: 3, title: 'Disponibilité', icon: '📅' },
    { number: 4, title: 'Confirmation', icon: '✅' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-green-200/30 to-blue-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Créer votre Profil
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Rejoignez la communauté Tennis Outremont et trouvez votre partenaire idéal
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8"
        >
          <div className="flex justify-center">
            <div className="flex space-x-4">
              {steps.map((stepItem, index) => (
                <div key={stepItem.number} className="flex items-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      backgroundColor: step >= stepItem.number ? '#16a34a' : '#e5e7eb'
                    }}
                    transition={{ 
                      delay: 0.3 + index * 0.1, 
                      duration: 0.6, 
                      ease: [0.25, 0.46, 0.45, 0.94] 
                    }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${
                      step >= stepItem.number ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    {step > stepItem.number ? '✓' : stepItem.icon}
                  </motion.div>
                  {index < steps.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: step > stepItem.number ? 1 : 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                      className={`w-16 h-1 mx-2 rounded-full ${
                        step > stepItem.number ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {steps[step - 1].title}
            </h2>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Form Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-4xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50"
              >
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  >
                    <span className="text-2xl">👤</span>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Informations Personnelles</h3>
                  <p className="text-gray-600">Parlez-nous un peu de vous</p>
                </div>
                
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      value={formData.displayName}
                      onChange={(e) => handleInputChange('displayName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ease-out"
                      placeholder="Votre nom complet"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Niveau de jeu
                    </label>
                    <div className="relative">
                      <select
                        value={formData.level}
                        onChange={(e) => handleInputChange('level', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ease-out appearance-none bg-white"
                      >
                        {levels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone (optionnel)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ease-out"
                      placeholder="(514) 555-0123"
                      maxLength={14}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Format canadien automatique: (XXX) XXX-XXXX
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio (optionnel)
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ease-out resize-none"
                      placeholder="Parlez-nous un peu de vous, votre style de jeu, vos préférences..."
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <CourtSelector
                  selectedCourts={formData.courts}
                  onCourtToggle={handleCourtToggle}
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <InteractiveCalendar
                  selectedTimes={formData.availability}
                  onTimeToggle={handleTimeToggle}
                />
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50"
              >
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  >
                    <span className="text-2xl">✅</span>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Confirmation</h3>
                  <p className="text-gray-600">Vérifiez vos informations avant de créer votre profil</p>
                </div>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Informations Personnelles</h4>
                      <div className="space-y-2 text-gray-600">
                        <p><strong>Nom:</strong> {formData.displayName}</p>
                        <p><strong>Niveau:</strong> {formData.level}</p>
                        {formData.phone && <p><strong>Téléphone:</strong> {formData.phone}</p>}
                        {formData.bio && <p><strong>Bio:</strong> {formData.bio}</p>}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Terrains Sélectionnés</h4>
                      {formData.courts.length > 0 ? (
                        <div className="space-y-2">
                          {formData.courts.map(courtId => (
                            <span key={courtId} className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mr-2 mb-2">
                              {courtId}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">Aucun terrain sélectionné</p>
                      )}
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Disponibilité</h4>
                    {formData.availability.length > 0 ? (
                      <p className="text-gray-600">
                        {formData.availability.length} créneau{formData.availability.length > 1 ? 'x' : ''} sélectionné{formData.availability.length > 1 ? 's' : ''}
                      </p>
                    ) : (
                      <p className="text-gray-500">Aucune disponibilité sélectionnée</p>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="bg-green-50 border border-green-200 rounded-xl p-4"
                  >
                    <p className="text-green-800 text-sm">
                      ✅ Votre profil sera visible par tous les joueurs de la communauté Tennis Outremont
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex justify-between items-center mt-8 max-w-4xl mx-auto"
        >
          <motion.button
            onClick={prevStep}
            disabled={step === 1}
            whileHover={{ scale: step > 1 ? 1.05 : 1, y: step > 1 ? -2 : 0 }}
            whileTap={{ scale: step > 1 ? 0.95 : 1 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ease-out ${
              step > 1
                ? 'bg-gray-500 hover:bg-gray-600 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Précédent
          </motion.button>

          {step < 4 ? (
            <motion.button
              onClick={nextStep}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ease-out"
            >
              Continuer
            </motion.button>
          ) : (
            <motion.button
              onClick={handleSubmit}
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.05, y: loading ? 0 : -2 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
                />
              ) : (
                'Créer mon Profil'
              )}
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Submit; 