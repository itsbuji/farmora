import { Dialog, DialogContent } from "@components/dialog";
import VendorForm from "./form";
import useGetVendorById from "../hooks/use-get-vendor-by-id";
import useEditVendor from "../hooks/use-edit-vendor";

type Props = {
  selectedId: number | null;
  refetch: () => void;
  onClose: () => void;
};

const EditVendor = (props: Props) => {
  const { selectedId, onClose, refetch } = props;
  const isShow = selectedId !== null;

  const { dataLoaded, selectedData } = useGetVendorById(selectedId);

  const { onSubmit, errors, clearError } = useEditVendor(selectedId, {
    onSuccess: () => {
      onClose();
      refetch();
    },
  });

  const handleClose = () => {
    onClose();
    clearError();
  };

  return (
    <Dialog isOpen={isShow} headerTitle="Edit Vendor" onClose={handleClose}>
      <DialogContent>
        {dataLoaded ? (
          <VendorForm
            onSubmit={onSubmit}
            defaultValues={selectedData}
            apiError={errors}
            onCancel={handleClose}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default EditVendor;
