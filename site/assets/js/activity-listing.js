const filterLabels = document.querySelectorAll('.filtre-activity');

const goTop = () => (location.hash = '#liste');

Array.from(filterLabels).forEach(label => {
  label.addEventListener('click', goTop);
});
