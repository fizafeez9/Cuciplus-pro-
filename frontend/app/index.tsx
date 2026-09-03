import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  // Simulasikan Splash Screen selama 2 saat
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Fungsi Sambung ke MongoDB Backend
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Ralat', 'Sila masukkan e-mel dan kata laluan.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();

      if (data.success) {
        Alert.alert('Berjaya', `Selamat datang kembali, ${data.user.name}!`);
      } else {
        Alert.alert('Gagal', data.message);
      }
      
    } catch (error) {
      Alert.alert('Ralat Sambungan', 'Gagal berhubung dengan MongoDB backend.');
    }
  };

  // 1. PAPARAN SPLASH SCREEN (Logo Penuh, Tanpa Teks, Biru Cair & Terang)
  if (isLoading) {
    return (
      <View style={styles.splashContainer}>
        <StatusBar style="light" />
        <Image 
          source={require('../assets/23FFA459-E9E2-4192-A51B-734CD6319EC1.png')} 
          style={styles.splashLogoImage} 
          resizeMode="contain"
        />
      </View>
    );
  }

  // 2. PAPARAN LOGIN PAGE
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.innerContainer}
      >
        <View style={styles.headerContainer}>
          <View style={styles.smallLogoBox}>
            <Image 
              source={require('../assets/23FFA459-E9E2-4192-A51B-734CD6319EC1.png')} 
              style={styles.smallLogoImage} 
              resizeMode="contain"
            />
          </View>
          <Text style={styles.welcomeText}>Hai, Aina 👋</Text>
          <Text style={styles.subWelcomeText}>Selamat datang kembali! Sila log masuk.</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-mel / Nombor Telefon</Text>
            <View style={styles.inputBox}>
              <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="cth: aina@email.com"
                placeholderTextColor="#A0A0A0"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Kata Laluan</Text>
            <View style={styles.inputBox}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Masukkan kata laluan"
                placeholderTextColor="#A0A0A0"
                secureTextEntry={secureText}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                <Ionicons 
                  name={secureText ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotText}>Lupa Kata Laluan?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Log Masuk</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Belum mempunyai akaun? </Text>
          <TouchableOpacity>
            <Text style={styles.registerText}>Daftar Sekarang</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  splashContainer: { 
    flex: 1, 
    backgroundColor: '#3399FF', // Biru cair dan terang
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 20
  },
  splashLogoImage: { 
    width: '80%', 
    height: '80%', 
    maxWidth: 300, 
    maxHeight: 300 
  },
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  innerContainer: { flex: 1, padding: 24, justifyContent: 'space-between' },
  headerContainer: { marginTop: 30 },
  smallLogoBox: { width: 60, height: 60, borderRadius: 16, backgroundColor: '#EBF3FF', alignItems: 'center', justifyContent: 'center', marginBottom: 16, overflow: 'hidden' },
  smallLogoImage: { width: 45, height: 45 },
  welcomeText: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A' },
  subWelcomeText: { fontSize: 14, color: '#666666', marginTop: 6 },
  formContainer: { marginVertical: 10 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#333333', marginBottom: 8 },
  inputBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12, paddingHorizontal: 14, height: 52, backgroundColor: '#FAFAFA' },
  inputIcon: { marginRight: 10 },
  textInput: { flex: 1, fontSize: 15, color: '#1A1A1A' },
  forgotPassword: { alignItems: 'flex-end', marginBottom: 24 },
  forgotText: { fontSize: 14, color: '#0052CC', fontWeight: '600' },
  loginButton: { backgroundColor: '#0052CC', height: 52, borderRadius: 12, alignItems: 'center', justifyContent: 'center', shadowColor: '#0052CC', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
  loginButtonText: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
  footerContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  footerText: { fontSize: 14, color: '#666666' },
  registerText: { fontSize: 14, fontWeight: 'bold', color: '#0052CC' },
});
