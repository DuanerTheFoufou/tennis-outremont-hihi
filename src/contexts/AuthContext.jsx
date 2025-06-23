import { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  // Inscription avec email/mot de passe
  const signup = async (email, password, displayName) => {
    try {
      console.log('Tentative d\'inscription:', { email, displayName });
      
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Utilisateur créé avec succès:', result.user.uid);
      
      // Mettre à jour le profil avec le nom d'affichage
      await updateProfile(result.user, {
        displayName: displayName
      });
      console.log('Profil mis à jour avec le nom d\'affichage');

      // Créer le profil utilisateur dans Firestore
      const userData = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: displayName,
        createdAt: new Date().toISOString(),
        level: 'Débutant',
        phone: '',
        bio: '',
        availability: []
      };
      
      await setDoc(doc(db, 'users', result.user.uid), userData);
      console.log('Profil Firestore créé avec succès');

      return result;
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      throw error;
    }
  };

  // Connexion avec email/mot de passe
  const login = async (email, password) => {
    try {
      console.log('Tentative de connexion:', { email });
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Connexion réussie:', result.user.uid);
      return result;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  };

  // Connexion avec Google
  const loginWithGoogle = async () => {
    try {
      console.log('Tentative de connexion Google');
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Connexion Google réussie:', result.user.uid);
      
      // Vérifier si l'utilisateur existe déjà dans Firestore
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      
      if (!userDoc.exists()) {
        console.log('Création du profil Firestore pour nouvel utilisateur Google');
        // Créer le profil utilisateur pour les nouveaux utilisateurs Google
        const userData = {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          createdAt: new Date().toISOString(),
          level: 'Débutant',
          phone: '',
          bio: '',
          availability: []
        };
        
        await setDoc(doc(db, 'users', result.user.uid), userData);
        console.log('Profil Firestore créé pour utilisateur Google');
      } else {
        console.log('Utilisateur Google existe déjà dans Firestore');
      }
      
      return result;
    } catch (error) {
      console.error('Erreur lors de la connexion Google:', error);
      throw error;
    }
  };

  // Déconnexion
  const logout = () => {
    console.log('Déconnexion');
    return signOut(auth);
  };

  // Charger le profil utilisateur depuis Firestore
  const loadUserProfile = async (uid) => {
    try {
      console.log('Chargement du profil utilisateur:', uid);
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const profileData = userDoc.data();
        console.log('Profil chargé:', profileData);
        setUserProfile(profileData);
      } else {
        console.log('Aucun profil trouvé pour cet utilisateur');
        setUserProfile(null);
      }
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
      setUserProfile(null);
    }
  };

  // Mettre à jour le profil utilisateur
  const updateUserProfile = async (updates) => {
    try {
      console.log('Mise à jour du profil:', updates);
      await setDoc(doc(db, 'users', currentUser.uid), updates, { merge: true });
      setUserProfile(prev => ({ ...prev, ...updates }));
      console.log('Profil mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      throw error;
    }
  };

  useEffect(() => {
    console.log('Initialisation de l\'AuthProvider');
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('État d\'authentification changé:', user ? user.uid : 'null');
      setCurrentUser(user);
      if (user) {
        await loadUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    loginWithGoogle,
    logout,
    updateUserProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 