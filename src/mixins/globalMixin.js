import Vue from 'vue'
import { $util } from 'helper'
import { Fingerprint2 } from 'assets/js/fingerprint2.min'

let cFingerprint = null
new Fingerprint2().get((result, components) => {
  cFingerprint = result
})

Vue.mixin({
  data () {
    return {
      fingerprint: cFingerprint
    }
  },

  methods: {
    getFingerPrint () {
      return this.fingerprint || ''
    },

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
