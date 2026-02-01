# 🔒 Security Checklist - Before Going Public

## ⚠️ IMPORTANT

ก่อนเปลี่ยน repository เป็น Public ต้องทำตาม checklist นี้ให้ครบ!

## 📊 Overall Status

| Phase | Status | Completion | Details |
| --- | --- | --- | --- |
| **1. Code Cleanup** | ✅ DONE | 100% | API keys moved to config.js, .gitignore updated |
| **2. Git History** | ✅ DONE | 100% | Removed docs/api-guide.md, deploy-history.log, URL files |
| **2.1. Force Push** | ⏳ PENDING | 0% | Need to force push (Tomorrow) |
| **3. Rotate Keys** | ❌ PENDING | 0% | Firebase + Longdo keys need rotation |
| **4. Firebase Security** | ❌ PENDING | 0% | App Check + API restrictions needed |
| **5. Testing** | ❌ PENDING | 0% | Need to verify app after changes |
| **6. Go Public** | ❌ PENDING | 0% | Final step - waiting for all phases |

**Overall:** 2/7 phases complete (28.6%) 🟡 IN PROGRESS

---

- [x] สร้าง `src/config.js` สำหรับเก็บ API Keys
- [x] สร้าง `src/config.example.js` เป็น template
- [x] อัพเดท `mobile-checkin.html` ให้โหลด config.js
- [x] อัพเดท `admin-dashboard.html` ให้โหลด config.js
- [x] อัพเดท `pages/test/test-complete.html` ให้โหลด config.js
- [x] อัพเดท `.gitignore` ให้ ignore config.js และ sensitive files
- [x] อัพเดท `docs/api-guide.md` ลบ hardcoded API keys
- [x] อัพเดท `firebase/firestore.rules` ให้ปลอดภัยขึ้น

---

## ✅ Phase 2: Git History Cleanup (เสร็จแล้ว)

### ✅ Step 1: ติดตั้ง git-filter-repo

```powershell
pip install git-filter-repo
```
**Status:** ✅ Done

### ✅ Step 2: Remove sensitive files from history

```powershell
# Removed files:
# - docs/api-guide.md (contained API keys)
# - deploy-history.log (sensitive deployment info)
# - URL-ใช้งานจริง.md (production URLs)

python -m git_filter_repo --path "docs/api-guide.md" --invert-paths --force
python -m git_filter_repo --path "deploy-history.log" --invert-paths --force
python -m git_filter_repo --path-glob "*URL*.md" --invert-paths --force
```
**Status:** ✅ Done - All commits rewritten

### ✅ Step 3: Create backup branch

```powershell
git branch backup-before-cleanup-20260201-203545
```
**Status:** ✅ Done

---

## ⏳ Phase 2.1: Force Push (ทำพรุ่งนี้)

**สถานะปัจจุบัน:**
- ✅ Local Git history ถูก rewrite แล้ว
- ⏸️ ยังไม่ได้ push ขึ้น GitHub
- 🔒 Backup branch สำรองไว้แล้ว

### ⚠️ Step 1: ตรวจสอบก่อน Force Push

```powershell
# ดู history ที่เปลี่ยนแล้ว
git log --oneline -10

# ค้นหา API keys (ควรยังเจอใน HTML files ของ old commits)
git log -p --all -S "AIzaSy" | head -20
```

### 🚀 Step 2: Force Push

```powershell
git push origin main --force
```

**⚠️ Important Notes:**
- Git history บน GitHub จะถูก rewrite
- Commit hashes เปลี่ยนหมด
- ต้อง re-clone repository
- **API keys ยังอยู่ใน old HTML commits** → ต้องทำ Phase 3 ทันที!

---

## ⏳ Phase 3: Rotate API Keys (ผู้ใช้ต้องทำเอง)

### Firebase API Key

