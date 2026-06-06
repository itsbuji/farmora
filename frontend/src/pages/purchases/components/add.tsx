import { Dialog, DialogContent } from "@components/dialog";
import PurchaseForm from "./form";
import dayjs from "dayjs";
import type { PurchaseFormValues } from "../types";
import useAddPurchase from "../hooks/use-add-purchase";
import type { Ref } from "react";

const defaultValues: PurchaseFormValues = {
  total_price: "",
  net_amount: "",
  invoice_number: "",
  invoice_date: dayjs().toISOString(),
  quantity: "",
  vendor_id: null,
  season_id: null,
  discount_price: "",
  price_per_unit: "",
  category_id: null,
  batch_id: null,
  assign_quantity: "",
  payment_type: "credit",
};

type Props = {
  isShow: boolean;
  onClose: () => void;
  filterButtonRef: Ref<HTMLButtonElement>;
};

const AddPurchase = ({ isShow, onClose, filterButtonRef }: Props) => {
  const { errors, clearError, onSubmit } = useAddPurchase({
    onSuccess: () => {
      handleClose();
      if (filterButtonRef) {
        if (typeof filterButtonRef !== "function") {
          filterButtonRef.current?.click();
        }
      }
    },
  });

  const handleClose = () => {
    onClose();
    clearError();
  };

  return (
    <Dialog
      isOpen={isShow}
      headerTitle="Add New Purchase"
      onClose={handleClose}
    >
      <DialogContent>
          <PurchaseForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            apiError={errors}
            onCancel={handleClose}
          />
      </DialogContent>
    </Dialog>
  );
};

export default AddPurchase;
