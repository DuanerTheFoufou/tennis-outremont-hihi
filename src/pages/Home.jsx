import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      icon: "🎾",
      title: "Trouvez des Partenaires",
      description: "Connectez-vous avec des joueurs de votre niveau dans votre quartier"
    },
    {
      icon: "📅",
      title: "Planifiez Facilement",
      description: "Organisez vos parties avec un calendrier interactif et intuitif"
    },
    {
      icon: "🏟️",
      title: "Terrains Locaux",
      description: "Découvrez les meilleurs terrains de tennis d'Outremont"
    }
  ];

  const stats = [
    { number: "50+", label: "Joueurs Actifs" },
    { number: "3", label: "Terrains Disponibles" },
    { number: "24/7", label: "Disponibilité" }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
          className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 0.5 }}
          className="absolute bottom-40 right-1/3 w-36 h-36 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full opacity-20 blur-xl"
        />
      </div>

      <div className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-6 py-16 lg:py-24"
        >
          {/* Hero Section */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16 lg:mb-20"
          >
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight"
            >
              Tennis Outremont
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="text-xl lg:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Trouvez votre partenaire de tennis idéal dans le quartier d'Outremont. 
              Connectez-vous avec des joueurs passionnés et réservez vos créneaux sur nos terrains municipaux.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="group"
              >
                <Link
                  to="/submit"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-semibold text-lg rounded-2xl shadow-lg transform transition-all duration-300 ease-out group-hover:shadow-2xl group-hover:from-emerald-600 group-hover:to-blue-700"
                >
                  <span className="mr-3">🎾</span>
                  Proposer un Match
                  <motion.span
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="ml-3"
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>

              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="group"
              >
                <Link
                  to="/players"
                  className="inline-flex items-center px-8 py-4 bg-white text-gray-800 font-semibold text-lg rounded-2xl shadow-lg border-2 border-gray-200 transform transition-all duration-300 ease-out group-hover:shadow-2xl group-hover:border-emerald-300 group-hover:bg-emerald-50"
                >
                  <span className="mr-3">👥</span>
                  Voir les Joueurs
                  <motion.span
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="ml-3"
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 text-center group hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🎾</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Terrains Municipaux</h3>
              <p className="text-gray-600 leading-relaxed">
                Accès aux terrains Saint-Viateur, FX-Garneau et Joyce. 
                Réservation facile et sécurisée.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 text-center group hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Communauté Locale</h3>
              <p className="text-gray-600 leading-relaxed">
                Connectez-vous avec des joueurs passionnés du quartier. 
                Niveaux variés pour tous les styles de jeu.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 text-center group hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Rapide et Simple</h3>
              <p className="text-gray-600 leading-relaxed">
                Interface intuitive pour proposer et trouver des matches. 
                Calendrier interactif et notifications en temps réel.
              </p>
            </motion.div>
          </motion.div>

          {/* Court Information */}
          <motion.div
            variants={itemVariants}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-xl border border-white/50"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Nos Terrains
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🏟️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Terrains Saint-Viateur</h3>
                <p className="text-gray-600 text-sm">4 terrains extérieurs</p>
                <p className="text-gray-500 text-xs mt-1">Ouvert d'avril à octobre</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🎾</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">FX-Garneau</h3>
                <p className="text-gray-600 text-sm">2 terrains extérieurs</p>
                <p className="text-gray-500 text-xs mt-1">Ouvert d'avril à octobre</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Joyce</h3>
                <p className="text-gray-600 text-sm">2 terrains extérieurs</p>
                <p className="text-gray-500 text-xs mt-1">Ouvert d'avril à octobre</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
              className="mt-8 text-center"
            >
              <p className="text-gray-600 text-lg">
                Tous nos terrains sont équipés d'éclairage et accessibles en transport en commun.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home; 