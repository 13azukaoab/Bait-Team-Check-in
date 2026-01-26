# Bait Team Check-in ✈️

เว็บแอปพลิเคชันสำหรับเช็คอิน ติดตามตำแหน่ง และบริหารจัดการทีมงานภาคสนาม

**🌐 Live URL:** https://bait-check-in-webapp.web.app

---

## 🚀 คุณสมบัติหลัก (Key Features)

### 📱 สำหรับทีมภาคสนาม (Mobile)

- **เช็คอินง่าย**: ระบุพิกัด GPS แม่นยำ พร้อมแปลงเป็นที่อยู่อัตโนมัติ
- **ถ่ายรูปหน้างาน**: กล้องถ่ายรูปพร้อมบีบอัดไฟล์ 120-450 KB
- **เลือกทีม**: รองรับ 16 ทีม (A-O, Z)
- **ดูประวัติ**: ดูรายการเช็คอินย้อนหลัง
- **ซ่อน/แสดง**: ควบคุมการแสดงหมุดบนแผนที่

### 🖥️ สำหรับ Admin (Dashboard)

- **Dashboard**: ดูสถิติและภาพรวมแบบ Real-time
- **แผนที่**: แสดงตำแหน่งทีมงานทั้งหมด พร้อมหมุดสีตามทีม
- **วัดระยะทาง**: วัดระยะหลายจุด + วงกลมรัศมี
- **ตารางข้อมูล**: Sort, Filter, ซ่อน/แสดงหมุด
- **Export**: ส่งออกเป็น Excel/CSV
- **Photo Gallery**: ดูรูปภาพทั้งหมด
- **Reports**: กราฟสถิติและ Performance

---

## 🛠 เทคโนโลยีที่ใช้ (Tech Stack)

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Leaflet.js + OpenStreetMap (แผนที่)
- Longdo Map API (Reverse Geocoding)
- Font Awesome 6 (ไอคอน)
- Google Fonts - Prompt (ฟอนต์)

### Backend (Firebase)
- **Firestore**: ฐานข้อมูล NoSQL, Real-time sync
- **Cloud Storage**: เก็บรูปภาพ
- **Hosting**: โฮสต์เว็บไซต์ (SSL อัตโนมัติ)

---

## 📁 โครงสร้างโปรเจกต์

```
Bait-Team-Check-in/
├── index.html              # หน้าเริ่มต้น (Auto-redirect)
├── mobile-checkin.html     # หน้า Mobile Check-in
├── admin-dashboard.html    # หน้า Admin Dashboard
├── firebase.json           # ตั้งค่า Firebase Hosting
├── deploy.ps1              # สคริปต์ Deploy
│
├── pages/
│   ├── logo-showcase.html  # หน้าเลือกโลโก้
│   └── test/
│       └── test-complete.html  # Test Suite (24 tests)
│
├── docs/
│   ├── user-guide.md       # คู่มือการใช้งาน
│   ├── api-guide.md        # คู่มือ API
│   ├── installation-guide.md   # คู่มือการติดตั้ง
│   ├── webapp-flowchart.drawio # Flowchart ระบบ
│   └── test-report.md      # รายงานผลทดสอบ
│
├── firebase/
│   ├── firestore.rules     # Security Rules
│   └── storage.rules
│
├── image/
│   └── favicon.svg         # Logo/Favicon
│
└── src/
    └── firebase-config.js  # Firebase Config
```

---

## 🔗 URL ใช้งาน

| หน้า | URL |
|------|-----|
| **หน้าหลัก** | https://bait-check-in-webapp.web.app |
| **Mobile** | https://bait-check-in-webapp.web.app/mobile-checkin.html |
| **Admin** | https://bait-check-in-webapp.web.app/admin-dashboard.html |
| **Test Suite** | https://bait-check-in-webapp.web.app/pages/test/test-complete.html |

---

## 📊 สถานะโปรเจกต์

| หมวด | สถานะ |
|------|-------|
| Frontend Mobile | ✅ 100% |
| Frontend Dashboard | ✅ 100% |
| Backend (Firebase) | ✅ 100% |
| Testing (24 tests) | ✅ 100% |
| Documentation | ✅ 100% |

**🎉 โปรเจกต์เสร็จสมบูรณ์ 100%**

---

## 🚀 วิธี Deploy

```powershell
# Deploy Hosting
.\deploy.ps1

# หรือใช้ Firebase CLI
firebase deploy --only hosting
```

---

## 📖 เอกสาร

- [คู่มือการใช้งาน](docs/user-guide.md) - สำหรับผู้ใช้ทั่วไป
- [คู่มือ API](docs/api-guide.md) - สำหรับนักพัฒนา
- [คู่มือการติดตั้ง](docs/installation-guide.md) - วิธีนำระบบขึ้น Server
- [Flowchart](docs/webapp-flowchart.drawio) - แผนภาพการทำงาน

---

**เวอร์ชัน:** 2.0.0  
**อัปเดตล่าสุด:** 26-01-2026
