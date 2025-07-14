import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function ProfileScreen({ navigation }) {
    const buttons = [
        { title: 'Voltar para Home', onPress: () => navigation.navigate('Home'), backgroundColor: '#28a745' },
        { title: 'Ir para Detalhes', onPress: () => navigation.navigate('Details', { item: { title: 'Mensagem do Perfil', description: 'Olá do Perfil!' } }), backgroundColor: '#dc3545' },
        { title: 'Ir para ScrollView', onPress: () => navigation.navigate('Scroll'), backgroundColor: '#007bff' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tela de Perfil</Text>

            {buttons.map((btn, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.button, { backgroundColor: btn.backgroundColor }]}
                    onPress={btn.onPress}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>{btn.title}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    button: {
        width: '80%',
        paddingVertical: 14,
        borderRadius: 8,
        marginBottom: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});