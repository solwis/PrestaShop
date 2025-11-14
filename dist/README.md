# Pakiet modułu Billing Priority

W repozytorium celowo nie przechowujemy gotowego archiwum `billingpriority.zip`, aby uniknąć
problemów z dodawaniem plików binarnych do systemu kontroli wersji. Skorzystaj z poniższych kroków,
aby samodzielnie przygotować paczkę instalacyjną zgodną z PHP 7.4.

## Jak zbudować paczkę ZIP

```bash
cd modules
zip -r -X ../dist/billingpriority.zip billingpriority
```

Po wykonaniu polecenia w katalogu `dist/` pojawi się plik `billingpriority.zip`, który zawiera całą
zawartość modułu.

## Jak wgrać paczkę w panelu

1. Zaloguj się do panelu administracyjnego sklepu.
2. Przejdź do sekcji **Moduły > Menedżer modułów**.
3. Kliknij **Prześlij moduł** i wskaż wygenerowany plik `billingpriority.zip`.
4. Po wgraniu potwierdź instalację modułu.
