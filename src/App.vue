<template>
  <div id="app">
    <div class="div-body">
      <div class="div-row">
        <div class="div-select">
          <section-select-paper-size />
        </div>
        <div class="div-table">
          <table-prices />
        </div>
      </div>

      <div class="div-row">
        <div class="div-footer">
          <footer-payment />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FooterPayment from './components/FooterPayment.vue';
import SectionSelectPaperSize from './components/SectionSelectPaperSize.vue';
import TablePrices from './components/TablePrices.vue';

export default {
  name: 'App',
  components: {TablePrices, FooterPayment, SectionSelectPaperSize},
  methods: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

.div-body {
  padding: 25px;
  height: calc(100% - 60px);
}

.div-row {
  display: flex;
}

.div-select div,
.div-table div,
.div-footer div {
  background-color: rgb(229, 229, 229);
  padding: 10px;
}

.div-select,
.div-table,
.div-footer {
  position: relative;
  width: 100%;
}

.div-select {
  flex: 0 0 15%;
  max-width: 15%;
  padding-right: 30px;
}

.div-select div {
  height: 100%;
}

.div-table {
  flex: 0 0 85%;
  max-width: 85%;
}

.div-footer {
  padding-top: 30px;
}

.button {
  width: 100px;
  border-color: unset;
}

.select {
  width: 100px;
  font-size: 18px;
  padding: 5px;
}

@media (max-width: 1300px) {
  .div-row {
    display: block;
  }

  .div-select {
    width: 100%;
    display: unset;
    padding-right: 0px;
  }

  .div-table {
    padding-top: 30px;
    max-width: 100%;
  }

  .section-select-paper-size {
    padding-bottom: 30px;
  }
}
</style>
