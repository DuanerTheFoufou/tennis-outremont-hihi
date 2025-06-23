import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Tennis Outremont
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
                Rejoignez la communauté tennis d'Outremont et connectez-vous avec des joueurs 
                de votre niveau. Profitez des magnifiques terrains de Saint-Viateur, FX-Garneau et Joyce.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <Link to="/submit">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-out transform"
                >
                  🎾 Créer Mon Profil
                </motion.button>
              </Link>
              <Link to="/players">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-gray-700 font-bold py-4 px-8 rounded-2xl text-lg border-2 border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 ease-out transform hover:border-gray-300"
                >
                  👥 Voir les Joueurs
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              className="flex justify-center space-x-8 mb-12"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6, ease: "easeOut" }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Choisir Tennis Outremont ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une plateforme moderne et intuitive pour connecter les passionnés de tennis dans votre quartier
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-out border border-gray-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courts Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🏟️ Nos Terrains de Tennis
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les magnifiques terrains de tennis disponibles dans votre quartier
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courts.map((court, index) => (
              <motion.div
                key={court.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-out overflow-hidden border border-gray-100"
              >
                <div className={`h-32 bg-gradient-to-r ${court.color} flex items-center justify-center`}>
                  <div className="text-4xl">🏟️</div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{court.name}</h3>
                  <p className="text-gray-600 mb-4">{court.location}</p>
                  <p className="text-gray-700 mb-6 leading-relaxed">{court.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {court.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Prêt à Rejoindre la Communauté ?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Créez votre profil en quelques minutes et commencez à jouer avec des partenaires passionnés
            </p>
            <Link to="/submit">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-600 font-bold py-4 px-8 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-out transform"
              >
                🎾 Commencer Maintenant
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 