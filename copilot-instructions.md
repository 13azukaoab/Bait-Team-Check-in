# 📍 Bait Check-In App - คำสั่งสำหรับ Copilot

---

## 🔴 กฎข้อที่ 1: การ Deploy (Deployment)

**ผู้ใช้จะ Deploy เอง - AI ห้ามทำการ Deploy**

- ❌ **ห้าม** รันคำสั่ง `firebase deploy`
- ❌ **ห้าม** รันสคริปต์ deploy ใดๆ
- ✅ **ทำได้แค่** แก้ไขโค้ดและ Commit เท่านั้น
- ✅ ผู้ใช้จะเป็นคน Deploy เองเมื่อพร้อม

### 📦 เมื่อระบบพร้อม Deploy:

**AI ต้องสร้างไฟล์ต่อไปนี้ให้อัตโนมัติ:**

1. **`deploy.ps1`** - สคริปต์ Deploy สำหรับ PowerShell
   - รองรับ flags: `-HostingOnly`, `-RulesOnly`, `-FunctionsOnly`, `-All`
   - แสดง timestamp, branch, commit ก่อน deploy
   - บันทึก log อัตโนมัติลง `deploy-history.log`

2. **`deploy-history.log`** - ประวัติการ Deploy
   - Format: `TIMESTAMP | BRANCH | COMMIT | STATUS | MESSAGE | BY | TYPE | DETAILS`
   - บันทึกทุกครั้งที่ deploy (SUCCESS/FAILED)

**ตัวอย่างการใช้งาน:**
```powershell
.\deploy.ps1                    # Hosting only (default)
.\deploy.ps1 -HostingOnly       # Hosting only
.\deploy.ps1 -RulesOnly         # Firestore rules only
.\deploy.ps1 -FunctionsOnly     # Cloud functions only
.\deploy.ps1 -All               # Everything
```

---

## 🔒 กฎข้อที่ 1.1: Git Commit & ความเป็นส่วนตัว

**Author สำหรับ Commit:**

- ✅ ใช้ชื่อ **Weerachon** เป็น author
- ❌ **ห้าม** แสดง email ในการสื่อสาร
- ❌ **ห้าม** แสดงข้อมูลส่วนตัวอื่นๆ

---

## 📅 กฎข้อที่ 1.2: การอัพเดทข้อมูล (Data Updates)

**เมื่อมีการแก้ไขข้อมูลสำคัญ:**

- ✅ **ระบุวันที่และเวลา** ที่อัพเดทล่าสุดเสมอ
- ✅ ใช้รูปแบบ: `DD-MM-YYYY, HH:MM น.` (เวลาไทย)
- ✅ อัพเดท field "อัปเดตล่าสุด" ในไฟล์ที่เกี่ยวข้อง
- ✅ ระบุเวอร์ชันหากมีการเปลี่ยนแปลงสำคัญ

**ตัวอย่าง:**
```
อัปเดตล่าสุด: 26-01-2026, 11:55 น.
เวอร์ชัน: V.1.1.0
```

---

## 🏢 กฎข้อที่ 2: การจับคู่เขต-สาขา (Zone-Branch Mapping)

**7 เขต, 24 สาขา:**

| เขต       | สาขา                                      |
| --------- | ----------------------------------------- |
| **เขต 1** | พุทธมณฑล, นครปฐม, หัวหิน, พระราม 2        |
| **เขต 2** | สาทร, ปทุมวัน, พระราม 4, นนทบุรี          |
| **เขต 3** | ปทุมธานี, รามอินทรา, อยุธยา               |
| **เขต 4** | ลาดพร้าว, พัฒนาการ, สุวินทวงศ์, ประชาชื่น |
| **เขต 5** | ปราจีนบุรี, สมุทรปราการ, พัทยา, ระยอง     |
| **เขต 6** | สุขุมวิท, ปากน้ำ, ชลบุรี                  |
| **เขต 7** | ปากช่อง, สระบุรี                          |

### อ้างอิง JavaScript:

