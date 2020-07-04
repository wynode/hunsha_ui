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
        :effects="handleFormEffects"
        @submit="handleFilter"
        @cancel="handleFilterReset"
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
        新增店铺Sku
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
  fetchShopUserSkuList,
  // fetchShopUserSku,
  postShopUserSku,
  patchShopUserSku,
  deleteShopUserSku,
  fetchShopUserSkuCategory,
} from '@/apis'
import { tableListCols } from './tableConfig'
import EditForm from './EditForm'
import { filterFields } from './formConfig'

const table = tableMixins({
  pagerInit: { page: 1, page_size: 10 },
})

export default {
  name: 'ShopUserSkuList',

  mixins: [table],

  data() {
    return { skuCategory: [] }
  },

  computed: {
    fetchTableListMethod() {
      return fetchShopUserSkuList
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
      subscribe('categoryId', (fields) => {
        if (fields.categoryId) {
          fields.categoryId.fieldValue = ''
        }
      })
      subscribe('onFieldChange', 'categoryId', (value, form) => {
        this.handleFilter(form)
      })
    },
    addItem() {
      this.$createDialog(
        {
          title: '新增店铺Sku',
          width: '600px',
          onSubmit: async (instance, slotRef) => {
            if (slotRef.$refs.effectForm) {
              const { effectForm } = slotRef.$refs
              if (await effectForm.useValidator()) {
                const form = effectForm.getForm()
                await postShopUserSku(form)
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

    modifyItem(row) {
      this.$createDialog(
        {
          title: '更新店铺Sku',
          width: '500px',
          validate: false,
          onSubmit: async (instance, slotRef) => {
            const { effectForm } = slotRef.$refs
            if (await effectForm.useValidator()) {
              const form = effectForm.getForm()
              await patchShopUserSku({
                usageId: row.usageId,
                ...form,
              })
              this.fetchTableList(this.filtersCache)
              this.$notify.success('修改成功')
              instance.close()
            }
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
        await deleteShopUserSku({ usageId: row.usageId })
        this.$notify.success('删除成功')
        this.fetchTableList(this.filtersCache)
      }
    },
  },

  mounted() {
    this.fetchTableList()
    fetchShopUserSkuCategory().then((data) => {
      this.skuCategory = data.result
    })
  },
}
</script>

<style></style>
