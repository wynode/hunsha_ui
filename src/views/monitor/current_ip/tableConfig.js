import { FormatTime } from '@/components/CellTools.jsx'
import { dateFormat } from '@/utils/dateFormat'
import { byteToMGb } from '@/utils/common'

export function urlListCols(vm) {
  return [
    {
      label: 'ip地址',
      prop: 'ip',
      component: {
        props: { row: Object },
        render() {
          return (
            <div class="ip_col" onClick={() => vm.goaccess(this.row)}>
              {vm.langtoip(this.row.ip)}
            </div>
          )
        },
      },
    },
    {
      label: 'ipLocation',
      prop: 'ipLocation',
      component: {
        props: { row: Object },
        render() {
          const { ipLocation } = this.row
          const lo = JSON.parse(ipLocation)
          const showText = lo.province
            ? `${lo.province || ''}${lo.city || ''}${lo.county || ''}`
            : '未知'
          const referenceText = (
            <div>
              <p>省：{lo.province}</p>
              <p>市：{lo.city}</p>
              <p>区：{lo.county}</p>
              <p>经度：{lo.lat}</p>
              <p>维度：{lo.lng}</p>
            </div>
          )
          const refer = lo.province ? <p>{referenceText}</p> : ''
          const textcut = (
            <el-popover trigger="hover" placement="right">
              {refer}
              <p slot="reference">{showText}</p>
            </el-popover>
          )

          return <div>{textcut}</div>
        },
      },
    },
    {
      label: '第一次访问时间',
      prop: 'firstAccessTime',
      component: FormatTime,
    },
    {
      label: '最后访问时间',
      prop: 'lastAccessTime',
      component: FormatTime,
    },
    {
      label: 'QPS',
      sortable: 'custom',
      prop: 'qps',
    },
    // {
    //   label: '周期次数',
    //   sortable: 'custom',
    //   prop: 'accessInInterval',
    // },
    {
      label: '近期总次数',
      sortable: 'custom',
      prop: 'accessTimes',
    },
    {
      label: '可疑次数',
      prop: 'suspect',
    },
    {
      label: '入网流量',
      prop: 'incomeTransferNum',
      component: {
        props: { row: Object },
        render() {
          return <div>{byteToMGb(this.row.incomeTransferNum)}</div>
        },
      },
    },
    {
      label: '访问统计',
      component: {
        props: { row: Object },
        render() {
          return (
            <el-button
              size="mini"
              type="primary"
              onClick={() => vm.goipHistory(this.row)}>
              访问统计
            </el-button>
          )
        },
      },
    },
    {
      label: '日志',
      width: 190,
      component: {
        props: { row: Object },
        render() {
          return (
            <span>
              <el-button
                class="Ml8"
                size="mini"
                type="primary"
                onClick={() => vm.goaccess(this.row)}>
                请求日志
              </el-button>
              <el-button
                class="Ml8"
                size="mini"
                type="danger"
                onClick={() => vm.goattack(this.row)}>
                攻击日志
              </el-button>
            </span>
          )
        },
      },
    }, // 操作
    {
      label: '黑白名单状态',
      component: {
        props: { row: Object },
        render() {
          const { ipInfo } = this.row
          let showText = ''
          let expire = ''
          let note = ''
          if (ipInfo) {
            if (ipInfo.type == 1) {
              showText = '白名单'
            } else if (ipInfo.type == 2) {
              showText = '黑名单'
            } else if (ipInfo.type == 3) {
              showText = '临时黑名单'
            }
            expire = dateFormat(ipInfo.expire * 1000)
            note = ipInfo.note
          }
          const black = (
            <el-popover trigger="hover" placement="right">
              <p style={'max-width: 400px'}>
                {showText}
                {expire ? ` 过期时间:${expire}` : ''}
                {note ? ` 备注:${note}` : ''}
              </p>

              <div
                slot="reference"
                style="font-size: 12px"
                class="text_one_line">
                {showText}
                {expire ? ` 过期时间:${expire}` : ''}
                {note ? ` 备注:${note}` : ''}
              </div>
            </el-popover>
          )

          return <div>{black}</div>
        },
      },
    },
    {
      label: '黑白名单操作',
      width: 150,
      component: {
        props: { row: Object },
        render() {
          const { ipInfo } = this.row
          const haveblack = (
            <el-button
              type="text"
              class="Ml8"
              size="small"
              style="color:#f56c6c;"
              onClick={() => vm.delblackorwhite(this.row)}>
              删除
            </el-button>
          )

          const noblack = (
            <span>
              <el-button
                type="text"
                class="Ml8"
                size="small"
                style="color:#f56c6c;"
                onClick={() => vm.goblack(this.row)}>
                拉黑
              </el-button>
              <el-button
                type="text"
                size="small"
                onClick={() => vm.gowhite(this.row)}>
                白名单
              </el-button>
            </span>
          )
          return <div>{ipInfo ? haveblack : noblack}</div>
        },
      },
    }, // 操作
  ]
}
