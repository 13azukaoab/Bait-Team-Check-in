# 🧪 Playwright Test Issues Report

## 📊 สรุปภาพรวม

| รายการ | จำนวน |
| --- | --- |
| **Total Tests** | 145 |
| **Passed** | 95 ✅ |
| **Failed** | 50 ❌ |
| **Pass Rate** | 65.5% |
| **Last Run** | 01-02-2026, 15:45 น. |

---

## 📋 สรุปการทดสอบแบ่งตามหน้า

### Admin Dashboard Tests (16 tests × 5 browsers = 80 runs)

| Browser | Passed | Failed | Pass Rate |
| --- | --- | --- | --- |
| Chromium | 7/16 | 9/16 | 43.8% |
| Firefox | 7/16 | 9/16 | 43.8% |
| Webkit | 7/16 | 9/16 | 43.8% |
| Mobile Chrome | 7/16 | 9/16 | 43.8% |
| Mobile Safari | 7/16 | 9/16 | 43.8% |

**ปัญหาหลัก:** Filter elements ซ่อนอยู่ (hidden) ในทุก browser

### Mobile Check-in Tests (13 tests × 5 browsers = 65 runs)

| Browser | Passed | Failed | Pass Rate |
| --- | --- | --- | --- |
| Chromium | 12/13 | 1/13 | 92.3% |
| Firefox | 12/13 | 1/13 | 92.3% |
| Webkit | 12/13 | 1/13 | 92.3% |
| Mobile Chrome | 12/13 | 1/13 | 92.3% |
| Mobile Safari | 12/13 | 1/13 | 92.3% |

**ปัญหาหลัก:** Selector มีความหมายกำกวม (strict mode violation)

---

## ❌ ปัญหาที่พบ (Issues)

### Issue #1: Admin Dashboard - Filter Elements Hidden

| รายละเอียด | ข้อมูล |
| --- | --- |
| **Test File** | `tests/admin-dashboard.spec.js` |
| **Affected Tests** | Tests 4-12 (9 tests) |
| **Error Message** | `element is not visible - unexpected value "hidden"` |
| **พบเมื่อ** | 01-02-2026 |
| **สถานะ** | ❌ ยังไม่แก้ไข |
| **Browsers Affected** | All (chromium, firefox, webkit, mobile) |

**สาเหตุ:**

- Filter elements (team, zone, branch, date filters และปุ่ม Apply) มีการซ่อน (hidden/collapsed) ใน admin-dashboard.html
- Tests พยายามเข้าถึง elements ที่ยังไม่แสดงผล (visibility issue)
- อาจเป็นเพราะ responsive design ซ่อน filters เมื่อหน้าจอเล็ก หรือมี JavaScript ควบคุม visibility

**วิธีแก้ไข:**

1. ตรวจสอบ CSS และ JavaScript ใน admin-dashboard.html
2. เพิ่มการคลิกเปิด filter panel ก่อนทดสอบ (ถ้ามี toggle button)
3. หรือ Force visibility ใน test: `await page.evaluate(() => { document.querySelector('[data-test="filter-team"]').style.display = 'block'; })`

---

### Issue #2: Mobile Check-in - Strict Mode Violation

| รายละเอียด | ข้อมูล |
| --- | --- |
| **Test File** | `tests/mobile-checkin.spec.js` |
| **Test Name** | `1️⃣ Should load mobile check-in page` |
| **Error Message** | `strict mode violation: getByText('Bait Check-In') resolved to 2 elements` |
| **พบเมื่อ** | 01-02-2026 |
| **สถานะ** | ❌ ยังไม่แก้ไข |
| **Browsers Affected** | All (chromium, firefox, webkit, mobile) |

**สาเหตุ:**

- มี element 2 ตัวที่มีข้อความ "Bait Check-In":
  1. `<h2 class="login-title">Bait Check-In</h2>`
  2. `<h1>Bait Check-In</h1>`
- Playwright strict mode ต้องการให้ selector ชี้ไปที่ element เดียว

**วิธีแก้ไข:**

- เปลี่ยนจาก: `page.getByText('Bait Check-In')`
- เป็น: `page.getByRole('heading', { name: 'Bait Check-In', level: 2 })` (เลือก h2)
- หรือ: `page.locator('.login-title')` (ใช้ class ที่เฉพาะเจาะจง)
- หรือ: เพิ่ม `data-test="login-title"` ใน h2 และใช้ `page.locator('[data-test="login-title"]')`

---

## ✅ ปัญหาที่แก้ไขแล้ว (Resolved)

*ยังไม่มีปัญหาที่แก้ไขแล้ว*

---

## 📝 ประวัติการรันทดสอบ (Test Run History)

| วันที่ | Passed | Failed | หมายเหตุ |
| --- | --- | --- | --- |
| 01-02-2026 | 95/145 (65.5%) | 50/145 (34.5%) | Initial Playwright migration run |

---

## 🔧 การดำเนินการต่อไป (Next Steps)

1. ✅ แก้ Issue #2 (mobile-checkin selector) - ง่ายกว่า ทำก่อน
2. ✅ แก้ Issue #1 (admin dashboard filters visibility)
3. ✅ รันทดสอบซ้ำเพื่อยืนยัน
4. ✅ อัพเดทรายงานนี้เมื่อแก้ไขเสร็จ

---

**อัปเดตล่าสุด:** 01-02-2026, 15:50 น.
**เวอร์ชัน:** V.1.7.0 (01-02-2026) - Migration จาก Cypress เป็น Playwright
