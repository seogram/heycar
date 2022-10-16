export const getDate = (date?: string) => {
  if(date) {
    return new Date(date).toISOString().substring(0, 10);
  }
  return "Invalid date";
  };

  