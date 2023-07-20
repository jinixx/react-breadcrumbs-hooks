import type { CrumbItem as RBHCrumbItem } from '../../..';
import { Crumb as RBHCrumb } from '../../..';

export type CustomProps = {
  isLink?: boolean;
}

export type CrumbItem = RBHCrumbItem<CustomProps>;

export const Crumb = (props: CrumbItem): null => RBHCrumb<CustomProps>(props);
