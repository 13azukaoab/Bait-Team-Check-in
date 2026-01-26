# 📍 Bait Check-In App - คำสั่งสำหรับ Copilot

---

## 🔴 กฎข้อที่ 1: การ Deploy (Deployment)

**ผู้ใช้จะ Deploy เอง - AI ห้ามทำการ Deploy**

- ❌ **ห้าม** รันคำสั่ง `firebase deploy`
- ❌ **ห้าม** รันสคริปต์ deploy ใดๆ
- ✅ **ทำได้แค่** แก้ไขโค้ดและ Commit เท่านั้น
- ✅ ผู้ใช้จะเป็นคน Deploy เองเมื่อพร้อม

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
├── index.html              # หน้าหลัก (redirects)
├── mockup-mobile.html      # หน้าจอมือถือ (Mobile mockup)
├── mockup-desktop.html     # หน้าจอแอดมิน (Desktop mockup)
├── copilot-instructions.md # ไฟล์คำสั่งนี้
│
├── src/
│   ├── mobile/             # โค้ดส่วนมือถือ
│   ├── admin/              # โค้ดส่วนแอดมิน
│   └── shared/             # โค้ดที่ใช้ร่วมกัน
│
├── assets/
│   └── icons/
│
└── docs/
    └── guides/
```

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

## 🗣️ กฎข้อที่ 13: ภาษาในการสื่อสาร (Communication Language)

**ภาษาหลัก: ไทย (Thai Language)**

- ✅ สื่อสารกับผู้ใช้เป็น **ภาษาไทย**
- ✅ ใช้ภาษาไทยในการอธิบาย, เขียน Commit Message, และ PR Description
- ✅ Comment ในโค้ดใช้ได้ทั้งอังกฤษและไทย (แต่ถ้าอธิบาย Logic ยากๆ ขอเป็นไทย)
- ✅ คำศัพท์เทคนิคทับศัพท์ภาษาอังกฤษได้ (เช่น "Function", "Variable", "Deploy")

---

**อัปเดตล่าสุด:** 26-01-2026, 11:55 น.
**เวอร์ชัน:** V.1.1.0 (26-01-2026)
