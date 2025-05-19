import { Audio } from 'expo-av';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const playSound = async (file: any) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(file);
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível reproduzir o som.');
    }
  };

  const resetSounds = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
      }
      Alert.alert('Reiniciado', 'Os sons foram reiniciados!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível reiniciar os sons.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Andreo Henrique Ramos Leite</Text>
        <Text style={styles.headerSubtitle}>RA: G04DIH6</Text>
        <View style={styles.divider} />
      </View>

      {/* Quadrado */}
      <TouchableOpacity
        style={[styles.shape, styles.square]}
        onPress={() => playSound(require('../../assets/square.mp3'))}
      >
        <Text style={styles.text}>Quadrado</Text>
      </TouchableOpacity>

      {/* Triângulo */}
      <View style={styles.triangleContainer}>
        <TouchableOpacity
          style={styles.triangle}
          onPress={() => playSound(require('../../assets/triangle.mp3'))}
        />
        <Text style={styles.text}>Triângulo</Text>
      </View>

      {/* Círculo */}
      <TouchableOpacity
        style={[styles.shape, styles.circle]}
        onPress={() => playSound(require('../../assets/circle.mp3'))}
      >
        <Text style={styles.text}>Círculo</Text>
      </TouchableOpacity>

      {/* Botão Reiniciar */}
      <TouchableOpacity style={styles.resetButton} onPress={resetSounds}>
        <Text style={styles.resetButtonText}>Reiniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 10,
    marginBottom: 20,
  },
  shape: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  square: {
    backgroundColor: '#82c7ff',
  },
  circle: {
    backgroundColor: '#ff6b6b',
    borderRadius: 60,
  },
  triangleContainer: {
    alignItems: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 60,
    borderRightWidth: 60,
    borderBottomWidth: 100,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#8ee5a1',
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    textShadowColor: 'rgba(255, 255, 255, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: '#c9a3ff',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: '#8e7cc3',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    elevation: 6,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});