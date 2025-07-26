# 📢 Campus Portal – Tech Updates & Utilities

A dynamic campus utility platform designed using **React**, **Tailwind CSS**, and **MongoDB**, offering students real-time updates, announcements, tech news, and useful tools like polls, feedback, and lost & found.

---

## 🚀 Features

- 📚 **Announcements** – Stay updated with official campus updates  
- 🧠 **Tech Feed** – Hackathons, internships, tech news  
- 📊 **Polls & Feedback** – Interactive polling system  
- 🕒 **Timetable Viewer** – Daily class schedule access  
- 🎒 **Lost & Found** – Manage or report lost items  
- 🧾 **Complaints Portal** – Submit issues directly  
- 🎥 **Video Assets** – Background videos/images support  
- 🔐 **Auth Context** – Login & access management  

---

## 🛠️ Tech Stack

| Technology       | Usage                               |
|------------------|--------------------------------------|
| **React.js**     | Frontend SPA framework               |
| **Tailwind CSS** | Modern utility-first styling         |
| **MongoDB**      | NoSQL database (backend integration) |
| **Vercel**       | Deployment platform (frontend)       |
| **GitHub**       | Version control & collaboration      |

---

## 📁 Project Structure

├── public/
├── src/
│ ├── assets/ # Images & videos
│ ├── components/ # UI components (Auth, Layout, etc.)
│ ├── context/ # Auth context provider
│ ├── pages/ # Main pages (Dashboard, Tech, Polls, etc.)
│ ├── services/ # API & utility services
│ ├── App.jsx # Main app component
│ ├── index.js # App entry point
│ └── index.css # Global styles
├── .env # Environment variables
├── tailwind.config.js # Tailwind configuration
├── vercel.json # Vercel deployment config
└── README.md # Project documentation

yaml
Copy
Edit

---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
2. Install dependencies
bash
Copy
Edit
npm install
3. Configure environment
Create a .env file based on .env.example and add your variables (like MongoDB URI, etc).

4. Start the development server
bash
Copy
Edit
npm start
The app will be available at http://localhost:3000/

🚀 Deployment
This project is deployed via Vercel.

To deploy:

bash
Copy
Edit
vercel --prod
Or connect your GitHub repo to Vercel for CI/CD deployment.

🤝 Contributing
Fork the repository

Create your feature branch: git checkout -b feat/YourFeature

Commit your changes: git commit -m 'Add new feature'

Push to the branch: git push origin feat/YourFeature

Open a Pull Request

📄 License
This project is licensed under the MIT License.

✨ Acknowledgements
React Docs – https://react.dev

Tailwind CSS – https://tailwindcss.com

MongoDB Atlas – https://www.mongodb.com/cloud/atlas

Vercel Docs – https://vercel.com/docs

