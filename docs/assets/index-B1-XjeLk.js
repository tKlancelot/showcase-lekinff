(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();const j="modulepreload",q=function(n){return"/showcase-lekinff/"+n},I={},U=function(e,t,a){let s=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),c=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));s=Promise.allSettled(t.map(m=>{if(m=q(m),m in I)return;I[m]=!0;const p=m.endsWith(".css"),i=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${m}"]${i}`))return;const l=document.createElement("link");if(l.rel=p?"stylesheet":j,p||(l.as="script"),l.crossOrigin="",l.href=m,c&&l.setAttribute("nonce",c),document.head.appendChild(l),p)return new Promise((d,u)=>{l.addEventListener("load",d),l.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${m}`)))})}))}function o(r){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=r,window.dispatchEvent(c),!c.defaultPrevented)throw r}return s.then(r=>{for(const c of r||[])c.status==="rejected"&&o(c.reason);return e().catch(o)})};/*! Path-to-RegExp | MIT License | https://github.com/pillarjs/path-to-regexp */const T="/",P=n=>n,M=/^[$_\p{ID_Start}]$/u,H=/^[$\u200c\u200d\p{ID_Continue}]$/u,$="https://git.new/pathToRegexpError",O={"{":"{","}":"}","(":"(",")":")","[":"[","]":"]","+":"+","?":"?","!":"!"};function y(n){return n.replace(/[.+*?^${}()[\]|/\\]/g,"\\$&")}function*N(n){const e=[...n];let t=0;function a(){let s="";if(M.test(e[++t]))for(s+=e[t];H.test(e[++t]);)s+=e[t];else if(e[t]==='"'){let o=t;for(;t<e.length;){if(e[++t]==='"'){t++,o=0;break}e[t]==="\\"?s+=e[++t]:s+=e[t]}if(o)throw new TypeError(`Unterminated quote at ${o}: ${$}`)}if(!s)throw new TypeError(`Missing parameter name at ${t}: ${$}`);return s}for(;t<e.length;){const s=e[t],o=O[s];if(o)yield{type:o,index:t++,value:s};else if(s==="\\")yield{type:"ESCAPED",index:t++,value:e[t++]};else if(s===":"){const r=a();yield{type:"PARAM",index:t,value:r}}else if(s==="*"){const r=a();yield{type:"WILDCARD",index:t,value:r}}else yield{type:"CHAR",index:t,value:e[t++]}}return{type:"END",index:t,value:""}}class z{constructor(e){this.tokens=e}peek(){if(!this._peek){const e=this.tokens.next();this._peek=e.value}return this._peek}tryConsume(e){const t=this.peek();if(t.type===e)return this._peek=void 0,t.value}consume(e){const t=this.tryConsume(e);if(t!==void 0)return t;const{type:a,index:s}=this.peek();throw new TypeError(`Unexpected ${a} at ${s}, expected ${e}: ${$}`)}text(){let e="",t;for(;t=this.tryConsume("CHAR")||this.tryConsume("ESCAPED");)e+=t;return e}}class D{constructor(e){this.tokens=e}}function F(n,e={}){const{encodePath:t=P}=e,a=new z(N(n));function s(r){const c=[];for(;;){const m=a.text();m&&c.push({type:"text",value:t(m)});const p=a.tryConsume("PARAM");if(p){c.push({type:"param",name:p});continue}const i=a.tryConsume("WILDCARD");if(i){c.push({type:"wildcard",name:i});continue}if(a.tryConsume("{")){c.push({type:"group",tokens:s("}")});continue}return a.consume(r),c}}const o=s("END");return new D(o)}function K(n,e={}){const{decode:t=decodeURIComponent,delimiter:a=T}=e,{regexp:s,keys:o}=W(n,e),r=o.map(c=>t===!1?P:c.type==="param"?t:m=>m.split(a).map(t));return function(m){const p=s.exec(m);if(!p)return!1;const i=p[0],l=Object.create(null);for(let d=1;d<p.length;d++){if(p[d]===void 0)continue;const u=o[d-1],h=r[d-1];l[u.name]=h(p[d])}return{path:i,params:l}}}function W(n,e={}){const{delimiter:t=T,end:a=!0,sensitive:s=!1,trailing:o=!0}=e,r=[],c=[],m=s?"":"i",i=(Array.isArray(n)?n:[n]).map(u=>u instanceof D?u:F(u,e));for(const{tokens:u}of i)for(const h of E(u,0,[])){const f=J(h,t,r);c.push(f)}let l=`^(?:${c.join("|")})`;return o&&(l+=`(?:${y(t)}$)?`),l+=a?"$":`(?=${y(t)}|$)`,{regexp:new RegExp(l,m),keys:r}}function*E(n,e,t){if(e===n.length)return yield t;const a=n[e];if(a.type==="group"){const s=t.slice();for(const o of E(a.tokens,0,s))yield*E(n,e+1,o)}else t.push(a);yield*E(n,e+1,t)}function J(n,e,t){let a="",s="",o=!0;for(let r=0;r<n.length;r++){const c=n[r];if(c.type==="text"){a+=y(c.value),s+=c.value,o||(o=c.value.includes(e));continue}if(c.type==="param"||c.type==="wildcard"){if(!o&&!s)throw new TypeError(`Missing text after "${c.name}": ${$}`);c.type==="param"?a+=`(${V(e,o?"":s)}+)`:a+="([\\s\\S]+)",t.push(c),s="",o=!1;continue}}return a}function V(n,e){return e.length<2?n.length<2?`[^${y(n+e)}]`:`(?:(?!${y(n)})[^${y(e)}])`:n.length<2?`(?:(?!${y(e)})[^${y(n)}])`:`(?:(?!${y(e)}|${y(n)})[\\s\\S])`}function G(n){try{return decodeURIComponent(n)}catch{return n}}function R(n,e,t,a,s){let o,r,c=0;return{next(m){if(n===m)return{done:!0,value:!1};if(!o){const p=n,i=!p.children;if(p.match||(p.match=K(p.path||"",{end:i,...t})),o=p.match(a),o){const{path:l}=o;return o.path=!i&&l.charAt(l.length-1)==="/"?l.substr(1):l,o.params={...s,...o.params},{done:!1,value:{route:n,baseUrl:e,path:o.path,params:o.params}}}}if(o&&n.children)for(;c<n.children.length;){if(!r){const i=n.children[c];i.parent=n,r=R(i,e+o.path,t,a.substr(o.path.length),o.params)}const p=r.next(m);if(!p.done)return{done:!1,value:p.value};r=null,c++}return{done:!0,value:!1}}}}function Y(n,e){if(typeof n.route.action=="function")return n.route.action(n,e)}function Q(n,e){let t=e;for(;t;)if(t=t.parent,t===n)return!0;return!1}class X{constructor(e,t){if(!e||typeof e!="object")throw new TypeError("Invalid routes");this.options={decode:G,...t},this.baseUrl=this.options.baseUrl||"",this.root=Array.isArray(e)?{path:"",children:e,parent:null}:e,this.root.parent=null}resolve(e){const t={router:this,...this.options.context,...typeof e=="string"?{pathname:e}:e},a=R(this.root,this.baseUrl,this.options,t.pathname.substr(this.baseUrl.length)),s=this.options.resolveRoute||Y;let o,r,c=t;function m(p,i=!o.done&&o.value.route,l){const d=l===null&&!o.done&&o.value.route;if(o=r||a.next(d),r=null,!p&&(o.done||!Q(i,o.value.route)))return r=o,Promise.resolve(null);if(o.done){const u=new Error("Route not found");return u.status=404,Promise.reject(u)}return c={...t,...o.value},Promise.resolve(s(c,o.value.params)).then(u=>u??m(p,i,u))}return t.next=m,Promise.resolve().then(()=>m(!0,this.root)).catch(p=>{if(this.options.errorHandler)return this.options.errorHandler(p,c);throw p})}}function B(){return`
        <footer id="footer">
            <div id="footer-copyright">copyright</div>
        </footer>
    `}function Z(){const n="/showcase-lekinff/";return`
    <div class="section jumbo u-w-100 flaps">
       <div class="u-p-6 flap flap-40 u-a-j-center u-bg-gradient">
           <div class="lt-frame u-gap-8">
               <h1 id="page-title" class="lt-page-title">Maison LeKinff</h1>
               <h2>L’Adresse Créative à Privatiser, Paris 14ème</h2>
               <div class="lt-frame u-lh-2 u-max-w-480">
                  <p id="jumbo-caption"></p>
                  <p id="jumbo-description">about content</p>
                  <p id="jumbo-description-2">about content</p>
               </div>
               <div class="lt-stack u-gap-4">
                  <button class="btn btn-gradient btn-size-lg u-min-w-120">
                      <span>Réserver sur native Spaces</span>
                      <i class="icon lt-icon-send icon-size-lg"></i>
                  </button>
                  <button class="btn btn-size-lg btn-outline u-min-w-120" id="btn-textured" data-modal-ref="modal-test">
                      <span>En savoir plus</span>
                      <i class="icon lt-icon-organisms icon-size-lg"></i>
                  </button>
               </div>
          </div>
       </div>
      <div class="flap flap-60">
          <div class="splide u-w-100" aria-label="Splide Basic HTML Example">
              <div class="splide__track u-h-100">
                  <ul class="splide__list">
                      <li class="splide__slide">
                          <img width="100%" height="100%" src="${n}assets/pictures/lekinff-living.jpg" alt="">
                      </li>
                      <li class="splide__slide">
                          <img width="100%" height="100%" src="./assets/pictures/lekinff-stairs.jpg" alt="">
                      </li>
                      <li class="splide__slide">
                          <img width="100%" height="100%" src="${n}assets/pictures/lekinff-outside.jpg" alt="">
                      </li>
                  </ul>
              </div>
          </div>
      </div>
    </div>
  `}function ee(n){const e=n.split("/");return e[e.length-1].split(".")[0]}function v(){return localStorage.getItem("token")}function b(){return localStorage.getItem("role")}function te(){return localStorage.getItem("username")}function ne(){let n=document.getElementById("logout");n&&n.addEventListener("click",()=>{localStorage.removeItem("token"),localStorage.removeItem("role"),localStorage.removeItem("username"),localStorage.removeItem("userId"),window.location.href="/"})}function _(){let n=ee(window.location.href),e=b()==="admin",t=b()==="super_admin";return`
    <nav class="navbar">
      <a href="/" data-link class="u-display-flex">
          <img  class="u-object-fit-cover" style="filter:invert(1)" src="./assets/pictures/logo.png" alt="logo" width="80" height="40">
      </a>
      <ul class="lt-stack u-a-i-center">
        <a href="/" data-link>
          <li>Home</li>
        </a>
        &ensp;|&ensp; 
        <a href="/about" data-link>
          <li>About</li>
        </a>
        &ensp;|&ensp;
        ${v()?'<a href="/admin" data-link><li>Admin</li></a>':'<li class="u-cursor-pointer" data-modal-ref="modal-login">Login</li>'}
        ${v()?'&ensp;|&ensp;<li id="logout" class="u-cursor-pointer">Logout</li>':""}
      </ul> 
    </nav>
    ${(e||t)&&n==="admin"?`
      <nav class="navbar">
        <div>Welcome ${te()}</div>
        <div class="lt-stack">
          <button class="btn btn-outline btn-size-sm btn-color-scheme-primary" data-modal-ref="modal-add-setting">Add setting</button>
          ${t?'<button class="btn btn-outline btn-size-sm btn-color-scheme-primary" data-modal-ref="modal-add-user">Add user</button>':""}
        </div>
      </nav>
      `:""}
  `}const g="https://render-showcase-express.onrender.com";function S(){return`
    ${_()}
    <main class="u-w-100 u-overflow-y-auto lt-stack u-h-100">
      ${Z()}
    </main>
    ${B()}
  `}async function k(){console.log("HomeController: Page logic for Home");let n=document.querySelector(".splide");n&&(new window.Splide(".splide",{type:"fade",autoplay:!0,wheel:!0,speed:1500,arrows:!1,rewind:!0,interval:6e3,perPage:1,perMove:1,breakpoints:{1024:{perPage:1},640:{perPage:1}}}),n.mount());let e=document.getElementById("login-form");e.addEventListener("submit",async t=>{t.preventDefault();const a=new FormData(e),s=a.get("username"),o=a.get("password");a.append("username",s),a.append("password",o);const c=await(await fetch(`${g}/api/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(a))})).json();c.token&&(localStorage.setItem("token",c.token),localStorage.setItem("role",c.data.role),localStorage.setItem("username",c.data.username),localStorage.setItem("userId",c.data.id),window.location.href="/admin")})}const oe=Object.freeze(Object.defineProperty({__proto__:null,HomeController:k,default:S},Symbol.toStringTag,{value:"Module"}));function se(){return`
    ${_()}
    <main class="lt-page">
      <div class="lt-frame">
        <h1 class="lt-page-title">About</h1>
        <p id="key-test">This is the About page.</p>
      </div>
    </main>
  `}async function ae(){console.log("AboutController: Page logic for About")}function re(){return`
    ${_()}
    <main class="lt-page u-p-8 u-overflow-y-auto">
      <div class="lt-frame u-w-100">
        <h2 class="lt-page-title">Settings</h2>
        <div id="settings" class="lt-frame">
            <div class="settings-loading"><h2>Chargement des paramètres...</h2></div>
            <div class="settings-table">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Key</th>
                            <th style="width: 60%;">Value</th>
                            <th>Type</th>
                            <th class="u-text-a-center">Action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>   
        </div> 
        <h2 class="lt-page-title">Users</h2>
        <div id="users-admin" class="lt-frame u-w-100">
            <div id="users-admin-no-access">You don't have access to this content</div>
            <div id="users-admin-access" class="lt-frame" style="display: none;">
                <h2>Admin your users</h2>
                <table id="user-table" class="table">
                    <thead>
                        <tr>
                            <th class="u-text-a-center" style="min-width: 40px;">id</th>
                            <th style="min-width: 144px;">username</th>
                            <th>role</th>
                            <th>main picture</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
      </div>
    </main>
    ${B()}
  `}async function ie(){if(!v()){window.location.href="/";return}const n=document.querySelector(".settings-loading");try{const i=await fetch(`${g}/api/pagesettings`);if(i.ok){const l=await i.json();n.style.display="none";let d=document.querySelector(".settings-table tbody");l.forEach(u=>{let h=document.createElement("tr");h.setAttribute("data-id",u.id);let f;u.type==="text"&&(f=`<input type="text" value="${u.value}" class="setting-input input u-w-100" />`),u.image&&(f=`
                        <div class="lt-box form-row-upload form-row-upload-small">
                        <input type="file" class="image-input" data-id="${u.id}" />
                        <img class="u-object-fit-cover" src="${g}/uploads/${u.image}" width="100%" height="64" alt="Image de fond" />
                        </div>
                    `),h.innerHTML=`
                <td class="u-fw-bold">${u.id}</td>
                <td class="u-fw-bold">${u.key}</td>
                <td>${f}</td>
                <td>${u.type}</td>
                <td style="white-space: nowrap;width: 1px;">
                    <div class="lt-stack u-gap-2">
                        <button class="btn btn-variant-back-office save-btn" data-id="${u.id}">Save</button>
                        <button class="btn btn-variant-back-office delete-btn" data-id="${u.id}">Delete</button>
                    </div>
                </td>
                `,d.appendChild(h)})}else console.error("Error fetching settings:",i.statusText)}catch(i){console.error("Error fetching settings:",i)}document.addEventListener("change",i=>{if(i.target&&i.target.classList.contains("image-input")){const l=i.target.closest("tr").querySelector("img");console.log("inputElement:",l),l.src=URL.createObjectURL(i.target.files[0])}}),document.addEventListener("click",async i=>{if(i.target&&i.target.classList.contains("save-btn")){const l=i.target.closest("tr").getAttribute("data-id"),d=i.target.closest("tr").querySelector(".image-input"),u=i.target.closest("tr").querySelector(".setting-input");let h=new FormData;if(h.append("id",l),d&&d.files.length>0&&(h.append("image",d.files[0]),d.value=""),u){const f=u.value;h.append("value",f)}try{const f=await fetch(`${g}/api/pagesettings/${l}`,{method:"PUT",headers:{Authorization:`Bearer ${v()}`},body:h});f.ok?(console.log("Setting updated successfully"),alert("Paramètre mis à jour")):console.error("Error updating setting:",f.statusText)}catch(f){console.error("Error updating setting:",f)}}}),document.addEventListener("click",async i=>{if(i.target&&i.target.classList.contains("delete-btn")){const l=i.target.closest("tr").getAttribute("data-id");try{const d=await fetch(`${g}/api/pagesettings/${l}`,{method:"DELETE",headers:{Authorization:`Bearer ${v()}`}});d.ok?(console.log("Setting deleted successfully"),alert("Paramètre supprimé"),window.location.reload()):console.error("Error deleting setting:",d.statusText)}catch(d){console.error("Error deleting setting:",d)}}});const e=document.getElementById("setting-form"),t=document.getElementById("type"),a=document.getElementById("image-upload");t.addEventListener("change",function(i){let l=i.target.querySelector(".custom-select-trigger").dataset.value,d=document.getElementById("hiddenType").value;d=l,d==="image"?a.style.display="block":a.style.display="none"}),document.getElementById("image-settings").addEventListener("change",function(i){const l=i.target.files[0];if(l){const d=new FileReader;d.onload=function(u){const h=document.getElementById("preview-settings");h.src=u.target.result,h.style.display="block",h.alt=l.name,h.title=l.name},d.readAsDataURL(l)}}),e.addEventListener("submit",async function(i){i.preventDefault();const l=document.getElementById("key").value,d=document.getElementById("value").value,u=document.getElementById("hiddenType").value,h=document.getElementById("image-settings").files[0],f=new FormData;f.append("key",l),f.append("value",d),f.append("type",u),h&&f.append("image",h),console.log(f);try{const w=await fetch(`${g}/api/pagesettings`,{method:"POST",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},body:f});w.ok?(alert("Le paramètre a été ajouté avec succès."),e.reset(),a.style.display="none",window.location.reload()):console.error("Erreur lors de l'ajout du paramètre:",w.statusText)}catch(w){console.error("Erreur lors de la soumission du formulaire:",w)}});let s=document.getElementById("users-admin-no-access"),o=document.getElementById("users-admin-access");v()&&b()==="super_admin"&&(s.style.display="none",o.style.display="flex",fetch(`${g}/api/users`).then(i=>i.json()).then(i=>{const l=document.getElementById("user-table");i.forEach(d=>{if(d.role==="super_admin")return;const u=document.createElement("tr");u.innerHTML=`
                        <td class="u-text-a-center">${d.id}</td>
                        <td class="u-fw-bold">${d.username}</td>
                        <td>${d.role}</td>
                        <td><div class="lt-avatar"><img class="lt-avatar-img" src="${g}/uploads/${d.mainPicture}"/></div></td>
                        <td><button class="btn btn-variant-back-office" data-user-id="${d.id}" data-user-username="${d.username}">Delete</button></td>
                    `,l.querySelector("tbody").appendChild(u)})})),document.addEventListener("click",async i=>{if(i.target&&i.target.classList.contains("btn-variant-back-office")){const l=i.target.getAttribute("data-user-id"),d=i.target.getAttribute("data-user-username");if(!confirm(`Are you sure you want to delete user ${d}?`))return;try{const u=await fetch(`${g}/api/users/${l}`,{method:"DELETE",headers:{Authorization:`Bearer ${v()}`}});u.ok?(console.log(`User ${d} deleted successfully`),alert(`Utilisateur ${d} supprimé`),window.location.reload()):console.error(`Error deleting user ${d}:`,u.statusText)}catch(u){console.error(`Error deleting user ${d}:`,u)}}});let r=document.getElementById("add-user-form"),c=document.getElementById("user-password"),m=document.getElementById("user-confirm-password");document.getElementById("role").addEventListener("change",function(i){let l=i.target.querySelector(".custom-select-trigger").dataset.value;document.getElementById("hiddenRole").value=l}),r.addEventListener("submit",async i=>{if(i.preventDefault(),console.log("add user",i),console.log(c.value,m.value),c.value!==m.value){alert("Les mots de passe ne correspondent pas");return}const l=new FormData;l.append("username",document.getElementById("user-username").value),l.append("password",c.value),l.append("role",document.getElementById("hiddenRole").value);const d=document.getElementById("main-picture").files[0];d&&l.append("mainPicture",d);try{const u=await fetch(`${g}/api/users`,{method:"POST",headers:{Authorization:`Bearer ${v()}`},body:l}),h=await u.json();u.ok?(alert(`Utilisateur ${h.data.username} créé avec succès !`),window.location.href="/admin"):alert(h.message||"Erreur lors de la création de l’utilisateur")}catch(u){console.error("Erreur:",u),alert("Une erreur est survenue.")}}),document.getElementById("main-picture").addEventListener("change",function(i){const l=i.target.files[0];if(l){const d=new FileReader;d.onload=function(u){const h=document.getElementById("preview");h.src=u.target.result,h.style.display="block",h.alt=l.name,h.title=l.name},d.readAsDataURL(l)}})}const le=[{path:"/",action:async()=>({content:S(),controller:k})},{path:"/about",action:async()=>({content:se(),controller:ae})},{path:"/admin",action:async()=>({content:re(),controller:ie})},{path:"(.*)",action:async({pathname:n})=>(history.replaceState(null,"","/"),{content:S(),controller:k})}],ce=new X(le);class de{constructor(){}initModals(){const e=document.querySelectorAll("[data-modal-ref]");console.log(`[modalService] ${e.length} modal triggers found`),e.forEach(t=>{const a=t.getAttribute("data-modal-ref"),s=document.getElementById(a);if(!s){console.warn(`[modalService] No modal found with id "${a}"`);return}t.replaceWith(t.cloneNode(!0));const o=document.querySelector(`[data-modal-ref="${a}"]`);o.addEventListener("click",()=>{const r=s.getAttribute("container"),c=r?document.querySelector(r):null;c&&s.parentElement!==c&&c.appendChild(s),typeof s.open=="function"?(s.open(),o.setAttribute("aria-expanded","true"),console.log(`[modalService] Modal with id "${a}" opened`)):console.warn(`[modalService] Element with id "${a}" is not a modal-dialog component`)})})}}const ue=()=>{b()==="super_admin"&&(document.body.dataset.theme="super-admin"),b()==="admin"&&(document.body.dataset.theme="admin")},me=async()=>{const n=localStorage.getItem("pageSettings");n&&(A(JSON.parse(n)),console.log("✅ Settings chargés depuis le cache"));try{const e=await fetch(`${g}/api/pagesettings`);if(!e.ok)throw new Error("Failed to fetch");const t=await e.json();console.log(t),localStorage.setItem("pageSettings",JSON.stringify(t)),A(t),console.log("✅ Settings chargés et appliqués")}catch(e){console.error("❌ Erreur dans initPageSettings:",e)}};function A(n){const e={page_background:"jumbo-home",page_title:"page-title",page_subtitle:"page-subtitle",page_logotype:"page-logotype",jumbo_description:"jumbo-description",jumbo_description_2:"jumbo-description-2",jumbo_caption:"jumbo-caption",section_about_para:"section-about-para",section_about_picture:"section-about-picture",carousel_one:"carousel-one",carousel_two:"carousel-two",carousel_three:"carousel-three",key_test:"key-test",key_test_2:"key-test-2",footer_copyright:"footer-copyright"};n.forEach(t=>{const a=e[t.key];if(!a)return;const s=document.getElementById(a);s&&(t.image?s.tagName==="IMG"?(s.src=`${g}/uploads/${t.image}`,s.alt=t.key):s.style.backgroundImage=`url(${g}/uploads/${t.image})`:s.textContent=t.value)})}class pe extends HTMLElement{constructor(){super(),this._onKeyDown=this._onKeyDown.bind(this),this._onClickBackdrop=this._onClickBackdrop.bind(this),this._hasRendered=!1,this._containerElement=null}connectedCallback(){var t;this._hasRendered||this._render(),this.querySelectorAll("[data-modal-dismiss]").forEach(a=>{a.addEventListener("click",()=>this.close())}),(t=this.querySelector(".modal"))==null||t.addEventListener("click",this._onClickBackdrop);const e=this.getAttribute("container");if(e){const a=document.querySelector(e);a&&this.parentElement!==a?a.appendChild(this):a||console.warn(`[modal-dialog] Container "${e}" not found.`)}}open(){const e=this.querySelector(".modal__content");e&&(this.classList.add("is-open"),requestAnimationFrame(()=>{e.classList.add("animate-in")}),document.addEventListener("keydown",this._onKeyDown))}close(){const e=this.querySelector(".modal__content");if(!e)return;e.classList.remove("animate-in"),e.classList.add("animate-out");const t=()=>{e.removeEventListener("transitionend",t),this.classList.remove("is-open"),e.classList.remove("animate-out"),console.log("Animation ended")};e.addEventListener("transitionend",t),document.removeEventListener("keydown",this._onKeyDown)}_onKeyDown(e){e.key==="Escape"&&this.close()}_onClickBackdrop(e){e.target.classList.contains("modal")&&this.close()}_render(){if(this._hasRendered)return;this._hasRendered=!0;const e=this.getAttribute("max-width")||"400",t=this.getAttribute("extra-class")||"",a=this.getAttribute("modal-title")||"Titre de la modale",s=Array.from(this.childNodes).filter(m=>!(m.nodeType===3&&m.textContent.trim()===""));this.innerHTML="";const o=document.createElement("div");o.className="modal";const r=document.createElement("div");r.className=`modal__content ${t}`,r.style.maxWidth=`${e}px`,r.innerHTML=`
    <div class="modal__header">
      <h3 class="modal__title">${a}</h3>
      <button class="modal__close btn btn-ghost btn-shape-square btn-size-sm" aria-label="Fermer la modale" data-modal-dismiss>
        <i class="icon lt-icon-close icon-size-sm" data-lt-style="solid"></i>
      </button>
    </div>
    <div class="modal__slot"></div>
  `,o.appendChild(r),this.appendChild(o);const c=this.querySelector(".modal__slot");s.forEach(m=>c.appendChild(m))}destroy(){var e,t;document.removeEventListener("keydown",this._onKeyDown),(e=this.querySelector(".modal__close"))==null||e.removeEventListener("click",()=>this.close()),(t=this.querySelector(".modal"))==null||t.removeEventListener("click",this._onClickBackdrop),this.remove()}}customElements.define("modal-dialog",pe);class he extends HTMLElement{connectedCallback(){setTimeout(()=>{var o;const e=[...this.querySelectorAll("option")].map(r=>({value:r.value,text:r.textContent}));this.innerHTML=`
              <div class="custom-select">
                  <div class="custom-select-trigger">${((o=e[0])==null?void 0:o.text)||"Choisir"} <i class="icon lt-icon-caret-down icon-size-lg"></i></div>
                  <div class="custom-select-dropdown hidden">
                      ${e.map(r=>`<div class="custom-select-option" data-value="${r.value}">${r.text}</div>`).join("")}
                  </div>
              </div>
          `;const t=this.querySelector(".custom-select-trigger"),a=this.querySelector(".custom-select-dropdown"),s=()=>{a.classList.add("hidden")};t.addEventListener("click",r=>{const c=!a.classList.contains("hidden");document.querySelectorAll(".custom-select-dropdown").forEach(m=>{m!==a&&m.classList.add("hidden")}),c?s():a.classList.remove("hidden")}),this.querySelectorAll(".custom-select-option").forEach(r=>{r.addEventListener("click",()=>{t.innerHTML=`${r.textContent} <i class="icon lt-icon-caret-down icon-size-lg"></i>`,t.dataset.value=r.dataset.value,s(),this.dispatchEvent(new CustomEvent("change",{detail:{value:r.dataset.value}}))})}),document.addEventListener("click",r=>{this.contains(r.target)||s()})},0)}}customElements.get("custom-select")||customElements.define("custom-select",he);const x=document.getElementById("app");async function C(){new de().initModals(),ue(),ne(),me(),console.log("✅ GlobalController loaded")}async function L(){try{const{content:n,controller:e}=await ce.resolve({pathname:location.pathname});x.innerHTML=n,e&&await e(),await C()}catch{console.warn("Route non trouvée, fallback vers Home");const e=await U(()=>Promise.resolve().then(()=>oe),void 0);x.innerHTML=e.default(),e.HomeController&&await e.HomeController(),await C(),history.replaceState(null,"","/")}}window.addEventListener("popstate",L);document.addEventListener("click",n=>{n.target.matches("a[data-link]")&&(n.preventDefault(),history.pushState(null,"",n.target.href),L())});L();
