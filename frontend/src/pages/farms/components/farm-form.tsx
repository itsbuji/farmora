import { Button } from "@mui/material";
import { useForm, type DefaultValues } from "react-hook-form";
import type { FarmFormValues } from "../types";
import { RHFTextField } from "@components/form/input";
import { useEffect } from "react";
import type { ValidationError } from "@errors/api.error";

type Props = {
  defaultValues: DefaultValues<FarmFormValues>;
  onSubmit: (payload: FarmFormValues) => void;
  apiErrors: ValidationError[];
  onCancel?: () => void;
};

const FarmForm = (props: Props) => {
  const { onSubmit, defaultValues, apiErrors, onCancel } = props;
  const methods = useForm<FarmFormValues>({
    defaultValues: defaultValues,
  });

  const { handleSubmit, control, setError } = methods;

  useEffect(() => {
    if (apiErrors.length > 0) {
      for (const error of apiErrors) {
        setError(error.name, { message: error.message });
      }
    }
  }, [apiErrors]);

  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
    }
  }, [defaultValues]);

  return (
    <>
      <form {...methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <RHFTextField
            label="Name"
            name="name"
            control={control}
            fullWidth
            size="small"
          />
          <RHFTextField
            label="Place"
            name="place"
            control={control}
            fullWidth
            size="small"
          />
          <RHFTextField
            label="Capacity"
            name="capacity"
            control={control}
            fullWidth
            size="small"
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

export default FarmForm;
