const internalSearchInput = document.querySelector('#internal-search');
const internalSearchSvg = document.querySelector('#internal-search #search-svg');
const internalSearchInputInput = document.querySelector('#internal-search input');
const internalSearchPlaceholder = document.querySelector(
  '.internal-search-container .closed-placeholder'
);

internalSearchInput.style.display = 'block';
internalSearchInputInput.style.display = 'none';
internalSearchPlaceholder.style.marginLeft = '40px';

function toggleSearch() {
  const isOpen = internalSearchInputInput.style.display === 'block';
  if (isOpen) {
    internalSearchInputInput.style.display = 'none';
    internalSearchPlaceholder.style.display = 'block';
    internalSearchInputInput.value = '';
  } else {
    internalSearchInputInput.style.display = 'block';
    internalSearchPlaceholder.style.display = 'none';
    internalSearchInputInput.focus();
  }
}

const onInternalInputEnter = function (evt) {
  if (evt.keyCode === 13) {
    const query = evt.target.value + ' site:https://medialab.sciencespo.fr/';
    const url = 'https://duckduckgo.com/?q=' + encodeURIComponent(query);
    // console.log('search', url);
    window.open(url, '_blank').focus();
  }
};

internalSearchInput.addEventListener('keyup', onInternalInputEnter);
internalSearchPlaceholder.addEventListener('click', toggleSearch);
internalSearchSvg.addEventListener('click', toggleSearch);