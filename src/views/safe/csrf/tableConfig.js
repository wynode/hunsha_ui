// import { FormatTime } from '@/components/CellTools.jsx'

export function SQLListCols(vm) {
  return [
    {
      label: 'id',
      prop: 'id',
      width: 140,
    },
    {
      label: '路径规则',
      prop: 'pathRule',
    },
    {
      label: '规则名',
      prop: 'name',
    },
    {
      label: '备注',
      prop: 'note',
    },
    {
      label: '类型',
      prop: 'type',
      component: {
        props: { row: Object },
        render() {
          const { type } = this.row
          let nodeTag = ''
          if (type === 1) {
            nodeTag = '全匹配'
          } else if (type === 2) {
            nodeTag = '正则匹配'
          } else {
            nodeTag = ''
          }
          return <span>{nodeTag}</span>
        },
      },
    },
    {
      label: '操作',
      width: 150,
      component: {
        props: { row: Object },
        render() {
          return (
            <span>
              <el-button
                type="text"
                size="small"
                onClick={() => vm.modifySQL(this.row)}>
                编辑
              </el-button>

              <el-button
                type="text"
                class="Ml8"
                size="small"
                style="color:#f56c6c;"
                onClick={() => vm.delSQL(this.row)}>
                删除
              </el-button>
            </span>
          )
        },
      },
    }, // 操作
  ]
}
