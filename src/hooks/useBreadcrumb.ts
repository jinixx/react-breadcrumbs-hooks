import { useContext, useRef } from "react";
import { useMount, useUnmount } from "react-use";

import type { CrumbItem, ProviderPropType } from "../BreadcrumbsProvider";
import { BreadcrumbContext } from "../BreadcrumbsProvider";

export const useBreadcrumb = (item: CrumbItem) => {
  const itemRef = useRef(item);
  const { addItem, removeItem }: ProviderPropType =
    useContext(BreadcrumbContext);

  useMount(() => {
    addItem(itemRef.current);
  });

  useUnmount(() => {
    removeItem(itemRef.current);
  });
};
