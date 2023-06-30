# react-breadcrumbs-hooks

A React breadcrumbs library which is completely router independent based on React Context API. Will render crumb item as long as component is mounted. Link path is determined automatically based on parent path.

Demo coming soon.

## Usage

```js
// layout.tsx or main.tsx where you want to render the breadcrumbs
// this is most likely your base layout
// showing example with children in could also be route definition
// This will render 'Home'
import Breadcrumb from '@/components/Breadcrumb';
import { BreadcrumbProvider, useBreadcrumb } from 'react-breadcrumbs-hooks';

const Layout = ({ children }) => {
  // root path crumb item
  useBreadcrumb({
    title: 'Home',
    path: '/',
  });

  return (
    <BreadcrumbProvider>
      <main>
        <Breadcrumb />
        {children}
      </main>
    </BreadcrumbProvider>
  )
}

// child page eg. Preferences
// showing example with children in could also be sub route definition
// This will render 'Home > Preferences'
const Preferences = ({ children }) => {
  useBreadcrumb({
    title: 'Preferences',
    path: '/preferences',
  });

  return (
    <div>
      Preferences content
      ...
      {children}
    </div>
  )
}

// nested child page eg. Notifications
// This will render 'Home > Preferences > Notifications'
const Notifications = ({ children }) => {
  useBreadcrumb({
    title: 'Notifications',
    path: '/notifications',
  });

  return (
    <div>
      Notifications content
    </div>
  )
}
```

## Installation

``` sh
npm install --save react-breadcrumbs-hooks
```

## Credit

The original code was from [Pedro Alves](https://codesandbox.io/s/react-breadcrumb-hooks-4qch8). Some modifications were made to original code, adapted to Typescript and convert to library for easy usage.

## LICENSE

### [ISC](./LICENSE.md)
