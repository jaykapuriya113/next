import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const resolvers = {
    Mutation: {
        createAnimal: async (_: any, args: any) => {
            const { name, height, width } = args;
            const animal = await prisma.animal.create({
                data: {
                    name,
                    height,
                    width,
                },
            });
            return animal;
        },
        updateAnimal: async (_: any, args: any) => {
            const { id, name, height, width } = args;
            const animal = await prisma.animal.update({
                where: { id },
                data: {
                    name,
                    height,
                    width,
                },
            });
            return animal;
        },
        deleteAnimal: async (_: any, args: any) => {
            const { id } = args;
            const animal = await prisma.animal.delete({
                where: { id },
            });
            return animal;
        },
    },
    Query: {
        animals: async () => {
            const animals = await prisma.animal.findMany(
                //     {
                //     select: {
                //         id: true,
                //         name: true,
                //     },
                // }
            );
            return animals;
        },

        animalsByHeight: async (_: any, args: any) => {
            const { height } = args;
            const animals = await prisma.animal.findMany({
                where: {
                    height,
                },
                select: {
                    name: true,
                    height: true
                },
            });
            return animals;
        },
    },

};

export default resolvers;
