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
import { dateFormat } from '@/utils/dateFormat'
import { addFields, editFields } from './formConfig'

export default {
  props: {
    meta: {
      type: Object,
      default: null,
    },
  },

  computed: {
    formFields() {
      return this.meta ? editFields(this) : addFields(this)
    },
  },

  data() {
    return {
      kw_categoryOpt: [],
    }
  },

  watch: {
    meta: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          const { fields, setForm } = this.$refs.effectForm
          if (this.meta) {
            Object.keys(fields).forEach((fieldName) => {
              const isSpecial = fieldName === 'receiveGoodsTime'
              setForm(
                fieldName,
                isSpecial
                  ? dateFormat(this.meta[fieldName] * 1000)
                  : this.meta[fieldName]
              )
            })
          }
        })
      },
    },
  },
}
</script>

<style lang="scss"></style>
