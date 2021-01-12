import 'regenerator-runtime';
import './scripts/components/NavBar.js';
import './scripts/components/SearchBar.js';
import './scripts/components/SearchList.js';
import './scripts/components/CategoryList.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';
import './styles/header.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Data from './scripts/Data.js';


const searchMeal = () => {
    const searchElement = document.querySelector('search-bar');
    const searchListElement = document.querySelector('search-list');

    searchElement.keyUpEvent = async () => {
        const keyword = searchElement.value;
        try {
            searchListElement.meals = await Data.searchMeal(keyword);
            detail();
        } catch (error) {
            searchListElement.renderError(error);
        }
    }
}

const categories = async () => {
    const categoryList = document.querySelector('category-list');
    setTimeout(()=>{
        categoryList.innerHTML = `
            <div class="text-center">
                <div class="spinner-border" role="status">
                </div>
            </div>
        `;
    },100);
    try {
        categoryList.items = await Data.mealCategories();
        const categoryButton = document.querySelectorAll('.category-button');
            categoryButton.forEach(btn => {
                btn.addEventListener('click', function () {
                    renderCategoryList(this.dataset.category);
                });
            });
        
    } catch (error) {
        console.log(error);
    }
}


const renderCategoryList = async name => {
    const categoryWrapper = document.getElementById('category-list-wrapper');
    const categoryTitle = document.getElementById('category-title');
    setTimeout(()=>{
        categoryWrapper.innerHTML = `
            <div class="d-flex align-items-center">
                <strong>Loading...</strong>
                <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
            </div>
        `;
    }, 100);

   
    try {
        const categoryItem = await Data.mealCategoryItem(name);
        if (categoryItem) {
            categoryTitle.textContent = name;
            categoryWrapper.innerHTML = ``;
            categoryItem.forEach(item => {
    
                let meal = item.strMeal;
                meal.length > 25 ?  meal = meal.substr(0, 25) + '...' : meal;
        
                categoryWrapper.innerHTML += `
                   <div class="m-2 col-lg-2 col-md-4 col-sm-6 p-0" style="cursor: pointer" >
                        <div class="card w-100">
                            <img src="${item.strMealThumb}" class="card-img-top detail-button" alt="${item.strCategory}" data-toggle="modal" data-target="#staticBackdrop" data-id="${item.idMeal}">
                            <div class="card-body p-3">
                                <p class="card-text text-left">${meal} 
                                <small class="detail-button" data-toggle="modal" data-target="#staticBackdrop" data-id="${item.idMeal}" style="color: rgb(195,51,42); font-weight: 500;">Detail</small>
                                </p>
                            </div>
                        </div>
                   </div>
                `;
            });
            detail();
        }
    
    } catch (error) {
        console.log(error);
    }
 
}


const detail = () =>{
    const detailButton = document.querySelectorAll('.detail-button');
    const modalTitle = document.querySelector('.modal-title');
    const modalBody =  document.querySelector('.modal-body');
    detailButton.forEach(btn=>{
        btn.addEventListener('click', async function(){
            modalTitle.innerHTML = '';
            setTimeout(()=>{
                modalBody.innerHTML = `
                <div class="d-flex align-items-center">
                    <strong>Loading...</strong>
                    <div class="spinner-border ml-auto" role="status" aria-hidden="true">
                    </div>
                </div>`;
            },100)
            try {
                const meal = await Data.mealDetail(this.dataset.id);
                if(meal){
                    modalTitle.textContent = meal.strMeal;
                    modalBody.innerHTML = renderDetail(meal);
                }
            } catch (error) {
                console.log(error);
            }
        });
    });
}

const renderDetail = meal =>{

    let ingredients = ``;
    for(let i = 1; i < 21; i++){
        if(meal['strIngredient'+i]){
            ingredients+= `${i}. ${meal['strIngredient'+i]} <br>`;
        }
    }

    let instructions = ``;
    let strInstructions = meal.strInstructions.split('.');
    for(let i = 0; i < strInstructions.length-1; i++){
        instructions += `${i+1}. ${strInstructions[i]} <br>`;
    }


    return `
        <div class="row">
            <div class="col-lg-6">
                <img src="${meal.strMealThumb}" class="img-fluid" alt="${meal.strMeal}">
            </div>
            <div class="col-lg-6">
                <h4>Ingredients</h4>
                <p>${ingredients}</p>
            </div>
            <div class="col-lg-12 px-4 py-3">
            <h4>Instructions</h4>
                <p>${instructions}</p>
            </div>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    searchMeal();
    categories();
    AOS.init({

        duration: 1000,
        easing: 'ease',
        delay: 100,
    });
});