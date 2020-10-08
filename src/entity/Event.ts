import {Entity, ObjectIdColumn, ObjectID, Column} from "typeorm";

@Entity()
export class Event {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    date: Date;

    @Column()
    numberOfSeats: string;

    @Column()
    eventCreater: string;

    @Column()
    eventImage: string 
}
