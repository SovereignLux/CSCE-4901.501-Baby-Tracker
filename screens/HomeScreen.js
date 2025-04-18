import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const [profiles, setProfiles] = useState([
    {
      name: 'Baby Luna',
      image: null, 
    }
  ]);

  useEffect(() => {
    if (isFocused && route.params?.newProfile) {
      setProfiles(prev => [...prev, route.params.newProfile]);
      navigation.setParams({ newProfile: null });
    }
  }, [isFocused, route.params]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Welcome to Baby Tracker</Text>
        <Text style={styles.subtitle}>Select a profile</Text>

        <View style={styles.profileList}>
          {profiles.map((profile, index) => (
            <TouchableOpacity
              key={index}
              style={styles.profileBubble}
              onPress={() => navigation.navigate('ChildDashboard', { name: profile.name })}
            >
              {profile.image ? (
                <Image source={{ uri: profile.image }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatar}>👶</Text>
              )}
              <Text style={styles.profileText}>{profile.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Buttons */}
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.buttonText}>✏️ Edit Profiles</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddChild')}>
          <Text style={styles.buttonText}>➕ Add Child</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
    backgroundColor: '#E3F2FD',
  },
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  settingsIcon: {
    fontSize: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#444',
    textAlign: 'center',
    marginTop: 5,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  profileList: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  profileBubble: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fffbe6',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  avatar: {
    fontSize: 28,
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
  },
  editButton: {
    backgroundColor: '#ffeaa7',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#eaffd0',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
