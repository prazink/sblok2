<template>
  <div :id="blok?.section_id" v-editable="blok" class="box bg-grey-200 py-8">
    <Wrapper>
      <Grid columns="grid-cols-1" gutters="gap-5 md:gap-10 content-center">
        <div class="w-full relative z-2 mx-auto justify-center bg-white rounded-[18px] sm:py-4 sm:px-6 sm:my-6 md:flex">
          <div class="px-4 pb-2 pt-4 md:pl-8 flex flex-col md:flex-1">
            <BaseForm ref="formData" :schema="data.schema" @on-submit="handleSubmitData">
              <template #success>
                <p class="font-heavy text-navy mb-4 text-h4-sm lg:text-h4">
                  Thanks for sharing your details.
                </p>
                <div class="text-navy">
                  <p>
                    We like your thinking! Your local Liberty Adviser will be in
                    touch with you soon.
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
// import gsap from "gsap";
import { ref, reactive } from "vue";

const props = defineProps({
  blok: Object,
});

const data = reactive({
  schema: {
    fields: [
      {
        component: "Heading",
        text: "Business partner details",
      },
      {
        component: "TextInput",
        label: "Full name",
        name: "FormBusinessPartnerFullName",
        type: "text",
        rules: "required",
        value: "",
        column_class: "col-span-12 lg:col-span-6",
        errorMessage: "Please enter your full name",
      },
      {
        component: "TextInput",
        label: "Email address",
        name: "FormBusinessPartnerEmail",
        type: "email",
        rules: "required|email",
        value: "",
        column_class: "col-span-12 lg:col-span-6 mb-6",
        errorMessage: "Please enter your email address",
      },
      {
        component: "Heading",
        text: "Customer details",
      },
      {
        component: "TextInput",
        label: "Full name",
        name: "FormCustomerFullName",
        type: "text",
        rules: "required",
        value: "",
        column_class: "col-span-12 lg:col-span-6",
        errorMessage: "Please enter your full name",
      },
      {
        component: "TextInput",
        label: "Contact number",
        name: "FormCustomerContactNumber",
        type: "number",
        rules: "required",
        value: "",
        column_class: "col-span-12 lg:col-span-6",
        errorMessage: "Please enter your contact number",
      },
      {
        component: "TextInput",
        label: "Email address",
        name: "FormCustomerContactEmail",
        type: "email",
        rules: "required|email",
        value: "",
        column_class: "col-span-12",
        errorMessage: "Please enter your email address",
      },
      {
        component: "CheckboxGroup",
        label: "Loan type (Please tick all that apply)",
        name: "FormLoanType",
        type: "CheckboxItem",
        rules: "required",
        options: [
          {
            label: "Motor loan",
            value: "Motor Loan",
          },
          {
            label: "Personal loan",
            value: "Personal Loan",
          },
          {
            label: "Home loan",
            value: "Home Loan",
          },
          {
            label: "Investment loan",
            value: "Investment Loan",
          },
          {
            label: "Other",
            value: "Other",
          },
        ],
        value: "",
        column_class: "col-span-12 lg:col-span-6",
      },
      {
        component: "CheckboxGroup",
        label: "Insurance type (Please tick all that apply)",
        name: "FormInsuranceType",
        type: "CheckboxItem",
        rules: "required",
        options: [
          {
            label: "Vehicle equity insurance (VEI)",
            value: "Vehicle Equity Insurance (VEI)",
          },
          {
            label: "Loan protection insurance (LPI)",
            value: "Loan Protection Insurance (LPI)",
          },
          {
            label: "Home & contents",
            value: "Home & Contents",
          },
          {
            label: "Landlord insurance",
            value: "Landlord Insurance",
          },
          {
            label: "Vehicle",
            value: "Vehicle",
          },
          {
            label: "Caravan",
            value: "Caravan",
          },
          {
            label: "Boat",
            value: "Boat",
          },
        ],
        value: "",
        column_class: "col-span-12 lg:col-span-6",
      },
      {
        component: "CheckboxGroup",
        label:
          "Please confirm that the customer is expecting a call from LFI Group to discuss their insurance needs?",
        name: "FormCostumerExpectingCall",
        type: "RadioItem",
        rules: "required",
        options: [
          {
            label: "Yes",
            value: "Yes",
          },
        ],
        value: "",
        column_class: "col-span-12 lg:col-span-6",
      },
      {
        component: "CheckboxGroup",
        label: "Best time to contact the customer",
        name: "FormBestTimeToCall",
        type: "RadioItem",
        rules: "required",
        options: [
          {
            label: "Morning",
            value: "Morning",
          },
          {
            label: "Afternoon",
            value: "Afternoon",
          },
          {
            label: "After 5pm",
            value: "After 5pm",
          },
        ],
        value: "",
        column_class: "col-span-12 lg:col-span-6",
      },
      {
        component: "TextAreaInput",
        label: "Is there any other relevant information?",
        name: "FormMessage",
        rules: "required",
        value: "",
        column_class: "col-span-12",
        errorMessage: "Please enter your message",
      },
    ],
  },
});

const formData = ref();
const apiEndpoint = ref("/lfi/lead");

const showSuccessMessage = () => {
  formData.value.setSuccessState();
};

const config = useRuntimeConfig();

const handleSubmitData = async (data: any) => {
  // console.log("data", data);
  const rawData = data;
  rawData.FormId = props.blok?.section_id;
  rawData.FormSubject = 'Business Partner'

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
  } catch (error) {
    console.log("error");
  }
};

</script>
