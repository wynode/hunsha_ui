export const formFields = () => {
  return [
    {
      title: '密码',
      name: 'password',
      widget: 'text',
      rules: [{ required: true, message: '请填写密码', trigger: 'blur' }],
      xProps: {
        'show-password': true,
        minlength: 6,
        maxlength: 16,
        'show-word-limit': true,
      },
    },
  ]
}
