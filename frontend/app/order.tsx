import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Image, Modal, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function OrderScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const userName = params.name || 'Pengguna';

  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('basic');
  const [unitType, setUnitType] = useState('Rumah');
  const [includeEquipment, setIncludeEquipment] = useState(false);
  const [selectedDate, setSelectedDate] = useState(2);

  const packages = {
    basic: { name: 'Basic Clean', price: 120 },
    deep: { name: 'Deep Clean', price: 280 },
    complete: { name: 'Complete Home Reset', price: 450 }
  };

  const calculateTotal = () => {
    let base = packages[selectedPackage].price;
    if (includeEquipment) base += 50;
    return base;
  };

  // Penjanaan tarikh (1hb ditutup/disabled)
  const renderDates = () => {
    let dates = [];
    for (let i = 1; i <= 30; i++) {
      const isAvailable = i !== 1; 
      const isSelected = selectedDate === i;
      dates.push(
        <TouchableOpacity 
          key={i} 
          style={[styles.dateBox, !isAvailable && styles.dateDisabled, isSelected && styles.dateSelected]}
          disabled={!isAvailable}
          onPress={() => setSelectedDate(i)}
        >
          <Text style={[styles.dateTextNum, isSelected && styles.dateTextNumSelected, !isAvailable && styles.dateTextDisabled]}>{i}</Text>
          <Text style={[styles.dateTextMonth, isSelected && styles.dateTextNumSelected]}>Jun</Text>
        </TouchableOpacity>
      );
    }
    return dates;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View>
            <Text style={styles.greetingText}>Hai, {userName} 👋</Text>
            <Text style={styles.subGreetingText}>Selamat datang kembali!</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.bannerContainer}>
          <Text style={styles.bannerTitle}>Bersih Menyeluruh,</Text>
          <Text style={styles.bannerSubtitleHighlight}>Hidup Lebih Segar</Text>
          <TouchableOpacity style={styles.bannerButton} onPress={() => setBookingModalVisible(true)}>
            <Text style={styles.bannerButtonText}>Tempah Sekarang</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal Borang Tempahan */}
      <Modal animationType="slide" transparent={true} visible={bookingModalVisible} onRequestClose={() => setBookingModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.bookingCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Tempahan Servis</Text>
              <TouchableOpacity onPress={() => setBookingModalVisible(false)}>
                <Ionicons name="close-circle" size={26} color="#999" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.fieldLabel}>1. Pilih Pakej</Text>
              <TouchableOpacity style={[styles.packageBox, selectedPackage === 'basic' && styles.packageBoxActive]} onPress={() => setSelectedPackage('basic')}>
                <Text style={styles.packageName}>🟢 BASIC CLEAN - RM120</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.packageBox, selectedPackage === 'deep' && styles.packageBoxActive]} onPress={() => setSelectedPackage('deep')}>
                <Text style={styles.packageName}>🔵 DEEP CLEAN - RM280</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.packageBox, selectedPackage === 'complete' && styles.packageBoxActive]} onPress={() => setSelectedPackage('complete')}>
                <Text style={styles.packageName}>🟣 COMPLETE HOME RESET - RM450</Text>
              </TouchableOpacity>

              <Text style={styles.fieldLabel}>2. Pilih Tarikh (Jun)</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
                {renderDates()}
              </ScrollView>

              <Text style={styles.fieldLabel}>3. Jenis Unit</Text>
              <View style={styles.unitTypeRow}>
                <TouchableOpacity style={[styles.unitBtn, unitType === 'Rumah' && styles.unitBtnActive]} onPress={() => setUnitType('Rumah')}>
                  <Text style={[styles.unitBtnText, unitType === 'Rumah' && styles.unitBtnTextActive]}>Rumah</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.unitBtn, unitType === 'Pejabat' && styles.unitBtnActive]} onPress={() => setUnitType('Pejabat')}>
                  <Text style={[styles.unitBtnText, unitType === 'Pejabat' && styles.unitBtnTextActive]}>Pejabat</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.fieldLabel}>4. Add-on Peralatan</Text>
              <TouchableOpacity style={styles.addonCard} onPress={() => setIncludeEquipment(!includeEquipment)}>
                <Text style={styles.addonTitle}>Peralatan Pembersihan (+RM50)</Text>
                <Text>{includeEquipment ? '✅ Dipilih' : '❌ Tidak'}</Text>
              </TouchableOpacity>

              <View style={styles.summaryContainer}>
                <Text style={styles.summaryTextLabel}>Jumlah: RM {calculateTotal()}</Text>
                <TouchableOpacity style={styles.confirmBookingBtn} onPress={() => {
                  Alert.alert('Berjaya', `Tempahan untuk ${selectedDate} Jun disahkan!`);
                  setBookingModalVisible(false);
                }}>
                  <Text style={styles.confirmBookingText}>Sahkan Tempahan</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { padding: 16, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  greetingText: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A' },
  subGreetingText: { fontSize: 12, color: '#666' },
  scrollContent: { padding: 16 },
  bannerContainer: { backgroundColor: '#E8F1FC', borderRadius: 16, padding: 20 },
  bannerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A' },
  bannerSubtitleHighlight: { fontSize: 20, fontWeight: 'bold', color: '#0052CC', marginBottom: 10 },
  bannerButton: { backgroundColor: '#0052CC', padding: 10, borderRadius: 10, alignSelf: 'flex-start' },
  bannerButtonText: { color: '#FFF', fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  bookingCard: { backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold' },
  fieldLabel: { fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 6 },
  packageBox: { backgroundColor: '#FAFAFA', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 10, padding: 12, marginBottom: 8 },
  packageBoxActive: { borderColor: '#0052CC', backgroundColor: '#F0F4FF' },
  packageName: { fontSize: 13, fontWeight: 'bold', color: '#1A1A1A' },
  dateBox: { width: 45, height: 55, borderRadius: 8, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center', marginRight: 6, borderWidth: 1, borderColor: '#E2E8F0' },
  dateDisabled: { backgroundColor: '#CBD5E1', opacity: 0.5 },
  dateSelected: { backgroundColor: '#0052CC' },
  dateTextNum: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  dateTextDisabled: { color: '#888' },
  dateTextMonth: { fontSize: 10, color: '#666' },
  dateTextNumSelected: { color: '#FFF' },
  unitTypeRow: { flexDirection: 'row', justifyContent: 'space-between' },
  unitBtn: { flex: 1, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center', marginRight: 6, backgroundColor: '#FAFAFA' },
  unitBtnActive: { borderColor: '#0052CC', backgroundColor: '#F0F4FF' },
  unitBtnText: { fontSize: 13, fontWeight: '600', color: '#666' },
  unitBtnTextActive: { color: '#0052CC' },
  addonCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FAFAFA', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 10, padding: 12 },
  addonTitle: { fontSize: 13, fontWeight: 'bold' },
  summaryContainer: { marginTop: 20, borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingTop: 14 },
  summaryTextLabel: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  confirmBookingBtn: { backgroundColor: '#0052CC', borderRadius: 10, padding: 14, alignItems: 'center' },
  confirmBookingText: { color: '#FFF', fontWeight: 'bold' }
});
