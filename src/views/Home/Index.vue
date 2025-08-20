<template>
  <div> {{ t('workplace.welcome') }}{{ appStore.title }} </div>
</template>
<script lang="ts" setup>
import { useAppStore } from '@/store/modules/app'

defineOptions({ name: 'Index' })

const { t } = useI18n()
const appStore = useAppStore()
</script>