```javascript
const ZONE_BRANCH_MAPPING = {
  "เขต 1": ["พุทธมณฑล", "นครปฐม", "หัวหิน", "พระราม 2"],
  "เขต 2": ["สาทร", "ปทุมวัน", "พระราม 4", "นนทบุรี"],
  "เขต 3": ["ปทุมธานี", "รามอินทรา", "อยุธยา"],
  "เขต 4": ["ลาดพร้าว", "พัฒนาการ", "สุวินทวงศ์", "ประชาชื่น"],
  "เขต 5": ["ปราจีนบุรี", "สมุทรปราการ", "พัทยา", "ระยอง"],
  "เขต 6": ["สุขุมวิท", "ปากน้ำ", "ชลบุรี"],
  "เขต 7": ["ปากช่อง", "สระบุรี"],
};

// หาเขตจากชื่อสาขา
function getZoneFromBranch(branch) {
  for (const [zone, branches] of Object.entries(ZONE_BRANCH_MAPPING)) {
    if (branches.includes(branch)) return zone;
  }
  return null;
}
```

---

## 👥 กฎข้อที่ 3: ทีมบริการ (Service Teams)

**16 ทีม (A-O, Z):**

```
ทีม A, ทีม B, ทีม C, ทีม D, ทีม E, ทีม F, ทีม G, ทีม H,
ทีม I, ทีม J, ทีม K, ทีม L, ทีม M, ทีม N, ทีม O, ทีม Z
```

- **Teams A-O**: ทีมภาคสนามปกติ (Field service teams)
- **Team Z**: ทีมพิเศษ/สำรอง (Special/backup team)

---

## 📍 กฎข้อที่ 4: โครงสร้างข้อมูล Check-In (Data Structure)

### Firestore Collection: `checkins`

```javascript
{
  id: "string",              // รหัสเอกสาร (สร้างอัตโนมัติ)
  team: "A-O|Z",             // ทีมที่ check-in
  customerName: "string",    // ชื่อลูกค้า
  contractNumber: "string",  // เลขที่สัญญา
  branch: "string",          // สาขา (จาก 24 สาขา)
  zone: "string",            // เขต 1-7 (อัตโนมัติจากสาขา)

  // ข้อมูลตำแหน่ง (Location data)
  location: {
    lat: number,             // ละติจูด
    lng: number,             // ลองจิจูด
    address: "string",       // ที่อยู่ที่แปลงจากพิกัด
    accuracy: number         // ความแม่นยำ GPS (เมตร)
  },

  // รูปภาพ (เก็บใน Firebase Storage)
  photos: {
    houseFront: "string",    // Storage URL - รูปหน้าบ้าน
    contractPhoto: "string"  // Storage URL - รูปเลขที่สัญญา
  },

  notes: "string",           // หมายเหตุ
  visible: boolean,          // แสดงบนแผนที่หรือไม่

  // เวลา (Timestamps)
  checkinTime: Timestamp,    // เวลาที่ check-in
  createdAt: Timestamp,      // เวลาที่สร้างข้อมูล
  updatedAt: Timestamp       // เวลาแก้ไขล่าสุด
}
```

---

## 🗺️ กฎข้อที่ 5: แผนที่และระยะทาง (Map & Distance)

### สูตรคำนวณระยะทาง (Haversine Formula):

```javascript
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // รัศมีโลก (กม.)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // ระยะทางเป็นกิโลเมตร
}
```

### ผู้ให้บริการแผนที่: Leaflet (ฟรี)

```javascript
// เริ่มต้นแผนที่
const map = L.map("map").setView([13.7563, 100.5018], 10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// เพิ่มหมุด (Marker)
L.marker([lat, lng]).addTo(map).bindPopup(popupContent);

// วาดเส้นระยะทาง
L.polyline(
  [
    [lat1, lng1],
    [lat2, lng2],
  ],
  { color: "blue" },
).addTo(map);
```

---

## 🔍 กฎข้อที่ 6: ตัวเลือกตัวกรองแอดมิน (Admin Filters)

### ตัวกรองที่จำเป็น:

| ตัวกรอง       | ตัวเลือก            | ค่าเริ่มต้น |
| ------------- | ------------------- | ----------- |
| **ทีม**       | ทั้งหมด, A-O, Z     | ทั้งหมด     |
| **เขต**       | ทั้งหมด, เขต 1-7    | ทั้งหมด     |
| **สาขา**      | ทั้งหมด, 24 สาขา    | ทั้งหมด     |
| **วันที่**    | เลือกช่วงวันที่     | วันนี้      |
| **การแสดงผล** | ทั้งหมด, แสดง, ซ่อน | ทั้งหมด     |

### ตัวอย่าง Query:

