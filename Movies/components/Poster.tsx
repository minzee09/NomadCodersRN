import { makeImgPath } from '@/utilities/utils';
import React from 'react';
import styled from 'styled-components/native';

interface PosterProps {
  path: string;
}

const Poster: React.FC<PosterProps> = ({ path }) => {
  return <Image source={{ uri: makeImgPath(path) }} />;
};

const Image = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
  background-color: grey;
`;

export default Poster;
