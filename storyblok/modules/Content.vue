<template>
  <div v-editable="blok" :class="marginClass">
    <Wrapper v-if="blok.add_wrapper">
      <Grid>
        <div
          class="col-span-full lg:col-span-10 lg:col-start-2 content richtext"
        >
          <div class="wysiwyg lg:px-24">
            <Vue3RuntimeTemplate
              :template="resolvedRichText"
            ></Vue3RuntimeTemplate>
            <Button
              v-for="c in blok.cta"
              :key="c._uid"
              :size="c.size"
              tag="NuxtLink"
              :to="c.link.cached_url"
              :variant="c.type"
              class="mr-12 mt-8 xs+mobile:text-base"
              >{{ c.label }}</Button
            >
          </div>
        </div>
      </Grid>
    </Wrapper>
    <div v-else columns="grid-cols-1 md:grid-cols-1" gutters="gap-5 md:gap-10">
      <div class="content richtext">
        <div class="wysiwyg">
          <Vue3RuntimeTemplate
            :template="resolvedRichText"
          ></Vue3RuntimeTemplate>
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
  </div>
</template>

<script setup>
import Vue3RuntimeTemplate from "vue3-runtime-template";
const props = defineProps({
  blok: Object,
  marginClass: {
    type: String,
    default: "my-14 lg:my-20",
  },
});

// const resolvedRichText = computed(() =>
//   renderRichText(props.blok.text, {
//     resolver: (component, blok) => {
//       return `<component :blok='${JSON.stringify(blok)}' is="${component}" />`;
//     },
//   }).replace(/(href="[^"]*[^/])\/(?=[^"]*[" >])/g, "$1")
// );

const resolvedRichText = computed(() =>
  renderRichText(props.blok.text, {
    resolver: (component, blok) => {
      const url = blok.link?.url || "";
      const isExternalLink = url.startsWith("http") || url.endsWith(".pdf");
      const target = isExternalLink ? "_blank" : "";
      return `<component :blok='${JSON.stringify(
        blok
      )}' is="${component}" ${target} />`;
    },
  }).replace(
    // eslint-disable-next-line no-useless-escape
    /(href="[^"]*[^/])\/?(?![^"\/?&]+\.[^"\/?&]*($|[?&])|[^"\/?&\/])/g,
    "$1"
  )
);
</script>
