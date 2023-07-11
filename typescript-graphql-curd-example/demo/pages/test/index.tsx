import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useMutation,
  useQuery,
} from "@apollo/client";
import { useState } from "react";
import Card from "@mui/material/Card";
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const CREATE_MOVIE_MUTATION = gql`
  mutation CreateMovie($input: MovieInput!) {
    createMovie(options: $input) {
      id
      title
      minutes
    }
  }
`;

const UPDATE_MOVIE_MUTATION = gql`
  mutation UpdateMovie($id: Int!, $input: MovieUpdateInput!) {
    updateMovie(id: $id, input: $input)
  }
`;

const DELETE_MOVIE_MUTATION = gql`
  mutation DeleteMovie($id: Int!) {
    deleteMovie(id: $id)
  }
`;

const GET_MOVIES_QUERY = gql`
  query GetMovies {
    movies {
      id
      title
      minutes
    }
  }
`;

const Home = () => {
  const [title, setTitle] = useState<string>("");
  const [minutes, setMinutes] = useState<number>(0);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [updatedTitle, setUpdatedTitle] = useState<string>("");
  const [updatedMinutes, setUpdatedMinutes] = useState<number>(0);
  const [selectedMovieId, setSelectedMovieId] = useState<number>(0);

  const { loading, error, data } = useQuery(GET_MOVIES_QUERY, { client });

  const [createMovie] = useMutation(CREATE_MOVIE_MUTATION, {
    client,
    onCompleted: () => {
      setTitle("");
      setMinutes(0);
    },
    refetchQueries: [{ query: GET_MOVIES_QUERY }],
  });

  const [updateMovie] = useMutation(UPDATE_MOVIE_MUTATION, { client });
  const [deleteMovie] = useMutation(DELETE_MOVIE_MUTATION, {
    client,
    refetchQueries: [{ query: GET_MOVIES_QUERY }],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createMovie({
      variables: {
        input: {
          title,
          minutes,
        },
      },
    });
  };

  const handleUpdateModalOpen = (
    id: number,
    currentTitle: string,
    currentMinutes: number
  ) => {
    setSelectedMovieId(id);
    setUpdatedTitle(currentTitle);
    setUpdatedMinutes(currentMinutes);
    setUpdateModalVisible(true);
  };

  const handleUpdateModalClose = () => {
    setUpdateModalVisible(false);
  };

  const handleUpdate = () => {
    updateMovie({
      variables: {
        id: selectedMovieId,
        input: {
          title: updatedTitle,
          minutes: updatedMinutes,
        },
      },
    });
    setUpdateModalVisible(false);
  };

  const handleDelete = (id: number) => {
    deleteMovie({
      variables: {
        id,
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ApolloProvider client={client}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Movie Title"
            style={{ fontSize: "18px", padding: "10px" }}
            required
          />
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value))}
            placeholder="Movie Duration (minutes)"
            style={{ fontSize: "18px", padding: "10px" }}
            required
          />
          <button
            style={{ fontSize: "18px", padding: "10px 20px" }}
            type="submit"
          >
            Create Movie
          </button>
        </form>
        {updateModalVisible && (
          <Card sx={{ backgroundColor: "grey" }}>
            {" "}
            <div className="modal">
              <div
                className="modal-content"
                style={{ fontSize: "18px", padding: "10px" }}
              >
                <br></br>
                <br></br>
                <h2>Update Movie</h2>
                <form onSubmit={handleUpdate}>
                  <input
                    type="text"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                    placeholder="Updated Movie Title"
                    style={{ fontSize: "18px", padding: "10px" }}
                    required
                  />
                  <input
                    type="number"
                    value={updatedMinutes}
                    onChange={(e) =>
                      setUpdatedMinutes(parseInt(e.target.value))
                    }
                    placeholder="Updated Movie Duration (minutes)"
                    style={{ fontSize: "18px", padding: "10px" }}
                    required
                  />
                  <button
                    style={{ fontSize: "18px", padding: "10px" }}
                    type="submit"
                  >
                    Update
                  </button>
                  <button
                    style={{ fontSize: "18px", padding: "10px" }}
                    onClick={handleUpdateModalClose}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </Card>
        )}
        <div>
          {data.movies.map(
            (movie: { id: number; title: string; minutes: number }) => (
              <div key={movie.id}>
                <h2 style={{ fontSize: "30px" }}>{movie.title}</h2>
                <p style={{ fontSize: "30px" }}>{movie.minutes} minutes</p>
                <button
                  style={{ fontSize: "18px", padding: "10px 20px" }}
                  onClick={() =>
                    handleUpdateModalOpen(movie.id, movie.title, movie.minutes)
                  }
                >
                  Update
                </button>
                <button
                  style={{ fontSize: "18px", padding: "10px 20px" }}
                  onClick={() => handleDelete(movie.id)}
                >
                  Delete
                </button>
              </div>
            )
          )}
        </div>
      </main>
    </ApolloProvider>
  );
};
export default Home;