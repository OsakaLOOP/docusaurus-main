import { useEffect } from 'react';

export default function useScrollSync() {
  useEffect(() => {
    // 缓存 DOM 查询，避免在循环中重复查询
    const bgElement = document.querySelector('.full-frame-bg');
    if (!bgElement) return;

    let ticking = false; // rAF 节流锁

    // 核心更新逻辑：读取滚动 -> 计算 -> 写入 CSS 变量
    const updatePosition = () => {
      // 1. 获取现代浏览器的标准滚动值
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // 2. 动态获取当前页面总可滚动高度 (兼容动态加载的内容)
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      // 3. 避免除以 0 的错误
      if (scrollHeight <= 0) {
        bgElement.style.setProperty('--scroll-percentage', '0%');
        ticking = false;
        return;
      }

      // 4. 计算百分比 (保留 4 位小数优化精度)
      const scrollPercent = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
      const bgPositionValue = (scrollPercent * 100).toFixed(4);

      // 5. 写入 CSS 变量，而不是直接操作 background-position 字符串
      // 这样做性能更好，且允许我们在 CSS 中控制平滑度
      bgElement.style.setProperty('--scroll-percentage', `${bgPositionValue}%`);

      ticking = false;
    };

    // 事件处理器：请求动画帧
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updatePosition);
        ticking = true;
      }
    };

    // 监听器 1: 滚动事件
    window.addEventListener('scroll', onScroll, { passive: true });

    // 监听器 2: 页面尺寸变化 (解决"刚加载时不能对齐"及"图片加载后错位"的问题)
    // Docusaurus 页面高度经常会变，ResizeObserver 是现代的最佳实践
    const resizeObserver = new ResizeObserver(() => {
      onScroll();
    });
    resizeObserver.observe(document.documentElement);

    // 初始化运行一次
    updatePosition();

    // 清理函数
    return () => {
      window.removeEventListener('scroll', onScroll);
      resizeObserver.disconnect();
    };
  }, []);
}
