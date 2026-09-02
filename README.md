# 📱 Mobile App

> React Native mobile application built with **Expo** and **Expo Router**.

---

## 📋 Requirements

Install the following before running the project:

- **Node.js LTS**
- **npm**
- **Git**
- **Android Studio** and an Android emulator, or **Expo Go** on an Android phone
- **Xcode** if you want to run the iOS simulator locally on macOS

---

## 📦 Install Dependencies

Open **Command Prompt** or **PowerShell** in the project folder:

```bash
cd C:\Projects\mobile-app
npm install
```

Run `npm install` whenever dependencies change or after cloning the repository.

---

## 🚀 Start the Development Server

```bash
npx expo start
```

After Expo starts, choose one option:

| Key / Action | Description                           |
| ------------ | ------------------------------------- |
| `w`          | Open the web version                  |
| `a`          | Open the Android emulator             |
| `i`          | Open the iOS simulator on macOS       |
| QR Code      | Open with Expo Go on a physical phone |

> Keep the terminal running while using the application.

---

## 🧹 Clear the Cache

If the app displays old files or navigation changes do not appear, stop Expo with `Ctrl+C` and run:

```bash
npx expo start --clear
```

If a phone cannot connect over local Wi-Fi, use tunnel mode:

```bash
npx expo start --tunnel
```

---

## ✅ Quality Checks

### TypeScript Check

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

---

## 🛑 Stop the Project

Click the terminal running Expo and press:

```text
Ctrl+C
```

---

## 📂 Main Project Locations

```text
src/app/              Application routes
src/app/(tabs)/       Home and tab screens
src/app/_layout.tsx   Root navigation layout
src/components/       Reusable components
assets/               Images and other static files
package.json          Dependencies and scripts
app.json              Expo application configuration
```

---

## ⚡ Common Commands

| Command                  | Purpose                    |
| ------------------------ | -------------------------- |
| `npx expo start`         | Start Expo                 |
| `npx expo start --clear` | Start with a clean cache   |
| `npm run android`        | Open Android directly      |
| `npm run ios`            | Open iOS directly on macOS |
| `npm run web`            | Open web directly          |

---
