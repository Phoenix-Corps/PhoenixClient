export const formatAddress = (address: string) => {
  if (!address) return "";
  return `${address.substring(0, 6)} ... ${address.substring(
    address.length - 4
  )}`;
};

export const formatDate = (date: Date) => {
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  return `${month} ${day} - ${hour}:${minute}`;
};
