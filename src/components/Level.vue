<template>
  <span class="level">{{ level.emoji }}</span>
</template>

<script>
export default {
  name: 'Level',
  props: ['level'],
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
