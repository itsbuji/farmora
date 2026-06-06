import { Dialog, DialogContent } from "@components/dialog";
import VendorForm from "./form";
import useAddVendor from "../hooks/use-add-vendor";
import type { VendorFormValues } from "../types";

const defaultValues: VendorFormValues = {
  name: "",
  address: "",
  opening_balance: "",
  vendor_type: "supplier",
};

type Props = {
  isShow: boolean;
  refetch: () => void;
  onClose: () => void;
};

const AddVendor = (props: Props) => {
  const { isShow, onClose, refetch } = props;

  const { onSubmit, errors, clearError } = useAddVendor({
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
    <Dialog isOpen={isShow} headerTitle="Add New Vendor" onClose={handleClose}>
      <DialogContent>
        <VendorForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          apiError={errors}
          onCancel={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddVendor;
