import React, {Component} from 'react';
import {
  View,
  TextInput,
  Switch,
  Text,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import {writeTaskOnFirebaseAsync} from '../services/FirebaseApi';

export default class Task extends Component {
  static navigationOptions = {
    title: 'Tarefa',
  };

  state = {
    key: '',
    title: '',
    resume: '',
    priority: true,
    isDone: false,
  };

  constructor(props) {
    super(props);

    try {
      const task = this.props.route.params.task;

      this.state = {
        key: task.key,
        title: task.title,
        resume: task.resume,
        priority: task.priority,
        isDone: task.isDone,
      };
    } catch (error) {
      console.log('error');
    }
  }

  async _saveTaskAsync() {
    var task = {
      key: this.state.key,
      title: this.state.title,
      resume: this.state.resume,
      priority: this.state.priority,
      isDone: this.state.isDone,
    };
    try {
      await writeTaskOnFirebaseAsync(task);
      this.props.navigation.goBack();
    } catch (error) {
      Alert.alert('Erro ao salvar', error.message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={this.state.title}
          onChangeText={(value) => this.setState({title: value})}
        />
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Descrição"
          multiline={true}
          numberOfLines={4}
          value={this.state.resume}
          onChangeText={(value) => this.setState({resume: value})}
        />
        <View style={styles.switchContainer}>
          <Switch
            value={this.state.priority}
            onValueChange={(value) => this.setState({priority: value})}
            value={this.state.priority}
          />
          <Text style={styles.switchText}>Prioridade máxima</Text>
        </View>
        <View style={styles.switchContainer}>
          <Switch
            value={this.state.isDone}
            onValueChange={(value) => this.setState({isDone: value})}
            value={this.state.isDone}
          />
          <Text style={styles.switchText}>Feita?</Text>
        </View>
        <Button
          style={styles.button}
          title="Salvar"
          onPress={() => this._saveTaskAsync()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },
  input: {
    marginBottom: 20,
  },
  multilineInput: {
    height: 100,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
  },
  switchText: {
    marginLeft: 10,
    color: 'black',
    fontSize: 18,
  },
});