```javascript
let query = db.collection("checkins");

if (teamFilter !== "all") {
  query = query.where("team", "==", teamFilter);
}
if (zoneFilter !== "all") {
  query = query.where("zone", "==", zoneFilter);
}
if (branchFilter !== "all") {
  query = query.where("branch", "==", branchFilter);
}
if (dateFilter) {
  query = query
    .where("checkinTime", ">=", startDate)
    .where("checkinTime", "<=", endDate);
}
```

---

## 📸 กฎข้อที่ 7: การจัดการรูปภาพ (Photo Handling)

### การถ่ายรูปบนมือถือ (Mobile Camera Input):

```html
<!-- บังคับให้ถ่ายรูปจากกล้อง (ไม่ใช่เลือกจาก Gallery) -->
<!-- ป้องกันปัญหา HEIC จาก iPhone -->
<input type="file" accept="image/jpeg,image/png" capture="environment">
```

| Attribute | ค่า | คำอธิบาย |
|-----------|-----|----------|
| `accept` | `image/jpeg,image/png` | รับเฉพาะ JPEG/PNG (ไม่รับ HEIC) |
| `capture` | `environment` | ใช้กล้องหลัง (ถ่ายหน้าบ้าน, เลขสัญญา) |

**หมายเหตุ**: เมื่อใช้ `capture` บน iPhone/Android Browser จะแปลงเป็น JPEG อัตโนมัติ ไม่มีปัญหา HEIC

### บีบอัดรูปภาพ (ก่อนอัปโหลด):

```javascript
async function compressImage(file, maxWidth = 1200, quality = 0.7) {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, 1);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(resolve, "image/jpeg", quality);
    };

    img.src = URL.createObjectURL(file);
  });
}
```

### เส้นทางจัดเก็บไฟล์ info (Storage Path):

```
checkins/{year}/{month}/{checkinId}/house_front.jpg
checkins/{year}/{month}/{checkinId}/contract.jpg
```

### ขนาดไฟล์เป้าหมาย: **100-200 KB ต่อรูป**

---

## 📊 กฎข้อที่ 8: โควต้า Firebase (Spark Plan)

**ขีดจำกัดแบบใช้ฟรี (Free Tier):**

| ทรัพยากร  | ขีดจำกัด    | การใช้งานที่ปลอดภัย |
| --------- | ----------- | ------------------- |
| Storage   | 10 GB       | 1 GB/เดือน          |
| Writes    | 20K/วัน     | 500/วัน             |
| Reads     | 50K/วัน     | 5K/วัน              |
| Downloads | 10 GB/เดือน | 5 GB/เดือน          |

### สำหรับการ Check-in 2,500 ครั้ง/เดือน (~83 ครั้ง/วัน):

- ✅ **Writes**: 83/วัน (0.4% ของโควต้า)
- ✅ **Reads**: ~300/วัน (0.6% ของโควต้า)
- ⚠️ **Storage**: ~1GB/เดือน (ใช้ได้ประมาณ 10 เดือนก่อนเต็ม)

### แนวทางปฏิบัติที่ดี (Best Practices):

- ✅ บีบอัดรูปให้เหลือ 100-200 KB
- ✅ เก็บ Cache ข้อมูลไว้ในเครื่องเมื่อทำได้
- ✅ ใช้ Pagination (โหลดทีละ 50 รายการ)
- ✅ Archive ข้อมูลเก่า (> 6 เดือน)

---

## 🔐 กฎข้อที่ 9: บทบาทผู้ใช้ (User Roles)

| บทบาท     | การเข้าถึง     | สิทธิ์การใช้งาน                              |
| --------- | -------------- | -------------------------------------------- |
| **TEAM**  | มือถือเท่านั้น | Check-in, ดูประวัติของตัวเอง                 |
| **ADMIN** | คอมพิวเตอร์    | ดูทั้งหมด, กรองข้อมูล, Export, ซ่อน/แสดงหมุด |
| **OWNER** | เต็มรูปแบบ     | ทำได้ทุกอย่าง + ตั้งค่าระบบ, ลบข้อมูล        |

---

## 📱 กฎข้อที่ 10: แนวทาง UI มือถือ (Mobile UI)

**เป้าหมาย: ทีมภาคสนามใช้งานบนมือถือ (Android/iOS)**

| รายละเอียด           | ค่าที่กำหนด  |
| -------------------- | ------------ |
| ขนาดจุดสัมผัสขั้นต่ำ | 44x44px      |
| ขนาดตัวอักษร         | 14-18px      |
| ความสูงปุ่ม          | ขั้นต่ำ 48px |
| ระยะห่าง (Padding)   | 12-16px      |

