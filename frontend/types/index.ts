export interface Note{
    id?: string;
    name: string;
    message?: string;
    country: string;
    city: string;
    timestamp: string;
    color?: string;
}

export interface NoteMessage {
    id: string;
    color: string;
}
    