/**
 * @interface Message
 * 
 * @param id message id
 * @param msg message
 * @param date message timestamp
 * @param origin contact that send the message
 * @param groupId message group id
 */
export interface Message {
    id?: number
    msg: string
    date?: string
    origin: number
    groupId: number
}
