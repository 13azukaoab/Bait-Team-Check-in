/// <reference types="cypress" />

// ===================================
// 📱 Mobile Check-in Tests (มือถือ)
// ===================================

describe('Mobile Check-in Page - End to End Tests', () => {
  
  beforeEach(() => {
    // ไปที่หน้า Mobile Check-in ก่อนแต่ละ test
    cy.visit('/mobile-checkin.html');
  });

  // =====================
  // Test 1: Load & Display
  // =====================
  
  it('1️⃣ Should load mobile check-in page', () => {
    // เช็กว่าหน้า load เสร็จ
    cy.get('body').should('be.visible');
    cy.get('h1').should('contain', 'Check-in');
    
    // ✅ Assertion: หน้าโหลดสำเร็จ
    cy.log('✅ หน้า Mobile Check-in โหลดเสร็จ');
  });

  it('2️⃣ Should display team selector modal', () => {
    // เช็กว่า modal ทีมมีอยู่
    cy.get('[data-test="team-selector"]').should('be.visible');
    
    // เช็กว่ามีทีม A-O อยู่
    cy.get('[data-team="A"]').should('exist');
    cy.get('[data-team="Z"]').should('exist');
    
    // ✅ Assertion: ระบบเลือกทีมแสดงผลถูก
    cy.log('✅ Modal เลือกทีมแสดงผลถูกต้อง');
  });

  // =====================
  // Test 2: GPS Location
  // =====================

  it('3️⃣ Should get GPS location', () => {
    // คลิก button get location
    cy.get('[data-test="location-btn"]').click();
    
    // รอให้ GPS coordinates แสดง (timeout 3 วินาที)
    cy.get('[data-test="gps-coords"]', { timeout: 3000 })
      .should('contain', '13') // ประเทศไทยมี latitude ประมาณ 13-14
      .should('contain', '100'); // longitude ประมาณ 100-101
    
    // ✅ Assertion: GPS ทำงานถูก
    cy.log('✅ GPS Location ได้รับมา');
  });

  // =====================
  // Test 3: Photo Upload
  // =====================

  it('4️⃣ Should upload photo', () => {
    // เลือกรูปภาพจาก fixtures
    // หมายเหตุ: ต้องมีไฟล์ cypress/fixtures/test-photo.jpg
    cy.get('[data-test="photo-input"]')
      .selectFile('cypress/fixtures/test-photo.jpg');
    
    // เช็กว่ารูปอัปโหลดแล้ว
    cy.get('[data-test="photo-preview"]').should('be.visible');
    
    // ✅ Assertion: รูปอัปโหลดสำเร็จ
    cy.log('✅ รูปภาพอัปโหลดสำเร็จ');
  });

  // =====================
  // Test 4: Form Filling
  // =====================

  it('5️⃣ Should fill check-in form correctly', () => {
    // เลือกทีม
    cy.get('[data-team="A"]').click();
    
    // กรอกชื่อลูกค้า
    cy.get('[data-test="customer-name"]')
      .type('John Doe')
      .should('have.value', 'John Doe');
    
    // กรอกเลขที่สัญญา
    cy.get('[data-test="contract-number"]')
      .type('CN-2026-001')
      .should('have.value', 'CN-2026-001');
    
    // เลือกสาขา
    cy.get('[data-test="branch-select"]').select('พุทธมณฑล');
    
    // เช็กว่าเขต automatic เป็น "เขต 1"
    cy.get('[data-test="zone-display"]').should('contain', 'เขต 1');
    
    // ✅ Assertion: ฟอร์มกรอกถูก
    cy.log('✅ แบบฟอร์ม Check-in กรอกถูกต้อง');
  });

  // =====================
  // Test 5: Form Validation
  // =====================

  it('6️⃣ Should validate required fields', () => {
    // พยายาม submit ก่อนกรอกข้อมูล
    cy.get('[data-test="checkin-btn"]').click();
    
    // ต้องเห็น error message
    cy.get('[data-test="error-msg"]')
      .should('be.visible')
      .should('contain', 'กรุณากรอก');
    
    // ✅ Assertion: Validation ทำงาน
    cy.log('✅ Validation ตรวจสอบฟิลด์บังคับได้ถูก');
  });

  // =====================
  // Test 6: Complete Flow
  // =====================

  it('7️⃣ Should complete check-in flow successfully', () => {
    // 1. เลือกทีม
    cy.selectTeam('A');
    
    // 2. กรอกข้อมูล
    cy.fillCheckIn('John Doe', 'CN-2026-001', 'พุทธมณฑล');
    
    // 3. อัปโหลดรูป
    cy.takePhoto('test-photo.jpg');
    
    // 4. Submit
    cy.submitCheckIn();
    
    // 5. เช็กว่า redirect ไปหน้า history
    cy.url().should('include', 'history');
    
    // ✅ Assertion: Check-in เสร็จสิ้น
    cy.log('✅ การ Check-in เสร็จสิ้นสำเร็จ');
  });

  // =====================
  // Test 7: Responsive
  // =====================

  it('8️⃣ Should be responsive on mobile', () => {
    // Set viewport เป็น mobile (iPhone size)
    cy.viewport('iphone-x');
    
    // เช็กว่ายังทำงานได้
    cy.get('[data-test="team-selector"]').should('be.visible');
    cy.get('[data-test="location-btn"]').should('be.visible');
    
    // ✅ Assertion: Mobile responsive
    cy.log('✅ หน้า Mobile ทำงานบน iPhone');
  });

  // =====================
  // Test 8: Error Handling
  // =====================

  it('9️⃣ Should handle offline scenario', () => {
    // Simulate offline mode
    cy.intercept('POST', '**/checkins', {
      statusCode: 503,
      body: { error: 'Service Unavailable' }
    });
    
    // ลองทำการ check-in
    cy.selectTeam('A');
    cy.fillCheckIn('John Doe', 'CN-2026-001', 'พุทธมณฑล');
    cy.get('[data-test="checkin-btn"]').click();
    
    // ต้องเห็น offline notification
    cy.get('[data-test="offline-msg"]').should('be.visible');
    
    // ✅ Assertion: Offline handling
    cy.log('✅ จัดการสถานการณ์ offline ได้ถูก');
  });

});
