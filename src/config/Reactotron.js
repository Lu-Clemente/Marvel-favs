/* eslint-disable import/no-extraneous-dependencies */
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import { NativeModules } from 'react-native';

if (__DEV__) {
  const { scriptURL } = NativeModules.SourceCode;
  const address = scriptURL.split('://')[1].split('/')[0];
  const hostname = address.split(':')[0];

  const reactotron = Reactotron.configure({
    name: 'react-native',
    host: hostname,
    port: 9090,
  })
    .useReactNative({
      overlay: false,
    })
    .use(reactotronRedux())
    .connect();

  console.tron = reactotron;
}

