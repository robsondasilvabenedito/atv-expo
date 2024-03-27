/**
* @interface Group
*
* @param id group id
* @param name group name
* @param contacts list of contact id
* @param isGroup is a group or only two contact message
* @param imageUrl group image
*/
export interface Group {
    id?: number
    name: string
    contacts: number[]
    isGroup: boolean
    imageUrl?: string
 } 
