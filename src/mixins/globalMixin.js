import Vue from 'vue'
import { $util } from 'helper'

Vue.mixin({
  methods: {
    $verifyUrl (rule, value, callback) {
      if (!value || value.length <= 0) {
        callback(new Error('请输入地址'))
      } if (!$util.isLegalUrl(value)) {
        callback(new Error('请输入合法地址'))
      } else {
        callback()
      }
    }
  }
})
