export const debounce = (func: Function, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

export const formatAddress = (address: Record<string, string>) => {
  if (!address) return "";
  const { street, city, zipCode, state } = address;
  return `${street}, ${city}, ${zipCode}, ${state}`;
};
