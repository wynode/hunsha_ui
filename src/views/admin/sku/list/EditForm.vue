<template>
  <div>
    <EffectForm
      ref="effectForm"
      size="medium"
      label-position="right"
      label-width="auto"
      class="admin_sku_form"
      :needToolBtnGroup="false"
    >
      <EffectFormField
        v-for="field in formFields"
        v-bind="field"
        :className="field.name"
        :key="field.name"
      />
    </EffectForm>
  </div>
</template>

<script>
import { fetchSkuCategoryList } from '@/apis'
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
    fetchSkuCategoryList().then((data) => {
      this.skuCategory = data.result.list
    })
  },
}
</script>

<style lang="scss">
.admin_sku_form {
  display: flex;
  flex-wrap: wrap;
  // .el-form-item {
  //   margin-left: 0px;
  // }
  .el-input {
    width: 190px;
  }
  .Upload {
    width: 700px;
  }
  .el-textarea {
    width: 784px;
  }
  .recommendSalePrice {
    margin-right: 200px;
  }
  .recommendRentPrice {
    margin-right: 200px;
  }
  .recommendCustomizePrice {
    margin-right: 200px;
  }
  .saleTimes {
    width: 330px;
  }
  .rentTimes {
    width: 330px;
  }
  .customizeTimes {
    width: 330px;
  }
  .costPrice {
    &::before {
      // content: '出售：';
      position: absolute;
      left: -25px;
      top: 8px;
    }
    position: relative;
    // padding-left: 60px;
  }
  .rentCostPrice {
    &::before {
      // content: '租赁：';
      position: absolute;
      left: -25px;
      top: 8px;
    }
    position: relative;
    // padding-left: 60px;
  }
  .customizeCostPrice {
    &::before {
      // content: '定制：';
      position: absolute;
      left: -25px;
      top: 8px;
    }
    position: relative;
    // padding-left: 60px;
  }
}
</style>
