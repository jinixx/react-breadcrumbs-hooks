import type { Meta } from "@storybook/react";

import { Demo } from "./Demo";
import { MemoryRouter, useRoutes } from 'react-router-dom';
import { routes } from './DummyPages';

const meta: Meta<typeof Demo> = {
  title: "React Breadcrumbs Hooks/Demo",
  component: Demo,
  parameters: {
    layout: "fullscreen",
  }
};

export default meta;

const Routes = () => useRoutes(routes);

export const ReactRouterDemo = () => (
  <MemoryRouter initialEntries={['/parent/child/nested-child']}>
    <Routes />
  </MemoryRouter>
)
