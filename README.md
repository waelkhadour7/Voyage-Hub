# Voyage Plus: React + Android (Capacitor)

موقع React داخل تطبيق أندرويد حقيقي. المشروع الأصلي: `src/` (React + Vite)، ومشروع Android Studio: `android/`.

## التشغيل من Android Studio
    npm install
    npm run build:android      # يبني React ويزامنه داخل android/
    npm run android            # أو: يبني ويزامن ويفتح Android Studio مباشرة

ثم في Android Studio: انتظر Gradle Sync → اختر جهازاً/محاكياً → ▶ Run.
(المتطلبات: Android Studio حديث، JDK 21، Android SDK 36.)

## بعد أي تعديل في React
    npm run build:android      ثم Run من Android Studio

## ملف APK / AAB للنشر
Android Studio → Build → Generate Signed Bundle / APK.

## تعديل الأيقونة
android/app/src/main/res/mipmap-*  (ic_launcher*, ic_launcher_foreground)
شاشة البداية: res/drawable*/splash.png
اسم التطبيق: android/app/src/main/res/values/strings.xml
