# 🚀 Cypress Quick Start Guide - เริ่มต้นใช้ Cypress

**ในแค่ 5 นาที! ที่ต้องรู้เพื่อเริ่มทดสอบเว็บแอป**

---

## 📋 สิ่งที่ต้องเตรียม

✅ Node.js ติดตั้งแล้ว  
✅ Project folder เปิดใน VS Code  

---

## ⚡ Step-by-Step เริ่มต้น

### Step 1: ติดตั้ง Packages (ครั้งแรกเท่านั้น)

```bash
npm install
```

**จะติดตั้ง:**
- ✅ Cypress test framework
- ✅ NPM scripts สำหรับรัน tests

---

### Step 2: เปิด Cypress Test Runner

```bash
npm run test:open
```

**จะเห็น:**
- Cypress Test Runner window (Chrome browser)
- ไฟล์ tests ทั้งหมด
- ปุ่ม "Run all tests"

---

### Step 3: เลือก Test ที่อยากรัน

```
cypress/e2e/
├── mobile-checkin.cy.js      ← คลิกเพื่อรัน Mobile tests
└── admin-dashboard.cy.js     ← คลิกเพื่อรัน Admin tests
```

---

### Step 4: ดู Tests ทำงาน

**จะเห็น:**
- Browser ทำการ click, type, fill form
- ข้อมูลทีลายซ้ายบอกว่า test ไหนผ่าน ✅ หรือล้มเหลว ❌
- ถ้าล้มเหลว จะเห็น error message

---

## 🎯 Commands ที่ใช้บ่อยๆ

### รัน Tests แบบ Interactive (เลือกเองว่า test ไหน)

```bash
npm run test:open
```

### รัน Tests ทั้งหมด (Headless)

```bash
npm run test
```

### รัน Mobile Tests

```bash
npm run test:mobile
```

### รัน Desktop Tests

```bash
npm run test:desktop
```

### Debug Mode (ช้าๆ เพื่อดูรายละเอียด)

```bash
npm run test:debug
```

---

## 👀 ดู Results & Artifacts

### 📸 Screenshots (เมื่อ test ล้มเหลว)

```bash
open cypress/screenshots
```

### 🎥 Videos (บันทึก test run)

```bash
open cypress/videos
```

### 📊 Reports

```bash
open cypress/reports
```

---

## 🐛 Debugging Quick Tips

### วิธี 1: ใช้ Cypress Test Runner

1. เปิด Test Runner (`npm run test:open`)
2. คลิก test ที่อยากดู
3. Hover รูปภาพ timeline ทางซ้าย
4. ดู step-by-step ที่ test ทำ

### วิธี 2: ใช้ Browser DevTools

```javascript
// ใส่บรรทัดนี้ใน test
cy.debug();

// หรือใช้ pause เพื่อหยุด
cy.pause();
```

### วิธี 3: ดู Error Message

```
❌ Cypress Error:
   Timed out retrying: cy.get() could not find element
   
เหตุผล: 
   ✓ Selector ผิด
   ✓ Element ยังไม่ load
   ✓ data-test attribute หายไป
```

---

## ✅ Checklist ก่อนเขียน Test ใหม่

- [ ] เปิด HTML file (mobile-checkin.html หรือ admin-dashboard.html)
- [ ] เพิ่ม `data-test="..."` attributes กับ elements ที่อยากทดสอบ
- [ ] เขียน test ใน `cypress/e2e/` folder
- [ ] รัน test: `npm run test:open`
- [ ] เช็ค ✅ test ผ่านหรือ ❌ ล้มเหลว
- [ ] Fix และรัน test อีกครั้ง

---

## 📚 HTML: เพิ่ม data-test Attributes

ถ้าอยากให้ Cypress หา element ได้ ต้องเพิ่ม `data-test` attribute:

### Mobile Check-in

