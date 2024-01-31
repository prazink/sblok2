<template>
  <div :id="blok?.section_id" v-editable="blok" class="bg-grey-200 py-8">
    <Wrapper>
      <Grid columns="grid-cols-1 md:grid-cols-3" gutters="gap-5 md:gap-10 content-center">
        <div
          class="col-span-full relative z-2 mx-auto justify-center bg-white rounded-[18px] sm:py-4 sm:px-6 sm:my-6 md:flex">
          <div class="w-full h-auto hidden md:block md:w-2/5 pt-1">
            <NuxtImg v-if="blok?.image" :src="blok.image.filename" :alt="blok.image.alt" provider="storyblok"
              class="w-full h-full object-contain object-center" loading="lazy" />
          </div>
          <div class="px-4 pb-2 md:pl-8 flex flex-col md:flex-1">
            <h2 v-if="!hideHeadings" class="pt-2 text-h2-sm lg:text-h2 font-heavy text-navy mb-4">
              {{ blok?.heading }}
            </h2>
            <p v-if="!hideHeadings" class="text-body text-font-gray font-normal leading-normal mb-6">
              {{ blok?.sub_heading }}
            </p>
            <BaseForm ref="formData" :schema="data.schema" @on-submit="handleSubmitData">
              <template #success>
                <div class="absolute top-[45%]">
                  <p class="font-heavy text-navy mb-4 text-h4-sm lg:text-h4">
                    Thanks for sharing your details.
                  </p>
                  <p class="text-body text-font-gray font-normal leading-normal mb-6">
                    We'll reach out soon to discuss your insurance quote.
                  </p>
                </div>
              </template>
            </BaseForm>
          </div>
        </div>
      </Grid>
    </Wrapper>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const props = defineProps({
  blok: Object,
});

const data = reactive({
  schema: {
    fields: [
      {
        component: "TextInput",
        label: "First name",
        name: "FormFirstName",
        type: "text",
        rules: "required",
        value: "",
        column_class: "col-span-12 lg:col-span-6",
        errorMessage: "Please enter your full name",
      },
      {
        component: "TextInput",
        label: "Last name",
        name: "FormLastName",
        type: "text",
        rules: "required",
        value: "",
        column_class: "col-span-12 lg:col-span-6",
        errorMessage: "Please enter your last name",
      },
      {
        component: "TextInput",
        label: "Email address",
        name: "FormEmail",
        type: "email",
        rules: "required|email",
        value: "",
        column_class: "col-span-12 lg:col-span-6",
        errorMessage: "Please enter your email address",
      },
      {
        component: "TextInput",
        label: "Phone number",
        name: "FormPhone",
        type: "number",
        rules: "required",
        value: "",
        column_class: "col-span-12 lg:col-span-6",
        errorMessage: "Please enter your phone number",
      },
      {
        component: "TextInput",
        label: "Policy number",
        name: "FormPolicyNumber",
        type: "number",
        rules: "required",
        value: "",
        column_class: "col-span-12 lg:col-span-6",
        errorMessage: "Please enter your policy number",
      },
      {
        component: "SelectItem",
        label: "Product",
        name: "FormProductEnquiry",
        rules: "required",
        options: [
          {
            label: "Loan protection ",
            value: "Loan protection ",
          },
          {
            label: "Vehicle equity",
            value: "Vehicle equity",
          },
          {
            label: "Home insurance",
            value: "Home insurance",
          },
          {
            label: "Vehicle insurance",
            value: "Vehicle insurance",
          },
          {
            label: "Other",
            value: "Other",
          },
        ],
        value: "",
        column_class: "col-span-12 lg:col-span-6",
        errorMessage: "Please select product",
      },
      {
        component: "TextAreaInput",
        label: "Please include key details of the incident",
        name: "FormMessage",
        rules: "required",
        value: "",
        column_class: "col-span-12",
        errorMessage: "Please enter comment",
      },
    ],
  },
});
const formData = ref();
const hideHeadings = ref(false);

const apiEndpoint = ref("/lfi/lead");

const showSuccessMessage = () => {
  formData.value.setSuccessState();
};
const config = useRuntimeConfig();
const handleSubmitData = async (data: any) => {
  // console.log("data", data);
  const rawData = data;
  rawData.FormId = props.blok?.section_id;
  rawData.FormSubject = 'Make a claim'
  try {
    await useFetch(apiEndpoint, {
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer {$config.FORM_AUTH_TOKEN}`,
      },
      baseURL: config.public.mcoAPI,
      method: "POST",
      body: data,
    });
    // console.log("data from server", data.value);

    showSuccessMessage();
    hideHeadings.value = true;
  } catch (error) {
    console.log("error");
  }
};
</script>
