<template>
  <div class="admin_sku">
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
        新增服装
      </el-button>

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
      <el-row :gutter="20" style="margin-bottom: 10px" v-if="tableList.length">
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
                服装编号：
                <span>{{ sku.skuCode }}</span>
              </h1>
              <div>
                <h1>
                  分类名称：
                  <span>
                    {{ sku.categoryInfo.categoryName
                    }}{{
                      sku.categoryInfo.gender == 1 ? '（男装）' : '（女装）'
                    }}
                  </span>
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
      <div class="no_more_text">暂无服装</div>
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
import { IMG_URL } from '@/config'
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
    return {
      skuCategory: [],
      signal: false,
      rowD: {},
      skuId: '',
      closeDialog: false,
    }
  },

  computed: {
    imgUrl() {
      return IMG_URL
    },
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
          title: '新增服装',
          width: '1097px',
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

    goView(row) {
      this.rowD = row
      this.skuId = row.skuId
      this.$createDialog(
        {
          fullscreen: true,
          footer: false,
        },
        () => (
          <ShowForm
            meta={this.rowD}
            modifysku={this.modifyItem}
            delsku={this.deleteItem}
            closeDialog={this.closeDialog}
          />
        )
      ).show()
      // this.$router.push({ name: 'showSku' })
    },

    modifyItem(row) {
      this.$createDialog(
        {
          title: '更新店铺服装',
          width: '1097px',
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
      this.closeDialog = false
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
        this.closeDialog = true
      }
    },

    getPath() {
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
    },
  },

  watch: {
    $route: 'getPath',
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

<style lang="scss">
.admin_sku {
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
