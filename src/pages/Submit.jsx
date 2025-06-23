import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import InteractiveCalendar from '../components/InteractiveCalendar';
import CourtSelector from '../components/CourtSelector';

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
  const [currentStep, setCurrentStep] = useState(1);

  const levels = [
    { value: 'debutant', label: 'Débutant (0-2 ans)', description: 'Apprentissage des bases' },
    { value: 'intermediaire', label: 'Intermédiaire (2-5 ans)', description: 'Technique en développement' },
    { value: 'avance', label: 'Avancé (5+ ans)', description: 'Joueur expérimenté' },
    { value: 'expert', label: 'Expert/Compétitif', description: 'Niveau compétition' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTimeToggle = (timeKey) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(timeKey)
        ? prev.availability.filter(item => item !== timeKey)
        : [...prev.availability, timeKey]
    }));
  };

  const handleCourtToggle = (courtId) => {
    setFormData(prev => ({
      ...prev,
      courts: prev.courts.includes(courtId)
        ? prev.courts.filter(item => item !== courtId)
        : [...prev.courts, courtId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.level) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

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

  const nextStep = () => {
    // Validate current step before proceeding
    if (currentStep === 1 && (!formData.name || !formData.email)) {
      alert('Veuillez remplir votre nom et email avant de continuer.');
      return;
    }
    if (currentStep === 2 && !formData.level) {
      alert('Veuillez sélectionner votre niveau de tennis.');
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };
  
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const steps = [
    { number: 1, title: 'Informations Personnelles', icon: '👤' },
    { number: 2, title: 'Niveau de Tennis', icon: '🎾' },
    { number: 3, title: 'Disponibilité', icon: '📅' },
    { number: 4, title: 'Terrains Préférés', icon: '🏟️' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen py-12 bg-gradient-to-br from-green-50 to-blue-50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Rejoignez la Communauté Tennis
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="text-xl text-gray-600"
          >
            Créez votre profil et trouvez des partenaires de tennis à Outremont
          </motion.p>
        </div>

        {/* Progress Steps */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <motion.div 
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ease-out ${
                    currentStep >= step.number
                      ? 'bg-green-600 border-green-600 text-white scale-110'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">{step.icon}</span>
                </motion.div>
                {index < steps.length - 1 && (
                  <motion.div 
                    className={`w-16 h-0.5 transition-all duration-500 ease-out ${
                      currentStep > step.number ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: currentStep > step.number ? 1 : 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <motion.p 
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-lg font-semibold text-gray-900"
            >
              {steps[currentStep - 1].title}
            </motion.p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">👤 Vos Informations</h3>
                  <p className="text-gray-600">Commençons par vos coordonnées</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="label">Nom Complet *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                      placeholder="Votre nom complet"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="label">Adresse Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                      placeholder="votre.email@exemple.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="label">Numéro de Téléphone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="(514) 555-0123 (optionnel)"
                  />
                </div>

                <div className="flex justify-end">
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.name || !formData.email}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:y-0"
                  >
                    Suivant →
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Tennis Level */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">🎾 Votre Niveau</h3>
                  <p className="text-gray-600">Sélectionnez votre niveau de tennis</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {levels.map((level) => (
                    <motion.label
                      key={level.value}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ease-out
                        ${formData.level === level.value
                          ? 'border-green-500 bg-green-50 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-gray-300 shadow-md hover:shadow-lg'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="level"
                        value={level.value}
                        checked={formData.level === level.value}
                        onChange={handleInputChange}
                        required
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          formData.level === level.value
                            ? 'border-green-500 bg-green-500'
                            : 'border-gray-300'
                        }`}>
                          {formData.level === level.value && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 25 }}
                              className="w-2 h-2 bg-white rounded-full"
                            />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{level.label}</div>
                          <div className="text-sm text-gray-600">{level.description}</div>
                        </div>
                      </div>
                    </motion.label>
                  ))}
                </div>

                <div className="flex justify-between">
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-secondary"
                  >
                    ← Précédent
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.level}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:y-0"
                  >
                    Suivant →
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Availability */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-6"
              >
                <InteractiveCalendar
                  selectedTimes={formData.availability}
                  onTimeToggle={handleTimeToggle}
                />

                <div className="flex justify-between">
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-secondary"
                  >
                    ← Précédent
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary"
                  >
                    Suivant →
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Court Selection */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-6"
              >
                <CourtSelector
                  selectedCourts={formData.courts}
                  onCourtToggle={handleCourtToggle}
                />

                <div className="space-y-4">
                  <label htmlFor="notes" className="label">Notes Additionnelles</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="input-field"
                    placeholder="Informations supplémentaires sur votre style de jeu, préférences ou exigences particulières..."
                  />
                </div>

                <div className="flex justify-between">
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-secondary"
                  >
                    ← Précédent
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:y-0"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Envoi en cours...</span>
                      </div>
                    ) : (
                      'Créer Mon Profil 🎾'
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Submit; 