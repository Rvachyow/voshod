"use client";
import { Avatar, List, Button } from "antd";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { ModalApp } from "@/components/ModalApp";
import axios from "axios";

import styles from "./styles.module.css";
import { IItems } from "./types";

export const ListsPage = ({
  items,
  pages,
}: {
  items?: IItems[];
  pages: number;
}) => {
  const { id: rawId } = useParams();
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const showModal = (id: number) => {
    router.push(`?page=${id}`);
  };

  const handleOk = () => {
    router.push(id);
  };

  const handleCancel = () => {
    router.push(id);
  };

  const nextPage = () => {
    router.push(`/lists/${+id + 1}`);
  };

  const prevPage = () => {
    router.push(`/lists/${+id - 1}`);
  };

  return (
    <div className={styles.lists}>
      <List<IItems>
        size="large"
        bordered
        header={
          <div className={styles.btns}>
            {
              <Button
                style={{ backgroundColor: "white" }}
                onClick={router.back}
                type="primary"
              >
                back
              </Button>
            }
            {+id > 1 ? (
              <Button
                style={{ backgroundColor: "white" }}
                onClick={prevPage}
                type="primary"
              >
                prevPage
              </Button>
            ) : null}
            {+id !== pages ? (
              <Button
                style={{ backgroundColor: "white" }}
                onClick={nextPage}
                type="primary"
              >
                nextPage
              </Button>
            ) : null}
          </div>
        }
        itemLayout="horizontal"
        dataSource={items ?? ([] as IItems[])}
        renderItem={(item) => (
          <List.Item key={item.id} onClick={() => showModal(item.id)}>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://s.yimg.com/ny/api/res/1.2/2uscVxzgsTr3itAXTsKhDw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTY0MDtjZj13ZWJw/https://media.zenfs.com/en/coindesk_75/2837cd9a4621ec3beb03792fc766cfa0`}
                />
              }
              title={<p>{item.name}</p>}
            />
          </List.Item>
        )}
      />
      <ModalApp
        isModalOpen={!!page}
        handleOk={handleOk}
        handleCancel={handleCancel}
        showModal={showModal}
      ></ModalApp>
    </div>
  );
};
