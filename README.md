# 🩺 Medicine Reminder App

A comprehensive React Native mobile application that helps users manage their medication schedules effectively and efficiently.

![Medicine Reminder App](https://github.com/yourusername/medicine-reminder-app/raw/main/assets/app-preview.png)

## 📱 Overview

The Medicine Reminder App is a user-friendly and efficient mobile application built with React Native that helps individuals stay on top of their medication schedules. It provides an intuitive interface, ensuring users never miss a dose of their prescribed medications. Whether you're a caregiver, a senior, or someone with chronic conditions, this app is designed to help you manage your health effectively.

## 🚀 Features

### 🔐 Strong Authentication System
- Secure user sign-up and sign-in process
- Password recovery and reset options
- Data encryption for user credentials
- Firebase Authentication integration

### 👤 Age-Based User Management
- Age-based profile customization
- Personalized health tracking and medication reminders
- User-friendly setup for adding basic health data

### 💊 Add Medicine with Detailed Information
- Add multiple medications with detailed descriptions
- Specify dosage, frequency, and administration instructions
- Set reminder notifications for each medication
- Track the start and end dates of medication courses

### 📆 Medicine Tracking
- View upcoming medication reminders and dosage schedules
- Track past medications and check if doses were taken
- Monitor missed doses and receive alerts
- Clear status indicators for completed, ongoing, and missed medications

### 🗺️ Emergency Hospital Locator
- Find nearby hospitals with a click of a button
- Uses real-time GPS data via Google Maps API
- Instant access to medical facilities during emergencies

## 🛠️ Built With

- **React Native**: Cross-platform mobile app development
- **Expo**: Framework for optimized React Native development
- **Firebase**: Backend services (Authentication, Firestore, Storage)
- **Google Maps API**: Location-based services
- **React Navigation**: Navigation and routing
- **Redux**: State management
- **Push Notifications**: For medication reminders

## 📋 Installation Instructions

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher) or Yarn (v1.22.0 or higher)
- Expo CLI (`npm install -g expo-cli`)
- Firebase account
- Google Maps API key


### Installation Steps

1. Clone the repository:

    ```      [    git clone https://github.com/yourusername/medicine-reminder-app.git ]  ```  

## Navigate to the project directory:

bashcd medicine-reminder-app

Install dependencies:

``` bashnpm install
### or
yarn install

Start the development server:

bashexpo start

## Run on a device or emulator:

Scan the QR code with the Expo Go app on your mobile device
Press 'a' for Android emulator
Press 'i' for iOS simulator



## 🧪 Testing


Run tests using Jest:

bashnpm test
# or
yarn test
For end-to-end testing with Detox:

bashnpm run e2e

 or

yarn e2e




📁 Project Structure
├── .expo/ # Expo development files     
├── app/ # Main app components
│ ├── (tabs)/ # Tab navigation components
│ ├── action-modal/ # Action modal components
│ ├── add-new-medicine/ # Medicine addition screens
│ ├── login/ # Authentication screens
│ ├── Mock/ # Mock data and testing
│ └── layout.tsx # Root layout configuration
├── app-example/ # Example app components
├── assets/ # Static assets
│ ├── fonts/ # Custom font files
│ └── images/ # Application images
├── components/ # Reusable UI components
├── config/ # Configuration files
├── constant/ # Application constants
├── node_modules/ # Project dependencies
├── Service/ # API services and utilities
├── .gitignore # Git ignore rules
├── app.json # Expo configuration
├── expo-env.d.ts # TypeScript environment declarations
├── package-lock.json # Dependency lock file
├── package.json # Project dependencies and scripts
├── README.md # Project documentation


🔄 State Management
The app uses Redux for state management. The store is configured in redux/store.js:
javascriptimport { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import medicineReducer from './slices/medicineSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    medicine: medicineReducer,
    user: userReducer,
  },
});
📲 Firebase Integration
Initialize Firebase in your config/firebase.js:
javascriptimport { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.manifest.extra.firebaseApiKey,
  authDomain: Constants.manifest.extra.firebaseAuthDomain,
  projectId: Constants.manifest.extra.firebaseProjectId,
  storageBucket: Constants.manifest.extra.firebaseStorageBucket,
  messagingSenderId: Constants.manifest.extra.firebaseMessagingSenderId,
  appId: Constants.manifest.extra.firebaseAppId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
🗓️ Future Improvements

Integration with Wearable Health Devices: Connect with smartwatches and fitness trackers
Voice Reminders & Speech-to-Text: Add voice capabilities for improved accessibility
Multi-Language Support: Expand to global audience with multiple languages
Dark Mode: Implement dark mode for better user experience
Medication Interaction Alerts: Notify users of potential drug interactions
Offline Mode: Allow app functionality without internet connection
Data Export: Enable exporting medication history to PDF/CSV



```
## 🗓️ Future Improvements

Integration with Wearable Health Devices: Connect with smartwatches and fitness trackers
Voice Reminders & Speech-to-Text: Add voice capabilities for improved accessibility
Multi-Language Support: Expand to global audience with multiple languages
Dark Mode: Implement dark mode for better user experience
Medication Interaction Alerts: Notify users of potential drug interactions
Offline Mode: Allow app functionality without internet connection
Data Export: Enable exporting medication history to PDF/CSV

## 👥 Contributing
We welcome contributions to improve the Medicine Reminder App! Here's how you can contribute:
Please make sure to update tests as appropriate and adhere to the existing coding style.





# 🐛 Bug Reports
If you find a bug, please open an issue on GitHub with:

A clear title and description
Steps to reproduce the bug
Expected behavior
Screenshots (if applicable)
Device information (OS, model, etc.)


## Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
## 📧 Contact
Project Maintainer: Bidhan Adhikari
Project Link: https://github.com/Bidhan33/Mobile_Medicine_Tracking.git


# Here Are the Screenshot of the Project


#### ![25](https://github.com/user-attachments/assets/8a6c80ff-a43b-4b23-9613-c31531e2bd48)
![24](https://github.com/user-attachments/assets/d6909667-d38b-4661-9821-cc85522f2e04)
![23](https://github.com/user-attachments/assets/894e8f06-fce9-4b35-9d85-dcc378b5d8dc)
![22](https://github.com/user-attachments/assets/135f37db-75b7-4846-8af5-5c2ccd54563b)
![33](https://github.com/user-attachments/assets/0f29a1a8-42b1-4bd0-9096-41907db815b4)
![32](https://github.com/user-attachments/assets/71d4aaf9-dee7-473d-bf74-b778b0e4ce79)
![30](https://github.com/user-attachments/assets/52b58ed9-c2ff-4d2e-a546-350b4c85b6eb)
![29](https://github.com/user-attachments/assets/e088c8d8-d183-4d2a-bb3b-494965e9ca88)
![28](https://github.com/user-attachments/assets/6bb0781b-d414-4f33-a5d8-811bd011f70b)
![27](https://github.com/user-attachments/assets/71a9ab06-4d35-48fd-9469-c7fca095fdca)
![26](https://github.com/user-attachments/assets/100fb740-8ac0-4ce2-ac11-3b155658e7ae)
