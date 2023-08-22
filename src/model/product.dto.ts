export interface ProductData {
    title: string,
    description: string,
    incomePrice: string,
    sellPrice: string,
    discount: string,
    count: number,
    rating: number
    file: number[]
}

export interface AttributeValueData {
    value: string;
}

export interface AttributeData {
    name: string;
    attributeValues: AttributeValueData[];
}

// export interface ProductData {
//     name: string;
//     attributes: AttributeData[];
// }