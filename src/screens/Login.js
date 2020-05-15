import React, {useState} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  TextInput,
  Image,
  Button,
  Text,
  Alert,
} from 'react-native';
import {signInOnFirebaseAsync} from '../services/FirebaseApi';
import {CommonActions} from '@react-navigation/native';

const img = require('../assets/TodoList.png');

const Login = (props) => {
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState('');

  const signInAsync = async () => {
    try {
      const result = await signInOnFirebaseAsync(email, password);
      //Alert.alert('Usuário autenticado', `O usuário ${result.user.email} foi autenticado com sucesso!`)

      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'TaskList'}],
        }),
      );
    } catch (error) {
      Alert.alert('Falha na autenticação', error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.topView}>
        <Image style={styles.img} source={img} />
      </View>

      <View style={styles.bottomView}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          keyboardType={'email-address'}
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Senha"
          secureTextEntry={true}
        />
        <Button title="Entrar" onPress={() => signInAsync()} />
        <View style={styles.textConteiner}>
          <Text>Não é um membro? Vamos </Text>
          <Text
            style={styles.textRegister}
            onPress={() => {
              props.navigation.navigate('Register');
            }}>
            Registrar
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  topView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  img: {
    width: 200,
    height: 200,
  },
  bottomView: {
    flexDirection: 'column',
    paddingRight: 20,
    paddingLeft: 20,
  },
  input: {
    marginBottom: 20,
  },
  textConteiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  textRegister: {
    fontWeight: 'bold',
  },
});

export default Login;
