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
} from '@patternfly/react-core';
import Catalog from './Catalog/Catalog';

const App = () => {
  return (
    <Page
      header={
        <Masthead inset={{ default: 'insetXs' }}>
          <MastheadMain>
            <MastheadBrand href="/" target="_blank">
              youtube-watch-list
            </MastheadBrand>
          </MastheadMain>
          {/*<MastheadContent>*/}
          {/*  <Toolbar id="toolbar">*/}
          {/*    <ToolbarContent>*/}
          {/*      <ToolbarItem>Navigation</ToolbarItem>*/}
          {/*      <ToolbarItem>header-tools</ToolbarItem>*/}
          {/*    </ToolbarContent>*/}
          {/*  </Toolbar>*/}
          {/*</MastheadContent>*/}
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
