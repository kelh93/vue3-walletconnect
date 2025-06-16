<template>
  <div v-if="connected" class="space-y-2">
    <button @click="getBalance">查看余额</button>
    <button @click="doTransfer">转账 1 TRX</button>
    <p v-if="balance !== null"><strong>余额：</strong>{{ balance }} TRX</p>
    <p v-if="txHash"><strong>交易 Hash：</strong>{{ txHash }}</p>
  </div>
</template>

<script setup>
import TronWeb from 'tronweb';
import { ref } from 'vue';
import { useWallet } from '@tronweb3/tronwallet-adapter-vue-hooks';

const { wallet, address } = useWallet();
const balance = ref<number|null>(null);
const txHash = ref<string>('');

const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
});

async function getBalance() {
  if (!address.value) return;
  const balSun = await tronWeb.trx.getBalance(address.value);
  balance.value = balSun / 1e6;
}

async function doTransfer() {
  if (!wallet.value || !address.value) return;
  const to = prompt('请输入目标地址');
  if (!to) return;
  try {
    const tx = await tronWeb.transactionBuilder.sendTrx(to, tronWeb.toSun(1), address.value);
    const signed = await wallet.value.adapter.signTransaction(tx);
    const res = await tronWeb.trx.sendRawTransaction(signed);
    txHash.value = res.txid!;
    alert('已发送，交易哈希: ' + txHash.value);
  } catch (e) {
    console.error(e);
    alert('操作失败: ' + e.message);
  }
}
</script>
