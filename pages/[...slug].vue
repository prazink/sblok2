<template>
  <div>
    <h1>Storyblok V2</h1>
    <StoryblokComponent v-if="story" :blok="story.content" />
  </div>
</template>

<script setup>
  const story = await useAsyncStoryblok('home', { version: 'draft' })
</script>
