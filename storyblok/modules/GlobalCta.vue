<template>
  <Wrapper
    v-if="renderAble && blok.add_wrapper"
    v-editable="blok"
    :class="marginClass"
  >
    <Block
      :heading="blok.cta.content.heading"
      :content="blok.cta.content.description"
      :image="blok.cta.content.image"
      :image-centered="blok.cta.content.image_centered"
      :minified="minified"
    >
      <Button
        v-for="button in blok.cta.content.buttons"
        :key="button._uid"
        :size="button.size"
        tag="NuxtLink"
        :to="button.link.cached_url"
        :variant="button.type"
        class="whitespace-nowrap"
        :aria-label="blok.cta.content.heading"
      >
        {{ button.label }}
      </Button>
    </Block>
  </Wrapper>
  <div
    v-else-if="renderAble && !blok.add_wrapper"
    v-editable="blok"
    class="cta-block"
  >
    <Block
      :heading="blok.cta.content.heading"
      :content="blok.cta.content.description"
      :image="blok.cta.content.image"
      :image-centered="blok.cta.content.image_centered"
      :minified="minified"
    >
      <Button
        v-for="button in blok.cta.content.buttons"
        :key="button._uid"
        :size="button.size"
        tag="NuxtLink"
        :to="button.link.cached_url"
        :variant="button.type"
        class="whitespace-nowrap"
      >
        {{ button.label }}
      </Button>
    </Block>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
  marginClass: {
    type: String,
    default: "mt-14 mb-8 lg:my-12",
  },
  minified: {
    type: Boolean,
    default: false,
  },
});
// onMounted(() => {
//   console.log('Block Image::', props.blok);
// });
const renderAble = computed((): boolean => {
  return typeof props.blok.cta === "object";
});
</script>
