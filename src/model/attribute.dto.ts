import { KeyType } from "@prisma/client"

export interface Attribute {
    key: string,
    type: KeyType,
    value: string
}

export interface MissingAttribute {
    key: string,
    type: KeyType,
}