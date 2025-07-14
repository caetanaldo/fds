import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function ItemCard({ title, description, onPress }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
    >
      <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
      <Text
        style={styles.cardDescription}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {description}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222", // um pouco mais escuro que o anterior
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
    marginTop: 6,
  },
});