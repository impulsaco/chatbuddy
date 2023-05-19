import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import Close from '@app/assets/close.svg';

const PAGE_HEIGHT = Dimensions.get('window').height;
const PAGE_WIDTH = Dimensions.get('window').width;

const InstructionsModal = ({ isVisible, onClose, text }) => {

    return (
        <Modal 
            isVisible={isVisible}
            backdropColor="#143e66"
            backdropOpacity={0.8}
            style={styles.modal}
        >
            <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Close width={24} height={24} />
            </TouchableOpacity>
            <Text style={styles.text}>{text}</Text>
            <TouchableOpacity style={styles.acceptButton} onPress={onClose}>
                <Text style={styles.acceptButtonText}>Ok!</Text>
            </TouchableOpacity>
            </View>
        </Modal>
    )
  
};


const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
      },
      container: {
        width: PAGE_WIDTH * 0.8,  
        maxHeight: PAGE_HEIGHT * 0.8, 
        backgroundColor: '#3499FE',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
      },
  closeButton: {
    alignSelf: 'flex-end',
  },
  text: {
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 18,
  },
  acceptButton: {
    backgroundColor: '#143e66',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  acceptButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default InstructionsModal;
