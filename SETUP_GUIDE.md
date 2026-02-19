# 🕉️ Sacred Trails India — Setup Guide

## 📁 Project Structure
```
varanasi-tours/
├── index.html          # Main website
├── css/
│   └── styles.css      # Stylesheet
├── js/
│   └── script.js       # JavaScript + Firebase/EmailJS
├── SETUP_GUIDE.md      # This file
└── netlify.toml        # Netlify deployment config
```

---

## 🔥 Step 1: Set Up Firebase (Free Spark Plan)

### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Name it: `sacred-trails-india`
4. Disable Google Analytics (optional, keep it if you want)
5. Click **Create Project**

### Add Web App
1. In Project Overview, click the **Web icon** `</>`
2. Register app name: `Sacred Trails Website`
3. **Copy the `firebaseConfig` object** — you'll need this!
4. Click **Continue to Console**

### Enable Firestore Database
1. In left sidebar → **Build** → **Firestore Database**
2. Click **Create Database**
3. Choose **Start in test mode** (for development)
4. Select nearest region
5. Click **Enable**

### Update Config in script.js
Open `js/script.js` and replace the config at the top:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSy...",              // Your API Key
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc..."
};
```

### Set Firestore Security Rules (for production)
In Firestore → **Rules**, update to:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contact-enquiries/{document} {
      allow create: if true;     // Anyone can submit a form
      allow read, update, delete: if false;  // Only you via console
    }
  }
}
```

---

## 📧 Step 2: Set Up EmailJS (Free — 200 emails/month)

This sends form submissions directly to your Gmail: saurabhojha0136@gmail.com

### Create Account
1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for **free account**

### Add Email Service
1. Go to **Email Services**
2. Click **Add New Service**
3. Select **Gmail**
4. Connect your Gmail: `saurabhojha0136@gmail.com`
5. Note down the **Service ID** (e.g., `service_abc123`)

### Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Set up the template:

**Subject:** `📞 New Tour Enquiry from {{from_name}}`

**Content:**
```
New Tour Enquiry Received!

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Tour: {{tour}}
Travelers: {{travelers}}
Travel Date: {{travel_date}}
Message: {{message}}
Timestamp: {{timestamp}}

---
This enquiry was submitted through your Sacred Trails India website.
```

**To Email:** `saurabhojha0136@gmail.com`

4. Click **Save**
5. Note down the **Template ID** (e.g., `template_xyz789`)

### Get API Key
1. Go to **Account** → **General** tab
2. Copy your **Public Key**

### Update Config in script.js
```javascript
const EMAILJS_PUBLIC_KEY = "your_public_key_here";
const EMAILJS_SERVICE_ID = "service_abc123";
const EMAILJS_TEMPLATE_ID = "template_xyz789";
```

---

## 🚀 Step 3: Deploy for FREE

### Option A: Netlify (Recommended ⭐)
1. Go to [Netlify](https://www.netlify.com/) and sign up free
2. Drag and drop the entire `varanasi-tours` folder
3. Your site is live! 🎉
4. Custom domain: Go to **Domain settings** to add your own domain

### Option B: GitHub Pages
1. Create a GitHub repository
2. Push code to the repo
3. Go to **Settings** → **Pages** → Select `main` branch
4. Site will be live at `https://yourusername.github.io/repo-name`

### Option C: Vercel
1. Go to [Vercel](https://vercel.com/) and sign up
2. Import your GitHub repo
3. Deploy automatically!

---

## 📱 Step 4: Update WhatsApp Number
In `index.html`, search for `wa.me/919999999999` and replace with your actual number:
```html
<a href="https://wa.me/91XXXXXXXXXX?text=..." ...>
```

Also update the display phone number in the contact section.

---

## 🎨 Customization Tips

### Change Images
Replace Unsplash URLs with your own photos for a more personal touch.

### Update Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
    --saffron: #FF6B35;     /* Primary color */
    --gold: #FFD700;         /* Accent color */
    --maroon: #8B1A2B;      /* Dark accent */
}
```

### Add More Tours
Copy the tour card HTML structure in `index.html` and modify the content.

---

## ✅ Checklist Before Going Live
- [ ] Firebase config updated in `js/script.js`
- [ ] EmailJS config updated in `js/script.js`
- [ ] WhatsApp number updated in `index.html`
- [ ] Phone numbers updated in contact section
- [ ] Social media links updated
- [ ] Firestore security rules set for production
- [ ] Test contact form submission
- [ ] Check email notification delivery
- [ ] Test on mobile devices
