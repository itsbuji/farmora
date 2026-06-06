import { Dialog, DialogContent } from "@components/dialog";
import BatchForm from "./form";
import useEditForm from "@hooks/use-edit-form";
import useGetById from "@hooks/use-get-by-id";
import batches from "@api/batches.api";
import type { EditBatchRequest } from "@app-types/batch.types";
import useGetBatchById from "../hooks/use-get-batch-by-id";
import Ternary from "@components/ternary";
import useEditBatch from "../hooks/use-edit-batch";

type Props = {
  selectedId: number | null;
  onClose: () => void;
  refetch: () => void;
};

const EditBatch = ({
  selectedId,
  onClose,

  refetch,
}: Props) => {
  const isShow = selectedId !== null;

  const { dataLoaded, selectedData } = useGetBatchById(selectedId);

  const { clearError, errors, onSubmit } = useEditBatch(selectedId, {
    onSuccess: () => {
      refetch();
      handleClose();
    },
  });

  const handleClose = () => {
    onClose();
    clearError();
  };

  return (
    <Dialog isOpen={isShow} headerTitle="Edit Batch" onClose={handleClose}>
      <DialogContent>
        <Ternary
          when={dataLoaded}
          then={
            <BatchForm
              onSubmit={onSubmit}
              defaultValues={selectedData}
              apiError={errors}
              onCancel={handleClose}
            />
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditBatch;
