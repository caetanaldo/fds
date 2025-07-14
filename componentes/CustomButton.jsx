import { StyleSheet, TouchableOpacity, Text } from 'react-native'

export default function CustomButton({ title, onPress, color = '#007bff', style, textStyle }) {
    return (
        <TouchableOpacity   
            style={[styles.button, style, { backgroundColor: color }]}
            onPress={onPress}
        >
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});