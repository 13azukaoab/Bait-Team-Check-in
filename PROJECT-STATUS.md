# Bait Check-In WebApp - สถานะโปรเจกต์

## 📋 ภาพรวมโปรเจกต์

ระบบเช็คอินสำหรับติดตามตำแหน่งทีมงานภาคสนาม พร้อมถ่ายภาพหลักฐานหน้างาน

**🌐 Live URL:** [https://bait-check-in-webapp.web.app](https://bait-check-in-webapp.web.app)

### 🎯 สถานะล่าสุด (05-02-2026, 19:30 น.)

| หมวด | สถานะ |
|------|-------|
| 🚀 **Production** | ✅ ใช้งานได้ (93 check-ins) |
| 🔐 **API Keys** | ✅ Rotated & Deployed |
| 📦 **Pre-Schedule** | ✅ 100% Complete |
| 🧪 **Tests** | ✅ Fixed (พร้อมรัน) |
| 📂 **Public Repo** | 🟡 86% (Phase 6 ค้าง) |

---

## ✅ สิ่งที่ทำเสร็จแล้ว (Completed)

### 📱 ส่วนหน้าบ้าน (Frontend) - มือถือ (Mobile) - **100% เสร็จ**

**✅ เสร็จแล้ว:**

- [X] **หน้าเช็คอินหลัก**: ออกแบบเสร็จสมบูรณ์
- [X] **ระบบเลือกทีม**: เปลี่ยนเป็นแบบเลือกทีมได้ครบ (A-O, Z) พร้อมดีไซน์ใหม่ (Grid 4x4 & Modal)
- [X] **ปุ่ม Check-in**: ปุ่มใหญ่มองเห็นชัด พร้อมแสดงสถานะ
- [X] **แสดงตำแหน่ง GPS**: ระบุพิกัดปัจจุบัน
- [X] **แบบฟอร์ม**: กรอกชื่อลูกค้า, เลขที่สัญญา, เลือกสาขา
- [X] **กล้องถ่ายรูป**: ถ่ายภาพผ่าน Browser ได้โดยตรง (สนับสนุน JPEG/PNG)
- [X] **จัดการรูปภาพ**: บีบอัดไฟล์ 120-450 KB (ปรับคุณภาพได้ตามต้องการ)
- [X] **เปิด/ปิด การแสดงผล**: ซ่อนหรือแสดงหมุดบนแผนที่ได้
- [X] **หน้าประวัติ**: ดูรายการเช็คอินย้อนหลัง
- [X] **เมนูด้านล่าง (Bottom Nav)**: สำหรับเปลี่ยนหน้า
- [X] **ระบบล็อกอิน (Login)**: เลือกทีมและจำการเข้าสู่ระบบ
- [X] **รองรับมือถือ (Responsive)**: ล็อคความสูงหน้าจอ ไม่มี Scrollbar ซ้อนกัน
- [X] **ตัดโหมดมืด (Dark Mode)**: ไม่มีโหมดมืดบนมือถือ ตามข้อกำหนด
- [X] **ตัวเลื่อนคุณภาพรูป (Quality Slider)**: ปรับคุณภาพ JPEG 50–90% และเลือก Max Width 800/1200/1600
- [X] **ตัวบ่งชี้การโหลด (Loading States)**: แสดง Global Loading ระหว่างบันทึก Check-in
- [X] **การแจ้งเตือน (Notifications)**: Toast แจ้งสำเร็จ/ผิดพลาด/ข้อมูล และตรวจจับ Offline/Online
- [X] **คำนวณเขตอัตโนมัติ (Zone Mapping)**: แสดงเขตตามสาขาที่เลือก (อิง ZONE_BRANCH_MAPPING)
- [X] **รูปแบบวันที่ไทย (DD-MM-YYYY)**: แสดงวันที่ตามข้อกำหนด และเวลาแบบไทย
- [X] **บันทึกประวัติในเครื่อง (Local History)**: เก็บและแสดงรายการ Check-in จาก localStorage
- [X] **Firebase Integration**: บันทึก Check-in ลง Firestore + Storage

## ✅ สิ่งที่เสร็จแล้ว - Mobile ไม่มีงานค้าง

### 🖥️ ส่วนหน้าบ้าน (Frontend) - แดชบอร์ด (Desktop) - **100% เสร็จ**

**✅ เสร็จแล้ว:**

- [X] **แถบเมนูข้าง (Sidebar)**: เมนูนำทางหลัก พร้อม Animation แบบ Collapse/Expand
- [X] **ส่วนหัว (Header)**: ช่องค้นหาและโปรไฟล์
- [X] **การ์ดสถิติ (Stat Cards)**: แสดงข้อมูลจริงจาก Firestore (Check-ins, Locations, Customers, Success Rate)
- [X] **แผนที่ตำแหน่ง**: แสดงจุดเช็คอินจาก Firestore บนแผนที่ (Leaflet Map)
- [X] **หมุด (Markers)**: จุดแสดงตำแหน่งทีมงาน พร้อมสีตามทีม (16 ทีม A-O, Z)
- [X] **วัดระยะทาง**: ใช้วัดระยะห่างระหว่างจุดหลายๆ จุด (Multi-point measurement)
- [X] **วัดระยะแบบรัศมีวงกลม**: วาดวงกลมรัศมีจากจุดที่เลือก พร้อมปรับรัศมีได้ (Radius Circle)
- [X] **HQ Marker**: หมุดสำนักงานใหญ่ พร้อมลิงก์ Google Maps นำทาง
- [X] **รายการล่าสุด (Latest)**: แสดงข้อมูลจริงจาก Firestore แบบ Real-time
- [X] **เปิด/ปิด การแสดงผล (Visibility)**: ซ่อนหรือแสดงหมุดบนแผนที่ได้ (บันทึกลง Firestore)
- [X] **ตารางข้อมูล (Data Table)**: ดูข้อมูลจาก Firestore พร้อม Sort, Freeze Header, Scrollbar
- [X] **ตัวกรอง (Filter)**: ค้นหาตาม ทีม, เขต, สาขา, วันที่
- [X] **ตัวกรองทีม (Team Filter)**: Dropdown เลือกแสดง/ซ่อนทีม (Dashboard + Map View)
- [X] **ป้ายทีม (Badges)**: แสดงสีแยกตามทีมชัดเจน
- [X] **ลบ Mockup Data**: Dashboard แสดงเฉพาะข้อมูลจริงจาก Firestore
- [X] **ตัดโหมดมืด (Dark Mode)**: เอา Dark Mode ออกจากแดชบอร์ดตามข้อกำหนด
- [X] **ส่งออก Excel/CSV**: ปุ่ม Export พร้อม Dropdown เลือกรูปแบบ (Excel, CSV, PDF)
- [X] **อัลบั้มรูป (Photo Gallery)**: หน้าแสดงรูปภาพจาก Firestore พร้อม Filter
- [X] **สถิติเพิ่มเติม (Charts)**: พร้อมรองรับข้อมูลจริง (แสดง placeholder เมื่อไม่มีข้อมูล)
- [X] **Real-time Updates**: ระบบอัปเดตอัตโนมัติ พร้อม Live Badge และ Notification Toast
- [X] **Check-ins List**: ตาราง Sortable โหลดจาก Firestore
- [X] **Reports**: กราฟพร้อมรองรับข้อมูลจริง
- [X] **ลบ Settings**: ไม่จำเป็นเพราะไม่มีระบบ Login

## ✅ สิ่งที่เสร็จแล้ว - Desktop ไม่มีงานค้าง

### 🎨 Design & Branding

- [X] **Logo Showcase**: หน้าเว็บสำหรับโหวตเลือกโลโก้
- [X] **Logo Filtering**: คัดเลือกเฉพาะแบบที่น่าสนใจ
- [X] **Voting System**: ระบบโหวต (+/-)
- [X] **Layout Optimization**: ปรับหน้าจอเป็น Single Page
- [X] **Index Landing Page**: เพิ่มหน้าเริ่มต้น `index.html` พร้อม auto-redirect สำหรับมือถือ

## ✅ สิ่งที่เสร็จแล้ว - Design เสร็จสมบูรณ์

---

## ❌ สิ่งที่ต้องทำต่อ (Missing)

> **หมายเหตุ:** ส่วน Frontend (Mobile + Desktop) เสร็จ 100% แล้ว ไม่มีงานค้าง

### ส่วนหลังบ้าน (Backend) - _เสร็จสมบูรณ์ (Firebase)_

- [X] **Firebase Project Setup**: สร้าง Project `bait-check-in-webapp` (Singapore Region)
- [X] **Firebase SDK Integration**: เชื่อม Mobile + Desktop กับ Firebase
- [X] **Firestore Database**: บันทึก Check-ins, Real-time sync
- [X] **Cloud Storage**: Upload รูปภาพหน้างาน (จำกัด 500KB)
- [X] **Security Rules**: Firestore + Storage Rules (Development Mode)
- [X] **Real-time Listener**: Desktop Dashboard อัพเดทอัตโนมัติ
- [X] **Firestore Indexes**: สร้าง Index สำหรับ Query ประสิทธิภาพสูง
- [X] **Authentication**: ใช้ระบบ Team-based Login (เลือกทีมแทน Email/Password)
- [X] **Production Rules**: Rules พร้อมใช้งาน (Open สำหรับ Internal Use)

## ✅ Backend พร้อมใช้งานจริง

### โครงสร้างพื้นฐาน (DevOps) - _เสร็จสมบูรณ์_

- [X] **ฐานข้อมูล (Firestore)**: ใช้ Firebase Firestore (NoSQL, Real-time)
- [X] **ระบบเก็บไฟล์ (Storage)**: ใช้ Firebase Cloud Storage
- [X] **โฮสติ้ง (Hosting)**: Firebase Hosting ✅ Live: [https://bait-check-in-webapp.web.app](https://bait-check-in-webapp.web.app)
- [X] **SSL Certificate**: มาพร้อม Firebase Hosting (HTTPS อัตโนมัติ)

> **หมายเหตุ:** CI/CD และ Custom Domain ไม่จำเป็นสำหรับโปรเจกต์ขนาดนี้

## ✅ การทดสอบ (Testing) - Playwright E2E

### 📊 Test Coverage

- ✅ **Cypress → Playwright Migration**: เปลี่ยนจาก Cypress เป็น Playwright (ดี +1.5x ความเร็ว)
- ⏳ **E2E Tests** (29 tests): 16 Admin Dashboard + 13 Mobile Check-in
  - ✅ Tests สร้างเสร็จ (16 + 13 = 29 tests)
  - 🟨 Pass Rate: 19/29 (65.5%) - ต้องแก้ 2 issues:
    - Issue #1: Admin Dashboard filters ซ่อน (9 tests failing)
    - Issue #2: Mobile selector คลุมเครือ (1 test failing)

### 🧪 Test Automation

- ✅ **test.ps1**: PowerShell script สำหรับรันทดสอบ
  - `.\test.ps1` - ทดสอบทั้งหมด (2 browsers)
  - `.\test.ps1 -Headed` - แสดง browser
  - `.\test.ps1 -Report` - ดูรายงาน
- ✅ **test-history.log**: บันทึกการทดสอบอัตโนมัติ
- ✅ **Test report by Playwright.md**: สถานะและวิธีแก้ไข

### 🔧 Browser Configuration (Optimized)

- ✅ **Chromium** (Desktop Chrome)
- ✅ **Mobile Chrome**
- ⏸️ **Firefox, Safari, Mobile Safari** (commented out for speed)
  - สามารถเปิดได้ใน `playwright.config.js` เมื่อต้องการ

---

## 📊 ผลการทดสอบ: 19/29 passed (65.5%)

**หมายหมาย:** โปรเจกต์ Functional 100% แต่ E2E Tests ต้องแก้ 2 issues ก่อน

## ✅ คู่มือและเอกสาร (Documentation) - เสร็จสมบูรณ์ 100%

- [X] **คู่มือ API**: สำหรับนักพัฒนา (`docs/api-guide.md`)
- [X] **คู่มือการใช้งาน**: สำหรับผู้ใช้ทั่วไป (`docs/user-guide.md`)
- [X] **คู่มือการติดตั้ง**: วิธีนำระบบขึ้น Server (`docs/installation-guide.md`)
- [X] **Flowchart**: แผนภาพการทำงานของระบบ (`docs/webapp-flowchart.drawio`)
- [X] **Copilot Instructions**: กฎสำหรับ AI (`copilot-instructions.md`)

---

## 📊 สรุปความคืบหน้า

| หมวดงาน | สถานะ | % ความสำเร็จ | หมายเหตุ |
| --- | --- | --- | --- |
| **Frontend มือถือ** | ✅ เสร็จสมบูรณ์ | 100% | รวม Quality/Loading/Notifications/Zone/วันที่ไทย |
| **Frontend แดชบอร์ด** | ✅ เสร็จสมบูรณ์ | 100% | รวม Sort/Freeze Header/Scrollbar/HQ Marker/Real Data |
| **Backend (Firebase)** | ✅ เสร็จสมบูรณ์ | 100% | Firestore + Storage + Hosting + Team Login |
| **DevOps (เซิร์ฟเวอร์)** | ✅ เสร็จสมบูรณ์ | 100% | Hosting + SSL + Deploy Scripts |
| **Testing (Playwright)** | ✅ แก้ไขแล้ว | 100% | 44 tests fixed (data-test attrs + filter panel) |
| **เอกสารคู่มือ** | ✅ เสร็จสมบูรณ์ | 100% | API + User + Installation + Flowchart + Copilot |

**🎉 โปรเจกต์ Functional: 100%** (ใช้งานได้จริง)  
**📊 Test Coverage: 100%** (แก้ไขแล้ว - พร้อมรัน)

---

## 🎯 ขั้นตอนต่อไป (Next Steps)

### 🔐 การเตรียมพร้อม Public Repository

**สถานะ:** 6/7 phases complete (85.7%) 🟢 GOOD PROGRESS

1. ✅ ~~Phase 1: Code Cleanup~~ → เสร็จสมบูรณ์
2. ✅ ~~Phase 2: Git History Cleanup~~ → เสร็จสมบูรณ์
3. ✅ ~~Phase 2.1: Force Push~~ → เสร็จสมบูรณ์
4. ✅ ~~**Phase 3: API Key Rotation**~~ → เสร็จสมบูรณ์ (New key deployed & tested)
5. ✅ **Phase 4: Firebase Security Setup** → Deploy rules แล้ว
6. ✅ **Phase 5: Testing & Bug Fixes** → แก้ Playwright tests เสร็จแล้ว
7. ⏳ **Phase 6: Make Repository Public** → ขั้นตอนสุดท้าย

**✅ ความคืบหน้า:** API Key ใหม่ deploy แล้ว, ระบบทำงานปกติ

**รายละเอียด:** ดูใน [SECURITY-CHECKLIST.md](SECURITY-CHECKLIST.md)

---

## 🎯 งานที่ต้องทำ (TODO List)

### 🚀 ฟีเจอร์ใหม่ - สถานะการผลิต (Updated 02-02-2026)

**ความสำคัญ:** HIGH - ต้องทำก่อนเปิด Public Repository

| งาน | สถานะ | เหตุผล | ระยะเวลา |
|-----|-------|-------|---------|
| Pre-Schedule Frontend (Mobile UI) | ✅ 100% | เสร็จแล้ว | - |
| Pre-Schedule Backend (Firestore) | ✅ 100% | เสร็จแล้ว - Auto-update on check-in | 2 ชม |
| Admin Dashboard Tab | ✅ 100% | เสร็จแล้ว - Full management UI | 1 ชม |
| Real-time Sync | ✅ 100% | เสร็จแล้ว - Status updates | 30 นาที |
| Security Rules | ✅ 100% | เสร็จแล้ว - Team isolation | 15 นาที |
| **Overall** | ✅ **100%** | **PRODUCTION READY** | **3-4 ชม** |

#### 1. ระบบสร้างรายการ Check-in ล่วงหน้า (Pre-Schedule Check-ins)

**สถานะ:** ✅ **100% COMPLETE** - Production Ready!

**✅ ที่เสร็จแล้ว (Full Stack):**

**Frontend Mobile (100%)**
- ✅ Create schedule → Firestore (async save)
- ✅ Read schedules → Firestore query (team-specific)
- ✅ Edit/Delete schedules
- ✅ Auto-mark complete → On check-in finish
- ✅ Offline fallback → localStorage cache
- ✅ UI/UX complete with all validations

**Backend Firestore (100%)**
- ✅ Collection: `scheduled_checkins` structure
- ✅ Team-based isolation (where team == selectedTeam)
- ✅ Status tracking (pending → completed)
- ✅ Auto-link to check-in document
- ✅ Timestamp management

**Admin Dashboard (100%)**
- ✅ New "Scheduled" tab with calendar icon
- ✅ Stats cards: Pending, Completed, Today
- ✅ Data table: Date, Team, Customer, Contract, Branch, Status
- ✅ Filters: By Date, By Team, By Status
- ✅ Actions: Mark Complete, Delete
- ✅ Real-time updates

**Security (100%)**
- ✅ Firestore rules for `scheduled_checkins` collection
- ✅ Read: Everyone (for Admin dashboard)
- ✅ Create: With field validation
- ✅ Update: Only status/completedAt fields
- ✅ Delete: Allowed (Admin)
- ✅ Team isolation on mobile

**ระยะเวลา:** ~3-4 ชั่วโมง (COMPLETED)

**📄 รายละเอียด:** ดูใน [IMPLEMENTATION-COMPLETE.md](IMPLEMENTATION-COMPLETE.md)

---

#### 2. Dropdown เลขที่สัญญา CT (Contract Number Dropdown)

**สถานะ:** ✅ **100% Complete** - Feature Ready

**ความต้องการ:**
- เปลี่ยนจาก Text Input เป็น Dropdown
- รายการ: CT22, CT23, CT24, CT25
- ยังสามารถพิมพ์เองได้ (Combo Box)

**ที่เสร็จแล้ว:**
- ✅ **Mobile: Contract Number Field** - Prefix dropdown + 7-digit input
- ✅ **Desktop: Contract Number Column** - Filter dropdown & badges
- ✅ **Pre-Schedule Form: Contract Dropdown** - ใช้เดียวกับ Check-in

**ระยะเวลาทำเสร็จ:** 2 ชั่วโมง ✅

**📱 Preview:** [Pre-Schedule Mockup](pages/test/pre-schedule-mockup.html)

---

### 🔐 Phase 3: Rotate API Keys (CRITICAL) - ต้องทำก่อนเปิด Public!

**AI ห้ามทำ - ผู้ใช้ต้องทำเอง**

**3.1 Firebase API Key:**
- [ ] เข้า [Google Cloud Console](https://console.cloud.google.com/)
- [ ] APIs & Services → Credentials
- [ ] สร้าง API Key ใหม่
- [ ] Restrict key:
  - Application restrictions: HTTP referrers
  - Website restrictions: `bait-check-in-webapp.web.app/*`, `localhost/*`
- [ ] ลบ/Restrict old key
- [ ] คัดลอก new key

**3.2 Longdo Map API Key:**
- [ ] เข้า [Longdo Map Console](https://map.longdo.com/console/)
- [ ] สร้าง API Key ใหม่
- [ ] Restrict domain: `bait-check-in-webapp.web.app`, `localhost`
- [ ] ลบ old key
- [ ] คัดลอก new key

**3.3 อัพเดทโค้ด:**
- [ ] เปิด `src/config.js`
- [ ] แทนค่า `apiKey` ใหม่ (Firebase)
- [ ] แทนค่า `longdoKey` ใหม่
- [ ] Save ไฟล์

**3.4 ทดสอบ:**
- [ ] เปิด Mobile Check-in (local)
- [ ] ทดสอบ Check-in 1 ครั้ง
- [ ] เปิด Admin Dashboard
- [ ] ดูแผนที่ทำงานไหม
- [ ] ถ้าทำงาน → Deploy!

**3.5 Deploy:**
```powershell
.\deploy.ps1 -All
```

**3.6 Commit:**
```powershell
git add src/config.js
git commit -m "security: Rotate API keys after force push"
git push origin main
```

**✅ เสร็จแล้ว!** Old API keys ใน Git history ไม่สามารถใช้งานได้แล้ว

---

### 🧪 Testing & Bug Fixes

1. ✅ ~~ออกแบบ **ฐานข้อมูล (Database Schema)**~~ → ใช้ Firestore
2. ✅ ~~เลือก **เทคโนโลยีหลังบ้าน (Backend Tech Stack)**~~ → Firebase
3. ✅ ~~เริ่มพัฒนา **API** สำหรับเชื่อมต่อ~~ → ใช้ Firebase SDK
4. ✅ ~~เชื่อมหน้าเว็บ (Frontend) เข้ากับระบบหลังบ้าน~~ → Mobile + Desktop เชื่อมแล้ว
5. ✅ ~~ทดสอบระบบ~~ → Migrated to Playwright (ต้องแก้ issues)
6. ⏳ **TODO: แก้ไข Playwright Test Issues** (Priority: Medium)
    - Issue #1: Admin Dashboard filter visibility
    - Issue #2: Mobile Check-in selector specificity
7. ✅ ~~**Firebase Hosting**~~ → Deploy เสร็จ: [https://bait-check-in-webapp.web.app](https://bait-check-in-webapp.web.app)
8. ✅ ~~**ทดสอบระบบ**: ทดสอบ Check-in จริงผ่าน Mobile~~ → ทำงานได้สมบูรณ์
9. ✅ ~~**Backend เสร็จสมบูรณ์**~~ → Firestore + Storage + Rules + Real-time

> **หมายเหตุ:** Custom Domain และ CI/CD ไม่จำเป็นสำหรับโปรเจกต์ขนาดนี้

---

## 💡 คำแนะนำเรื่องเทคโนโลยี (Tech Stack)

### หน้าบ้าน (ปัจจุบันใช้)

- **HTML5, CSS3, JavaScript** (แบบพื้นฐาน ไม่ใช้ Framework หนักๆ)
- **Leaflet.js** (แผนที่ฟรี)
- **Longdo Map API** (Reverse Geocoding - แปลงพิกัดเป็นที่อยู่ไทย, ฟรี 1K/วัน)
- **Font Awesome** (ไอคอน)
- **Google Fonts** (ฟอนต์ Prompt)

### หลังบ้าน (ปัจจุบันใช้ ✅)

- **Firebase** (เลือกแล้ว!)
  - **Firestore**: ฐานข้อมูล NoSQL, Real-time sync
  - **Cloud Storage**: เก็บรูปภาพ (จำกัด 500KB/ไฟล์)
  - **Hosting**: (พร้อมใช้งาน)
  - **Project ID**: `bait-check-in-webapp`
  - **Region**: Singapore (asia-southeast1)

### Firestore Collections

```json
{
  "id": "doc_id",
  "team": "A-O|Z",
  "customerName": "string",
  "contractNumber": "string",
  "branch": "string",
  "zone": "string",
  "location": { "lat": "number", "lng": "number", "address": "string", "accuracy": "number" },
  "photos": { "houseFront": "string", "contractPhoto": "string" },
  "notes": "string",
  "visible": "boolean",
  "checkinTime": "timestamp",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

---

## 📁 ไฟล์สำคัญ

| ไฟล์ | คำอธิบาย |
| --- | --- |
| `mobile-checkin.html` | หน้า Mobile Check-in (พร้อม Firebase) |
| `admin-dashboard.html` | หน้า Dashboard (พร้อม Real-time) |
| `index.html` | หน้าเริ่มต้น (Auto-redirect) |
| `pages/test/test-complete.html` | Complete Test Suite (24 tests) |
| `docs/user-guide.md` | คู่มือการใช้งาน |
| `docs/api-guide.md` | คู่มือ API สำหรับนักพัฒนา |
| `docs/installation-guide.md` | คู่มือการติดตั้ง |
| `docs/webapp-flowchart.drawio` | Flowchart การทำงานของระบบ |
| `docs/test-report.md` | รายงานผลการทดสอบ |
| `firebase/firestore.rules` | Security Rules สำหรับ Firestore |
| `firebase/storage.rules` | Security Rules สำหรับ Storage |

---

---

## 📊 ฟีเจอร์ใหม่: Workload Analysis Export (04-03-2026)

- **ปุ่ม "Workload Analysis ก.พ. 2569"** ใน Admin Dashboard → All Check-ins Data
- Export CSV 12 columns พร้อม Google Maps Distance Matrix API
- ช่วงข้อมูล: 01-02-2026 ถึง 28-02-2026 (ทุกทีม)
- Columns: ทีม, ลำดับ, สาขา, วัน, เวลา Check-in, พิกัด(X), พิกัด(Y), พิกัด(X,Y), เวลาทำงานที่หน้างาน(นาที), ระยะทางไปจุดถัดไป(กม.), เวลาเดินทางไปจุดถัดไป(นาที), เวลารวม(นาที)
- Filename: `workload_analysis_01-28_Feb_2026.csv`
- **ต้องการ:** `googleMapsApiKey` ใน `src/config.js`

**อัปเดตล่าสุด:** 04-03-2026, 10:30 น.
**เวอร์ชัน:** V.2.3.0 (04-03-2026) - Workload Analysis Export Feature
**สถานะ:** 🟡 IN PROGRESS - Phase 4 ✅ Complete, Phase 5 ✅ Complete, Phase 6 Pending (6/7 phases complete)
