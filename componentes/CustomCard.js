import { StyleSheet, View, Text, TouchableOpacity } from "react-native"

function CustomCard({ titulo, corFundo, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.card, { backgroundColor: corFundo }]}>
            <Text style={styles.cardText}>{titulo}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        margin: 15,
    },
        card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        
    },
    cardTexto: {
        fontSize: 16,
        color: '#333'
    }
})


export default CustomCard