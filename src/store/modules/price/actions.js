import Axios from '@/utils/axios';

export default {
  async fetchPriceByPaperSize({commit}, params) {
    try {
      const {
        data: {paper_size, prices = {}},
      } = await Axios.get(`/prices`, {params});

      if (paper_size) {
        commit('SET_PRICES', prices);
      } else {
        commit('SET_PRICES', []);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
