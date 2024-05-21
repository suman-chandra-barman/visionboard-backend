import React, { Dispatch, SetStateAction } from "react";
import { Modal } from "antd";

type TLHModalProps = {
  children: React.ReactNode;
  title: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const LHModal = ({ children, title, open, setOpen }: TLHModalProps) => {
  return (
    <Modal
      title={title}
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      footer
    >
      {children}
    </Modal>
  );
};

export default LHModal;
