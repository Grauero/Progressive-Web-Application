/* eslint-disable no-unused-vars, no-undef, no-console */

const dbPromise = idb.open('posts-store', 1, db => {
  if (!db.objectStoreNames.contains('posts')) {
    db.createObjectStore('posts', { keyPath: 'id' });
  }
});

function writeData(store, data) {
  return dbPromise.then(db => {
    const transaction = db.transaction(store, 'readwrite');
    transaction.objectStore(store).put(data);

    return transaction.complete;
  });
}

function readAllData(store) {
  return dbPromise.then(db => {
    const transaction = db.transaction(store, 'readonly');

    return transaction.objectStore(store).getAll();
  });
}

function clearAllData(store) {
  return dbPromise.then(db => {
    const transaction = db.transaction(store, 'readwrite');
    transaction.objectStore(store).clear();

    return transaction.complete;
  });
}

function deleteItemFromIDB(store, id) {
  dbPromise
    .then(db => {
      const transaction = db.transaction(store, 'readwrite');
      transaction.objectStore(store).delete(id);

      return transaction.complete;
    })
    .then(() => console.log('Item deleted', id));
}
