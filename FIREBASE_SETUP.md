# Configuration Firebase pour Tennis Outremont

## Étape 1: Créer un projet Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquez sur "Créer un projet"
3. Nommez votre projet "tennis-outremont" (ou un nom similaire)
4. Suivez les étapes de configuration

## Étape 2: Activer l'authentification

1. Dans la console Firebase, allez dans "Authentication"
2. Cliquez sur "Commencer"
3. Dans l'onglet "Sign-in method", activez :
   - **Email/Password** (Email/Mot de passe)
   - **Google** (pour l'authentification Google)

### Configuration Google Auth :
1. Cliquez sur "Google" dans les méthodes de connexion
2. Activez Google comme fournisseur
3. Ajoutez votre domaine autorisé (pour la production)

## Étape 3: Configurer Firestore Database

1. Dans la console Firebase, allez dans "Firestore Database"
2. Cliquez sur "Créer une base de données"
3. Choisissez "Mode de test" pour commencer
4. Sélectionnez une région (préférablement proche de Montréal)

## Étape 4: Obtenir les clés de configuration

1. Dans la console Firebase, cliquez sur l'icône ⚙️ (Paramètres)
2. Sélectionnez "Paramètres du projet"
3. Dans l'onglet "Général", faites défiler jusqu'à "Vos applications"
4. Cliquez sur l'icône Web (</>) pour ajouter une application web
5. Nommez-la "Tennis Outremont Web"
6. Copiez la configuration Firebase

## Étape 5: Mettre à jour la configuration

Remplacez le contenu de `src/firebase.js` par votre vraie configuration :

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Remplacez par votre vraie configuration Firebase
const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_PROJECT_ID.firebaseapp.com",
  projectId: "VOTRE_PROJECT_ID",
  storageBucket: "VOTRE_PROJECT_ID.appspot.com",
  messagingSenderId: "VOTRE_SENDER_ID",
  appId: "VOTRE_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;
```

## Étape 6: Règles Firestore (Optionnel)

Pour la production, vous pouvez configurer des règles Firestore plus strictes :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Étape 7: Déploiement

Une fois configuré, votre application sera prête pour la production avec :
- ✅ Authentification par email/mot de passe
- ✅ Authentification Google
- ✅ Protection des routes
- ✅ Base de données utilisateurs
- ✅ Interface moderne et responsive

## Variables d'environnement (Recommandé)

Pour plus de sécurité, créez un fichier `.env.local` :

```
VITE_FIREBASE_API_KEY=votre_api_key
VITE_FIREBASE_AUTH_DOMAIN=votre_auth_domain
VITE_FIREBASE_PROJECT_ID=votre_project_id
VITE_FIREBASE_STORAGE_BUCKET=votre_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
VITE_FIREBASE_APP_ID=votre_app_id
```

Puis mettez à jour `firebase.js` :

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## Support

Si vous rencontrez des problèmes :
1. Vérifiez que toutes les méthodes d'authentification sont activées
2. Assurez-vous que les domaines autorisés incluent votre domaine de production
3. Vérifiez les règles Firestore
4. Consultez la console du navigateur pour les erreurs 