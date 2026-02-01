# 🧪 Cypress Testing Guide - คู่มือการใช้ Cypress

**สำหรับโปรเจกต์:** Bait Check-In WebApp  
**อัปเดตล่าสุด:** 01-02-2026

---

## 📚 สารบัญ

1. [Cypress คืออะไร](#cypress-คืออะไร)
2. [วิธีติดตั้ง](#วิธีติดตั้ง)
3. [โครงสร้าง Tests](#โครงสร้าง-tests)
4. [วิธีเขียน Tests](#วิธีเขียน-tests)
5. [วิธีรัน Tests](#วิธีรัน-tests)
6. [Debugging & Troubleshooting](#debugging--troubleshooting)
7. [Best Practices](#best-practices)

---

## 🎯 Cypress คืออะไร

**Cypress** คือเครื่องมือทดสอบอัตโนมัติ (Test Automation Tool) สำหรับเว็บแอปพลิเคชัน

### ข้อดีของ Cypress:

| ข้อดี | คำอธิบาย |
| --- | --- |
| **ง่าย** | เขียน tests แบบ JavaScript ธรรมชาติ |
| **เร็ว** | ทดสอบสดและ debug ได้ในตัว |
| **Visual** | เห็นสิ่งที่ test ทำอยู่แบบ real-time |
| **หา Bug ได้** | ระบุปัญหาแม่นยำ พร้อม video recordings |
| **ฟรี** | Open source, ไม่มีค่าใช้งาน |

---

## 🛠️ วิธีติดตั้ง

### Step 1: ติดตั้ง Node.js และ npm

```bash
# Check version
node --version
npm --version
```

### Step 2: ติดตั้ง Cypress

```bash
# ไปที่ folder project
cd "d:\OneDrive\Projects_Webapp\Bait Check-in Webapp"

# ติดตั้ง npm packages
npm install

# ติดตั้ง Cypress โดยเฉพาะ
npm install --save-dev cypress
```

### Step 3: ตรวจสอบ Cypress

```bash
# เปิด Cypress Test Runner (UI ที่ใช้งานสะดวก)
npm run test:open

# หรือ
npx cypress open
```

---

## 📁 โครงสร้าง Tests

```
Bait Check-in Webapp/
├── cypress/
│   ├── e2e/                          # ไฟล์ tests
│   │   ├── mobile-checkin.cy.js      # Tests สำหรับ Mobile
│   │   └── admin-dashboard.cy.js     # Tests สำหรับ Admin
│   │
│   ├── fixtures/                      # ข้อมูลทดสอบ (test data)
│   │   └── test-photo.jpg            # รูปภาพสำหรับทดสอบ
│   │
│   └── support/
│       └── commands.js                # Custom commands
│
├── cypress.config.js                  # ตั้งค่า Cypress
└── package.json                       # NPM configuration
```

---

## 🧬 วิธีเขียน Tests

### โครงสร้างพื้นฐาน

```javascript
describe('Test Suite Name', () => {
  // ทำงานก่อน test แต่ละตัว
  beforeEach(() => {
    cy.visit('/path-to-page');
  });

  // Test แต่ละตัว
  it('should do something', () => {
    // 1. Action (ทำการกระทำ)
    cy.get('[data-test="button"]').click();
    
    // 2. Assertion (ตรวจสอบผล)
    cy.get('[data-test="result"]').should('be.visible');
    
    // 3. Logging (เขียน log)
    cy.log('✅ Test passed');
  });
});
```

### Cypress Commands พื้นฐาน

| Command | ตัวอย่าง | คำอธิบาย |
| --- | --- | --- |
| **cy.visit()** | `cy.visit('/mobile-checkin.html')` | ไปที่ URL |
| **cy.get()** | `cy.get('[data-test="btn"]')` | เลือก element |
| **cy.click()** | `cy.get('button').click()` | คลิก |
| **cy.type()** | `cy.get('input').type('text')` | พิมพ์ข้อความ |
| **cy.select()** | `cy.get('select').select('option')` | เลือกจาก dropdown |
| **cy.should()** | `cy.get('h1').should('contain', 'text')` | ตรวจสอบ (assertion) |
| **cy.wait()** | `cy.wait(1000)` | รอ (1000 ms) |
| **cy.log()** | `cy.log('message')` | เขียน log |

### ตัวอย่าง: Test การ Check-in

```javascript
it('should complete check-in', () => {
  // 1. เลือกทีม
  cy.get('[data-team="A"]').click();
  
  // 2. กรอกชื่อลูกค้า
  cy.get('[data-test="customer-name"]').type('John Doe');
  
  // 3. กรอกเลขสัญญา
  cy.get('[data-test="contract-number"]').type('CN-001');
  
  // 4. เลือกสาขา
  cy.get('[data-test="branch-select"]').select('พุทธมณฑล');
  
  // 5. ตรวจสอบว่าเขต automatic เป็น "เขต 1"
  cy.get('[data-test="zone-display"]').should('contain', 'เขต 1');
  
  // 6. อัปโหลดรูป
  cy.get('[data-test="photo-input"]').selectFile('cypress/fixtures/test-photo.jpg');
  
  // 7. Submit
  cy.get('[data-test="checkin-btn"]').click();
  
  // 8. ตรวจสอบ success message
  cy.get('[data-test="success-msg"]').should('be.visible');
});
```

---

## ▶️ วิธีรัน Tests

### 1. เปิด Cypress Test Runner (Interactive Mode)

```bash
npm run test:open
```

**จะเห็น:**
- Browser ที่ใช้ test (Chrome, Firefox, Edge)
- ไฟล์ tests ที่สามารถเลือกรันได้
- Output ของ test (pass/fail)
- Screenshots และ videos

### 2. รัน Tests ทั้งหมด (Headless Mode)

```bash
npm run test
```

**ผลลัพธ์:**
- วิดีโอ recordings
- Screenshots ของ failures
- HTML report

### 3. รัน Tests เฉพาะบางไฟล์

```bash
# รัน Mobile tests
npx cypress run --spec "cypress/e2e/mobile-checkin.cy.js"

# รัน Admin tests
npx cypress run --spec "cypress/e2e/admin-dashboard.cy.js"
```

### 4. รัน Tests บน Mobile Viewport

```bash
npm run test:mobile
```

### 5. รัน Tests บน Desktop Viewport

```bash
npm run test:desktop
```

---

## 🐛 Debugging & Troubleshooting

### 1. เมื่อ Test ล้มเหลว

```javascript
// ใช้ cy.debug() เพื่อหยุด execution
cy.get('[data-test="btn"]').debug().click();

// หรือใช้ cy.pause()
cy.pause(); // หยุด execution ให้คุณทำการ inspect
```

### 2. ดูว่า Element มีไหม

```javascript
// ตรวจสอบ element ก่อนใช้
cy.get('[data-test="btn"]').should('exist');

// ถ้าไม่มี ให้ดู HTML
cy.get('body').then(($body) => {
  console.log($body.html()); // print HTML ออกมา
});
```

### 3. ดู Network Requests

```javascript
// Intercept Firebase requests
cy.intercept('POST', '**/checkins', (req) => {
  console.log('Request body:', req.body);
  req.reply({ statusCode: 200, body: { success: true } });
});
```

### 4. ปัญหา: Element ไม่พบ

```javascript
// ❌ ผิด
cy.get('[data-test="btn"]').click(); // ถ้าไม่มี จะ fail

// ✅ ถูก
cy.get('[data-test="btn"]', { timeout: 5000 }).click(); // รอ 5 วินาที
```

### 5. ปัญหา: Test รัน Timeout

```javascript
// ในไฟล์ cypress.config.js
module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 10000, // 10 วินาที
    requestTimeout: 10000,        // สำหรับ HTTP requests
  },
});
```

### 6. ดูรายละเอียดของ Error

เมื่อ test ล้มเหลว:
1. **ดู Cypress Test Runner** - จะแสดง error message
2. **ดู Screenshots** - `cypress/screenshots/`
3. **ดู Videos** - `cypress/videos/` (ต้องรัน headless)
4. **ดู Console Logs** - ในตัว Cypress Runner

---

## 📊 Assertions (ตรวจสอบผล)

### Text Assertions

```javascript
// ตรวจสอบข้อความ
cy.get('h1').should('contain', 'Check-in');
cy.get('h1').should('have.text', 'Check-in');
```

### Visibility Assertions

```javascript
// ตรวจสอบการแสดงผล
cy.get('[data-test="modal"]').should('be.visible');
cy.get('[data-test="modal"]').should('not.be.visible');
cy.get('[data-test="modal"]').should('exist');
```

### Input Value Assertions

```javascript
// ตรวจสอบค่า input
cy.get('input').should('have.value', 'John');
cy.get('input').should('be.empty');
```

### Count Assertions

```javascript
// ตรวจสอบจำนวน elements
cy.get('[data-test="item"]').should('have.length', 5);
cy.get('[data-test="item"]').should('have.length.greaterThan', 0);
```

---

## ✅ Best Practices

### 1. ใช้ Data Attributes สำหรับ Selectors

```javascript
// ❌ ไม่ดี (selector อาจเปลี่ยน)
cy.get('.submit-btn').click();
cy.get('div > button:nth-child(2)').click();

// ✅ ดี (specific & reliable)
cy.get('[data-test="checkin-btn"]').click();
cy.get('[data-test="submit"]').click();
```

### 2. เพิ่ม data-test Attributes ใน HTML

```html
<!-- Mobile Check-in -->
<button data-test="team-selector">เลือกทีม</button>
<input data-test="customer-name" type="text">
<select data-test="branch-select">
  <option>สาขา...</option>
</select>
<button data-test="checkin-btn">Check-in</button>

<!-- Admin Dashboard -->
<div data-test="map-container"></div>
<select data-test="team-filter"></select>
<button data-test="export-btn">Export</button>
```

### 3. ใช้ beforeEach สำหรับ Common Setup

```javascript
beforeEach(() => {
  // ทำการ setup ก่อน test แต่ละตัว
  cy.visit('/mobile-checkin.html');
  cy.selectTeam('A'); // custom command
});
```

### 4. เขียน Tests ที่เป็นอิสระ

```javascript
// ❌ ไม่ดี (test ต่อเนื่องกัน)
it('step 1', () => { /* ... */ });
it('step 2', () => { /* depends on step 1 */ });

// ✅ ดี (test เป็นอิสระ)
it('should complete flow A to B', () => {
  // setup > action > assertion
});

it('should complete flow B to C', () => {
  // setup > action > assertion
});
```

### 5. Organize Tests by Feature

```javascript
describe('Mobile Check-in', () => {
  describe('Team Selection', () => {
    it('should display teams', () => {});
    it('should select team A', () => {});
  });
  
  describe('Check-in Form', () => {
    it('should fill form', () => {});
    it('should validate required fields', () => {});
  });
});
```

---

## 📝 รายการ Test Cases ที่ต้องเขียน

### Mobile Check-in Tests

- [ ] Load page
- [ ] Display team selector
- [ ] Select team
- [ ] Get GPS location
- [ ] Upload photo
- [ ] Fill form fields
- [ ] Validate required fields
- [ ] Submit check-in
- [ ] Show success message
- [ ] Save to localStorage
- [ ] Handle offline mode

### Admin Dashboard Tests

- [ ] Load dashboard
- [ ] Display map
- [ ] Show markers
- [ ] Filter by team
- [ ] Filter by date
- [ ] Sort table
- [ ] Measure distance
- [ ] Export to Excel
- [ ] View photo gallery
- [ ] Real-time updates
- [ ] Responsive layout

---

## 🚀 ตัวอย่าง: รัน Tests ครบวงจร

```bash
# 1. ติดตั้ง dependencies
npm install

# 2. เปิด Cypress (เลือก tests ที่อยากรัน)
npm run test:open

# 3. หรือรัน tests ทั้งหมดใน headless mode
npm run test

# 4. ดู videos
open cypress/videos

# 5. ดู screenshots of failures
open cypress/screenshots

# 6. ดู HTML report
open cypress/reports/index.html
```

---

## 📞 ติดต่อสำหรับช่วยเหลือ

- 📖 [Cypress Docs](https://docs.cypress.io/)
- 🎥 [Cypress YouTube](https://www.youtube.com/c/CypressIO)
- 💬 [Cypress Community](https://cypress.io/community/)

---

**อัปเดตล่าสุด:** 01-02-2026  
**เวอร์ชัน:** 1.0.0
