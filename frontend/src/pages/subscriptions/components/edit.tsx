import { Dialog, DialogContent } from "@components/dialog";
import useGetById from "@hooks/use-get-by-id";
import useEditForm from "@hooks/use-edit-form";
import subscription from "@api/subscription.api";
import type { EditSubscriptionRequest } from "@app-types/subscription.types";
import SubscriptionForm from "./form";

type Props = {
  selectedId: number | null;
  onClose: () => void;
};

const defaultValues: EditSubscriptionRequest = {
  id: 0,
  package_id: 0,
};

const EditSubscription = ({ selectedId, onClose }: Props) => {
  const isShow = selectedId !== null;

  const query = useGetById(selectedId, {
    queryKey: "subscription:get-by-id",
    queryFn: subscription.fetchById,
    defaultValues,
  });

  const { methods, onSubmit } = useEditForm<EditSubscriptionRequest>({
    defaultValues: query.data as EditSubscriptionRequest,
    mutationKey: "subscription:edit",
    mutationFn: subscription.updateById,
    onSuccess: () => {
      onClose();
    },
  });

  return (
    <Dialog isOpen={isShow} headerTitle="Edit Subscription" onClose={onClose}>
      <DialogContent>
        <SubscriptionForm methods={methods} onSubmit={onSubmit} onCancel={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default EditSubscription;
