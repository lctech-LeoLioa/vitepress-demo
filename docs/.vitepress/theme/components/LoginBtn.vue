<template>
  <ClientOnly v-if="!isLoading">
    <button
      v-if="isLogin"
      type="button"
      class="rounded-md border border-solid border-gray-200/50 px-3 font-medium"
      @click="logout"
    >
      登出
    </button>
    <button
      v-else
      type="button"
      class="rounded-md border border-solid border-gray-200/50 px-3 font-medium"
      @click="login"
    >
      登入
    </button>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import type { UseCatRes } from '../../../../application/port'

console.log(process.env);

const useCatProxy = ref<UseCatRes | null>(null)
const isLoading = ref<boolean>(true)

onMounted(async () => {
  const { useCat } = await import('../../../../application/useCat')
  useCatProxy.value = useCat()
  await nextTick()
  isLoading.value = false
})

const isLogin = computed<boolean>(() => {
  return !!useCatProxy.value?.isLogin
})

const logout: () => Promise<void> = async () => {
  await useCatProxy.value?.panCore().logout()
}

const login: () => Promise<void> = async () => {
  useCatProxy.value?.panTools().openOauthLogin()
}
</script>

<style lang="scss" scoped></style>
