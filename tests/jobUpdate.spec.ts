import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { PIMPage } from '../pages/PIMPage';
import { JobDetailPage } from '../pages/JobDetailPage';
import adminData from '../data/adminData.json';
import jobUpdateData from '../data/jobUpdateData.json';

test.describe('OrangeHRM - Personel İş Bilgileri Güncelleme Testleri', () => {
  
  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateTo();
    await dashboardPage.login(adminData.loginCredentials.username, adminData.loginCredentials.password);
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 15000 });
  });

  test('Mevcut Personelin Job Bilgilerini Güncelleme ve Doğrulama', async ({ page }) => {
    const pimPage = new PIMPage(page);
    const jobDetailPage = new JobDetailPage(page);

    // 1. Adım: PIM Paneline Git
    await pimPage.goToPIMPanel();

    // 2. Adım: Tablodaki ilk mevcut personelin "Edit" butonuna tıkla
    await pimPage.editFirstEmployeeInTable();
    await expect(page).toHaveURL(/.*viewPersonalDetails.*/);

    // 3. Adım: Profil içinden "Job" sekmesine geçiş yap
    await jobDetailPage.goToJobDetails();

    // 4. Adım: İş bilgilerini JSON dosyasındaki verilerle güncelle ve kaydet
    await jobDetailPage.updateJobInformation(jobUpdateData.jobDetails);

    // 5. Adım: Başarı bildirimini (Successfully Updated) doğrula
    await jobDetailPage.verifySuccessNotification();
  });

});