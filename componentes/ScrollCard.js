import { StyleSheet } from "react-native";

export default function ScrollCard({ index, image, item, text, onPress }) {
    return (
            <View style={styles.item} key={index} index={index}>
                <Image source={image} style={styles.itemImage} />
                <Text style={styles.itemText}>{text}</Text>
                <Text style={styles.itemText}>{item}</Text>
            </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    },
    itemImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
})