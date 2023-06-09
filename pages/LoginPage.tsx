import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import StyledTextInput from '../components/StyledTextInput';
import {useEffect, useState} from 'react';
import { signInWithGoogle } from '../firebase/FirebaseConfig';
import auth from '@react-native-firebase/auth';

function LoginPage({navigation}: any) {
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');

  useEffect(() => {
    const user = auth().currentUser?.uid
    if(user){
      navigation.navigate('Dashboard')
    }
  })

  const handleLogin = () => {
    if(email && passwd) {
      auth().signInWithEmailAndPassword(email, passwd).then((user) => {
        navigation.navigate('Dashboard')
      }).catch((error) => {
        Alert.alert("" + error)
        setPasswd('')
      })
    } else{
      Alert.alert("Please Don't send empty credentials")
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleGoogleLogin = () => {
    const user = signInWithGoogle()
    user.then((user) => {
      Alert.alert(''+user?.user.email)
      navigation.navigate('Dashboard')
    })
    .catch((error)=> {
      Alert.alert("" + error)
    })
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/img/logo.png')} style={styles.logo} />
      <StyledTextInput text="Email" onChangeText={setEmail} value={email} />
      <StyledTextInput
        type="password"
        text="Password"
        onChangeText={setPasswd}
        value={passwd}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.btnLogin}>
        <Text style={styles.txtLogin}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.createAccContainer}>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.txtCreateAcc}> Create an Account</Text>
        </TouchableOpacity>
      </Text>

      <TouchableOpacity
        style={styles.btnloginWithGoogle}
        onPress={handleGoogleLogin}
        >
        <Image
          source={require('../assets/img/google-logo.png')}
          style={styles.googleLogo}
        />
        <Text style={styles.txtLoginWithGoogle}>Login with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLogin: {
    backgroundColor: '#0066CC',
    width: '30%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginBottom: 10,
  },
  txtLogin: {
    color: 'white',
    fontWeight: '600',
  },
  logo: {
    width: '80%',
    height: 220,
    resizeMode: 'contain',
  },
  txtCreateAcc: {
    color: 'blue',
  },
  createAccContainer: {
    marginBottom: 40,
    padding: 3,
    alignItems: 'center',
  },
  googleLogo: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    marginRight: 10,
  },
  btnloginWithGoogle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    width: '80%',
  },
  txtLoginWithGoogle: {
    color: 'black',
    fontWeight: '500',
  },
});

export default LoginPage;
