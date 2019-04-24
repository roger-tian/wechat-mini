<template>
  <div>
    <div class="weui-cells__title">下单</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">姓名：</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="寄件人姓名" type="text" v-model="userFrom">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">电话：</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" pattern="[0-9]*" placeholder="寄件人电话" type="tel" v-model="userFromPhone">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">地址：</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="寄件人地址" type="text" size="small" v-model="fromAddress">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">姓名：</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="收件人姓名" type="text" v-model="userTo">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">电话：</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" pattern="[0-9]*" placeholder="收件人电话" type="tel" v-model="userToPhone">
        </div>
      </div>
      <div class="weui-cell">
        <picker mode="multiSelector" @change="areaPickerChange" @columnchange="areaPickerColumnChange" :value="areaIndex" :range="areaArray">
          <button class="weui-btn weui-btn_primary" type="default">地区</button>
          <view class="picker">
            当前选择：{{areaArray[0][areaIndex[0]]}}，{{areaArray[1][areaIndex[1]]}}，{{areaArray[2][areaIndex[2]]}}
          </view>
        </picker>
        <!--<picker class="weui-btn" mode="region" :value="region" @change="CityChange">-->
          <!--<button class="weui-btn weui-btn_primary" type="default">地区</button>-->
        <!--</picker>-->
        <!--<view class="picker">-->
          <!--{{region}}-->
        <!--</view>-->
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">地址：</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="收件人详细地址" type="text" v-model="toAddress">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">重量：</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="重量" type="number" v-model="weight">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">体积：</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="体积" type="number" v-model="volume">
        </div>
      </div>
      <div class="weui-cell">
        <radio-group class="weui-radio-group" @change="radioChange">
        <label class="radio" v-for="(item, index) in radioItems" :key="item.name">
        <radio :value="item.name"/> {{item.value}}
        </label>
        </radio-group>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">收款金额：</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="收款金额" type="number" v-model="amount">
        </div>
      </div>
      <div>
        <input type="button" class="weui-btn weui-btn_primary" value="提交" v-on:click="submitOrder()">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        motto: 'Hello miniprograme',
        userInfo: {
          nickName: 'mpvue',
          avatarUrl: 'http://mpvue.com/assets/logo.png'
        },
        areaArray: [[], [], []],
        areaIndex: [0, 0, 0],
        // region: ['北京市', '北京市', '海淀区'],
        radioIndex: 0,
        radioItems: [
          {name: '1', value: '最低', charge: 0},
          {name: '2', value: '开单', charge: 0, checked: 'true'},
          {name: '3', value: '包首', weight: '', charge: 0}
        ],
        // provinceIndex: 0,
        // provinceArray: [],
        // cityIndex: 0,
        // cityArray: [],
        fromAddress: '',
        userFrom: '',
        userFromPhone: '',
        userTo: '',
        userToPhone: '',
        toAddress: '',
        weight: '',
        volume: '',
        baseCharge: 0,
        amount: 0
      }
    },
    components: {
    },
    methods: {
      areaPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.mp.detail.value)
        this.areaIndex = e.mp.detail.value
        this.getBaseCharge()
      },
      areaPickerColumnChange: function (e) {
        console.log('修改的列为', e.mp.detail.column, '，值为', e.mp.detail.value)
        console.log(e)
        this.areaIndex[e.mp.detail.column] = e.mp.detail.value
        var province
        var city
        switch (e.mp.detail.column) {
          case 0:
            province = this.areaArray[0][e.mp.detail.value]
            this.$http.post({
              url: '/area/getCity',
              data: {
                'province': province
              }
            }).then(res => {
              console.log(res)
              this.areaArray[1] = res
              this.$set(this.areaArray, 1, res)
              console.log('---' + res + '---' + this.areaArray[1] + '---' + this.areaArray)
              var city = this.areaArray[1][0]

              this.$http.post({
                url: '/area/getArea',
                data: {
                  'province': province,
                  'city': city
                }
              }).then(res => {
                console.log(res)
                this.areaArray[2] = res
                this.$set(this.areaArray, 2, res)
                console.log('areaIndex: ' + this.areaIndex + 'areaArray: ' + this.areaArray[0] + '-' + this.areaArray[1] + '-' + this.areaArray[2])
              })
            })
            break
          case 1:
            province = this.areaArray[0][this.areaIndex[0]]
            city = this.areaArray[1][e.mp.detail.value]

            this.$http.post({
              url: '/area/getArea',
              data: {
                'province': province,
                'city': city
              }
            }).then(res => {
              console.log(res)
              this.areaArray[2] = res
              this.$set(this.areaArray, 2, res)
            })
            break
        }
        console.log('areaIndex: ' + this.areaIndex + 'areaArray: ' + this.areaArray[0] + '-' + this.areaArray[1] + '-' + this.areaArray[2])
      },
      CityChange (e) {
        console.log('选中的城市为：' + e.mp.detail.value)
        this.region = e.mp.detail.value
        this.getBaseCharge()
      },
      provincePickerChange (e) {
        console.log(e)
        this.provinceIndex = e.mp.detail.value

        var province = this.provinceArray[this.provinceIndex]
        this.getCity(province)
      },
      cityPickerChange (e) {
        console.log(e)
        this.cityIndex = e.mp.detail.value

        this.getBaseCharge()
      },
      radioChange (e) {
        console.log('radio发生change事件，携带value值为：', e.target.value + ':' + this.radioIndex)
        // this.radioIndex = e.target.value - 1
        this.radioIndex = e.target.value - 1
        console.log('radioIndex: ' + this.radioIndex)
        // console.log(this)
        this.calCharge(e)
      },
      calCharge (e) {
        console.log('calculate charge')
        console.log(this.radioItems[this.radioIndex].name)
        var temp = parseFloat(this.weight) * this.baseCharge
        console.log('charge type: ' + this.radioIndex + 'temp: ' + temp)
        if (this.radioIndex === 0) {
          console.log('radioIndex: 0, ' + this.radioItems[0].charge)
          this.amount = (temp > this.radioItems[0].charge) ? temp : this.radioItems[0].charge
          this.amount = parseFloat(this.amount).toFixed(1)
          console.log('amount: ' + this.amount + '-' + temp + '-' + this.radioItems[0].charge)
        } else if (this.radioIndex === 1) {
          console.log('radioIndex: 1, ' + this.radioItems[1].charge + 'temp: ' + temp)
          this.amount = temp + this.radioItems[1].charge
          this.amount = parseFloat(this.amount).toFixed(1)
          console.log('amount: ' + this.amount + '-' + temp + '-' + this.radioItems[1].charge)
          console.log('weight: ' + this.weight + '-' + this.baseCharge)
        } else if (this.radioIndex === 2) {
          console.log('radioIndex: 2, ' + this.radioItems[2].charge)
          if (this.weight < this.radioItems[2].weight) {
            this.amount = this.radioItems[2].charge
            this.amount = parseFloat(this.amount).toFixed(1)
          } else {
            this.amount = this.radioItems[2].charge + (this.weight - this.radioItems[2].weight) * this.baseCharge
            this.amount = parseFloat(this.amount).toFixed(1)
          }
        } else {
          console.log('illegal charge type')
        }
      },
      submitOrder (ev) {
        console.log('submit order')
        var orderFrom = this.fromAddress
        var orderTo = this.areaArray[0][this.areaIndex[0]] + this.areaArray[1][this.areaIndex[1]] +
          this.areaArray[2][this.areaIndex[2]] + this.toAddress
        this.$http.post({
          url: '/order/generate',
          data: {
            userFrom: this.userFrom,
            userFromPhone: this.userFromPhone,
            userTo: this.userTo,
            userToPhone: this.userToPhone,
            orderFrom: orderFrom,
            orderTo: orderTo,
            chargeType: this.radioIndex.toString(),
            weight: this.weight,
            volume: this.volume,
            amount: this.amount.toString()
          }
        }).then(res => {
          console.log(res.result)
        })
      },
      getProvince () {
        this.$http.post({
          url: '/area/getProvince'
        }).then(res => {
          console.log('getProvince result: ' + res)
          this.areaArray[0] = res
        })
      },
      getCity (province) {
        this.$http.post({
          url: '/area/getCity',
          data: {
            'province': province
          }
        }).then(res => {
          console.log(res)
          this.areaArray[1] = res
        })
      },
      getArea (province, city) {
        this.$http.post({
          url: '/area/getArea',
          data: {
            'province': province,
            'city': city
          }
        }).then(res => {
          console.log(res)
          this.areaArray[2] = res
        })
      },
      initArea () {
        this.$http.post({
          url: '/area/getProvince'
        }).then(res => {
          console.log('getProvince result: ' + res)
          this.areaArray[0] = res
          var province = this.areaArray[0][0]

          this.$http.post({
            url: '/area/getCity',
            data: {
              'province': province
            }
          }).then(res => {
            console.log(res)
            this.areaArray[1] = res
            var city = this.areaArray[1][0]

            this.$http.post({
              url: '/area/getArea',
              data: {
                'province': province,
                'city': city
              }
            }).then(res => {
              console.log(res)
              this.areaArray[2] = res
            })
          })
        })
      },
      getBaseCharge () {
        var province = this.areaArray[0][this.areaIndex[0]]
        var city = this.areaArray[1][this.areaIndex[1]]
        var area = this.areaArray[2][this.areaIndex[2]]
        console.log('province: ' + province + ', city: ' + city + ', area: ' + area)
        this.$http.post({
          url: '/baseCharge/getByProvinceCityArea',
          data: {
            'province': province,
            'city': city,
            'area': area
          }
        }).then(res => {
          console.log('getBaseCharge' + res.charge)
          if (res.charge === null) {
            this.baseCharge = 0
          } else {
            this.baseCharge = res.charge
          }
        })
      },
      getChargeType () {
        for (var i = 0; i < 3; i++) {
          var type = i.toString()
          this.$http.post({
            url: '/chargeType/getByType',
            data: {
              'type': type
            }
          }).then(res => {
            console.log(res)
            switch (res.type) {
              case '0':
                this.radioItems[0].charge = res.charge
                console.log('getChargeType type' + res.type + 'result: ' + res.charge)
                break
              case '1':
                this.radioItems[1].charge = res.charge
                console.log('getChargeType type' + res.type + 'result: ' + res.charge)
                break
              case '2':
                this.radioItems[2].charge = res.charge
                this.radioItems[2].weight = res.remark
                console.log('getChargeType type' + res.type + 'result: ' + res.charge + 'weight: ' + res.remark)
                break
              default:
                break
            }
          })
        }
      }
    },
    created () {
      console.log('created' + this.region)
      this.initArea()
      this.getChargeType()
      this.getBaseCharge()
    }
  }
</script>
