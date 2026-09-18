/* ============ CHATBOT KNOWLEDGE BASE (pure data) ============
   Loaded before chatbot.js. Exposes CHAT_CONFIG (facts) and CHAT_KB
   (entries + follow-up walk order). Edit facts/answers here only —
   the engine and the page consume these values; nothing hardcodes them. */
window.CHAT_CONFIG = {
  name: 'Rohit Negi',
  email: 'rnegilxm16@gmail.com',
  phoneDisplay: '+91 81302 06537',
  phoneHref: '+918130206537',
  whatsapp: 'https://wa.me/918130206537?text=Hi%20Rohit!%20I%20saw%20your%20portfolio%20and%20I%27d%20love%20to%20connect%20about%20an%20opportunity.',
  linkedin: 'https://linkedin.com/in/rohit-negi-b55709290',
  github: 'https://github.com/rohit-negi69',
  location: 'Faridabad, Haryana, India',
  resumePath: 'assets/Rohit-Resume.pdf',
  resumeFile: 'Rohit-Negi-Resume.pdf',
  formEndpoint: 'https://formsubmit.co/ajax/rnegilxm16@gmail.com'
};

window.CHAT_KB = {
  entries: [
    {
      tag: 'greeting',
      keywords: ['hi', 'hello', 'hey', 'yo', 'namaste', 'hii', 'hlo', 'helo', 'greetings', 'sup', 'kaise ho', 'kya haal', 'good morning', 'good evening', 'good night', 'howdy'],
      exact: true,
      answer: `Hey there! 👋 I'm Rohit's AI assistant — I know his résumé inside out: every project, metric, certification and internship.\n\nAsk me anything — try "what makes him strong in ML?" or "his best project?"`
    },
    {
      tag: 'help',
      keywords: ['help', 'what can you', 'options', 'menu', 'guide', 'what do you know', 'topics'],
      answer: `I can answer questions on:\n\n• 🧠 Skills — Python, TensorFlow, SHAP/XAI, Tableau, Docker... ask about ANY specific tool\n• 🚀 Projects — all 4, with real metrics (85% accuracy, 23x speedup...)\n• 💼 Internships — Aarsh AI Technologies & Prodigy InfoTech\n• 🎓 Education — CGPA, percentages, coursework\n• 🏅 Certifications — Oracle, NVIDIA, Cisco, Coursera, NPTEL\n• 🏆 Achievements — Smart India Hackathon, LeetCode 100+, TechSangram\n• 📬 Contact & availability\n\nOr just say "tell me more" / "the second one" after a list!`
    },
    {
      tag: 'thanks',
      keywords: ['thank', 'thanks', 'thankyou', 'great', 'awesome', 'cool', 'nice', 'amazing', 'impressive', 'love it', 'well done', 'good job', 'shabash'],
      answer: `Thank you so much! 🙏 If you'd like to take it further, drop Rohit a line — he replies fast! 😄`
    },
    {
      tag: 'summary',
      keywords: ['who', 'about', 'yourself', 'introduce', 'intro', 'bio', 'summary', 'profile', 'overview', 'tell me about rohit', 'who is rohit', 'who are you', 'describe'],
      answer: `👋 Rohit Negi — B.Tech Computer Science & Engineering student at Haridwar University (2023–2027, CGPA 7.00), based in Faridabad, Haryana.\n\nWhat sets him apart:\n\n• 🏭 Real industry experience — 2 internships (Aarsh AI Technologies, Prodigy InfoTech)\n• 🔍 Explainable AI specialist — SHAP-based interpretability in production\n• 🚀 Ships end-to-end: data → model → Flask app → live deployment on Vercel\n• ⚡ Production mindset — distilled a 61MB model to 2.6MB for 23x faster deployment\n• 💻 100+ DSA problems on LeetCode, 3rd place at Smart India Hackathon 2024\n\nCurrently seeking ML Engineer or software engineering roles.`
    },
    {
      tag: 'strengths',
      keywords: ['strength', 'strengths', 'strongest', 'strong point', 'why hire', 'why should i hire', 'why you', 'what makes him', 'special', 'unique', 'standout', 'differentiate', 'best quality', 'usP', 'why rohit'],
      answer: `💪 What makes Rohit a strong hire:\n\n1. Production-proven, not just coursework — his attrition platform is LIVE on Vercel with real users in mind, built during an industry internship\n2. Rare XAI skills — most juniors can train a model; he can EXPLAIN it (SHAP attribution, demographic fairness checks)\n3. Cost/performance instinct — model distillation (61MB → 2.6MB, 23x deployability) shows he thinks about inference cost, not just accuracy\n4. Full ML lifecycle — preprocessing, feature engineering, SMOTE, 5-fold CV benchmarking, Flask serving, Docker, CI-ready habits (Git/GitHub)\n5. Verified fundamentals — 100+ LeetCode DSA problems, NPTEL Elite, Oracle Cloud certified`
    },
    {
      tag: 'goal',
      keywords: ['goal', 'looking for', 'seeking', 'want to do', 'career', 'aspiration', 'future plan', 'aim', 'dream job', 'what role', 'which role'],
      answer: `🎯 Rohit is seeking **Machine Learning Engineer** or **software engineering** roles, and is open to internships and collaborations too. His coursework and projects are pointed squarely at applied ML: ML, Deep Learning, Computer Vision, plus NVIDIA's RAG Agents certification for the LLM era.`
    },
    {
      tag: 'location',
      keywords: ['where', 'location', 'based', 'live', 'city', 'from', 'faridabad', 'haryana', 'delhi', 'india', 'relocate', 'relocation', 'remote'],
      answer: `📍 Rohit is based in Faridabad, Haryana (NCR region — close to Delhi). His Aarsh AI internship was on-site in New Delhi; the Prodigy internship was remote. He's open to both remote and on-site opportunities across India and beyond 🌍.`
    },
    {
      tag: 'skills',
      keywords: ['skill', 'tech stack', 'technology', 'technologies', 'language', 'programming', 'tools', 'proficient', 'capable', 'expertise', 'good at', 'competencies', 'what can he do', 'what does he know', 'abilities'],
      answer: `🛠 Full tech arsenal:\n\n• Languages: Python, Java, SQL, JavaScript, HTML, CSS\n• ML/DL: Scikit-learn, XGBoost, LightGBM, SHAP (XAI), TensorFlow, Keras, CNN, OpenCV, Ensemble Methods\n• Data & Viz: Pandas, NumPy, Plotly, Matplotlib, Seaborn, Tableau, Excel\n• Tools & Platforms: Git, GitHub, Docker, Vercel, Flask, Streamlit, Jupyter, Oracle Cloud (OCI), Linux\n• Core: DSA, OOP, Model Distillation, System Design\n\nAsk about any one of these for how he's used it!`
    },
    {
      tag: 'skill-python',
      keywords: ['python', 'pandas', 'numpy', 'scikit', 'sklearn', 'plotly', 'matplotlib', 'seaborn'],
      answer: `🐍 Python is Rohit's primary language — used in every project:\n\n• End-to-end ML pipelines with Scikit-learn (preprocessing, feature engineering, training, evaluation)\n• Data wrangling with Pandas/NumPy, visualization with Plotly/Matplotlib/Seaborn\n• Classical ML: XGBoost, LightGBM, ExtraTrees, ensembles, SMOTE class-balancing, 5-fold cross-validation\n• Deep learning with TensorFlow/Keras; image work with OpenCV\n• Web integration via Flask & Streamlit`
    },
    {
      tag: 'skill-web',
      keywords: ['java', 'sql', 'javascript', 'html', 'css', 'frontend', 'backend', 'web development', 'web dev', 'database'],
      answer: `🌐 Besides Python, Rohit knows:\n\n• JavaScript, HTML, CSS — certified via Coursera's "HTML, CSS and JavaScript for Web Developers"; built this very portfolio\n• Java — OOP and DSA practice\n• SQL — for structured data work\n• Flask & Streamlit — serving ML models as web apps (his attrition dashboard runs on Flask)`
    },
    {
      tag: 'skill-tensorflow',
      keywords: ['tensorflow', 'keras', 'cnn', 'opencv', 'deep learning', 'neural', 'computer vision', 'image'],
      answer: `🤖 Deep learning experience:\n\n• Designed & trained a CNN in TensorFlow/Keras for Cats-vs-Dogs classification — with data augmentation, dropout regularization, and train/validation loss tracking to kill overfitting\n• OpenCV + NumPy for image preprocessing (resize, normalize)\n• Coursework: Deep Learning & Computer Vision at university\n\nWant details? Ask "tell me about his CNN project".`
    },
    {
      tag: 'skill-docker',
      keywords: ['docker', 'container', 'kubernetes', 'containerization', 'compose'],
      answer: `🐳 Docker: Rohit containerized his Spotify Music Recommendation System with Docker & Docker Compose — model pipelines serialized via pickle for fully reproducible container deployment (port 8501). He understands why containers matter for ML reproducibility.`
    },
    {
      tag: 'skill-cloud',
      keywords: ['oracle', 'oci', 'cloud', 'aws', 'azure', 'gcp', 'linux', 'vercel', 'hosting'],
      answer: `☁️ Cloud & platforms:\n\n• Oracle Cloud Infrastructure 2025 Certified Foundations Associate (official Oracle certification)\n• Vercel — deployed his attrition ML platform live (Flask + serverless)\n• Linux daily driver, Git/GitHub workflow, Jupyter for experimentation`
    },
    {
      tag: 'skill-tableau',
      keywords: ['tableau', 'bi', 'business intelligence', 'excel', 'data visualization', 'data viz', 'dashboard skill', 'reporting'],
      answer: `📊 BI & visualization: Rohit designed an interactive Tableau dashboard over 1,470 employee records — treemaps, heatmaps, dual-line charts, salary analysis across 9 roles ($2.6k → $18k+), gender/education splits. Plus Python-side viz: Plotly, Matplotlib, Seaborn, and Excel.`
    },
    {
      tag: 'experience',
      keywords: ['experience', 'internship', 'intern', 'work history', 'work experience', 'job', 'employment', 'company', 'companies', 'worked', 'professional', 'industry'],
      answer: `💼 Two internships:\n\n1. 🏢 AI & ML Intern — Aarsh AI Technologies, New Delhi (Jun 8 – Jul 25, 2026)\n   2-month industry internship in production AI/ML. Built the Employee Attrition Prediction & Retention Platform: full Scikit-learn pipeline, SHAP explainability, Flask dashboard, deployed LIVE on Vercel.\n\n2. 🏠 Machine Learning Intern — Prodigy InfoTech, Remote (Feb 1–28, 2025)\n   1-month intensive internship on the complete ML pipeline — preprocessing, feature engineering, EDA, model benchmarking. Completed with OUTSTANDING remarks.\n\nAsk "about his Aarsh internship" or "about Prodigy" for deep dives!`
    },
    {
      tag: 'intern-aarsh',
      keywords: ['aarsh', 'aarsh ai', 'aarsh ai technologies', 'aarsh internship', 'new delhi internship', 'latest internship', 'most recent internship', 'june 2026', '2026 internship'],
      answer: `🏢 AI & ML Intern — Aarsh AI Technologies (New Delhi, Jun 8 – Jul 25, 2026):\n\n• 2-month intensive industry internship in production AI/ML development\n• Built the Intelligent Employee Attrition Prediction & Retention Platform end-to-end: Python + Scikit-learn pipeline covering preprocessing → feature engineering → training → evaluation\n• Implemented SHAP-based Explainable AI to surface which organizational & demographic factors drive attrition risk\n• Developed a Flask web dashboard for real-time risk scoring + retention recommendations\n• Deployed the whole thing LIVE on Vercel — a complete production workflow: ML → XAI → Web → Serverless ✅`
    },
    {
      tag: 'intern-prodigy',
      keywords: ['prodigy', 'prodigy infotech', 'prodigy internship', 'february 2025', 'feb 2025', 'first internship', 'virtual internship', 'remote internship'],
      answer: `🏠 Machine Learning Intern — Prodigy InfoTech (Remote, Feb 1–28, 2025):\n\n• 1-month intensive ML internship — completed with OUTSTANDING remarks ⭐\n• Worked the full pipeline: data preprocessing, feature engineering, EDA, model training, performance evaluation on structured datasets\n• Implemented, fine-tuned & benchmarked supervised algorithms with Scikit-learn + Pandas, tracking Accuracy/Precision/Recall/F1 against baselines\n• Also completed Prodigy's "Machine Learning with Python" hands-on course with practical assessments`
    },
    {
      tag: 'projects',
      keywords: ['project', 'projects', 'portfolio work', 'built what', 'showcase', 'repos', 'repository', 'what has he built', 'side projects', 'personal projects'],
      answer: `🚀 4 major projects:\n\n1. 🧑‍💼 Employee Attrition Prediction & Retention Platform — Python, Flask, SHAP, Vercel\n   85% accuracy, 77.3% ROC-AUC, 23x deployment optimization\n2. 📊 IBM HR Analytics Interactive Dashboard — Tableau BI over 1,470 records\n3. 🎵 Spotify Music Recommendation System — KNN + Spotipy + Docker\n4. 🐱🐶 Cats vs Dogs Image Classification — CNN in TensorFlow/Keras\n\nAsk "about project 1" (or 2/3/4) — or just name one!`
    },
    {
      tag: 'project-attrition',
      keywords: ['attrition', 'employee attrition', 'retention', 'turnover', 'hr platform', 'resignation', 'flagship', 'best project', 'main project', 'churn'],
      answer: `🧑‍💼 Flagship: Intelligent Employee Attrition Prediction & Retention Platform\n\n• Predicts which employees are likely to resign + generates explainable retention strategies\n• 🎯 Benchmarked 8+ algorithms (XGBoost, LightGBM, ExtraTrees, ensembles) with SMOTE & 5-fold CV → **85.0% accuracy, 77.3% ROC-AUC**\n• ⚡ **23x deployability gain**: distilled a 61MB ensemble into a 2.6MB calibrated model — cold-start 15 min → ~1 min\n• 🔍 SHAP feature attribution + demographic fairness checks + automated recommendation engine\n• 🌐 Full-stack Flask app, deployed live on Vercel\n\nBuilt during his Aarsh AI internship.`
    },
    {
      tag: 'project-dashboard',
      keywords: ['ibm', 'hr analytics', 'tableau dashboard', 'bi dashboard', 'analytics dashboard', 'project 2', 'second project'],
      answer: `📊 IBM HR Analytics Interactive Dashboard (Tableau):\n\n• Interactive BI dashboard tracking **1,470 employee records**\n• Workforce demographics, retention rates, tenure (avg 7.0 yrs), experience trends (avg 11.3 yrs)\n• Multidimensional visuals: treemaps, heatmaps, dual-line charts\n• Gender distribution (60% Male / 40% Female), marital status, age-by-role analysis\n• Monthly income across 9 job roles ($2.6k → $18k+) & education fields (600+ Life Sciences, 460+ Medical) — surfaced compensation disparities that informed HR retention strategy`
    },
    {
      tag: 'project-spotify',
      keywords: ['spotify', 'music', 'recommendation system', 'recommender', 'song', 'knn', 'k-nearest', 'spotipy', 'project 3', 'third project'],
      answer: `🎵 Spotify Music Recommendation System:\n\n• Content-based recommender: K-Nearest Neighbors (Scikit-learn) on audio features — danceability, energy, tempo, valence\n• 🔗 Spotify Web API (Spotipy) enrichment: live album artwork, 30-second audio previews, direct Spotify links\n• 🖱️ Interactive Streamlit app: fuzzy song search (difflib), adjustable recommendation count (3–10 tracks), real-time inference\n• 🐳 Fully Dockerized (Docker + Compose), models serialized via pickle for reproducible deployment on port 8501`
    },
    {
      tag: 'project-cnn',
      keywords: ['cnn project', 'cats', 'dogs', 'cats vs dogs', 'image classification', 'image classifier', 'project 4', 'fourth project'],
      answer: `🐱🐶 Cats vs Dogs Image Classification:\n\n• CNN designed & trained from scratch in TensorFlow/Keras for binary image classification\n• Data augmentation + dropout regularization to fight overfitting\n• OpenCV/NumPy preprocessing: resizing & normalization\n• Tracked training vs validation loss curves to tune convergence\n• Connected to university coursework in Deep Learning & Computer Vision`
    },
    {
      tag: 'xai',
      keywords: ['shap', 'explainable', 'xai', 'explainability', 'interpret', 'interpretability', 'black box', 'feature importance', 'attribution', 'fairness'],
      answer: `🔍 Explainable AI is Rohit's specialization:\n\n• Used SHAP in his attrition platform for feature attribution — showing exactly WHY the model flags an employee as high-risk\n• Built demographic fairness checks into the pipeline (bias-aware ML)\n• SHAP outputs feed an automated recommendation engine that turns model output into HR-retention actions\n• Backed by NVIDIA's "Building RAG Agents with LLMs" certification for modern explainable AI systems\n\nHe can talk interpretability in interviews with real examples 💪`
    },
    {
      tag: 'deployment',
      keywords: ['deployment', 'deploy', 'production', 'mlops', 'serve', 'serving', 'distillation', 'distill', 'model compression', 'optimization', 'optimized', 'cold start', 'latency'],
      answer: `🚀 Production & deployment skills:\n\n• Vercel serverless deployment of a full Flask ML app (attrition platform)\n• Docker + Compose containerization (Spotify recommender)\n• **Model distillation**: 61MB ensemble → 2.6MB calibrated model = 23x deployability, cold-start 15 min → ~1 min\n• Understands the full loop: train → explain → serve → monitor\n\nThis is rare hands-on MLOps exposure for a student 💪`
    },
    {
      tag: 'ml-metrics',
      keywords: ['accuracy', 'metric', 'metrics', 'roc', 'auc', 'roc-auc', 'benchmark', 'f1', 'precision', 'recall', 'smote', 'cross validation', 'cross-validation', 'xgboost', 'lightgbm', 'extratrees', 'ensemble', 'algorithm', 'model performance', 'how accurate'],
      answer: `📈 Model benchmarking (attrition platform):\n\n• 8+ algorithms compared: XGBoost, LightGBM, ExtraTrees, voting/stacking ensembles\n• SMOTE for class imbalance + 5-fold cross-validation\n• Final: **85.0% accuracy, 77.3% ROC-AUC**\n• Tracked Accuracy, Precision, Recall, F1 against baselines — same discipline from his Prodigy internship`
    },
    {
      tag: 'education',
      keywords: ['education', 'college', 'university', 'degree', 'btech', 'b tech', 'study', 'studies', 'cgpa', 'gpa', 'haridwar university', 'academic', 'qualification', 'coursework', 'syllabus', 'background'],
      answer: `🎓 Education:\n\n• **B.Tech, Computer Science & Engineering — Haridwar University (2023–2027 expected)**\n  CGPA: 7.00/10.00\n  Relevant coursework: Data Structures & Algorithms, OOP, Machine Learning, Deep Learning, Computer Vision\n• Senior Secondary (CBSE), St. John Public School — 83.0% (2021–2023)\n• Secondary (CBSE), St. John Public School — 91.0% (2019–2021)`
    },
    {
      tag: 'certifications',
      keywords: ['certification', 'certifications', 'certificate', 'certified', 'credentials', 'courses', 'certifications list', 'qualified'],
      answer: `🏅 6 certifications:\n\n1. ☁️ Oracle Cloud Infrastructure 2025 Certified Foundations Associate — Oracle\n2. 🤖 Building RAG Agents with LLMs — NVIDIA\n3. 🛡️ CyberOps Associate — Cisco Networking Academy\n4. 🧠 Machine Learning with Python + ML Internship Certificate — Prodigy InfoTech\n5. 🌐 HTML, CSS & JavaScript for Web Developers — Coursera\n6. 🎓 NPTEL Elite certification (70% score) — with ₹1,100 merit scholarship, awarded twice\n\nAsk about any one for details!`
    },
    {
      tag: 'cert-oracle',
      keywords: ['oracle certification', 'oci certified', 'oracle cloud certified', 'oracle foundations'],
      answer: `☁️ **Oracle Cloud Infrastructure 2025 Certified Foundations Associate** — official Oracle certification covering cloud fundamentals: core OCI services, networking, compute, storage, security & pricing. Demonstrates genuine cloud-platform literacy beyond coursework.`
    },
    {
      tag: 'cert-nvidia',
      keywords: ['nvidia', 'rag', 'rag agents', 'llm certification', 'llms', 'generative ai', 'genai'],
      answer: `🤖 **Building RAG Agents with LLMs — NVIDIA**\n\nCovers Retrieval-Augmented Generation: combining LLMs with external knowledge retrieval. This is directly relevant to the AI assistant you're talking to right now 😉 — and positions Rohit for the LLM-application wave, not just classical ML.`
    },
    {
      tag: 'cert-cisco',
      keywords: ['cisco', 'cyberops', 'cyber security', 'cybersecurity', 'network security', 'security certification'],
      answer: `🛡️ **CyberOps Associate — Cisco Networking Academy**\n\nCybersecurity operations: threat monitoring, incident response, network defense fundamentals. A security mindset that matters when shipping ML systems that handle HR data.`
    },
    {
      tag: 'cert-coursera',
      keywords: ['coursera', 'web developers certification', 'html certification', 'javascript certification'],
      answer: `🌐 **HTML, CSS & JavaScript for Web Developers — Coursera**\n\nTaught by Johns Hopkins University: the web fundamentals behind his Flask-integrated dashboards and this portfolio site itself.`
    },
    {
      tag: 'cert-nptel',
      keywords: ['nptel', 'elite', 'scholarship', 'merit scholarship', 'nptel certification'],
      answer: `🎓 **NPTEL Elite Certification (70% score)** — and the institution awarded him an academic merit **scholarship of ₹1,100, twice** 💰. Elite is NPTEL's top performance band (IIT/IISc-backed course platform).`
    },
    {
      tag: 'achievements',
      keywords: ['achievement', 'achievements', 'award', 'awards', 'hackathon', 'sih', 'smart india hackathon', 'competition', 'won', 'prize', 'rank', 'position', 'extracurricular', 'winner', 'medal'],
      answer: `🏆 Achievements:\n\n• 🥇 **3rd Position — Internal Smart India Hackathon (SIH) 2024** at Haridwar University, conducted with Ministry of HRD / Institution's Innovation Council (Sep 14, 2024) — Certificate of Recognition for an innovative solution among competing university teams\n• 🗑️ **3rd Position — TechSangram** (university-level): IoT Smart Waste Management Bin with automated sensor-based sorting & monitoring\n• 💻 **100+ DSA problems solved on LeetCode**\n• 🎓 NPTEL Elite + merit scholarship ₹1,100 × 2`
    },
    {
      tag: 'sih',
      keywords: ['smart india hackathon detail', 'sih 2024', 'internal hackathon', 'innovation council', 'iic'],
      answer: `🥇 **Smart India Hackathon (SIH) 2024 — 3rd Position (Internal Round)**\n\n• Conducted by Haridwar University with the Ministry of HRD / Institution's Innovation Council (IIC)\n• Date: September 14, 2024\n• Competed against multiple university teams; awarded a Certificate of Recognition for developing an innovative technological solution\n• SIH is India's biggest national hackathon pipeline — placing in the internal round shows team execution under time pressure`
    },
    {
      tag: 'iot',
      keywords: ['techsangram', 'iot', 'waste management', 'smart bin', 'sensor project', 'hardware project'],
      answer: `🗑️ **TechSangram — 3rd Position (University-Level)**\n\nBuilt an **IoT Smart Waste Management Bin** prototype: automated sensor-based sorting and fill-level monitoring. Hardware + software integration — proof he's not limited to pure-software problems.`
    },
    {
      tag: 'dsa',
      keywords: ['leetcode', 'dsa', 'data structures', 'algorithms', 'problem solving', 'coding practice', 'competitive', '100 problems', 'how many problems'],
      answer: `💻 **DSA & problem solving:**\n\n• 100+ problems solved on LeetCode — arrays, strings, hashing, trees, and core patterns\n• Data Structures & Algorithms is a core university course (part of his B.Tech coursework)\n• Strong analytical foundation that transfers directly to ML system design`
    },
    {
      tag: 'contact',
      keywords: ['contact', 'contact details', 'reach', 'reach out', 'get in touch', 'connect', 'hire him', 'email address', 'phone number', 'mobile number', 'how to contact', 'talk to', 'message him'],
      answer: `📬 Contact Rohit:\n\n• 📧 Email: %EMAIL%\n• 📱 Phone/WhatsApp: %PHONE_DASH%\n• 💼 LinkedIn: %LINKEDIN_SHORT%\n• 🐙 GitHub: %GITHUB_SHORT%\n\nUse the buttons below — or the WhatsApp button floating on the page!`
    },
    {
      tag: 'resume',
      keywords: ['resume', 'cv', 'download resume', 'pdf', 'resume download', 'get his resume'],
      answer: `📄 Rohit's full resume is available as a PDF:\n\n• "Resume" button in the hero section (top of the page)\n• "⬇ Download Resume" button in the Contact section\n• Or use the button below 👇`
    },
    {
      tag: 'hiring',
      keywords: ['available', 'availability', 'open to work', 'currently working', 'notice period', 'joining', 'recruit', 'recruiting', 'opportunity', 'opening', 'vacancy', 'full time', 'fulltime', 'freelance', 'collaborate'],
      answer: `✅ Yes — Rohit is actively seeking **Machine Learning Engineer or software engineering** roles, plus internships and collaborations. He can be reached immediately at %EMAIL% or %PHONE_DASH% 📬`
    },
    {
      tag: 'salary',
      keywords: ['salary', 'ctc', 'package', 'expected salary', 'pay', 'compensation', 'wage', 'stipend', 'lpa'],
      answer: `💰 Compensation isn't listed publicly on the resume — that's best discussed directly with Rohit. He's flexible and prioritizes learning + impactful ML work. Reach him at %EMAIL% or %PHONE_DASH% to talk numbers 📬`
    },
    {
      tag: 'age',
      keywords: ['age', 'how old', 'birthday', 'born', 'dob'],
      answer: `🎂 Rohit keeps personal details like age off his professional profile — but professionally: B.Tech CSE student (2023–2027 batch), two internships done, 4 major projects shipped. Anything about his work, just ask!`
    },
    {
      tag: 'hobby',
      keywords: ['hobby', 'hobbies', 'free time', 'interest', 'interests', 'fun', 'passion', 'outside work'],
      answer: `🎯 Beyond the resume, his energy clearly goes into: competitive coding (100+ LeetCode problems), hackathons (SIH, TechSangram), and building real deployed products rather than toy projects. The resume doesn't list hobbies — but the pattern is clear: he builds for fun 🛠️`
    }
  ],
};

