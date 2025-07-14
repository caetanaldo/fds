import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButton';

export default function TaskCard({ title, description, completed, onPress, onToggle, isLocal, onDelete }) {
  return (
    <View style={[styles.cardContainer, completed && styles.completedContainer]}>
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityState={{ disabled: !onPress, selected: completed }}
      >
        <Text style={[styles.cardTitle, completed && styles.completed]}>
          {title}
        </Text>
        {description ? (
          <Text style={[styles.cardDescription, completed && styles.completedDescription]}>
            {description}
          </Text>
        ) : null}
      </TouchableOpacity>

      <View style={styles.actions}>
        {onToggle && (
          <TouchableOpacity
            style={[styles.toggleButton, completed && styles.toggleButtonCompleted]}
            onPress={onToggle}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: completed }}
            accessibilityLabel={completed ? 'Marcar como não concluída' : 'Marcar como concluída'}
            activeOpacity={0.6}
          >
            <Text style={[styles.toggleText, completed && styles.toggleTextCompleted]}>
              {completed ? '✔' : '○'}
            </Text>
          </TouchableOpacity>
        )}

        {isLocal && onDelete && (
          <CustomButton
            title="Excluir"
            onPress={onDelete}
            color="#dc3545"
            style={styles.deleteButton}
            textStyle={styles.deleteButtonText}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
  },
  completedContainer: {
    backgroundColor: '#d6eaff',
  },
  card: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  cardDescription: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  completedDescription: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007bff',
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  toggleButtonCompleted: {
    backgroundColor: '#007bff',
  },
  toggleText: {
    fontSize: 20,
    color: '#007bff',
  },
  toggleTextCompleted: {
    color: '#fff',
  },
  deleteButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  deleteButtonText: {
    fontWeight: '600',
    color: '#fff',
  },
});