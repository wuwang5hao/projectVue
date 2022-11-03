export const ruleMap = {
  account: [
    { required: true, message: '请输入手机或邮箱', trigger: 'change' },
    { min: 5, max: 30, pattern: /[\w\d@.-_]{5,30}/g, message: '请输入正确的手机或者邮箱', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { min: 8, max: 30, pattern: /^[0-9a-zA-Z~!@#$%^&*()_+]{8,30}$/g, message: '密码为8-30的字母数字或字符', trigger: 'blur' },
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'change' },
    { min: 8, max: 30, pattern: /^[0-9a-zA-Z~!@#$%^&*()_+]{8,30}$/g, message: '密码为8-30的字母数字或字符', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请输入确认密码', trigger: 'change' },
    { min: 8, max: 30, pattern: /^[0-9a-zA-Z~!@#$%^&*()_+]{8,30}$/g, message: '密码为8-30的字母数字或字符', trigger: 'blur' },
  ],
  mobile: [
    { required: true, pattern: /\d{11,11}/g, message: '请输入正确的手机号', trigger: 'blur' },
  ]
}
