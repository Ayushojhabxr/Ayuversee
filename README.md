# AyuVerse Chat Room 🚀

A **real-time chat room** built using **React.js**, **Tailwind CSS**, and **Appwrite** for authentication, database, and real-time messaging.



## 🔗 Live Demo
[**Check it out here**](https://ayuverseee.vercel.app/) <!-- Replace with actual live link -->

## 📌 Features
- ✅ **Real-time Messaging** – Send & receive messages instantly using Appwrite Realtime.
- ✅ **User Authentication** – Secure login/signup using Appwrite Authentication.
- ✅ **One-on-One Chats** – Chat directly with other registered users.
- ✅ **Responsive UI** – Fully optimized for mobile and desktop.
- ✅ UI is based on Dark Theme.

## ⚙️ Tech Stack
- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Appwrite (Database, Authentication, Realtime)  
- **Hosting:** Vercel  

## 🛠️ Setup & Installation

### 1️⃣ Clone the repository
```sh
git clone https://github.com/Ayushojhabxr/AyuVersee.git
cd AyuVersee
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Configure Appwrite
- Sign up at [Appwrite](https://cloud.appwrite.io).
- Create a new project.
- Enable **Authentication** (Email/Password).
- Create a **Database** with a `messages` collection having  attributes:
  
- Enable **Realtime Messaging**.

### 4️⃣ Set up environment variables
Create a `.env` file in the root folder and add:
```env
VITE_API_ENDPOINT=https://cloud.appwrite.io/v1
VITE_PROJECT_ID=your-appwrite-project-id
VITE_DATABASE_ID=your-database-id
VITE_COLLECTION_ID=your-collection-id
```

### 5️⃣ Run the app
```sh
npm run dev
```

## 🚀 Deployment on Vercel
1. Push your project to **GitHub**.
2. Go to [Vercel](https://vercel.com/) and import your repo.
3. Set the environment variables from `.env` on Vercel.
4. Deploy & enjoy your chat room! 🎉  



## 🙌 Contribution
Contributions are welcome! Feel free to fork the repo, create an issue, or submit a PR.

👨‍💻 **Author:** [Ayush Ojha](https://github.com/Ayushojhabxr)  
💬 **Feedback?** Drop an issue or a message!
