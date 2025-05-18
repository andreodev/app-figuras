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
    backgroundColor: '#82c7ff', // azul claro
  },
  circle: {
    backgroundColor: '#ff6b6b', // vermelho coral
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
    borderBottomColor: '#8ee5a1', // verde menta
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
    marginTop: 50,
    backgroundColor: '#c9a3ff', // lilás suave
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
