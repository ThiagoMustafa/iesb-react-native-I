/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './src/screens/App';
import {name as appName} from './app.json';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
AppRegistry.registerComponent('ToDoManager', () => Register);

//AppRegistry.registerComponent(appName, () => App);
