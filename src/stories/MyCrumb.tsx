import type { CrumbItem } from '..';
import { Crumb } from '..';

export type CustomProps = {
  isLink?: boolean;
}

export type MyCrumbItem = CrumbItem<CustomProps>;

export const MyCrumb = (props: MyCrumbItem): null => Crumb<CustomProps>(props);
