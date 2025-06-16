<template>
  <div v-if="connected">
    <p><strong>Adapter:</strong> {{ wallet?.adapter.name }}</p>
    <p><strong>Address:</strong> {{ address }}</p>
    <p><strong>余额:</strong> {{ balance }} TRX</p>
    <button @click="disconnect">Disconnect</button>
    <button @click="fetchBalance">查询余额</button>
    <input v-model="toAddress" placeholder="请输入收款地址" />
    <input v-model.number="amount" type="number" placeholder="请输入转账金额（TRX）" />
    <button @click="transfer">转账</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { TronWeb } from 'tronweb'
import { useWallet } from '@tronweb3/tronwallet-adapter-vue-hooks'

const { wallet, address, connected, disconnect } = useWallet()
const balance = ref(0)
const toAddress = ref('')
const amount = ref(0)

console.log('TronWeb', TronWeb)
const tronWeb = new TronWeb({ fullHost: 'https://api.shasta.trongrid.io' })

const fetchBalance = async () => {
  if (!address.value) return
  try {
    const response = await fetch(`https://api.shasta.trongrid.io/v1/accounts/${address.value}`)
    const data = await response.json()
    if (data.success && data.data.length > 0) {
      balance.value = data.data[0].balance / 1000000
    }
  } catch (error) {
    console.error('查询余额失败:', error)
  }
}

const transfer = async () => {
  if (!address.value || !toAddress.value || amount.value <= 0) return
  try {
    const response = await tronWeb.transactionBuilder.sendTrx(
      toAddress.value,
      amount.value * 1000000,
      address.value
    )
    const signedTx = await wallet.value.adapter.signTransaction(response)
    const result = await tronWeb.trx.sendRawTransaction(signedTx)
    console.log('转账结果:', result)
    // 清空输入框
    toAddress.value = ''
    amount.value = 0
  } catch (error) {
    console.error('转账失败:', error)
  }
}
</script>

<style>
input {
  border: solid 2px #000;
  height: 45px;
  border-radius: 4px;
  text-indent: 5px;
  margin-right: 5px;
}
</style>