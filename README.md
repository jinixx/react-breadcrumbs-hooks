# react-breadcrumbs-hooks

A React breadcrumbs library which is completely router independent based on React Context API. The crumb item is rendered as long as component is mounted. Link path is determined automatically based on parent component.

Demo coming soon.

## Props

| Props       | Description |
| ----------- | ----------- |
| title       | String | ReactNode          |
| path        | String                      |
| crumbProps? | { [key: string]: unknown; } |

## Usage

```js
// layout.tsx or main.tsx where you want to render the breadcrumbs
// this is most likely your base layout
// showing example with children in could also be route definition
// This will render 'Home'
import { BreadcrumbProvider, Crumb, useBreadcrumbItems } from 'react-breadcrumbs-hooks';

// rendering function for antd
function renderCrumb(
  item: Partial<BreadcrumbItemType & BreadcrumbSeparatorType & CrumbItem>,
  params: unknown,
  items: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[],
  paths: string[],
) {
  const last = items.indexOf(item) === items.length - 1;

  // Disabling a link if isLink is false
  return last || item.crumbProps?.isLink === false ? (
    <span>{item.title}</span>
  ) : (
    <Link href={paths.join('/') || '/'}>{item.title}</Link>
  );
}

const Breadcrumb = () => {
  const items = useBreadcrumbItems();

  return (
    <Breadcrumb
      items={items}
      itemRender={renderCrumb}
      aria-label="breadcrumb"
    />
  );
}

const Layout = ({ children }) => {
  return (
    <BreadcrumbProvider>
      <Crumb title="Home" path="/" />
      <main>
        <Breadcrumb />
        {children}
      </main>
    </BreadcrumbProvider>
  )
}

// Child page eg. Preferences
// Example with children, it could also be sub route definition
// This will render 'Home > Preferences'
// isLink false will not render as crumb item as link
const Preferences = ({ children }) => {
  return (
    <>
      <Crumb title="Preferences" path="/preferences" />
      <div>
        Preferences content
        ...
        {children}
      </div>
    </>
  )
}

// nested child page eg. Notifications
// This will render 'Home > Preferences > Notifications'
const Notifications = ({ children }) => {
  return (
    <div>
      <Crumb title="Notifications" path="/notifications" />
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

The original idea was to use useBreadcrumb hook to declare crumb item. However the approach causes a big red warning (Can not update a component... while rendering a different component) in React when setting state in hook, which breadcrumb item should re-render. The solution as to change useImmediateEffect to useEffect. However, changing it to useEffect will not work as the sequence of calling the hook is not from parent to child, see [https://github.com/facebook/react/issues/15281#issuecomment-479098168](https://github.com/facebook/react/issues/15281#issuecomment-479098168) and [https://stackoverflow.com/questions/69340168/react-hooks-child-component-useeffect-executes-first-before-parent-component](https://stackoverflow.com/questions/69340168/react-hooks-child-component-useeffect-executes-first-before-parent-component), hence one of the workable solution is to render it without a child, hence the calling sequence is correct.

## LICENSE

### [ISC](./LICENSE.md)
