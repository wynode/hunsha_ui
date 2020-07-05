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
    <div class="sku_contnet">
      <!-- <el-button size="small" type="primary" class="Mb20 Mr20" @click="addItem">
        新增店铺Sku
      </el-button> -->

      <!-- <Txcel
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
      /> -->
      <el-row :gutter="20">
        <el-col :span="4" v-for="sku in tableList" :key="sku.skuId">
          <el-card class="sku_card">
            <div class="sc_img_box">
              <img :src="imgUrl + sku.thumb" alt="" @click="goView(sku)" />
            </div>
            <div @click="goView(sku)" class="sc_info_list">
              <h1 style="font-size: 16px;">
                <span>{{ sku.skuName }}</span>
              </h1>
              <h1>
                sku编号：
                <span>{{ sku.skuCode }}</span>
              </h1>
              <div>
                <h1>
                  分类名称：
                  <span>
                    {{ sku.categoryName
                    }}{{ sku.gender == 1 ? '（男装）' : '（女装）' }}
                  </span>
                </h1>

                <h1>
                  库存：
                  <span>{{ sku.skuNum }}</span>
                  件
                </h1>
              </div>

              <!-- <div class="sc_price">
                <p style="font-weight: bold">
                  <span>￥</span>
                  <i>{{ sku.shopSalePrice }}</i>
                </p>
                <p>
                  <span>￥</span>
                  <i class="sc_rprice">{{ sku.recommendSalePrice }}</i>
                </p>
              </div> -->
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
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
import { IMG_URL } from '@/config'
import ShowForm from './ShowForm'

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
    imgUrl() {
      return IMG_URL
    },
    fetchTableListMethod() {
      return fetchShopUserSkuList
    },

    tableListCols() {
      return tableListCols(this)
    },
    filterFields() {
      return filterFields(this)
    },
    orderId() {
      const { orderId } = this.$route.query
      return orderId || ''
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

    goView(row) {
      this.$createDialog(
        {
          fullscreen: true,
          footer: false,
        },
        () => <ShowForm meta={row} orderId={this.orderId} />
      ).show()
      // this.$router.push({ name: 'showSku' })
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

<style lang="scss">
.sku_contnet {
  .sku_card {
    cursor: pointer;
    margin-top: 15px;
    &:hover {
      box-shadow: 0 2px 4px 0 rgb(0, 0, 0, 0.1) !important;
    }
    .sc_img_box {
      width: 100%;
      padding-bottom: 100%;
      position: relative;
    }
    .sc_info_list {
      span {
        color: #333;
      }
    }
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    h1 {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 4px 0 4px;
    }
    h2 {
    }
    .sc_price {
      display: flex;
      justify-content: space-between;
      p {
        font-size: 16px;
        color: #333;
      }
      span {
        font-size: 12px;
      }
      .sc_rprice {
        text-decoration: line-through;
      }
    }
  }
}
</style>
