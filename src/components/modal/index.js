import React from "react";
import { modalType } from "@/store/slices/ui.slice";
import CreateTaskModal from "./createTaskModal";
import Modal from "./modalContainer";
import { useUi } from "@/hooks/useUserInterface";
import Notification from "./notification";
import Delete from "./delete";

const ModalWrapper = () => {
  const { modal } = useUi();

  const AllModal = {
    [modalType.NONE]: <></>,
    [modalType.CREATE_TASK]: <CreateTaskModal />,
    [modalType.NOTIFICATION]: <Notification />,
    [modalType.DELETE]: <Delete />,
  };

  return <>{modal && <Modal>{AllModal[modal]}</Modal>}</>;
};

export default ModalWrapper;
