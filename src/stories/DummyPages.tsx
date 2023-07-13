import { Outlet, useLocation } from 'react-router';
import { Link, type RouteObject } from 'react-router-dom';

import { Header } from './Header';
import { MyCrumb } from './MyCrumb';
import BreadcrumbProvider from '../BreadcrumbsProvider';

export const NestedChild = () => {
  return (
    <section style={{ padding: '20px' }}>
      <MyCrumb title="Nested child" path="/nested-child" />
      Nested Child component
      <Outlet />
    </section>
  )
}

export const Child = () => {
  return (
    <section style={{ padding: '20px' }}>
      <MyCrumb title="Child" path="/child" customProps={{ isLink: false }} />
      Child component
      <p>The breadcrumb link for this is disabled with a custom prop.</p>
      <Outlet />
    </section>
  )
}

export const Parent = () => {
  return (
    <section style={{ padding: '20px' }}>
      <MyCrumb title="Parent" path="/parent" />
      Parent component
      <Outlet />
    </section>
  )
}

export const Home = () => (
  <section style={{ padding: '20px' }}>
    Home
    <Outlet />
  </section>
);

export const Layout = () => {
  const { pathname } = useLocation();

  return (
    <BreadcrumbProvider>
      <MyCrumb title="Home" path="/" />
      <Header />
      <div className="storybook-page" style={{ display: 'flex', flexDirection: 'row', width: '100%', margin: 0 }}>
        <div className="sidebar" style={{ paddingRight: '20px', borderRight: '1px solid #dddddd', width: '250px', flex: '250px 0 0' }}>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/parent">Parent</Link>
                <ul>
                  <li>
                    <Link to="/parent/child">Child</Link>
                    <ul>
                      <li>
                        <Link to="/parent/child/nested-child">Nested child</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <div className="content" style={{ padding: '20px', flex: 1 }}>
          <div className="loc" style={{ borderBottom: '1px solid #eeeeee', paddingBottom: '15px' }}>
            Current path: {pathname}
          </div>
          <Outlet />
        </div>
      </div>
    </BreadcrumbProvider>
  );
}

export const NoMatch = () => <div>404</div>;

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/parent",
        element: <Parent />,
        children: [
          {
            path: "/parent/child",
            element: <Child />,
            children: [
              {
                path: "/parent/child/nested-child",
                element: <NestedChild />
              }
            ]
          },
        ],
      },
      { path: "*", element: <NoMatch /> },
    ],
  }
];