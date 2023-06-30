import { useContext, useRef } from "react";
import { useMount, useUnmount } from "react-use";

import type { CrumbItem, ProviderPropType } from "../BreadcrumbProvider";
import { BreadcrumbContext } from "../BreadcrumbProvider";

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
