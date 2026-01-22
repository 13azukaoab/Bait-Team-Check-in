# 📍 Bait Check-In App - Copilot Instructions

---

## 🔴 RULE 1: Deployment

**USER DEPLOYS MANUALLY - AI MUST NOT DEPLOY**

- ❌ Do NOT run `firebase deploy` commands
- ❌ Do NOT run deployment scripts
- ✅ Only make code changes and commit
- ✅ User will deploy themselves when ready

---

## 🏢 RULE 2: Zone-Branch Mapping

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

### JavaScript Reference:

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

// Get zone from branch
function getZoneFromBranch(branch) {
  for (const [zone, branches] of Object.entries(ZONE_BRANCH_MAPPING)) {
    if (branches.includes(branch)) return zone;
  }
  return null;
}
```

---

## 👥 RULE 3: Service Teams

**16 Teams (A-O, Z):**

```
ทีม A, ทีม B, ทีม C, ทีม D, ทีม E, ทีม F, ทีม G, ทีม H,
ทีม I, ทีม J, ทีม K, ทีม L, ทีม M, ทีม N, ทีม O, ทีม Z
```

- Teams A-O: Field service teams (ทีมภาคสนาม)
- Team Z: Special/backup team (ทีมพิเศษ)

---

## 📍 RULE 4: Check-In Data Structure

### Firestore Collection: `checkins`

```javascript
{
  id: "string",              // Auto-generated document ID
  team: "A-O|Z",             // ทีมที่ check-in
  customerName: "string",    // ชื่อลูกค้า
  contractNumber: "string",  // เลขที่สัญญา
  branch: "string",          // สาขา (จาก 24 สาขา)
  zone: "string",            // เขต 1-7 (auto from branch)

  // Location data
  location: {
    lat: number,             // Latitude
    lng: number,             // Longitude
    address: "string",       // Reverse geocoded address
    accuracy: number         // GPS accuracy in meters
  },

  // Photos (stored in Firebase Storage)
  photos: {
    houseFront: "string",    // Storage URL - รูปหน้าบ้าน
    contractPhoto: "string"  // Storage URL - รูปเลขที่สัญญา
  },

  notes: "string",           // หมายเหตุ
  visible: boolean,          // แสดงบนแผนที่หรือไม่

  // Timestamps
  checkinTime: Timestamp,    // เวลา check-in
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## 🗺️ RULE 5: Map & Distance Features

### Distance Calculation (Haversine Formula):

```javascript
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}
```

### Map Provider: Leaflet (Free)

```javascript
// Initialize map
const map = L.map("map").setView([13.7563, 100.5018], 10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// Add marker
L.marker([lat, lng]).addTo(map).bindPopup(popupContent);

// Draw distance line
L.polyline(
  [
    [lat1, lng1],
    [lat2, lng2],
  ],
  { color: "blue" },
).addTo(map);
```

---

## 🔍 RULE 6: Admin Filter Options

### Required Filters:

| Filter        | Options              | Default |
| ------------- | -------------------- | ------- |
| **ทีม**       | All, A-O, Z          | All     |
| **เขต**       | All, เขต 1-7         | All     |
| **สาขา**      | All, 24 branches     | All     |
| **วันที่**    | Date range picker    | Today   |
| **การแสดงผล** | All, Visible, Hidden | All     |

### Filter Query Example:

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

## 📸 RULE 7: Photo Handling

### Image Compression (Before Upload):

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

### Storage Path:

```
checkins/{year}/{month}/{checkinId}/house_front.jpg
checkins/{year}/{month}/{checkinId}/contract.jpg
```

### Target File Size: **100-200 KB per image**

---

## 📊 RULE 8: Firebase Quota (Spark Plan)

**Free Tier Limits:**

| Resource  | Limit       | Safe Usage |
| --------- | ----------- | ---------- |
| Storage   | 10 GB       | 1 GB/month |
| Writes    | 20K/day     | 500/day    |
| Reads     | 50K/day     | 5K/day     |
| Downloads | 10 GB/month | 5 GB/month |

### For 2,500 check-ins/month (~83/day):

- ✅ Writes: 83/day (0.4% of limit)
- ✅ Reads: ~300/day (0.6% of limit)
- ⚠️ Storage: ~1GB/month (10 months to full)

### Best Practices:

- ✅ Compress images to 100-200 KB
- ✅ Cache data locally when possible
- ✅ Use pagination (limit 50 per query)
- ✅ Archive old data (> 6 months)

---

## 🔐 RULE 9: User Roles

| Role      | Access      | Permissions                                 |
| --------- | ----------- | ------------------------------------------- |
| **TEAM**  | Mobile only | Check-in, View own history                  |
| **ADMIN** | Desktop     | View all, Filter, Export, Toggle visibility |
| **OWNER** | Full        | All admin + Settings, Delete                |

---

## 📱 RULE 10: Mobile UI Guidelines

**Target: Field team on mobile (Android/iOS)**

| Specification    | Value    |
| ---------------- | -------- |
| Min Touch Target | 44x44px  |
| Font Size        | 14-18px  |
| Button Height    | min 48px |
| Padding          | 12-16px  |

### Required Features:

- ✅ GPS location capture
- ✅ Camera access (environment)
- ✅ Offline detection + warning
- ✅ Loading states
- ✅ Error handling with Thai messages

---

## 🖥️ RULE 11: Desktop Admin Features

### Must-Have:

- ✅ Interactive map with all check-in markers
- ✅ Visibility toggle (show/hide on map)
- ✅ Multi-filter system (team, zone, branch, date)
- ✅ Distance measurement between points
- ✅ Export to Excel/CSV
- ✅ Search by customer name or contract number

### Distance Measurement UI:

```javascript
// Click two points on map to measure
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

## 📅 RULE 12: Date Format

**Always use: `DD-MM-YYYY` (Christian Era / ค.ศ.)**

- ✅ `22-01-2026`
- ❌ `2026-01-22` (wrong format)
- ❌ `22-01-2569` (Buddhist Era - wrong)

---

## 📁 Project Structure

```
Bait Check-In Webapp/
├── index.html              # Main app (redirects)
├── mockup-mobile.html      # Mobile check-in mockup
├── mockup-desktop.html     # Desktop admin mockup
├── copilot-instructions.md # This file
│
├── src/
│   ├── mobile/             # Mobile check-in app
│   ├── admin/              # Desktop admin dashboard
│   └── shared/             # Shared utilities
│
├── assets/
│   └── icons/
│
└── docs/
    └── guides/
```

---

## ⚡ Quick Reference Functions

```javascript
// Zone from branch
getZoneFromBranch(branchName);

// Distance between two points (km)
calculateDistance(lat1, lng1, lat2, lng2);

// Compress image before upload
compressImage(file, maxWidth, quality);

// Format coordinates
formatCoords(lat, lng); // Returns "13.7563, 100.5018"

// Format Thai date
formatThaiDate(timestamp); // Returns "22-01-2026"
```

---

**Last Updated:** 22-01-2026
**Version:** V.1.0.0 (22-01-2026)
