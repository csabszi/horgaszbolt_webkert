export interface Message {
    userId: string;
    name: string;
    email: string;
    message: string;
    category: 'Panasz' | 'Észrevétel' | 'Hibabejelentés' | 'Termék';
    sentDate?: Date;
}