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
      <tbody>
        <tr
          v-for="(priceBlock, priceCellRow) in pricesAllowToShow"
          :key="priceCellRow"
        >
          <td
            v-for="(price, priceCellColumn) in priceBlock"
            :key="priceCellColumn"
            :class="renderCell({priceCellRow, priceCellColumn})"
            class="tooltip"
            @click.stop="clickPriceCell({priceCellRow, priceCellColumn})"
            @mouseover="mouseoverCell({priceCellRow, priceCellColumn})"
          >
            <div class="td-content">
              <div>
                Delivery in {{ price.business_day }} business days X Quantity
                {{ price.quantity }}
              </div>
              <div>Price: ¥{{ price.price }}</div>

              <span class="tooltiptext">
                Delivery in {{ price.business_day }} business days X Quantity
                {{ price.quantity }}
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex';

export default {
  data() {
    return {
      selectedPriceCells: [],
      selectedPrices: [],

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
      let priceTotal = 0;
      newVal.forEach((selectedPrice) => (priceTotal += selectedPrice.price));

      this.SET_PRICE_TOTAL(priceTotal);
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
      this.selectedPriceCells = [];
      this.selectedPrices = [];
      this.SET_PRICE_TOTAL([]);
    },

    findSelectedPriceCell({priceCellRow, priceCellColumn}) {
      return this.selectedPriceCells.findIndex((cell) => {
        return (
          cell.priceCellRow === priceCellRow &&
          cell.priceCellColumn === priceCellColumn
        );
      });
    },

    renderCell({priceCellRow, priceCellColumn}) {
      let findIndexOfCurrentCell = this.findSelectedPriceCell({
        priceCellRow,
        priceCellColumn,
      });
      if (findIndexOfCurrentCell >= 0) {
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

      let findIndexOfClickedCell = this.findSelectedPriceCell({
        priceCellRow,
        priceCellColumn,
      });

      if (findIndexOfClickedCell >= 0) {
        this.selectedPriceCells = this.selectedPriceCells.filter(
          (cell, index) => {
            return index !== findIndexOfClickedCell;
          },
        );

        this.selectedPrices = this.selectedPrices.filter((price, index) => {
          return index !== findIndexOfClickedCell;
        });
      } else {
        this.selectedPriceCells.push({priceCellRow, priceCellColumn});
        this.selectedPrices.push(
          this.pricesByPaperSize[priceCellRow][priceCellColumn],
        );
      }
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

td .td-content {
  cursor: pointer;
  background-color: rgb(255, 255, 255);
  height: 118px;
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
