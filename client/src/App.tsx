import * as React from 'react';
import {
  Masthead,
  MastheadMain,
  MastheadBrand,
  MastheadContent,
  Page,
  PageSection,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Title,
  Level,
  LevelItem,
} from '@patternfly/react-core';
import Catalog from './Catalog/Catalog';
import { YoutubeIcon } from '@patternfly/react-icons';

const App = () => {
  return (
    <Page
      header={
        <Masthead>
          <MastheadMain>
            <Level hasGutter>
              <LevelItem>
                <YoutubeIcon size="xl" />
              </LevelItem>
              <LevelItem>
                <Title headingLevel="h1" size="2xl">
                  YouTube Video Manager
                </Title>
              </LevelItem>
            </Level>
          </MastheadMain>
        </Masthead>
      }
    >
      <PageSection>
        <Catalog />
      </PageSection>
    </Page>
  );
};

export default App;
