import { Locator, Page, expect } from '@playwright/test';

export class DashboardPage {
  private page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private mainMenuItemAdmin: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    
    this.mainMenuItemAdmin = page.locator('.oxd-main-menu-item:has-text("Admin")');
  }

  async navigateTo() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async goToAdminPanel() {
    // Sol menüden Admin'e tıklama fonks.
    await this.mainMenuItemAdmin.click();
  }
}