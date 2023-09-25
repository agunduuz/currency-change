1. **Sabitler ve Değişkenler**:
    - **`api_key`**: API anahtarıdır.
    - **`url`**: API URL'sini oluşturur.
    - **`tryRate`**, **`usdRate`**, **`eurRate`**: Farklı döviz kurlarını temsil eden değişkenlerdir.
    - **`originalNumbers`**: Sayfadaki fiyatların orijinal değerlerini saklamak için kullanılır.
2. **Sayfa Hazır Olduğunda**:
    - jQuery'nin **`$(document).ready()`** fonksiyonu sayfanın tamamen yüklendiğini kontrol eder ve içindeki kodları çalıştırır.
3. **Döviz Dönüşüm Butonlarına Tıklanınca**:
    - USD, EUR ve TRY için üç buton bulunmaktadır. Bu butonlara tıklandığında, ilgili döviz kuruna göre dönüşüm yapılmasını tetikleyen **`getExchangeRates`** fonksiyonu çağrılır.
4. **String'leri Sayıya Dönüştürme**:
    - **`convertStringToNumberVal`** fonksiyonu, DOM'daki fiyatları alır ve bu fiyatları sayısal değerlere dönüştürür.
5. **Döviz Kurlarını API'den Alma**:
    - **`getExchangeRates`** fonksiyonu, belirtilen hedef döviz kuru için API'den güncel döviz kurlarını alır. API'den başarılı bir yanıt alındığında, alınan döviz kurları değişkenlere atanır ve **`convertCurrencyTo`** fonksiyonu çağrılır.
6. **Döviz Dönüşümü**:
    - **`convertCurrencyTo`** fonksiyonu, belirtilen döviz kuruna göre fiyatları dönüştürür. Dönüştürülen fiyatlar daha sonra formatlanır ve DOM güncellenir. Aynı zamanda, son dönüştürülen döviz kuru bilgisi ve dönüştürülen değerler **`localStorage`**'a kaydedilir.
7. **Fiyatları Biçimlendirme**:
    - **`formatCurrency`** fonksiyonu, belirtilen döviz kuruna göre fiyatları biçimlendirir.
8. **DOM'u Güncelleme**:
    - **`updateDOMPrices`** fonksiyonu, dönüştürülen fiyatları alır ve bu fiyatları sayfadaki ilgili elementlere yerleştirir.
9. **Başlangıçta Döviz Kurlarını Al**:
    - Sayfa ilk yüklendiğinde, **`getExchangeRates`** fonksiyonu çağrılır.
10. **LocalStorage'dan Bilgi Alıp DOM'u Güncelleme**:
- Sayfa yüklendiğinde, en son dönüştürülen döviz kuru ve dönüştürülen fiyatlar **`localStorage`**'dan alınır. Eğer bu bilgiler mevcutsa, DOM bu bilgilere göre güncellenir.