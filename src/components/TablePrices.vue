<template>
  <div>
    <div>
      <div>
        <label>Price table</label>
        <a
          href="http://"
          target="_blank"
          class="link-action-show"
          @click.prevent="changeDisplayRows()"
        >
          {{ this.initialDisplayRow ? 'Show more' : 'Show less' }}
        </a>
      </div>
    </div>

    <table>
      <tr class="column-header-business-day">
        <th></th>
        <th v-for="(header, headerIndex) in priceHeaders" :key="headerIndex">
          {{ `Delivery in ${header} business days` }}
        </th>
      </tr>

      <tr
        v-for="(priceBlock, priceCellRow) in pricesAllowToShow"
        :key="priceCellRow"
      >
        <td class="cell-header-quantity">
          {{ priceBlock[0] ? `Quantity ${priceBlock[0].quantity}` : '' }}
        </td>
        <td
          v-for="(price, priceCellColumn) in priceBlock"
          :key="priceCellColumn"
          :class="renderCell({priceCellRow, priceCellColumn})"
          class="tooltip"
          @click.stop="clickPriceCell({priceCellRow, priceCellColumn})"
          @mouseover="mouseoverCell({priceCellRow, priceCellColumn})"
        >
          <div class="td-content">
            <div>Price: ¥{{ addCommas(price.price) }}</div>

            <span class="tooltiptext">
              Delivery in {{ price.business_day }} business days X Quantity
              {{ price.quantity }}
            </span>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex';

export default {
  data() {
    return {
      selectedPriceCells: null,
      selectedPrices: null,

      initialDisplayRow: true,

      currentHighlightedCell: {
        cellRow: null,
        cellColumn: null,
      },

      DEFAULT_ROW_SHOW: 5,
      CLASS_CELL_SELECTED: 'cell-selected',
      CLASS_CELL_WEAKLY_HIGHLIGHT: 'cell-weakly-highlight',
    };
  },
  watch: {
    selectedPrices(newVal) {
      this.SET_PRICE_TOTAL(newVal.price);
    },
  },
  computed: {
    ...mapState('price', ['pricesByPaperSize']),

    pricesAllowToShow() {
      if (this.initialDisplayRow) {
        return this.pricesByPaperSize.slice(0, this.DEFAULT_ROW_SHOW);
      }
      return this.pricesByPaperSize;
    },

    priceHeaders() {
      if (this.pricesByPaperSize.length > 0) {
        let firstPriceBlock = this.pricesByPaperSize[0];
        return firstPriceBlock.map((price) => price.business_day);
      }

      return [];
    },
  },
  methods: {
    ...mapMutations('price', ['SET_PRICE_TOTAL']),

    mouseoverCell({priceCellRow, priceCellColumn}) {
      if (
        this.currentHighlightedCell.cellRow === priceCellRow &&
        this.currentHighlightedCell.cellColumn === priceCellColumn
      ) {
        return;
      }

      this.currentHighlightedCell.cellRow = priceCellRow;
      this.currentHighlightedCell.cellColumn = priceCellColumn;
    },

    changeDisplayRows() {
      this.initialDisplayRow = !this.initialDisplayRow;
      this.selectedPriceCells = null;
      this.selectedPrices = null;
      this.SET_PRICE_TOTAL([]);
    },

    renderCell({priceCellRow, priceCellColumn}) {
      if (
        this.selectedPriceCells &&
        this.selectedPriceCells.priceCellRow >= 0 &&
        this.selectedPriceCells.priceCellColumn >= 0 &&
        this.selectedPriceCells.priceCellRow === priceCellRow &&
        this.selectedPriceCells.priceCellColumn === priceCellColumn
      ) {
        return this.CLASS_CELL_SELECTED;
      }
      if (
        this.currentHighlightedCell.cellRow >= 0 &&
        this.currentHighlightedCell.cellColumn >= 0
      ) {
        if (
          priceCellRow === this.currentHighlightedCell.cellRow ||
          priceCellColumn === this.currentHighlightedCell.cellColumn
        ) {
          return this.CLASS_CELL_WEAKLY_HIGHLIGHT;
        }
      }

      return '';
    },

    clickPriceCell({priceCellRow, priceCellColumn}) {
      if (
        !(
          priceCellRow in this.pricesByPaperSize &&
          priceCellColumn in this.pricesByPaperSize[priceCellRow]
        )
      ) {
        return;
      }

      this.selectedPriceCells = {priceCellRow, priceCellColumn};
      this.selectedPrices =
        this.pricesByPaperSize[priceCellRow][priceCellColumn];
    },
  },
};
</script>

<style scoped>
thead,
tbody {
  display: block;
}
table {
  width: 100%;
  border-spacing: 0;
}

tr:after {
  /* clearing float */
  content: ' ';
  display: block;
  visibility: hidden;
  clear: both;
}

tbody {
  height: 680px;
  overflow-y: auto;
  overflow-x: hidden;
}

table,
th,
td {
  border: 1px solid rgb(229, 229, 229);
  border-collapse: collapse;
}

.column-header-business-day > th,
.cell-header-quantity {
  background-color: rgb(209, 208, 208);
  border: 1px solid rgb(225, 224, 224);
}

td .td-content {
  cursor: pointer;
  background-color: rgb(255, 255, 255);
}

.td-content div {
  cursor: pointer;
  background-color: rgb(255, 255, 255);
}

.cell-selected div {
  background-color: #c2edce !important;
}

.cell-weakly-highlight div {
  background-color: rgb(245, 245, 245);
}

.link-action-show {
  font-size: 12px;
  padding-left: 10px;
  text-decoration: unset;
}

.tooltip {
  position: relative;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 200px;
  background-color: rgb(227, 227, 227);
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  position: absolute;
  z-index: 1;
}

.tooltip:hover div {
  background-color: rgb(218, 218, 218);
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
