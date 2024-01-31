<template>
  <div v-editable="blok" class="2xl:container w-full mx-auto lg:px-8 lg:px-10">
    <div class="box relative overflow-hidden">
      <section
        class="relative overflow-hidden border-transparent lg:rounded-xl tablet:min-h-[300px] lg:min-h-[524px] -mt-14 mobile+tablet:-mt-4 tablet:-mt-30 lg:mt-0"
        :class="currentGradient">
        <div class="h-full lg:min-h-[400px] max:min-h-[500px]">
          <div class="hidden lg:block absolute bottom-0 right-0 w-full h-full lg:overflow-hidden">
            <NuxtImg preset="avatar" :src="blok.image_desktop.filename" :alt="blok.image_desktop.alt"
              class="w-full h-full object-cover object-left-bottom" loading="lazy" provider="storyblok" width="1450"
              height="520" quality="90" />
          </div>
          <div class="block lg:hidden">
            <NuxtImg preset="avatar" :src="blok.image_mobile.filename" :alt="blok.image_mobile.alt"
              class="block mx-auto w-full h-full py-8 mobile+tablet:w-[600px] tablet:object-cover tablet:w-[560px] tablet:h-[500px]"
              provider="storyblok" width="750" height="630" quality="90" />
          </div>
          <div class="relative z-10 lg:w-[750px] lg:pt-11">
            <div class="px-4 -mt-2 pb-12 lg:pl-16 lg:py-20">
              <Heading id="heading" tag="h1" size="h1" :text="blok.heading"
                :class="['text-h1-sm font-heavy mb-4 text-center lg:text-left lg:font-heavy lg:mb-6', textColour ? textColour : 'text-white']" />
              <h2
                :class="['description text-h5-sm mb-8 text-center lg:text-left lg:text-h5 lg:font-light lg:w-full', textColour ? textColour : 'text-white']">
                {{ blok.sub_heading }}
              </h2>
              <Button v-for="c in blok.cta" :key="c._uid" :size="c.size" tag="NuxtLink" :to="c.link.cached_url"
                :variant="c.type"
                class="main-btn mr-4 my-2 w-full block tablet:w-auto lg:inline-flex lg:w-auto lg:mt-8 lg:font-bold">{{
                  c.label
                }}</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  blok: Object,
});
const currentGradient = computed(() => {
  return props.blok.gradient_background;
});
const textColour = computed(() => {
  return props.blok.text_colour;
});
</script>
<style lang="scss" scoped>
.gradient-primary {
  // background: radial-gradient(160.03% 178.36% at 183.55% 199.02%, #28B4E6 0%, #005AAA 100%);
  background: radial-gradient(184.73% 740.83% at 96.18% 138.74%,
      #52B2FE 0%,
      rgba(43, 117, 239, 0.9) 47.9%,
      #1A4EB1 100%);
}

.gradient-aqua {
  background: radial-gradient(100.31% 665.81% at 92.85% 108.43%,
      #56BDC2 0%,
      #22949A 100%);
}

.gradient-green {
  background: radial-gradient(103.74% 239.76% at 1.32% 4.88%,
      #0C7141 0%,
      #0BC16B 100%);
}

.gradient-orange {
  background: radial-gradient(53.43% 162.49% at 95.16% 109.74%,
      #EFB871 0%,
      #D7790F 100%);
}

.gradient-yellow {
  background: radial-gradient(73.48% 265.82% at 12.29% 20.71%,
      #F7C00C 0%,
      #F9D24E 100%);
}

.gradient-pink {
  background: radial-gradient(127.64% 955.17% at 115.88% 111.37%,
      #F8B6C4 0%,
      #CA4963 100%);
}

.gradient-purple {
  background: radial-gradient(47.7% 225.3% at 21.92% 43.16%,
      #6C1ED2 0%,
      #A067E9 100%);
}

.gradient-lfi {
  background: radial-gradient(108.05% 733.13% at 100% 120.61%,
      #52B2FE 0%,
      rgba(43, 117, 239, 0.9) 47.9%,
      #1A4EB1 100%);
}

/*
    This classes are for the directive.
    For each element observed by our directive, the before-enter class is added.
  */
.before-enter {
  opacity: 0;
  transform: translateX(100px);
  transition: all 1s cubic-bezier(0.41, 0.01, 0.57, 1.61);
}

/*
    If the element intersects with the viewport, the before-enter class is added.
  */
.enter {
  opacity: 1;
  transform: translateX(0px);
}

.main-btn:nth-child(odd) {
  animation: fadeInBottom 1.5s ease-in-out;
}

.main-btn:nth-child(even) {
  animation: fadeInBottom 2s ease-in-out;
}

.description {
  animation: fadeInRight 1s ease-in-out;
}

@keyframes fadeInBottom {
  from {
    opacity: 0;
    transform: translateY(300px);
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(-80px);
  }

  to {
    opacity: 1;
  }
}
</style>