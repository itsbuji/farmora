import { Dialog, DialogContent } from "@components/dialog";
import FarmForm from "./farm-form";
import type { NewFarmRequest } from "../types";
import useAddFarm from "../hooks/use-add-farm";

const defaultValues: NewFarmRequest = {
  name: "",
  capacity: "0",
  place: "",
};

type Props = {
  isShow: boolean;
  onClose: () => void;
  refetch: () => void;
};

const AddFarm = (props: Props) => {
  const { isShow, onClose, refetch } = props;

  const { errors, onSubmit, clearErrors } = useAddFarm(() => {
    onClose();
    refetch();
  });

  const handleClose = () => {
    onClose();
    clearErrors();
  };

  return (
    <Dialog isOpen={isShow} headerTitle="Add New Farm" onClose={handleClose}>
      <DialogContent>
        <FarmForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          apiErrors={errors}
          onCancel={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddFarm;
