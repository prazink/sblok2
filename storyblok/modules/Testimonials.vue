<template>
  <div :id="blok.section_id" v-editable="blok" :class="[marginClass]">
    <Wrapper>
      <Grid class="px-4 md:px-8 lg:px-10">
        <div class="col-span-full lg:col-start-1 lg:col-end-13 mx-auto mb-12">
          <Heading tag="h3" :size="blok.heading_size ? blok.heading_size : 'h3'" :text="blok.heading"
            class="text-center text-navy lg:px-36" />
        </div>
      </Grid>
    </Wrapper>
    <TestimonialItems :slides="mappedItems" />
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
  return props.blok.items.map((item) => {
    return item.content;
  });
});

const cardItems = computed(() => props.blok?.items ?? []);
</script>