/* Post-assignment: resolve %PLACEHOLDER% fact refs and derive follow-up walk order
   from the KB entries themselves (tag prefixes in declaration order). */
(function () {
  var C = window.CHAT_CONFIG;
  window.CHAT_KB.entries.forEach(function (e) {
    e.answer = e.answer
      .replace(/%EMAIL%/g, C.email)
      .replace(/%PHONE_DASH%/g, C.phoneHref.replace('+91', '+91-'))
      .replace(/%LINKEDIN_SHORT%/g, C.linkedin.replace('https://', ''))
      .replace(/%GITHUB_SHORT%/g, C.github.replace('https://', ''));
  });
  var byPrefix = { 'project-': [], 'intern-': [], 'cert-': [] };
  var ach = [];
  window.CHAT_KB.entries.forEach(function (e) {
    var t = e.tag;
    if (t.indexOf('project-') === 0) byPrefix['project-'].push(t);
    else if (t.indexOf('intern-') === 0) byPrefix['intern-'].push(t);
    else if (t.indexOf('cert-') === 0) byPrefix['cert-'].push(t);
    else if (t === 'sih' || t === 'iot' || t === 'dsa') ach.push(t);
  });
  if (ach.indexOf('cert-nptel') === -1) ach.push('cert-nptel'); // NPTEL doubles as the scholarship achievement
  window.CHAT_KB.walkOrder = {
    projects: byPrefix['project-'],
    experience: byPrefix['intern-'],
    certifications: byPrefix['cert-'],
    achievements: ach
  };
})();
