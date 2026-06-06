import type {
  NewSubscriptionRequest,
  EditSubscriptionRequest,
} from "@app-types/subscription.types";
import SelectList from "@components/select-list";
import useGetPackageNames from "@hooks/package/use-get-package-names";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { Button } from "@mui/material";

type EditMethod = UseFormReturn<EditSubscriptionRequest, any, FieldValues>;
type AddMethod = UseFormReturn<NewSubscriptionRequest, any, FieldValues>;

type Props = {
  methods: EditMethod | AddMethod;
  onSubmit: (payload: any) => void;
  onCancel?: () => void;
};

const SubscriptionForm = ({ methods, onSubmit, onCancel }: Props) => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const packageNames = useGetPackageNames();
  const values = methods.watch();

  return (
    <>
      <form {...methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <SelectList
            options={packageNames.data}
            value={values.package_id}
            onChange={(val) => {
              (setValue as any)("package_id", val);
            }}
            label="Package"
            name="package_id"
            error={Boolean(errors.package_id)}
            helperText={errors.package_id?.message}
          />
        </div>
        <div className="flex justify-end mt-6 gap-2">
          {onCancel && (
            <Button variant="outlined" type="button" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default SubscriptionForm;
