import { Locator, Page, expect } from '@playwright/test';
import * as path from 'path';

export class PIMPage {
  private page: Page;
  private mainMenuPIM: Locator;
  private addEmployeeButton: Locator;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private employeeIdInput: Locator; // Yeni eklenen locator değişkeni
  private fileUploadInput: Locator;
  private saveButton: Locator;
  private successToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainMenuPIM = page.locator('.oxd-main-menu-item:has-text("PIM")');
    this.addEmployeeButton = page.locator('.oxd-button:has-text("Add")');
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    
    // YENİ: Employee ID input alanını yakalıyoruz
    // Formun içindeki Employee Id etiketinin altındaki inputu bulur
    this.employeeIdInput = page.locator('.oxd-input-group:has-text("Employee Id") input');
    
    this.fileUploadInput = page.locator('input[type="file"]');
    this.saveButton = page.locator('button[type="submit"]');
    this.successToast = page.locator('.oxd-toast--success');
  }

  async goToPIMPanel() {
    await this.mainMenuPIM.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickAddEmployee() {
    await this.addEmployeeButton.click();
  }

  async addEmployee(firstName: string, lastName: string, relativeFilePath: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);

    // Employee ID çakışmasını önlemek için 1000 ile 99.00 arasında rastgele bir ID üretiyoruz
    const randomId = Math.floor(1000 + Math.random() * 9000).toString();
    
    // Playwright ile inputun içindeki varsayılan değeri temizleyip kendi benzersiz ID'mizi yazıyoruz
    await this.employeeIdInput.click();
    // Mac ve Windows uyumlu seçip silme aksiyonu (Control+A veya Command+A yapıp siler)
    await this.page.keyboard.press('Meta+A'); 
    await this.page.keyboard.press('Control+A'); 
    await this.page.keyboard.press('Backspace');
    await this.employeeIdInput.fill(randomId);

    // Fotoğraf yükleme
    const absolutePath = path.resolve(relativeFilePath);
    await this.fileUploadInput.setInputFiles(absolutePath);

    // Kaydet
    await this.saveButton.click();
  }

  async verifySuccessNotification() {
    await expect(this.successToast).toBeVisible({ timeout: 15000 });
    await expect(this.successToast).toContainText('Successfully Saved', { timeout: 15000 });
  }
}