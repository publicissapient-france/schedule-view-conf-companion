<template>
  <span class="category">{{ filteredCategory }}</span>
</template>

<script>
export default {
  name: 'Category',
  props: ['category'],
  computed: {
    filteredCategory() {
      if (this.category !== 'Other') {
        return this.category;
      } else {
        return '';
      }
    }
  }
}
</script>

<style scoped lang="scss">
.category {
  display: block;
}
</style>
