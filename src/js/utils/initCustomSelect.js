// src/utils/initCustomSelect.js

export function initCustomSelect(selectElementId, hiddenInputId) {
  const selectEl = document.getElementById(selectElementId);
  const hiddenInput = document.getElementById(hiddenInputId);

  if (!selectEl || !hiddenInput) {
    console.warn(`[initCustomSelect] Element manquant : ${selectElementId} ou ${hiddenInputId}`);
    return;
  }

  selectEl.addEventListener('change', () => {
    const value = selectEl.querySelector('.custom-select-trigger')?.dataset.value;
    if (value) {
      hiddenInput.value = value;
      console.log(`[initCustomSelect] ${hiddenInputId} = ${value}`);
    }
  });
}
