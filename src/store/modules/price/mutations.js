export default {
  SET_PRICES(state, data) {
    state.pricesByPaperSize = data;
  },
  SET_PRICE_TOTAL(state, data) {
    state.priceTotal = data;
  },
};
