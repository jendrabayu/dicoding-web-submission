class Data {

    static searchMeal(keyword) {
        if (keyword) {
            return fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + keyword, { method: 'GET' })
                .then(response => {
                    return response.json();
                }).
                then(responseJson => {
                    if (responseJson.meals) {
                        return Promise.resolve(responseJson.meals);
                    } else {
                        return Promise.reject(keyword + 'is not found');
                    }
                });
        }
    }

    static mealCategories() {

        return fetch('https://www.themealdb.com/api/json/v1/1/categories.php', { method: 'GET' })
            .then(response => {
                return response.json();
            }).
            then(responseJson => {
                return Promise.resolve(responseJson.categories);
            }).catch(error => {
                console.log(error);
            });
    }

    static mealCategoryItem(name) {
        return fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + name, { method: 'GET' })
            .then(response => {
                return response.json();
            }).
            then(responseJson => {
                return Promise.resolve(responseJson.meals);
            }).catch(error => {
                console.log(error);
            });
    }

    static mealDetail(id) {
        return fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id, { method: 'GET' })
            .then(response => {
                return response.json();
            }).
            then(responseJson => {
                return Promise.resolve(responseJson.meals[0]);
            }).catch(error => {
                console.log(error);
            });
    }

}

export default Data;