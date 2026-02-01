# 🚀 Cypress Quick Start Guide

สำหรับ Bait Check-In WebApp - เริ่มใช้ Cypress ใน 5 นาที

---

## 📋 สิ่งที่ต้องเตรียม

- Node.js ติดตั้งแล้ว
- Project folder เปิดใน VS Code

---

## ⚡ เริ่มต้นใช้งาน

### Step 1: ติดตั้ง Packages

```bash
npm install
```

### Step 2: เปิด Cypress Test Runner

```bash
npm run test:open
```

### Step 3: เลือก Test ที่อยากรัน

```text
cypress/e2e/
├── mobile-checkin.cy.js      ← Mobile tests
└── admin-dashboard.cy.js     ← Admin tests
```

### Step 4: ดู Tests ทำงาน

Browser จะทำการ click, type, fill form ให้เห็น

---

## 🎯 Commands ที่ใช้บ่อย

| Command | หน้าที่ |
| --- | --- |
| `npm run test:open` | เปิด interactive test runner |
| `npm run test` | รัน headless (ไม่มี browser) |
| `npm run test:mobile` | รันบน mobile viewport |
| `npm run test:desktop` | รันบน desktop viewport |
| `npm run test:debug` | debug mode (ช้าๆ) |

---

## 🔍 Debug Tips

### วิธี 1: เปิด DevTools

กด F12 ตอน test รัน

### วิธี 2: ใช้ cy.pause()

```javascript
cy.get('[data-test="btn"]').click();
cy.pause();  // หยุดตรงนี้
```

### วิธี 3: ใช้ cy.log()

```javascript
cy.log('กำลังทดสอบ...');
```

---

## 📝 ตัวอย่าง Test

```javascript
describe('Mobile Check-in', () => {
  it('should load page', () => {
    cy.visit('/mobile-checkin.html');
    cy.get('[data-test="team-selector"]').should('be.visible');
  });
});
```

---

## 🏷️ HTML Attributes ที่ต้องเพิ่ม

```html
<button data-test="checkin-btn">Check-in</button>
<input data-test="customer-name" type="text">
<select data-test="branch-select">...</select>
```

---

## ❌ Common Errors

| Error | วิธีแก้ |
| --- | --- |
| Element not found | เพิ่ม data-test ใน HTML |
| Timeout | เพิ่ม timeout: 5000 |
| Test fails randomly | ใช้ should() รอ element |

---

## 📚 อ่านเพิ่ม

- [Cypress Official Docs](https://docs.cypress.io/)
- [Cypress YouTube](https://www.youtube.com/c/CypressIO)

---

อัปเดตล่าสุด: 01-02-2026
