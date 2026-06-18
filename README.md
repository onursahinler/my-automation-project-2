# Advanced SaaS Dashboard & Dynamic Web Automation Framework

Bu proje, kurumsal bir İnsan Kaynakları Yönetim (SaaS) platformu olan **OrangeHRM** üzerinde, mülakatlarda ve büyük ölçekli şirketlerdeki otomasyon senaryolarını çözmek amacıyla geliştirilmiş **gelişmiş bir Playwright & TypeScript framework çalışmasıdır.**

---

## Öne Çıkan "Advanced" Teknik Konseptler

* **Dinamik Tablo & Hücre Filtreleme:** Asenkron yüklenen tablolarda klasik hantal döngüler yerine Playwright'ın `.filter({ hasText: ... })` özelliği kullanılarak nokta atışı veri doğrulaması yapıldı.
* **Dosya Yükleme (File Upload):** İşletim sistemi seviyesindeki dosya seçme pencerelerini bypass eden Playwright `setInputFiles` mimarisiyle fotoğraflı personel kaydı otomatize edildi.
* **Dinamik Veri Çakışması Çözümü (Data Collision Fix):** Ortak demo sunucularında yaşanan benzersiz ID çakışmalarını önlemek adına, çalışma anında (runtime) **rastgele benzersiz Employee ID** üreten ve form alanını temizleyip yazan akıllı mekanizma kuruldu.
* **Modüler Test Yapısı:** Test dosyaları işlevlerine göre ayrıldı, testlerin paralel ve bağımsız koşumu sağlandı.
* **Gelişmiş Gecikme Yönetimi (Flakiness Protection):** Ağ dalgalanmalarına ve sunucu yavaşlıklarına karşı akıllı `timeout` esnetme ve sayfa yükleme stratejileri uygulandı.

---

## Kullanılan Teknolojiler

* **Otomasyon Aracı:** Playwright
* **Programlama Dili:** TypeScript
* **Hata Ayıklama (Debugging):** Playwright UI Mode & Trace Viewer
* **Veri Yönetimi:** JSON (Data-Driven Testing)

---

## 📂 Klasör Yapısı

```text
playwright-advanced-dashboard/
├── data/               # Test verileri ve yüklenecek medya dosyaları
│   ├── adminData.json
│   └── avatar.png
│   └── jobUpdateData.json
├── pages/              # POM Sayfa Nesneleri ve Gelişmiş Metotlar
│   ├── DashboardPage.ts
│   ├── AdminPage.ts
│   └── PIMPage.ts
│   └── JobDetailPage.ts
├── tests/              # Modüler test senaryoları
│   ├── adminPanel.spec.ts
│   └── pimPanel.spec.ts
│   └── jobUpdate.spec.ts
├── playwright.config.ts
└── package.json
