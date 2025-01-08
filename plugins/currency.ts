export default defineNuxtPlugin(() => {
  return {
    provide: {
      formatCurrency: (amount: number, currency: string) => {
        return `${new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: currency,
        }).format(amount)}`;
      },
    },
  };
});
