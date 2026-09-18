# Rohit Negi — Portfolio

Personal portfolio for **Rohit Negi** — Machine Learning Engineer & Explainable AI practitioner. Built with plain HTML/CSS/JavaScript: no frameworks, no build step, deployable anywhere static files are served.

## ✨ Features

- **Animated UI** — particle-network background, typewriter hero, scroll reveals, animated stat counters, 3D card tilt, glassmorphism, custom cursor (respects `prefers-reduced-motion`)
- **🤖 AI chatbot** — answers questions about the resume: skills, projects, internships, certifications, contact, availability. Fuzzy matching (typos, plurals, synonyms), follow-up memory ("tell me more", "the second one"), clickable action buttons, chat history persistence. 100% local — no API keys, works on any static host.
- **📬 Contact form** — delivers messages via FormSubmit.co (JSON POST, mailto fallback)
- **💬 WhatsApp integration** — floating button, contact card, and form-area button with pre-filled message
- **📸 Hero portrait** — animated gradient ring with floating badges

## 📁 Structure

```
index.html        # Page markup
style.css         # Design system & animations
main.js           # Particles, scroll reveals, counters, tilt, cursor, contact form
chatbot-kb.js     # Chatbot knowledge base (pure data) + site facts config (single source of truth)
chatbot.js        # Chatbot matching engine, follow-up memory, persistence & UI
assets/           # Resume PDF, portrait photo
```

## 🚀 Run locally

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

## 🌐 Deploy

Drag the folder into [Netlify Drop](https://app.netlify.com/drop), or push to GitHub and enable GitHub Pages. No build settings needed.

## 📄 License

© 2026 Rohit Negi. All rights reserved.
