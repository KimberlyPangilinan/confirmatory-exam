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
      400: {
        itemsToShow: 1.5,
        snapAlign: "start",
      },
      500: {
        itemsToShow: 1.8,
        snapAlign: "start",
      },
    },
  };
};
