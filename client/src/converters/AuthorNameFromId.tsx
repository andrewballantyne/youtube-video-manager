import * as React from 'react';
import useApi from '../api/useApi';
import { AuthorKind, AuthorId } from '../types';
import { getAuthorById } from '../api/apiCallStates';
import { Spinner } from '@patternfly/react-core';

type AuthorNameFromIdProps = {
  id: AuthorId;
};

const AuthorNameFromId: React.FC<AuthorNameFromIdProps> = ({ id }) => {
  const [author, loaded, error] = useApi<AuthorKind>(getAuthorById(id));

  if (!loaded) {
    return <Spinner />;
  }

  if (!author || error) {
    return <span>[Error getting name]</span>;
  }

  return <span>{author.name}</span>;
};

export default AuthorNameFromId;
