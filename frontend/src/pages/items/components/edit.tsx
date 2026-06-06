import { Dialog, DialogContent } from "@components/dialog";
import ItemForm from "./form";
import useGetItemById from "../hooks/use-get-item-by-id";
import Ternary from "@components/ternary";
import useEditItem from "../hooks/use-edit-items";

type Props = {
  selectedId: number | null;
  refetch: () => void;
  onClose: () => void;
};

const EditItemCategory = ({ selectedId, onClose, refetch }: Props) => {
  const isShow = selectedId !== null;

  const { dataLoaded, selectedData } = useGetItemById(selectedId);

  const { clearError, errors, onSubmit } = useEditItem(selectedId, {
    onSuccess: () => {
      refetch();
      onClose();
    },
  });

  const handleClose = () => {
    onClose();
    clearError();
  };

  return (
    <Dialog isOpen={isShow} headerTitle="Edit Item" onClose={handleClose}>
      <DialogContent>
        <Ternary
          when={dataLoaded}
          then={
            <ItemForm
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

export default EditItemCategory;
