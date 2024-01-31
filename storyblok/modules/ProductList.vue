<template>
  <div v-editable="blok" :class="marginClass">
    <Wrapper>
      <Grid>
        <div class="text-center col-end-13 col-start-1 lg:col-start-2 lg:col-end-12 mx-auto pb-7">
          <h2 class="text-navy font-heavy text-h4 md:text-h3 mb-4">
            {{ blok.heading }}
          </h2>
          <p class="text-font-gray text-lg md:text-2xl mb-4 md:mb-3">
            {{ blok.sub_heading }}
          </p>
        </div>
      </Grid>
      <ProductCard :items="mappedItems" />

      <div v-if="!blok.show_all_items">
        <div v-if="blok?.items.length > 2" class="text-center">
          <!-- <button @click="handleShowHideProduct" class="mr-12 mt-8">{{ showProduct }}</button> -->
          <Button v-for="c in blok.cta" :key="c._uid" :size="c.size" tag="NuxtLink" :to="c.link.cached_url"
            :variant="c.type" class="mr-4 mt-8">{{ c.label }}</Button>
        </div>
      </div>
    </Wrapper>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Button from "../components/Button.vue";

const props = defineProps({
  blok: Object,
  marginClass: {
    type: String,
    default: "my-14 lg:my-20",
  },
});

const showProduct = ref("Show More");

const mappedItems = computed(() => {
  if (props.blok.show_all_items) {
    return props.blok?.items;
  }
  if (props.blok?.items) {
    if (showProduct.value == "Show More") {
      return props.blok?.items.slice(0, 4);
    } else {
      return props.blok?.items;
    }
  }
  return [];
});

const handleShowHideProduct = () => {
  // console.log('its clicked', showProduct.value);

  if (showProduct.value === "Show More") {
    showProduct.value = "Show Less";
  } else {
    showProduct.value = "Show More";
  }
};
</script>
