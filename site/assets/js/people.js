// Only applies to mobile version
if (window.innerWidth < 700) {
  document.querySelector('#nav-inside-article [data-type=topbar] a').href =
    '#main';

  const sticky = () => {
    const navPeople = document.getElementById('toggle-nav_label');
    const stickyTitle = document.getElementById('titre-sticky');
    const navArticle = document.getElementById('nav-inside-article');

    if (window.scrollY > 550) {
      navPeople.style.top = '70px';
      stickyTitle.style.top = '70px';
      navArticle.style.top = '';
    } else {
      navPeople.style.top = '0px';
      stickyTitle.style.top = '0px';
      navArticle.style.top = '-250px';
    }
  };

  window.addEventListener('scroll', sticky);
}
