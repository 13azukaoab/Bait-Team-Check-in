/**
 * Script สร้าง Workload Analysis CSV
 * - ดึงข้อมูล check-in ช่วง 01-28 ก.พ. 2026 จาก Firestore
 * - คำนวณเวลาทำงานที่หน้างาน (เฉพาะวันเดียวกันเท่านั้น)
 * - ดึงระยะทาง + เวลาเดินทาง จาก Google Maps Distance Matrix API
 * Usage: node scripts/generate-workload-csv.mjs
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Firebase Config ───────────────────────────────────────────────
const firebaseConfig = {
    apiKey: "AIzaSyCFn-MEkbuQEvmdp6fdeJxsSysovhM44_g",
    authDomain: "bait-check-in-webapp.firebaseapp.com",
    projectId: "bait-check-in-webapp",
    storageBucket: "bait-check-in-webapp.firebasestorage.app",
    messagingSenderId: "850336159440",
    appId: "1:850336159440:web:c104204bd3f2d18b5b70d5"
};

// ─── Google Maps API Key ────────────────────────────────────────────
const GOOGLE_MAPS_API_KEY = "AIzaSyDd3YrTkB611JYpxfnzJGzhexw1n24hy5A";

// ─── Init Firebase ─────────────────────────────────────────────────
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ─── Helpers ───────────────────────────────────────────────────────
function thaiDayName(date) {
    const days = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
    return days[date.getDay()];
}

function formatThaiDateTime(date) {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    return `${d}-${m}-${y} ${hh}:${mm} น.`;
}

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function getDistance(lat1, lng1, lat2, lng2) {
    return new Promise((resolve) => {
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat1},${lng1}&destinations=${lat2},${lng2}&mode=driving&language=th&key=${GOOGLE_MAPS_API_KEY}`;
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json.status === 'OK' && json.rows[0].elements[0].status === 'OK') {
                        resolve({
                            distance: (json.rows[0].elements[0].distance.value / 1000).toFixed(2),
                            duration: Math.round(json.rows[0].elements[0].duration.value / 60)
                        });
                    } else {
                        resolve({ distance: null, duration: null, error: json.status });
                    }
                } catch (e) {
                    resolve({ distance: null, duration: null, error: e.message });
                }
            });
        }).on('error', (e) => {
            resolve({ distance: null, duration: null, error: e.message });
        });
    });
}

// ─── Main ──────────────────────────────────────────────────────────
async function main() {
    console.log('🚀 เริ่มสร้าง Workload Analysis CSV...\n');

    const startDate = new Date('2026-02-01T00:00:00+07:00');
    const endDate   = new Date('2026-02-28T23:59:59+07:00');

    console.log(`📅 ช่วงข้อมูล: ${startDate.toLocaleDateString('th-TH')} - ${endDate.toLocaleDateString('th-TH')}`);
    console.log('🔍 กำลังดึงข้อมูลจาก Firestore...\n');

    const q = query(
        collection(db, 'checkins'),
        where('checkinTime', '>=', Timestamp.fromDate(startDate)),
        where('checkinTime', '<=', Timestamp.fromDate(endDate)),
        orderBy('checkinTime', 'asc')
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        console.log('⚠️  ไม่พบข้อมูล Check-in ในช่วงที่กำหนด');
        process.exit(0);
    }

    console.log(`✅ พบข้อมูล: ${snapshot.size} รายการ\n`);

    // จัดกลุ่มตามทีม
    const teamData = {};
    snapshot.forEach(doc => {
        const d = doc.data();
        const ts = d.checkinTime?.toDate ? d.checkinTime.toDate() : new Date(d.checkinTime);
        const team = d.team || '-';
        if (!teamData[team]) teamData[team] = [];
        teamData[team].push({
            team,
            branch: d.branch || '-',
            customerName: d.customerName || '-',
            contractNumber: d.contractNumber || '-',
            lat: d.location?.lat || null,
            lng: d.location?.lng || null,
            checkinTime: ts
        });
    });

    const teams = Object.keys(teamData).sort();
    console.log(`📋 ทีมที่พบ: ${teams.join(', ')}\n`);

    // สร้าง CSV rows
    const csvRows = [
        'ทีม,ลำดับ,สาขา,ชื่อลูกค้า,เลขที่สัญญา,วัน,เวลา Check-in,พิกัด(X),พิกัด(Y),พิกัด(XY),เวลาทำงานที่หน้างาน(นาที),ระยะทางไปจุดถัดไป(กม.),เวลาเดินทางไปจุดถัดไป(นาที),เวลารวม(นาที)'
    ];

    let totalProcessed = 0;
    const totalPoints = snapshot.size;
    let apiCalls = 0;
    let apiSuccess = 0;

    for (const team of teams) {
        const checkins = teamData[team];
        console.log(`\n🏷️  Team ${team}: ${checkins.length} check-ins`);

        for (let i = 0; i < checkins.length; i++) {
            const cur = checkins[i];
            const next = checkins[i + 1] || null;

            totalProcessed++;
            const pct = Math.round((totalProcessed / totalPoints) * 100);
            process.stdout.write(`\r  ⏳ ${pct}% (${totalProcessed}/${totalPoints}) - ลำดับ ${i + 1}/${checkins.length}   `);

            const seq = i + 1;
            const dayName = thaiDayName(cur.checkinTime);
            const timeStr = formatThaiDateTime(cur.checkinTime);
            const latStr  = cur.lat !== null ? Number(cur.lat).toFixed(6) : '-';
            const lngStr  = cur.lng !== null ? Number(cur.lng).toFixed(6) : '-';
            const coordStr = (cur.lat !== null && cur.lng !== null)
                ? `${Number(cur.lat).toFixed(6)} ${Number(cur.lng).toFixed(6)}`
                : '-';

            let workDuration = '-';
            let distKm       = '-';
            let travelMins   = '-';
            let totalMins    = '-';

            // คำนวณเฉพาะวันเดียวกัน
            const curDateStr  = cur.checkinTime.toDateString();
            const nextSameDay = next && next.checkinTime.toDateString() === curDateStr;

            if (nextSameDay) {
                const diffMins = Math.round((next.checkinTime - cur.checkinTime) / 60000);
                workDuration = diffMins > 0 ? diffMins : '-';

                if (cur.lat && cur.lng && next.lat && next.lng) {
                    await sleep(150);
                    apiCalls++;
                    const dist = await getDistance(cur.lat, cur.lng, next.lat, next.lng);
                    if (dist.distance !== null) {
                        distKm     = dist.distance;
                        travelMins = dist.duration;
                        apiSuccess++;
                        if (workDuration !== '-') {
                            totalMins = Number(workDuration) + Number(travelMins);
                        }
                    }
                }
            }

            const row = [
                `"Team ${team}"`,
                `"${seq}"`,
                `"${cur.branch}"`,
                `"${cur.customerName}"`,
                `"${cur.contractNumber}"`,
                `"${dayName}"`,
                `"${timeStr}"`,
                `"${latStr}"`,
                `"${lngStr}"`,
                `"${coordStr}"`,
                `"${workDuration}"`,
                `"${distKm}"`,
                `"${travelMins}"`,
                `"${totalMins}"`
            ].join(',');

            csvRows.push(row);
        }
        console.log(`\n  ✅ Team ${team} เสร็จสิ้น`);
    }

    // เขียนไฟล์ CSV (BOM สำหรับ Thai)
    const outputPath = path.join(__dirname, '..', 'workload_analysis_01-28_Feb_2026.csv');
    const csvContent = '\uFEFF' + csvRows.join('\n');
    fs.writeFileSync(outputPath, csvContent, 'utf8');

    console.log('\n\n═══════════════════════════════════════════════');
    console.log('✅ สร้าง CSV เสร็จสมบูรณ์!');
    console.log(`📄 ไฟล์: workload_analysis_01-28_Feb_2026.csv`);
    console.log(`📊 จำนวนแถว: ${csvRows.length - 1} รายการ`);
    console.log(`🗺️  Google Maps API calls: ${apiCalls} (สำเร็จ: ${apiSuccess})`);
    console.log('═══════════════════════════════════════════════');

    process.exit(0);
}

main().catch(err => {
    console.error('\n❌ Error:', err.message);
    process.exit(1);
});
