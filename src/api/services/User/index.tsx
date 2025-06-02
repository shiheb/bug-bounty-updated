import { createContext, useContext, FC, ReactNode } from 'react';

import Store from './store';

/* 
CONTEXT / PROVIDER INIT
*/

// Context stores Store instance or null
const UserStoreContext = createContext<Store | null>(null);

// Define props with children properly typed
interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  return <UserStoreContext.Provider value={new Store()}>{children}</UserStoreContext.Provider>;
};

/* 
HOOK DEFINITION
*/

export const useUserStore = () => useContext(UserStoreContext);
