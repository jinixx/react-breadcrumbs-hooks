import { useContext, useRef, useState } from "react";
import { useMount, useUnmount } from "react-use";

import type {
  ProviderPropType,
  SubscribeReturnType,
} from "../BreadcrumbsProvider";
import { BreadcrumbContext } from "../BreadcrumbsProvider";
import type { CrumbItem } from "../components/Crumb";

export const useBreadcrumbItems = () => {
  const subscriptionRef = useRef<SubscribeReturnType>();
  const [items, setItems] = useState<CrumbItem[]>([]);
  const { subscribe } = useContext<ProviderPropType>(BreadcrumbContext);

  useMount(() => {
    subscriptionRef.current = subscribe(setItems);
  });

  useUnmount(() => {
    if (subscriptionRef.current) subscriptionRef.current.unsubscribe();
  });

  return items;
};
