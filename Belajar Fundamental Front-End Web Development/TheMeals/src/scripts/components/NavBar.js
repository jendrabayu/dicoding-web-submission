
class NavBar extends HTMLElement {


    connectedCallback() {
        this.brand = this.getAttribute('brand') || 'LOGO';
        this.link = this.getAttribute('link')  || '#';
        this.render();
    }

    render() {
        this.innerHTML = `
        <nav class="navbar">
            <div class="container">
                <a class="navbar-brand" href="${this.link}">${this.brand}</a>
            </div>
        </nav>
        `
    }

}

customElements.define('nav-bar', NavBar);