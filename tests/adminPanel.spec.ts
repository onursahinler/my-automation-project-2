import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { AdminPage } from '../pages/AdminPage';
import adminData from '../data/adminData.json';

test.describe('OrangeHRM - Kurumsal Panel ve Dinamik Tablo Testleri', () => {

  test.beforeEach(async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    // 1. Adım: Panele Giriş Yap
    await dashboardPage.navigateTo();
    await dashboardPage.login(adminData.loginCredentials.username, adminData.loginCredentials.password);
    // Login sonrası anasayfa URL doğrulaması
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('Admin Panelinde Kullanıcı Arama ve Tablo Doğrulaması', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const adminPage = new AdminPage(page);

    // 2. Adım: Sol menüden Admin paneline geçiş yap
    await dashboardPage.goToAdminPanel();
    await expect(page).toHaveURL(/.*admin\/viewSystemUsers/);

    // 3. Adım: Dinamik veri ile arama yap (Admin kullanıcısını aratıyoruz)
    await adminPage.searchByUsername(adminData.searchFilters.systemUser);

    // 4. Adım: Tablodaki sonuçları filtreleyip doğrula
    // Aratılan kullanıcı: Admin, Rolü: Admin olmalı
    await adminPage.verifyUserInTable(adminData.searchFilters.systemUser, 'Admin');
  });

});