<template>
  <div class="add_sku_form">
    <el-form ref="showForm" :model="showForm" label-width="auto">
      <div v-if="!showXz">
        <el-form-item label="sku分类名称筛选">
          <el-select
            v-model="skuCategory"
            placeholder="选择sku分类名称进行筛选"
            @change="searchChange"
          >
            <el-option
              v-for="item in skuCategoryList"
              :label="item.categoryName"
              :value="item.categoryId"
              :key="item.categoryId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="sku关键字搜索">
          <el-input v-model="keyword" @input="searchChange"></el-input>
        </el-form-item>
        <Txcel
          v-loading="mixTableLoading"
          v-if="!showXz"
          element-loading-text="数据加载中"
          class="Txcel"
          :data="tableList"
          :columns="tableListCols"
          :pager="false"
          @change="handleTableChange"
        />
      </div>
      <div v-if="showXz">
        <div class="Mb20">
          <el-button type="primary" size="small" @click="congxinxuanzhe">
            重新选择sku
          </el-button>
        </div>
        <el-form-item
          label="店铺销售价格"
          prop="shopSalePrice"
          :rules="[
            { required: true, message: '请填写店铺销售价格', trigger: 'blur' },
          ]"
        >
          <el-input v-model="showForm.shopSalePrice"></el-input>
          元
          <span class="Ml20">建议销售价格{{ row.recommendSalePrice }}元</span>
        </el-form-item>
        <el-form-item
          label="店铺租赁价格"
          prop="shopRentPrice"
          :rules="[
            { required: true, message: '请填写店铺租赁价格', trigger: 'blur' },
          ]"
        >
          <el-input v-model="showForm.shopRentPrice"></el-input>
          元
          <span class="Ml20">建议租赁价格{{ row.recommendRentPrice }}元</span>
        </el-form-item>
        <el-form-item
          label="店铺定制价格"
          prop="shopCustomizePrice"
          :rules="[
            { required: true, message: '请填写店铺定制价格', trigger: 'blur' },
          ]"
        >
          <el-input v-model="showForm.shopCustomizePrice"></el-input>
          元
          <span class="Ml20">
            建议定制价格{{ row.recommendCustomizePrice }}元
          </span>
        </el-form-item>
        <el-form-item
          label="库存"
          prop="skuNum"
          :rules="[{ required: true, message: '请填写库存', trigger: 'blur' }]"
        >
          <el-input v-model="showForm.skuNum"></el-input>
          件
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import tableMixins from '@/mixins/table'
import { fetchSkuList, fetchSkuCategoryList } from '@/apis'
import { showTableListCols } from './tableConfig'
import ShowForm from '@/views/admin/sku/list/ShowForm'

const showFormInit = {
  shopSalePrice: '',
  shopRentPrice: '',
  shopCustomizePrice: '',
  skuNum: '',
  skuId: '',
}

const table = tableMixins({
  pagerInit: { page: 1, page_size: 10 },
})

export default {
  mixins: [table],

  data() {
    return {
      showXz: false,
      keyword: '',
      skuCategory: '',
      skuCategoryList: [],
      row: {},
      showForm: {
        ...showFormInit,
      },
    }
  },

  computed: {
    tableListCols() {
      return showTableListCols(this)
    },

    fetchTableListMethod() {
      return fetchSkuList
    },
  },

  methods: {
    // categoryChange(value) {
    //   this.fetchTableList({ categoryId: value })
    // },
    congxinxuanzhe() {
      this.showForm = { ...showFormInit }
      this.showXz = false
    },
    searchChange() {
      this.fetchTableList({
        keyword: this.keyword,
        categoryId: this.skuCategory,
      })
    },
    xuanzhong(row) {
      this.showForm.skuId = row.skuId
      this.row = row
      this.showXz = true
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
  },

  mounted() {
    fetchSkuCategoryList().then((data) => {
      this.skuCategoryList = data.result.list
    })
    this.fetchTableList()
  },
}
</script>

<style lang="scss">
.add_sku_form {
  .el-input {
    max-width: 220px;
  }
}
</style>
