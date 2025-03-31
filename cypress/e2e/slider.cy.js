describe('Swiper Gallery Test', function () {
  it('Checks if second slide contains "United Kingdom"', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.get('.swiper-slide-active').should('contain', 'United Kingdom');
  });
});

describe('Swiper Gallery Test', function () {
  it('Checks if third slide contains "Paris"', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.wait(2000);
    cy.get('.swiper-button-next').click({ force: true });
    cy.wait(2000);
    cy.get('.swiper-slide-active').should('contain', 'Paris');
  });
});

describe('Swiper Navigation Test', function () {
  it('Navigates forward and backward through the slides', function () {
    cy.visit('http://localhost:3000');

    cy.get('.swiper-slide-active').should('contain', 'Rome');

    cy.get('.swiper-button-next').click();
    cy.wait(300); // daj Swiperowi czas na animację
    cy.get('.swiper-slide-active').should('contain', 'London');

    cy.get('.swiper-button-prev').click();
    cy.wait(300);
    cy.get('.swiper-slide-active').should('contain', 'Rome');
  });
});

describe('Slide Content Verification', function () {
  const slides = [
    { title: 'Rome', description: 'Italy' },
    { title: 'London', description: 'United Kingdom' },
    { title: 'Paris', description: 'France' },
  ];

  it('Each slide displays correct title and description', function () {
    cy.visit('http://localhost:3000');

    slides.forEach((slide, index) => {
      if (index > 0) {
        cy.get('.swiper-button-next').click();
        cy.wait(300);
      }

      cy.get('.swiper-slide-active').within(() => {
        cy.contains('h1', slide.title).should('be.visible');
        cy.contains('p', slide.description).should('be.visible');
      });
    });
  });
});

describe('Responsive Gallery Test', function () {
  const viewports = ['macbook-15', 'ipad-2', 'iphone-6'];

  viewports.forEach((viewport) => {
    it(`should display gallery correctly on ${viewport}`, function () {
      cy.viewport(viewport);
      cy.visit('http://localhost:3000');

      cy.get('.swiper').should('be.visible');
      cy.get('.swiper-button-next').should('be.visible').click();
      cy.get('.swiper-slide-active').should('be.visible');
    });
  });
});

describe('Gallery Visibility Test', function () {
  it('Displays all main elements of the gallery', function () {
    cy.visit('http://localhost:3000');

    cy.get('.swiper').should('be.visible');

    cy.get('.swiper-slide').should('have.length.at.least', 3);

    cy.get('.swiper-button-prev').should('be.visible');
    cy.get('.swiper-button-next').should('be.visible');
  });
});