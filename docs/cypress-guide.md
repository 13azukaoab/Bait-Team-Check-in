# 🧪 Cypress Testing Guide

สำหรับโปรเจกต์ Bait Check-In WebApp

อัปเดตล่าสุด: 01-02-2026

---

## 🎯 Cypress คืออะไร

Cypress เป็น E2E Testing Framework ที่ใช้ทดสอบ Web Application

### ข้อดี

- ฟรี และ open source
- ดู tests ทำงานได้จริง
- Debug ง่าย
- Screenshot และ Video อัตโนมัติ
- รองรับ TypeScript

---

## 📥 วิธีติดตั้ง

```bash
# Clone project
git clone https://github.com/13azukaoab/Bait-Team-Check-in.git

# เข้า folder
cd Bait-Team-Check-in

# ติดตั้ง dependencies
npm install
```

---

## 📁 โครงสร้าง Tests

```text
cypress/
├── cypress.config.js         # Configuration
├── jsconfig.json             # Type definitions
├── e2e/
│   ├── mobile-checkin.cy.js  # Mobile tests
│   └── admin-dashboard.cy.js # Admin tests
└── support/
    └── commands.js           # Custom commands
```

---

## ✏️ วิธีเขียน Tests

### โครงสร้างพื้นฐาน

```javascript
describe('Feature Name', () => {
  beforeEach(() => {
    cy.visit('/page.html');
  });

  it('should do something', () => {
    cy.get('[data-test="btn"]').click();
    cy.get('[data-test="result"]').should('be.visible');
  });
});
```

### Commands ที่ใช้บ่อย

| Command | ตัวอย่าง | หน้าที่ |
| --- | --- | --- |
| visit | `cy.visit('/page.html')` | เปิดหน้าเว็บ |
| get | `cy.get('[data-test="btn"]')` | เลือก element |
| click | `.click()` | คลิก |
| type | `.type('text')` | พิมพ์ |
| should | `.should('be.visible')` | ตรวจสอบ |

---

## ▶️ วิธีรัน Tests

| Command | หน้าที่ |
| --- | --- |
| `npm run test:open` | เปิด Cypress UI |
| `npm run test` | รันทั้งหมด headless |
| `npm run test:mobile` | รัน mobile viewport |
| `npm run test:desktop` | รัน desktop viewport |
| `npm run test:debug` | รันช้าๆ เพื่อ debug |

---

## 🔧 Debugging

### วิธี 1: ใช้ cy.pause()

```javascript
cy.get('[data-test="btn"]').click();
cy.pause();  // หยุดที่นี่
```

### วิธี 2: ใช้ cy.log()

```javascript
cy.log('Step 1: เปิดหน้าเว็บ');
cy.visit('/');
```

### วิธี 3: DevTools

กด F12 ตอน test กำลังรัน

### วิธี 4: Screenshots

```javascript
cy.screenshot('my-screenshot');
```

### วิธี 5: Debug Command

```javascript
cy.get('[data-test="btn"]').debug();
```

---

## ✅ Best Practices

### 1. ใช้ data-test attributes

```html
<!-- ดี -->
<button data-test="submit-btn">Submit</button>

<!-- ไม่ดี -->
<button class="btn-primary">Submit</button>
```

### 2. ตั้งชื่อ test ให้ชัดเจน

```javascript
// ดี
it('should display error when email is invalid', () => {});

// ไม่ดี
it('test 1', () => {});
```

### 3. แยก test ให้อิสระ

แต่ละ test ต้องรันได้เดี่ยวๆ

### 4. ใช้ should() แทน wait()

```javascript
// ดี
cy.get('[data-test="result"]').should('be.visible');

// ไม่ดี
cy.wait(5000);
```

### 5. Group tests ด้วย describe()

```javascript
describe('Login', () => {
  it('valid login', () => {});
  it('invalid login', () => {});
});
```

---

## 🏷️ Data-test Naming Convention

| ประเภท | รูปแบบ | ตัวอย่าง |
| --- | --- | --- |
| Button | action-btn | submit-btn, cancel-btn |
| Input | field-input | email-input, name-input |
| Select | field-select | team-select, branch-select |
| Container | name-container | map-container |
| Modal | name-modal | confirm-modal |

---

## ❌ Troubleshooting

### Error: Element not found

```text
วิธีแก้:
1. ตรวจสอบ data-test attribute
2. เพิ่ม timeout: cy.get('...', { timeout: 5000 })
```

### Error: Timeout

```text
วิธีแก้:
1. เพิ่ม defaultCommandTimeout ใน cypress.config.js
2. ตรวจสอบว่า element โหลดสำเร็จ
```

### Error: Test fails randomly

```text
วิธีแก้:
1. ใช้ should() รอ element
2. ไม่ใช้ cy.wait() กับเวลาคงที่
```

---

## 📚 Resources

- [Cypress Official Docs](https://docs.cypress.io/)
- [Cypress YouTube](https://www.youtube.com/c/CypressIO)
- [Cypress Community](https://cypress.io/community/)

---

## 🎯 Test Checklist

### Mobile Check-in

- Load page
- Display team selector
- Get GPS location
- Upload photo
- Complete check-in

### Admin Dashboard

- Load dashboard
- Display map
- Filter by team
- Export data
- View photos

---

Happy Testing! 🚀
