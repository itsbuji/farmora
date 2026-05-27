type Props = {
  content: React.ReactNode;
  className?: string;
};

const TableCell = ({ content, className }: Props) => {
  return (
    <td
      className={`px-4 py-3 text-sm text-gray-700 whitespace-nowrap ${className || ""}`}
    >
      {content}
    </td>
  );
};

export default TableCell;
