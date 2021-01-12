import $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';


class CategoryList extends HTMLElement {


    constructor() {
        super();
    }

    set items(items) {
        this._items = items;
        this.render();
    }

    render() {
        this.innerHTML = ``;
        this._items.forEach(item => {
            this.innerHTML += `
            <div class="card m-2 category-button" data-category="${item.strCategory}">
                <img src="${item.strCategoryThumb}" class="card-img-top" alt="${item.strCategory}">
                <div class="card-body">
                    <p class="card-text text-center">${item.strCategory}</p>
                </div>
            </div>
            `;
        });

        $(this).slick({
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5,
            dots: true,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

    }

    renderError(error) {
        this.innerHTML = `
            <style>
                h6{
                    position: absolute;
                }
            </style>
            <h6>${error}</h6>
        `;
    }

}

customElements.define('category-list', CategoryList);