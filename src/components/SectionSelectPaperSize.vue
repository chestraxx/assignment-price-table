<template>
  <div>
    <div class="section-select-paper-size">
      <div>
        <label for="paper_size">Select pager size</label>
      </div>

      <div>
        <select
          name="paper_size"
          id="paper_size"
          class="select"
          v-model="sizeSelected"
          required
        >
          <option
            v-for="(size, index) in paperSizes"
            :key="index"
            :value="size"
          >
            {{ size }}
          </option>
        </select>
      </div>

      <div>
        <button type="button" class="button" @click.stop="applySizeSelected()">
          Apply
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex';

export default {
  data() {
    return {
      sizeSelected: 'A4',
    };
  },
  computed: {
    ...mapState('paperSize', ['paperSizes']),
  },
  methods: {
    ...mapActions('price', ['fetchPriceByPaperSize']),
    ...mapMutations('paperSize', ['SET_SELECTED_SIZE']),

    applySizeSelected() {
      this.fetchPriceByPaperSize({paper_size: this.sizeSelected});
    },
  },

  mounted() {
    this.fetchPriceByPaperSize({paper_size: 'A4'});
  },
};
</script>

<style scoped>
.section-select-paper-size {
  position: relative;
  display: grid;
  align-content: space-between;
  max-height: 300px;
}
.button {
  padding: 10px;
}
</style>
