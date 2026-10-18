import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, TextInput, ScrollView, SafeAreaView } from 'react-native';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [statusLog, setStatusLog] = useState('Ёвари овозӣ омода аст...');

  // 1. Кушодани YouTube
  const openYouTubeSearch = (query) => {
    const searchQuery = query || 'киноҳои нав';
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
    setStatusLog(`🎬 YouTube кушода шуд: "${searchQuery}"`);
    Linking.openURL(url);
  };

  // 2. Кушодани Google
  const openGoogleSearch = (query) => {
    const searchQuery = query || 'اخбор';
    const url = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    setStatusLog(`🔍 Google кушода шуд: "${searchQuery}"`);
    Linking.openURL(url);
  };

  // 3. Функсияи эҷоди эълон дар Somon.tj бо ном ва нархи муайян
  const createSomonAd = (itemName, itemPrice) => {
    const title = encodeURIComponent(itemName || 'Молу ашё');
    const price = encodeURIComponent(itemPrice || '1000');
    // Гузариш ба сомонаи Somon.tj бо маълумоти пешакӣ тайёршуда
    const url = `https://www.somon.tj/adds/q/${title}/?price[min]=${price}`;
    setStatusLog(`📋 Эълон дар Somon.tj сохта шуд: ${itemName} - ${itemPrice} сомонӣ`);
    Linking.openURL(url);
  };

  // Таҳлили фармонҳои корбар
  const handleCommand = (command) => {
    const lower = command.toLowerCase();

    if (lower.includes('ютуб') || lower.includes('youtube')) {
      const q = lower.replace('ютуб', '').replace('youtube', '').trim();
      openYouTubeSearch(q);
    } else if (lower.includes('гугл') || lower.includes('google')) {
      const q = lower.replace('гугл', '').replace('google', '').trim();
      openGoogleSearch(q);
    } else if (lower.includes('сомон') || lower.includes('эълон')) {
      // Намуна: "сомон тч эълон телефон нархаш 1000"
      createSomonAd('Телефон ва молу ашё', '1000');
    } else {
      openGoogleSearch(command);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Сарлавҳа */}
        <Text style={styles.title}>🤖 Siri Pro / Ҷарвис</Text>
        <Text style={styles.subtitle}>Ёвари интеллектуалии шумо</Text>

        {/* Қуттии ҳолат (Log) */}
        <View style={styles.logBox}>
          <Text style={styles.logText}>{statusLog}</Text>
        </View>

        {/* Майдони ворид кардани фармон */}
        <TextInput
          style={styles.input}
          placeholder="Масалан: Ютуб кинои нав..."
          placeholderTextColor="#777"
          value={inputText}
          onChangeText={setInputText}
        />

        {/* Тугмаи иҷрои фармони матнӣ */}
        <TouchableOpacity 
          style={styles.mainButton} 
          onPress={() => handleCommand(inputText)}
        >
          <Text style={styles.buttonText}>⚡️ Иҷрои фармон</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Тугмаҳои тез (Quick Buttons) */}
        <TouchableOpacity 
          style={[styles.actionButton, styles.somonButton]} 
          onPress={() => createSomonAd('Мондани эълон', '1000')}
        >
          <Text style={styles.buttonText}>📋 Сомон.tj (Эълон: 1000 сом)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.youtubeButton]} 
          onPress={() => openYouTubeSearch('Филмҳои тоҷикӣ')}
        >
          <Text style={styles.buttonText}>🎬 Кушодани YouTube</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.googleButton]} 
          onPress={() => openGoogleSearch('Янгиликлар')}
        >
          <Text style={styles.buttonText}>🔍 Кушодани Google</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0c',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00e676',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
  },
  logBox: {
    width: '100%',
    backgroundColor: '#141419',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#222',
    marginBottom: 20,
    minHeight: 60,
    justifyContent: 'center',
  },
  logText: {
    color: '#00ffcc',
    fontSize: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: '#16161c',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },
  mainButton: {
    backgroundColor: '#00e676',
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 25,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#222',
    marginBottom: 20,
  },
  actionButton: {
    paddingVertical: 15,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  somonButton: {
    backgroundColor: '#ff9800',
  },
  youtubeButton: {
    backgroundColor: '#ff0033',
  },
  googleButton: {
    backgroundColor: '#2979ff',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});