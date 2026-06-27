const http = require('http');
const nodemailer = require('nodemailer');
require('dotenv').config();

const PORT = 3001;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  // Health check
  if (req.method === 'GET' && req.url === '/api/health') {
    res.writeHead(200, corsHeaders);
    res.end(JSON.stringify({ status: 'ok', message: 'Portfolio API is running', timestamp: new Date().toISOString() }));
    return;
  }

  // Contact form
  if (req.method === 'POST' && req.url === '/api/contact') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { name, email, subject, message, language } = JSON.parse(body);

        if (!name || !email || !message) {
          res.writeHead(400, corsHeaders);
          res.end(JSON.stringify({ success: false, error: 'Missing required fields' }));
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          res.writeHead(400, corsHeaders);
          res.end(JSON.stringify({ success: false, error: 'Invalid email address' }));
          return;
        }

        console.log('\n📨 NEW CONTACT MESSAGE');
        console.log('─────────────────────────────');
        console.log(`From    : ${name} <${email}>`);
        console.log(`Subject : ${subject || 'No subject'}`);
        console.log(`Language: ${language || 'Unknown'}`);
        console.log(`Message : ${message}`);
        console.log(`Time    : ${new Date().toISOString()}`);
        console.log('─────────────────────────────\n');
        // Configuration du transporteur d'e-mail (ici avec Gmail)
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        // Contenu du mail que vous allez recevoir
        const mailOptions = {
          from: email,
          to: process.env.EMAIL_USER + ', ' + process.env.EMAIL_BCC, // Votre adresse qui recevra les messages des clients
          subject: subject || 'Nouveau message de mon Portfolio',
          text: `Nom: ${name}\nEmail: ${email}\nLangue: ${language}\n\nMessage:\n${message}`
        };

        // Envoi réel du mail
        await transporter.sendMail(mailOptions);


        res.writeHead(200, corsHeaders);
        res.end(JSON.stringify({
          success: true,
          message: 'Message received successfully! I will get back to you within 24 hours.'
        }));

      } catch (err) {
        console.error('Contact error:', err);
        res.writeHead(500, corsHeaders);
        res.end(JSON.stringify({ success: false, error: 'Server error. Please try again.' }));
      }
    });
    return;
  }

  // Projects endpoint
  if (req.method === 'GET' && req.url === '/api/projects') {
    const projects = [
      {
        id: 1,
        title: "MaliShop",
        category: "E-Commerce Full Stack",
        tech: ["PHP", "MySQL", "JavaScript", "CSS"],
        description: "Plateforme e-commerce complète avec intégration Orange Money & Wave. Paiement multi-devises FCFA/EUR/USD, dashboard admin, gestion stocks.",
        color: "#C9A84C",
        icon: "🛒",
        link: "#"
      },
      {
        id: 2,
        title: "SocialCraft",
        category: "AI-Powered Tool",
        tech: ["FastAPI", "Python", "Claude API", "React"],
        description: "Générateur de contenu social alimenté par Claude AI. Posts optimisés pour Instagram, LinkedIn, Twitter en plusieurs langues simultanément.",
        color: "#7B2FBE",
        icon: "✨",
        link: "#"
      },
      {
        id: 3,
        title: "Savana Restaurant",
        category: "Website & Branding",
        tech: ["HTML", "CSS", "JavaScript", "PHP"],
        description: "Site premium pour restaurant de cuisine ouest-africaine à Bamako. Design immersif dark/gold avec réservation en ligne intégrée.",
        color: "#C9A84C",
        icon: "🌿",
        link: "#"
      },
      {
        id: 4,
        title: "Élégance Parfums",
        category: "E-Commerce",
        tech: ["PHP", "MySQL", "XAMPP", "JavaScript"],
        description: "Boutique en ligne multipage pour parfums de luxe. Panier, paiement, formulaire contact PHP et animations UI raffinées.",
        color: "#7B2FBE",
        icon: "🌸",
        link: "#"
      }
    ];
    res.writeHead(200, corsHeaders);
    res.end(JSON.stringify({ success: true, projects }));
    return;
  }

  // Skills endpoint
  if (req.method === 'GET' && req.url === '/api/skills') {
    const skills = {
      development: [
        { name: "PHP / MySQL", level: 85 },
        { name: "Python / FastAPI", level: 80 },
        { name: "JavaScript", level: 82 },
        { name: "HTML / CSS", level: 90 },
        { name: "Java OOP", level: 75 },
        { name: "WordPress", level: 85 }
      ],
      ai: [
        { name: "Anthropic Claude API", level: 88 },
        { name: "AI Integration", level: 82 },
        { name: "Prompt Engineering", level: 80 }
      ],
      languages: [
        { name: "Bambara", level: 100, flag: "🇲🇱", label: "Langue maternelle" },
        { name: "Wolof", flag: "🇸🇳", level: 90, label: "Courant" },
        { name: "Français", flag: "🇫🇷", level: 95, label: "Courant" },
        { name: "Anglais", flag: "🇬🇧", level: 85, label: "Professional" }
      ],
      other: [
        { name: "Linux / Networking", level: 78 },
        { name: "UX / UI Design", level: 82 },
        { name: "Git / GitHub", level: 80 },
        { name: "Translation FR↔EN↔BM", level: 90 }
      ]
    };
    res.writeHead(200, corsHeaders);
    res.end(JSON.stringify({ success: true, skills }));
    return;
  }

  res.writeHead(404, corsHeaders);
  res.end(JSON.stringify({ error: 'Route not found' }));
});

server.listen(PORT, () => {
  console.log(`\n✅ Portfolio API running on http://localhost:${PORT}`);
  console.log(`\n📡 Available endpoints:`);
  console.log(`   GET  /api/health`);
  console.log(`   GET  /api/projects`);
  console.log(`   GET  /api/skills`);
  console.log(`   POST /api/contact\n`);
});
