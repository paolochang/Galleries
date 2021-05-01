import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
import "./Frame.css";

const GridView = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 230px);
`;
const PosterContainer = styled.div`
  height: auto;
`;
const Poster = styled.img``;

const Frame = () => {
  const [posters, setPosters] = useState([]);
  const [selects, setSelects] = useState([]);

  useEffect(() => {
    console.log(`Frame / useEffect`);

    const getMovie = async () => {
      let result = await axios.get("https://yts.mx/api/v2/list_movies.json");
      const {
        data: {
          data: { movies },
        },
      } = result;
      let tempMovies = [];
      movies.map((movie, index) =>
        tempMovies.push({ poster: movie.medium_cover_image, selected: false })
      );
      console.log(`Frame / useEffect / tempMovies`);
      console.log(tempMovies);
      setPosters(tempMovies);
    };

    getMovie();
  }, [posters]);

  const posterOnClick = (e, index) => {
    let poster = e.target.currentSrc;
    let newSelectList = selects;
    let newPosters = posters;

    if (newSelectList.find((elemant) => elemant === poster)) {
      let selectIndex = newSelectList.findIndex((e) => e.poster === poster);
      newSelectList.splice(selectIndex, 1);
      newPosters.splice(index, 1, { poster, selected: false });
    } else {
      newSelectList.push(poster);
      newPosters.splice(index, 1, { poster, selected: true });
    }
    setSelects(newSelectList);
    setPosters(newPosters);
  };

  return (
    <GridView>
      <span>Frame Component</span>
      {posters.map((movie, index) => (
        <PosterContainer>
          <Poster
            key={index}
            src={movie.poster}
            style={
              selects.includes(movie.poster) ? { opacity: 0.5 } : { opacity: 1 }
            }
            onClick={(e) => posterOnClick(e, index)}
          />
          <FaCheckCircle
            style={
              selects.includes(movie.poster)
                ? {
                    position: "relative",
                    bottom: 35,
                    left: 90,
                    fontSize: 22,
                    color: "lime",
                  }
                : {
                    position: "relative",
                    bottom: 35,
                    left: 90,
                    fontSize: 22,
                    color: "lightgray",
                  }
            }
          />
        </PosterContainer>
      ))}
    </GridView>
  );
};

export default Frame;
