import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './src/ui/screens';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'PASS PRINTER', headerTitleStyle: { fontWeight: 'bold' } }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
