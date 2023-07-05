<template>
  <div class="footer-payment">
    <div class="div-show-price">
      Order price: <strong>¥{{ priceTotal }}</strong>
    </div>
    <button type="button" class="button">Cart</button>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('price', ['priceTotal']),
  },
};
</script>

<style>
.footer-payment {
  padding: 30px 15px;
  text-align: right;
  display: flex;
  justify-content: flex-end;
}

.div-show-price {
  padding: 5px 10px;
}
</style>
