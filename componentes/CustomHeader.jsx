import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function CustomHeader({ title }) {
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={styles.backButton}>Home</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#007bff",
        padding: 15,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
    backButton: {
        fontSize: 16,
        color: "#fff",
    },
});