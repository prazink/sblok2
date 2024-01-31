<template>
  <div v-editable="blok" class="relative">
    <StoryblokComponent v-for="blok in blok.body" :key="blok._uid" :blok="blok" />
  </div>
</template>

<script setup>
const props = defineProps({ blok: Object });
useHead({
  title: props.blok?.meta_tags[0]?.title,
  meta: [
    { name: "description", content: props.blok?.meta_tags[0]?.description },
    props.blok?.meta_tags[0]?.noindex
      ? { hid: "robots", name: "robots", content: "noindex, nofollow" }
      : {},
    props.blok?.meta_tags[0]?.noindex
      ? { hid: "googlebot", name: "googlebot", content: "noindex, nofollow" }
      : { hid: "googlebot", name: "googlebot", content: "index, follow" },
  ],
  link: [
    {
      hid: "canonical",
      rel: "canonical",
      href: props.blok?.meta_tags[0]?.canonical_url,
    },
  ],
});
</script>
