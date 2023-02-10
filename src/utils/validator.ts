import type { Rule } from 'antd/lib/form';

const successivePWD = (str: string): boolean => {
  const s = '0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz';
  const len = str.length;
  for (let i = 0; i < len - 3; i++) {
    console.log(str.slice(i, i + 4));

    if (s.indexOf(str.slice(i, i + 4)) > -1) {
      return true;
    }
  }
  return false;
};
export const pwdRule: Rule = {
  validator: (rule, value) => {
    const reg =
      /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z!@#$%~&*?+\-<>:']+$)(?![a-z0-9]+$)(?![a-z!@#$%~&*?+\-<>:']+$)(?![0-9!@#$%~&*?+\-<>:']+$)[a-zA-Z0-9!@#$%~&*?+\-<>:']{8,25}$/;
    if (!reg.test(value)) {
      return Promise.reject(
        '请输入8-25字符，大写字母、小写字母、数字、特殊符号至少包含三种'
      );
    }
    if (value && successivePWD(value)) {
      return Promise.reject('密码不能连续使用超过三位的同种类型字符');
    }
    return Promise.resolve();
  },
  // pattern:
  //   /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z!@#$%~&*?+\-<>:']+$)(?![a-z0-9]+$)(?![a-z!@#$%~&*?+\-<>:']+$)(?![0-9!@#$%~&*?+\-<>:']+$)[a-zA-Z0-9!@#$%~&*?+\-<>:']{8,25}$/,
  // message: '请输入8-25字符，大写字母、小写字母、数字、特殊符号至少包含三种',
};

export const nameRule: Rule = {
  pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{2,25}$/,
  message: '名称限制2~25个字，支持中英文、数字、字符',
};

export const phoneRule: Rule = {
  pattern: /^1[3-9]\d{9}$/,
  message: '请输入11位有效的手机号码',
};

export const emailRule: Rule = {
  pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  message: '请输入正确邮箱格式',
};
