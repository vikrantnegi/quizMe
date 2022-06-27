import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import './src/config/firebase';
import Colors from './src/constants/Colors';
import { NetWorkStatusProvider } from './src/context/NetworkContext';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import { useNetworkStatus } from './src/hooks/useNetworkStatus';
import Navigation from './src/navigation';
import store from './src/store';

LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const isConnectionAvailable = useNetworkStatus();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <NetWorkStatusProvider value={isConnectionAvailable}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </NetWorkStatusProvider>
        </SafeAreaProvider>
        <FlashMessage
          floating
          position="bottom"
          style={{ backgroundColor: Colors.tintColorLight }}
        />
      </Provider>
    );
  }
}
