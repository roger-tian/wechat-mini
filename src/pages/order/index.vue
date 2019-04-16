<template>
  <div>
    <div>
      <div>
        <div>
          <label>省：</label>
          <picker @change="provincePickerChange" :value="provinceIndex" :range="provinceArray">
            <view class="picker">
              {{provinceArray[provinceIndex]}}
            </view>
          </picker>
        </div>
        <label>市：</label>
        <picker @change="cityPickerChange" :value="cityIndex" :range="cityArray">
          <view class="picker">
            {{cityArray[cityIndex]}}
          </view>
        </picker>
        <label>重量：</label>
        <input type="text" id="weight" name="weight" v-model="weight">
        <label>体积：</label>
        <input type="text" id="volume" name="volume" v-model="volume">
        <label>计费方式：</label>
        <div>
          <div>
            <radio-group class="radio-group" @change="radioChange">
              <label class="radio" v-for="(item, index) in radioItems" :key="item.name">
                <radio :value="item.name" :checked="item.checked"/> {{item.value}}
              </label>
            </radio-group>
          </div>
        </div>
        <div>
          <label>收款金额：</label>
          <input type="button" class="weui-btn-area" value="计算" v-on:click="calCharge()">
        </div>
        <input type="text" id="amount" name="amount" v-model="this.amount">
        <input type="button" value="提交" v-on:click="submitOrder()">
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
        radioIndex: 0,
        radioItems: [
          {name: '1', value: '最低', charge: ''},
          {name: '2', value: '开单', charge: '', checked: 'true'},
          {name: '3', value: '包首', weight: '', charge: ''}
        ],
        provinceIndex: 0,
        provinceArray: [],
        cityIndex: 0,
        cityArray: [],
        weight: 0,
        volume: 0,
        baseCharge: 0,
        amount: 0
      }
    },
    components: {
    },
    methods: {
      provincePickerChange (e) {
        console.log(e)
        this.provinceIndex = e.mp.detail.value

        var province = this.provinceArray[this.provinceIndex]
        this.getCity(province)
      },
      cityPickerChange (e) {
        console.log(e)
        this.cityIndex = e.mp.detail.value
      },
      radioChange (e) {
        console.log('radio发生change事件，携带value值为：', e.target.value + ':' + this.radioIndex)
      },
      calCharge (e) {
        console.log('calculate charge')
        console.log(this.radioItems[this.radioIndex].name)
        var province = this.provinceArray[this.provinceIndex]
        var city = this.cityArray[this.cityIndex]
        this.getBaseCharge(province, city)
        var temp = this.weight * this.baseCharge
        if (this.radioIndex.equals('1')) {
          this.amount = (temp > this.radioItems[0].charge) ? temp : this.radioItems[0].charge
        } else if (this.radioIndex.equals('2')) {
          this.amount = temp + this.radioItems[1].charge
        } else if (this.radioIndex.equals('3')) {
          if (this.weight < this.radioItems[3].weight) {
            this.amount = this.radioItems[3].charge
          } else {
            this.amount = this.radioItems[3].charge + (this.weight - this.radioItems[3].weight) * this.baseCharge
          }
        } else {
          console.log('illegal charge type')
        }
      },
      submitOrder (ev) {
        console.log('submit order')
        var to = this.provinceArray[this.provinceIndex] + this.cityArray[this.cityIndex]
        this.$http.post({
          url: '/order/generate',
          data: {
            from: '',
            to: to,
            chargeType: this.radioIndex,
            weight: this.weight,
            volume: this.volume,
            charge: this.charge
          }
        })
      },
      getProvince () {
        this.$http.post({
          url: '/area/getProvince'
        }).then(res => {
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
        })
      },
      getBaseCharge (province, city) {
        this.$http.post({
          url: 'baseCharge/getByArea',
          data: {
            'province': province,
            'city': city
          }
        }).then(res => {
          console.log(res)
          this.baseCharge = res
        })
      }
    },
    created () {
      this.getProvince()
    }
  }
</script>
