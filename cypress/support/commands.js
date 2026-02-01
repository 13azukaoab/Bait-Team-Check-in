// Cypress support file - runs before each test
// ที่ใส่ custom commands ที่ใช้บ่อยๆ

// ตัวอย่างของ custom command
Cypress.Commands.add('selectTeam', (teamName) => {
  // คลิก modal ทีม
  cy.get('[data-test="team-selector"]').click();
  // เลือกทีมที่ต้องการ
  cy.get(`[data-team="${teamName}"]`).click();
});

Cypress.Commands.add('fillCheckIn', (customerName, contractNumber, branch) => {
  // กรอกชื่อลูกค้า
  cy.get('[data-test="customer-name"]').type(customerName);
  // กรอกเลขที่สัญญา
  cy.get('[data-test="contract-number"]').type(contractNumber);
  // เลือกสาขา
  cy.get('[data-test="branch-select"]').select(branch);
});

Cypress.Commands.add('takePhoto', (filename = 'photo.jpg') => {
  // อัปโหลดรูปภาพ
  cy.get('[data-test="photo-input"]').selectFile(`cypress/fixtures/${filename}`);
});

Cypress.Commands.add('submitCheckIn', () => {
  // คลิก submit
  cy.get('[data-test="checkin-btn"]').click();
  // รอให้ success message แสดง
  cy.get('[data-test="success-msg"]', { timeout: 5000 }).should('be.visible');
});

// ป้องกัน error ที่ไม่สำคัญ
Cypress.on('uncaught:exception', (err, runnable) => {
  // กรณี Firebase connection error ให้ข้ามไป
  if (err.message.includes('Firebase')) {
    return false;
  }
  return true;
});
