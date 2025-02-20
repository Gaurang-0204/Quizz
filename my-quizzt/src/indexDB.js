

import { openDB } from "idb";

const DB_NAME = "QuizDB";
const STORE_NAME = "attempts";
const DB_VERSION = 1;

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      console.log("Upgrading database...");

      // Log existing object stores
      console.log("Existing stores:", db.objectStoreNames);

      // Create object store if it doesn't exist
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        console.log("Creating object store:", STORE_NAME);
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      } else {
        console.log("Object store already exists:", STORE_NAME);
      }
    },
  });
};


export const saveQuizAttempt = async (quizName, score, totalQuestions) => {
  try {
    const db = await initDB();
    if (!db) throw new Error("Database initialization failed");

    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    await store.add({
      quizName,
      score,
      totalQuestions,
      date: new Date().toISOString(),
    });

    await tx.done;
    console.log("Quiz attempt saved successfully!");
  } catch (error) {
    console.error("Error saving quiz attempt:", error);
  }
};
