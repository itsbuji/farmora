import { Dialog, DialogContent } from "@components/dialog";
import useAddForm from "@hooks/use-add-form";
import salesBook from "@api/sales-book.api";
import type { NewSalesBookEntryRequest } from "@app-types/sales-book.types";
import SalesBookForm from "./form";

const defaultValues: NewSalesBookEntryRequest = {
  date: "",
  buyer_id: null,
  amount: "",
  narration: "",
};

type Props = {
  isShow: boolean;
  onClose: () => void;
};

const AddSalesBookEntry = ({ isShow, onClose }: Props) => {
  const handleClose = () => {
    onClose();
    methods.reset();
  };

  const { methods, onSubmit } = useAddForm<NewSalesBookEntryRequest>({
    defaultValues,
    mutationFn: salesBook.create,
    mutationKey: "sales-book:add",
    onSuccess: () => {
      handleClose();
    },
  });

  return (
    <Dialog
      isOpen={isShow}
      headerTitle="Add Sales Book Entry"
      onClose={handleClose}
    >
      <DialogContent>
        <SalesBookForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddSalesBookEntry;
