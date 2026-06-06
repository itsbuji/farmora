import { Dialog, DialogContent } from "@components/dialog";
import type { BatchFormValues } from "../types";
import BatchForm from "./form";
import useAddBatch from "../hooks/use-add-batch";

const defaultValues: BatchFormValues = {
  name: "",
  farm_id: "",
  season_id: "",
  status: "active",
};

type Props = {
  isShow: boolean;
  refetch: () => void;
  onClose: () => void;
};

const AddBatch = ({ isShow, onClose, refetch }: Props) => {
  const { clearError, errors, onSubmit } = useAddBatch({
    onSuccess: () => {
      handleClose();
      refetch();
    },
  });

  const handleClose = () => {
    onClose();
    clearError();
  };

  return (
    <Dialog isOpen={isShow} headerTitle="Add New Batch" onClose={handleClose}>
      <DialogContent>
        <BatchForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          apiError={errors}
          onCancel={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddBatch;
