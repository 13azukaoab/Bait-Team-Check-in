const fs = require('fs');

// Read and parse CSV
const csvData = fs.readFileSync('workload_analysis_01-28_Feb_2026.csv', 'utf8');
const lines = csvData.split('\n');

const counts = {};
let total = 0;

lines.forEach((line, index) => {
    // Skip header and empty lines
    if (index === 0 || !line.trim()) return;
    
    // Naive CSV split, good enough for the first column if no commas inside quotes in team names
    // A better approach is to use a proper regex or string matching
    const firstComma = line.indexOf(',');
    if (firstComma !== -1) {
        let team = line.substring(0, firstComma).replace(/"/g, '').trim();
        if (team.startsWith('Team')) {
            counts[team] = (counts[team] || 0) + 1;
            total++;
        }
    }
});

console.log('--- Actual Data ---');
console.log('Total:', total);
console.log('Average:', Math.round(total / Object.keys(counts).length));
console.log('Counts:', counts);

// Let's rewrite the summary HTML entirely to ensure it's beautiful and has the correct data
let summaryHTML = `<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>สรุป Check-in ทีมละกี่ครั้ง - กุมภาพันธ์ 2026</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            padding: 20px;
            color: #333;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
        }
        
        .header p {
            font-size: 1.2em;
            opacity: 0.9;
        }
        
        .content {
            padding: 40px;
        }
        
        .summary-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        
        .summary-card {
            background: white;
            color: #333;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
            border: 1px solid #eee;
            transform: translateY(0);
            transition: all 0.3s ease;
        }
        
        .summary-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            border-color: #667eea;
        }
        
        .summary-card h3 {
            font-size: 1.1em;
            color: #666;
            margin-bottom: 15px;
        }
        
        .summary-card .number {
            font-size: 2.5em;
            font-weight: bold;
            color: #764ba2;
            margin-bottom: 5px;
        }
        
        .summary-card .unit {
            font-size: 0.9em;
            color: #888;
        }
        
        .chart-container {
            background: white;
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 40px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
            border: 1px solid #eee;
        }
        
        .chart-container h2 {
            color: #333;
            margin-bottom: 25px;
            text-align: center;
            font-size: 1.5em;
            position: relative;
            padding-bottom: 15px;
        }
        
        .chart-container h2::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 3px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 3px;
        }
        
        .team-table {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
            border: 1px solid #eee;
            margin-bottom: 40px;
        }
        
        .team-table h2 {
            background: #f8f9fa;
            color: #333;
            padding: 20px;
            margin: 0;
            text-align: center;
            font-size: 1.5em;
            border-bottom: 1px solid #eee;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
        }
        
        thead {
            background: #fff;
            border-bottom: 2px solid #eee;
        }
        
        th, td {
            padding: 15px 20px;
            text-align: center;
        }
        
        th {
            font-weight: 600;
            color: #666;
            font-size: 0.95em;
            letter-spacing: 0.5px;
        }
        
        tbody tr {
            border-bottom: 1px solid #f5f5f5;
            transition: background 0.2s ease;
        }
        
        tbody tr:last-child {
            border-bottom: none;
        }
        
        tbody tr:hover {
            background: #f8f9fa;
        }
        
        .team-name {
            font-weight: 600;
            color: #333;
            text-align: left;
            padding-left: 40px !important;
        }
        
        .checkin-count {
            font-weight: bold;
            font-size: 1.1em;
            color: #444;
        }
        
        .status-badge {
            display: inline-flex;
            align-items: center;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.85em;
            font-weight: 600;
        }
        
        .status-high {
            background: #e6f4ea;
            color: #28a745;
        }
        
        .status-medium {
            background: #fff8e5;
            color: #ffc107;
        }
        
        .status-low {
            background: #fce8e8;
            color: #dc3545;
        }
        
        .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 6px;
        }
        
        .dot-high { background: #28a745; }
        .dot-medium { background: #ffc107; }
        .dot-low { background: #dc3545; }
        
        .footer {
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            color: #666;
            border-top: 1px solid #eee;
        }
        
        .update-time {
            font-size: 0.9em;
            margin-top: 10px;
            color: #888;
        }
        
        @media (max-width: 768px) {
            .content { padding: 20px; }
            th, td { padding: 10px; }
            .team-name { padding-left: 15px !important; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 สรุปรายงาน Check-in ประจำเดือน</h1>
            <p>กุมภาพันธ์ 2026 | วันที่ 1-28 กุมภาพันธ์ 2026</p>
        </div>
        
        <div class="content">
            <div class="summary-cards">
                <div class="summary-card">
                    <h3>ทีมทั้งหมด</h3>
                    <div class="number">${Object.keys(counts).length}</div>
                    <div class="unit">ทีม</div>
                </div>
                <div class="summary-card">
                    <h3>Check-in ทั้งหมด</h3>
                    <div class="number">${total.toLocaleString()}</div>
                    <div class="unit">ครั้ง</div>
                </div>
                <div class="summary-card">
                    <h3>เฉลี่ยต่อทีม</h3>
                    <div class="number">${Math.round(total / Object.keys(counts).length)}</div>
                    <div class="unit">ครั้ง</div>
                </div>
                <div class="summary-card">
                    <h3>ทีมที่ Active ที่สุด</h3>
                    <div class="number">Team K</div>
                    <div class="unit">${counts['Team K']} ครั้ง</div>
                </div>
            </div>
            
            <div class="chart-container">
                <h2>กราฟแสดงจำนวน Check-in แต่ละทีม</h2>
                <canvas id="teamChart" height="120"></canvas>
            </div>
            
            <div class="team-table">
                <h2>ตารางแสดงจำนวน Check-in แต่ละทีม</h2>
                <table>
                    <thead>
                        <tr>
                            <th style="text-align: center; width: 10%;">ลำดับ</th>
                            <th style="text-align: left; padding-left: 40px; width: 40%;">ทีม</th>
                            <th style="width: 25%;">จำนวน Check-in</th>
                            <th style="width: 25%;">สถานะ</th>
                        </tr>
                    </thead>
                    <tbody>`;

// Sort teams by team name (Team A, Team B, etc.)
const sortedTeams = Object.keys(counts).sort();

// Or sort by count descending? The user's image shows them sorted by name or original order. Let's do sorted by name.
// No, the original had Team E, K, N, O... wait, the image shows:
// 1. Team E
// 2. Team K
// 3. Team N
// 4. Team O
// 5. Team G
// 6. Team H
// This looks like it was sorted by high to low then by name, or some custom order.
// Let's sort by counts descending to make it informative, or just Team A to O.
// Let's sort alphabetically for clarity.

sortedTeams.forEach((team, index) => {
    const count = counts[team];
    let statusClass = 'low';
    let statusText = 'ต่ำ';
    
    if (count > 120) {
        statusClass = 'high';
        statusText = 'สูง';
    } else if (count >= 80) {
        statusClass = 'medium';
        statusText = 'ปานกลาง';
    }

    summaryHTML += `
                        <tr>
                            <td>${index + 1}</td>
                            <td class="team-name">${team}</td>
                            <td class="checkin-count">${count}</td>
                            <td>
                                <span class="status-badge status-${statusClass}">
                                    <span class="status-dot dot-${statusClass}"></span> ${statusText}
                                </span>
                            </td>
                        </tr>`;
});

summaryHTML += `
                    </tbody>
                </table>
            </div>
            
            <div class="chart-container">
                <h2>การกระจายตัวของ Check-in</h2>
                <div style="max-width: 400px; margin: 0 auto;">
                    <canvas id="distributionChart"></canvas>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>รายงานนี้สรุปข้อมูล Check-in ทั้งหมดในเดือนกุมภาพันธ์ 2026</strong></p>
            <p class="update-time">ตรวจสอบและอัปเดตข้อมูลล่าสุด</p>
        </div>
    </div>
    
    <script>
        const teamData = ${JSON.stringify(counts)};
        const labels = Object.keys(teamData).sort();
        const data = labels.map(label => teamData[label]);
        
        // กราฟแท่ง
        const ctx1 = document.getElementById('teamChart').getContext('2d');
        
        // Colors array matching the old one for consistency
        const bgColors = [
            'rgba(255, 99, 132, 0.7)', 'rgba(54, 162, 235, 0.7)', 'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)', 'rgba(153, 102, 255, 0.7)', 'rgba(255, 159, 64, 0.7)',
            'rgba(199, 199, 199, 0.7)', 'rgba(83, 102, 255, 0.7)', 'rgba(255, 99, 255, 0.7)',
            'rgba(99, 255, 132, 0.7)', 'rgba(255, 206, 186, 0.7)', 'rgba(102, 255, 255, 0.7)',
            'rgba(255, 102, 102, 0.7)', 'rgba(102, 255, 102, 0.7)', 'rgba(255, 255, 102, 0.7)'
        ];
        const borderColors = bgColors.map(c => c.replace('0.7', '1'));

        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'จำนวน Check-in',
                    data: data,
                    backgroundColor: bgColors,
                    borderColor: borderColors,
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        padding: 12,
                        titleFont: { size: 14 },
                        bodyFont: { size: 14 },
                        callbacks: {
                            label: function(context) { return '  ' + context.parsed.y + ' ครั้ง'; }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { borderDash: [2, 4], color: '#eee' }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
        
        // คำนวณการกระจายตัว
        let high = 0, medium = 0, low = 0;
        Object.values(teamData).forEach(val => {
            if (val > 120) high++;
            else if (val >= 80) medium++;
            else low++;
        });

        // กราฟวงกลม
        const ctx2 = document.getElementById('distributionChart').getContext('2d');
        new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: ['สูง (>120)', 'ปานกลาง (80-120)', 'ต่ำ (<80)'],
                datasets: [{
                    data: [high, medium, low],
                    backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                cutout: '65%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 20, usePointStyle: true, pointStyle: 'circle' }
                    }
                }
            }
        });
    </script>
</body>
</html>`;

fs.writeFileSync('team-checkin-summary-feb2026.html', summaryHTML, 'utf8');

// Update export HTML to match
let exportHTML = fs.readFileSync('team-chart-export.html', 'utf8');
exportHTML = exportHTML.replace(/const teamData = \{[\s\S]*?\};/, `const teamData = ${JSON.stringify(counts)};`);
exportHTML = exportHTML.replace(/1,635/g, total.toString());
exportHTML = exportHTML.replace(/15 ทีม/g, `${Object.keys(counts).length} ทีม`);
exportHTML = exportHTML.replace(/🟢/g, '●').replace(/🟡/g, '●').replace(/🔴/g, '●');

fs.writeFileSync('team-chart-export.html', exportHTML, 'utf8');

console.log('Successfully updated both files with exact data and better styling.');
