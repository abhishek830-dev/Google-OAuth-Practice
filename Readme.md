# Google OAuth 2.0 Implementation (Node.js)

A minimal and easy-to-understand project demonstrating how to implement **"Login with Google"** functionality in a Node.js web application using the `passport-google-oauth20` strategy.

## 🚀 Features

- **Google Authentication:** Secure login using Google accounts.
- **Session Management:** Maintains user sessions using `express-session`.
- **Profile Data Retrieval:** Fetches and displays user profile information (Name, Email, Profile Picture) from Google.
- **Secure Configuration:** Uses `.env` to protect sensitive credentials (Client ID & Secret).

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Authentication:** Passport.js (`passport-google-oauth20`)
- **Session:** `express-session`
- **Environment Variables:** `dotenv`

## ⚙️ How to Run Locally

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/abhishek830-dev/Google-OAuth-Practice.git
   cd Google-OAuth-Practice
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your Google Cloud credentials:
   \`\`\`env
   GOOGLE_CLIENT_ID=your_client_id_here
   GOOGLE_CLIENT_SECRET=your_client_secret_here
   SESSION_SECRET=your_random_secret_string
   \`\`\`

4. **Start the server**
   \`\`\`bash
   node server.js
   \`\`\`

5. **Test the Application**
   Open your browser and navigate to `http://localhost:5000` to test the login flow.

## 📝 Learning Outcomes

This project was built to practice and understand the core flow of OAuth 2.0, including creating credentials on Google Cloud Console, handling callback URIs, and serializing/deserializing users in sessions.
