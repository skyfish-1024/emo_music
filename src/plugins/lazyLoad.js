import Vue from "vue";
// 定义懒加载图片自定义指令
Vue.directive("lazy", (el, binding) => {
  if (binding.value == "bg") {
    let oldBg = el.style.backgroundImage;
    el.style.backgroundImage = "";
    let observer = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        // 是否处于可视区域
        if (isIntersecting) {
          //可视区域true
          el.style.backgroundImage = oldBg; //可视，将最开始保存的真实路径赋予DOM元素渲染
          observer.unobserve(el); // 只需要监听一次即可，第二次滑动到可视区域时候不在监听
        }
      },
      { threshold: 0, root: document.querySelector("#main") }
    ); // 设置阈值
    observer.observe(el); // 调用方法
    return;
  }
  if (binding.value == "img") {
    let oldSrc = el.src;
    el.src = "";
    let observer = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          el.src = oldSrc;
          observer.unobserve(el);
        }
      },
      { threshold: 0, root: document.querySelector("#main") }
    ); // 设置阈值
    observer.observe(el);
    return;
  }
});
