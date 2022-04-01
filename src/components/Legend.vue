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
    background: #FFE63B;
  }

  &.product {
    background: #FE414D;
    color: #FFFFFF;
  }

  &.experience {
    background: #00E673;
  }

  &.engineering {
    background: #079FFF;
    color: #FFFFFF;
  }

  &.data {
    background: #B4B4B4;
    color: #FFFFFF;
  }
}
</style>
