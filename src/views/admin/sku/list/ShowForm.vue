<template>
  <div class="sku_show_form">
    <div class="ssf_info">
      <div class="ssf_left">
        <img :src="imgUrl + meta.thumb" alt="" />
      </div>

      <div class="ssf_right">
        <h1>{{ meta.skuName }}</h1>
        <h2>sku编号：{{ meta.skuCode }}</h2>
        <h3>商品价格：</h3>
        <div class="ssf_table">
          <ul>
            <li>商品价格</li>
            <li>租赁</li>
            <li>出售</li>
            <li>定制</li>
          </ul>
          <ul>
            <li>进货成本价</li>
            <li>{{ meta.rentCostPrice }}元</li>
            <li>{{ meta.costPrice }}元</li>
            <li>{{ meta.customizeCostPrice }}元</li>
          </ul>
          <ul>
            <li>建议出售价</li>
            <li>{{ meta.recommendRentPrice }}元</li>
            <li>{{ meta.recommendSalePrice }}元</li>
            <li>{{ meta.recommendCustomizePrice }}元</li>
          </ul>
        </div>
        <h3 style="margin-top: 20px">商品销量：</h3>
        <div class="ssf_table">
          <ul>
            <li>类型</li>
            <li>租赁</li>
            <li>出售</li>
            <li>定制</li>
          </ul>
          <ul>
            <li>次数</li>
            <li>{{ meta.saleTimes }}次</li>
            <li>{{ meta.rentTimes }}次</li>
            <li>{{ meta.customizeTimes }}次</li>
          </ul>
        </div>
        <div class="sku_btngroup">
          <el-button type="primary" size="small" @click="modifyskuFn">
            编辑
          </el-button>

          <el-button type="danger" class="Ml8" size="small" @click="delskuFn">
            删除
          </el-button>
        </div>
      </div>
    </div>
    <div class="ssf_content">
      <div class="ssfc_h">
        <h1>商品详情</h1>
      </div>
      <div class="ssfc_brief">
        <p>
          商品简介：
          {{ meta.brief }}
        </p>
        <p class="Mt10">
          面料备注：
          {{ meta.otherNote }}
        </p>
      </div>

      <div class="ssfc_html">
        <div class="ssfc_divi"></div>
        <div v-html="meta.description"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { IMG_URL } from '@/config'

export default {
  props: {
    meta: {
      type: Object,
      default: () => {},
    },
    closeDialog: {
      type: Boolean,
      default: false,
    },
    modifysku: {
      type: Function,
      default: () => Promise.reslove,
    },
    delsku: {
      type: Function,
      default: () => Promise.reslove,
    },
  },

  data() {
    return {}
  },

  watch: {
    closeDialog(newValue) {
      if (newValue) {
        // this.$parent.doClose()
        this.$parent.handleClose()
      }
    },
  },

  computed: {
    imgUrl() {
      return IMG_URL
    },
  },

  methods: {
    modifyskuFn() {
      this.modifysku(this.meta)
    },

    delskuFn() {
      this.delsku(this.meta)
    },
  },
}
</script>

<style lang="scss">
.sku_show_form {
  width: 980px;
  margin: 0 auto;
  .ssf_table {
    width: 501px;
    ul {
      display: flex;
      border: 1px solid #e5e5e5;
      &:first-child {
        background: #f6f6f6;
        border-bottom: none;
      }
      &:last-child {
        border-top: none;
      }
      li {
        text-align: center;
        border-right: 1px solid #e5e5e5;
        width: 125px;
        height: 30px;
        line-height: 30px;
        &:last-child {
          border-right: none;
        }
      }
    }
  }
  .ssf_info {
    display: flex;
    .ssf_left {
      img {
        width: 350px;
        height: 350px;
        object-fit: contain;
      }
    }
    .ssf_right {
      width: 596px;
      margin-left: 32px;
      position: relative;
      h1 {
        font-size: 18px;
        font-family: PingFang;
        font-weight: bold;
        color: rgba(102, 102, 102, 1);
        line-height: 28px;
      }
      h2 {
        font-size: 14px;
        font-family: PingFang;
        font-weight: bold;
        color: rgba(229, 57, 60, 1);
        line-height: 28px;
      }
      h3 {
        font-size: 14px;
        font-family: PingFang;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        line-height: 28px;
        margin-top: 8px;
        margin-bottom: 2px;
      }
    }
  }
  .ssf_content {
    height: 38px;
    background: rgba(247, 247, 247, 1);
    border-bottom: 1px solid #e4393c;
    margin-top: 100px;

    .ssfc_h {
      width: 107px;
      height: 39px;
      background: rgba(228, 57, 60, 1);
      font-size: 14px;
      font-family: PingFang;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 39px;
      text-align: center;
    }
    .ssfc_brief {
      margin: 0 auto;
      margin-top: 16px;
      width: 969px;
      line-height: 20px;
      font-size: 14px;
      font-family: PingFang;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
    }
    .ssfc_html {
      margin: 0 auto;
      width: 940px;
      margin-top: 16px;
      // background: #f1f1f1;
      padding: 10px 0;
      margin-bottom: 40px;
      // p {
      //   background: #f1f1f1 !important;
      // }
    }
    .ssfc_divi {
      height: 1px;
      margin-bottom: 24px;
      background: #eee;
      margin-left: -20px;
      margin-right: -20px;
    }
  }
}
.sku_btngroup {
  position: absolute;
  right: 0;
  top: 10px;
}
.is-fullscreen {
  .el-dialog__close {
    font-size: 40px;
  }
}
</style>
