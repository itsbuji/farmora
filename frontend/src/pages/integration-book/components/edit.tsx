import { Dialog, DialogContent } from "@components/dialog";
import IntegrationBookForm from "./form";
import useGetIntegrationBookById from "../hooks/use-get-integration-book-by-id";
import useEditIntegrationBook from "../hooks/use-edit-integration-book";

type Props = {
  selectedId: number | null;
  onClose: () => void;
  refetch: () => void;
};

const EditIntegrationBook = ({ selectedId, onClose, refetch }: Props) => {
  const isShow = selectedId !== null;

  const { selectedData } = useGetIntegrationBookById(selectedId);

  const { clearErrors, errors, onSubmit } = useEditIntegrationBook(
    selectedId,
    () => {
      onClose();
      refetch();
    },
  );

  const handleClose = () => {
    onClose();
    clearErrors();
  };

  return (
    <Dialog
      isOpen={isShow}
      headerTitle="Edit Integration Book"
      onClose={handleClose}
    >
      <DialogContent>
        <IntegrationBookForm
          onSubmit={onSubmit}
          defaultValues={selectedData}
          apiErrors={errors}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditIntegrationBook;
