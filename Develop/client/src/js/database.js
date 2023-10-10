import { openDB } from 'idb';

// Function to initialize the database
const initDB = async () => {
  try {
    const db = await openDB('jate', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('jate')) {
          db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
          console.log('jate database created');
        }
      },
    });
    return db;
  } catch (error) {
    console.error('Error initializing the database:', error);
    throw error;
  }
};

// Function to add content to the database
export const putDB = async (content) => {
  try {
    const jateDb = await initDB();
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.add({ jate: content });
    await request;
    console.log('Data added to the database successfully');
  } catch (error) {
    console.error('Error adding data to the database:', error);
    throw error;
  }
};

// Function to get all content from the database
export const getDB = async () => {
  try {
    const jateDb = await initDB();
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll();
    const result = await request;
    console.log('Data retrieved from the database:', result);
    return result;
  } catch (error) {
    console.error('Error retrieving data from the database:', error);
    throw error;
  }
};

// Initialize the database when the module is imported
initDB();

