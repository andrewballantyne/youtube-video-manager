import * as React from 'react';
import useApi from '../api/useApi';
import { ImageId, ImageKind } from '../types';
import { getImageById } from '../api/apiCallStates';
import { Spinner } from '@patternfly/react-core';

type ImageFromIdProps = {
  id: ImageId;
};

const ImageFromId: React.FC<ImageFromIdProps> = ({ id }) => {
  const [img, loaded, error] = useApi<ImageKind>(getImageById(id));

  if (!loaded) {
    return <Spinner />;
  }

  if (!img || error) {
    return <span>[Error getting image]</span>;
  }

  return <img alt="Image" src={img.src} style={{ width: 150 }} />;
};

export default ImageFromId;
