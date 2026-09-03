import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  SafeAreaView 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function IndexScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* 1. HEADER ATAS */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu-outline" size={26} color="#1A1A1A" />
        </TouchableOpacity>
        
        <View style={styles.userInfo}>
          <Text style={styles.greeting}>Hai, Aina 👋</Text>
          <Text style={styles.subGreeting}>Selamat datang kembali!</Text>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.logoSmallBox}>
            <Image 
              source={require('../assets/23FFA459-E9E2-4192-A51B-734...png')} 
              style={styles.logoSmall} 
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications-outline" size={22} color="#1A1A1A" />
            <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* 2. BANNER PROMOSI UTAMA */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerTextContent}>
            <Text style={styles.bannerTitle}>Bersih Menyeluruh,</Text>
            <Text style={styles.bannerTitleHighlight}>Hidup Lebih Segar</Text>
            <Text style={styles.bannerDesc}>Perkhidmatan cleaning profesional untuk rumah, pejabat & karpet.</Text>
            
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Tempah Sekarang</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. TEMPAHAN PANTAS (QUICK SERVICES) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tempahan Pantas</Text>
          <TouchableOpacity>
            <Text style={styles.lihatSemua}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.servicesScroll}>
          {/* Kad 1: Cleaning Rumah */}
          <View style={[styles.serviceCard, styles.serviceCardActive]}>
            <View style={styles.cardCheck}>
              <Ionicons name="checkmark-circle" size={18} color="#0052CC" />
            </View>
            <View style={styles.serviceIconBox}>
              <FontAwesome5 name="home" size={24} color="#0052CC" />
            </View>
            <Text style={styles.serviceName}>Cleaning Rumah</Text>
            <Text style={styles.servicePriceLabel}>Dari</Text>
            <Text style={styles.servicePrice}>RM 120</Text>
          </View>

          {/* Kad 2: Cleaning Pejabat */}
          <View style={styles.serviceCard}>
            <View style={styles.serviceIconBox}>
              <FontAwesome5 name="building" size={24} color="#0052CC" />
            </View>
            <Text style={styles.serviceName}>Cleaning Pejabat</Text>
            <Text style={styles.servicePriceLabel}>Dari</Text>
            <Text style={styles.servicePrice}>RM 200</Text>
          </View>

          {/* Kad 3: Cleaning Karpet */}
          <View style={styles.serviceCard}>
            <View style={styles.serviceIconBox}>
              <MaterialCommunityIcons name="rug" size={26} color="#0052CC" />
            </View>
            <Text style={styles.serviceName}>Cleaning Karpet</Text>
            <Text style={styles.servicePriceLabel}>Dari</Text>
            <Text style={styles.servicePrice}>RM 60</Text>
          </View>
        </ScrollView>

        {/* 4. MENU PINTAS (GRID 4 MENU) */}
        <View style={styles.menuGrid}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBox}><Ionicons name="calendar-outline" size={22} color="#0052CC" /></View>
            <Text style={styles.menuText}>Tempahan Saya</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBox}><Ionicons name="wallet-outline" size={22} color="#0052CC" /></View>
            <Text style={styles.menuText}>Pakej & Promosi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBox}><Ionicons name="document-text-outline" size={22} color="#0052CC" /></View>
            <Text style={styles.menuText}>Sejarah Tempahan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBox}><Ionicons name="headset-outline" size={22} color="#0052CC" /></View>
            <Text style={styles.menuText}>Bantuan & Sokongan</Text>
          </TouchableOpacity>
        </View>

        {/* 5. BAHAGIAN TEMPAHAN SAYA */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tempahan Saya</Text>
          <TouchableOpacity>
            <Text style={styles.lihatSemua}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bookingCard}>
          <View style={styles.bookingTopRow}>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Akan Datang</Text>
            </View>
            <Text style={styles.bookingId}>#CPR2505261</Text>
          </View>

          <View style={styles.bookingMainInfo}>
            <View style={styles.bookingImgBox}>
              {/* Anda boleh letak gambar contoh servis di sini */}
              <Ionicons name="home" size={24} color="#0052CC" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.bookingTitle}>Cleaning Rumah</Text>
              <View style={styles.bookingDetailRow}>
                <Ionicons name="calendar-outline" size={14} color="#666" />
                <Text style={styles.bookingDetailText}>25 Mei 2026 (Sabtu)</Text>
              </View>
              <View style={styles.bookingDetailRow}>
                <Ionicons name="time-outline" size={14} color="#666" />
                <Text style={styles.bookingDetailText}>10:00 AM - 1:00 PM</Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.bookingPrice}>RM 150</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.detailButton}>
            <Text style={styles.detailButtonText}>Lihat Butiran</Text>
          </TouchableOpacity>
        </View>

        {/* Butang Tindakan Bawah Banner */}
        <TouchableOpacity style={styles.actionBannerButton}>
          <View style={styles.actionPlusBox}>
            <Ionicons name="add" size={20} color="#0052CC" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.actionBtnTitle}>Tempah Servis Baru</Text>
            <Text style={styles.actionBtnSub}>Pilih servis dan masa yang sesuai untuk anda</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>

      </ScrollView>

      {/* 6. BOTTOM NAVIGATION BAR */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={22} color="#0052CC" />
          <Text style={[styles.navText, { color: '#0052CC' }]}>Utama</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar-outline" size={22} color="#666" />
          <Text style={styles.navText}>Tempahan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navCenterBtn}>
          <Ionicons name="add" size={28} color="#FFFFFF" />
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
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  greeting: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  subGreeting: {
    fontSize: 12,
    color: '#666666',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoSmallBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#EBF3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    overflow: 'hidden',
  },
  logoSmall: {
    width: 28,
    height: 28,
  },
  notificationBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#0052CC',
    width: 14,
    height: 14,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 9,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  bannerContainer: {
    backgroundColor: '#E8F1FC',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#D4E5FF',
  },
  bannerTextContent: {
    width: '100%',
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  bannerTitleHighlight: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0052CC',
    marginBottom: 8,
  },
  bannerDesc: {
    fontSize: 13,
    color: '#555555',
    marginBottom: 16,
    lineHeight: 18,
  },
  bannerButton: {
    backgroundColor: '#0052CC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  lihatSemua: {
    fontSize: 13,
    color: '#0052CC',
    fontWeight: '600',
  },
  servicesScroll: {
    marginBottom: 24,
  },
  serviceCard: {
    width: 110,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    position: 'relative',
  },
  serviceCardActive: {
    borderColor: '#0052CC',
    backgroundColor: '#F4F8FF',
  },
  cardCheck: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  serviceIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EBF3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 4,
  },
  serviceName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 8,
    height: 32,
  },
  servicePriceLabel: {
    fontSize: 10,
    color: '#888888',
  },
  servicePrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0052CC',
  },
  menuGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  menuItem: {
    alignItems: 'center',
    width: '22%',
  },
  menuIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F0F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  menuText: {
    fontSize: 10,
    color: '#333333',
    textAlign: 'center',
    fontWeight: '500',
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  bookingTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF3FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0052CC',
    marginRight: 6,
  },
  statusText: {
    fontSize: 11,
    color: '#0052CC',
    fontWeight: '600',
  },
  bookingId: {
    fontSize: 11,
    color: '#888888',
    fontWeight: '600',
  },
  bookingMainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  bookingImgBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#EBF3FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookingTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  bookingDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  bookingDetailText: {
    fontSize: 11,
    color: '#666666',
    marginLeft: 6,
  },
  bookingPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0052CC',
  },
  detailButton: {
    borderWidth: 1,
    borderColor: '#0052CC',
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  detailButtonText: {
    color: '#0052CC',
    fontSize: 13,
    fontWeight: '600',
  },
  actionBannerButton: {
    backgroundColor: '#0052CC',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  actionPlusBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  actionBtnSub: {
    color: '#D4E5FF',
    fontSize: 10,
    marginTop: 2,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 10,
    color: '#666666',
    marginTop: 2,
  },
  navCenterBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0052CC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#0052CC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
