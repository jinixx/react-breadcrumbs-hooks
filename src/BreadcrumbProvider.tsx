import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useCallback, useMemo, useRef } from 'react';

type SubscribeReturn = {
  unsubscribe: () => void;
};

export type CrumbItem = {
  title: string | ReactNode;
  path?: string;
};

export type SubscribeReturnType = SubscribeReturn | undefined;

export type SubscribePropType = Dispatch<SetStateAction<CrumbItem[]>>;

export type ProviderPropType = {
  addItem: (item: CrumbItem) => CrumbItem;
  removeItem: (item: CrumbItem) => void;
  subscribe: (setState: SubscribePropType) => SubscribeReturnType;
};

export const BreadcrumbContext = createContext<ProviderPropType>(
  {} as ProviderPropType,
);

export default function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const itemsRef = useRef<CrumbItem[]>([]);
  const listernersRef = useRef<SubscribePropType[]>([]);

  const addItem = useCallback((item: CrumbItem) => {
    const index = itemsRef.current.findIndex((i) => i.path === item.path);

    if (index > -1) return item;

    itemsRef.current = [...itemsRef.current, item];
    listernersRef.current.forEach((listener) => listener(itemsRef.current));

    return item;
  }, []);

  const removeItem = useCallback((item: CrumbItem) => {
    itemsRef.current = itemsRef.current.filter((i) => i.path !== item.path);
    listernersRef.current.forEach((listener) => listener(itemsRef.current));
  }, []);

  const subscribe = useCallback((listener: SubscribePropType) => {
    listernersRef.current.push(listener);

    listener(itemsRef.current);

    return {
      unsubscribe() {
        const index = listernersRef.current.findIndex((l) => l === listener);

        listernersRef.current.splice(index, 1);
      },
    };
  }, []);

  const valueProps: ProviderPropType = useMemo(
    () => ({
      addItem,
      removeItem,
      subscribe,
    }),
    [addItem, removeItem, subscribe],
  );

  return (
    <BreadcrumbContext.Provider value={valueProps}>
      {children}
    </BreadcrumbContext.Provider>
  );
}
