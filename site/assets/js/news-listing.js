const filterLabels = document.querySelectorAll('.filtre-actu');

const goTop = () => (location.hash = '#liste');

Array.from(filterLabels).forEach(label => {
  label.addEventListener('click', goTop);
});

const years = document.querySelectorAll('#list-years li a');

const closeFilters = () => {
  document.getElementById('radio-phone-close').checked = true;
};

Array.from(years).forEach(year => {
  year.addEventListener('click', closeFilters);
});
