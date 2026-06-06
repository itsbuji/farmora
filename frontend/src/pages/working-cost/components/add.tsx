import { Dialog, DialogContent } from "@components/dialog";
import type { WorkingCostFormValues } from "../types";
import WorkingCostForm from "./form";
import useAddWorkingCost from "../hooks/use-add-working-cost";
import dayjs from "dayjs";

const defaultValues: WorkingCostFormValues = {
  season_id: null,
  purpose: "",
  amount: "",
  date: dayjs().toISOString(),
  payment_type: "expense",
};

type Props = {
  isShow: boolean;
  onClose: () => void;
  refetch: () => void;
};

const AddWorkingCost = ({ isShow, onClose, refetch }: Props) => {
  const { errors, onSubmit, clearErrors } = useAddWorkingCost(() => {
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
      headerTitle="Add Working Cost Entry"
      onClose={handleClose}
    >
      <DialogContent>
        <WorkingCostForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          apiErrors={errors}
          onCancel={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddWorkingCost;
