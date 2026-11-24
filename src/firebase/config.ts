import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

/**
 * Configuración del proyecto Firebase (Realtime Database).
 * Estos valores identifican la app web; no son secretos. El acceso se controla con las reglas de la base de datos.
 */
const firebaseConfig = {
  apiKey: 'AIzaSyC6TevT509JX4NeTlvM-7lN0LOKw9grUUk',
  authDomain: 'proyecto03-vgsales.firebaseapp.com',
  databaseURL: 'https://proyecto03-vgsales-default-rtdb.firebaseio.com',
  projectId: 'proyecto03-vgsales',
  storageBucket: 'proyecto03-vgsales.firebasestorage.app',
  messagingSenderId: '910719905981',
  appId: '1:910719905981:web:b8f8760483a8058a4a07d4',
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
