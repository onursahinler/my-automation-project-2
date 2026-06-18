import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { PIMPage } from '../pages/PIMPage';
import adminData from '../data/adminData.json';

test.describe('OrangeHRM - PIM Personel Yönetimi Testleri', () => {

  test.setTimeout(120000);
  test.beforeEach(async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    // Her testten önce giriş yapıp dashboard'a ulaşıyoruz
    await dashboardPage.navigateTo();
    await dashboardPage.login(adminData.loginCredentials.username, adminData.loginCredentials.password);
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 20000 });
  });

  test('Fotoğraflı Yeni Personel Oluşturma ve Doğrulama (File Upload)', async ({ page }) => {
    const pimPage = new PIMPage(page);

    // 1. Adım: PIM Paneline git ve formu aç
    await pimPage.goToPIMPanel();
    await pimPage.clickAddEmployee();

    // 2. Adım: Bilgileri doldur ve data/avatar.jpg dosyasını yükle
    await pimPage.addEmployee('Test', 'Automation', 'data/avatar.jpg');

    // 3. Adım: Başarı bildirimini (Toast Message) doğrula
    await pimPage.verifySuccessNotification();
  });

});