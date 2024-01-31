<template>
  <div v-editable="blok" class="overflow-hidden pb-16 -mb-16">
    <Wrapper class="relative">
      <div
        class="relative overflow-hidden lg:rounded-3xl gradient-lfi text-white flex items-center min-h-[160px] lg:min-h-[288px]"
      >
        <Grid class="w-full py-10 lg:py-20">
          <div
            v-if="blok.heading || blok.sub_heading"
            class="col-span-full lg:col-span-8 lg:col-start-3 text-center"
          >
            <h1 class="font-heavy text-h1-sm lg:text-h1">
              {{ blok.heading }}
            </h1>
            <p
              v-if="!hideSubheading"
              class="px-3 text-h5-sm lg:text-h5 mt-2 lg:mt-2.5"
            >
              {{ blok.sub_heading }}
            </p>
          </div>
        </Grid>
      </div>
    </Wrapper>
  </div>
</template>
<script setup>
const props = defineProps({
  blok: Object,
});
const hideSubheading = computed(() => {
  return props.blok.hide_subheading === true;
});
// onMounted(() => {
//   console.log(props.blok)
// })
</script>
