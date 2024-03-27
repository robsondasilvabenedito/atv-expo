import { StyleSheet, Text, View } from "react-native"
import Color from "../../../core/theme/colors"
import { Message } from "../../../core/model/message"
import { Contact } from "../../../core/model/contact"

interface MessageLabelProps {
    message: Message
    me: Contact
}

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

const MessageLabel = (props: MessageLabelProps) => {
    const message = props.message
    const me = props.me

    return <View style={message.origin !== me.id ? styles.otherLabel : styles.meLabel}>
        <View style={message.origin !== me.id ? styles.otherMessage : styles.meMessage}>
            <Text style={{ textAlign: "left" }}>{message.msg}</Text>
        </View>
    </View>
}

export default MessageLabel
