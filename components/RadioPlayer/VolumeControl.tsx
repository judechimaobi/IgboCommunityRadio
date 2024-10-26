import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SystemSetting from 'react-native-system-setting';
import Slider from '@react-native-community/slider';

const VolumeControl = () => {
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    // Get the initial volume
    SystemSetting.getVolume().then((initialVolume) => {
      if (initialVolume !== null) {
        setVolume(initialVolume);
      }
    }).catch((err) => console.error('Error fetching volume:', err));

    // Listen to volume changes made outside of the app
    const volumeListener = SystemSetting.addVolumeListener((data) => {
      const { value } = data;
      setVolume(value);
    });

    return () => {
      // Clean up the volume listener
      SystemSetting.removeListener(volumeListener);
    };
  }, []);

  const changeVolume = (value) => {
    setVolume(value);
    SystemSetting.setVolume(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.volumeLabel}>Device Volume: {Math.round(volume * 100)}%</Text>
      <Slider
        style={styles.volumeSlider}
        minimumValue={0}
        maximumValue={1}
        value={volume}
        onValueChange={changeVolume}
        minimumTrackTintColor="#f1ab18"
        maximumTrackTintColor="#e47526"
        thumbTintColor="#f1ab18"
      />
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//   },
//   volumeSlider: {
//     width: 150,
//     height: 50,
//     transform: [{ rotate: '-90deg' }],
//   },
//   volumeLabel: {
//     color: '#fff',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
// });

// export default VolumeControl;


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 50,
		bottom: 120,
		right: 20,
  },
  volumeSlider: {
    width: 150,
    height: 50,
    transform: [{ rotate: '-90deg' }],
  },
  volumeLabel: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  trackStyle: {
    height: 15,
    borderRadius: 7.5,
  },
  thumbStyle: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default VolumeControl;
