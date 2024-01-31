<template>
  <div v-editable="blok" class="relative">
    <StoryblokComponent v-for="blok in blok.body" :key="blok._uid" :blok="blok" />
  </div>
</template>

<script setup>
  const props = defineProps({ blok: Object });
  console.log(props)
</script>
