const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),o=document.querySelector("body"),n=setInterval(r,1e3);function r(){const t=`#${Math.floor(16777215*Math.random()).toString(16)}`;o.style.backgroundColor=t}t.addEventListener("click",r),e.addEventListener("click",(function(){clearInterval(n)}));
//# sourceMappingURL=01-color-switcher.dbbfb148.js.map
