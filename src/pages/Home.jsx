import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 left-20 w-32 h-32 bg-green-200 rounded-full opacity-20"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              rotate: [0, -180, -360]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-20 right-20 w-40 h-40 bg-blue-200 rounded-full opacity-20"
          />
          <motion.div
            animate={{
              x: [0, 60, 0],
              y: [0, -80, 0],
              rotate: [0, 90, 180]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-200 rounded-full opacity-20"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
              className="mx-auto w-28 h-28 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-8 shadow-2xl"
            >
              <span className="text-white font-bold text-5xl">T</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
            >
              Trouvez Votre Partenaire
              <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                de Tennis à Outremont
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Rejoignez la communauté tennis d'Outremont et connectez-vous avec des joueurs 
              de votre niveau. Profitez des magnifiques terrains de Saint-Viateur, Félix-Garneau et Joyce.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex justify-center space-x-8 mb-12"
            >
              {[
                { number: '3', label: 'Terrains', icon: '🏟️' },
                { number: '50+', label: 'Joueurs', icon: '👥' },
                { number: '24/7', label: 'Disponible', icon: '⏰' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring", stiffness: 200 }}
                  className="text-center"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-green-600">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link to="/submit">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-xl px-10 py-5 shadow-2xl"
                >
                  🎾 Rejoindre la Communauté
                </motion.button>
              </Link>
              <Link to="/players">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-xl px-10 py-5 shadow-2xl"
                >
                  👥 Voir les Joueurs
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Pourquoi Choisir Tennis Outremont ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre plateforme facilite la connexion entre joueurs de tennis dans votre région
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🏘️",
                title: "Communauté Locale",
                description: "Connectez-vous avec des joueurs d'Outremont et des environs",
                features: ["Joueurs vérifiés", "Niveaux variés", "Ambiance conviviale"]
              },
              {
                icon: "🎯",
                title: "Correspondance Parfaite",
                description: "Trouvez des partenaires à votre niveau exact pour de meilleurs matchs",
                features: ["Niveaux précis", "Compatibilité", "Progression"]
              },
              {
                icon: "📱",
                title: "Planification Flexible",
                description: "Coordonnez vos disponibilités et trouvez des horaires pratiques",
                features: ["Calendrier interactif", "Notifications", "Réservation facile"]
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="card text-center hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-6xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {feature.description}
                </p>
                <div className="space-y-2">
                  {feature.features.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + itemIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-center space-x-2 text-sm text-gray-700"
                    >
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Courts Section */}
      <div className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              🏟️ Nos Terrains de Tennis
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les trois magnifiques terrains de tennis d'Outremont
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Terrains Saint-Viateur",
                location: "Parc Saint-Viateur",
                description: "Terrains en excellent état avec vue sur le parc",
                features: ["Éclairage", "Parking", "Douches"],
                color: "from-blue-500 to-blue-600"
              },
              {
                name: "Terrains Félix-Garneau",
                location: "Parc Félix-Garneau",
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
            ].map((court, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-16 h-2 rounded-full bg-gradient-to-r ${court.color} mx-auto mb-6`}></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{court.name}</h3>
                <p className="text-green-600 font-medium mb-4">{court.location}</p>
                <p className="text-gray-600 mb-6">{court.description}</p>
                <div className="space-y-2">
                  {court.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-6"
          >
            Prêt à Jouer au Tennis ?
          </motion.h2>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-green-100 mb-8"
          >
            Rejoignez notre communauté et commencez à jouer dès aujourd'hui !
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link to="/submit">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-600 font-bold text-xl px-10 py-5 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                🎾 Commencer Maintenant
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home; 