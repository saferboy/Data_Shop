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

interface AttributeData {
    schemaId?: number
    attributes: {
        key: string,
        type: KeyType,
        value: string
    }[]
}