### ฟีเจอร์ที่จำเป็น:

- ✅ จับพิกัด GPS
- ✅ เข้าถึงกล้อง (กล้องหลังเป็นหลัก)
- ✅ ตรวจสอบและแจ้งเตือนเมื่อไม่มีเน็ต (Offline detection)
- ✅ สถานะกำลังโหลด (Loading states)
- ✅ แจ้งเตือน Error เป็นภาษาไทย

---

## 🖥️ กฎข้อที่ 11: ฟีเจอร์หน้าแอดมิน (Desktop Admin)

### สิ่งที่ต้องมี:

- ✅ แผนที่ตอบโต้ได้ (Interactive Map) พร้อมหมุดทั้งหมด
- ✅ ปุ่มเปิด/ปิดการมองเห็น (Show/Hide)
- ✅ ระบบกรองหลายชั้น (ทีม, เขต, สาขา, วันที่)
- ✅ วัดระยะทางระหว่างจุด
- ✅ ส่งออกเป็น Excel/CSV
- ✅ ค้นหาด้วยชื่อลูกค้า หรือเลขที่สัญญา

### UI วัดระยะทาง:

```javascript
// คลิก 2 จุดบนแผนที่เพื่อวัดระยะ
map.on("click", (e) => {
  if (measureMode) {
    addMeasurePoint(e.latlng);
    if (measurePoints.length === 2) {
      showDistance(measurePoints[0], measurePoints[1]);
    }
  }
});
```

---

## 📅 กฎข้อที่ 12: รูปแบบวันที่ (Date Format)

**บังคับใช้: `DD-MM-YYYY` (ปี ค.ศ.)**

- ✅ `22-01-2026`
- ❌ `2026-01-22` (ผิดรูปแบบ)
- ❌ `22-01-2569` (ปี พ.ศ. - ห้ามใช้)

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```
Bait Check-In Webapp/
├── index.html                  # หน้าหลัก (redirect to mobile/desktop)
├── mobile-checkin.html         # หน้ามือถือ (Mobile Check-in)
├── admin-dashboard.html        # หน้าแอดมิน (Desktop Dashboard)
├── copilot-instructions.md     # กฎสำหรับ AI
├── task.md                     # สถานะโปรเจกต์
├── README.md                   # คำอธิบายโปรเจกต์
│
├── pages/                      # หน้าเสริมอื่นๆ
│   ├── logo-showcase.html      # หน้าโหวตโลโก้
│   └── test/                   # หน้าทดสอบ
│       ├── test-firebase.html
│       ├── test-compress.html
│       ├── compress-demo.html
│       └── compress-quality-test.html
│
├── src/                        # โค้ด JavaScript
│   └── firebase-config.js      # Firebase Configuration
│
├── firebase/                   # Firebase Rules
│   ├── firestore.rules
│   └── storage.rules
│
├── docs/                       # เอกสาร
│   └── project-workflow.drawio
│
├── image/                      # รูปภาพ
│   └── deploy-history/
│
├── secrets/                    # ไฟล์ลับ (ห้าม commit)
│   ├── Firebase SDK.txt
│   ├── HERE Map API KEY.txt
│   └── Longdo API KEY.txt
│
└── (config files)
    ├── .firebaserc
    ├── firebase.json
    ├── .gitignore
    ├── deploy.ps1
    └── deploy-history.log
```

---

## 📁 กฎข้อที่ 14: การจัดการไฟล์ (File Organization)

**หลักการจัดเก็บไฟล์:**

| ประเภท | ที่เก็บ | หมายเหตุ |
|--------|---------|----------|
| หน้าหลัก (Main Pages) | `/` (root) | index, mobile, desktop |
| หน้าเสริม | `/pages/` | logo-showcase, etc. |
| หน้าทดสอบ | `/pages/test/` | test-*, compress-* |
| โค้ด JavaScript | `/src/` | firebase-config, shared code |
| Firebase Rules | `/firebase/` | firestore.rules, storage.rules |
| เอกสาร | `/docs/` | diagrams, guides |
| รูปภาพ | `/image/` | screenshots, assets |
| ไฟล์ลับ | `/secrets/` | API keys (ห้าม commit) |

**กฎการตั้งชื่อไฟล์:**

