// Web Components
// https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/

class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <nav class="navbar navbar-expand-xl navbar-dark bg-black">
            <div class="container-fluid">
                <a class="navbar-brand" href="homepage.html">
                    <img src="../assets/images/logo11.jpg" alt="space science museum logo" class="d-inline-block align-text-top rounded-pill">
                    <center><strong>GitScience</strong></center>
                </a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="homepage.html">
                                Home
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="news.html">
                                News
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="solar-system.html">
                                Solar System
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="about.html">
                                About Us
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

      `;
    }
}

//Must contain hyphen!
customElements.define("navbar-header", Header);


class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <footer class="nav-footer bg-black d-flex flex-wrap justify-content-evenly align-items-center py-3">
            <div class="col-md-4 d-flex align-items-center">
                <a href="homepage.html">
                    <img src="../assets/images/logo11.jpg" alt="museum of space science logo">
                    Ivan Chen
                </a>
            </div>

            <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                <a href="#">
                    <img src="../assets/images/GoTopIcon.png" alt="museum of space science logo">
                </a>
            </ul>
        </footer>
      `;
    }
}

//Must contain hyphen!
customElements.define("navbar-footer", Footer);
