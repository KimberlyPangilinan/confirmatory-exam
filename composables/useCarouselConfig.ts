export const useCarouselConfig = () => {
  return {
    itemsToShow: 1,
    snapAlign: "center",
    breakpointMode: "carousel",
    breakpoints: {
      300: {
        itemsToShow: 1,
        snapAlign: "center",
      },
      500: {
        itemsToShow: 1.3,
        snapAlign: "start",
      },
    },
  };
};
