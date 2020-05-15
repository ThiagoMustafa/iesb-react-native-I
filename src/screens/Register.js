import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Image,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import {createUserOnFirebaseAsync} from '../services/FirebaseApi';

const img = require('../assets/TodoList.png');

export default class Register extends Component {
  static navigationOptions = {
    title: 'Registrar',
  };

  state = {
    email: '',
    password: '',
  };

  async createUserAsync() {
    try {
      const result = await createUserOnFirebaseAsync(
        this.state.email,
        this.state.password,
      );
      Alert.alert(
        'Usuário criado!',
        `O usuário ${result.email} foi criado com sucesso!`,
        [
          {
            text: 'Ok',
            onPress: () => {
              this.props.navigation.goBack();
            },
          },
        ],
      );
    } catch (error) {
      Alert.alert('Falha ao Criar Usuário!', error.message);
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.topView}>
          <Image style={styles.img} source={img} />
          <Text style={styles.title}>Registrando novo usuário</Text>
        </View>
        <View style={styles.bottomView}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType={'email-address'}
            autoCapitalize="none"
            onChangeText={(text) => this.setState({email: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password: text})}
          />
          <Button
            title="Registrar Usuário"
            onPress={() => this.createUserAsync()}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  topView: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
  },
  img: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  bottomView: {
    flex: 1,
    flexDirection: 'column',
    paddingRight: 20,
    paddingLeft: 20,
  },
  input: {
    marginBottom: 20,
  },
});
