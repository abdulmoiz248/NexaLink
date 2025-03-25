import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Group extends Document{


    @Prop({required:true})
    name:string;
    members:string[];
    @Prop({unique:true})
    key:string;
}

export const groupSchema = SchemaFactory.createForClass(Group);