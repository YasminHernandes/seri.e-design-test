const swiper = new Swiper('.swiper', {
  loop: true,

  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  slidesPerView: 2,
  spaceBetween: 10,

});

const header = document.querySelector('.header')
const nav = document.querySelector('.nav')
const menuMobile = document.querySelector('.menu-mobile')
const swiperWrapper = document.querySelectorAll('.swiper-wrapper')

const ChangeBgHeader = () => {
  if (window.scrollY > 480) {
    header.style.backgroundColor = "var(--color-primary-dark)"
  } else {
    header.style.backgroundColor = 'initial'
  }
}
document.addEventListener('scroll', ChangeBgHeader)

menuMobile.addEventListener('click', () => {
  nav.classList.toggle('nav--open')
  menuMobile.classList.toggle('menu--open')
})

const PopulateProduct = (product) => {
  return swiperWrapper.forEach(swiper => {
    swiper.insertAdjacentHTML('beforeend', `
    <div class="swiper-slide">
      <div class="product-container ${product.sold_out ? 'sold-out' : ''}">
        <span><p class="sold-out__text">sold out.</p></span>
        <img src=${product.img} alt="" width="400px" height="700px" class="product-image">
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">R$ ${product.price}</p>
          <p class="product-selling-price">R$ ${product.selling_price}</p>
        </div>
      </div>
    </div>
  `)
  })
}
axios.get("https://v65qieh91b.execute-api.sa-east-1.amazonaws.com/products")
.then(res => res.data)
.then(res => res.forEach(product => PopulateProduct(product)))