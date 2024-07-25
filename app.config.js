export default {
  expo: {
    name: "expo-router-authentication",
    slug: "expo-router-authentication",
    scheme: "signinapp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      googleServicesFile: process.env.GOOGLE_INFOPLIST,
      bundleIdentifier: "com.alanwu.signinapp",
    },
    plugins: [
      "expo-router",
      "@react-native-google-signin/google-signin",
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      "@react-native-firebase/crashlytics",
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
    ],
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      googleServicesFile: process.env.GOOGLE_JSON,
      package: "com.alanwu.signinapp",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "1c9ed46b-7375-4213-a934-629462bc2a1f",
      },
    },
  },
};
