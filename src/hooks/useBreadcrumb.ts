import { useContext, useRef } from 'react';
import { useUnmount } from 'react-use';
import useImmediateEffect from 'use-immediate-effect';

import type { CrumbItem, ProviderPropType } from '../BreadcrumbProvider';
import { BreadcrumbContext } from '../BreadcrumbProvider';

export const useBreadcrumb = (item: CrumbItem) => {
  const itemRef = useRef(item);
  const { addItem, removeItem }: ProviderPropType =
    useContext(BreadcrumbContext);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  useImmediateEffect(() => {
    addItem(itemRef.current);
  }, []);

  useUnmount(() => {
    removeItem(itemRef.current);
  });
};
