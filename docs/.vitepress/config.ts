import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'PanCat - Data Team F2E',
  description: '整合封裝 Data Team F2E 的串接流程',
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'preconnect', href: 'https://public.hare200.com' }],
    ['link', { rel: 'preconnect', href: 'https://dev.public.hare200.com' }],
    [
      'link',
      {
        src: 'https://public.hare200.com/theme/jkf/jtheme.css',
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首頁', link: '/' },
      { text: '範例', link: '/example-cat' },
    ],

    sidebar: [
      {
        text: '起手式',
        items: [{ text: '快速開始', link: '/quick-start' }],
      },
      {
        text: '範例',
        items: [
          { text: 'Cat', link: '/example-cat' },
          { text: 'Pan', link: '/example-pan' },
          { text: 'JKTalk', link: '/example-jktalk' },
          { text: 'JPay', link: '/example-jpay' },
          { text: 'JPoints', link: '/example-jpoints' },
          { text: 'ApeaTools', link: '/example-apea-tools' },
        ],
      },
      {
        text: '工具',
        items: [
          { text: '帳號查詢', link: '/tools-account' },
          { text: '發送訊息', link: '/tools-message' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/lctech-tw/f2e-cat' }],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜尋',
            buttonAriaLabel: '搜尋',
          },
          modal: {
            displayDetails: '顯示詳細列表',
            resetButtonTitle: '清除搜尋',
            backButtonTitle: '關閉搜尋',
            noResultsText: '沒有結果',
            footer: {
              selectText: '選擇',
              selectKeyAriaLabel: '輸入',
              navigateText: '導航',
              navigateUpKeyAriaLabel: '上箭頭',
              navigateDownKeyAriaLabel: '下箭頭',
              closeText: '關閉',
              closeKeyAriaLabel: 'esc',
            },
          },
        },
      },
    },
  },
  vite: {
    configFile: './vite.config.ts'
  }
})
