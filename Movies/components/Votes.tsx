import React from 'react';
import styled from 'styled-components/native';

interface VotesProps {
  voteAverage: number;
}

const Votes: React.FC<VotesProps> = ({ voteAverage }) => {
  return <Rating>⭐ {voteAverage ? voteAverage.toFixed(1) : null}/10</Rating>;
};

const Rating = styled.Text`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.8);
`;

export default Votes;
