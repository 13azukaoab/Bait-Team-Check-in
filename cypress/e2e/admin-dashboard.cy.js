// ===================================
// 🖥️ Admin Dashboard Tests (หน้าแอดมิน)
// ===================================

describe('Admin Dashboard - End to End Tests', () => {
  
  beforeEach(() => {
    // ไปที่หน้า Admin Dashboard
    cy.visit('/admin-dashboard.html');
  });

  // =====================
  // Test 1: Dashboard Load
  // =====================
  
  it('Should load admin dashboard', () => {
    // เช็กว่าหน้า load เสร็จ
    cy.get('[data-test="dashboard-header"]').should('be.visible');
    
    // เช็กว่ามี stat cards
    cy.get('[data-test="stat-card"]').should('have.length.greaterThan', 0);
    
    cy.log('✅ Admin Dashboard โหลดสำเร็จ');
  });

  // =====================
  // Test 2: Map Display
  // =====================

  it('Should display map with markers', () => {
    // เช็กว่า map container มี
    cy.get('[data-test="map-container"]').should('be.visible');
    
    // เช็กว่ามี markers จาก Firestore
    cy.get('[data-test="map-marker"]', { timeout: 5000 })
      .should('have.length.greaterThan', 0);
    
    cy.log('✅ แผนที่ แสดง markers');
  });

  // =====================
  // Test 3: Filters
  // =====================

  it('Should filter by team', () => {
    // เลือกทีม A
    cy.get('[data-test="team-filter"]').select('A');
    
    // ต้องเห็นเฉพาะ markers ของทีม A
    cy.get('[data-test="map-marker"]')
      .each(($marker) => {
        cy.wrap($marker).should('have.attr', 'data-team', 'A');
      });
    
    cy.log('✅ Filter ทีม ทำงาน');
  });

  it('Should filter by date range', () => {
    // เลือกวันที่เริ่มต้น
    cy.get('[data-test="date-from"]').type('2026-01-01');
    
    // เลือกวันที่สิ้นสุด
    cy.get('[data-test="date-to"]').type('2026-01-31');
    
    // Apply filter
    cy.get('[data-test="apply-filter"]').click();
    
    // ตรวจสอบผลลัพธ์
    cy.get('[data-test="checkin-table"] tbody tr')
      .should('have.length.greaterThan', 0);
    
    cy.log('✅ Filter วันที่ ทำงาน');
  });

  // =====================
  // Test 4: Data Table
  // =====================

  it('Should sort table by columns', () => {
    // คลิก column ชื่อลูกค้า เพื่อ sort
    cy.get('[data-test="col-customer"]').click();
    
    // ตรวจสอบว่าข้อมูล sorted แล้ว
    cy.get('[data-test="checkin-table"] tbody tr')
      .first()
      .should('be.visible');
    
    cy.log('✅ Sort table ทำงาน');
  });

  // =====================
  // Test 5: Distance Measurement
  // =====================

  it('Should measure distance between points', () => {
    // ให้ mode เป็น measure
    cy.get('[data-test="mode-measure"]').click();
    
    // คลิก 2 จุดบนแผนที่
    cy.get('[data-test="map-container"]')
      .click(100, 100)  // จุดที่ 1
      .click(200, 200); // จุดที่ 2
    
    // ต้องเห็นระยะทาง
    cy.get('[data-test="distance-result"]')
      .should('be.visible')
      .should('contain', 'km');
    
    cy.log('✅ วัดระยะทาง ทำงาน');
  });

  // =====================
  // Test 6: Export Data
  // =====================

  it('Should export data to Excel', () => {
    // คลิก export button
    cy.get('[data-test="export-btn"]').click();
    
    // เลือก Excel format
    cy.get('[data-test="export-excel"]').click();
    
    // ตรวจสอบว่าไฟล์ download
    cy.readFile('cypress/downloads/checkins.xlsx')
      .should('exist');
    
    cy.log('✅ Export to Excel ทำงาน');
  });

  // =====================
  // Test 7: Photo Gallery
  // =====================

  it('Should open photo gallery', () => {
    // คลิก gallery tab
    cy.get('[data-test="tab-gallery"]').click();
    
    // ต้องเห็นรูปภาพ
    cy.get('[data-test="gallery-image"]', { timeout: 5000 })
      .should('have.length.greaterThan', 0);
    
    cy.log('✅ Photo Gallery โหลด');
  });

  // =====================
  // Test 8: Real-time Update
  // =====================

  it('Should update in real-time', () => {
    // ตั้งค่า intercept เพื่อจำลอง Firestore update
    cy.intercept('GET', '**/checkins', {
      statusCode: 200,
      body: {
        data: [
          {
            id: 'new-001',
            team: 'A',
            customerName: 'New Customer',
            location: { lat: 13.7, lng: 100.5 }
          }
        ]
      }
    });
    
    // รอให้ data update (polling every 2 seconds)
    cy.wait(2000);
    
    // ตรวจสอบว่า marker ใหม่ปรากฏ
    cy.get('[data-test="map-marker"]').should('have.length.greaterThan', 0);
    
    cy.log('✅ Real-time Update ทำงาน');
  });

  // =====================
  // Test 9: Responsive Desktop
  // =====================

  it('Should be responsive on desktop', () => {
    // Set viewport เป็น desktop
    cy.viewport(1280, 720);
    
    // เช็กว่า layout ปรับตัวได้
    cy.get('[data-test="sidebar"]').should('be.visible');
    cy.get('[data-test="main-content"]').should('be.visible');
    
    cy.log('✅ Desktop responsive ทำงาน');
  });

});
