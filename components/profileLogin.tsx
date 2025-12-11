import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from './ui/icon-symbol';

export function ProfileLogin () {
  return (
    <View style={styles.loginPage}>
        <Text style={styles.title}>Accedi</Text>
        <View style={styles.login}>
            <TouchableOpacity style={styles.buttonLogin}>
                <Image source={require('@/assets/images/apple.png')} style={{ width: 18, height:20}} />
                <Text style={styles.textLogin}>Accedi con Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonLogin}>
                <Image source={require('@/assets/images/google.png')} style={{ width: 20, height:18}} />
                <Text style={styles.textLogin}>Accedi con Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonLogin}>
                <Image source={require('@/assets/images/facebook.png')} style={{ width: 18, height:20}} />
                <Text style={styles.textLogin}>Accedi con Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonLogin}>
                <IconSymbol name={'envelope'} color={'rgb(0,0,0)'} size={22}></IconSymbol>
                <Text style={styles.textLogin}>Accedi con la tua e-mail</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    loginPage:{
        margin:'auto',
        borderWidth:2,
        paddingHorizontal:20,
    },
    title:{
        fontSize:25,
        marginVertical:20,
    },
    login:{
        gap:10,
        marginTop:20,
    },
    buttonLogin:{
        backgroundColor:'rgba(226, 226, 226, 1)',
        flexDirection:'row',
        paddingHorizontal:20,
        paddingVertical:15,
        justifyContent:'center',
        gap:5,
        borderRadius:10,
    },
    textLogin:{
        fontSize:18,
        fontWeight:500,
    },
});