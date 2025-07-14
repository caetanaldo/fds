import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import TaskCard from '../componentes/TaskCard';
import CustomButton from '../componentes/CustomButton';
import CustomModal from '../componentes/CustomModal';

export default function HomeScreen({ navigation }) {
    const [localTasks, setLocalTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [modalVisible, setModalVisible] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const addTask = ({ title, description }) => {
        setLocalTasks(prev => [
            ...prev,
            { id: Date.now().toString(), title, description: description || '', completed: false }
        ]);
    };

    const toggleTaskCompletion = (id) => {
        setLocalTasks(prev =>
            prev.map(task => task.id === id ? { ...task, completed: !task.completed } : task)
        );
    };

    const deleteTask = () => {
        setLocalTasks(prev => prev.filter(task => task.id !== taskToDelete));
        setModalVisible(false);
        setTaskToDelete(null);
    };

    const filteredTasks = localTasks.filter(task => {
        if (filter === 'pending') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    const renderItem = ({ item }) => (
        <>
            <Text style={styles.sourceText}>Local</Text>
            <TaskCard
                title={item.title}
                completed={item.completed}
                onPress={() => navigation.navigate('Details', { task: item })}
                onToggle={() => toggleTaskCompletion(item.id)}
                isLocal={true}
                onDelete={() => {
                    setTaskToDelete(item.id);
                    setModalVisible(true);
                }}
            />
        </>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Minhas Tarefas</Text>
            <Text style={styles.counterText}>
                Tarefas: {localTasks.length} | Concluídas: {localTasks.filter(task => task.completed).length}
            </Text>
            <View style={styles.filterContainer}>
                <CustomButton
                    title="Todas"
                    onPress={() => setFilter('all')}
                    color={filter === 'all' ? '#007bff' : '#ddd'}
                    textStyle={{ color: filter === 'all' ? '#fff' : '#333' }}
                />
                <CustomButton
                    title="Pendentes"
                    onPress={() => setFilter('pending')}
                    color={filter === 'pending' ? '#007bff' : '#ddd'}
                    textStyle={{ color: filter === 'pending' ? '#fff' : '#333' }}
                />
                <CustomButton
                    title="Concluídas"
                    onPress={() => setFilter('completed')}
                    color={filter === 'completed' ? '#007bff' : '#ddd'}
                    textStyle={{ color: filter === 'completed' ? '#fff' : '#333' }}
                />
            </View>
            {localTasks.length === 0 ? (
                <Text style={styles.emptyText}>Nenhuma tarefa adicionada</Text>
            ) : (
                <FlatList
                    data={filteredTasks}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    style={styles.list}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            )}

            <CustomButton
                title='Adicionar Tarefa'
                onPress={() => navigation.navigate('AddTask', { addTask })}
                color='#28a745'
            />
            <CustomModal
                visible={modalVisible}
                title="Confirmar Exclusão"
                message="Tem certeza que deseja excluir essa tarefa?"
                onConfirm={deleteTask}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333', textAlign: 'center' },
    counterText: { fontSize: 16, color: '#333', marginBottom: 20, textAlign: 'center' },
    emptyText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 20 },
    list: { flex: 1 },
    separator: { height: 1, backgroundColor: '#ddd', marginVertical: 5 },
    filterContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
    sourceText: { fontSize: 12, color: '#888', marginBottom: 4 },
});