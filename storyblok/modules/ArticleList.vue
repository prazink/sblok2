<template>
  <div v-editable="blok" :class="marginClass">
    <Wrapper>
      <Article :items="mappedItems" />
    </Wrapper>
  </div>
</template>

<script setup>
const props = defineProps({
  blok: Object,
  marginClass: {
    type: String,
    default: "my-14 lg:my-20",
  },
});

const mappedItems = computed(() => {
  return props.blok?.items;
});
</script>
