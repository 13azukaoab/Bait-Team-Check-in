# 🚀 คู่มือการติดตั้ง - Bait Check-In WebApp

---

## 📋 สิ่งที่ต้องมีก่อนติดตั้ง

| รายการ | เวอร์ชันขั้นต่ำ | ดาวน์โหลด |
|--------|----------------|-----------|
| **Node.js** | 18.x ขึ้นไป | [https://nodejs.org](https://nodejs.org) |
| **npm** | 9.x ขึ้นไป | มาพร้อม Node.js |
| **Git** | 2.x ขึ้นไป | [https://git-scm.com](https://git-scm.com) |
| **Firebase CLI** | 13.x ขึ้นไป | `npm install -g firebase-tools` |

---

## 📥 ขั้นตอนที่ 1: Clone โปรเจกต์

```bash
# Clone จาก GitHub
git clone https://github.com/13azukaoab/Bait-Team-Check-in.git

# เข้าไปในโฟลเดอร์
cd Bait-Team-Check-in
```

---

## 🔑 ขั้นตอนที่ 2: ตั้งค่า Firebase

### 2.1 ล็อกอิน Firebase

```bash
firebase login
```
- เปิด Browser → ล็อกอินด้วย Google Account
- เลือก Account ที่มีสิทธิ์ Firebase

### 2.2 เชื่อมต่อ Project

```bash
# ดู Project ที่มี
firebase projects:list

# เลือก Project (ถ้ายังไม่เชื่อม)
firebase use bait-check-in-webapp
```

---

## 📁 ขั้นตอนที่ 3: ตรวจสอบโครงสร้างไฟล์

```text
Bait-Team-Check-in/
├── index.html              # หน้าเริ่มต้น
├── mobile-checkin.html     # หน้า Mobile
├── admin-dashboard.html    # หน้า Admin
├── firebase.json           # ตั้งค่า Hosting
├── .firebaserc             # เชื่อม Project
├── firebase/
│   ├── firestore.rules     # Rules Firestore
│   └── storage.rules       # Rules Storage
├── image/
│   └── favicon.svg         # Logo
├── pages/
│   ├── logo-showcase.html  # หน้าเลือกโลโก้
│   └── test/               # หน้าทดสอบ
├── docs/                   # เอกสาร
└── src/
    └── firebase-config.js  # Config Firebase
```

---

## 🚀 ขั้นตอนที่ 4: Deploy ขึ้น Server

### วิธีที่ 1: ใช้ Script (แนะนำ)

```powershell
# Deploy Hosting อย่างเดียว (เร็วที่สุด)
.\deploy.ps1

# Deploy Hosting
.\deploy.ps1 -HostingOnly

# Deploy Firestore Rules
.\deploy.ps1 -RulesOnly

# Deploy ทุกอย่าง
.\deploy.ps1 -All
```

### วิธีที่ 2: ใช้ Command Line

```bash
# Deploy Hosting อย่างเดียว
firebase deploy --only hosting

# Deploy Firestore Rules
firebase deploy --only firestore:rules

# Deploy Storage Rules
firebase deploy --only storage

# Deploy ทุกอย่าง
firebase deploy
```

---

## ✅ ขั้นตอนที่ 5: ตรวจสอบผลลัพธ์

หลัง Deploy สำเร็จ จะเห็น:

```
✔ Deploy complete!

Project Console: https://console.firebase.google.com/project/bait-check-in-webapp
Hosting URL: https://bait-check-in-webapp.web.app
```

### ทดสอบเว็บ

| หน้า | URL |
| --- | --- |
| **หน้าหลัก** | [https://bait-check-in-webapp.web.app](https://bait-check-in-webapp.web.app) |
| **Mobile** | [https://bait-check-in-webapp.web.app/mobile-checkin.html](https://bait-check-in-webapp.web.app/mobile-checkin.html) |
| **Admin** | [https://bait-check-in-webapp.web.app/admin-dashboard.html](https://bait-check-in-webapp.web.app/admin-dashboard.html) |

---

## 🔧 การตั้งค่าเพิ่มเติม

### เปลี่ยน Firebase Project

แก้ไขไฟล์ `.firebaserc`:

```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

### เปลี่ยน Firebase Config

แก้ไขใน `mobile-checkin.html` และ `admin-dashboard.html`:

```js
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.firebasestorage.app",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

---

## 🛠️ การแก้ปัญหา

### ปัญหา: "Firebase CLI not found"

```bash
# ติดตั้ง Firebase CLI
npm install -g firebase-tools

# ตรวจสอบ
firebase --version
```

### ปัญหา: "Permission denied"

```bash
# ล็อกอินใหม่
firebase logout
firebase login
```

### ปัญหา: "Project not found"

```bash
# ดู Project ที่มีสิทธิ์
firebase projects:list

# เลือก Project ใหม่
firebase use --add
```

### ปัญหา: Deploy ไม่ขึ้น

1. ตรวจสอบ Internet connection
2. ตรวจสอบ `firebase.json` ถูกต้อง
3. ลอง `firebase deploy --debug`

---

## 📊 การดู Logs

### Firebase Console

1. เปิด [https://console.firebase.google.com](https://console.firebase.google.com)
2. เลือก Project: `bait-check-in-webapp`
3. ไปที่ **Firestore Database** → ดูข้อมูล
4. ไปที่ **Storage** → ดูรูปภาพ
5. ไปที่ **Hosting** → ดู Deploy History

### Deploy History (Local)

```bash
# ดูประวัติ Deploy
cat deploy-history.log
```

---

## 🔄 การอัปเดตเว็บ

```bash
# 1. ดึงโค้ดล่าสุด
git pull

# 2. Deploy ใหม่
.\deploy.ps1
```

---

## 📱 ทดสอบบน Local

```bash
# รัน Local Server
firebase serve

# หรือใช้ Python
python -m http.server 8080
```

เปิด Browser: [http://localhost:8080](http://localhost:8080)

---

## 🔒 Security Checklist

ก่อน Deploy Production:

- [ ] เปลี่ยน Firestore Rules จาก `allow read, write: if true`
- [ ] เปลี่ยน Storage Rules จาก `allow read, write: if true`
- [ ] ตรวจสอบ API Keys ไม่ถูกเปิดเผย
- [ ] ทดสอบทุก Feature บน Staging ก่อน

---

## 📞 ติดต่อช่วยเหลือ

หากติดปัญหา:

- 📖 Firebase Docs: [https://firebase.google.com/docs](https://firebase.google.com/docs)
- 💬 Stack Overflow: ค้นหา "firebase hosting"
- 🐛 GitHub Issues: เปิด Issue ใน Repository

---

**อัปเดตล่าสุด:** 26-01-2026
**เวอร์ชัน:** V.1.6.0
