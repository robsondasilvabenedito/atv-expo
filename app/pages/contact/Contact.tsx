import { FlatList, KeyboardAvoidingView, ListRenderItem, Platform, SafeAreaView, StyleSheet, TextInput, View } from "react-native"
import Color from "../../core/theme/colors"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { storeStateType } from "../../core/redux"
import { Message } from "../../core/model/message"
import { addMessage } from "../../core/redux/redux.store"
import MessageLabel from "./components/messageLabe"
import SendButton from "./components/sendButton"
import { useRoute } from "@react-navigation/native"
import MyHeader from "../../core/components/header"

const labelWidth: number = 86
const buttonWidth: number = 100 - labelWidth

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboard: {
        flex: 1,
        backgroundColor: Color.backGround,
    },
    list: {
        paddingTop: 3,
    },
    listFoot: {
        marginTop: 10,
    },
    inputContainer: {
        flexDirection: "row",
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        height: 50,
        alignItems: "center"
    },
    inputText: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderWidth: 1,
        height: "100%",
        width: `${labelWidth}%`,
        borderColor: Color.border,
        borderRadius: 15
    }
})

const ContactHome = ({ navigation, route }: any) => {
    const id: number = route.params?.id
    const [message, setMessage] = useState("")

    // redux
    const stock = useSelector((state: storeStateType) => state.stock)
    const dispatch = useDispatch<any>()

    let messages = stock.message

    // send message
    const sendMessage = () => {
        let newMessage: Message = {
            message: message,
            origin: "me"
        }

        if (newMessage.message === "")
            return

        dispatch(addMessage(newMessage));
        setMessage("")
    }

    // Render
    const renderMessages: ListRenderItem<Message> = ((list) => {
        let msg = list.item

        return <MessageLabel message={msg.message} origin={msg.origin} />
    })

    // auto-scroll
    const listRef = useRef<FlatList>(null)

    const autoScroll = () => {
        listRef.current?.scrollToEnd({ animated: true })
    }

    useEffect(() => {
        autoScroll()
    }, [messages])

    return <SafeAreaView style={styles.container}>
        <MyHeader title="Contact" backButton={() => { navigation.goBack() }} />
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={0}
            style={styles.keyboard}
        >
            {/* List */}
            <FlatList
                style={styles.list}
                onLayout={() => { autoScroll() }}
                ref={listRef}
                data={messages}
                renderItem={renderMessages}
                ListFooterComponent={<View style={styles.listFoot} />}
                automaticallyAdjustKeyboardInsets={true}
            />
            {/* Bottom */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputText}
                    value={message}
                    onChangeText={setMessage}
                    multiline={true}
                    placeholder="message"
                    keyboardType="default" />
                <SendButton width={`${buttonWidth}%`} onPress={() => { sendMessage() }} />
            </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
}

export default ContactHome