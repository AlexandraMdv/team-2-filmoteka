import { refs } from './refs';

export function createPagination(page = 1, totalPage = 1) {
  if (totalPage === 1) {
    refs.paginationBox.innerHTML = '';
    return;
  }
  let paginationMurkup = '';
  let pageWidth = document.documentElement.scrollWidth;
  let dataPage = '';
  let arrowBtnLeft =
    page != 1
      ? `<button type="button" class="pagination_button pagination_button-arrow_left" data-page="${
          page - 1
        }""></button>`
      : '';
  let arrowBtnRight =
    page != totalPage
      ? `<button type="button" class="pagination_button pagination_button-arrow_right" data-page="${
          page + 1
        }"></button>`
      : '';
  let firstBtn = `<button type="button" class="pagination_button" data-page="1">1</button>`;
  let lastBtn = `<button type="button" class="pagination_button" data-page="${totalPage}">${totalPage}</button>`;
  let dotsBtn = `<button type="button" class="pagination_button pagination_button-dots">...</button>`;

  if (pageWidth < 768) {
    paginationMurkup += arrowBtnLeft;

    for (let i = page - 2; i <= page + 2; i++) {
      dataPage = i;
      if (i == page) {
        paginationMurkup += `<button type="button" class="pagination_button pagination_button-active">${dataPage}</button>`;
        continue;
      }
      if (i <= totalPage && i > 0)
        paginationMurkup += `<button type="button" class="pagination_button" data-page="${dataPage}">${dataPage}</button>`;
    }
    paginationMurkup += arrowBtnRight;
  }

  if (pageWidth >= 768) {
    if (totalPage <= 9) {
      paginationMurkup += arrowBtnLeft;
      for (let i = 1; i <= totalPage; i++) {
        dataPage = i;
        if (i == page) {
          paginationMurkup += `<button type="button" class="pagination_button pagination_button-active">${dataPage}</button>`;
          continue;
        }
        paginationMurkup += `<button type="button" class="pagination_button" data-page="${dataPage}">${dataPage}</button>`;
      }
      paginationMurkup += arrowBtnRight;
    }

    if (totalPage >= 10) {
      if (page <= 5) {
        paginationMurkup += arrowBtnLeft;
        for (let i = 1; i <= 7; i++) {
          dataPage = i;
          if (i == page) {
            paginationMurkup += `<button type="button" class="pagination_button pagination_button-active">${dataPage}</button>`;
            continue;
          }
          paginationMurkup += `<button type="button" class="pagination_button" data-page="${dataPage}">${dataPage}</button>`;
        }
        paginationMurkup += dotsBtn + lastBtn + arrowBtnRight;
      }

      if (page > totalPage - 5) {
        paginationMurkup += arrowBtnLeft + firstBtn + dotsBtn;
        for (let i = totalPage - 6; i <= totalPage; i++) {
          dataPage = i;
          if (i == page) {
            paginationMurkup += `<button type="button" class="pagination_button pagination_button-active">${dataPage}</button>`;
            continue;
          }
          paginationMurkup += `<button type="button" class="pagination_button" data-page="${dataPage}">${dataPage}</button>`;
        }
        paginationMurkup += arrowBtnRight;
      }

      if (page > 5 && page <= totalPage - 5) {
        paginationMurkup += arrowBtnLeft + firstBtn + dotsBtn;
        for (let i = page - 2; i <= page + 2; i++) {
          dataPage = i;
          if (i == page) {
            paginationMurkup += `<button type="button" class="pagination_button pagination_button-active">${dataPage}</button>`;
            continue;
          }
          paginationMurkup += `<button type="button" class="pagination_button" data-page="${dataPage}">${dataPage}</button>`;
        }
        paginationMurkup += dotsBtn + lastBtn + arrowBtnRight;
      }
    }
  }
  refs.paginationBox.innerHTML = paginationMurkup;
}