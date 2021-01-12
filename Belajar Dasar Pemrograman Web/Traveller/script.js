document.querySelectorAll('.thumb-image .item img').forEach(el => {
    el.addEventListener('click', function (e) {

        document.querySelectorAll('.thumb-image .item').forEach(el => {
            el.classList.remove('active');
        });

        img = document.querySelector('.main-image img');
        p = document.querySelector('.main-image p');
        p.innerHTML = e.target.alt;
        p.classList.add('fadeInRight');
        img.src = e.target.src;
        img.classList.add('fade');
        el.parentElement.classList.add('active');

        setTimeout(function () {
            img.classList.remove('fade');

        }, 500)

        setTimeout(function () {

            p.classList.remove('fadeInRight');
        }, 700)

    })
});

window.addEventListener('scroll', function () {
    let wScroll = this.scrollY;


    const nav = document.querySelector('nav');
    if (wScroll > 71 && window.innerWidth > 768) {
        nav.classList.add('fixed');
    } else {
        if (nav.classList.item('fixed')) {
            nav.classList.remove('fixed');
        }
    }

    const scrollTop = document.querySelector('.scroll-top');
    if (wScroll > 100) {
        scrollTop.style.display = 'block';
    } else {
        scrollTop.style.display = 'none';
    }


    try {
        if (wScroll > document.querySelector('#content').offsetTop - 600) {
            const articleCard = document.querySelectorAll('#content article');
            for (let i = 0; i < articleCard.length; i++) {
                setTimeout(function () {
                    articleCard[i].classList.add('show');
                }, 200 * (i + 1));
            }
        }
    } catch (error) {

    }
});


document.querySelector('.scroll-top').addEventListener('click', () => {
    document.getElementById('top').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('nav ul').classList.add('menu-active');
});

document.querySelector('.close i').addEventListener('click', () => {
    document.querySelector('nav ul').classList.remove('menu-active');
})


