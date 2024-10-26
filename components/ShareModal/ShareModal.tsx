import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Sharing from 'expo-sharing';
import * as Linking from 'expo-linking';
import { ScrollView } from 'react-native-gesture-handler';

const ShareModal = ({ modalVisible, setModalVisible }) => {

	const AUDIO_URL = 'https://stream.zeno.fm/gk67zmdgfg8uv';

	const shareLink = async (platform) => {
		const message = "Hey there, Listen with me on Igbo Community Radio! " + AUDIO_URL;
		
		let url;
		switch (platform) {
			case 'whatsapp':
			url = `whatsapp://send?text=${encodeURIComponent(message)}`;
			break;
			case 'facebook':
			url = `fb://facewebmodal/f?href=https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(message)}`;
			break;
			case 'twitter':
			url = `twitter://post?message=${encodeURIComponent(message)}`;
			break;
			case 'instagram':
			url = `instagram://camera`;
			break;
			case 'tiktok':
			url = `https://www.tiktok.com/upload?caption=${encodeURIComponent(message)}`;
			break;
			case 'youtube':
			url = `https://www.youtube.com/`;
			break;
			default:
			console.warn('Platform not supported');
			return;
		}
		
		// Attempt to open the URL in the respective app
		const supported = await Linking.canOpenURL(url);
		if (supported) {
			await Linking.openURL(url);
		} else {
			alert(`Please install the ${platform.charAt(0).toUpperCase() + platform.slice(1)} app to share.`);
		}
  };

  return (
    <Modal
			visible={modalVisible}
			animationType="slide"
			transparent={true}
			onRequestClose={() => setModalVisible(false)}
    >
			<TouchableOpacity 
				style={styles.modalBackdrop} 
				onPress={() => setModalVisible(false)} 
				activeOpacity={1}
			/>

			<View style={styles.modalContainer}>
				<Text style={styles.modalTitle}>Share</Text>
				<ScrollView
					style={styles.iconListContainer}
					scrollEventThrottle={16}
					pagingEnabled={true}
					horizontal
					showsHorizontalScrollIndicator={false}
					bounces={false}
					decelerationRate="fast"
					snapToInterval={300}
					snapToAlignment="center"
				>
					<TouchableOpacity onPress={shareLink} style={styles.socialIconBtn}>
						<Icon name="copy" size={70} color="#0f0b09" />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => shareLink("whatsapp")} style={styles.socialIconBtn}>
						<Icon name="whatsapp" size={70} color="#128C7E" style={styles.socialIcon} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => shareLink("facebook")} style={styles.socialIconBtn}>
						<Icon name="facebook" size={70} color="#4267B2" style={styles.socialIcon} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => shareLink("twitter")} style={styles.socialIconBtn}>
						<Icon name="twitter" size={70} color="#1DA1F2" style={styles.socialIcon} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => shareLink("tiktok")} style={styles.socialIconBtn}>
						<Icon name="tiktok" size={70} color="#ff0050" style={styles.socialIcon} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => shareLink("instagram")} style={styles.socialIconBtn}>
						<Icon name="instagram" size={70} color="#C13584" style={styles.socialIcon} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => shareLink("youtube")} style={styles.socialIconBtn}>
						<Icon name="youtube" size={70} color="#FF0000" style={styles.socialIcon} />
					</TouchableOpacity>
				</ScrollView>
				<View style={styles.messagePromptBox}>
					<Text style={styles.messagePromptTitle}>Invite your friend to listen...</Text>
					<Text style={styles.messagePrompt}>Hey there, Listen with me on Igbo Community Radio</Text>
				</View>
			</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 'auto',
		padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
	modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
	modalTitle: {
		textAlign: 'center',
		fontSize: 22,
		fontWeight: '900',
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
		paddingBottom: 20,
	},
  iconListContainer: {
		alignContent: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
		// height: 'auto',
  },
	socialIconBtn: {
		justifyContent: 'center',
		textAlign: 'center',
		marginRight: 20,
		// backgroundColor: 'red',
		height:100,
	},
	socialIcon: {

	},
	messagePromptBox: {
		backgroundColor: '#f8f8f8',
		borderRadius: 10,
		paddingHorizontal: 20,
		paddingBottom: 20,
		borderWidth: .5,
		borderColor: '#ddd'
	},
	messagePromptTitle: {
		textAlign: 'center',
		fontSize: 18,
		fontStyle: 'italic',
		fontWeight: '900',
		padding: 10,
	},
	messagePrompt: {
		padding: 10,
		backgroundColor: '#eee',
		borderRadius: 10,
		color: '#666',
		fontSize: 14,
		textAlign: 'center',
	},
});

export default ShareModal;
