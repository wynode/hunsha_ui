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
      >
        <EffectFormField
          v-for="field in filterFields"
          v-bind="field"
          :key="field.name"
        />
      </EffectForm>
    </el-card>
    <el-card class="Mt15">
      <el-button size="small" type="primary" class="Mb20 Mr20" @click="addItem">
        新增sku
      </el-button>

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
  fetchSkuList,
  // fetchSku,
  postSku,
  patchSku,
  deleteSku,
  fetchSkuCategoryList,
} from '@/apis'
import { tableListCols } from './tableConfig'
import EditForm from './EditForm'
import ShowForm from './ShowForm'
import { filterFields } from './formConfig'

const table = tableMixins({
  pagerInit: { page: 1, page_size: 10 },
})

export default {
  name: 'SkuList',

  mixins: [table],

  data() {
    return { skuCategory: [] }
  },

  computed: {
    fetchTableListMethod() {
      return fetchSkuList
    },

    tableListCols() {
      return tableListCols(this)
    },
    filterFields() {
      return filterFields(this)
    },
  },

  methods: {
    addItem() {
      this.$createDialog(
        {
          title: '新增店铺Sku',
          width: '1000px',
          top: '10px',
          onSubmit: async (instance, slotRef) => {
            if (slotRef.$refs.effectForm) {
              const { effectForm } = slotRef.$refs
              if (await effectForm.useValidator()) {
                const form = effectForm.getForm()
                let payload = {}
                Object.keys(form).forEach((item) => {
                  if (item.includes('Price')) {
                    payload[item] = Math.round(form[item] * 100)
                  } else {
                    payload[item] = form[item]
                  }
                })
                await postSku(payload)
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
          fullscreen: true,
          footer: false,
        },
        () => <ShowForm meta={row} />
      ).show()
      // this.$router.push({ name: 'showSku' })
    },

    modifyItem(row) {
      this.$createDialog(
        {
          title: '更新店铺Sku',
          width: '1000px',
          top: '10px',
          onSubmit: async (instance, slotRef) => {
            const { effectForm } = slotRef.$refs
            if (await effectForm.useValidator()) {
              const form = effectForm.getForm()
              let payload = {}
              Object.keys(form).forEach((item) => {
                if (item.includes('Price')) {
                  payload[item] = Math.round(form[item] * 100)
                } else {
                  payload[item] = form[item]
                }
              })
              await patchSku({
                skuId: row.skuId,
                ...payload,
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
        await deleteSku({ skuId: row.skuId })
        this.$notify.success('删除成功')
        this.fetchTableList(this.filtersCache)
      }
    },
  },

  mounted() {
    const { categoryId } = this.$route.query
    if (categoryId) {
      this.$nextTick(() => {
        const { getForm, setForm } = this.$refs.effectForm
        if (categoryId) {
          setForm('categoryId', Number(categoryId))
        }
        const data = getForm()
        this.fetchTableList(data)
      })
    } else {
      this.fetchTableList()
    }
    fetchSkuCategoryList().then((data) => {
      this.skuCategory = data.result.list
    })
  },
}
</script>

<style></style>
