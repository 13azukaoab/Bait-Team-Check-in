const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
    console.log('เริ่มสร้างไฟล์ PDF รายงานสรุปโครงการ...');
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Get absolute path of the HTML file
    const htmlPath = `file://${path.resolve(__dirname, '..', 'report-template.html')}`;

    console.log(`กำลังโหลดหน้า: ${htmlPath}`);
    await page.goto(htmlPath, { waitUntil: 'networkidle' });

    const outputPath = path.resolve(__dirname, '..', 'Executive_Summary_Workload_Analysis.pdf');
    
    console.log('กำลังบันทึกเป็น PDF...');
    await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: {
            top: '20px',
            right: '20px',
            bottom: '20px',
            left: '20px'
        }
    });

    await browser.close();
    console.log(`\n✅ สร้างไฟล์ PDF สำเร็จ!\nไฟล์ถูกบันทึกที่: ${outputPath}`);
}

generatePDF().catch(err => {
    console.error('❌ เกิดข้อผิดพลาด:', err);
    process.exit(1);
});
