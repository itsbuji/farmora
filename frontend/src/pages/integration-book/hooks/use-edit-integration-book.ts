import { useState } from "react";
import type { IntegrationBookFormValues } from "../types";
import type { ValidationError } from "@errors/api.error";
import integrationBook from "../api";

const useEditIntegrationBook = (
  selectedId: number | null,
  onSuccess: () => void,
) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const clearErrors = () => setErrors([]);

  const onSubmit = async (inputData: IntegrationBookFormValues) => {
    if (!selectedId) return;

    const res = await integrationBook.updateById(selectedId, inputData);
    if (res.status === "success") {
      onSuccess();
      clearErrors();
    } else if (res.status === "validation_error") {
      setErrors(res.error);
    }
  };

  return { errors, onSubmit, clearErrors };
};

export default useEditIntegrationBook;
