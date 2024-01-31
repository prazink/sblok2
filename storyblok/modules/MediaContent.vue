<template>
  <div
    v-editable="blok"
    :class="[blok.has_background ? `bg-grey-100 ${marginClass}` : marginClass]"
  >
    <Wrapper>
      <Grid>
        <div
          :class="[
            'col-span-full lg:col-span-5 rounded-lg',
            imageOrientation === 'right'
              ? 'order-1 lg:order-3'
              : 'order-1 lg:col-start-2',
          ]"
        >
          <NuxtImg
            preset="avatar"
            :src="blok.image.filename"
            :alt="blok.image.alt"
            provider="storyblok"
            width="360"
            height="420"
            :class="[
              'w-auto h-auto m-auto object-contain object-center rounded-lg mb-4 lg:mb-0 lg:w-full lg:h-full',
              fullWidth ? 'sm:w-full' : 'sm:w-[380px]',
            ]"
          />
        </div>
        <div
          :class="[
            'lg:text-left',
            'col-span-full lg:col-span-5',
            blok.image_orientation === 'left'
              ? 'order-2 '
              : 'order-1 lg:col-start-2',
          ]"
        >
          <div class="content richtext">
            <div class="wysiwyg" v-html="resolvedRichText" />
            <div
              class="mt-7 lg:mt-2 flex flex-wrap gap-4 lg:gap-6 justify-center lg:justify-start"
            >
              <Button
                v-for="c in blok.cta"
                :key="c._uid"
                :size="c.size"
                tag="NuxtLink"
                :to="c.link.cached_url"
                :variant="c.type"
                class="mr-12 mt-8"
                >{{ c.label }}</Button
              >
            </div>
          </div>
        </div>
      </Grid>
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

const resolvedRichText = computed(() =>
  renderRichText(props.blok.content, {
    resolver: (component, blok) => {
      return `<component :blok='${JSON.stringify(blok)}' is="${component}" />`;
    },
  })
);
const fullWidth = () => {
  return blok.full_width;
};
const imageOrientation = () => {
  return blok.image_orientation;
};
</script>

<style lang="scss">
.content.richtext .wysiwyg {
  @media (max-width: 991px) {
    text-align: center;
  }

  > p {
    text-align: left !important;
  }
}
</style>
