/// <reference types="cypress" />
const { timeout } = require("async");

describe('MRI Software ZA Website Tests', () => {
  const url = 'https://www.mrisoftware.com/za/';
  const acceptCookiesBtn = 'button#onetrust-accept-btn-handler';

  beforeEach(() => {
    cy.visit(url)
    cy.get(acceptCookiesBtn, { timeout: 10000}).click();
  })

   it('Should load the ZA region website successfully', () => {
    cy.url().should('include', '/za');
    cy.title().should('include', 'MRI Software');
  });

  it('Should display company branding', () => {
    cy.contains('myMRI').should('be.visible');
  });

  it('Should contain correct homepage banner content', () => {
    const expectedText: string[] = [
      'Property Management Software to unlock your real estate vision',
      'Connecting real estate visionaries with AI-first proptech that powers thriving communities',
      'Register now for MRI Ascend South Africa',
      'Join us for Ascend SA 2025 at The Forum, Johannesburg on 21 August. Enjoy expanded content, in-depth sessions, and valuable networking. We look forward to seeing you there!'
    ];
    cy.get('div.banner-content').then(($el: JQuery<HTMLElement>) => {
      expectedText.forEach((text) => {
        expect($el.text()).to.include(text);
      });
    });
  });
});
