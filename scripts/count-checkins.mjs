/**
 * Script สำหรับนับจำนวน check-in records ใน Firestore
 * Usage: node scripts/count-checkins.mjs
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCFn-MEkbuQEvmdp6fdeJxsSysovhM44_g",
    authDomain: "bait-check-in-webapp.firebaseapp.com",
    projectId: "bait-check-in-webapp",
    storageBucket: "bait-check-in-webapp.firebasestorage.app",
    messagingSenderId: "850336159440",
    appId: "1:850336159440:web:c104204bd3f2d18b5b70d5",
    measurementId: "G-V52G8M5H6Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function countCheckins() {
    console.log('🔍 กำลังดึงข้อมูลจาก Firestore...\n');
    
    try {
        // ดึงข้อมูลทั้งหมดจาก checkins collection
        const checkinsRef = collection(db, 'checkins');
        const snapshot = await getDocs(checkinsRef);
        
        console.log('═══════════════════════════════════════════');
        console.log(`📊 จำนวน Check-in ทั้งหมด: ${snapshot.size} รายการ`);
        console.log('═══════════════════════════════════════════\n');
        
        if (snapshot.size === 0) {
            console.log('⚠️ ไม่พบข้อมูล check-in ในระบบ');
            return;
        }
        
        // นับจำนวนตามทีม
        const teamCounts = {};
        const zoneCounts = {};
        const branchCounts = {};
        const dateCounts = {};
        
        snapshot.forEach(doc => {
            const data = doc.data();
            
            // นับตามทีม
            const team = data.team || 'ไม่ระบุ';
            teamCounts[team] = (teamCounts[team] || 0) + 1;
            
            // นับตามเขต
            const zone = data.zone || 'ไม่ระบุ';
            zoneCounts[zone] = (zoneCounts[zone] || 0) + 1;
            
            // นับตามสาขา
            const branch = data.branch || 'ไม่ระบุ';
            branchCounts[branch] = (branchCounts[branch] || 0) + 1;
            
            // นับตามวันที่
            if (data.checkinTime) {
                const date = data.checkinTime.toDate ? 
                    data.checkinTime.toDate().toLocaleDateString('th-TH') : 
                    new Date(data.checkinTime).toLocaleDateString('th-TH');
                dateCounts[date] = (dateCounts[date] || 0) + 1;
            }
        });
        
        // แสดงจำนวนตามทีม
        console.log('📋 จำนวนตามทีม:');
        console.log('─────────────────────');
        const sortedTeams = Object.entries(teamCounts)
            .sort((a, b) => b[1] - a[1]);
        sortedTeams.forEach(([team, count]) => {
            console.log(`  ทีม ${team}: ${count} รายการ`);
        });
        
        // แสดงจำนวนตามเขต
        console.log('\n📍 จำนวนตามเขต:');
        console.log('─────────────────────');
        const sortedZones = Object.entries(zoneCounts)
            .sort((a, b) => {
                const numA = parseInt(a[0].replace(/\D/g, '')) || 0;
                const numB = parseInt(b[0].replace(/\D/g, '')) || 0;
                return numA - numB;
            });
        sortedZones.forEach(([zone, count]) => {
            console.log(`  ${zone}: ${count} รายการ`);
        });
        
        // แสดงจำนวนตามสาขา (Top 10)
        console.log('\n🏢 จำนวนตามสาขา (Top 10):');
        console.log('─────────────────────');
        const sortedBranches = Object.entries(branchCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);
        sortedBranches.forEach(([branch, count]) => {
            console.log(`  ${branch}: ${count} รายการ`);
        });
        
        // แสดงจำนวนตามวันที่ (ล่าสุด 7 วัน)
        console.log('\n📅 จำนวนตามวันที่ (ล่าสุด 7 วัน):');
        console.log('─────────────────────');
        const sortedDates = Object.entries(dateCounts)
            .sort((a, b) => new Date(b[0]) - new Date(a[0]))
            .slice(0, 7);
        sortedDates.forEach(([date, count]) => {
            console.log(`  ${date}: ${count} รายการ`);
        });
        
        // แสดง 5 รายการล่าสุด
        console.log('\n🕐 5 รายการล่าสุด:');
        console.log('─────────────────────');
        const docsArray = [];
        snapshot.forEach(doc => {
            docsArray.push({ id: doc.id, ...doc.data() });
        });
        
        const sortedDocs = docsArray
            .filter(d => d.checkinTime)
            .sort((a, b) => {
                const timeA = a.checkinTime.toDate ? a.checkinTime.toDate() : new Date(a.checkinTime);
                const timeB = b.checkinTime.toDate ? b.checkinTime.toDate() : new Date(b.checkinTime);
                return timeB - timeA;
            })
            .slice(0, 5);
        
        sortedDocs.forEach((doc, i) => {
            const time = doc.checkinTime.toDate ? 
                doc.checkinTime.toDate().toLocaleString('th-TH') : 
                new Date(doc.checkinTime).toLocaleString('th-TH');
            console.log(`  ${i + 1}. ทีม ${doc.team || '-'} | ${doc.customerName || '-'} | ${time}`);
        });
        
        console.log('\n═══════════════════════════════════════════');
        console.log('✅ ดึงข้อมูลสำเร็จ');
        console.log('═══════════════════════════════════════════');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        
        if (error.code === 'permission-denied') {
            console.log('\n⚠️ คุณไม่มีสิทธิ์เข้าถึงข้อมูล');
            console.log('   ตรวจสอบ Firestore Security Rules');
        }
    }
    
    process.exit(0);
}

countCheckins();
