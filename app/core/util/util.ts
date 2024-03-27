import { Contact } from "../model/contact"
import { Group } from "../model/group"

export const getContactById = (contacts: Contact[], id: number): Contact | undefined => {
    let contact: Contact | undefined

    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id != id)
            continue

        contact = contacts[i]
        break
    }

    return contact
}

export const groupContainsId = (group: Group, id: number): boolean => {
    for (let i = 0; i < group.contacts.length; i++)
    {
        let contatcId = group.contacts[i]

        if (contatcId != id)
            continue

        return true
    }

    return false
}
