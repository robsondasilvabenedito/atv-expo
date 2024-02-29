import { DimensionValue, StyleSheet, TouchableOpacity, Text } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Color from "../../../core/theme/colors"

interface SendButtonProps {
    onPress: () => void
    width: DimensionValue
}

const SendButton = (props: SendButtonProps) => {
    const onPress = props.onPress
    const width = props.width

    const styles = StyleSheet.create({
        inputButton: {
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            width: width,
            marginLeft: 5,
            paddingHorizontal: 3,
            backgroundColor: Color.primary,
            borderRadius: 15,
        }
    })

    return <TouchableOpacity
        activeOpacity={0.8}
        style={styles.inputButton}
        onPress={onPress}>
        <MaterialCommunityIcons name="send-check" size={24} color="black" />
    </TouchableOpacity>
}

export default SendButton