- ✅ ใช้ lowercase และ hyphen: `test-firebase.html`
- ❌ ห้ามใช้ space หรือ underscore
- ✅ ไฟล์ทดสอบขึ้นต้นด้วย `test-`
- ✅ ไฟล์ config ใส่ใน folder เฉพาะ

---

## ⚡ ฟังก์ชันอ้างอิงด่วน (Quick Reference)

```javascript
// หาเขตจากชื่อสาขา
getZoneFromBranch(branchName);

// คำนวณระยะทาง (กม.)
calculateDistance(lat1, lng1, lat2, lng2);

// บีบอัดรูปภาพ
compressImage(file, maxWidth, quality);

// จัดรูปแบบพิกัด
formatCoords(lat, lng); // Returns "13.7563, 100.5018"

// จัดรูปแบบวันที่ไทย
formatThaiDate(timestamp); // Returns "22-01-2026"
```

---

## 🧪 กฎข้อที่ 15: Markdown Linting Standards (ป้องกัน Errors)

**เพื่อหลีกเลี่ยงปัญหา Markdown errors ที่เยอะเหมือนครั้งที่แล้ว:**

### ✅ ตารางต้องมี Standard Format

```markdown
| Header 1 | Header 2 | Header 3 |
| --- | --- | --- |
| Data 1 | Data 2 | Data 3 |
```

❌ **ห้าม** ใช้รูปแบบ `|------|---------|` (เก่า)

### ✅ URLs ต้องห่อในลิงค์ Markdown

```markdown
✅ [https://example.com](https://example.com)
❌ https://example.com
```

### ✅ Headings ต้องใช้ `##` ไม่ใช่ Bold

```markdown
✅ ## หัวเรื่อง
❌ **หัวเรื่อง**
```

### ✅ Code Blocks ต้องมี Language Specifier

```markdown
✅ ```javascript
   const x = 5;
   ```

❌ ```
   const x = 5;
   ```
```

### ✅ Blank Lines รอบ Items

```markdown
## Heading

✅ ต้องมีบรรทัดว่าง

- Item 1
- Item 2

✅ ต้องมีบรรทัดว่างก่อนหลังรายการ
```

### ✅ ไม่มี Trailing Punctuation ในหัวเรื่อง

```markdown
✅ ## ชื่อเรื่อง
❌ ## ชื่อเรื่อง:
```

### ✅ ไม่มี Duplicate Headings

```markdown
✅ ## Troubleshooting
   (เนื้อหา 1)

   ## Error Handling
   (เนื้อหา 2)

❌ ## Troubleshooting
   (เนื้อหา 1)
   
   ## Troubleshooting
   (เนื้อหา 2)
```

### ✅ ไม่มี Multiple Consecutive Blank Lines

```markdown
❌ Paragraph 1


Paragraph 2 (มี 2 บรรทัดว่าง)

✅ Paragraph 1

Paragraph 2 (มี 1 บรรทัดว่าง)
```

### 🔧 วิธีตรวจสอบ Markdown Errors

1. **ใช้ Markdownlint Extension ใน VS Code**
   - ติดตั้ง "markdownlint" extension
   - จะแสดง errors สีแดง ขณะพิมพ์

2. **รัน Check ด้วย Terminal**
   ```bash
   npm install -g markdownlint-cli
   markdownlint "*.md"
   markdownlint "docs/*.md"
   ```

3. **ก่อน Commit ต้อง Check**
   - ดูแถบ "Problems" ใน VS Code
   - Fix ทั้งหมด ก่อน commit

---

## 🧪 กฎข้อที่ 16: Playwright Testing Standards

**สำหรับการเขียน E2E Tests ด้วย Playwright:**

### ✅ Data-test Attributes จำเป็น

```html
<!-- ✅ ต้องมี data-test เสมอ -->
<button data-test="checkin-btn">Check-in</button>
<input data-test="customer-name">

<!-- ❌ ห้าม ใช้ class/id สำหรับ selectors -->
<button class="btn-submit">ไม่ดี</button>
```

### ✅ Test Structure

```javascript
const { test, expect } = require('@playwright/test');

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/path');
  });

  test('should do X', async ({ page }) => {
    // Action
    await page.locator('[data-test="btn"]').click();
    
    // Assertion
    await expect(page.locator('[data-test="result"]')).toBeVisible();
  });
});
```

### ✅ Naming Convention

