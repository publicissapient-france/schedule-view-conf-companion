<template>
  <span class="level"><span v-for="value in numberOfLevel" :key="value">{{ level.emoji }}</span></span>
</template>

<script>
export default {
  name: 'Level',
  props: ['level'],
  computed: {
    numberOfLevel: function () {
      return [...Array(this.level.value).keys()]
    }
  }
}
</script>

<style scoped lang="scss">
.level {
  display: block;
  text-align: right;
  margin-top: 5px;
  font-size: .8em;
}
</style>
