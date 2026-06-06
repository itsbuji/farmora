import { Button, MenuItem, TextField } from "@mui/material";
import { useForm, type DefaultValues } from "react-hook-form";
import type { VendorFormValues } from "../types";
import type { ValidationError } from "@errors/api.error";
import { useEffect } from "react";

type Props = {
  onSubmit: (inputData: VendorFormValues) => void;
  defaultValues: DefaultValues<VendorFormValues>;
  apiError: ValidationError[];
  onCancel?: () => void;
};

const VendorForm = ({ onSubmit, defaultValues, apiError, onCancel }: Props) => {
  const methods = useForm<VendorFormValues>({ defaultValues });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = methods;

  useEffect(() => {
    if (apiError.length > 0) {
      apiError.forEach(({ name, message }) => {
        setError(name, { message });
      });
    }
  }, [apiError]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4">
        <TextField
          label="Name"
          fullWidth
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          {...register("name")}
          size="small"
        />

        <TextField
          label="Address"
          fullWidth
          error={Boolean(errors.address)}
          helperText={errors.address?.message}
          {...register("address")}
          size="small"
        />

        <TextField
          label="Opening Balance"
          fullWidth
          error={Boolean(errors.opening_balance)}
          helperText={errors.opening_balance?.message}
          {...register("opening_balance")}
          size="small"
        />

        <TextField
          label="Vendor Type"
          select
          fullWidth
          error={Boolean(errors.vendor_type)}
          helperText={errors.vendor_type?.message}
          {...register("vendor_type")}
          value={methods.watch("vendor_type")}
          size="small"
        >
          <MenuItem value="supplier">Supplier</MenuItem>
          <MenuItem value="customer">Customer</MenuItem>
        </TextField>
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
  );
};

export default VendorForm;
