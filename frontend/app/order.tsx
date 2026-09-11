import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function OrderScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Mengambil nama yang digunakan semasa log masuk, jika tiada guna 'Pengguna'
  const userName = params.name || 'Pengguna';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header Utama */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.menuIcon}>
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
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
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
            <TouchableOpacity style={styles.bannerButton}>
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
          <View style={[styles.quickCard, styles.quickCardActive]}>
            <View style={styles.activeCheck}>
              <Ionicons name="checkmark" size={12} color="#FFF" />
            </View>
            <MaterialCommunityIcons name="home-outline" size={36} color="#0052CC" />
            <Text style={styles.quickCardTitle}>Cleaning Rumah</Text>
            <Text style={styles.quickCardSub}>Dari</Text>
            <Text style={styles.quickCardPrice}>RM 120</Text>
          </View>

          <View style={styles.quickCard}>
            <MaterialCommunityIcons name="office-building-outline" size={36} color="#333" />
            <Text style={styles.quickCardTitle}>Cleaning Pejabat</Text>
            <Text style={styles.quickCardSub}>Dari</Text>
            <Text style={styles.quickCardPrice}>RM 200</Text>
          </View>

          <View style={styles.quickCard}>
            <MaterialCommunityIcons name="rug" size={36} color="#333" />
            <Text style={styles.quickCardTitle}>Cleaning Karpet</Text>
            <Text style={styles.quickCardSub}>Dari</Text>
            <Text style={styles.quickCardPrice}>RM 60</Text>
          </View>

          <View style={styles.quickCard}>
            <MaterialCommunityIcons name="star-sparkles" size={36} color="#333" />
            <Text style={styles.quickCardTitle}>Pembersihan Mendalam</Text>
            <Text style={styles.quickCardSub}>Dari</Text>
            <Text style={styles.quickCardPrice}>RM 180</Text>
          </View>
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

        {/* Senarai Tempahan Saya */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tempahan Saya</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Lihat Semua &gt;</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.orderCard}>
          <View style={styles.orderCardTop}>
            <View style={styles.orderImagePlaceholder} />
            <View style={styles.orderInfo}>
              <View style={styles.orderStatusRow}>
                <View style={styles.dotIndicator} />
                <Text style={styles.statusText}>Akan Datang</Text>
                <Text style={styles.orderId}>#CPR2505261</Text>
              </View>
              <Text style={styles.orderServiceName}>Cleaning Rumah</Text>
              <View style={styles.orderDetailRow}>
                <Ionicons name="calendar-outline" size={14} color="#666" />
                <Text style={styles.orderDetailText}>25 Mei 2026 (Sabtu)</Text>
              </View>
              <View style={styles.orderDetailRow}>
                <Ionicons name="time-outline" size={14} color="#666" />
                <Text style={styles.orderDetailText}>10:00 AM - 1:00 PM</Text>
              </View>
            </View>
          </View>
          <View style={styles.orderCardBottom}>
            <Text style={styles.orderPrice}>RM 150</Text>
            <TouchableOpacity style={styles.detailButton}>
              <Text style={styles.detailButtonText}>Lihat Butiran</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Butang Tindakan Pantas */}
        <TouchableOpacity style={styles.actionBanner}>
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

      {/* Navigasi Bawah (Bottom Navigation) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={22} color="#0052CC" />
          <Text style={[styles.navText, { color: '#0052CC', fontWeight: 'bold' }]}>Utama</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar-outline" size={22} color="#666" />
          <Text style={styles.navText}>Tempahan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemCenter}>
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
  badge: { position: 'absolute', top: 2, right: 2, backgroundColor: '#0052CC', width: 16, height: 16, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
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
  navTextCenter: { fontSize: 10, color: '#0052CC', fontWeight: 'bold', marginTop: 2 }
});
