import SQLite from "react-native-sqlite-storage"
import { Contact } from "../model/contact"
import { Message } from "../model/message"
import { Group } from "../model/group"

SQLite.enablePromise(true)

/**
 * Get DB
 * 
 * @returns DB
 */
export const getDB = async () => {
    return SQLite.openDatabase({ name: "expo", location: "default" })
}

/**
 * Reset DB
 */
const resetDB = async () => {
    await SQLite.deleteDatabase({ name: "expo", location: "default" })
}

/**
 * Init DB
 */
export const initDB = async () => {
    // reset
    try {
        await resetDB()
    } catch (error) {
        console.log(`error: ${error}`)
    }

    // check if exist
    let db = await getDB()

    // let result: SQLite.ResultSet = (await db.executeSql("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='Contacts'"))[0]
    // let count: {"count(*)": number} = result.rows.item(0)

    // if (count["count(*)"] === 1) return

    // Me
    await db.executeSql("CREATE TABLE IF NOT EXISTS Me(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password, TEXT)")
    await dbLogin({id: 1, name: "lucas"})

    // Contact
    await db.executeSql("CREATE TABLE IF NOT EXISTS Contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)")

    await dbCreateContact({ id: 1, name: "lucas" })
    await dbCreateContact({ id: 2, name: "marcos" })
    await dbCreateContact({ id: 3, name: "luan" })

    // Messages
    await db.executeSql("CREATE TABLE IF NOT EXISTS Messages(id INTEGER PRIMARY KEY AUTOINCREMENT, msg TEXT NOT NULL, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,origin INTEGER NOT NULL, groupId INTEGER NOT NULL,FOREIGN KEY (origin) REFERENCES Contacts(id),FOREIGN KEY (groupId) REFERENCES Groups(id))")

    await dbCreateMessage({ msg: "hi", origin: 1, groupId: 2 })
    await dbCreateMessage({ msg: "hi", origin: 2, groupId: 2 })
    await dbCreateMessage({ msg: "how are you?", origin: 1, groupId: 2 })
    await dbCreateMessage({ msg: "very mad", origin: 2, groupId: 1 })
    await dbCreateMessage({ msg: "very bad*", origin: 2, groupId: 1 })

    // Groups
    await db.executeSql(" CREATE TABLE IF NOT EXISTS Groups(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, contacts TEXT NOT NULL, isGroup INTEGER NOT NULL)")

    await dbCreateGroup({ name: "nonono", contacts: [1, 2], isGroup: false })
    await dbCreateGroup({ name: "nonono", contacts: [1, 3], isGroup: false })
    await dbCreateGroup({ name: "nonono", contacts: [2, 3], isGroup: false })
    await dbCreateGroup({ name: "family", contacts: [1, 2, 3], isGroup: true })
}

/**
 * Add login
 * 
 * @param me Contact
 */
export const dbLogin = async (me: Contact) => {
    let db = await getDB()

    await db.executeSql("INSERT INTO Me(name, password) VALUES (?, ?)", [me.name, me.password!])
}

/**
 * Get Login
 * 
 * @returns Contact
 */
export const dbGetLogin = async () => {
    let contact: Contact[] = []

    let db = await getDB()

    let result: SQLite.ResultSet = (await db.executeSql("SELECT * FROM Me"))[0]

    for (let i = 0; i < result.rows.length; i++) {
        let item = result.rows.item(i)

        contact.push(item as Contact)
    }

    if (contact.length == 0) {
        contact.push({ id: 0, name: "" })
    }

    return contact[0]
}

/**
 * Logout
 */
export const dbLogout = async () => {
    let db = await getDB()

    await db.executeSql("DELETE FROM Me")
}

/**
 * Create Contact
 * 
 * @param contatc Contact
 */
export const dbCreateContact = async (contact: Contact) => {
    let db = await getDB()

    await db.executeSql("INSERT INTO Contacts(name) VALUES (?)", [contact.name])
}

/**
 * Get Contact
 * 
 * @returns Contacts
 */
export const dbGetContacts = async (): Promise<Contact[]> => {
    let contact: Contact[] = []

    let db = await getDB()

    let result: SQLite.ResultSet = (await db.executeSql("SELECT * FROM Contacts"))[0]

    for (let i = 0; i < result.rows.length; i++) {
        let item = result.rows.item(i)

        contact.push(item as Contact)
    }

    return contact
}

/**
 * Create Message
 * 
 * @param message Message
 */
export const dbCreateMessage = async (message: Message) => {
    let db = await getDB()

    await db.executeSql("INSERT INTO Messages(msg, origin, groupId) VALUES(?, ?, ?)", [message.msg, message.origin, message.groupId])
}

/**
 * Get Messages
 * 
 * @param type contact or group
 * @returns Messages
 */
export const dbGetMessages = async (groupId: number): Promise<Message[]> => {
    let messages: Message[] = []

    let db = await getDB()

    let result: SQLite.ResultSet = (await db.executeSql("SELECT * FROM Messages WHERE groupId = ?", [groupId]))[0]

    for (let i = 0; i < result.rows.length; i++) {
        let item = result.rows.item(i)

        messages.push(item as Message)
    }

    return messages
}

/**
 * Create Group
 * 
 * @param group Group
 */
export const dbCreateGroup = async (group: Group) => {
    let db = await getDB()

    await db.executeSql("INSERT INTO Groups(name, isGroup, contacts) VALUES (?, ?, ?)", [group.name, group.isGroup, `[${group.contacts}]`])
}

/**
 * Get Messages
 * 
 * @returns Group[]
 */
export const dbGetGroups = async (): Promise<Group[]> => {
    let groups: Group[] = []

    // database
    let db = await getDB()

    // result
    let result: SQLite.ResultSet = (await db.executeSql("SELECT * FROM Groups"))[0]

    for (let i = 0; i < result.rows.length; i++) {
        let item = result.rows.item(i)
        
        // string to array
        item.contacts = JSON.parse(item.contacts)
        
        // insert
        groups.push(item as Group)
    }

    return groups
}
