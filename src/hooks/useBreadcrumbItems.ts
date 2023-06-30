import { useContext, useLayoutEffect, useRef, useState } from "react";
import { useUnmount } from "react-use";

import type {
  CrumbItem,
  ProviderPropType,
  SubscribeReturnType,
} from "../BreadcrumbProvider";
import { BreadcrumbContext } from "../BreadcrumbProvider";

export const useBreadcrumbItems = () => {
  const subscriptionRef = useRef<SubscribeReturnType>();
  const [items, setItems] = useState<CrumbItem[]>([]);
  const { subscribe } = useContext<ProviderPropType>(BreadcrumbContext);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  useLayoutEffect(() => {
    subscriptionRef.current = subscribe(setItems);
  }, []);

  useUnmount(() => {
    if (subscriptionRef.current) subscriptionRef.current.unsubscribe();
  });

  return items;
};
