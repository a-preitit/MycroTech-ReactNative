import React from 'react';
import { Platform, Dimensions } from 'react-native';

import Inicio from './src/screens/Inicio'
import Bienvenida from './src/screens/Bienvenida'
import SobreNosotros from './src/screens/SobreNosotros'
import Control from './src/screens/Control'
import Conexion from './src/screens/Conexion'
import Tutorial from './src/screens/Tutorial'
import Login from './src/screens/Login'
import Register from './src/screens/Register'
import Menu from './src/screens/Menu'
import Bandas from './src/screens/Bandas'
import NuevaBanda from './src/screens/NuevaBanda'
import Canciones from './src/screens/Canciones'
import NuevaCancion from './src/screens/NuevaCancion'
import Tema from './src/screens/Tema'
import Recuperar from './src/screens/Recuperar'
import Pin from './src/screens/Pin'
import NuevaContra from './src/screens/NuevaContra'


import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import MenuDrawer from './src/components/MenuDrawer'

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
  drawerWidth: WIDTH*0.68,
  contentComponent: ({ navigation}) => {
    return(<MenuDrawer navigation={navigation} />)
  },
  drawerPosition: 'right',
}

const AppStackNavigator = createStackNavigator({
  
  Inicio: {screen: Inicio},
  SobreNosotros: {screen: SobreNosotros},
  Tutorial: {screen: Tutorial},
  Bienvenida: {screen: Bienvenida},
  Conexion: {screen: Conexion},
  Control: {screen: Control},
  Login: {screen: Login},
  Register: {screen: Register},
  Menu: {screen: Menu},
  Bandas: {screen: Bandas},
  NuevaBanda: {screen: NuevaBanda},
  Canciones: {screen: Canciones},
  NuevaCancion: {screen: NuevaCancion},
  Tema: {screen: Tema},
  Recuperar: {screen: Recuperar},
  Pin: {screen: Pin},
  NuevaContra: {screen: NuevaContra}
},
  {
    headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
  }
)

const AppDrawerNavigator = createDrawerNavigator({
 
  Inicio: {
    screen: AppStackNavigator,
  }
},
  DrawerConfig,
);

const App = createAppContainer(AppDrawerNavigator);

export default App;


// /*/**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits (martin).
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App;
