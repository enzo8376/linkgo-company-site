# 馬上到 LINKGO｜配送夥伴招募網站

這是一套可直接部署到 GitHub Pages 的靜態單頁網站，不需要資料庫或建置工具。

## 目前網站內容

- 蝦皮智取店店到宅配送工作介紹
- 約 3 公里市區短程配送重點
- 工作流程、貨量現場、取件時段與報酬區間
- 加入條件與電動三輪車方案
- 正式報名流程、官方 LINE 與公司資訊
- 手機／平板／電腦響應式版面
- 圖片燈箱、導覽選單、滾動動畫
- 已將貨量照片中的面單與個人資訊做模糊處理

## 發布前先確認兩個連結

開啟：`assets/js/config.js`

```js
window.LINKGO_SITE_CONFIG = {
  formUrl: 'https://lihi.cc/pVGI4',
  lineUrl: 'https://lihi.cc/gBMqv',
  lineId: '@gofer',
  contactEmail: 'linkgo@iamgofer.com'
};
```

請確認 `formUrl` 與 `lineUrl` 是否仍為目前正式使用的連結。如需更換，只改這個檔案即可，不必修改 HTML。

## GitHub Pages 部署步驟

1. 登入 GitHub，建立新的 repository，例如：`linkgo-recruit`。
2. 將本資料夾內的所有檔案上傳到 repository 根目錄。注意是上傳資料夾「裡面的檔案」，不是再多包一層資料夾。
3. 進入 repository 的 `Settings`。
4. 左側選擇 `Pages`。
5. 在 `Build and deployment`：
   - Source：選擇 `Deploy from a branch`
   - Branch：選擇 `main`
   - Folder：選擇 `/ (root)`
6. 按下 `Save`，等待約 1～5 分鐘。
7. GitHub 會顯示公開網址，通常格式為：
   `https://你的帳號.github.io/linkgo-recruit/`

## 檔案結構

```text
linkgo-recruit-site/
├─ index.html
├─ 404.html
├─ README.md
├─ site.webmanifest
├─ .nojekyll
└─ assets/
   ├─ css/
   │  └─ style.css
   ├─ js/
   │  ├─ config.js
   │  └─ main.js
   └─ images/
      ├─ hero-driver.webp
      ├─ cargo-store.webp
      ├─ cargo-tricycle.webp
      ├─ fleet.webp
      ├─ vehicle-details.webp
      ├─ og-cover.jpg
      └─ favicon.svg
```

## 更新文字

網站主要文字全部位於 `index.html`。用搜尋功能找到標題或句子後即可修改。

## 更新圖片

將新圖片放進 `assets/images/`，再於 `index.html` 修改對應的 `src` 路徑。建議使用 WebP，單張控制在 500KB 以內。

## 注意事項

- 貨量、報酬與車輛方案均保留變動說明，避免形成固定保證。
- 上傳新的貨量照片前，必須遮蔽姓名、電話、地址、面單條碼與 QR Code。
- 本網站為盛形通運有限公司招募頁面，不應設計成蝦皮官方網站。
