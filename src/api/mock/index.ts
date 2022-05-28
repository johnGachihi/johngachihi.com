import {setupWorker} from "msw";
import projectHandlers from "./handlers/project";
import { fetchArticlesHandler, handlers } from "./handlers/article";

export const worker = setupWorker(...projectHandlers, fetchArticlesHandler, ...handlers)