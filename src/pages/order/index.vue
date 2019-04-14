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
        <input type="text" id="weight" name="weight">
        <label>体积：</label>
        <input type="text" id="volume" name="volume">
        <label>计费方式：</label>
        <div>
          <div>
            <radio-group class="radio-group" @change="radioChange">
              <label class="radio" v-for="(item, index) in items" :key="item.name">
                <radio :value="item.name" :checked="item.checked"/> {{item.value}}
              </label>
            </radio-group>
          </div>
        </div>
        <label>收款金额：</label>
        <input type="text" id="amount" name="cost">
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
        items: [
          {name: '1', value: '最低'},
          {name: '2', value: '开单', checked: 'true'},
          {name: '3', value: '包首'}
        ],
        provinceIndex: 0,
        provinceArray: ['北京', '上海', '广州'],
        cityIndex: 0,
        cityArray: ['海淀', '朝阳', '东城']
      }
    },
    components: {
    },
    methods: {
      provincePickerChange (e) {
        console.log(e)
        this.provinceIndex = e.mp.detail.value

        this.$http.post({
          url: '/control/user/list',
          data: {
            'userName': 'admin',
            'pageNo': '1'
          }
        }).then(res => {
          console.log(res)
        })
      },
      cityPickerChange (e) {
        console.log(e)
        this.cityIndex = e.mp.detail.value
      },
      radioChange (e) {
        console.log('radio发生change事件，携带value值为：', e.target.value)
      },
      submitOrder (ev) {
        console.log('submit order')
      }
    }
  }
</script>
