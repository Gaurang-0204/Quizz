import { openDB } from "idb";

const DB_NAME = "QuizDB";
const STORE_NAME = "attempts";
const DB_VERSION = 1;

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        console.log("Creating object store:", STORE_NAME);
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    },
  });
};

export const saveQuizAttempt = async (quizName, score, totalQuestions) => {
  const db = await initDB();
  await db.add(STORE_NAME, {
    quizName,
    score,
    totalQuestions,
    date: new Date().toISOString(),
  });
};

export const getQuizAttempts = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};
