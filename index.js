/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import Demo1 from './src/Demo1';
// import Demo from './src/screens/Demo';
import VoiceRecorder from './src/screens/VoiceRecorder';

AppRegistry.registerComponent(appName, () => VoiceRecorder);
