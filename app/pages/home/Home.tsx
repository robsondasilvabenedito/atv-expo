import { FlatList, ListRenderItem, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Link, NavigationProp, useNavigation } from "@react-navigation/native"
import Color from "../../core/theme/colors"
import MyHeader from "../../core/components/header"
import { Contact } from "../../core/model/contact"
import ContactTouch from "./components/contactTouch"
import { useDispatch, useSelector } from "react-redux"
import { storeStateType } from "../../core/redux"
import { useEffect } from "react"
import { getContacts, getGroups, getMe } from "../../core/redux/redux.store"
import { initDB } from "../../core/config/database"
import { Group } from "../../core/model/group"
import { getContactById, groupContainsId } from "../../core/util/util"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.backGround,
    },
    list: {
        paddingTop: 5
    }
})

const Home = ({ navigation }: any) => {
    // redux
    const stock = useSelector((state: storeStateType) => state.stock)
    const dispatch = useDispatch<any>()

    let groups: Group[] = stock.groups
    let contacts: Contact[] = stock.contacts
    let me = stock.me

    // init
    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        await initDB()

        dispatch(getMe())
        dispatch(getGroups())
        dispatch(getContacts())
    }

    // Go to Contact
    const goToContact = (group: Group) => {
        navigation.navigate("/contact", { group: group })
    }

    const renderContacts: ListRenderItem<Group> = ((list) => {
        let group = list.item

        // my group?
        if (!groupContainsId(group, me.id))
            return <></>

        let name: string = group.name

        if (!group.isGroup) {
            for (let i = 0; i < group.contacts.length; i++) {
                if (group.contacts[i] == me.id)
                    continue

                name = getContactById(contacts, group.contacts[i])?.name ?? ""
                break
            }
        }

        // verify
        if (group.isGroup === false) {
            let contacts: number[] = group.contacts

            contacts.map((num, index) => {
                if (num !== me.id) {
                    return <ContactTouch id={group.id!} name={name} onPress={() => { goToContact(group) }} />
                }
            })

            return <></>
        } else {
            return <ContactTouch id={group.id!} name={name} onPress={() => { goToContact(group) }} />
        }
    })

    return <SafeAreaView style={styles.container}>
        <MyHeader title={me.id == 0 ? "Login" : "Home"} />
        {/* List */}
        {me.id == 0 ?
            <></> :
            <FlatList
                style={styles.list}
                data={groups}
                renderItem={renderContacts}
                automaticallyAdjustKeyboardInsets={true}
            />}
    </SafeAreaView>
}

export default Home
