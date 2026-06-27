# 🌟 Portfolio Fatima Maiga — SaharrienneTech

Portfolio professionnel Full Stack avec backend API Node.js.

---

## 📁 Structure

```
portfolio/
├── public/
│   └── index.html        ← Frontend (ouvrir dans le navigateur)
├── api/
│   ├── server.js          ← Backend API Node.js
│   └── package.json
└── README.md
```

---

## 🚀 Lancer le projet

### Frontend seul (aucune installation requise)
```bash
# Double-cliquer sur public/index.html
# OU
open public/index.html
```

### Backend API
```bash
cd api
node server.js
# → http://localhost:3001
```

---

## 📡 API Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/health` | Vérification santé |
| GET | `/api/projects` | Liste des projets |
| GET | `/api/skills` | Compétences |
| POST | `/api/contact` | Formulaire de contact |

### POST /api/contact
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Développement de site",
  "message": "Bonjour...",
  "language": "fr"
}
```

---

## 🔧 Configurer l'email en production

Dans `api/server.js`, remplacer le bloc commenté par :

```javascript
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'maigafatoumata160@gmail.com',
    pass: 'TON_APP_PASSWORD'  // Google App Password
  }
});

await transporter.sendMail({
  from: `"${name}" <${email}>`,
  to: 'maigafatoumata160@gmail.com',
  subject: subject || 'Message depuis portfolio',
  text: message
});
```

---

## 🌍 Déploiement

**Frontend** → Netlify, Vercel, ou GitHub Pages (drag & drop `public/`)

**Backend API** → Railway, Render, ou VPS
```bash
# Sur Render / Railway : Build Command = node api/server.js
```

---

## ✨ Features

- Design dark glassmorphism or/violet unique
- Curseur personnalisé animé
- Orbe langues animée (Bambara · Wolof · FR · EN)
- Texte rotatif dans le hero
- Barres de compétences animées au scroll
- Reveal animations au scroll
- Formulaire contact avec fallback mailto
- Backend API REST complet
- Responsive mobile / tablette / desktop

---

*Built by Fatima Maiga · SaharrienneTech · Bamako, Mali 🇲🇱*
