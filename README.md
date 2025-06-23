# Tennis Outremont - Partner Finder

A modern React web application for finding tennis partners in Outremont, Montreal. Built with Vite, React, Tailwind CSS, React Router, and Framer Motion.

## 🎾 Features

- **Homepage**: Beautiful landing page with call-to-action buttons
- **Player Registration**: Comprehensive form to submit player profiles
- **Player Directory**: Browse and filter players by skill level
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Local Storage**: Data persistence using browser localStorage

## 🚀 Tech Stack

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **LocalStorage** - Data persistence

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd tennis-outremont-hihi
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📱 Pages

### Home (`/`)
- Hero section with logo and description
- Call-to-action buttons to join or browse players
- Feature highlights section

### Submit (`/submit`)
- Player registration form
- Fields: name, email, phone, skill level, availability, preferred courts, notes
- Form validation and submission feedback

### Players (`/players`)
- Grid layout of all registered players
- Search functionality by name, email, or notes
- Filter by skill level (Beginner, Intermediate, Advanced, Expert)
- Player cards with contact info, availability, and preferences

## 🎨 Design Features

- **Modern UI**: Clean, professional design with green tennis theme
- **Responsive Layout**: Mobile-first approach with breakpoints
- **Smooth Animations**: Page transitions, hover effects, and loading states
- **Accessibility**: Proper labels, focus states, and semantic HTML
- **Performance**: Optimized with Vite and modern React patterns

## 🔧 Customization

### Colors
The app uses a green tennis theme. You can customize colors in `src/index.css`:
- Primary: `green-600`
- Secondary: `blue-50`
- Background: `gray-50`

### Styling
All styles are in `src/index.css` using Tailwind CSS v4 with custom component classes:
- `.btn-primary` - Primary action buttons
- `.btn-secondary` - Secondary action buttons
- `.card` - Card containers
- `.input-field` - Form inputs
- `.label` - Form labels

## 📊 Data Storage

Currently, the app uses localStorage for data persistence:
- Player data is stored in `tennisPlayers` key
- Each player has a unique ID and timestamp
- Data persists across browser sessions

## 🚀 Deployment

### GitHub Pages

1. Add the `gh-pages` package:
```bash
npm install --save-dev gh-pages
```

2. Add deployment scripts to `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.js` for GitHub Pages:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/tennis-outremont-hihi/'
})
```

4. Deploy:
```bash
npm run deploy
```

### Other Platforms

The app can be deployed to any static hosting service:
- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your GitHub repository
- **Firebase Hosting**: Use Firebase CLI
- **AWS S3**: Upload to S3 bucket with static website hosting

## 🔮 Future Enhancements

- [ ] User authentication and profiles
- [ ] Real-time messaging between players
- [ ] Court booking system
- [ ] Match scheduling
- [ ] Player ratings and reviews
- [ ] Push notifications
- [ ] Mobile app version
- [ ] Backend API integration

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support, please open an issue on GitHub or contact the development team.

---

**Tennis Outremont** - Connecting tennis players in Montreal's beautiful Outremont neighborhood! 🎾
