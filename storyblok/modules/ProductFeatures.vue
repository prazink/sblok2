<template>
  <div :id="blok.section_id" v-editable="blok" :class="[marginClass]">
    <Features
      :heading="blok.heading"
      :features="blok.features"
      :option-variables="blok.options"
      :features_heading="
        blok.features_heading ? blok.features_heading : 'Features'
      "
      :variables_heading="
        blok.variables_heading ? blok.variables_heading : 'Loan Variables'
      "
    >
      <div v-if="blok.content" class="richtext mt-6">
        <div class="wysiwyg">
          <Vue3RuntimeTemplate :template="resolvedRichText"></Vue3RuntimeTemplate>
        </div>
      </div>
    </Features>
    
  </div>

</template>

<script setup>
import Vue3RuntimeTemplate from "vue3-runtime-template";

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
const resolvedRichText = computed(() =>
  renderRichText(props.blok.content, {
    resolver: (component, blok) => {
      return `<component :blok='${JSON.stringify(blok)}' is="${component}" />`;
    },
  })
);
</script>
