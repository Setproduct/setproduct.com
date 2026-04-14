(() => {
  const PAGE_SIZE = 9;

  function initFreebiesLoadMore() {
    const list = document.querySelector(".freebies_cl.w-dyn-items");
    if (!list) return;

    const items = Array.from(list.querySelectorAll(":scope > .w-dyn-item"));
    if (items.length <= PAGE_SIZE) return;

    let visibleCount = PAGE_SIZE;

    const wrap = document.createElement("div");
    wrap.style.display = "flex";
    wrap.style.justifyContent = "center";
    wrap.style.marginTop = "32px";

    const button = document.createElement("a");
    button.href = "#";
    button.className = "button-x-small w-inline-block";
    button.innerHTML = '<div class="text-size-regular text-weight-bold">Load More</div>';
    wrap.appendChild(button);

    const listRoot = list.closest(".w-dyn-list") || list.parentElement;
    listRoot?.insertAdjacentElement("afterend", wrap);

    function render() {
      items.forEach((item, index) => {
        item.style.display = index < visibleCount ? "" : "none";
      });

      if (visibleCount >= items.length) {
        button.style.display = "none";
      } else {
        button.style.display = "";
      }
    }

    button.addEventListener("click", (event) => {
      event.preventDefault();
      visibleCount = Math.min(visibleCount + PAGE_SIZE, items.length);
      render();
    });

    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFreebiesLoadMore, { once: true });
  } else {
    initFreebiesLoadMore();
  }
})();
(() => {
  const PAGE_SIZE = 8;

  function initFreebiesLoadMore() {
    const tabsRoot = document.querySelector(".templates_list-section .w-tabs");
    if (!tabsRoot) return;

    const panes = Array.from(tabsRoot.querySelectorAll(".w-tab-pane"));
    if (!panes.length) return;

    function normalizePaneLayout(pane) {
      const slider = pane.querySelector(".splide");
      const track = pane.querySelector(".splide__track");
      const list = pane.querySelector(".w-dyn-list > .w-dyn-items");
      if (!list) return null;

      if (slider) slider.classList.remove("splide", "slider1");
      if (track) {
        track.classList.remove("splide__track");
        track.removeAttribute("style");
      }

      list.classList.remove("splide__list");
      list.removeAttribute("style");
      list.style.display = "grid";
      list.style.gridTemplateColumns = "repeat(3, minmax(0, 1fr))";
      list.style.gap = "24px";

      pane.querySelector(".splide__pagination")?.remove();

      return list;
    }

    function getPaneItems(pane) {
      const list = normalizePaneLayout(pane);
      if (!list) return [];
      return Array.from(list.querySelectorAll(":scope > .w-dyn-item"))
        .filter((item) => !item.classList.contains("splide__slide--clone"))
        .map((item) => {
          item.classList.remove("splide__slide");
          item.removeAttribute("style");
          return item;
        });
    }

    const state = new Map();
    panes.forEach((pane) => {
      const items = getPaneItems(pane);
      state.set(pane, { items, visible: PAGE_SIZE });
    });

    const existingPagination = tabsRoot.querySelector(".w-pagination-wrapper");
    if (existingPagination) existingPagination.remove();

    const controlsWrap = document.createElement("div");
    controlsWrap.style.display = "flex";
    controlsWrap.style.justifyContent = "center";
    controlsWrap.style.marginTop = "32px";

    const button = document.createElement("a");
    button.href = "#";
    button.className = "button-x-small w-inline-block";
    button.innerHTML = '<div class="text-size-regular text-weight-bold">Load More</div>';
    controlsWrap.appendChild(button);

    const tabsContent = tabsRoot.querySelector(".w-tab-content");
    if (!tabsContent) return;
    tabsContent.insertAdjacentElement("afterend", controlsWrap);

    function getActivePane() {
      return tabsRoot.querySelector(".w-tab-pane.w--tab-active") || panes[0];
    }

    function renderPane(pane) {
      const paneState = state.get(pane);
      if (!paneState) return;

      const { items, visible } = paneState;
      items.forEach((item, index) => {
        item.style.display = index < visible ? "" : "none";
      });

      if (items.length <= PAGE_SIZE || visible >= items.length) {
        button.style.display = "none";
      } else {
        button.style.display = "";
        const label = button.querySelector("div, span");
        if (label) label.textContent = "Load More";
      }
    }

    function renderActivePane() {
      const activePane = getActivePane();
      renderPane(activePane);
    }

    button.addEventListener("click", (event) => {
      event.preventDefault();
      const activePane = getActivePane();
      const paneState = state.get(activePane);
      if (!paneState) return;
      paneState.visible = Math.min(paneState.visible + PAGE_SIZE, paneState.items.length);
      renderPane(activePane);
    });

    tabsRoot.querySelectorAll(".w-tab-link").forEach((link) => {
      link.addEventListener("click", () => {
        window.setTimeout(renderActivePane, 30);
      });
    });

    renderActivePane();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFreebiesLoadMore, { once: true });
  } else {
    initFreebiesLoadMore();
  }
})();
