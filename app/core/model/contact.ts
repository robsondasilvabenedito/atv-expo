/**
* @interface Contact
*
* @param id contact id
* @param name contact name
* @param image contact image
* @param password contact password
*/
export interface Contact {
    id: number
    name: string
    password?: string
    imageUrl?: string
}
