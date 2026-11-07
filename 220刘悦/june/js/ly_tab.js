/**
 * Tab 选项卡可复用组件
 * 实现：点击 tab 按钮切换对应内容区，先清除所有选中状态再设置当前选中状态
 * 作者：王垚  建立时间：2026-11-04  模型：GLM-5.3-FlashX
 */

/**
 * 初始化一个 Tab 选项卡组，绑定点击事件并设置默认选中项
 * @param {string} ly_tabContainerId - 选项卡容器元素的 id（按钮和内容区共同的父容器）
 * @param {string} ly_defaultTarget - 默认激活的内容区 target（即按钮 data-target 的值）
 */
function ly_initTabs(ly_tabContainerId, ly_defaultTarget) {
  const ly_container = document.getElementById(ly_tabContainerId);
  if (!ly_container) {
    console.error('Tab 容器不存在：' + ly_tabContainerId);
    return;
  }

  // 获取容器内所有 tab 按钮
  const ly_buttons = ly_container.querySelectorAll('.ly-tab-btn');
  // 获取容器内所有 tab 内容区
  const ly_panels = ly_container.querySelectorAll('.ly-tab-panel');

  /**
   * 清除所有 tab 按钮的选中状态
   */
  function ly_clearAllActive() {
    ly_buttons.forEach(function (btn) {
      btn.classList.remove('ly-active');
    });
    ly_panels.forEach(function (panel) {
      panel.classList.remove('ly-active');
    });
  }

  /**
   * 设置指定 target 的按钮和内容区为选中状态
   * @param {string} ly_target - 目标选项卡标识
   */
  function ly_setActive(ly_target) {
    // 给对应按钮加选中类
    ly_buttons.forEach(function (btn) {
      if (btn.getAttribute('data-target') === ly_target) {
        btn.classList.add('ly-active');
      }
    });
    // 给对应内容区加选中类
    ly_panels.forEach(function (panel) {
      if (panel.getAttribute('data-tab') === ly_target) {
        panel.classList.add('ly-active');
      }
    });
  }

  /**
   * tab 按钮点击事件处理函数
   * 先清除所有选中状态，再设置当前元素的选中状态
   */
  function ly_handleTabClick(ly_event) {
    const ly_clickedBtn = ly_event.currentTarget;
    const ly_target = ly_clickedBtn.getAttribute('data-target');
    ly_clearAllActive();
    ly_setActive(ly_target);
  }

  // 为每个 tab 按钮绑定点击监听事件
  ly_buttons.forEach(function (btn) {
    btn.addEventListener('click', ly_handleTabClick);
  });

  // 页面加载时：先清空，再设置默认选中项
  ly_clearAllActive();
  ly_setActive(ly_defaultTarget);
}
