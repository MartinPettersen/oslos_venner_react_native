import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Forums from './components/(forum)/Forums';
import Logo from './components/(logo)/Logo';
import Forum from './components/(forum)/Forum';
import Thread from './components/(thread)/Thread';

export default function App() {
  return (
    <View style={styles.container}>
      <Logo />
      <Thread />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#27272a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
