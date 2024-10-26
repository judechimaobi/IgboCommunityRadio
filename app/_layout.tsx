import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import * as Linking from 'expo-linking';

const CustomDrawerContent = (props) => {
  const isActive = () => {
    
    return props.navigation.isFocused();
  };
  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <ImageBackground source={require('../assets/images/header-image.png')} style={styles.imageContainer}>
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()} style={styles.closerDrawerBtn}>
            <AntDesignIcon name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      {/* Drawer Items with active/inactive state handling */}
      <TouchableOpacity
        onPress={() => props.navigation.navigate('index')}
        style={[styles.drawerItem, isActive() && styles.activeDrawerItem]}
      >
        <EntypoIcon name="radio" size={30} color="#fff" />
        <Text style={[styles.drawerItemLabel, isActive() && styles.activeDrawerItemLabel]}>Now playing</Text>
      </TouchableOpacity>

      <View style={styles.drawerTitleBox}>
        <Text style={styles.drawerTitle}>Connect with Ohaneze Ndi Igbo</Text>
      </View>

      <TouchableOpacity 
        style={styles.drawerItem} 
        onPress={() => Linking.openURL('https://www.facebook.com/groups/2517839958360651')}
      >
        <Icon name="facebook" size={30} color="#fff" />
        <Text style={styles.drawerItemLabel}>Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.drawerItem} 
        onPress={() => Linking.openURL('https://twitter.com/igbocomunityrad')}
      >
        <Icon name="twitter" size={30} color="#fff" />
        <Text style={styles.drawerItemLabel}>Twitter</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.drawerItem} 
        onPress={() => Linking.openURL('https://www.instagram.com/igbocommunityradio')}
      >
        <Icon name="instagram" size={30} color="#fff" />
        <Text style={styles.drawerItemLabel}>Instagram</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.drawerItem} 
        onPress={() => Linking.openURL('https://www.youtube.com/channel/UCuXF-PEWofpxIRvZAJ94png')}
      >
        <Icon name="youtube" size={30} color="#fff" />
        <Text style={styles.drawerItemLabel}>YouTube</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity 
        style={styles.drawerItem} 
        onPress={() => Linking.openURL('https://www.tiktok.com/share?url=https://igbocommunityradio.com')}
      >
        <Icon name="tiktok" size={30} color="#fff" />
        <Text style={styles.drawerItemLabel}>Tiktok</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerStyle: { backgroundColor: '#0f0b09' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 14 },
          drawerStyle: {
            backgroundColor: '#0f0b09',
            width: 300,
          },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Radio Player',
            title: 'Now Playing', // Title in the header
          }}
        />
        </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#0f0b09',
  },
  drawerHeader: {
    backgroundColor: '#0f0b09',
    height: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    height: '100%',
    width: '100%',
  },
  closerDrawerBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  drawerTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: .5,
    borderBottomColor: '#90848b',
    marginVertical: 10,
  },
  drawerTitle: {
    fontSize: 14,
    color: '#90848b',
    fontStyle: 'italic',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
  },
  drawerItemLabel: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 20,
  },
  activeDrawerItem: {
    backgroundColor: '#26140d',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  activeDrawerItemLabel: {
    fontWeight: 'bold'
  }
});