```javascript
// ✅ ชื่อ test ขึ้นต้นด้วยเลขลำดับ (สำหรับอ่านง่าย)
test('1️⃣ Should load page', async ({ page }) => {});
test('2️⃣ Should display form', async ({ page }) => {});

// ✅ ชื่อ test เป็นประโยคสมบูรณ์
test('should fill check-in form and submit', async ({ page }) => {});

// ❌ ชื่อลัวๆ
test('Test 1', async ({ page }) => {});
test('form test', async ({ page }) => {});
```

### ✅ Selectors Priority

```javascript
// 1️⃣ ดีที่สุด: data-test attributes
await page.locator('[data-test="btn"]').click()

// 2️⃣ ดี: semantic HTML
await page.locator('button[type="submit"]').click()

// 3️⃣ ลังเล: class names
await page.locator('.submit-btn').click()

// 4️⃣ ไม่ดี: nth-child, element indexes
await page.locator('div > button:nth-child(2)').click()
```

### ✅ Assertions Format

```javascript
// ✅ ชัดเจน
await expect(page.locator('h1')).toContainText('Check-in');

// ✅ Multiple assertions
await expect(page.locator('input')).toBeVisible();
await expect(page.locator('input')).toHaveAttribute('required');

// ❌ หลายอย่างรวมกัน
await page.locator('h1').fill('test').click();
```

### ✅ Test Independence

```javascript
// ❌ Tests ต่อเนื่องกัน (ไม่ดี)
test('step 1', async ({ page }) => { /* setup */ });
test('step 2', async ({ page }) => { /* depends on step 1 */ });

// ✅ Tests เป็นอิสระ
test('should complete full flow', async ({ page }) => {
  // setup + action + assertion ในแต่ละ test
});
```

### ✅ Timeout Settings

```javascript
// ✅ รอ element ที่อาจช้า
await expect(page.locator('[data-test="result"]')).toBeVisible({ timeout: 5000 });

// ✅ Configure globally ใน playwright.config.js
timeout: 30000,
expect: {
  timeout: 5000
}
```

### 🚫 Common Mistakes to Avoid

| ❌ ผิด | ✅ ถูก | เหตุผล |
| --- | --- | --- |
| `page.locator('.btn').click()` | `page.locator('[data-test="btn"]').click()` | Class อาจเปลี่ยน |
| `page.waitForTimeout(5000)` | `await expect(page.locator('[data-test="result"]')).toBeVisible()` | รอ element ไม่ใช่เวลา |
| `test('test', () => {})` | `test('should do X', () => {})` | ชื่อต้องเป็นประโยค |
| Tests ต่อเนื่อง | Tests อิสระ | แต่ละ test ต้องรันได้เฉพาะตัว |
| ไม่มี assertions | มี assertions | ต้องตรวจสอบผลลัพธ์ |

---

## 🤖 กฎข้อที่ 17: การสร้าง WebApp ต้องมี Playwright Tests

**เมื่อ AI สร้างหรือแก้ไข WebApp ต้องทำ Playwright ให้ด้วยเสมอ:**

### ✅ สิ่งที่ต้องสร้างอัตโนมัติ

**1. โครงสร้าง Playwright:**

```text
tests/
├── {feature-name}.spec.js   # Test files
playwright.config.js          # Configuration
```

**2. ไฟล์ที่ต้องสร้าง:**

| ไฟล์ | เมื่อไหร่ | หมายเหตุ |
| --- | --- | --- |
| `playwright.config.js` | ถ้ายังไม่มี | ตั้งค่า Playwright |
| `package.json` | ถ้ายังไม่มี | เพิ่ม scripts & deps |
| `tests/*.spec.js` | ทุกครั้ง | Tests สำหรับ feature |

**3. playwright.config.js Template:**

```javascript
// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npx http-server -p 8080',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
  },
});
```

### ✅ เมื่อสร้างหน้า HTML ใหม่

**ต้องเพิ่ม `data-test` attributes ใน HTML เสมอ:**

```html
<!-- ทุก element ที่ต้องการ test ต้องมี data-test -->
<button data-test="submit-btn">Submit</button>
<input data-test="email-input" type="email">
<div data-test="result-container">...</div>
```

**Naming Convention สำหรับ data-test:**

| ประเภท | รูปแบบ | ตัวอย่าง |
| --- | --- | --- |
| Button | `{action}-btn` | `submit-btn`, `cancel-btn` |
| Input | `{field}-input` | `email-input`, `name-input` |
| Select | `{field}-select` | `team-select`, `branch-select` |
| Container | `{name}-container` | `map-container`, `form-container` |
| Table | `{name}-table` | `checkin-table`, `data-table` |
| Modal | `{name}-modal` | `confirm-modal`, `team-modal` |
| Message | `{type}-msg` | `success-msg`, `error-msg` |

