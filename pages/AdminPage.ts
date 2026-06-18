import { Locator, Page, expect } from '@playwright/test';

export class AdminPage {
  private page: Page;
  private usernameSearchInput: Locator;
  private searchButton: Locator;
  private tableRows: Locator;

  constructor(page: Page) {
    this.page = page;
    // Arama formundaki Username alanı
    this.usernameSearchInput = page.locator('.oxd-input-group:has-text("Username") input');
    // Formun altındaki Search butonu
    this.searchButton = page.locator('button[type="submit"]');
    // Tablodaki tüm veri satırları (Kullanıcı listesi)
    this.tableRows = page.locator('.oxd-table-card');
  }

  // 1. Kullanıcı adına göre arama yapma fonks.
  async searchByUsername(username: string) {
    await this.usernameSearchInput.fill(username);
    await this.searchButton.click();
    
    // Bu sayede testlerin "hız kurbanı" olup patlamasını engelleriz
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserInTable(username: string, expectedRole: string) {
    // Arama sonucunda tek veya birden fazla satır kalmış olabilir. 
    // .filter() kullanarak sadece bizim aradığımız kullanıcı adını içeren satırı cımbızlıyoruz.
    const targetRow = this.tableRows.filter({ hasText: username });

    // Satırın görünür olduğunu doğrula
    await expect(targetRow).toBeVisible();

    // O satırın içindeki User Role hücre elementini bul ve rolünü doğrula
    // OrangeHRM tablosunda 2. hücre (index 1) genellikle rolü içerir, metin kontrolü en sağlıklısıdır
    await expect(targetRow).toContainText(expectedRole);
  }
}