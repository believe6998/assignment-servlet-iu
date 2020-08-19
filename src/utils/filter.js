import numeral from 'numeral'
import Vue from 'vue'
import moment from 'moment'
import {Constants} from '../utils/const'

Vue.filter('filterStatus', function (value) {
  let status = Constants.Status
  for (let item of status) {
    if (item.value === value) {
      return item.label
    }
  }
})
Vue.filter('filterOrderStatus', function (value) {
  let status = Constants.OrderStatus
  for (let item of status) {
    if (item.value === value) {
      return item.label
    }
  }
})

Vue.filter('filterDateTime', function (value) {
  return moment(value).format('DD/MM/YYYY HH:mm:ss')
})

Vue.filter('filterDate', function (value) {
  return moment(value).format('DD/MM/YYYY')
})

Vue.filter('time', function (s) {
  let cd = 24 * 60 * 60 * 1000,
    ch = 60 * 60 * 1000,
    d = Math.floor(s / cd),
    h = Math.floor((s - d * cd) / ch),
    m = Math.round((s - d * cd - h * ch) / 60000),
    pad = function (n) {
      return n < 10 ? '0' + n : n;
    };
  if (m === 60) {
    h++;
    m = 0;
  }
  if (h === 24) {
    d++;
    h = 0;
  }
  if( d === 0){
    d = ''
  }else {
    d = d + 'D '
  }
  return d + pad(h) + ':' + pad(m)
})

Vue.filter('formatInteger', function (value) {
  return value ? numeral(value).format('0,0') : ''
})
