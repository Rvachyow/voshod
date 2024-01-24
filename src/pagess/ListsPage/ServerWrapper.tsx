import { headers } from "next/headers";
import { ListsPage } from "./ListsPage";
import axios from "axios";
import { IItems } from "./types";

const getPages = async (id: string) => {
  try {
    const { data } = await axios.get(
      `https://taxivoshod.ru/testapi/?w=list&page=${id}`
    );

    return data as { items: IItems[], pages: number };
  } catch (error) {
    console.error(error);
  }
};

export const ServerWrapper = async () => {
  const url = new URL(headers().get("x-url") as string);
  const id = url.pathname.substring(url.pathname.lastIndexOf("/") + 1);
  const { items, pages } = await getPages(id) ?? {};

  return <ListsPage items={items} pages={pages ?? 0} />;
};
