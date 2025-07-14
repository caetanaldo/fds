import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';

export default function ScrollScreen({ navigation }) {
    return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela com ScrollView</Text>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {Array.from({ length: 20 }).map((_, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => navigation.navigate('Details', { item: { title: `Item ${index + 1}`, description: `Descrição do item ${index + 1}` } })}
          >
            <Image
              source={require('../assets/fundo.png')}
              style={styles.itemImage}
              resizeMode="cover"
            />
            <Text style={styles.itemText}>Item {index + 1}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Voltar para Home</Text>
      </TouchableOpacity>
    </View >
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    itemImage: {
        width: 50,
        height: 50,
        marginRight: 15,
        borderRadius: 8,
    },
    itemText: {
        fontSize: 18,
        color: '#333',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});