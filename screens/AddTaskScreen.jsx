import { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import CustomButton from '../componentes/CustomButton';
import CustomInput from '../componentes/CustomInput';
import axios from 'axios';

export default function AddTaskScreen({ navigation, route }) {
  const { addTask } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async () => {
    if (title.trim()) {
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
          title,
          completed: false,
        });
        addTask({ title, description, id: response.data.id.toString() });
        navigation.goBack();
      } catch (err) {
        Alert.alert('Erro', 'Falha ao salvar na API');
      }
    } else {
      Alert.alert('Erro', 'Por favor insira o título da tarefa');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título da Tarefa</Text>
      <CustomInput
        value={title}
        onChangeText={text => setTitle(text.slice(0, 50))}
        placeholder="Digite o título da tarefa"
        maxLength={50}
      />

      <Text style={[styles.label, { marginTop: 20 }]}>
        Descrição (opcional) — {description.length}/150
      </Text>
      <CustomInput
        value={description}
        onChangeText={text => setDescription(text.slice(0, 150))}
        placeholder="Digite a descrição da tarefa"
        multiline
        style={styles.multilineInput}
        textAlignVertical="top"
        maxLength={150}
      />

      <CustomButton title="Salvar Tarefa" onPress={handleAddTask} color="#007bff" style={styles.button} />
      <CustomButton title="Cancelar" onPress={() => navigation.goBack()} color="#dc3545" style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  multilineInput: {
    height: 100,
    marginTop: 8,
  },
  button: {
    marginTop: 20,
  },
});