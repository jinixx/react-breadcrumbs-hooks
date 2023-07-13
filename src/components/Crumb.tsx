import { useBreadcrumb } from '../hooks/useBreadcrumb';
import type { ReactNode } from 'react';

export type CrumbItem<T = never> = {
  title: string | ReactNode;
  path: string;
  customProps?: T;
};

// Becase of the error: "Cannot update a component __YOUR_BREADCRUMB_COMPONENT__
// while rendering a different component", we cannot use useImmediateEffect to addItem
// which will then trigger a setState. We cannot use useEffect nor useLayoutEffect either,
// as calling sequence from parent to child is inverted.
// To ensure calling sequence from parent to child, we must render in it return,
// hence this solution.
export default function Crumb<T>(crumbProps: CrumbItem<T>) {
  useBreadcrumb(crumbProps as CrumbItem);

  return null;
}
