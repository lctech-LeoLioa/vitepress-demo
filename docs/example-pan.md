---
outline: deep
---

# 範例 - Pan

本頁面主要提供 `Pan` 相關 API 的使用方式及注意事項。

請先依照 [範例 - Cat](./example-cat.md) 的方式實作 `useCat()` 後使用。


```md
<script setup>
import { useCat } from '@/composable/useCat'

const { panCore, panTools, panCpmi } = useCat()
</script>
```

## PanCore

```md
<script setup>
import { useCat } from '@/composable/useCat'

const { panCore } = useCat()

const logout = () => {
  panCore().logout()
}
</script>
```

<script setup>
import ExamplePanLogout from './.vitepress/theme/components/example/pan/Logout.vue'
</script>

<ExamplePanLogout />