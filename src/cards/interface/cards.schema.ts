import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Card extends Document {
    @Prop({ required: true })
    name: String;

    @Prop()
    manaCost: String;

    @Prop()
    rarity: String;

    @Prop()
    type: String;

    @Prop()
    power: String;

    @Prop()
    toughness: String;

    @Prop()
    text: String;

}

export const CardSchema = SchemaFactory.createForClass(Card);