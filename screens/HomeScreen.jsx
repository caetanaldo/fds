import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import TaskCard from '../componentes/TaskCard';
import CustomButton from '../componentes/CustomButton';
import CustomModal from '../componentes/CustomModal';
import { useTasks } from '../componentes/TaskContext';

export default function HomeScreen({ navigation }) {
    // const [localTasks, setLocalTasks] = useState([]);
    const { localTasks, toggleTaskCompletion, deleteTask, toggleTheme, getCompletedCount, clearTasks } = useTasks();
    const [filter, setFilter] = useState('all');
    const [modalVisible, setModalVisible] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [addTask, setAddTask] = useState(false);

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

    const { theme } = useTasks();

    return (
        <View style={[styles.container, theme === 'dark' && styles.darkContainer]}>
            <CustomButton
                title={theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
                onPress={toggleTheme}
                color={theme === 'dark' ? '#007bff' : '#007bff'}
            />
            <Text style={styles.title}>Minhas Tarefas</Text>
            <Text style={styles.counterText}>
                Tarefas: {filteredTasks.length} | Concluídas: {getCompletedCount()}
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
            {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
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
                onPress={() => setAddTask(true)}
                color='#28a745'
            />
            <CustomModal
                visible={addTask}
                onClose={() => setAddTask(false)}
                onPress={() => navigation.navigate('AddTask')}
                title="Adicionar Tarefa"
                onConfirm={() => {
                    setAddTask(false);
                    setSuccessMessage('Tarefa adicionada com sucesso!');
                    setTimeout(() => setSuccessMessage(''), 2000);
                }}
            />
            <CustomModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title="Confirmar Exclusão"
                message="Tem certeza que deseja excluir essa tarefa?"
                onConfirm={() => {
                    deleteTask(taskToDelete);
                    setModalVisible(false);
                    setTaskToDelete(null);
                    setSuccessMessage('Tarefa excluida com sucesso!');
                    setTimeout(() => setSuccessMessage(''), 2000);
                }}
            />
            <CustomButton
                title='Limpar Tarefas'
                onPress={() => setModalVisible(true)}
                color='#dc3545'
            />
            <CustomModal
                visible={modalVisible}
                title="Limpar Tarefas"
                message="Tem certeza que deseja excluir todas as tarefas locais?"
                onConfirm={() => {
                    clearTasks();
                    setModalVisible(false);
                }}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#f5f5f5', padding: 20
    },
    title: {
        fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333', textAlign: 'center'
    },
    counterText: {
        fontSize: 16, color: '#333', marginBottom: 20, textAlign: 'center'
    },
    emptyText: {
        fontSize: 16, color: '#666', textAlign: 'center', marginTop: 20
    },
    list: {
        flex: 1
    },
    separator: {
        height: 1, backgroundColor: '#ddd', marginVertical: 5
    },
    filterContainer: {
        flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20
    },
    sourceText: {
        fontSize: 12, color: '#888', marginBottom: 4
    },
    darkContainer: {
        backgroundColor: '#333'
    },
    successText: {
        fontSize: 16,
        color: '#28a745',
        textAlign: 'center',
        marginBottom: 10,
    }
});