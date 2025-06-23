import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredSection, setHoveredSection] = useState(null);
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: '🎾',
      title: 'Trouvez votre partenaire',
      description: 'Connectez-vous avec des joueurs de votre niveau',
      color: 'from-emerald-400 to-teal-500',
      delay: 0.1
    },
    {
      icon: '🏟️',
      title: 'Terrains officiels',
      description: 'Saint-Viateur, FX-Garneau et Joyce',
      color: 'from-blue-400 to-indigo-500',
      delay: 0.2
    },
    {
      icon: '📅',
      title: 'Disponibilité flexible',
      description: 'Planifiez selon vos horaires',
      color: 'from-purple-400 to-pink-500',
      delay: 0.3
    },
    {
      icon: '👥',
      title: 'Communauté locale',
      description: 'Passionnés d\'Outremont',
      color: 'from-orange-400 to-red-500',
      delay: 0.4
    }
  ];

  const stats = [
    { number: '50+', label: 'Joueurs actifs', icon: '👥' },
    { number: '3', label: 'Terrains officiels', icon: '🏟️' },
    { number: '24/7', label: 'Disponibilité', icon: '⏰' },
    { number: '100%', label: 'Gratuit', icon: '💚' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
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
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -30, 0],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/3 w-80 h-80 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl"
        />
      </div>

      {/* Mouse Follower */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      <div className="relative z-10">
        {/* Hero Section - Asymmetrical Layout */}
        <section className="pt-32 pb-20 px-6 relative">
          <div className="max-w-7xl mx-auto">
            {/* Main Content - Left Side */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative"
              >
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl opacity-20 blur-sm"
                />
                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-10 -right-10 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-sm"
                />

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="relative z-10"
                >
                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
                    <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                      Tennis
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                      Outremont
                    </span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-lg">
                    Découvrez une nouvelle façon de jouer au tennis. 
                    <span className="text-emerald-400 font-semibold"> Connectez-vous</span> avec des passionnés, 
                    <span className="text-purple-400 font-semibold"> jouez</span> sur nos terrains officiels.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-6">
                    {currentUser ? (
                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="group"
                      >
                        <Link
                          to="/submit"
                          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300"
                        >
                          <span className="mr-3">Créer mon profil</span>
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                        </Link>
                      </motion.div>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="group"
                      >
                        <Link
                          to="/login"
                          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300"
                        >
                          <span className="mr-3">Commencer</span>
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                        </Link>
                      </motion.div>
                    )}
                    
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to="/players"
                        className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300"
                      >
                        <span className="mr-3">Voir les joueurs</span>
                        <span>👥</span>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Side - Floating Cards */}
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + feature.delay, duration: 0.8 }}
                      whileHover={{ 
                        scale: 1.05, 
                        rotateY: 5,
                        transition: { duration: 0.3 }
                      }}
                      onHoverStart={() => setHoveredSection(feature.title)}
                      onHoverEnd={() => setHoveredSection(null)}
                      className={`relative group cursor-pointer ${
                        index % 2 === 0 ? 'mt-8' : ''
                      }`}
                    >
                      <motion.div
                        animate={{
                          rotate: hoveredSection === feature.title ? 360 : 0,
                          scale: hoveredSection === feature.title ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.6 }}
                        className={`w-full h-48 bg-gradient-to-br ${feature.color} rounded-3xl p-6 shadow-2xl border border-white/20 backdrop-blur-sm`}
                      >
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <h3 className="text-lg font-bold text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </motion.div>
                      
                      {/* Glow Effect */}
                      <motion.div
                        animate={{
                          opacity: hoveredSection === feature.title ? 0.6 : 0,
                          scale: hoveredSection === feature.title ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl blur-xl -z-10`}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section - Morphing Cards */}
        <section className="py-20 px-6 relative">
          <motion.div
            style={{ y }}
            className="max-w-6xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Notre communauté en chiffres
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.1,
                    rotateY: 10,
                    transition: { duration: 0.3 }
                  }}
                  className="group"
                >
                  <motion.div
                    whileHover={{ 
                      background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))",
                      transition: { duration: 0.3 }
                    }}
                    className="relative p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
                  >
                    {/* Animated Background */}
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 8, 
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-purple-500/10 rounded-3xl"
                    />
                    
                    <div className="relative z-10 text-center">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="text-3xl mb-4"
                      >
                        {stat.icon}
                      </motion.div>
                      
                      <div className="text-3xl md:text-4xl font-black text-white mb-2">
                        {stat.number}
                      </div>
                      
                      <div className="text-gray-300 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA Section - Organic Shapes */}
        <section className="py-32 px-6 relative">
          <div className="max-w-4xl mx-auto text-center relative">
            {/* Organic Background Shape */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-purple-500/20 to-pink-500/20 rounded-[100px] blur-3xl -z-10"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Prêt à rejoindre l'aventure ?
              </h2>
              
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                Créez votre profil en quelques minutes et commencez à jouer avec des passionnés de tennis dans Outremont
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {currentUser ? (
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/submit"
                      className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 text-lg"
                    >
                      <span className="mr-3">Créer mon profil</span>
                      <motion.span
                        animate={{ x: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        🚀
                      </motion.span>
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/login"
                      className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 text-lg"
                    >
                      <span className="mr-3">Commencer maintenant</span>
                      <motion.span
                        animate={{ x: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        🚀
                      </motion.span>
                    </Link>
                  </motion.div>
                )}
                
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/players"
                    className="inline-flex items-center px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 text-lg"
                  >
                    <span className="mr-3">Découvrir les joueurs</span>
                    <span>👥</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-6 border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-gray-400 mb-4">
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