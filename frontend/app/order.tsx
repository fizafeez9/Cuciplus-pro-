import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Image, Modal, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function OrderScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const userName = params.name || 'Pengguna';

  // State Kawalan Modal & Menu
  const [menuVisible, setMenuVisible] = useState(false);
  const [notifVisible, setNotifVisible] = useState(false);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);

  // State Borang Tempahan
  const [selectedPackage, setSelectedPackage] = useState('basic');
  const [unitType, setUnitType] = useState('Rumah');
  const [includeEquipment, setIncludeEquipment] = useState(false);
  const [selectedDate, setSelectedDate] = useState(2);

  // State Senarai Tempahan Aktif (Bermula kosong [] supaya tiada kad statik)
  const [myBookings, setMyBookings] = useState([]);

  // Data Notifikasi
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Selamat Datang! 🎉',
      desc: 'Selamat datang ke CuciPlusPro, mulakan tempahan pembersihan terbaik dari CuciPlusPro.',
      time: 'Baru sahaja',
      read: false,
    },
    {
      id: '2',
      title: 'Baucar Diskaun Pertama 🏷️',
      desc: 'Nikmati penjimatan untuk tempahan pertama anda. Gunakan kod: CUCIJIMAT5 untuk tempahan RM100 ke atas.',
      time: '1 hari lalu',
      read: false,
    },
    {
      id: '3',
      title: 'Diskaun Eksklusif VIP 🌟',
      desc: 'Nikmati penjimatan besar untuk tempahan menyeluruh. Gunakan kod: CUCIJIMAT15 untuk tempahan RM200 ke atas.',
      time: '2 hari lalu',
      read: false,
    }
  ]);

  const unreadCount = notifications.filter(item => !item.read).length;

  const handleMarkAsRead = (id) => {
    setNotifications(prev => 
      prev.map(item => item.id === id ? { ...item, read: true } : item)
    );
  };

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

  // Penjanaan Tarikh (1hb dikunci/disabled)
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

  // Fungsi Apabila Tempahan Disahkan
  const handleConfirmBooking = () => {
    const newBooking = {
      id: '#CPR' + Math.floor(100000 + Math.random() * 900000),
      serviceName: `Cleaning ${unitType} (${packages[selectedPackage].name})`,
      date: `${selectedDate} Jun 2026`,
      time: '10:00 AM - 1:00 PM',
      price: `RM ${calculateTotal()}`
    };

    // Masukkan tempahan baharu ke dalam senarai
    setMyBookings([newBooking, ...myBookings]);
    setBookingModalVisible(false);

    Alert.alert('Berjaya!', 'Tempahan anda telah berjaya dibuat dan dipaparkan di skrin utama.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header Utama */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.menuIcon} onPress={() => setMenuVisible(true)}>
            <Ionicons name="menu-outline" size={26} color="#333" />
          </TouchableOpacity>
          <View>
            <Text style={styles.greetingText}>Hai, {userName} 👋</Text>
            <Text style={styles.subGreetingText}>Selamat datang kembali!</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.logoBox}>
            <Image 
              source={require('../assets/23FFA459-E9E2-4192-A51B-734CD6319EC1.png')} 
              style={styles.logoImage} 
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity style={styles.notificationBtn} onPress={() => setNotifVisible(true)}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Banner Utama */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerTextContent}>
            <Text style={styles.bannerTitle}>Bersih Menyeluruh,</Text>
            <Text style={styles.bannerSubtitleHighlight}>Hidup Lebih Segar</Text>
            <Text style={styles.bannerDesc}>Perkhidmatan cleaning profesional untuk rumah, pejabat & karpet.</Text>
            <TouchableOpacity style={styles.bannerButton} onPress={() => setBookingModalVisible(true)}>
              <Text style={styles.bannerButtonText}>Tempah Sekarang</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFF" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bahagian Tempahan Pantas */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tempahan Pantas</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Lihat Semua &gt;</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickOrderScroll}>
          <TouchableOpacity style={[styles.quickCard, styles.quickCardActive]} onPress={() => setBookingModalVisible(true)}>
            <View style={styles.activeCheck}>
              <Ionicons name="checkmark" size={12} color="#FFF" />
            </View>
            <MaterialCommunityIcons name="home-outline" size={36} color="#0052CC" />
            <Text style={styles.quickCardTitle}>Cleaning Rumah</Text>
            <Text style={styles.quickCardSub}>Dari</Text>
            <Text style={styles.quickCardPrice}>RM 120</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickCard} onPress={() => setBookingModalVisible(true)}>
            <MaterialCommunityIcons name="office-building-outline" size={36} color="#333" />
            <Text style={styles.quickCardTitle}>Cleaning Pejabat</Text>
            <Text style={styles.quickCardSub}>Dari</Text>
            <Text style={styles.quickCardPrice}>RM 200</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickCard} onPress={() => setBookingModalVisible(true)}>
            <MaterialCommunityIcons name="rug" size={36} color="#333" />
            <Text style={styles.quickCardTitle}>Cleaning Karpet</Text>
            <Text style={styles.quickCardSub}>Dari</Text>
            <Text style={styles.quickCardPrice}>RM 60</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickCard} onPress={() => setBookingModalVisible(true)}>
            <MaterialCommunityIcons name="star-sparkles" size={36} color="#333" />
            <Text style={styles.quickCardTitle}>Pembersihan Mendalam</Text>
            <Text style={styles.quickCardSub}>Dari</Text>
            <Text style={styles.quickCardPrice}>RM 180</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Menu Pintasan */}
        <View style={styles.menuGrid}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBox}>
              <Ionicons name="calendar-outline" size={24} color="#0052CC" />
            </View>
            <Text style={styles.menuLabel}>Tempahan Saya</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBox}>
              <Ionicons name="wallet-outline" size={24} color="#0052CC" />
            </View>
            <Text style={styles.menuLabel}>Pakej & Promosi</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBox}>
              <Ionicons name="document-text-outline" size={24} color="#0052CC" />
            </View>
            <Text style={styles.menuLabel}>Sejarah Tempahan</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBox}>
              <Ionicons name="headset-outline" size={24} color="#0052CC" />
            </View>
            <Text style={styles.menuLabel}>Bantuan & Sokongan</Text>
          </TouchableOpacity>
        </View>

        {/* Senarai Tempahan Saya (Dinamik) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tempahan Saya</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Lihat Semua &gt;</Text>
          </TouchableOpacity>
        </View>

        {myBookings.length === 0 ? (
          <View style={styles.emptyOrderBox}>
            <Ionicons name="calendar-clear-outline" size={40} color="#CBD5E1" />
            <Text style={styles.emptyOrderText}>Belum ada sebarang tempahan aktif.</Text>
            <Text style={styles.emptyOrderSub}>Tekan butang di bawah untuk mula menempah servis.</Text>
          </View>
        ) : (
          myBookings.map((item, index) => (
            <View key={index} style={styles.orderCard}>
              <View style={styles.orderCardTop}>
                <View style={styles.orderImagePlaceholder} />
                <View style={styles.orderInfo}>
                  <View style={styles.orderStatusRow}>
                    <View style={styles.dotIndicator} />
                    <Text style={styles.statusText}>Akan Datang</Text>
                    <Text style={styles.orderId}>{item.id}</Text>
                  </View>
                  <Text style={styles.orderServiceName}>{item.serviceName}</Text>
                  <View style={styles.orderDetailRow}>
                    <Ionicons name="calendar-outline" size={14} color="#666" />
                    <Text style={styles.orderDetailText}>{item.date}</Text>
                  </View>
                  <View style={styles.orderDetailRow}>
                    <Ionicons name="time-outline" size={14} color="#666" />
                    <Text style={styles.orderDetailText}>{item.time}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.orderCardBottom}>
                <Text style={styles.orderPrice}>{item.price}</Text>
                <TouchableOpacity style={styles.detailButton}>
                  <Text style={styles.detailButtonText}>Lihat Butiran</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        {/* Butang Tindakan Pantas */}
        <TouchableOpacity style={styles.actionBanner} onPress={() => setBookingModalVisible(true)}>
          <View style={styles.actionBannerLeft}>
            <View style={styles.plusIconBox}>
              <Ionicons name="add" size={20} color="#0052CC" />
            </View>
            <View>
              <Text style={styles.actionBannerTitle}>Tempah Servis Baru</Text>
              <Text style={styles.actionBannerSub}>Pilih servis dan masa yang sesuai untuk anda</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#FFF" />
        </TouchableOpacity>

      </ScrollView>

      {/* Navigasi Bawah */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={22} color="#0052CC" />
          <Text style={[styles.navText, { color: '#0052CC', fontWeight: 'bold' }]}>Utama</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar-outline" size={22} color="#666" />
          <Text style={styles.navText}>Tempahan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemCenter} onPress={() => setBookingModalVisible(true)}>
          <View style={styles.navAddBtn}>
            <Ionicons name="add" size={28} color="#FFF" />
          </View>
          <Text style={styles.navTextCenter}>Tempah</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubble-outline" size={22} color="#666" />
          <Text style={styles.navText}>Mesej</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={22} color="#666" />
          <Text style={styles.navText}>Akaun</Text>
        </TouchableOpacity>
      </View>

      {/* ================= MODAL TEMPAHAN ================= */}
      <Modal animationType="slide" transparent={true} visible={bookingModalVisible} onRequestClose={() => setBookingModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.bookingCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Tempahan Servis Pembersihan</Text>
              <TouchableOpacity onPress={() => setBookingModalVisible(false)}>
                <Ionicons name="close-circle" size={28} color="#999" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
              
              <Text style={styles.fieldLabel}>1. Pilih Pakej Servis</Text>
              
              <TouchableOpacity style={[styles.packageBox, selectedPackage === 'basic' && styles.packageBoxActive]} onPress={() => setSelectedPackage('basic')}>
                <View style={styles.packageHeaderRow}>
                  <Text style={styles.packageName}>🟢 BASIC CLEAN</Text>
                  <Text style={styles.packagePrice}>RM120</Text>
                </View>
                <Text style={styles.packageDesc}>• 2 cleaners • 2 hours • Vacuum, Mop, Dusting, Kitchen & Bathroom basic</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.packageBox, selectedPackage === 'deep' && styles.packageBoxActive]} onPress={() => setSelectedPackage('deep')}>
                <View style={styles.packageHeaderRow}>
                  <Text style={styles.packageName}>🔵 DEEP CLEAN</Text>
                  <Text style={styles.packagePrice}>RM280</Text>
                </View>
                <Text style={styles.packageDesc}>• 2 cleaners • 4 hours • Semua Basic, Kitchen/Bathroom deep, Doors, Skirting</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.packageBox, selectedPackage === 'complete' && styles.packageBoxActive]} onPress={() => setSelectedPackage('complete')}>
                <View style={styles.packageHeaderRow}>
                  <Text style={styles.packageName}>🟣 COMPLETE HOME RESET</Text>
                  <Text style={styles.packagePrice}>RM450</Text>
                </View>
                <Text style={styles.packageDesc}>• 3 cleaners • 5 hours • Deep clean, Windows, Kitchen/Bathroom detailed, Balcony</Text>
              </TouchableOpacity>

              <Text style={styles.fieldLabel}>2. Pilih Tarikh Servis (Jun)</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
                {renderDates()}
              </ScrollView>

              <Text style={styles.fieldLabel}>3. Jenis Unit</Text>
              <View style={styles.unitTypeRow}>
                <TouchableOpacity style={[styles.unitBtn, unitType === 'Rumah' && styles.unitBtnActive]} onPress={() => setUnitType('Rumah')}>
                  <Ionicons name="home-outline" size={18} color={unitType === 'Rumah' ? '#0052CC' : '#666'} style={{ marginRight: 6 }} />
                  <Text style={[styles.unitBtnText, unitType === 'Rumah' && styles.unitBtnTextActive]}>Rumah</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.unitBtn, unitType === 'Pejabat' && styles.unitBtnActive]} onPress={() => setUnitType('Pejabat')}>
                  <Ionicons name="business-outline" size={18} color={unitType === 'Pejabat' ? '#0052CC' : '#666'} style={{ marginRight: 6 }} />
                  <Text style={[styles.unitBtnText, unitType === 'Pejabat' && styles.unitBtnTextActive]}>Pejabat</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.fieldLabel}>4. Tambahan (Add-on)</Text>
              <TouchableOpacity style={styles.addonCard} onPress={() => setIncludeEquipment(!includeEquipment)}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={[styles.checkboxBox, includeEquipment && styles.checkboxBoxActive]}>
                    {includeEquipment && <Ionicons name="checkmark" size={12} color="#FFF" />}
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.addonTitle}>Sediakan Peralatan Pembersihan</Text>
                    <Text style={styles.addonSub}>Pembersih membawa mesin vakum & bahan cuci</Text>
                  </View>
                </View>
                <Text style={styles.addonPrice}>+RM50</Text>
              </TouchableOpacity>

              <View style={styles.summaryContainer}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryTextLabel}>Jumlah Anggaran:</Text>
                  <Text style={styles.summaryTextPrice}>RM {calculateTotal()}</Text>
                </View>
                <TouchableOpacity style={styles.confirmBookingBtn} onPress={handleConfirmBooking}>
                  <Text style={styles.confirmBookingText}>Sahkan Tempahan Sekarang</Text>
                </TouchableOpacity>
              </View>

            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal Notifikasi */}
      {notifVisible && (
        <View style={styles.drawerOverlay}>
          <View style={styles.notifContainer}>
            <View style={styles.drawerHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="notifications" size={20} color="#0052CC" style={{ marginRight: 8 }} />
                <Text style={styles.drawerTitle}>Notifikasi & Baucar</Text>
              </View>
              <TouchableOpacity onPress={() => setNotifVisible(false)}>
                <Ionicons name="close-outline" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
              {notifications.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={[styles.notifCard, item.read && styles.notifRead]}
                  onPress={() => handleMarkAsRead(item.id)}
                >
                  <View style={styles.notifCardTop}>
                    <Text style={styles.notifTitle}>{item.title}</Text>
                    {!item.read && <View style={styles.unreadDot} />}
                  </View>
                  <Text style={styles.notifDesc}>{item.desc}</Text>
                  <Text style={styles.notifTime}>{item.time}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <TouchableOpacity style={styles.drawerBackdrop} activeOpacity={1} onPress={() => setNotifVisible(false)} />
        </View>
      )}

      {/* Menu Sisi (Drawer) */}
      {menuVisible && (
        <View style={styles.drawerOverlay}>
          <View style={styles.drawerContainer}>
            <View style={styles.drawerHeader}>
              <View>
                <Text style={styles.drawerTitle}>Menu Utama</Text>
                <Text style={styles.drawerUserSub}>Log masuk sebagai {userName}</Text>
              </View>
              <TouchableOpacity onPress={() => setMenuVisible(false)}>
                <Ionicons name="close-outline" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.drawerBody}>
              <TouchableOpacity style={styles.drawerItem} onPress={() => setMenuVisible(false)}>
                <Ionicons name="person-outline" size={20} color="#0052CC" style={styles.drawerIcon} />
                <Text style={styles.drawerText}>Profil Saya</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.drawerItem} onPress={() => setMenuVisible(false)}>
                <Ionicons name="calendar-outline" size={20} color="#0052CC" style={styles.drawerIcon} />
                <Text style={styles.drawerText}>Sejarah Tempahan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.drawerItem} onPress={() => setMenuVisible(false)}>
                <Ionicons name="gift-outline" size={20} color="#0052CC" style={styles.drawerIcon} />
                <Text style={styles.drawerText}>Pakej & Promosi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.drawerItem} onPress={() => setMenuVisible(false)}>
                <Ionicons name="help-circle-outline" size={20} color="#0052CC" style={styles.drawerIcon} />
                <Text style={styles.drawerText}>Bantuan & Sokongan</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.logoutButtonMenu} 
              onPress={() => {
                setMenuVisible(false);
                router.replace('/');
              }}
            >
              <Ionicons name="log-out-outline" size={20} color="#FF3B30" style={styles.drawerIcon} />
              <Text style={styles.logoutTextMenu}>Log Keluar</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.drawerBackdrop} activeOpacity={1} onPress={() => setMenuVisible(false)} />
        </View>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  menuIcon: { marginRight: 12 },
  greetingText: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A' },
  subGreetingText: { fontSize: 12, color: '#666' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  logoBox: { width: 36, height: 36, borderRadius: 8, backgroundColor: '#F0F4F8', justifyContent: 'center', alignItems: 'center', marginRight: 12, overflow: 'hidden' },
  logoImage: { width: 30, height: 30 },
  notificationBtn: { position: 'relative', padding: 4 },
  badge: { position: 'absolute', top: 2, right: 2, backgroundColor: '#FF3B30', width: 16, height: 16, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  scrollContent: { paddingBottom: 90, paddingHorizontal: 16, paddingTop: 12 },
  bannerContainer: { 
    backgroundColor: '#E8F1FC', 
    borderRadius: 16, 
    padding: 20, 
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#D0E2FF'
  },
  bannerTextContent: { width: '100%' },
  bannerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A' },
  bannerSubtitleHighlight: { fontSize: 20, fontWeight: 'bold', color: '#0052CC', marginBottom: 6 },
  bannerDesc: { fontSize: 13, color: '#555', marginBottom: 14, lineHeight: 18 },
  bannerButton: { backgroundColor: '#0052CC', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10, alignSelf: 'flex-start' },
  bannerButtonText: { color: '#FFF', fontSize: 13, fontWeight: '600' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A' },
  seeAllText: { fontSize: 13, color: '#0052CC', fontWeight: '600' },
  quickOrderScroll: { marginBottom: 20 },
  quickCard: { backgroundColor: '#FFF', width: 110, padding: 14, borderRadius: 14, marginRight: 12, alignItems: 'center', borderWidth: 1, borderColor: '#EAEAEA', position: 'relative' },
  quickCardActive: { borderColor: '#0052CC', backgroundColor: '#F4F8FF' },
  activeCheck: { position: 'absolute', top: 8, right: 8, backgroundColor: '#0052CC', width: 18, height: 18, borderRadius: 9, justifyContent: 'center', alignItems: 'center' },
  quickCardTitle: { fontSize: 13, fontWeight: '600', color: '#333', textAlign: 'center', marginTop: 10, marginBottom: 4 },
  quickCardSub: { fontSize: 11, color: '#888' },
  quickCardPrice: { fontSize: 13, fontWeight: 'bold', color: '#0052CC' },
  menuGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  menuItem: { alignItems: 'center', width: '23%' },
  menuIconBox: { width: 52, height: 52, borderRadius: 14, backgroundColor: '#F0F4F8', justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  menuLabel: { fontSize: 11, color: '#333', textAlign: 'center' },
  
  // Kotak kosong bila tiada tempahan
  emptyOrderBox: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderStyle: 'dashed'
  },
  emptyOrderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#64748B',
    marginTop: 10,
  },
  emptyOrderSub: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 4,
  },

  orderCard: { backgroundColor: '#FFF', borderRadius: 14, padding: 14, marginBottom: 20, borderWidth: 1, borderColor: '#EAEAEA' },
  orderCardTop: { flexDirection: 'row', marginBottom: 12 },
  orderImagePlaceholder: { width: 70, height: 70, borderRadius: 10, backgroundColor: '#DDD', marginRight: 12 },
  orderInfo: { flex: 1 },
  orderStatusRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  dotIndicator: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#0052CC', marginRight: 6 },
  statusText: { fontSize: 11, color: '#0052CC', fontWeight: '600', flex: 1 },
  orderId: { fontSize: 11, color: '#888' },
  orderServiceName: { fontSize: 15, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 6 },
  orderDetailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  orderDetailText: { fontSize: 12, color: '#666', marginLeft: 6 },
  orderCardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F0F0F0', paddingTop: 10 },
  orderPrice: { fontSize: 15, fontWeight: 'bold', color: '#1A1A1A' },
  detailButton: { borderWidth: 1, borderColor: '#0052CC', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 8 },
  detailButtonText: { color: '#0052CC', fontSize: 12, fontWeight: '600' },
  actionBanner: { backgroundColor: '#0052CC', borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  actionBannerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  plusIconBox: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  actionBannerTitle: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
  actionBannerSub: { color: '#E0E0E0', fontSize: 11, marginTop: 2 },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 65, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#EAEAEA', paddingBottom: 5 },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  navText: { fontSize: 10, color: '#666', marginTop: 2 },
  navItemCenter: { alignItems: 'center', justifyContent: 'center', flex: 1, top: -14 },
  navAddBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#0052CC', justifyContent: 'center', alignItems: 'center', shadowColor: '#0052CC', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 },
  navTextCenter: { fontSize: 10, color: '#0052CC', fontWeight: 'bold', marginTop: 2 },
  
  // Stail Modal Tempahan
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' },
  bookingCard: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: '88%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', paddingBottom: 10 },
  modalTitle: { fontSize: 17, fontWeight: 'bold', color: '#1A1A1A' },
  fieldLabel: { fontSize: 13, fontWeight: 'bold', color: '#333', marginTop: 12, marginBottom: 6 },
  packageBox: { backgroundColor: '#FAFAFA', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 10, padding: 12, marginBottom: 8 },
  packageBoxActive: { borderColor: '#0052CC', backgroundColor: '#F0F4FF' },
  packageHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  packageName: { fontSize: 13, fontWeight: 'bold', color: '#1A1A1A' },
  packagePrice: { fontSize: 14, fontWeight: 'bold', color: '#0052CC' },
  packageDesc: { fontSize: 11, color: '#666', lineHeight: 16 },
  dateBox: { width: 48, height: 58, borderRadius: 8, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center', marginRight: 6, borderWidth: 1, borderColor: '#E2E8F0' },
  dateDisabled: { backgroundColor: '#CBD5E1', opacity: 0.5 },
  dateSelected: { backgroundColor: '#0052CC', borderColor: '#0052CC' },
  dateTextNum: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  dateTextDisabled: { color: '#888' },
  dateTextMonth: { fontSize: 10, color: '#666' },
  dateTextNumSelected: { color: '#FFF' },
  unitTypeRow: { flexDirection: 'row', justifyContent: 'space-between' },
  unitBtn: { flex: 1, flexDirection: 'row', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center', justifyContent: 'center', marginRight: 6, backgroundColor: '#FAFAFA' },
  unitBtnActive: { borderColor: '#0052CC', backgroundColor: '#F0F4FF' },
  unitBtnText: { fontSize: 13, fontWeight: '600', color: '#666' },
  unitBtnTextActive: { color: '#0052CC' },
  addonCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FAFAFA', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 10, padding: 10 },
  checkboxBox: { width: 18, height: 18, borderRadius: 4, borderWidth: 2, borderColor: '#0052CC', justifyContent: 'center', alignItems: 'center' },
  checkboxBoxActive: { backgroundColor: '#0052CC' },
  addonTitle: { fontSize: 12, fontWeight: 'bold', color: '#1A1A1A' },
  addonSub: { fontSize: 10, color: '#666' },
  addonPrice: { fontSize: 13, fontWeight: 'bold', color: '#0052CC' },
  summaryContainer: { marginTop: 16, borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingTop: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  summaryTextLabel: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  summaryTextPrice: { fontSize: 18, fontWeight: 'bold', color: '#0052CC' },
  confirmBookingBtn: { backgroundColor: '#0052CC', borderRadius: 10, padding: 12, alignItems: 'center' },
  confirmBookingText: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },

  // Stail Drawer & Notifikasi
  drawerOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, flexDirection: 'row' },
  drawerContainer: { width: '75%', height: '100%', backgroundColor: '#FFFFFF', padding: 20, paddingTop: 50, justifyContent: 'space-between', zIndex: 1001 },
  notifContainer: { width: '85%', height: '100%', backgroundColor: '#FFFFFF', padding: 20, paddingTop: 50, zIndex: 1001, marginLeft: 'auto' },
  drawerBackdrop: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  drawerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', paddingBottom: 15 },
  drawerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },
  drawerUserSub: { fontSize: 12, color: '#666', marginTop: 2 },
  drawerBody: { flex: 1 },
  drawerItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F9F9F9' },
  drawerIcon: { marginRight: 15 },
  drawerText: { fontSize: 15, fontWeight: '500', color: '#333333' },
  logoutButtonMenu: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderTopWidth: 1, borderTopColor: '#EEEEEE', marginTop: 20 },
  logoutTextName: { fontSize: 15, fontWeight: 'bold', color: '#FF3B30' },
  logoutTextMenu: { fontSize: 15, fontWeight: 'bold', color: '#FF3B30' },
  notifCard: { backgroundColor: '#F8FAFC', padding: 14, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  notifRead: { backgroundColor: '#FFFFFF', opacity: 0.6 },
  notifCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  notifTitle: { fontSize: 14, fontWeight: 'bold', color: '#1A1A1A' },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF3B30' },
  notifDesc: { fontSize: 13, color: '#4B5563', lineHeight: 18, marginBottom: 8 },
  notifTime: { fontSize: 11, color: '#9CA3AF' }
});
