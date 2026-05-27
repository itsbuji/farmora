import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const TableRow = ({ children, className }: Props) => {
  return (
    <tr
      className={`border-b border-gray-200 hover:bg-gray-50 ${className || ""}`}
    >
      {children}
    </tr>
  );
};

export default TableRow;
