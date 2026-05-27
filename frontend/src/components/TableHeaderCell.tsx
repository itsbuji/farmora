type Props = {
  content: React.ReactNode;
  className?: string;
};

const TableHeaderCell = ({ content, className }: Props) => {
  return (
    <th
      className={`px-4 py-3 text-sm font-bold text-white bg-green-600 text-left whitespace-nowrap ${className || ""}`}
    >
      {content}
    </th>
  );
};

export default TableHeaderCell;
