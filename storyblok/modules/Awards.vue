<template>
  <div v-editable="blok" :class="marginClass">
    <Wrapper>
      <div class="content richtext">
        <div class="wysiwyg" v-html="resolvedRichText" />
      </div>
      <Grid>
        <div
          class="md:col-start-2 md:col-end-12 flex items-center justify-center col-start-1 col-end-13"
        >
          <NuxtImg
            format="webp"
            :src="blok.desktop_image.filename"
            :alt="blok.desktop_image.alt"
            class="hidden md:block mx-auto w-full"
            loading="lazy"
          />
          <NuxtImg
            format="webp"
            :src="blok.mobile_image.filename"
            :alt="blok.mobile_image.alt"
            class="block md:hidden mx-auto w-full"
            loading="lazy"
          />
        </div>
      </Grid>
    </Wrapper>
  </div>
</template>
<script lang="ts" setup>
import { renderRichText } from "@storyblok/js";
import { computed } from "vue";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
  marginClass: {
    type: String,
    default: "my-14 lg:my-20",
  },
});

const resolvedRichText = computed((): string =>
  renderRichText(props.blok.heading, {
    resolver: (component, blok) => {
      return `<component :blok='${JSON.stringify(blok)}' is="${component}" />`;
    },
  })
);
</script>
