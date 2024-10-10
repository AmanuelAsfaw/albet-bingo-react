import { Stack } from "expo-router";
import Index from './index';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
    </Stack>
  );
}

// import 'react-native-gesture-handler';
// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Index from './index'; // Adjust the path accordingly

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen 
//           name="Home" 
//           component={Index} 
//           options={{ headerShown: false }} // Hide the default header
//         />
//         {/* Add other screens here if needed */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
