export class CustomTabs extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const tabId = this.dataset.id || `lt-tabs-${Math.random().toString(36).substr(2, 9)}`;
    const tabItems = this.querySelectorAll('.lt-tab-item');
    const tabPanels = this.querySelectorAll('.lt-tab-panel');

    // console.log(tabItems);
    // console.log(tabPanels);

    // add unique ID to each tab and panel
    tabItems.forEach((item, index) => {
      item.dataset.index = index;
      item.dataset.group = tabId;
    });

    tabPanels.forEach((panel, index) => {
      panel.dataset.index = index;
      panel.dataset.group = tabId;
    });

    // activate the first tab by default 
    this.activateTab(tabId, 0);

    // Add click event listeners to each tab item
    tabItems.forEach(item => {
      item.addEventListener('click', () => {
        this.activateTab(tabId, parseInt(item.dataset.index));
      });
    });
  }

  activateTab(groupId, index) {
    const tabItems = this.querySelectorAll(`.lt-tab-item[data-group="${groupId}"]`);
    const tabPanels = this.querySelectorAll(`.lt-tab-panel[data-group="${groupId}"]`);

    tabItems.forEach(item => item.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));

    const activeItem = this.querySelector(`.lt-tab-item[data-group="${groupId}"][data-index="${index}"]`);
    const activePanel = this.querySelector(`.lt-tab-panel[data-group="${groupId}"][data-index="${index}"]`);

    if (activeItem) activeItem.classList.add('active');
    if (activePanel) activePanel.classList.add('active');

    this.dispatchEvent(new CustomEvent('tab-change', {
      detail: {
        groupId,
        index,
        tab: activeItem,
        panel: activePanel
      },
      bubbles: true
    }));
  }
}

if (!customElements.get('lt-tabs')) {
  customElements.define('lt-tabs', CustomTabs);
}