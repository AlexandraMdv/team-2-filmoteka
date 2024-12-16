export function onPaginationBtnClick(e, callback) {
  if (!e?.dataset?.page) return;
  window.scrollTo({
    top: 0,
    left: 0,
  });
  callback(Number(e.dataset.page));
}