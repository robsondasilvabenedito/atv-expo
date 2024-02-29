import { StyleSheet, Text, View } from "react-native"
import Color from "../../../core/theme/colors"
import { Message } from "../../../core/model/message"

const styles = StyleSheet.create({
    meLabel: {
        minHeight: 40,
        marginTop: 1,
        paddingVertical: 3,
        paddingLeft: 30,
        paddingRight: 3,
        alignItems: "flex-end"
    },
    otherLabel: {
        minHeight: 40,
        marginTop: 1,
        paddingVertical: 3,
        paddingRight: 30,
        paddingLeft: 3,
        alignItems: "flex-start"
    },
    meMessage: {
        minWidth: 220,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 15,
        paddingHorizontal: 5,
        paddingVertical: 8,
        backgroundColor: Color.primary
    },
    otherMessage: {
        minWidth: 220,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 15,
        paddingHorizontal: 5,
        paddingVertical: 8,
        backgroundColor: Color.secondary
    }
})

const MessageLabel = (props: Message) => {
    const message = props.message
    const origin = props.origin

    return <View style={origin === "other" ? styles.otherLabel : styles.meLabel}>
        <View style={origin === "other" ? styles.otherMessage : styles.meMessage}>
            <Text style={{textAlign: "left"}}>{message}</Text>
        </View>
    </View>
}

export default MessageLabel
