"use server";
import { ListsPage } from "@/pagess/ListsPage/ListsPage";
import { ServerWrapper } from "@/pagess/ListsPage/ServerWrapper";

export default async function Page() {
  return <ServerWrapper />;
}
