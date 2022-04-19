import * as React from 'react';
import { AuthorId, AuthorKind } from '../types';
import useGetApi from '../api/useGetApi';
import { getAuthorById } from '../api/apiReadStates';
import { Spinner } from '@patternfly/react-core';

type UsingAuthorProps = {
  id: AuthorId;
  render: (author: AuthorKind) => React.ReactElement;
  errorRender?: (error: Error) => React.ReactElement;
  loadingRender?: () => React.ReactElement;
};

const UsingAuthor: React.FC<UsingAuthorProps> = ({
  id,
  render,
  errorRender,
  loadingRender,
}) => {
  const [author, loaded, error] = useGetApi<AuthorKind>(getAuthorById(id));

  if (!loaded) {
    return loadingRender ? loadingRender() : <Spinner size="sm" />;
  }

  if (!author || error) {
    const safeError = error ?? new Error('Unknown error');
    return errorRender ? (
      errorRender(safeError)
    ) : (
      <span>[Error getting author :: {safeError.message}]</span>
    );
  }

  return render(author);
};

export default UsingAuthor;
