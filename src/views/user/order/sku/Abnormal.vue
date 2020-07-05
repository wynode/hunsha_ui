<template>
  <div class="ab_normal">
    <div class="ab_warning">
      该订单出现了异常状况，请先与顾客沟通好，填写备注
    </div>
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
// import { fetchShopUserSkuList } from '@/apis'
import { abnormalFields } from './formConfig'

export default {
  computed: {
    formFields() {
      return abnormalFields(this)
    },
  },

  data() {
    return {
      shopSkuList: [],
    }
  },
}
</script>

<style lang="scss">
.ab_warning {
  color: red;
  margin-bottom: 15px;
}
.ab_normal {
  .el-form-item__content {
    display: flex;
    align-items: center;
    height: 36px;
  }
}
</style>
