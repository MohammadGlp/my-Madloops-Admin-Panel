// ** Redux Imports
import rootReducer from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import layout from './layout';
import navbar from './navbar';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const authPersist = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: { navbar: navbar, layout: layout, auth: authPersist },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
      ],
    });
  },
});

export { store };

export const persistor = persistStore(store);
