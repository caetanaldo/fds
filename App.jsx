import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import { TouchableOpacity, Text } from 'react-native';
import CustomHeader from './componentes/CustomHeader';
import { TaskProvider } from './componentes/TaskContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: 'Tela Principal',
              headerStyle: { backgroundColor: '#007bff' },
              headerTintColor: '#fff',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('AddTask')}
                  style={{ marginRight: 15 }}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                    + Nova
                  </Text>
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="AddTask"
            component={AddTaskScreen}
            options={{
              title: 'Adicionar Tarefa',
              headerStyle: { backgroundColor: '#28a745' },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{
              header: () => <CustomHeader title="Detalhes da Tarefa" />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}