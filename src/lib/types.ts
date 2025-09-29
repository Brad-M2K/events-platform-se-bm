export type ISODateString = string;
export type UUIDString = string;



export type AppEvent = {
    id: string;
    title: string;
    description: string;
    dateTime: ISODateString;
    durationMins: number;
    location: string;
    capacity: number;
    readonly available: number; // FK -> capacity - SignUps

}


export type Signup = {
    id: UUIDString;
    eventId: string; //FK -> AppEvent.id
    name: string;
    email: string;
    createdAt: ISODateString;
}