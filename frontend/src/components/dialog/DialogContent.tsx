import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DialogContent = ({ children }: Props) => {
  return <div className="px-6 py-4 overflow-y-auto flex-1">{children}</div>;
};

export default DialogContent;
