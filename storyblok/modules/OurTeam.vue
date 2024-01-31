<template>
  <div v-editable="blok" :class="marginClass">
    <Wrapper>
      <Grid
        columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        gutters="gap-5 md:gap-10"
      >
        <button
          v-for="(item, index) in blok.body"
          :key="item.uuid"
          class="w-full rounded-md bg-white shadow-card pt-2 pr-2 pb-5 md:pb-12 pl-2 mt-10 cursor-pointer group"
          @click="
            showModal = true;
            currentIndex = index;
          "
        >
          <div
            class="relative w-full h-[200px] rounded-md mb-6 bg-center bg-cover gradient-lfi"
          >
            <NuxtImg
              preset="avatar"
              width="266"
              :src="item.image.filename"
              :alt="item.image.alt"
              class="absolute bottom-0 left-1/2 -translate-x-1/2"
              loading="lazy"
            />
          </div>
          <div class="px-2 md:px-0">
            <div class="text-left md:text-center">
              <p
                class="text-h5-sm md:text-h5 text-navyfont-heavy group-hover:underline"
              >
                {{ item.name }}
              </p>
              <p class="text-[0.75rem] leading-[1.6] italic text-font-gray">
                &#40;{{ item.pronouns }}&#41;
              </p>
              <p class="text-sm text-font-gray">
                {{ item.title }}
              </p>
            </div>
          </div>
        </button>
        <ModalPopup
          v-if="showModal"
          :items="carouselImages"
          :current-index="currentIndex"
          @onClick="showModal = false"
          @update:currentIndex="(index) => (currentIndex = index)"
        />
      </Grid>
    </Wrapper>
  </div>
</template>

<script setup>
// import { computed, defineProps, ref } from "vue";

const props = defineProps({
  blok: Object,
  marginClass: {
    type: String,
    default: "my-14 lg:my-20",
  },
});

const carouselImages = computed(() => {
  return props.blok.body.map((item) => {
    return item;
  });
});

const showModal = ref(false);
const currentIndex = ref(0);
</script>
