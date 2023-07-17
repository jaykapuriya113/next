import { PrismaClient } from "@prisma/client";
import { Resolver, Mutation, Arg, Query, InputType, Field, Int } from "type-graphql";
import { Movie } from "../entity/Movie";

const prisma = new PrismaClient();

@InputType()
class MovieInput {
    @Field()
    title!: string;

    @Field(() => Int)
    minutes!: number;
}

@InputType()
class MovieUpdateInput {
    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => Int, { nullable: true })
    minutes?: number;
}

@Resolver()
export class MovieResolver {
    @Mutation(() => Movie)
    async createMovie(@Arg("options") options: MovieInput): Promise<Movie> {
        try {
            const movie = await prisma.movie.create({ data: options });
            return movie;
        } catch (err) {
            console.log(err);
            throw new Error("Failed to create movie.");
        }
    }


    @Mutation(() => Boolean)
    async updateMovie(
        @Arg("id") id: number,
        @Arg("input") input: MovieUpdateInput
    ): Promise<boolean> {
        try {
            await prisma.movie.update({ where: { id }, data: input });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error("Failed to update movie.");
        }
    }

    @Mutation(() => Boolean)
    async deleteMovie(@Arg("id") id: number): Promise<boolean> {
        try {
            await prisma.movie.delete({ where: { id } });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error("Failed to delete movie.");
        }
    }

    @Query(() => [Movie])
    async movies(): Promise<Movie[]> {
        return prisma.movie.findMany();
    }

    @Query(() => Movie)
    async movieByName(@Arg("name") name: string): Promise<Movie | null> {
        return prisma.movie.findFirst({ where: { title: name } });
    }
}
