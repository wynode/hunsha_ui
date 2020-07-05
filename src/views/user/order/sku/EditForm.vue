<template>
  <div>
    <EffectForm
      ref="effectForm"
      size="medium"
      label-position="left"
      label-width="auto"
      :needToolBtnGroup="false"
      class="shop_sku_form"
      :effects="handleFormEffects"
    >
      <EffectFormField
        v-for="field in formFields"
        v-bind="field"
        :class="field.name"
        :key="field.name"
      />
    </EffectForm>
  </div>
</template>

<script>
import { fetchShopUserSkuList } from '@/apis'
import { editFields, addFields } from './formConfig'

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
      shopSkuList: [],
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

  methods: {
    handleFormEffects(subscribe, { setFieldState }) {
      subscribe('onFieldInit', (fields) => {
        if (fields.rentNum) {
          fields.rentNum.ifRender = false
        }
        if (fields.rentDepositNum) {
          fields.rentDepositNum.ifRender = false
        }
      })
      subscribe('onFieldChange', 'dealType', (value) => {
        setFieldState('rentNum', (proRef) => {
          proRef.ifRender = value === 2
        })
        setFieldState('rentDepositNum', (proRef) => {
          proRef.ifRender = value === 2
        })
      })
    },
  },

  created() {
    fetchShopUserSkuList().then((data) => {
      this.shopSkuList = data.result.list
    })
  },
}
</script>
