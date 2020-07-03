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

<style lang="scss">
.shop_sku_form {
  display: flex;
  flex-wrap: wrap;
  .el-form-item {
    margin-bottom: 18px;
  }
  .el-input__inner {
    width: 140px;
  }
  .el-select {
    width: 320px;
    .el-input__inner {
      width: 100%;
    }
  }
  .el-textarea__inner {
    width: 390px;
  }
}
</style>
