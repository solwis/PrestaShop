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


## Jak awaryjnie wyłączyć moduł

Jeżeli po instalacji modułu wystąpi błąd uniemożliwiający wejście do panelu administracyjnego:

1. Połącz się z serwerem przez FTP/SSH.
2. Zmień nazwę katalogu modułu, np. z `modules/billingpriority` na `modules/billingpriority_disabled`.
   PrestaShop automatycznie przestanie ładować moduł po takiej zmianie nazwy.
3. (Opcjonalnie) jeżeli chcesz dodatkowo oznaczyć moduł jako wyłączony w bazie danych, wykonaj zapytania:

```sql
UPDATE ps_module SET active = 0 WHERE name = 'billingpriority';
UPDATE ps_module_shop SET active = 0 WHERE id_module IN (SELECT id_module FROM ps_module WHERE name = 'billingpriority');
```

Pamiętaj, aby w razie potrzeby dostosować prefiks `ps_` do faktycznie używanego w instalacji.

Po usunięciu błędu możesz przywrócić pierwotną nazwę katalogu i ponownie włączyć moduł w panelu.

