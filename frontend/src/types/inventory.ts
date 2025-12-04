export interface ImportRecord {
id: number;
date: string;
items: {
productId: number;
quantity: number;
}[];
}