### ✅ เมื่อสร้าง Test File ใหม่

**ต้องมีโครงสร้างนี้:**

```javascript
// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/page.html');
  });

  test('1️⃣ Should load page correctly', async ({ page }) => {
    await expect(page.locator('[data-test="main-container"]')).toBeVisible();
  });

  test('2️⃣ Should perform action X', async ({ page }) => {
    await page.locator('[data-test="btn"]').click();
    await expect(page.locator('[data-test="result"]')).toContainText('Success');
  });
});
```

### ✅ Checklist ก่อน Commit WebApp

- [ ] เพิ่ม `data-test` ใน HTML elements ทั้งหมด
- [ ] เขียน tests ครอบคลุม user flows หลัก
- [ ] รัน `npx playwright test` ตรวจสอบ tests ผ่าน
- [ ] ไม่มี errors ใน VS Code Problems tab

### 🚫 สิ่งที่ต้องหลีกเลี่ยง

| ❌ ห้ามทำ | ✅ ทำแทน |
| --- | --- |
| สร้าง HTML โดยไม่มี data-test | เพิ่ม data-test ทุก interactive element |
| ใช้ class/id เป็น selectors | ใช้ data-test attributes |
| สร้าง feature โดยไม่มี tests | เขียน tests ควบคู่กับ feature |

---

## 🛡️ กฎข้อที่ 18: ป้องกันปัญหาซ้ำ (Error Prevention)

**กฎนี้รวบรวมปัญหาที่เคยเกิดขึ้น และวิธีป้องกัน:**

### 1. Markdown Linting Errors

**ปัญหา:** MD034, MD040, MD060, MD024, MD031, MD032

**สาเหตุ:** ไม่ได้ตรวจสอบก่อน commit

**ป้องกัน:**

```powershell
# ตรวจสอบก่อน commit
npm run lint:md

# หรือดู Problems tab ใน VS Code
```

### 2. Missing data-test Attributes

**ปัญหา:** Playwright tests fail เพราะหา element ไม่เจอ

**สาเหตุ:** HTML ไม่มี data-test attributes

**ป้องกัน:** เพิ่ม data-test ทุก element ที่ต้องการ test

### 3. Incomplete Test Coverage

**ปัญหา:** Bug หลุดไปใน production

**สาเหตุ:** ไม่ได้เขียน tests ครอบคลุม

**ป้องกัน:** เขียน tests สำหรับ:

- ✅ Happy path (การใช้งานปกติ)
- ✅ Error cases (เมื่อเกิดข้อผิดพลาด)
- ✅ Edge cases (กรณีพิเศษ)
- ✅ Validation (ตรวจสอบ form)

### Summary Table

