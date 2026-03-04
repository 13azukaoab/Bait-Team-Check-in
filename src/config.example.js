/**
 * ====================================
 * Bait Check-In App - Configuration Template
 * ====================================
 * 
 * 📋 INSTRUCTIONS:
 * 1. Copy this file to: src/config.js
 * 2. Replace placeholder values with your actual API keys
 * 3. Never commit config.js to Git!
 * 
 * 🔑 Where to get API keys:
 * - Firebase: https://console.firebase.google.com/
 * - Longdo Map: https://map.longdo.com/docs/
 */

const APP_CONFIG = {
    // Firebase Configuration
    // Get from: Firebase Console → Project Settings → Your apps → Web app
    firebase: {
        apiKey: "YOUR_FIREBASE_API_KEY",
        authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID",
        measurementId: "YOUR_MEASUREMENT_ID"
    },

    // Longdo Map API (สำหรับ Reverse Geocoding)
    // Get from: https://map.longdo.com/console/
    longdo: {
        apiKey: "YOUR_LONGDO_API_KEY"
    },

    // Google Maps API (สำหรับ Distance Matrix - คำนวณระยะทางและเวลาเดินทาง)
    // Get from: https://console.cloud.google.com/ → APIs & Services → Credentials
    // Enable: Distance Matrix API
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",

    // App Settings
    app: {
        name: "Bait Check-In",
        version: "2.1.0",
        environment: "development" // development | staging | production
    }
};

// Make config globally available
if (typeof window !== 'undefined') {
    window.APP_CONFIG = APP_CONFIG;
}
