import { useBreadcrumb } from '../hooks/useBreadcrumb';
import type { CrumbItem } from '../BreadcrumbsProvider';

// Becase of the error: "Cannot update a component (`NextBreadcrumb`)
// while rendering a different component", we cannot use useImmediateEffect to addItem
// which will then trigger a setState. We cannot use useEffect nor useLayoutEffect either,
// as calling sequence from parent to child is inverted.
// To ensure calling sequence from parent to child, we must render in it return,
// hence this solution.
export default function Crumb(crumbProps: CrumbItem) {
  useBreadcrumb(crumbProps);

  return null;
}
