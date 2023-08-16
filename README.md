# @jinixx/react-breadcrumbs-hooks

A React breadcrumbs library which is completely router independent based on React Context API. The crumb item is rendered as long as component is mounted. Link path is determined automatically based on parent component.

See Storybook for demo.

## Crumb component props

| Props       | Description |
| ----------- | ----------- |
| title       | ReactNode   |
| path        | String      |
| crumbProps? | T           |

## Usage

Creating your Breadcrumb component and use it anywhere within provider.

```tsx
// MyBreadcrumb.tsx
import { Breadcrumb as AntdBreadcrumb } from 'antd';
import type {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import { BreadcrumbProvider, Crumb, useBreadcrumbItems } from '@jinixx/react-breadcrumbs-hooks';
import type { CrumbItem } from '@jinixx/react-breadcrumbs-hooks';

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
    <AntdBreadcrumb
      items={items}
      itemRender={renderCrumb}
      aria-label="breadcrumb"
    />
  );
}
```

Using the custom Breadcrumb component and `Crumb` directly.

```tsx
// Layout.tsx 
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
```

### Typed customProps

Instead of using `Crumb` directly, it can also be used with `customProps` typed.

```tsx
// MyCrumb.tsx
import type { CrumbItem } from '@jinixx/react-breadcrumbs-hooks';
import { Crumb } from '@jinixx/react-breadcrumbs-hooks';

export type CustomProps = {
  isLink?: boolean;
}

export type MyCrumbItem = CrumbItem<CustomProps>;

export const MyCrumb = (props: MyCrumbItem): null => Crumb<CustomProps>(props);
```

Using `MyCrumb` custom component, in this example `isLink` false will not render crumb item as link.

```tsx
// Example page usage
// Preferences.tsx
const Preferences = ({ children }) => {
  return (
    <>
      <MyCrumb title="Preferences" path="/preferences" isLink={false} />
      <div>
        Preferences content
        ...
        {children}
      </div>
    </>
  )
}
```

Nested children. In case where `Notifications` is a child route of `Preferences`, the route will be constructed automatically. Eg. `/preferences/notications`.

```tsx
// Notifications.tsx
const Notifications = ({ children }) => {
  return (
    <div>
      <MyCrumb title="Notifications" path="/notifications" />
      Notifications content
    </div>
  )
}
```

## Installation

```sh
npm install --save @jinixx/react-breadcrumbs-hooks
```

## Credit

The original code was from [Pedro Alves](https://codesandbox.io/s/react-breadcrumb-hooks-4qch8). Some modifications were made to original code, adapted to Typescript and convert to library for easy usage.

The original idea was to use useBreadcrumb hook to declare crumb item. However the approach causes a big red warning (Can not update a component... while rendering a different component) in React when setting state in hook, which breadcrumb item should re-render. The solution as to change useImmediateEffect to useEffect. However, changing it to useEffect will not work as the sequence of calling the hook is not from parent to child, see [https://github.com/facebook/react/issues/15281#issuecomment-479098168](https://github.com/facebook/react/issues/15281#issuecomment-479098168) and [https://stackoverflow.com/questions/69340168/react-hooks-child-component-useeffect-executes-first-before-parent-component](https://stackoverflow.com/questions/69340168/react-hooks-child-component-useeffect-executes-first-before-parent-component), hence one of the workable solution is to render it without a child, hence the calling sequence is correct.

## License

[ISC](./LICENSE.md)
