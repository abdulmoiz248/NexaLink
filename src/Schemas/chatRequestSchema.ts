import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class ChatRequest extends Document{

    @Prop({required:true})
    sender:string;
    @Prop({required:true})
    receiver:string;
    @Prop({required:true, defaultValue:'Pending'})
    status:string;
}

export const chatRequestSchema = SchemaFactory.createForClass(ChatRequest);