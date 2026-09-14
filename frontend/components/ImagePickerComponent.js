import React from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ImagePickerComponent({ carpetImage, setCarpetImage }) {
  
  const handlePickImage = () => {
    // Gunakan elemen input HTML fail yang serasi dengan mobile browser
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageUri = URL.createObjectURL(file);
        setCarpetImage(imageUri);
      }
    };
    input.click();
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
