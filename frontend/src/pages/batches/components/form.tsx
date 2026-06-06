import SelectList from "@components/select-list";
import useGetFarmNames from "@hooks/farms/use-get-farm-names";
import { TextField, Button, MenuItem } from "@mui/material";
import { useForm, type DefaultValues } from "react-hook-form";
import type { BatchFormValues } from "../types";
import type { ValidationError } from "@errors/api.error";
import { useEffect } from "react";
import useGetSeasonNames from "@hooks/use-get-season-names";

type Props = {
  onSubmit: (payload: any) => void;
  defaultValues: DefaultValues<BatchFormValues>;
  apiError: ValidationError[];
  onCancel?: () => void;
};

const BatchForm = ({ onSubmit, defaultValues, apiError, onCancel }: Props) => {
  const seasonNames = useGetSeasonNames({ status: "active" });
  const farmNames = useGetFarmNames();

  const methods = useForm<BatchFormValues>({
    defaultValues: defaultValues,
  });

  const {
    watch,
    setValue,
    handleSubmit,
    register,
    setError,
    formState: { errors },
    clearErrors,
  } = methods;

  const values = watch();

  useEffect(() => {
    if (apiError.length > 0) {
      apiError.forEach(({ name, message }) => {
        setError(name, { message });
      });
    }
  }, [apiError]);

  return (
    <>
      <form {...methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <TextField
            label="Name"
            {...(register as any)("name")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            size="small"
          />

          <SelectList
            options={seasonNames.data}
            value={values.season_id}
            onChange={(v) => {
              setValue("season_id", v ? v : "");
              clearErrors("season_id");
            }}
            label="Season"
            name="season_id"
            error={Boolean(errors.season_id)}
            helperText={errors.season_id?.message}
          />

          <SelectList
            options={farmNames.data}
            value={values.farm_id}
            onChange={(v) => {
              setValue("farm_id", v ? v : "");
              clearErrors("farm_id");
            }}
            label="Farm"
            name="farm_id"
            error={Boolean(errors.farm_id)}
            helperText={errors.farm_id?.message}
          />

          <TextField
            label="Status"
            select
            fullWidth
            error={Boolean(errors.status)}
            helperText={errors.status?.message}
            {...register("status")}
            value={methods.watch("status")}
            size="small"
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
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
    </>
  );
};

export default BatchForm;
