export type ISODateString = string;
export type UUIDString = string;



export type AppEvent = {
    id: string;
    title: string;
    description: string;
    dateTime: ISODateString;
    endDateTime: ISODateString;
    startTime: string;
    endTime: string;
    durationMins: number;
    location: string;
    capacity: number;
    price?: number | null;
    imageUrl?: string | null;
    category?: string | null;
    readonly available: number; // computed from capacity - signups

}


export type Signup = {
    id: UUIDString;
    eventId: string; //FK -> AppEvent.id
    name: string;
    email: string;
    createdAt: ISODateString;
}
