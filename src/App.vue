<template>
  <WalletProvider :adapters="adapters" @error="handleError">
    <WalletModalProvider>
      <div class="p-4">
        <WalletActionButton />
        <WalletStatus />
      </div>
    </WalletModalProvider>
  </WalletProvider>
</template>

<script setup>
import { WalletProvider } from '@tronweb3/tronwallet-adapter-vue-hooks'
import { WalletModalProvider, WalletActionButton } from '@tronweb3/tronwallet-adapter-vue-ui'
import { TronLinkAdapter } from '@tronweb3/tronwallet-adapter-tronlink'
import WalletStatus from './components/WalletStatus.vue'

const adapters = [new TronLinkAdapter()]

function handleError(e) {
  console.error('Wallet error:', e.message)
}
</script>

<style>
@import '@tronweb3/tronwallet-adapter-vue-ui/style.css';
</style>
