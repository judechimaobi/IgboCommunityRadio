import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Modal, ImageBackground, ActivityIndicator, Animated } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Sharing from 'expo-sharing';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';
import ShareModal from '../ShareModal/ShareModal';
import VolumeControl from './VolumeControl';










const RadioPlayer = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // Volume state (ranges from 0 to 1)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false); // Controls visibility of slider

  // Use the stream URL directly
  const AUDIO_URL = 'https://stream.zeno.fm/gk67zmdgfg8uv';

  const progress = useRef(new Animated.Value(0)).current;
  const simulateProgress = () => {
    let simulatedProgress = 0;
    const interval = setInterval(() => {
      simulatedProgress += 5;
      if (simulatedProgress >= 90) {
        clearInterval(interval);
      } else {
        Animated.timing(progress, {
          toValue: simulatedProgress,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    }, 2000);
  };

  const ProgressBar = () => {
    const width = progress.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
    });
  
    return (
      <View style={styles.progressBarBackground}>
        <Animated.View style={[styles.progressBarFill, { width }]} />
      </View>
    );
  };

  const loadAudio = async () => {
    progress.setValue(0);
    setLoading(true);
    simulateProgress();

    if (sound) {
      if (playing) {
        await stopSound();
      }
      await sound.unloadAsync();
      setSound(null);
    }

    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: AUDIO_URL },
        { shouldPlay: false, volume: 1.0 }
      );
      setSound(newSound);
  
      Animated.timing(progress, {
        toValue: 100,
        duration: 500,
        useNativeDriver: false,
      }).start();
      setLoading(false);
    } catch (error) {
      console.error('Error loading sound:', error);
      setLoading(false);
    }
  };
  

  const playSound = async () => {
    if (sound && !playing) {
      await sound.playAsync();
      setPlaying(true);
    }
  };

  const stopSound = async () => {
    if (sound && playing) {
      await sound.pauseAsync();
      setPlaying(false);
    }
  };

  const adjustVolume = async (value) => {
    if (sound) {
      await sound.setVolumeAsync(value);
      setVolume(value);
    }
  };

  const togglePlayPause = async () => {
    if (playing) {
      await stopSound();
    } else {
      await playSound();
    }
  };

  useEffect(() => {
    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  // Determine which volume icon to show based on the current volume level
  const getVolumeIcon = () => {
    if (volume === 0) {
      return 'volume-mute';
    } else if (volume <= 0.3) {
      return 'volume-down';
    } else {
      return 'volume-up';
    }
  };

  return (
    <>
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <ImageBackground source={require('../../assets/images/splash.png')} style={styles.imageContainer}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
            style={styles.imageGradient}
            locations={[0.5, 1]}
          >
            <View style={styles.interactionContainer}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('mailto:igbocommunityradio@gmail.com');
                }}
                style={styles.shareIcon}
              >
                <Icon name="envelope" size={30} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.shareIcon}
              >
                <Icon name="share" size={30} color="#fff" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
          <ShareModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </ImageBackground>
      </View>
      {
      loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#f1ab18" />
          <ProgressBar />
        </View>
      ) : (
        <>
          <View style={styles.audioMeta}>
            <Text style={styles.subtitle}>Live Radio</Text>
            <Text style={styles.title}>Igbo Community Radio</Text>
          </View>

          <View style={styles.audioSignal}>
            <Image 
              source={require('../../assets/images/sound-wave.png')} 
              style={{ width: '100%', height: '100%' }} 
            />
          </View>

          <View style={styles.audioController}>
            <TouchableOpacity style={styles.nextPrev} onPress={() => { setLoading(true); loadAudio() }}>
              <Icon name={'undo'} size={30} color="#b79b9a" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextPrev} disabled>
              <Icon name={'step-backward'} size={30} color="#333" />
            </TouchableOpacity>
            <LinearGradient
              colors={['#f1ab18', '#e47526']}
              style={styles.gradient}
            >
              <TouchableOpacity onPress={togglePlayPause} style={styles.playPauseButton}>
                <Icon name={playing ? 'pause' : 'play'} size={30} color="#fff" />
              </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity style={styles.nextPrev} disabled>
              <Icon name={'step-forward'} size={30} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.volumeIcon} onPress={() => {setShowVolumeSlider(!showVolumeSlider); console.log(showVolumeSlider)}}>
              <Icon name={getVolumeIcon()} size={30} color="#b79b9a" />
            </TouchableOpacity>
            {showVolumeSlider && (
              <View style={styles.volumeSliderContainer}>
                <Slider
                  style={styles.volumeSlider}
                  minimumValue={0}
                  maximumValue={1}
                  value={volume}
                  onValueChange={adjustVolume}
                  minimumTrackTintColor="#f1ab18"
                  maximumTrackTintColor="#e47526"
                  thumbTintColor="#f1ab18"
                  trackStyle={styles.trackStyle}  // Custom track style
                  thumbStyle={styles.thumbStyle}  // Custom thumb style
                />
              </View>
            )}
          </View> 
        </>
      )
      }
    </View>
    </>
  );
};


  
          


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    marginBottom: 100,
  },
  imageWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 20,
    margin: 10,
  },
  imageContainer: {
    width: 300,
    height: 400,
  },
  imageGradient: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  audioMeta: {
    width: '60%'
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    color: '#fff',
    fontWeight: '900'
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#90848b'
  },
  audioSignal: {
    width: '80%',
    height: 100,
  },
  loadingContainer: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  loadingGif: {
    width: 200,
    height: 200,
  },

  audioController: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    color: '#fff',
    alignItems: 'center',
    paddingVertical: 20,
  },

  nextPrev: {
    
  },

  gradient: {
    borderRadius: 50,
  },
  playPauseButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    textAlign: 'center',
  },





  interactionContainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom: 20,
    gap: 20,
  },
  shareIcon: {
    
  },
  volumeIcon: {

  },
  volumeSliderContainer: {
    position: 'absolute',
    bottom: 100,
    right: -3,
    height: 'auto',
    // backgroundColor: 'rgba(241, 171, 24, .08)',
    backgroundColor: 'rgba(255, 255, 255, .08)',
    borderColor: 'rgba(255, 255, 255, .3)',
    borderWidth: .4,
    paddingLeft: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
    transform: [{ rotate: '-90deg' }],
  },
  volumeSlider: {
    width: 150,
    height: 50,
    // transform: [{ rotate: '-90deg' }],
  },
  volumeLabel: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  trackStyle: {
    height: 5,
    borderRadius: 7.5,
    // backgroundColor: '#e47526',
    backgroundColor: 'red',
  },
  thumbStyle: {
    // width: 30,
    // height: 80,
    // borderRadius: 15,
    // backgroundColor: '#f1ab18',
    // backgroundColor: 'blue',
  },
  progressBarBackground: {
    width: '80%',
    height: 10,
    backgroundColor: '#90848b',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#f1ab18',
    borderRadius: 5,
  },
});

export default RadioPlayer;
