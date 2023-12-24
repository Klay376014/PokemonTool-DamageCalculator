# Pokemon Damage Cauculator 2024 ver.

寶可夢傷害計算機 2024版
預計支援中、英（日）文

---

## 開始開發

```
npm install // 首次clone專案、新套件時使用
npm run dev
```

## 提交變更後佈署內容至gh-pages分支

```
npm run generate
npm run deploy
```

---

## 資料夾結構

### assets
用來存放像是 CSS、Sass、字體、圖片等需要被 webpack 或是 Vite 編譯的靜態資源（壓縮、最佳化），如不需經過編譯，則存放於 public/

### components
用來定義 Vue 共用元件，Nuxt 會自動引入，名稱規則為：路徑前綴 + 元件名稱，例如巢狀目錄結構如下

### composables
組合式函式，利用 Composition API 來封裝和複用有狀態邏輯（Stateful Logic）的函式。定義在 composables/ 內的檔案 Nuxt 會自動引入

### content
讀取 content/ 目錄，並解析存放於此資料夾內的 .md、.yml、.csv 以及 .json 檔案，建立一套內容管理系統（CMS）

### pages
用來配置主要頁面的資料夾，定義後 Nuxt 會自動整合 Vue Router，依照資料夾以及檔案結構配置路由，例如：pages/work.vue 會被映射到 /work

### plugins
用來定義插件，plugins/ 內的檔案 Nuxt 會自動引入，如果要限制在 server 或是 client 端使用，檔名需加上 .server 或 .client 後綴

### public
靜態資源資料夾，用來存放不需要被編譯的檔案，像 CSS、 文字或圖片，透過根目錄 / 即可使用 public/ 檔案，檔案如需被編譯，則存放於 assets/

### locales
放置多語系的資料夾，記得更新內容時需將所有語言一併更新上去，目前預計支援中、英、日文
