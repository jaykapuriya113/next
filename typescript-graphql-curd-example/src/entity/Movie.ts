
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class Movie {
    @Field(() => Int)
    id: number;

    @Field()
    title: string;

    @Field(() => Int)
    minutes: number;
}
