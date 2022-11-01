# Exit Intent Pop-up for VUE 3
Vue 3 pop-up that shows up when a user is leaving, or another threshold reached.
## A flexible Pop-up not only for marketing purposes.

# Usage
You can use this package as a **global component**.
### Add the package
```
npm i vue-exit-intent
```
### Your main.js should iclude:
```
import vueExitIntent from "vue-exit-intent";
import 'vue-exit-intent/dist/style.css';


const app = createApp(App);

app.use(vueExitIntent);
```
> See example main.js below:
```
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";


import vueExitIntent from "vue-exit-intent";
import 'vue-exit-intent/dist/style.css';


const app = createApp(App);

app.use(vueExitIntent);

app.mount("#app");
```

### Finally use the component like this
```
<vue-exit-intent>Your Content Here</vue-exit-intent>
```  
Your content will get displayed via [Slots](https://vuejs.org/guide/components/slots.html).
### Pass available props like this
```
<vue-exit-intent
    :repeatAfterHours="360"
    :navigateBeforeShowSeconds="0"
    :color="'#555'"
    :bdropColor="'rgba(0, 0, 0, 0.7)'"
>
</vue-exit-intent>
```
### Available props
| Prop | Default Value | Type | Required |
| --- | --- | --- | --- |
| **repeatAfterHours** | 24*7 *(7 days)* | Number | false |
| **scrollPercentage** | 0 | Number | false |
| **navigateBeforeShowSeconds** | 0 | Number | false |
| **mouseOutEnabled** | true | Boolean | false |
| **showByDefault** | false | Boolean | false |
| **showCloseBtn** | true | Boolean | false |
| **color** | '#555' | String  | false |
| **bgroundColor** | '#fefefe' | String  | false |
| **bdropColor** | 'rgba(0, 0, 0, 0.7)' | String  | false |
| **LSItemKey** | 'vue-exit-intent' | String  | false |

### Props Description
- **repeatAfterHours**  
After how many hours you want the popup to get triggered again.
"0" to disable. Giving a "0", the popup will be shown only once! Until the localstrage of the user gets cleared.
When a user gets the popup that exact timestamp is stored in localstorage and its taken into account next time the user will visit your page.  
This one runs a CHECK before show.

- **scrollPercentage**  
"0" to disable.
The percentage that the user has to scroll before the pop-up gets triggered.  
This one TRIGGERS the popup.

- **navigateBeforeShowSeconds**  
"0" to disable. How many seconds the user has to navigate before the pop-up gets triggered.  
This one TRIGGERS the popup.

- **mouseOutEnabled**  
If false. Mouse out event will not trigger the pop-up. The user would have to reach navigateBeforeShowSeconds or scrollPercentage to get the popup.
Ir true, well.. you know.  
This one TRIGGERS the popup.

- **showByDefault**  
Show On Mount. When a user visit your page.

- **showCloseBtn**  
Show a closing button "X" (top-right).
*You might want to be a lil bit more aggresive begging for attention.*

- **color**  
"X" Button color.

- **bgroundColor**  
Background Color.

- **bdropColor**  
BackDrop Color.

- **LSItemKey**  
Key of Local Storage item.
You can use a different key to show multiple pop-ups with different behaviour/content.

### Use it with defaults
Please add your content in between the opening and closing tag.
If you don't add your pop-up content, a fallback content will be shown.
```
<vue-exit-intent></vue-exit-intent>
```

# Contribute
Attach event listeners only if we are sure will show the popup (check localstorage on mount)?  
Maybe typescript?  
tests?

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).
## License
```
The MIT License (MIT)

Copyright © 2022 nickap

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```