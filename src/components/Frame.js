import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import Poster from "./Poster";

const GridView = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 230px);
`;

const Frame = () => {
  //   const [movies, setMovies] = useState([]);
  const [posters, setPosters] = useState([]);
  const [selects, setSelects] = useState([]);
  const getMovie = async () => {
    let result = await axios.get("https://yts.mx/api/v2/list_movies.json");
    console.log(result);
    const {
      data: {
        data: { movies },
      },
    } = result;
    if (posters.length === 0) {
      movies.map((movie, index) =>
        setPosters((old) => [
          ...old,
          { poster: movie.medium_cover_image, selected: false },
        ])
      );
    }
  };

  useEffect(() => {
    getMovie();
  });

  const onListHandler = (poster) => {
    let newArray = selects;
    if (newArray.find((element) => element === poster)) {
      let index = newArray.indexOf(poster);
      newArray.splice(index, 1);
    } else {
      newArray.push(poster);
    }
    setSelects(newArray);
  };

  return (
    <GridView>
      <span>Frame Component</span>
      {posters.map((movie, index) => (
        <Poster
          key={index}
          image={movie}
          index={index}
          isChecked={selects.includes(movie)}
          onListHandler={onListHandler}
        />
      ))}
    </GridView>
  );
};

export default Frame;
