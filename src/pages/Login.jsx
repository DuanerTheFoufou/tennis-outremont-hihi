import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [displayName, setDisplayName] = useState('');
  
  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Tentative de soumission du formulaire:', { isSignup, email, displayName });
      
      if (isSignup) {
        await signup(email, password, displayName);
        console.log('Inscription réussie');
      } else {
        await login(email, password);
        console.log('Connexion réussie');
      }
      navigate('/');
    } catch (error) {
      console.error('Erreur dans handleSubmit:', error);
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    
    try {
      console.log('Tentative de connexion Google');
      await loginWithGoogle();
      console.log('Connexion Google réussie');
      navigate('/');
    } catch (error) {
      console.error('Erreur dans handleGoogleLogin:', error);
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode) => {
    console.log('Code d\'erreur reçu:', errorCode);
    
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Aucun compte trouvé avec cet email.';
      case 'auth/wrong-password':
        return 'Mot de passe incorrect.';
      case 'auth/email-already-in-use':
        return 'Un compte existe déjà avec cet email.';
      case 'auth/weak-password':
        return 'Le mot de passe doit contenir au moins 6 caractères.';
      case 'auth/invalid-email':
        return 'Adresse email invalide.';
      case 'auth/popup-closed-by-user':
        return 'Connexion Google annulée.';
      case 'auth/popup-blocked':
        return 'La popup Google a été bloquée. Veuillez autoriser les popups.';
      case 'auth/network-request-failed':
        return 'Erreur de réseau. Vérifiez votre connexion internet.';
      case 'auth/too-many-requests':
        return 'Trop de tentatives. Veuillez réessayer plus tard.';
      case 'auth/operation-not-allowed':
        return 'Cette méthode d\'authentification n\'est pas activée.';
      default:
        console.log('Code d\'erreur non reconnu:', errorCode);
        return 'Une erreur est survenue. Veuillez réessayer.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
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

      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <span className="text-2xl">🎾</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl font-bold text-gray-900 mb-2"
            >
              {isSignup ? 'Créer un compte' : 'Se connecter'}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-gray-600"
            >
              {isSignup ? 'Rejoignez la communauté Tennis Outremont' : 'Accédez à votre compte'}
            </motion.p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
            >
              <div className="flex items-center">
                <span className="text-red-500 mr-2">⚠️</span>
                {error}
              </div>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignup && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required={isSignup}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Votre nom complet"
                />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: isSignup ? 0.6 : 0.5, duration: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="votre@email.com"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: isSignup ? 0.7 : 0.6, duration: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="••••••••"
              />
              {isSignup && (
                <p className="text-xs text-gray-500 mt-1">
                  Le mot de passe doit contenir au moins 6 caractères
                </p>
              )}
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
                />
              ) : (
                isSignup ? 'Créer mon compte' : 'Se connecter'
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="relative my-6"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">ou</span>
            </div>
          </motion.div>

          {/* Google Sign In */}
          <motion.button
            onClick={handleGoogleLogin}
            disabled={loading}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continuer avec Google</span>
          </motion.button>

          {/* Toggle Signup/Login */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-center mt-6"
          >
            <p className="text-gray-600">
              {isSignup ? 'Vous avez déjà un compte ?' : "Vous n'avez pas de compte ?"}
              <button
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError('');
                }}
                className="ml-2 text-green-600 hover:text-green-700 font-semibold transition-colors duration-200"
              >
                {isSignup ? 'Se connecter' : 'Créer un compte'}
              </button>
            </p>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-center mt-6"
          >
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              ← Retour à l'accueil
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login; 