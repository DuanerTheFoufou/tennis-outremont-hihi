import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleButtonClick = (link) => {
    if (link === '/players' && !currentUser) {
      navigate('/login');
    } else {
      navigate(link);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.08,
      y: -8,
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    tap: {
      scale: 0.92,
      transition: {
        duration: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const features = [
    {
      icon: '🎾',
      title: 'Trouvez votre partenaire',
      description: 'Connectez-vous avec des joueurs de votre niveau dans Outremont'
    },
    {
      icon: '🏟️',
      title: 'Terrains officiels',
      description: 'Jouez sur les terrains Saint-Viateur, FX-Garneau et Joyce'
    },
    {
      icon: '📅',
      title: 'Disponibilité flexible',
      description: 'Planifiez vos parties selon vos horaires disponibles'
    },
    {
      icon: '👥',
      title: 'Communauté locale',
      description: 'Rejoignez une communauté passionnée de tennis'
    }
  ];

  const stats = [
    { number: '50+', label: 'Joueurs actifs' },
    { number: '3', label: 'Terrains officiels' },
    { number: '24/7', label: 'Disponibilité' },
    { number: '100%', label: 'Gratuit' }
  ];

  const courts = [
    {
      name: "Terrains Saint-Viateur",
      location: "Parc Saint-Viateur",
      description: "Terrains en excellent état avec vue sur le parc",
      features: ["Éclairage", "Parking", "Douches"],
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Terrains FX-Garneau",
      location: "Parc FX-Garneau",
      description: "Terrains modernes avec surface professionnelle",
      features: ["Surface Pro", "Réservation", "Café"],
      color: "from-green-500 to-green-600"
    },
    {
      name: "Terrains Joyce",
      location: "Parc Joyce",
      description: "Terrains familiaux dans un cadre verdoyant",
      features: ["Famille", "Pique-nique", "Jeux"],
      color: "from-purple-500 to-purple-600"
    }
  ];

  const buttons = [
    {
      id: 'propose',
      title: 'Proposer un Match',
      description: 'Créez une nouvelle proposition de match',
      icon: '🎾',
      color: 'from-emerald-500 to-teal-600',
      hoverColor: 'from-emerald-600 to-teal-700',
      link: '/submit',
      delay: 0.2
    },
    {
      id: 'browse',
      title: currentUser ? 'Voir les Joueurs' : 'Se connecter pour voir les joueurs',
      description: currentUser ? 'Découvrez les joueurs disponibles' : 'Connectez-vous pour accéder à la communauté',
      icon: currentUser ? '👥' : '🔒',
      color: currentUser ? 'from-blue-500 to-indigo-600' : 'from-gray-500 to-gray-600',
      hoverColor: currentUser ? 'from-blue-600 to-indigo-700' : 'from-gray-600 to-gray-700',
      link: '/players',
      delay: 0.4
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-pink-200/20 to-purple-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -30, 0],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-green-200/15 to-teal-200/15 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <span className="text-4xl">🎾</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent">
                Tennis Outremont
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Trouvez votre partenaire de tennis idéal dans la communauté d'Outremont
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {currentUser ? (
                <Link
                  to="/submit"
                  className="btn-pastel-primary text-lg px-8 py-4"
                >
                  Créer mon profil
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="btn-pastel-primary text-lg px-8 py-4"
                >
                  Commencer
                </Link>
              )}
              
              <Link
                to="/players"
                className="btn-pastel-secondary text-lg px-8 py-4"
              >
                Voir les joueurs
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-center"
                >
                  <div className="card-pastel p-6">
                    <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                Pourquoi choisir Tennis Outremont ?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Une plateforme moderne et intuitive pour connecter les passionnés de tennis
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="card-pastel p-8 text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                  >
                    <span className="text-2xl">{feature.icon}</span>
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="card-pastel p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                Prêt à rejoindre la communauté ?
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Créez votre profil en quelques minutes et commencez à jouer avec des passionnés de tennis dans Outremont
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {currentUser ? (
                  <Link
                    to="/submit"
                    className="btn-pastel-primary text-lg px-8 py-4"
                  >
                    Créer mon profil
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="btn-pastel-primary text-lg px-8 py-4"
                  >
                    Commencer maintenant
                  </Link>
                )}
                
                <Link
                  to="/players"
                  className="btn-pastel-secondary text-lg px-8 py-4"
                >
                  Découvrir les joueurs
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-gray-200">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="text-gray-600 mb-4">
                © 2024 Tennis Outremont. Tous droits réservés.
              </p>
              
              <div className="flex justify-center space-x-6 text-sm text-gray-500">
                <span>Communauté locale</span>
                <span>•</span>
                <span>Terrains officiels</span>
                <span>•</span>
                <span>100% gratuit</span>
              </div>
            </motion.div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home; 