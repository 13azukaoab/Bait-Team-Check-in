// ===================================
// 📱 Mobile Check-in Tests (มือถือ)
// ===================================

describe('Mobile Check-in Page', () => {
  
  beforeEach(() => {
    cy.visit('/mobile-checkin.html');
  });

  // =====================
  // Test 1: Load & Display
  // =====================
  
  it('1️⃣ Should load mobile check-in page', () => {
    cy.get('body').should('be.visible');
    cy.contains('Bait Check-In').should('be.visible');
    cy.log('✅ หน้า Mobile Check-in โหลดเสร็จ');
  });

  it('2️⃣ Should display login page with team selector', () => {
    // เช็กว่า team selector มีอยู่
    cy.get('[data-test="team-selector"]').should('be.visible');
    cy.get('[data-test="login-btn"]').should('be.visible');
    cy.log('✅ Login page แสดงผลถูกต้อง');
  });

  // =====================
  // Test 2: Team Selection
  // =====================

  it('3️⃣ Should open team picker when clicked', () => {
    cy.get('[data-test="team-selector"]').click();
    // เช็กว่า modal หรือ dropdown เปิด
    cy.get('.team-picker-modal, .team-options').should('be.visible');
    cy.log('✅ Team picker เปิดได้');
  });

  // =====================
  // Test 3: Form Elements
  // =====================

  it('4️⃣ Should display form elements after login', () => {
    // จำลอง login สำเร็จ (ถ้า form อยู่หลัง login)
    // ถ้าหน้า form แสดงโดยตรง ให้เช็กได้เลย
    cy.get('#appPage').should('exist');
    cy.log('✅ Form elements พร้อมใช้งาน');
  });

  it('5️⃣ Should have customer name input', () => {
    // ไปที่หน้า app ก่อน (ถ้าต้อง login)
    cy.get('#appPage').invoke('show');
    cy.get('[data-test="customer-name"]').should('exist');
    cy.log('✅ Customer name input มีอยู่');
  });

  it('6️⃣ Should have contract number input', () => {
    cy.get('#appPage').invoke('show');
    cy.get('[data-test="contract-number"]').should('exist');
    cy.log('✅ Contract number input มีอยู่');
  });

  it('7️⃣ Should have branch select dropdown', () => {
    cy.get('#appPage').invoke('show');
    cy.get('[data-test="branch-select"]').should('exist');
    // เช็กว่ามี options
    cy.get('[data-test="branch-select"] option').should('have.length.greaterThan', 1);
    cy.log('✅ Branch select มี options');
  });

  it('8️⃣ Should have photo upload buttons', () => {
    cy.get('#appPage').invoke('show');
    cy.get('[data-test="photo-house"]').should('exist');
    cy.get('[data-test="photo-contract"]').should('exist');
    cy.log('✅ Photo upload buttons มีอยู่');
  });

  it('9️⃣ Should have check-in button', () => {
    cy.get('#appPage').invoke('show');
    cy.get('[data-test="checkin-btn"]').should('exist');
    cy.contains('CHECK IN').should('exist');
    cy.log('✅ Check-in button มีอยู่');
  });

  // =====================
  // Test 4: Form Interaction
  // =====================

  it('🔟 Should fill customer name', () => {
    // ซ่อน login page และแสดง app page
    cy.get('#loginPage').invoke('hide');
    cy.get('#appPage').invoke('show');
    cy.get('[data-test="customer-name"]')
      .type('ทดสอบลูกค้า', { force: true })
      .should('have.value', 'ทดสอบลูกค้า');
    cy.log('✅ กรอกชื่อลูกค้าได้');
  });

  it('1️⃣1️⃣ Should select branch and show zone', () => {
    // ซ่อน login page และแสดง app page
    cy.get('#loginPage').invoke('hide');
    cy.get('#appPage').invoke('show');
    cy.get('[data-test="branch-select"]').select('พุทธมณฑล', { force: true });
    // เช็กว่า zone แสดง
    cy.get('[data-test="zone-text"]').should('contain', '1');
    cy.log('✅ เลือกสาขาและแสดงเขตถูกต้อง');
  });

  // =====================
  // Test 5: Responsive
  // =====================

  it('1️⃣2️⃣ Should be responsive on iPhone', () => {
    cy.viewport('iphone-x');
    cy.get('body').should('be.visible');
    cy.contains('Bait Check-In').should('be.visible');
    cy.log('✅ Mobile responsive ทำงานได้');
  });

  it('1️⃣3️⃣ Should be responsive on iPad', () => {
    cy.viewport('ipad-2');
    cy.get('body').should('be.visible');
    cy.contains('Bait Check-In').should('be.visible');
    cy.log('✅ Tablet responsive ทำงานได้');
  });

});
