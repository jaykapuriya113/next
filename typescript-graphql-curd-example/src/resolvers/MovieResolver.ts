import {
    Resolver,
    Mutation,
    Arg,
    Int,
    Query,
    InputType,
    Field
} from "type-graphql";
import { Movie } from "../entity/Movie";

@InputType()
class MovieInput {
    @Field()
    title!: string;

    @Field(() => Int)
    minutes!: number;
}

@InputType()
class MovieUpdateInput {
    @Field(() => String)
    title?: string;

    @Field(() => Int)
    minutes?: number;
}

@Resolver()
export class MovieResolver {
    @Mutation(() => Movie)
    createMovie(@Arg("options", () => MovieInput) options: MovieInput) {
        try {
            const movie = Movie.create(options).save();
            return movie;
        } catch (err) {
            console.log(err)
            return err
        }
    }


    @Mutation(() => Boolean)
    async updateMovie(
        @Arg("id", () => Int) id: number,
        @Arg("input", () => MovieUpdateInput) input: MovieUpdateInput
    ) {
        await Movie.update({ id }, input);
        return true;
    }

    @Mutation(() => Boolean)
    async deleteMovie(@Arg("id", () => Int) id: number) {
        await Movie.delete({ id });
        return true;
    }

    @Query(() => [Movie])
    movies() {
        return Movie.find();
    }
}