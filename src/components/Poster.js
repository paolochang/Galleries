import React, { useEffect, useState } from "react";
import styled from "styled-components";

const SPoster = styled.img`
  opacity: ${(props) => (props.check ? 0.2 : 1)};
`;

const Poster = ({ index, image, onListHandler, isChecked }) => {
  const [checked] = useState(isChecked);
  const onClickHandler = (e) => {
    onListHandler(e.target.currentSrc);
  };

  return (
    <div>
      <span
        style={{
          font: 29,
          fontWeight: 600,
          color: "red",
          backgroundColor: "lime",
          zIndex: 10,
        }}
      >
        TEST{checked}
      </span>
      <SPoster
        check={image.selected}
        src={image.poster}
        alt={index}
        onClick={(e) => onClickHandler(e)}
      />
    </div>
  );
};

export default Poster;
