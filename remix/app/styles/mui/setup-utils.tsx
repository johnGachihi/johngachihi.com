import { CacheProvider, withEmotionCache } from "@emotion/react";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { unstable_useEnhancedEffect as useEnhancedEffect } from "@mui/material";
import createCache from '@emotion/cache';

export function createEmotionCache() {
  return createCache({ key: "css" });
}

interface ClientStyleContextData {
  reset: () => void;
}
export const ClientStyleContext = createContext<ClientStyleContextData>({
  reset: () => {},
});

export function ClientEmotionCacheProvider({ children }: PropsWithChildren<{}>) {
  const [cache, setCache] = useState(createEmotionCache());

  function reset() {
    setCache(createEmotionCache());
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

export const MuiDocumentWrapper = withEmotionCache(
  ({ children }: PropsWithChildren<{}>, emotionCache) => {
    const clientStyleData = useContext(ClientStyleContext);

    useEnhancedEffect(() => {
      emotionCache.sheet.container = document.head;
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        // eslint-disable-next-line no-underscore-dangle
        (emotionCache.sheet as any)._insertTag(tag);
      });
      clientStyleData.reset();
    }, []);

    return <>{children}</>;
  }
);
