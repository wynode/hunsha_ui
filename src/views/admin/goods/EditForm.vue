<template>
  <div>
    <EffectForm
      ref="effectForm"
      size="medium"
      label-position="left"
      label-width="auto"
      :needToolBtnGroup="false"
      :effects="handleFormEffects"
    >
      <EffectFormField
        v-for="field in dialogFormFields"
        v-bind="field"
        :key="field.name"
      />
    </EffectForm>
  </div>
</template>

<script>
// import { dateFormat } from '@/utils/dateFormat'
import { dialogFormFields } from './formConfig'

export default {
  props: {
    meta: {
      type: Object,
      default: null,
    },
    formType: {
      type: String,
      default: 'add',
    },
  },

  data() {
    return {}
  },

  computed: {
    dialogFormFields() {
      return dialogFormFields(this.formType, this)
    },
  },

  watch: {
    meta: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          const { fields, setForm } = this.$refs.effectForm
          if (this.meta) {
            Object.keys(fields).forEach((fieldName) => {
              setForm(fieldName, this.meta[fieldName])
            })
          }
        })
      },
    },
  },

  methods: {
    handleFormEffects() {},
  },
}
</script>

<style lang="scss"></style>
