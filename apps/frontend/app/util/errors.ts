/* eslint-disable @typescript-eslint/no-explicit-any */
export const getErrorMessage = (error: any) => {
  if (error) {
    if (isStringArray(error)) {
      const errorMessages = error.map((msg: string) => formatErrorMessage(msg));
      return errorMessages;
    }
    return formatErrorMessage(error);
  }
  return "Unknown error occurred";
};

const formatErrorMessage = (message: string): string => {
  return message.charAt(0).toUpperCase() + message.slice(1);
};

const isStringArray = (value: unknown): value is string[] => {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
};

export const ValidationErrors = (state: any, fieldName: string) => {
  return Array.isArray(state.error)
    ? state.error
        .filter((msg: any) => msg.toLowerCase().includes(fieldName))
        .join(", ")
    : state.error.toLowerCase().includes(fieldName)
    ? state.error
    : "";
};
