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
import { fetchShopList } from '@/apis'
import { editFields, addFields } from './formConfig'

export default {
  props: {
    meta: {
      type: Object,
      default: null,
    },
    routerId: {
      type: [String, Number],
      default: 0,
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
      shopList: [],
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
              const isPass = fieldName === 'password'
              setForm(fieldName, isPass ? '' : this.meta[fieldName])
            })
          }
        })
      },
    },
  },

  // methods: {
  //   handleFormEffects(subscribe) {
  //     subscribe('onFieldInit', (fields) => {
  //       if (this.meta) {
  //         fields.adminAccount.ifRender = false
  //       }
  //     })
  //   },
  // },
  mounted() {
    fetchShopList().then((data) => {
      this.shopList = data.result.list
    })
  },
}
</script>

<style lang="scss"></style>
