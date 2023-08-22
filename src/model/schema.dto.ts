import { KeyType } from "@prisma/client"

export  interface SchemaData {
    title: string
    keys: {
        key: string,
        type: KeyType
    }[]
}