import { FormatTime } from '@/components/CellTools.jsx'

export function userListCols(vm) {
  return [
    {
      label: '管理ID',
      prop: 'adminId',
      width: 120,
    },
    {
      label: '管理名称',
      prop: 'adminName',
    },
    {
      label: '管理帐号',
      prop: 'adminAccount',
    },
    {
      label: '最后登录IP',
      prop: 'lastLoginIp',
    },
    {
      label: '最后登录时间',
      prop: 'lastLoginTime',
      component: FormatTime,
    },
    {
      label: '创建时间',
      prop: 'addTime',
      component: FormatTime,
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
                onClick={() => vm.modifyUser(this.row)}>
                编辑
              </el-button>

              <el-button
                type="text"
                class="Ml8"
                size="small"
                style="color:#f56c6c;"
                onClick={() => vm.delUser(this.row)}>
                删除
              </el-button>
            </span>
          )
        },
      },
    }, // 操作
  ]
}