1. ไปที่ [Firebase Console](https://console.firebase.google.com/)
2. เลือก Project: `bait-check-in-webapp`
3. ไปที่ **Project Settings** → **General**
4. Scroll ลงไปที่ **Your apps** → **Web app**
5. ❌ ไม่สามารถ regenerate API key ได้โดยตรง

**ทางเลือก:**
- Enable **App Check** เพื่อป้องกันการใช้งานนอก app
- Restrict API key ใน [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

### Longdo Map API Key

1. ไปที่ [Longdo Console](https://map.longdo.com/console/)
2. Login
3. สร้าง API Key ใหม่
4. Restrict ให้ใช้ได้เฉพาะ domain:
   - `bait-check-in-webapp.web.app`
   - `localhost`
5. ลบ API Key เก่า
6. อัพเดท `src/config.js` ด้วย key ใหม่

---

## ⏳ Phase 4: Firebase Security (ผู้ใช้ต้องทำเอง)

### Enable App Check

1. ไปที่ [Firebase Console](https://console.firebase.google.com/)
2. เลือก **App Check**
3. Register your app with **reCAPTCHA v3**
4. Enable enforcement for:
   - ✅ Firestore
   - ✅ Cloud Storage

### Restrict API Key (Google Cloud)

1. ไปที่ [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. เลือก API key ของ Firebase
3. ตั้งค่า **Application restrictions**:
   - Type: **HTTP referrers**
   - Add: `bait-check-in-webapp.web.app/*`
   - Add: `localhost:*/*` (for development)
4. ตั้งค่า **API restrictions**:
   - ✅ Cloud Firestore API
   - ✅ Firebase Cloud Storage API
   - ✅ Identity Toolkit API

---

## ⏳ Phase 5: Final Verification (ผู้ใช้ต้องทำเอง)

### ทดสอบ App หลังเปลี่ยนแปลง

```powershell
# Start local server
npx http-server . -p 8080

# เปิด browser ไปที่
# http://localhost:8080/mobile-checkin.html
# http://localhost:8080/admin-dashboard.html
```

- [ ] Mobile Check-in ทำงานได้
- [ ] Admin Dashboard ทำงานได้
- [ ] GPS ทำงานได้
- [ ] รูปภาพ upload ได้
- [ ] ข้อมูลบันทึกลง Firestore ได้

### ตรวจสอบ Git History

```powershell
# ค้นหา API keys ใน history
git log -p --all -S "AIzaSy" | head -20

# ถ้าไม่เจออะไร = OK
```

---

## 🚀 Phase 6: Go Public

เมื่อทำครบทุกข้อแล้ว:

1. ไปที่ GitHub repository settings
2. Scroll ลงไปที่ **Danger Zone**
3. Click **Change visibility**
4. Select **Make public**
5. Confirm by typing repository name

---

---

## 📋 Quick Summary

| Task | Status | Priority | Estimated Time |
| --- | --- | --- | --- |
| Move API keys to config.js | ✅ Done | Critical | Done |
| Update .gitignore | ✅ Done | Critical | Done |
| Update Firestore Rules | ✅ Done | High | Done |
| **Clean Git history** | ❌ Pending | **Critical** | 10 min |
| **Rotate API keys** | ❌ Pending | **High** | 30 min |
| **Enable App Check** | ❌ Pending | **High** | 15 min |
| **Restrict API keys** | ❌ Pending | **Medium** | 15 min |
| **Test app** | ❌ Pending | **High** | 20 min |
| **Make public** | ❌ Pending | **Final** | 2 min |

**⏱️ Total Remaining Time:** ~90 minutes

---

## 🔴 Current Status

**Repository is NOT ready for public yet!**

### What's Done ✅
- Code-level security complete
- API keys externalized from HTML
- .gitignore properly configured
- Firestore rules improved

### Critical Blockers ❌
1. **API keys exposed in Git history** - Need Phase 2 cleanup
2. **API keys not rotated** - Keys in history are compromised
3. **No App Check enabled** - Need Firebase security
4. **API keys not restricted** - Need domain restrictions

### Next Steps 👇
1. Run `cleanup-history.ps1 -Confirm` (Phase 2)
2. Rotate Firebase and Longdo API keys (Phase 3)
3. Enable App Check in Firebase Console (Phase 4)
4. Test app thoroughly (Phase 5)
5. Make repository public (Phase 6)

---

**อัปเดตล่าสุด:** 01-02-2026, 20:50 น.
**Status:** 🟡 IN PROGRESS - Phase 2 complete, Phase 2.1 tomorrow
