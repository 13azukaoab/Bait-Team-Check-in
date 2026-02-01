// ===================================
// 🖥️ Admin Dashboard Tests (หน้าแอดมิน)
// ===================================

describe('Admin Dashboard Page', () => {
  
  beforeEach(() => {
    cy.visit('/admin-dashboard.html');
  });

  // =====================
  // Test 1: Load & Display
  // =====================
  
  it('1️⃣ Should load admin dashboard page', () => {
    cy.get('body').should('be.visible');
    cy.get('.sidebar').should('exist');
    cy.log('✅ Admin Dashboard โหลดเสร็จ');
  });

  it('2️⃣ Should display stat cards', () => {
    cy.get('[data-test="stat-cards"]').should('be.visible');
    cy.get('[data-test="stat-checkins"]').should('be.visible');
    cy.log('✅ Stat cards แสดงผลถูกต้อง');
  });

  it('3️⃣ Should display map container', () => {
    cy.get('[data-test="map-container"]').should('exist');
    cy.log('✅ Map container มีอยู่');
  });

  // =====================
  // Test 2: Filters
  // =====================

  it('4️⃣ Should have team filter', () => {
    cy.get('[data-test="filter-team"]').should('exist');
    cy.get('[data-test="filter-team"] option').should('have.length.greaterThan', 1);
    cy.log('✅ Team filter มี options');
  });

  it('5️⃣ Should have zone filter', () => {
    cy.get('[data-test="filter-zone"]').should('exist');
    cy.get('[data-test="filter-zone"] option').should('have.length.greaterThan', 1);
    cy.log('✅ Zone filter มี options');
  });

  it('6️⃣ Should have branch filter', () => {
    cy.get('[data-test="filter-branch"]').should('exist');
    cy.get('[data-test="filter-branch"] option').should('have.length.greaterThan', 1);
    cy.log('✅ Branch filter มี options');
  });

  it('7️⃣ Should have date filter', () => {
    cy.get('[data-test="filter-date"]').should('exist');
    cy.log('✅ Date filter มีอยู่');
  });

  it('8️⃣ Should have apply filter button', () => {
    cy.get('[data-test="apply-filter-btn"]').should('exist');
    cy.log('✅ Apply filter button มีอยู่');
  });

  // =====================
  // Test 3: Filter Interactions
  // =====================

  it('9️⃣ Should select team filter', () => {
    // Filter panel ถูกซ่อนเป็นค่าเริ่มต้น ใช้ force:true
    cy.get('[data-test="filter-team"]').select('A', { force: true });
    cy.get('[data-test="filter-team"]').should('have.value', 'A');
    cy.log('✅ เลือก team filter ได้');
  });

  it('🔟 Should select zone filter', () => {
    // Filter panel ถูกซ่อนเป็นค่าเริ่มต้น ใช้ force:true
    cy.get('[data-test="filter-zone"]').select('เขต 1', { force: true });
    cy.get('[data-test="filter-zone"]').should('have.value', 'เขต 1');
    cy.log('✅ เลือก zone filter ได้');
  });

  it('1️⃣1️⃣ Should change date filter', () => {
    // Filter panel ถูกซ่อนเป็นค่าเริ่มต้น ใช้ force:true
    cy.get('[data-test="filter-date"]').clear({ force: true }).type('2026-02-01', { force: true });
    cy.get('[data-test="filter-date"]').should('have.value', '2026-02-01');
    cy.log('✅ เปลี่ยน date filter ได้');
  });

  it('1️⃣2️⃣ Should click apply filter button', () => {
    // Filter panel ถูกซ่อนเป็นค่าเริ่มต้น ใช้ force:true
    cy.get('[data-test="apply-filter-btn"]').click({ force: true });
    cy.log('✅ Click apply filter ได้');
  });

  // =====================
  // Test 4: Global Search
  // =====================

  it('1️⃣3️⃣ Should have global search input', () => {
    cy.get('[data-test="global-search"]').should('exist');
    cy.log('✅ Global search มีอยู่');
  });

  it('1️⃣4️⃣ Should type in global search', () => {
    cy.get('[data-test="global-search"]').type('ทดสอบ');
    cy.get('[data-test="global-search"]').should('have.value', 'ทดสอบ');
    cy.log('✅ พิมพ์ใน global search ได้');
  });

  // =====================
  // Test 5: Responsive
  // =====================

  it('1️⃣5️⃣ Should work on desktop viewport', () => {
    cy.viewport(1920, 1080);
    cy.get('body').should('be.visible');
    cy.get('.sidebar').should('be.visible');
    cy.log('✅ Desktop viewport ทำงานได้');
  });

  it('1️⃣6️⃣ Should work on laptop viewport', () => {
    cy.viewport(1366, 768);
    cy.get('body').should('be.visible');
    cy.log('✅ Laptop viewport ทำงานได้');
  });

});
