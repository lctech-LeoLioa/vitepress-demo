<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import LoginBtn from './components/LoginBtn.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #aside-outline-before>My custom sidebar top content</template>
    <template #nav-bar-content-after>
      <div class="text-[14px] md:ml-6">
        <LoginBtn />
      </div>
    </template>
  </Layout>
</template>