```html
<!-- ฝั่ง mobile-checkin.html -->
<button data-test="team-selector">เลือกทีม</button>
<div data-team="A">ทีม A</div>

<input data-test="customer-name" type="text">
<input data-test="contract-number" type="text">
<select data-test="branch-select"><option>สาขา...</option></select>
<div data-test="zone-display">เขต ...</div>

<input data-test="photo-input" type="file">
<button data-test="checkin-btn">Check-in</button>

<div data-test="success-msg">สำเร็จ!</div>
<div data-test="error-msg">ผิดพลาด!</div>
```

### Admin Dashboard

```html
<!-- ฝั่ง admin-dashboard.html -->
<div data-test="map-container"></div>
<select data-test="team-filter"></select>
<select data-test="date-from"></select>
<select data-test="date-to"></select>
<button data-test="apply-filter">ค้นหา</button>

<table data-test="checkin-table">
  <thead>
    <th data-test="col-customer">ชื่อลูกค้า</th>
  </thead>
</table>

<button data-test="export-btn">Export</button>
<div data-test="export-excel">Export to Excel</div>

<button data-test="tab-gallery">Photo Gallery</button>
<img data-test="gallery-image">
```

---

## 🎓 ตัวอย่าง: Test เขียนเองง่ายๆ

### ตัวอย่าง 1: ทดสอบการ Load หน้า

```javascript
describe('Mobile Check-in', () => {
  it('should load page', () => {
    cy.visit('/mobile-checkin.html');
    cy.get('[data-test="team-selector"]').should('be.visible');
  });
});
```

### ตัวอย่าง 2: ทดสอบการเลือกทีม

```javascript
it('should select team A', () => {
  cy.visit('/mobile-checkin.html');
  
  // คลิก team selector
  cy.get('[data-test="team-selector"]').click();
  
  // คลิก team A
  cy.get('[data-team="A"]').click();
  
  // ตรวจสอบว่าเลือกแล้ว
  cy.get('[data-team="A"]').should('have.class', 'selected');
});
```

### ตัวอย่าง 3: ทดสอบการกรอกฟอร์ม

```javascript
it('should fill check-in form', () => {
  cy.visit('/mobile-checkin.html');
  
  // กรอกชื่อ
  cy.get('[data-test="customer-name"]').type('John Doe');
  
  // กรอกเลขสัญญา
  cy.get('[data-test="contract-number"]').type('CN-001');
  
  // เลือกสาขา
  cy.get('[data-test="branch-select"]').select('พุทธมณฑล');
  
  // ตรวจสอบว่าเขตเป็น "เขต 1"
  cy.get('[data-test="zone-display"]').should('contain', 'เขต 1');
});
```

---

## 🚨 Common Problems & Solutions

| ❌ ปัญหา | 🔧 วิธีแก้ |
| --- | --- |
| `cy.get() cannot find element` | เช็คว่า `data-test` attribute ถูกต้องหรือไม่ |
| Test timeout | เพิ่ม `{ timeout: 5000 }` หรือเช็กว่า element มีจริง |
| Test ต่างเครื่องไม่ผ่าน | เช็ค baseUrl ใน cypress.config.js |
| Browser ปิดตัวเองระหว่าง test | ลองรัน `npm run test:headless` แทน |
| Screenshot ไม่ชัด | ลอง cypress 15 zoom: `cy.viewport(1280, 720)` |

---

## 📖 เรียนรู้เพิ่มเติม

- 📚 [อ่าน Cypress Guide ฉบับเต็ม](./cypress-guide.md)
- 🎥 [ดูตัวอย่าง Tests](../cypress/e2e/)
- 💬 [Cypress Community](https://cypress.io/community/)

---

## 🎯 เป้าหมายการทดสอบ

**Mobile Check-in:**
- [ ] Load page
- [ ] Select team
- [ ] Get GPS location
- [ ] Upload photo
- [ ] Submit check-in

**Admin Dashboard:**
- [ ] Load dashboard
- [ ] Display map
- [ ] Filter by team
- [ ] Export data
- [ ] View photos

---

**Happy Testing! 🚀**

สำหรับคำถาม ลองดู [Full Cypress Guide](./cypress-guide.md)

อัปเดตล่าสุด: 01-02-2026
