const searchInput = document.querySelector('#search');
const searchSvg = document.querySelector('#search #search-svg');
const searchInputInput = document.querySelector('#search input');
const searchPlaceholder = document.querySelector('.search-container .closed-placeholder');

searchInput.style.display = 'block';
searchInputInput.style.display = 'none';
searchPlaceholder.style.marginLeft = '40px';

function toggleSearch() {
  const isOpen = searchInputInput.style.display === 'block';
  if (isOpen) {
    searchInputInput.style.display = 'none';
    searchPlaceholder.style.display = 'block';
    searchInputInput.value = '';
  } else {
    searchInputInput.style.display = 'block';
    searchPlaceholder.style.display = 'none';
    searchInputInput.focus();
  }
}

const onEnter = function (evt) {
  if (evt.keyCode === 13) {
    const query = evt.target.value + ' site:https://medialab.sciencespo.fr/';
    const url = 'https://duckduckgo.com/?q=' + encodeURIComponent(query);
    console.log('search', url);
    window.open(url,'_blank').focus();
  }
};

searchInput.addEventListener('keyup', onEnter);
searchPlaceholder.addEventListener('click', toggleSearch)
searchSvg.addEventListener('click', toggleSearch)