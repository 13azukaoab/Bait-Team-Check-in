# 🚀 Installation Guide / คู่มือการติดตั้ง

> **🇹🇭 [ภาษาไทย](#-ภาษาไทย) | 🇬🇧 [English](#-english)**

---

# 🇹🇭 ภาษาไทย

## 📋 สิ่งที่ต้องมีก่อนติดตั้ง

| รายการ | เวอร์ชันขั้นต่ำ | ดาวน์โหลด |
| --- | --- | --- |
| **Node.js** | 18.x ขึ้นไป | [nodejs.org](https://nodejs.org) |
| **npm** | 9.x ขึ้นไป | มาพร้อม Node.js |
| **Git** | 2.x ขึ้นไป | [git-scm.com](https://git-scm.com) |
| **Firebase CLI** | 13.x ขึ้นไป | `npm install -g firebase-tools` |

## 📥 ขั้นตอนที่ 1: Clone โปรเจกต์

```bash
# Clone จาก GitHub
git clone https://github.com/13azukaoab/Bait-Team-Check-in.git

# เข้าไปในโฟลเดอร์
cd Bait-Team-Check-in

# ติดตั้ง dependencies
npm install
```

## 🔑 ขั้นตอนที่ 2: ตั้งค่า API Keys

```bash
# คัดลอก template
cp src/config.example.js src/config.js

# แก้ไข config.js ใส่ API keys ของคุณ
```

**ต้องมี API Keys:**
- Firebase API Key (จาก Firebase Console)
- Longdo Map API Key (จาก map.longdo.com)

## 🔥 ขั้นตอนที่ 3: ตั้งค่า Firebase

```bash
# ล็อกอิน Firebase
firebase login

# เชื่อมต่อ Project
firebase use your-project-id
```

## 🚀 ขั้นตอนที่ 4: รัน Local Server

```bash
# วิธีที่ 1: ใช้ http-server
npx http-server -p 8080

# วิธีที่ 2: ใช้ Firebase
firebase serve
```

เปิด Browser: `http://localhost:8080`

## 📤 ขั้นตอนที่ 5: Deploy

```powershell
# ใช้ Script (แนะนำ)
.\deploy.ps1

# หรือใช้ Firebase CLI
firebase deploy --only hosting
```

## 🛠️ การแก้ปัญหา

| ปัญหา | วิธีแก้ |
| --- | --- |
| **Firebase CLI not found** | `npm install -g firebase-tools` |
| **Permission denied** | `firebase logout` แล้ว `firebase login` |
| **Project not found** | `firebase use --add` |

---

# 🇬🇧 English

## 📋 Prerequisites

| Item | Minimum Version | Download |
| --- | --- | --- |
| **Node.js** | 18.x or higher | [nodejs.org](https://nodejs.org) |
| **npm** | 9.x or higher | Included with Node.js |
| **Git** | 2.x or higher | [git-scm.com](https://git-scm.com) |
| **Firebase CLI** | 13.x or higher | `npm install -g firebase-tools` |

## 📥 Step 1: Clone Project

```bash
# Clone from GitHub
git clone https://github.com/13azukaoab/Bait-Team-Check-in.git

# Enter directory
cd Bait-Team-Check-in

# Install dependencies
npm install
```

## 🔑 Step 2: Configure API Keys

```bash
# Copy template
cp src/config.example.js src/config.js

# Edit config.js with your API keys
```

**Required API Keys:**
- Firebase API Key (from Firebase Console)
- Longdo Map API Key (from map.longdo.com)

## 🔥 Step 3: Configure Firebase

```bash
# Login to Firebase
firebase login

# Connect to Project
firebase use your-project-id
```

## 🚀 Step 4: Run Local Server

```bash
# Option 1: Use http-server
npx http-server -p 8080

# Option 2: Use Firebase
firebase serve
```

Open Browser: `http://localhost:8080`

## 📤 Step 5: Deploy

```powershell
# Using Script (recommended)
.\deploy.ps1

# Or using Firebase CLI
firebase deploy --only hosting
```

## 🛠️ Troubleshooting

| Issue | Solution |
| --- | --- |
| **Firebase CLI not found** | `npm install -g firebase-tools` |
| **Permission denied** | `firebase logout` then `firebase login` |
| **Project not found** | `firebase use --add` |

---

## 📁 Project Structure / โครงสร้างโปรเจกต์

```
Bait-Team-Check-in/
├── index.html              # Landing page
├── mobile-checkin.html     # Mobile page
├── admin-dashboard.html    # Admin page
├── firebase.json           # Firebase config
├── playwright.config.js    # Test config
│
├── src/
│   ├── config.js           # API Keys (gitignored)
│   └── config.example.js   # Template
│
├── firebase/
│   ├── firestore.rules     # Database rules
│   └── storage.rules       # Storage rules
│
├── docs/                   # Documentation
├── tests/                  # Playwright tests
└── image/                  # Assets
```

---

## 🔗 Useful Links / ลิงก์ที่เป็นประโยชน์

| Resource | URL |
| --- | --- |
| **Firebase Console** | [console.firebase.google.com](https://console.firebase.google.com) |
| **Firebase Docs** | [firebase.google.com/docs](https://firebase.google.com/docs) |
| **Longdo Map Console** | [map.longdo.com/console](https://map.longdo.com/console) |
| **Node.js** | [nodejs.org](https://nodejs.org) |

---

**Version:** 2.2.5  
**Last Updated / อัปเดตล่าสุด:** 05-02-2026
