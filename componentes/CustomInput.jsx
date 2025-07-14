import { StyleSheet, TextInput } from "react-native";
import { useState } from "react";

export default function CustomInput({
    value,
    onChangeText,
    placeholder,
    multiline = false,
    style,
    maxLines = 5,
    ...props
}) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <TextInput
            style={[
                styles.input,
                multiline && [styles.multiline, { height: 20 * maxLines }],
                isFocused && styles.inputFocused,
                style
            ]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#999"
            multiline={multiline}
            numberOfLines={multiline ? maxLines : 1}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#ddd",
        marginVertical: 10,
        fontSize: 16,
        color: "#333",
    },
    inputFocused: {
        borderColor: "#007bff",
        shadowColor: "#007bff",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
    },
    multiline: {
        textAlignVertical: "top",
    },
});