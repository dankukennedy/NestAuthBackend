import {Prop, Schema, SchemaFactory } from  '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Item extends Document {
    @Prop({required: true})
    name:string

    @Prop({required: true})
    description: string

    @Prop({unique:true})
    code:string
}

export const ItemSchema = SchemaFactory.createForClass(Item)