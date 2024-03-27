import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Color from "../../../core/theme/colors"

interface ContactTouchProps {
    id: number
    name: string
    onPress: () => void
}

const styles = StyleSheet.create({
    label: {
        height: 60
    },
    touch: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    infoLable: {
        backgroundColor: Color.primaryN,
        borderWidth: 1,
        borderColor: Color.border,
        height: "95%",
        width: "98%",
        alignItems: "center",
        flexDirection: "row"
    },
    infoImage: {
        height: 50,
        width: 50,
        marginLeft: 5,
        marginRight: 8,
        borderRadius: 20,
        backgroundColor: Color.border
    },
    infoText: {
        height: 50,
        padding: 2,
        justifyContent: "space-between"
    },
    infoName: {
        color: Color.textFocus
    },
    infoLast: {
        color: Color.textUnfocus
    }
})

const ContactTouch = (props: ContactTouchProps) => {
    const id = props.id
    const name = props.name
    const onPress = props.onPress

    return <View style={styles.label}>
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.touch}
            onPress={onPress}>
            <View style={styles.infoLable}>
                <View style={styles.infoImage}></View>
                <View style={styles.infoText}>
                    <Text style={styles.infoName}>{name}</Text>
                    <Text style={styles.infoLast}>{name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    </View>
}

export default ContactTouch
