import { Dialog, DialogContent } from "@components/dialog";
import FarmForm from "./farm-form";
import useGetFarmById from "../hooks/use-get-farm-by-id";
import useEditFarm from "../hooks/use-edit-farm";

type Props = {
  selectedId: number | null;
  onClose: () => void;
  refetch: () => void;
};

const EditFarm = (props: Props) => {
  const { selectedId, onClose, refetch } = props;
  const isShow = selectedId !== null;

  const { selectedData } = useGetFarmById(selectedId);

  const { clearErrors, errors, onSubmit } = useEditFarm(selectedId, () => {
    onClose();
    refetch();
  });

  const handleClose = () => {
    onClose();
    clearErrors();
  };

  return (
    <Dialog isOpen={isShow} headerTitle="Edit Farm" onClose={handleClose}>
      <DialogContent>
        <FarmForm
          onSubmit={onSubmit}
          defaultValues={selectedData}
          apiErrors={errors}
          onCancel={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditFarm;
