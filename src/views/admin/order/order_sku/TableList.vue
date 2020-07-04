<template>
  <div>
    <el-card>
      <EffectForm
        ref="effectForm"
        inline
        size="small"
        label-position="left"
        class="table_filter"
        submitText="搜索"
        cancelText="刷新"
        @submit="handleFilter"
        @cancel="handleFilterReset"
        :effects="handleFormEffects"
      >
        <EffectFormField
          v-for="field in filterFields"
          v-bind="field"
          :key="field.name"
        />
      </EffectForm>
    </el-card>
    <el-card class="Mt15">
      <!-- <el-button size="small" type="primary" class="Mb20 Mr20" @click="addItem">
        新增订单sku
      </el-button> -->

      <Txcel
        v-loading="mixTableLoading"
        element-loading-text="数据加载中"
        class="Txcel"
        :data="tableList"
        :columns="tableListCols"
        :pager="{
          page: pager.page,
          page_size: pager.page_size,
          layout: 'total,prev,pager,next,jumper',
          total: tableTotal,
        }"
        @change="handleTableChange"
      />
    </el-card>
  </div>
</template>

<script>
import tableMixins from '@/mixins/table'
import {
  fetchAdminShopOrderSkuList,
  // fetchAdminShopOrderSku,
  postAdminShopOrderSku,
  patchAdminShopOrderSku,
  deleteAdminShopOrderSku,
} from '@/apis'
import { getStatusOptions } from '@/utils/common'
import { tableListCols } from './tableConfig'
import EditForm from './EditForm'
import { filterFields, filtersMutation } from './formConfig'

const table = tableMixins({
  pagerInit: { page: 1, page_size: 10 },
  filtersMutateInit: filtersMutation,
})

export default {
  name: 'adminOrderListSku',

  mixins: [table],

  data() {
    return {
      statusList: [],
    }
  },

  computed: {
    fetchTableListMethod() {
      return fetchAdminShopOrderSkuList
    },

    tableListCols() {
      return tableListCols(this)
    },

    filterFields() {
      return filterFields(this)
    },
  },

  methods: {
    handleFormEffects(subscribe) {
      subscribe('onFieldChange', 'dealType', (value, form) => {
        form.status = []
        this.statusList = getStatusOptions(value)
      })
    },

    addItem() {
      this.$createDialog(
        {
          title: '新增订单Sku',
          width: '600px',
          onSubmit: async (instance, slotRef) => {
            if (slotRef.$refs.effectForm) {
              const { effectForm } = slotRef.$refs
              if (await effectForm.useValidator()) {
                const form = slotRef.$refs.effectForm.getForm()
                await postAdminShopOrderSku({
                  orderId: this.$route.params.id,
                  ...form,
                })
                this.fetchTableList(this.filtersCache)
                this.$notify.success('新增成功')
                instance.close()
              }
            }
          },
        },
        () => <EditForm />
      ).show()
    },

    showItem(row) {
      this.$createDialog(
        {
          title: '查看订单Sku详情',
          width: '600px',
          validate: false,
          showCancelBtn: false,
          top: '20vh',
          onSubmit: async (instance) => {
            instance.close()
          },
        },
        () => <EditForm meta={row} />
      ).show()
    },

    modifyItem(row) {
      this.$createDialog(
        {
          title: '查看订单Sku详情',
          width: '600px',
          validate: false,
          showCancelBtn: false,
          top: '20vh',
          onSubmit: async (instance, slotRef) => {
            const form = slotRef.$refs.effectForm.getForm()
            await patchAdminShopOrderSku({
              orderSkuId: row.orderSkuId,
              ...form,
            })
            this.fetchTableList(this.filtersCache)
            this.$notify.success('修改成功')
            instance.close()
          },
        },
        () => <EditForm meta={row} />
      ).show()
    },

    async deleteItem(row) {
      const ifDel = await this.$confirm('请确认此删除操作, 是否继续?', '提示', {
        type: 'warning',
      }).catch(() => {
        this.$notify.info('操作取消')
        return false
      })

      if (ifDel) {
        await deleteAdminShopOrderSku({ orderSkuId: row.orderSkuId })
        this.$notify.success('删除成功')
        this.fetchTableList(this.filtersCache)
      }
    },
  },

  mounted() {
    this.fetchTableList()
  },
}
</script>

<style></style>
