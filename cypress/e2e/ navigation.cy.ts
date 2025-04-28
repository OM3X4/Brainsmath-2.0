describe('navigation', () => {
	it('navigation',{ retries:2} , () => {
		cy.visit('/')

		cy.get("a[href='/authentication']").click()

		cy.url().should('include', '/authentication')

		cy.get("a[href='/settings']").click()

		cy.url().should('include', '/settings')

		cy.get("a[href='/leaderboard']").click()

		cy.url().should('include', '/leaderboard')

		cy.get("a[href='/']").first().click()

		cy.location('pathname').should('eq', '/');
	})
})