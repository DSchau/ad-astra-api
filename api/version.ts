import { Context } from "elysia";

interface Store {
  version: number;
}

export async function version({
  getDate,
  store,
}: Context & { getDate: () => number; store: Store }) {
  return {
    date: getDate(),
    version: store.version,
  };
}
