<template>
  <li>
    <div @click="toggle">
      <h5 class="text-body md:text-h5-sm font-bold text-font-gray">
        <button
          type="button"
          class="relative pr-8 py-3 px-0 sm:py-5 sm:pl-5 w-full font-medium text-font-gray text-left"
        >
          {{ heading }}
          <nuxt-icon
            v-if="isOpen"
            name="Minus"
            class="w-5 fill-navy absolute right-0 top-1/2 -translate-y-1/2"
          />
          <nuxt-icon
            v-else
            name="Plus"
            class="w-5 fill-navy absolute right-0 top-1/2 -translate-y-1/2"
          />
        </button>
      </h5>
    </div>
    <transition
      name="accordion-item"
      @enter="startTransition"
      @after-enter="endTransition"
      @before-leave="startTransition"
      @after-leave="endTransition"
    >
      <div v-if="isOpen" class="description overflow-hidden">
        <div class="sm:px-5 sm:pb-5">
          <slot name="body" />
        </div>
      </div>
    </transition>
  </li>
</template>

<script setup>
const props = defineProps({
  heading: {
    type: String,
    required: true,
  },
});

const Accordion = provide("Accordion");

const index = 0;
const isOpenInternal = ref(false);

const isOpen = computed(() => {
  return Accordion
    ? Accordion.count > 0 && Accordion.current === index.value
    : isOpenInternal.value;
});

// onMounted(() => {
//   if (Accordion) {
//     Accordion.count--;
//   }
// });

const toggle = () => {
  if (Accordion) {
    Accordion.current = isOpen.value ? null : index.value;
  }

  isOpenInternal.value = !isOpenInternal.value;
};
const startTransition = (el) => {
  el.style.height = el.scrollHeight + "px";
};
const endTransition = (el) => {
  el.style.height = "";
};
</script>

<style scoped>
.accordion-item-enter-active,
.accordion-item-leave-active {
  will-change: height;
  transition: height 0.2s ease;
}

.accordion-item-enter,
.accordion-item-leave-to {
  height: 0 !important;
}
</style>
