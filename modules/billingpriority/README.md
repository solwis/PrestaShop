# Billing Priority Checkout Module

Ten moduł modyfikuje przebieg drugiego kroku checkoutu PrestaShop 1.7/8 w taki sposób,
aby adres faktury był traktowany jako podstawowy, a adres dostawy był opcjonalny.

## `billingpriority.php`
- Rejestruje hak `actionFrontControllerSetMedia` i tylko na stronach checkoutu ładuje
  skrypt `views/js/checkout.js`.
- Wstrzykuje do przeglądarki komunikaty tekstowe wykorzystywane przez skrypt do
  przestawienia nagłówków i etykiet przełącznika adresu.

## `views/js/checkout.js`
- Po załadowaniu strony:
  - przenosi kontener adresu faktury nad blok adresu dostawy,
  - ustawia pole NIP przed polem "Firma" w formularzach adresowych,
  - uaktualnia etykiety przełącznika adresów i nagłówków sekcji przy użyciu
    tłumaczeń dostarczonych przez moduł.
- Nasłuchuje mutacji DOM oraz zdarzeń `prestashop.updatedAddressForm` i
  `prestashop.editAddress`, aby ponownie zastosować powyższe zmiany po każdej
  aktualizacji formularzy w checkoutcie.

Dzięki temu konfiguracja checkoutu pozostaje spójna nawet po przeładowaniu fragmentów
formularza przez skrypty PrestaShop.
