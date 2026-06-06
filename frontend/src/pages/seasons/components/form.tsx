import { useForm, type DefaultValues } from "react-hook-form";
import type { SeasonFormValues } from "../types";
import { RHFTextField } from "@components/form/input";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Button, MenuItem } from "@mui/material";
import type { ValidationError } from "@errors/api.error";
import { useEffect } from "react";

type Props = {
  defaultValues: DefaultValues<SeasonFormValues>;
  onSubmit: (payload: any) => void;
  apiError: ValidationError[];
  onCancel?: () => void;
};

const SeasonForm = (props: Props) => {
  const { onSubmit, defaultValues, apiError, onCancel } = props;
  const methods = useForm<SeasonFormValues>({
    defaultValues: defaultValues,
  });

  const {
    control,
    watch,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  useEffect(() => {
    if (apiError.length > 0) {
      apiError.forEach(({ name, message }) => {
        setError(name, { message });
      });
    }
  }, [apiError]);

  return (
    <>
      <form {...methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <RHFTextField
            label="Name"
            name="name"
            control={control}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            size="small"
          />
          <DatePicker
            label="From Date"
            name="invoice_date"
            value={dayjs((watch as any)("from_date"))}
            format="DD-MM-YYYY"
            onChange={(v) => {
              (setValue as any)("from_date", dayjs(v).toISOString());
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: Boolean(errors.from_date),
                helperText: errors.from_date?.message,
                size: "small",
              },
            }}
          />
          <DatePicker
            label="To Date"
            name="to_date"
            value={dayjs((watch as any)("to_date"))}
            format="DD-MM-YYYY"
            onChange={(v) => {
              (setValue as any)("to_date", dayjs(v).toISOString());
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: Boolean(errors.to_date),
                helperText: errors.to_date?.message,
                size: "small",
              },
            }}
          />

          <RHFTextField
            label="Status"
            name="status"
            control={control}
            select
            fullWidth
            error={Boolean(errors.status)}
            helperText={errors.status?.message}
            value={watch("status")}
            size="small"
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </RHFTextField>
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

export default SeasonForm;