| ปัญหา | วิธีป้องกัน | ไฟล์ที่เกี่ยวข้อง |
| --- | --- | --- |
| Markdown errors | ตรวจสอบก่อน commit | *.md files |
| Missing selectors | เพิ่ม data-test | *.html files |
| Test failures | เขียน tests ครบ | tests/*.spec.js |

---

## 📝 กฎข้อที่ 19: รายงานปัญหา Playwright Test (Test Issue Report)

**เมื่อรัน Playwright tests แล้วพบปัญหา ต้องสร้างรายงาน:**

### ✅ ไฟล์รายงาน

**สร้างไฟล์:** `Test report by Playwright.md` (root folder)

### ✅ โครงสร้างรายงาน

```markdown
# 🧪 Playwright Test Issues Report

## 📊 สรุปภาพรวม

| รายการ | จำนวน |
| --- | --- |
| **Total Tests** | XX |
| **Passed** | XX ✅ |
| **Failed** | XX ❌ |
| **Pass Rate** | XX% |
| **Last Run** | DD-MM-YYYY, HH:MM น. |

---

## ❌ ปัญหาที่พบ (Issues)

### Issue #1: [ชื่อปัญหา]

| รายละเอียด | ข้อมูล |
| --- | --- |
| **Test File** | `tests/xxx.spec.js` |
| **Test Name** | `should do something` |
| **Error Message** | `Timed out waiting for...` |
| **พบเมื่อ** | DD-MM-YYYY |
| **สถานะ** | ❌ ยังไม่แก้ไข / ✅ แก้ไขแล้ว |
| **แก้ไขเมื่อ** | DD-MM-YYYY (ถ้าแก้แล้ว) |

**สาเหตุ:**
- อธิบายสาเหตุของปัญหา

**วิธีแก้ไข:**
- ขั้นตอนที่ 1
- ขั้นตอนที่ 2

---

### Issue #2: [ชื่อปัญหาถัดไป]
...

---

## ✅ ปัญหาที่แก้ไขแล้ว (Resolved)

| # | ปัญหา | แก้ไขเมื่อ | วิธีแก้ |
| --- | --- | --- | --- |
| 1 | Element not found | DD-MM-YYYY | เพิ่ม data-test |
| 2 | Timeout error | DD-MM-YYYY | เพิ่ม { timeout: 10000 } |

---

## 📝 ประวัติการรันทดสอบ (Test Run History)

| วันที่ | Passed | Failed | หมายเหตุ |
| --- | --- | --- | --- |
| DD-MM-YYYY | 25/29 | 4 | Initial run |
| DD-MM-YYYY | 29/29 | 0 | All fixed |

---

**อัปเดตล่าสุด:** DD-MM-YYYY, HH:MM น.
```

### ✅ เมื่อต้องสร้าง/อัพเดทรายงาน

| สถานการณ์ | Action |
| --- | --- |
| รัน Playwright ครั้งแรก | สร้างไฟล์ `Test report by Playwright.md` |
| พบปัญหาใหม่ | เพิ่ม Issue ใหม่ในรายงาน |
| แก้ไขปัญหาสำเร็จ | อัพเดท สถานะ → ✅ แก้ไขแล้ว |
| ปัญหาทั้งหมดแก้แล้ว | ย้ายไป section "Resolved" |
| รันทดสอบซ้ำ | อัพเดท Test Run History |

### ✅ ข้อมูลที่ต้องบันทึก

**สำหรับแต่ละ Issue:**

- [ ] ชื่อ Test File และ Test Name
- [ ] Error Message จาก Playwright
- [ ] วันที่พบปัญหา (DD-MM-YYYY)
- [ ] สาเหตุของปัญหา
- [ ] วิธีแก้ไข (ถ้าแก้แล้ว)
- [ ] สถานะ (❌ ยังไม่แก้ / ✅ แก้แล้ว)

### ✅ Workflow การใช้งาน

```text
1. รัน Playwright → npx playwright test
2. ถ้า PASS ทั้งหมด → ไม่ต้องทำอะไร
3. ถ้ามี FAIL → สร้าง/อัพเดท Test report by Playwright.md
4. แก้ไขปัญหา
5. รันทดสอบซ้ำ
6. อัพเดทสถานะในรายงาน
7. ทำซ้ำจนกว่าจะ PASS ทั้งหมด
```

### 🚫 สิ่งที่ห้ามทำ

| ❌ ห้าม | ✅ ทำแทน |
| --- | --- |
| ไม่บันทึกปัญหา | สร้างรายงานทุกครั้งที่พบปัญหา |
| ลืมอัพเดทสถานะ | อัพเดททันทีเมื่อแก้ไขเสร็จ |
| ไม่ระบุวันที่ | ใส่วันที่ทุกครั้ง (DD-MM-YYYY) |
| ไม่อธิบายสาเหตุ | อธิบายสาเหตุและวิธีแก้ชัดเจน |

---

## 🚫 กฎข้อที่ 20: ห้าม AI รัน Tests เอง

**ผู้ใช้จะ Run Tests เอง - AI ห้ามรัน**

- ❌ **ห้าม** รันคำสั่ง `npx playwright test`
- ❌ **ห้าม** รันคำสั่ง `npm test` หรือ `npm run test:*`
- ❌ **ห้าม** รันสคริปต์ `.\test.ps1`
- ✅ **ทำได้แค่** แก้ไขโค้ด test และ commit เท่านั้น
- ✅ ผู้ใช้จะเป็นคน Run Tests เองเมื่อพร้อม

**เหตุผล:**

- Tests ใช้เวลานาน (~2 นาที)
- ผู้ใช้ต้องการควบคุมเวลาที่จะรัน
- หลีกเลี่ยงการรัน tests ซ้ำโดยไม่จำเป็น

---

**อัปเดตล่าสุด:** 01-02-2026, 17:00 น.
**เวอร์ชัน:** V.1.8.0 (01-02-2026) - เพิ่มกฎห้าม AI รัน Tests

