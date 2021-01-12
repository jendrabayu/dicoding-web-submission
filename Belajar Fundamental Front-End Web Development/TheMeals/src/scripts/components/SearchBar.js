
class SearchBar extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    set keyUpEvent(event) {
        this._keyUpEvent = event;
        this.render();
    }

    get value() {
        return this.querySelector('#searchElement').value;
    }

    render() {
        this.innerHTML = `            
            <div class="input-group mb-3 search-bar">
                <input id="searchElement" type="text" class="form-control" placeholder="find your recipe">
                <div class="input-group-append">
                   <i class="fas fa-search"></i>
                </div>
            </div>
            `
        this.querySelector('#searchElement').addEventListener('keyup', this._keyUpEvent);
    }

}

customElements.define('search-bar', SearchBar);