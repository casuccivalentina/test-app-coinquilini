// ProfileImageModal.js
import { Animated, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

type Props = {
  visible: boolean;
  fadeAnim: any;
  slideAnim: any;
  onClose: () => void;
  onTakePhoto: () => void;
  onPickFromGallery: () => void;
  onDeletePhoto: () => void;
};

export default function ProfileImageModal({ visible, fadeAnim, slideAnim, onClose, onTakePhoto, onPickFromGallery, onDeletePhoto }: Props) {
    return (
        <Modal transparent visible={visible} animationType="none">
            <TouchableWithoutFeedback onPress={onClose}>
                <Animated.View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        opacity: fadeAnim,
                        justifyContent: 'flex-end',
                        paddingHorizontal: 20,
                    }}
                >
                    <TouchableWithoutFeedback>
                        <Animated.View
                            style={{
                                backgroundColor: '#fff',
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                paddingVertical: 25,
                                paddingHorizontal: 20,
                                transform: [{ translateY: slideAnim }],
                            }}
                        >
                            <Text style={{ fontSize: 20, fontWeight: '500', color:'rgba(0,0,0,0.6)', textAlign: 'center', marginBottom: 20 }}>
                                Cambia immagine
                            </Text>

                            <TouchableOpacity onPress={onTakePhoto} style={{ paddingVertical: 15 }}>
                                <Text style={{ fontSize: 18, color: '#007aff', textAlign: 'center' }}>Scatta una foto</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={onPickFromGallery} style={{ paddingVertical: 15 }}>
                                <Text style={{ fontSize: 18, color: '#007aff', textAlign: 'center' }}>Scegli dalla galleria</Text>
                            </TouchableOpacity>

                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <TouchableOpacity onPress={onDeletePhoto} style={{ paddingVertical: 15, margin:'auto', width:'50%'}}>
                                    <Text style={{ fontSize: 18, color: 'red', textAlign: 'center' }}>Elimina foto</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={onClose} style={{ paddingVertical: 15, margin:'auto', width:'50%'}}>
                                    <Text style={{ fontSize: 18, color: 'red', textAlign: 'center' }}>Annulla</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
