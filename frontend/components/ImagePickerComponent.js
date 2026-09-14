import React from 'react';
import { Text, TouchableOpacity, Image, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerComponent({ carpetImage, setCarpetImage }) {
  
  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.status !== 'granted' && cameraPermission.status !== 'granted') {
      Alert.alert('Kebenaran Ditolak', 'Kami memerlukan akses ke kamera atau galeri untuk memuat naik gambar karpet.');
      return;
    }

    Alert.alert(
      'Pilih Sumber Gambar',
      'Sila pilih cara untuk memuat naik gambar karpet:',
      [
        {
          text: 'Kamera',
          onPress: async () => {
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 0.7,
            });

            if (!result.canceled) {
              setCarpetImage(result.assets[0].uri);
            }
          }
        },
        {
          text: 'Galeri Foto',
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 0.7,
            });

            if (!result.canceled) {
              setCarpetImage(result.assets[0].uri);
            }
          }
        },
        { text: 'Batal', style: 'cancel' }
      ]
    );
  };

  return (
    <>
      <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#333', marginTop: 12, marginBottom: 6 }}>
        3. Gambar Karpet (Wajib)
      </Text>
      <TouchableOpacity 
        style={{
          borderWidth: 1.5, 
          borderColor: carpetImage ? '#16A34A' : '#0052CC', 
          borderStyle: 'dashed', 
          borderRadius: 10, 
          padding: carpetImage ? 10 : 20, 
          alignItems: 'center', 
          justifyContent: 'center', 
          backgroundColor: carpetImage ? '#F0FDF4' : '#F0F4FF', 
          marginBottom: 16 
        }}
        onPress={handlePickImage}
      >
        {carpetImage ? (
          <View style={{ alignItems: 'center', width: '100%' }}>
            <Image source={{ uri: carpetImage }} style={{ width: '100%', height: 140, borderRadius: 8, marginBottom: 8 }} resizeMode="cover" />
            <Text style={{ fontSize: 12, color: '#16A34A', fontWeight: 'bold' }}>✓ Gambar Berjaya Dimuat Naik (Tekan untuk tukar)</Text>
          </View>
        ) : (
          <>
            <Ionicons name="camera-outline" size={36} color="#0052CC" />
            <Text style={{ fontSize: 13, color: '#0052CC', marginTop: 8, fontWeight: 'bold' }}>Ambil / Muat Naik Gambar</Text>
            <Text style={{ fontSize: 11, color: '#666', marginTop: 2, textAlign: 'center' }}>Bantu kami sahkan jenis & kondisi sebenar karpet</Text>
          </>
        )}
      </TouchableOpacity>
    </>
  );
}
