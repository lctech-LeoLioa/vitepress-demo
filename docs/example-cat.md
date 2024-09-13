---
outline: deep
---

# 範例 - Cat

本頁面主要提供 `PanCat` 相關 API 的使用方式及注意事項。
請先依照

## 設定

```ts
new PanCat({
  ...options
})

```

## 範例

```ts
import { PanCat, type RunMode } from '@lctech-tw/f2e-cat'

const accessToken = ref('')
const runMode = ref<RunMode>('beta') // "alpha" | "beta" | "production"

/** PanCat 實體 */
let panCat: PanCat

/** 初始化 PanCat */
const initCat = () => {
  return new PanCat({
    runMode: runMode.value,
    appId: 'jkforum',
    cookieDomain: 'localhost',
    cookieAppot: 'ap-pot',
    btnActiveColor: '#AA0D31',
    privacyPolicyUrl: 'https://account.jkforum.net/service',
    serviceTermsUrl: 'https://account.jkforum.net/service?tab=terms_and_conditions',
    stickyPointSelectors: {
      avatarCard: '#avatar-card-here',
      productCard: '#product-card-here',
    },
    emailOTCUrl: location.origin,
    resetPasswordEmailLink: 'https://account.jkforum.net',
    resetPasswordSuccessLink: location.origin,
    emailVerificationUrl: location.origin,
    enabledJKTalk: true,
    enabledJPay: true,
    enabledJPoints: true,
    listener: {
      onNoUserLogin() {
        console.log('onNoUserLogin - not logged in yet')
      },
      async onTokenUpdated(token: { auth: string; access: string; tokenFrom: string }) {
        console.groupCollapsed('onTokenUpdate')
        console.table(token)
        console.groupEnd()

        // 由產品端 處理 登入後的 logic，像是 更新產品端 PAT
        accessToken.value = token.access
      },
      onMemberSwitch(authToken: string) {
        // 由產品端 處理 切換子帳號後的 logic，像是 更新 PAUT 到產品端
        console.groupCollapsed('onMemberSwitch')
        console.log('PAUT 已更新')
        console.table({ authToken })
        console.groupEnd()
      },
      onAccessTokenFailed(e: unknown): void {
        console.log('PAT 獲取失敗', e)
        // 由產品端 logic 處理 登出後的判斷，像是 更新 PAT
        accessToken.value = ''
      },
      onOpenQRCode(platformInfo: HTMLElement): void {
        console.log('QRcode 開啟')
        platformInfo.innerText = 'UID 1234567'
      },
      onProductLoggedOut() {
        console.log('用戶已登出')
        // 由產品端 處理 登出後的 logic，像是 清空產品端 PAT 或是 reload
        accessToken.value = ''
      },
      onOauthLoggedOut() {
        console.log('用戶已登出')
        // 由產品端 處理 登出後的 logic，像是 清空產品端 PAT 或是 reload
        accessToken.value = ''
      },
      onLoginClose() {
        console.log('pan 登入器已關閉')
      },
      onUsePointImmediately() {
        console.log('point 觸發立即儲值')
      },
      onContactUs() {
        if (accessToken.value) {
          panCat.jktalk().goToSpecificPage({
            specificPage: 'talkRoom',
            talkRoomUserHashUid: 'MRZN19KQ',
          })
        } else {
          window.open('https://line.me/R/ti/p/%40xtf9038y', '_blank')
        }
      },
    },
  })
}

const loadCat = async () => {
  panCat = initCat()
  /** 完成初始化載入後 resolve */
  await panCat.loaded()
}

loadCat()
```
