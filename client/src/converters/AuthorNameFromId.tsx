import * as React from 'react';
import useApi from '../api/useApi';
import { Author, AuthorId } from '../types';
import { getAuthorById } from '../api/apiCallStates';
import { Spinner } from '@patternfly/react-core';

type AuthorNameFromIdProps = {
  id: AuthorId;
};

const AuthorNameFromId: React.FC<AuthorNameFromIdProps> = ({ id }) => {
  const [data, loaded, error] = useApi<Author>(getAuthorById(id));

  if (!loaded) {
    return <Spinner />;
  }

  if (!data || error) {
    return <span>[Error getting name]</span>;
  }

  return <span>{data.name}</span>;
};

export default AuthorNameFromId;
