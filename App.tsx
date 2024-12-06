import React from 'react';

import MainScreen from './src/MainScreen';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

function App(): React.JSX.Element {

  return (
    <MainScreen />
  );
}

export default App;
