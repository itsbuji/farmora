import { DatePicker } from "@mui/x-date-pickers";
import type { IntegrationBookFormValues } from "../types";
import SelectList from "@components/select-list";
import useGetFarmNames from "@hooks/farms/use-get-farm-names";
import { Button } from "@mui/material";
import { useForm, type DefaultValues } from "react-hook-form";
import { useEffect } from "react";
import { RHFTextField } from "@components/form/input";
import type { ValidationError } from "@errors/api.error";
import dayjs from "dayjs";

type Props = {
  defaultValues: DefaultValues<IntegrationBookFormValues>;
  onSubmit: (payload: IntegrationBookFormValues) => void;
  apiErrors: ValidationError[];
  onCancel?: () => void;
};

const IntegrationBookForm = ({ onSubmit, defaultValues, apiErrors, onCancel }: Props) => {
  const methods = useForm<IntegrationBookFormValues>({
    defaultValues: defaultValues,
  });

  const {
    handleSubmit,
    control,
    setError,
    setValue,
    reset,
    formState: { errors },
    watch,
  } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    if (apiErrors.length > 0) {
      for (const error of apiErrors) {
        setError(error.name as keyof IntegrationBookFormValues, {
          message: error.message,
        });
      }
    }
  }, [apiErrors, setError]);

  const farmNames = useGetFarmNames();
  const farmId = watch("farm_id");
  const date = watch("date");

  return (
    <>
      <form {...methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <SelectList
            options={farmNames.data}
            value={farmId}
            onChange={(v) => setValue("farm_id", v)}
            label="Farm"
            name="farm_id"
            helperText={errors.farm_id?.message}
            error={Boolean(errors.farm_id)}
          />

          <RHFTextField
            label="Amount"
            name="amount"
            control={control}
            fullWidth
            size="small"
          />

          <DatePicker
            label="Date"
            name="date"
            value={dayjs(date)}
            format="DD-MM-YYYY"
            onChange={(v) => {
              setValue("date", dayjs(v).toISOString());
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
              },
            }}
          />

          {/*<RHFTextField
            label="Payment Type"
            name="payment_type"
            control={control}
            fullWidth
            size="small"
            select
          >
            <MenuItem value="credit">Credit</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
          </RHFTextField>
	*/}
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

export default IntegrationBookForm;
