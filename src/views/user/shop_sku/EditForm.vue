<template>
  <div>
    <EffectForm
      ref="effectForm"
      size="medium"
      label-position="left"
      label-width="auto"
      :needToolBtnGroup="false"
      class="sku_form"
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
import { fetchShopUserSkuCategory } from '@/apis'
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
      skuCategory: [],
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
              // const isPass = fieldName === 'adminPassword'
              // setForm(fieldName, isPass ? '' : this.meta[fieldName])
              setForm(fieldName, this.meta[fieldName])
            })
          }
        })
      },
    },
  },

  created() {
    fetchShopUserSkuCategory().then((data) => {
      this.skuCategory = data.result
    })
  },
}
</script>

<style lang="scss">
.sku_form {
  .el-form-item__content {
    width: 300px;
  }
}
</style>
