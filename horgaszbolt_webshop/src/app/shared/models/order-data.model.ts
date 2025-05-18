export interface OrderData {
    id?: string;
    userId: string;
    userEmail: string;
    name: string;
    address: string;
    phone: string;
    comment?: string;
    totalPrice: number;
    createdAt?: Date;
}