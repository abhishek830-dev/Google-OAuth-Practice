require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// Session setup (Passport ko session chahiye hota hai user ka status yaad rakhne ke liye)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Passport initialize karna
app.use(passport.initialize());
app.use(passport.session());

// Passport ko Google OAuth2 Strategy sikhana
passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback" // Wahi URL jo Google Console mein diya tha
    },
    function (accessToken, refreshToken, profile, done) {
        // Yahan par Google se user ka data milta hai (profile object mein)
        // Real app mein yahan Database mein user save ya find karte hain
        console.log("Google se mila profile data:", profile);
        
        // Done callback se passport ko user pass kar dete hain
        return done(null, profile);
    }
));

// Session ke liye User serialize/deserialize karna
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Ek simple home route jahan login button dikhayenge
app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Login with Google</a>');
});

// ================= ROUTES ================= //

// 1. Jab user "Login with Google" par click karega, ye route Google ko call karega
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'] // Humein Google se user ka profile aur email chahiye
}));

// 2. Google par login hone ke baad, Google user ko wapas is URL par bhejega
app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/' // Agar login fail hua toh home page par wapas bhej do
}), (req, res) => {
    // Agar login success ho gaya toh profile page par bhej do
    res.redirect('/profile'); 
});

// 3. Profile Page - Yahan hum check karenge ki user login hai ya nahi
app.get('/profile', (req, res) => {
    // req.isAuthenticated() check karta hai ki user logged in hai ya nahi
    if (req.isAuthenticated()) {
        // req.user mein wo saara data hai jo Google se mila tha (jo humne console.log karwaya tha)
        res.send(`
            <h1>Welcome, ${req.user.displayName}!</h1>
            <p>Email: ${req.user.emails[0].value}</p>
            <img src="${req.user.photos[0].value}" alt="Profile Picture"/>
            <br><br>
            <a href="/logout">Logout</a>
        `);
    } else {
        res.redirect('/');
    }
});

// 4. Logout Route
app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});


// START SERVER
app.listen(5000, () => {
    console.log("Server is running at http://localhost:5000");
});
