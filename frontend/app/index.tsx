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
  const [isRegistering, setIsRegistering] = useState(false); // Kawal paparan Login / Register
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  // Simulasikan Splash Screen selama 4 saat
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Fungsi Hantar Data ke Backend (Log Masuk atau Daftar)
  const handleSubmit = async () => {
    if (!email || !password || (isRegistering && !name)) {
      Alert.alert('Ralat', 'Sila lengkapkan semua maklumat.');
      return;
    }

    // URL awam sebenar port 8000 Codespaces anda
    const endpoint = isRegistering 
      ? 'https://humble-telegram-4qwqrrjp9x6cj47j-8000.app.github.dev/api/register' 
      : 'https://humble-telegram-4qwqrrjp9x6cj47j-8000.app.github.dev/api/login';

    const payload = isRegistering ? { name, email, password } : { email, password };

    try {
      console.log('Menghantar data ke:', endpoint);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      console.log('Respons server:', data);

      if (response.ok && data.success) {
        Alert.alert('Berjaya', isRegistering ? 'Pendaftaran berjaya! Sila log masuk.' : `Selamat datang kembali, ${data.user.name}!`);
        if (isRegistering) {
          setIsRegistering(false); // Lepas daftar, balik ke skrin log masuk
        }
      } else {
        Alert.alert('Gagal', data.message || 'Terdapat ralat pada pelayan.');
      }
      
    } catch (error) {
      console.log('Ralat Fetch:', error);
      Alert.alert('Ralat Sambungan', `Gagal berhubung dengan backend: ${error.message}`);
    }
  };

  // 1. PAPARAN SPLASH SCREEN
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

  // 2. PAPARAN UTAMA (LOGIN / REGISTER)
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.innerContainer}
      >
        <View style={styles.headerContainer}>
          <View style={styles.centerLogoBox}>
            <Image 
              source={require('../assets/23FFA459-E9E2-4192-A51B-734CD6319EC1.png')} 
              style={styles.centerLogoImage} 
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.formContainer}>
          {/* Medan Nama hanya muncul jika mod Daftar */}
          {isRegistering && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nama Penuh</Text>
              <View style={styles.inputBox}>
                <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="cth: Aina Zulkarnain"
                  placeholderTextColor="#A0A0A0"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>
          )}

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

          {!isRegistering && (
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotText}>Lupa Kata Laluan?</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
            <Text style={styles.loginButtonText}>{isRegistering ? 'Daftar Akaun' : 'Log Masuk'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {isRegistering ? 'Sudah mempunyai akaun? ' : 'Belum mempunyai akaun? '}
          </Text>
          <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
            <Text style={styles.registerText}>
              {isRegistering ? 'Log Masuk' : 'Daftar Sekarang'}
            </Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  splashContainer: { 
    flex: 1, 
    backgroundColor: '#66B2FF', 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 20
  },
  splashLogoImage: { 
    width: '85%', 
    height: '85%', 
    maxWidth: 320, 
    maxHeight: 320 
  },
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  innerContainer: { flex: 1, padding: 24, justifyContent: 'space-between' },
  headerContainer: { alignItems: 'center', marginTop: 10 },
  centerLogoBox: { 
    width: 234, 
    height: 234, 
    borderRadius: 42, 
    backgroundColor: '#F5F9FF', 
    alignItems: 'center', 
    justifyContent: 'center', 
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3
  },
  centerLogoImage: { width: 190, height: 190 },
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
