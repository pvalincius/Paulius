import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {  createStackNavigator, createAppContainer} from 'react-navigation';
import Profile from './components/Profile';
import Ordercurier from './components/Ordercurier';

const Application = createStackNavigator({
  //Home:{screen: Login},
  Profile:{screen: Profile},
  Ordercurier:{screen: Ordercurier},
  //PatvirtintosValandos:{screen: PatvirtintosValandos},
//  WorkCalendar:{screen: WorkCalendar},
  //Nustatymai:{screen: Nustatymai},
//  Tvirtinimas:{screen: Tvirtinimas},
  },{
    navigattionOptions:{
      header: "Siuntų pilotai",
    }
});
const App = createAppContainer(Application);
export default App;
/*export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
