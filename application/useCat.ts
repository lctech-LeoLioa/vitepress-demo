import '@lctech-tw/f2e-doooooooog'

import { PanCat, type RunMode } from '@lctech-tw/f2e-cat'
import { computed, readonly, ref } from 'vue'
import type { UseCatRes } from './port'

console.log(process.env.VITE_APP_CAT_URL);

const accessToken = ref('')
const runMode = ref<RunMode>('alpha')

const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

/** 初始化 PanCat */
let panCat: PanCat
const initCat = () => {
  return new PanCat({
    runMode: runMode.value,
    appId: 'jkforum',
    cookieDomain: 'localhost',
    cookieAppot: 'ap-pot',
    btnActiveColor: '#AA0D31',
    privacyPolicyUrl:
      runMode.value === 'production' ? 'https://account.jkforum.net/service' : 'https://account.jkf.io/service',
    serviceTermsUrl:
      runMode.value === 'production'
        ? 'https://account.jkforum.net/service?tab=terms_and_conditions'
        : 'https://account.jkf.io/service?tab=terms_and_conditions',
    stickyPointSelectors: {
      avatarCard: '#avatar-card-here',
      productCard: '#product-card-here',
    },
    emailOTCUrl: location.origin,
    resetPasswordEmailLink: runMode.value === 'production' ? 'https://account.jkforum.net' : 'https://account.jkf.io',
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

        await delay(1000)
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
  await panCat.loaded()
}

loadCat()

export const useCat = (): UseCatRes => {
  return {
    runMode: readonly(runMode),
    accessToken: readonly(accessToken),
    isLogin: computed(() => {
      return !!accessToken.value
    }),

    /** point 的方法們 */
    point: () => panCat.point(),
    /** jktalk 3.0 的方法們 */
    jktalk: () => panCat.jktalk(),
    /** pay 的方法們 */
    pay: () => panCat.pay(),
    /** pan core 的方法們 */
    panCore: () => panCat.panCore(),
    /** pan tools 的方法們 */
    panTools: () => panCat.panTools(),
    /** pan cpmi 的方法們 */
    panCpmi: () => panCat.panCpmi(),
    /** apeaTools 的方法們 */
    apeaTools: () => panCat.apeaTools(),
  }
}
