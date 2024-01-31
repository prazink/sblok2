<template>
  <div
    v-if="renderAble"
    :id="blok.section_id"
    v-editable="blok"
    :class="marginClass"
  >
    <CallOut
      :heading="blok.heading"
      :subheading="blok.sub_heading"
      :items="mappedItems"
      :description="resolvedRichText"
      :ctas="blok.cta"
    />
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
const renderAble = computed(() => {
  return typeof props.blok.items === "object" && props.blok.items.content.items;
});

const mappedItems = computed(() => {
  return props.blok.items.content.items.map((item) => {
    // console.log('item.text', item.text.content)
    return renderRichText(item.text, {
      resolver: (component, blok) => {
        return `<component :blok='${JSON.stringify(
          blok
        )}' is="${component}" />`;
      },
    });
  });
});

const resolvedRichText = computed(() =>
  renderRichText(props.blok.cta_text, {
    resolver: (component, blok) => {
      return `<component :blok='${JSON.stringify(blok)}' is="${component}" />`;
    },
  })
);
</script>
