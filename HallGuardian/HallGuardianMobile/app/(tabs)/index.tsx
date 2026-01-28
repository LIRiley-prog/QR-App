// app/(tabs)/index.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

// ⚠️ If you're on your phone, change this to your computer's IP
const API_URL = "http://192.168.155.12:4000";

export default function HomeScreen() {
  const [healthResult, setHealthResult] = useState<string | null>(null);

  const [email, setEmail] = useState("owner@hallguardian.com");
  const [password, setPassword] = useState("DemoPass123!");
  const [loginResult, setLoginResult] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [schoolId, setSchoolId] = useState<number>(1);

  const [loadingHealth, setLoadingHealth] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const [scanMode, setScanMode] = useState(false);
  const [scanMessage, setScanMessage] = useState<string>(
    "Scan a student QR..."
  );

  // NEW: expo-camera permissions hook
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission) {
      // first load, request permission
      requestPermission();
    }
  }, [permission, requestPermission]);

  async function testHealth() {
    try {
      setLoadingHealth(true);
      setHealthResult(null);
      const res = await fetch(`${API_URL}/api/health`);
      const json = await res.json();
      setHealthResult(JSON.stringify(json, null, 2));
    } catch (e: any) {
      setHealthResult(`Error: ${e.message}`);
    } finally {
      setLoadingHealth(false);
    }
  }

  async function testLogin() {
    try {
      setLoadingLogin(true);
      setLoginResult(null);
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setLoginResult(`Login failed: ${json.error || "Unknown error"}`);
        setToken(null);
      } else {
        setLoginResult(
          `Login OK! Token starts with:\n${json.token.slice(0, 30)}...`
        );
        setToken(json.token);
        setSchoolId(json.user.schoolId || 1);
      }
    } catch (e: any) {
      setLoginResult(`Error: ${e.message}`);
    } finally {
      setLoadingLogin(false);
    }
  }

  // called when a QR/barcode is detected
  async function handleBarCodeScanned({ data }: any) {
    if (!token) {
      setScanMessage("You must log in first.");
      return;
    }

    setScanMessage(`Scanned: ${data} - sending to backend...`);

    try {
      const res = await fetch(`${API_URL}/api/scan/qr`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          qrValue: data, // e.g. "QR:S-1001"
          locationCode: "MOBILE-READER-1",
          schoolId: schoolId,
          deviceLabel: "HallGuardian Mobile",
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        setScanMessage(`Scan error: ${json.error || "Unknown error"}`);
      } else {
        setScanMessage(
          `OK: ${json.student.name} is now ${json.direction} at ${json.location.name}`
        );
      }
    } catch (e: any) {
      setScanMessage(`Network error: ${e.message}`);
    }
  }

  // If we're in scan mode, show full-screen camera view
  if (scanMode) {
    if (!permission) {
      return (
        <View style={styles.container}>
          <Text>Requesting camera permission…</Text>
        </View>
      );
    }

    if (!permission.granted) {
      return (
        <View style={styles.container}>
          <Text>No access to camera. Please enable camera in settings.</Text>
          <Button title="Grant permission" onPress={requestPermission} />
          <Button title="Back" onPress={() => setScanMode(false)} />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <CameraView
          style={{ flex: 1 }}
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        />
        <View style={styles.scanFooter}>
          <Text>{scanMessage}</Text>
          <Button title="Back" onPress={() => setScanMode(false)} />
        </View>
      </View>
    );
  }

  // Normal home screen
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HallGuardian Mobile</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>1. Test backend health</Text>
        <Button
          title="Ping /api/health"
          onPress={testHealth}
          disabled={loadingHealth}
        />
        {loadingHealth && <ActivityIndicator style={{ marginTop: 8 }} />}
        {healthResult && (
          <Text style={styles.resultText}>{healthResult}</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>2. Admin login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Log in" onPress={testLogin} disabled={loadingLogin} />
        {loadingLogin && <ActivityIndicator style={{ marginTop: 8 }} />}
        {loginResult && (
          <Text style={styles.resultText}>{loginResult}</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>3. Scan student QR</Text>
        {!token ? (
          <Text style={styles.resultText}>Log in first to enable scanning.</Text>
        ) : (
          <>
            <Text style={styles.resultText}>
              Logged in. School ID: {schoolId}
            </Text>
            <Button title="Start scanning" onPress={() => setScanMode(true)} />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 24,
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    backgroundColor: "white",
  },
  resultText: {
    marginTop: 8,
    fontSize: 12,
    color: "#333",
  },
  scanFooter: {
    padding: 12,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#ddd",
    gap: 8,
  },
});
