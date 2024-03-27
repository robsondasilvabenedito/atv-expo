import { Contact } from "../model/contact"
import { Group } from "../model/group"
import { Message } from "../model/message"

export interface StateType {
    me: Contact
    groups: Group[]
    contacts: Contact[]
    messages: Message[]
}
