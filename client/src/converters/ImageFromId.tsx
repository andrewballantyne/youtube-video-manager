import * as React from 'react';
import useGetApi from '../api/useGetApi';
import { ImageId, ImageKind } from '../types';
import { getImageById } from '../api/apiReadStates';
import { Spinner } from '@patternfly/react-core';

type ImageFromIdProps = {
  id: ImageId;
};

const ImageFromId: React.FC<ImageFromIdProps> = ({ id }) => {
  const [img, loaded, error] = useGetApi<ImageKind>(getImageById(id));

  if (!loaded) {
    return <Spinner />;
  }

  if (!img || error) {
    return <span>[Error getting image]</span>;
  }

  return (
    <img alt="Image" src={img.src} style={{ minWidth: 150, maxWidth: 150 }} />
  );
};

export default ImageFromId;
