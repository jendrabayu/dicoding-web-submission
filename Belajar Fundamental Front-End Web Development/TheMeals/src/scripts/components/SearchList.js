class SearchList extends HTMLElement {

    constructor() {
        super();
    }

    set meals(meals) {
        this._meals = meals;
        this.render();
    }


    render() {
        if (this._meals) {
            this._meals.forEach(meal => {
                this.innerHTML += `
                    <div class="card m-2">
                        <div class="row no-gutters">
                            <div class="col-md-2">
                                <img src="${meal.strMealThumb}" class="card-img h-100" alt="..." >
                            </div>
                            <div class="col-md-7">
                                <div class="card-body">
                                    <h6 class="card-title mb-1">${meal.strMeal}</h6>
                                    <p class="card-text">${meal.strArea} ${meal.strCategory}</p>
                                </div>
                            </div>
                                <div class="col-md-3 d-flex justify-content-center align-items-center">

                                <button class="detail-button btn btn-primary btn-sm" data-toggle="modal" data-target="#staticBackdrop" data-id="${meal.idMeal}">Detail</button>
                            </div>
                        </div>
                    </div>
                `;
            });
        } else {
            this.innerHTML = '';
        }
    }

    renderError(error) {
        this.innerHTML = `
            <h6 class="my-1 mx-2">${error}</h6>
        `;
    }

}

customElements.define('search-list', SearchList);