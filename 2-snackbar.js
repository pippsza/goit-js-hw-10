import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{i as o}from"./assets/vendor-BbbuE1sJ.js";const r=document.getElementsByName("delay"),n=document.getElementsByName("state");window.addEventListener("submit",s=>{s.preventDefault();const t=parseInt(r[0].value.trim(),10);if(!t){o.show({color:"#FF0000",titleColor:"white",title:" &#9319 Please enter a valid delay",position:"topRight"});return}const i=Array.from(n).find(e=>e.checked).value;new Promise((e,l)=>{setTimeout(()=>{i==="fulfilled"?e("Done!"):i==="rejected"&&l("Error!")},t)}).then(e=>{o.show({color:"green",titleColor:"white",title:` ✅ Fulfilled promise in ${t}ms`,position:"topRight"})}).catch(e=>{o.show({color:"#FF0000",titleColor:"white",title:`❌ Rejected promise in ${t}ms`,position:"topRight"})})});
//# sourceMappingURL=2-snackbar.js.map