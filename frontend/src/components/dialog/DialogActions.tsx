import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DialogActions = ({ children }: Props) => {
  return (
    <div className="border-t border-gray-200 px-6 py-4 flex gap-3 justify-end">
      {children}
    </div>
  );
};

export default DialogActions;
