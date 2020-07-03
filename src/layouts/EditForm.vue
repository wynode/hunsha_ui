<template>
  <div>
    <EffectForm
      ref="effectForm"
      size="medium"
      label-position="left"
      label-width="auto"
      :needToolBtnGroup="false"
    >
      <EffectFormField
        v-for="field in formFields"
        v-bind="field"
        :key="field.name"
      />
    </EffectForm>
  </div>
</template>

<script>
import { formFields } from './formConfig'

export default {
  computed: {
    formFields() {
      return formFields(this)
    },
  },
}
</script>

<style lang="scss"></style>
