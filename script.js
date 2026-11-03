"use strict";
const filterGroup = document.querySelector(".filters");
const cards = [...document.querySelectorAll(".project-card")];
const count = document.querySelector(".count");
if (filterGroup && count && cards.length) {
  filterGroup.hidden = false;
  filterGroup.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;
    const category = button.dataset.filter;
    filterGroup.querySelectorAll("button").forEach(item => item.setAttribute("aria-pressed", String(item === button)));
    let visible = 0;
    cards.forEach(card => {
      card.hidden = category !== "all" && card.dataset.category !== category;
      if (!card.hidden) visible++;
    });
    count.textContent = visible + (visible === 1 ? " project" : " projects");
  });
  const revealLinkedProject = () => {
    const id = location.hash.slice(1);
    const target = cards.find(card => card.id === id);
    if (target && target.hidden) filterGroup.querySelector('[data-filter="all"]').click();
  };
  addEventListener("hashchange", revealLinkedProject);
  revealLinkedProject();
}
