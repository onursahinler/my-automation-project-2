import { Locator, Page, expect } from '@playwright/test';

export class JobDetailPage {
  private page: Page;
  private jobLeftMenu: Locator;
  private joinedDateInput: Locator;
  private jobTitleDropdown: Locator;
  private jobCategoryDropdown: Locator;
  private subUnitDropdown: Locator;
  private locationDropdown: Locator;
  private employmentStatusDropdown: Locator;
  private saveButton: Locator;
  private successToast: Locator;

  constructor(page: Page) {
    this.page = page;
    // Profil içindeki sol menüde yer alan "Job" sekmesi
    this.jobLeftMenu = page.locator('.orangehrm-tabs-item:has-text("Job")');
    
    // Form Elemanları (OrangeHRM dropdown'ları özel div'lerden oluşur)
    this.joinedDateInput = page.locator('.oxd-date-input input');
    this.jobTitleDropdown = page.locator('.oxd-input-group:has-text("Job Title") .oxd-select-wrapper');
    this.jobCategoryDropdown = page.locator('.oxd-input-group:has-text("Job Category") .oxd-select-wrapper');
    this.subUnitDropdown = page.locator('.oxd-input-group:has-text("Sub Unit") .oxd-select-wrapper');
    this.locationDropdown = page.locator('.oxd-input-group:has-text("Location") .oxd-select-wrapper');
    this.employmentStatusDropdown = page.locator('.oxd-input-group:has-text("Employment Status") .oxd-select-wrapper');
    
    // Alttaki ilk kaydet butonu (Job Details formunun submit butonu)
    this.saveButton = page.locator('button[type="submit"]').first();
    this.successToast = page.locator('.oxd-toast--success');
  }

  // Soldaki Job sekmesine geçiş
  async goToJobDetails() {
    await this.jobLeftMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  // OrangeHRM'in özel custom dropdown'larından veri seçen yardımcı metot
  private async selectCustomDropdownOption(dropdownLocator: Locator, optionText: string) {
    await dropdownLocator.click(); // Dropdown'ı aç
    
    // .filter({ hasText: optionText }) kullanarak doğru seçeneği cımbızlıyoruz
    await this.page.locator('.oxd-select-dropdown .oxd-select-option')
      .filter({ hasText: optionText })
      .click();
  }

  // Job formunu doldurma
  async updateJobInformation(data: any) {
    // 1. Joined Date (Önce mevcut tarihi temizleyip yenisini yazıyoruz)
    await this.joinedDateInput.click();
    await this.page.keyboard.press('Meta+A');
    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.press('Backspace');
    await this.joinedDateInput.fill(data.joinedDate);

    // 2. Özel Dropdown'ları dolduruyoruz
    await this.selectCustomDropdownOption(this.jobTitleDropdown, data.jobTitle);
    await this.selectCustomDropdownOption(this.jobCategoryDropdown, data.jobCategory);
    await this.selectCustomDropdownOption(this.subUnitDropdown, data.subUnit);
    await this.selectCustomDropdownOption(this.locationDropdown, data.location);
    await this.selectCustomDropdownOption(this.employmentStatusDropdown, data.employmentStatus);

    // 3. Formu Kaydet
    await this.saveButton.click();
  }

  // Başarı bildirimini doğrulama
  async verifySuccessNotification() {
    await expect(this.successToast).toBeVisible({ timeout: 15000 });
    await expect(this.successToast).toContainText('Successfully Updated', { timeout: 15000 });
  }
}