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
      <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mb-8 shadow-xl"
            >
              <span className="text-white font-bold text-4xl">T</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Find Your Tennis Partner
              <span className="block text-green-600">in Outremont</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Connect with local tennis players, find partners at your skill level, 
              and enjoy the beautiful courts of Outremont. Whether you're a beginner 
              or advanced player, there's someone waiting to play with you.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/submit">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-lg px-8 py-4"
                >
                  Join as Player
                </motion.button>
              </Link>
              <Link to="/players">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  Browse Players
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-20"></div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Tennis Outremont?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to connect with tennis players in your area
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎾",
                title: "Local Community",
                description: "Connect with players in Outremont and surrounding areas"
              },
              {
                icon: "📊",
                title: "Skill Matching",
                description: "Find partners at your exact skill level for better games"
              },
              {
                icon: "⏰",
                title: "Flexible Scheduling",
                description: "Coordinate availability and find convenient playing times"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="card text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home; 