describe('Client Management Workflow (E2E)', () => {
    const testUserName = 'Cypress User';
    const newClientName = 'Novo Cliente Teste E2E';
    const newClientSalary = '6000';
    const newClientValue = '750000';
    const baseUrl = 'http://localhost:5000';
  
    beforeEach(() => {
      cy.visit(baseUrl); 
      cy.clearLocalStorage();
      cy.visit(baseUrl); 
    });
  
    it('1. Should successfully log in and redirect', () => {
      cy.contains('Olá, seja bem-vindo!').should('be.visible');
  
      cy.get('input[placeholder="Digite o seu nome:"]').type(testUserName);
      cy.contains('button', 'Entrar').click();
  
      cy.url().should('include', '/clients');
  
      cy.contains('Olá, ' + testUserName + '!').should('be.visible');
  
      cy.reload();
      cy.contains('Olá, ' + testUserName + '!').should('be.visible');
    });
  
    it('2. Should create a new client and see it in the list', () => {
      cy.visit(baseUrl);
      cy.get('input[placeholder="Digite o seu nome:"]').type(testUserName);
      cy.contains('button', 'Entrar').click();
      cy.url().should('include', '/clients');
  
      cy.contains('button', 'Criar cliente').click();
  
      cy.contains('h2', 'Criar cliente').should('be.visible');
  
      cy.get('input[id="name"]').type(newClientName);
      cy.get('input[id="salary"]').type(newClientSalary);
      cy.get('input[id="companyValuation"]').type(newClientValue);
  
      cy.contains('button', 'Criar cliente').click();
  
      cy.contains('Criar cliente').should('not.exist');
  
      cy.contains('h3', newClientName).should('be.visible');
    });
  
    it('3. Should select a client and successfully remove it on the selected page', () => {
      cy.visit(baseUrl + '/clients');
  
      cy.contains('h3', newClientName)
        .parents('.ClientCard')
        .find('button[title="Selecionar cliente"]')
        .click();
  
      cy.contains('Clientes Selecionados').click();
      cy.url().should('include', '/selected');
  
      cy.contains('h3', newClientName).should('be.visible');
  
      cy.contains('h3', newClientName)
        .parents('div')
        .find('button[title="Remover cliente"]')
        .click();
  
      cy.contains('h3', newClientName).should('not.exist');
      cy.contains('Nenhum cliente selecionado ainda.').should('be.visible');
    });
  });