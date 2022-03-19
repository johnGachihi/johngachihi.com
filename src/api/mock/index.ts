import {setupWorker} from "msw";
import projectHandlers from "./handlers/project";

export const worker = setupWorker(...projectHandlers)