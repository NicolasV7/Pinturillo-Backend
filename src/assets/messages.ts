import { not } from "joi";
import { start } from "repl";

export const messages = {
  category: {
    notFound: "Category not found",
    notFoundById: "Category with the given ID not found",
    alreadyExists: "Category already exists",
    created: "Category created",
    updated: "Category updated",
    deleted: "Category deleted",
  },
  gameRoom: {
    notFound: "Game Room not found",
    notFoundById: "Game Room with the given ID not found",
    alreadyExists: "Game Room already exists",
    created: "Game Room created",
    updated: "Game Room updated",
    deleted: "Game Room deleted",
    started: "En curso",
    finished: "Finalizado",
    notStarted: "Sin iniciar",
  },
  wordCategory: {
    notFound: "Word-Category not found",
    notFoundById: "Word-Category with the given ID not found",
    alreadyExists: "Word-Category already exists",
    created: "Word-Category created",
    updated: "Word-Category updated",
    deleted: "Word-Category deleted",
  },
  word: {
    notFound: "Word not found",
    notFoundByText: "Word with the given text not found",
    notFoundById: "Word with the given ID not found",
    alreadyExists: "Word already exists",
    created: "Word created",
    updated: "Word updated",
    deleted: "Word deleted",
  },
  auth: {
    invalidCredentials: "Invalid credentials",
    unauthorized: "Unauthorized",
  },
  validation: {
    invalid: "Invalid data",
  },
  server: {
    error: "Internal server error",
  },
};
