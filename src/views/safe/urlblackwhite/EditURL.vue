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
        v-for="field in URLFieldCols"
        v-bind="field"
        :key="field.name"
      />
    </EffectForm>
  </div>
</template>

<script>
import { URLFieldCols } from './formConfig'

export default {
  props: {
    meta: {
      type: Object,
      default: null,
    },
  },

  computed: {
    URLFieldCols() {
      return URLFieldCols(this)
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
          } else {
            setForm('type', 1)
          }
        })
      },
    },
  },

  methods: {
    handleFormEffects(subscribe) {
      subscribe('onFieldInit', (fields) => {
        if (this.meta) {
          fields.pathRule.ifRender = false
        }
      })
    },
  },
}
</script>

<style lang="scss"></style>
