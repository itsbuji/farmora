import { Dialog, DialogContent } from "@components/dialog";
import useAddForm from "@hooks/use-add-form";
import subscription from "@api/subscription.api";
import type { NewSubscriptionRequest } from "@app-types/subscription.types";
import SubscriptionForm from "./form";

const defaultValues: NewSubscriptionRequest = {
  package_id: 0,
};

type Props = {
  isShow: boolean;
  onClose: () => void;
};

const AddSubscription = ({ isShow, onClose }: Props) => {
  const handleClose = () => {
    onClose();
    methods.reset();
  };

  const { methods, onSubmit } = useAddForm<NewSubscriptionRequest>({
    defaultValues,
    mutationFn: subscription.create,
    mutationKey: "subscription:add",
    onSuccess: () => {
      handleClose();
    },
  });

  return (
    <Dialog
      isOpen={isShow}
      headerTitle="Add New Subscription"
      onClose={handleClose}
    >
      <DialogContent>
        <SubscriptionForm methods={methods} onSubmit={onSubmit} onCancel={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AddSubscription;
