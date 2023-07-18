"use client";
import { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

interface Animal {
  id: number;
  name: string;
  height: number;
  width: number;
}

const ANIMALS_QUERY = gql`
  query AnimalsQuery {
    animals {
      id
      name
      height
      width
    }
  }
`;

const ANIMALS_BY_HEIGHT_QUERY = gql`
  query AnimalsByHeightQuery($height: Int!) {
    animalsByHeight(height: $height) {
      id
      name
      height
      width
    }
  }
`;

const CREATE_ANIMAL_MUTATION = gql`
  mutation CreateAnimal($name: String!, $height: Int!, $width: Int!) {
    createAnimal(name: $name, height: $height, width: $width) {
      id
      name
      height
      width
    }
  }
`;

const UPDATE_ANIMAL_MUTATION = gql`
  mutation UpdateAnimal(
    $id: Int!
    $name: String!
    $height: Int!
    $width: Int!
  ) {
    updateAnimal(id: $id, name: $name, height: $height, width: $width) {
      id
      name
      height
      width
    }
  }
`;

const DELETE_ANIMAL_MUTATION = gql`
  mutation DeleteAnimal($id: Int!) {
    deleteAnimal(id: $id) {
      id
    }
  }
`;

export default function Home() {
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [heightFilter, setHeightFilter] = useState<number>(0);

  const { loading, error, data } = useQuery<{
    animals: Animal[];
    animalsByHeight: Animal[];
  }>(heightFilter !== 0 ? ANIMALS_BY_HEIGHT_QUERY : ANIMALS_QUERY, {
    variables: { height: heightFilter },
    client,
  });

  const [createAnimal] = useMutation(CREATE_ANIMAL_MUTATION, { client });
  const [updateAnimal] = useMutation(UPDATE_ANIMAL_MUTATION, { client });
  const [deleteAnimal] = useMutation(DELETE_ANIMAL_MUTATION, { client });

  const handleCreateAnimal = () => {
    createAnimal({
      variables: { name, height: parseInt(height), width: parseInt(width) },
      refetchQueries: [{ query: ANIMALS_QUERY }],
    });
    setName("");
    setHeight("");
    setWidth("");
  };

  const handleUpdateAnimal = (
    id: number,
    newName: string,
    newHeight: number,
    newWidth: number
  ) => {
    updateAnimal({
      variables: { id, name: newName, height: newHeight, width: newWidth },
      refetchQueries: [{ query: ANIMALS_QUERY }],
    });
  };

  const handleDeleteAnimal = (id: number) => {
    deleteAnimal({
      variables: { id },
      refetchQueries: [{ query: ANIMALS_QUERY }],
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Animal List</h1>

      <form onSubmit={handleCreateAnimal}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Width"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>

      <input
        type="number"
        placeholder="Search by Height"
        value={heightFilter ? heightFilter.toString() : ""}
        onChange={(e) => setHeightFilter(parseInt(e.target.value) || 0)}
      />

      <ul>
        {heightFilter !== 0
          ? data?.animalsByHeight?.map((animal: Animal) => (
              <li key={animal.id}>
                <input
                  type="text"
                  value={animal.name}
                  onChange={(e) =>
                    handleUpdateAnimal(
                      animal.id,
                      e.target.value,
                      animal.height,
                      animal.width
                    )
                  }
                />
                <input
                  type="number"
                  value={animal.height}
                  onChange={(e) =>
                    handleUpdateAnimal(
                      animal.id,
                      animal.name,
                      parseInt(e.target.value),
                      animal.width
                    )
                  }
                />
                <input
                  type="number"
                  value={animal.width}
                  onChange={(e) =>
                    handleUpdateAnimal(
                      animal.id,
                      animal.name,
                      animal.height,
                      parseInt(e.target.value)
                    )
                  }
                />
                <button onClick={() => handleDeleteAnimal(animal.id)}>
                  Delete
                </button>
              </li>
            ))
          : data?.animals.map((animal: Animal) => (
              <li key={animal.id}>
                <input
                  type="text"
                  value={animal.name}
                  onChange={(e) =>
                    handleUpdateAnimal(
                      animal.id,
                      e.target.value,
                      animal.height,
                      animal.width
                    )
                  }
                />
                <input
                  type="number"
                  value={animal.height}
                  onChange={(e) =>
                    handleUpdateAnimal(
                      animal.id,
                      animal.name,
                      parseInt(e.target.value),
                      animal.width
                    )
                  }
                />
                <input
                  type="number"
                  value={animal.width}
                  onChange={(e) =>
                    handleUpdateAnimal(
                      animal.id,
                      animal.name,
                      animal.height,
                      parseInt(e.target.value)
                    )
                  }
                />
                <button onClick={() => handleDeleteAnimal(animal.id)}>
                  Delete
                </button>
              </li>
            ))}
      </ul>
    </div>
  );
}
