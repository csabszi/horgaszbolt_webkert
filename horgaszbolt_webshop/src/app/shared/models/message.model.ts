export interface Message {
    name: string;
    email: string;
    message: string;
    category: 'Panasz' | 'Észrevétel' | 'Hibabejelentés' | 'Termék';
    sentDate?: Date;
}