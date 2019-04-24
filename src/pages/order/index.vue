<!--<template>-->
  <!--<div>-->
    <!--<div>-->
      <!--<div>-->
        <!--<label>寄件人地址：</label>-->
        <!--<input type="text" id="from_address" name="from_address" v-model="fromAddress">-->
        <!--<label>姓名：</label>-->
        <!--<input type="text" id="user_from" name="user_from" v-model="userFrom">-->
        <!--<label>电话：</label>-->
        <!--<input type="text" id="user_from_phone" name="user_from_phone" v-model="userFromPhone">-->
        <!--<div>-->
          <!--<label>省：</label>-->
          <!--<picker @change="provincePickerChange" :value="provinceIndex" :range="provinceArray">-->
            <!--<view class="picker">-->
              <!--{{provinceArray[provinceIndex]}}-->
            <!--</view>-->
          <!--</picker>-->
        <!--</div>-->
        <!--<label>市：</label>-->
        <!--<picker @change="cityPickerChange" :value="cityIndex" :range="cityArray">-->
          <!--<view class="picker">-->
            <!--{{cityArray[cityIndex]}}-->
          <!--</view>-->
        <!--</picker>-->
        <!--<label>收件人地址：</label>-->
        <!--<input type="text" id="to_address" name="to_address" v-model="toAddress">-->
        <!--<label>姓名：</label>-->
        <!--<input type="text" id="user_to" name="user_to" v-model="userTo">-->
        <!--<label>电话：</label>-->
        <!--<input type="text" id="user_to_phone" name="user_to_phone" v-model="userToPhone">-->
        <!--<label>重量：</label>-->
        <!--<input type="text" id="weight" name="weight" v-model="weight">-->
        <!--<label>体积：</label>-->
        <!--<input type="text" id="volume" name="volume" v-model="volume">-->
        <!--<label>计费方式：</label>-->
        <!--<div>-->
          <!--<div>-->
            <!--<radio-group class="radio-group" @change="radioChange">-->
              <!--<label class="radio" v-for="(item, index) in radioItems" :key="item.name">-->
                <!--<radio :value="item.name"/> {{item.value}}-->
              <!--</label>-->
            <!--</radio-group>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div>-->
          <!--<label>收款金额：</label>-->
          <!--&lt;!&ndash;<input type="button" class="weui-btn-area" value="计算" v-on:click="calCharge()">&ndash;&gt;-->
        <!--</div>-->
        <!--<input type="text" id="amount" name="amount" v-model="amount">-->
        <!--<input type="button" value="提交" v-on:click="submitOrder()">-->
        <!--<mp-button type="primary" size="large" btnClass="mb15">默认按钮</mp-button>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
<!--</template>-->
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
        <picker class="weui-btn" mode="region" :value="region" @change="CityChange">
          <button class="weui-btn weui-btn_primary" type="default">地区</button>
        </picker>
        <view class="picker">
          {{region}}
        </view>
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
        region: ['北京市', '北京市', '海淀区'],
        radioIndex: 0,
        radioItems: [
          {name: '1', value: '最低', charge: 0},
          {name: '2', value: '开单', charge: 0, checked: 'true'},
          {name: '3', value: '包首', weight: '', charge: 0}
        ],
        provinceIndex: 0,
        provinceArray: [],
        cityIndex: 0,
        cityArray: [],
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
        var temp = parseFloat(this.weight) * parseFloat(this.baseCharge)
        console.log('charge type: ' + this.radioIndex)
        if (this.radioIndex === 0) {
          this.amount = (temp > this.radioItems[0].charge) ? temp : this.radioItems[0].charge
          this.amount = parseFloat(this.amount).toFixed(3)
          console.log('amount: ' + this.amount + '-' + temp + '-' + this.radioItems[0].charge)
        } else if (this.radioIndex === 1) {
          this.amount = temp + this.radioItems[1].charge
          this.amount = parseFloat(this.amount).toFixed(3)
          console.log('amount: ' + this.amount + '-' + temp + '-' + this.radioItems[1].charge)
          console.log('weight: ' + this.weight + '-' + this.baseCharge)
        } else if (this.radioIndex === 2) {
          if (this.weight < this.radioItems[2].weight) {
            this.amount = this.radioItems[2].charge
            this.amount = parseFloat(this.amount).toFixed(3)
          } else {
            this.amount = this.radioItems[2].charge + (this.weight - this.radioItems[2].weight) * this.baseCharge
            this.amount = parseFloat(this.amount).toFixed(3)
          }
        } else {
          console.log('illegal charge type')
        }
      },
      submitOrder (ev) {
        console.log('submit order')
        var orderFrom = this.fromAddress
        var orderTo = this.provinceArray[this.provinceIndex]
        if (this.cityArray[this.cityIndex] === '空') {
          orderTo += '市' + this.toAddress
        } else {
          orderTo += '省' + this.cityArray[this.cityIndex] + '市' + this.toAddress
        }
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
            amount: this.amount
          }
        })
      },
      getProvince () {
        this.$http.post({
          url: '/area/getProvince'
        }).then(res => {
          console.log('getProvince result: ' + res)
          this.provinceIndex = 0
          this.cityIndex = 0
          if (res.length === 0) {
            this.provinceArray = ['空']
            this.cityArray = ['空']
          } else {
            this.provinceArray = res
            var province = this.provinceArray[this.provinceIndex]
            this.getCity(province)
          }
        })
      },
      getCity (province) {
        this.$http.post({
          url: '/area/getCity',
          data: {
            'superior': province
          }
        }).then(res => {
          console.log(res)
          this.cityIndex = 0
          if (res.length === 0) {
            this.cityArray = ['空']
          } else {
            this.cityArray = res
          }
          this.getBaseCharge()
        })
      },
      getBaseCharge () {
        var province = this.region[0]
        var city = this.region[1]
        var area = this.region[2]
        console.log('province: ' + province + ', city: ' + city + ', area: ' + area)
        this.$http.post({
          url: '/baseCharge/getByArea',
          data: {
            'province': province,
            'city': city,
            'area': area
          }
        }).then(res => {
          console.log('getBaseCharge' + res.charge)
          this.baseCharge = res.charge
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
      this.getChargeType()
      // this.getProvince()
      this.getBaseCharge()
    }
  }
</script>
