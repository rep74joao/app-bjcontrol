import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/stacks/MainStack';
import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
//----context
import ClienteProvider from './src/contexts/ClienteContext'
import UserProvider from './src/contexts/UserContext'
import NserieProvider from './src/contexts/NserieContext'
import * as Font from 'expo-font';
import * as Notifications from 'expo-notifications';
import AppLoading from 'expo-app-loading';
import { primary } from './src/config';

console.tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({
      host:'172.16.0.200'
    })
    .useReactNative()
    .connect();

console.disable = ['Virtual', 'Warning'];

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return { shouldShowAlert: true };
  },
});

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App(){
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return(
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => { setFontLoaded(true)}}
        onError={console.log}
      />
    )}
    console.tron.log('statusBarHeight: ', StatusBar.currentHeight)

  return (
    <ClienteProvider>
     <NserieProvider>
      <UserProvider>
          <StatusBar barStyle={'dark-content'} backgroundColor={primary}/>
          <NavigationContainer>
            <MainStack/>
          </NavigationContainer>
        </UserProvider>
     </NserieProvider>
    </ClienteProvider>
    
);
};
