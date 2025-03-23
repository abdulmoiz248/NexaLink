import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Message extends Document{
    @Prop({required:true})
    sender:string;

    @Prop({required:true})
    receiver:string;

    @Prop({required:true})
    message:string;

    @Prop({required:true,default:Date.now})
    time:Date;
    

    @Prop({ default: false })
     delivered: boolean;

    @Prop({required:true,default:false})
    read:boolean;
}

export const messageSchema = SchemaFactory.createForClass(Message);