import { Dialog, DialogContent } from "@components/dialog";
import type { IntegrationBookFormValues } from "../types";
import IntegrationBookForm from "./form";
import useAddIntegrationBook from "../hooks/use-add-integration-book";
import dayjs from "dayjs";

const defaultValues: IntegrationBookFormValues = {
  farm_id: null,
  amount: "",
  date: dayjs().toISOString(),
  payment_type: "paid",
};

type Props = {
  isShow: boolean;
  onClose: () => void;
  refetch: () => void;
};

const AddIntegrationBook = ({ isShow, onClose, refetch }: Props) => {
  const { errors, onSubmit, clearErrors } = useAddIntegrationBook(() => {
    onClose();
    refetch();
  });

  const handleClose = () => {
    onClose();
    clearErrors();
  };

  return (
    <Dialog
      isOpen={isShow}
      headerTitle="Add Integration Book Entry"
      onClose={handleClose}
    >
      <DialogContent>
        <IntegrationBookForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          apiErrors={errors}
          onCancel={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddIntegrationBook;
