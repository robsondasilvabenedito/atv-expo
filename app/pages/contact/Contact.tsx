import { FlatList, KeyboardAvoidingView, ListRenderItem, Platform, SafeAreaView, StyleSheet, TextInput, View } from "react-native"
import Color from "../../core/theme/colors"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { storeStateType } from "../../core/redux"
import { Message } from "../../core/model/message"
import MessageLabel from "./components/messageLabel"
import SendButton from "./components/sendButton"
import MyHeader from "../../core/components/header"
import { Contact } from "../../core/model/contact"
import { Group } from "../../core/model/group"
import { getContactById } from "../../core/util/util"
import { getMessages } from "../../core/redux/redux.store"

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
    const group: Group = route.params?.group
    const [message, setMessage] = useState("")

    // redux
    const stock = useSelector((state: storeStateType) => state.stock)
    const dispatch = useDispatch<any>()

    let contacts: Contact[] = stock.contacts
    let messages: Message[] = stock.messages
    let me = stock.me

    // init
    useEffect(() => {
        init()
    }, [])

    const init = () => {
        dispatch(getMessages({ groupId: group.id! }))

        console.log(`Messages: ${messages}`)
    }

    // title name
    let title: string = group.name

    if (!group.isGroup) {
        for (let i = 0; i < group.contacts.length; i++) {
            if (group.contacts[i] === me.id)
                continue

            title = getContactById(contacts, group.contacts[i])?.name ?? ""
            break
        }
    }

    // send message
    const sendMessage = () => {
        // validate
        if (message === "")
            return

        // newMessage
        let now = new Date()

        let date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}-${now.getHours}/${now.getMinutes}/${now.getSeconds}`

        let newMessage: Message = {
            msg: message,
            origin: me.id,
            date: date,
            groupId: group.id!
        }

        // send
        setMessage("")
    }

    // Render
    const renderMessages: ListRenderItem<Message> = ((list) => {
        let msg = list.item

        return <MessageLabel message={msg} me={me} />
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
        <MyHeader title={title} backButton={() => { navigation.goBack() }} />
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
                    placeholder="message" />
                <SendButton width={`${buttonWidth}%`} onPress={() => { sendMessage() }} />
            </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
}

export default ContactHome
