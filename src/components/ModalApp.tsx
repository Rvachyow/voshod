import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Modal } from "antd";

export const ModalApp = ({
  isModalOpen,
  handleOk,
  handleCancel,
  showModal,
}: {
  isModalOpen: boolean;
  handleOk: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  showModal: (id: number) => void;
}) => {
  
  const [item, setItem] = useState<{ name: string; text: string }>();
  const params = useSearchParams();

  const getData = async () => {
    try {
      const { data } = await axios(
        `https://taxivoshod.ru/testapi/?w=item&id=${params?.get("page") || 1}`
      );
      setItem(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    if (params?.get("page")) {
      showModal(Number(params?.get("page")));
    }
  }, [params?.get("page")]);

  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>{item?.name}</p>
      <p>{item?.text}</p>
    </Modal>
  );
};
