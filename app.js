const viewButtons = document.querySelectorAll("[data-view]");
const contentViews = document.querySelectorAll(".content-view");
const navParents = document.querySelectorAll(".nav-parent");

function setActiveView(viewId) {
  contentViews.forEach((view) => {
    view.classList.toggle("active", view.id === `view-${viewId}`);
  });

  viewButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewId);
  });
}

function openSubnav(parentKey) {
  const targetSubnav = document.querySelector(`[data-subnav="${parentKey}"]`);
  if (!targetSubnav) return;

  document.querySelectorAll(".subnav").forEach((subnav) => {
    subnav.classList.remove("open");
  });

  targetSubnav.classList.add("open");

  navParents.forEach((parent) => {
    parent.classList.toggle("active", parent.dataset.parent === parentKey);
  });
}

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const viewId = button.dataset.view;
    setActiveView(viewId);

    const activeSubnav = button.closest(".subnav");
    if (activeSubnav?.dataset.subnav) {
      openSubnav(activeSubnav.dataset.subnav);
    } else {
      navParents.forEach((parent) => {
        if (parent.dataset.parent === "what-is") {
          parent.classList.add("active");
        } else {
          parent.classList.remove("active");
        }
      });
    }
  });
});

navParents.forEach((parent) => {
  parent.addEventListener("click", () => {
    if (parent.dataset.locked === "true") return;

    const parentKey = parent.dataset.parent;
    if (!parentKey) return;

    openSubnav(parentKey);

    if (parentKey === "what-is") {
      setActiveView("what-is");
    }
  });
});

openSubnav("what-is");
setActiveView("what-is");

