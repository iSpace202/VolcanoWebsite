const parallaxObjs = document.getElementsByName('parallax');

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const maxScrollPosition = document.body.offsetHeight - window.innerHeight;
  const scrollFraction = scrollPosition / maxScrollPosition;

  for (let i = 0; i < parallaxObjs.length; i++) {
    parallaxObjs[i].style.transform = `translateY(${scrollFraction * 100}%)`;
  };
})