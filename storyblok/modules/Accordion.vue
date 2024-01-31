<template>
  <div
    :id="blok.section_id"
    v-editable="blok"
    :class="[blok.has_background ? `gradient-grey-top` : marginClass]"
  >
    <Wrapper>
      <Grid>
        <div class="col-end-13 col-start-1 lg:col-start-3 lg:col-end-11">
          <Heading
            v-if="showHeading"
            tag="h3"
            size="h3"
            :text="blok.heading"
            :class="[
              'mt-6 mb-4 text-navy text-center',
              { 'mb-12': !showSummary },
            ]"
          />
          <h4
            v-if="showSummary"
            class="text-h5-sm text-center mb-12 text-font-gray font-normal sm:text-h5"
          >
            {{ blok.summary }}
          </h4>
          <ul>
            <AccordionItem
              v-for="(item, index) in filteredAccordions"
              ref="length"
              :key="index"
              :index="index"
              :heading="item.title"
              class="border-grey-400 border-t first:border-b-0 last:border-b"
            >
              <template #body>
                <div class="richtext">
                  <StoryblokComponent
                    v-for="blok in item.body"
                    :key="blok._uid"
                    :blok="blok"
                    class="mb-5 text-font-gray"
                    :class="blok.component === 'button' ? 'mr-4' : null"
                  />
                </div>
              </template>
            </AccordionItem>
          </ul>
          <div
            v-if="!props.blok.show_all_items"
            class="text-center mt-6 lg:mt-20"
          >
            <button
              class="inline-flex items-center justify-center rounded-lg transition-colors duration-200 ease-in-out text-button-md px-4 h-12 text-white hover:underline focus:underline active:underline bg-button hover:bg-button-hover focus:bg-button-hover active:bg-button-pressed mr-4 mt-4"
              @click="handleShowHideFAQ"
            >
              {{ showBtnText }}
            </button>
          </div>
        </div>
      </Grid>
    </Wrapper>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  blok: Object,
  marginClass: {
    type: String,
    default: "my-14 lg:my-20",
  },
});
const showBtnText = ref("Show More");

const showHeading = computed(() => {
  return props.heading !== "";
});
const showSummary = computed(() => {
  return props.summary !== "";
});
const filteredAccordions = computed(() => {
  if (props.blok.show_all_items) {
    return props.blok.body;
  }
  if (showBtnText.value === "Show More") {
    return props.blok.body.slice(0, 3);
  } else {
    return props.blok.body;
  }
  return [];
});
const handleShowHideFAQ = () => {
  if (showBtnText.value === "Show More") {
    showBtnText.value = "Show Less";
  } else {
    showBtnText.value = "Show More";
  }
};
</script>
