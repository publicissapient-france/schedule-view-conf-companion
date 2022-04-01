<template>
  <div class="legend">
    <span class="letter strategy">S</span>
    <span class="letter product">P</span>
    <span class="letter experience">E</span>
    <span class="letter engineering">E</span>
    <span class="letter data">D</span>
  </div>
</template>

<script>
export default {
  name: 'Legend'
}
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.legend {
  margin-top: 40px;
  text-align: center;
}

.letter {
  margin: 0 5px;
  padding: 7px 10px 3px 10px;
  border-radius: 100%;
  font-size: 18px;

  &.strategy {
    background: $strategy;
  }

  &.product {
    background: $product;
    color: #FFFFFF;
  }

  &.experience {
    background: $experience;
  }

  &.engineering {
    background: $engineering;
    color: #FFFFFF;
  }

  &.data {
    background: $data;
    color: #FFFFFF;
  }
}
</style>
