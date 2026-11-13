# ART SYSTEM GROUP — audyt i przygotowane poprawki

> Aktualizacja 13.11.2026: wersja opisana w pierwotnym audycie została zapisana i wysłana na GitHub jako `81967e5`. Późniejszą zmianę animacji i karty elektrycznej opisuje sekcja 9 oraz [audit/motion-results.json](audit/motion-results.json). Informacje poniżej o braku commita/pushowania i przycisku pauzy dotyczą wcześniejszego etapu.

Data: 13.11.2026. Repozytorium: `kaczynskimarcin-spec/art-system-group-website`.
Punkt wyjścia: commit `3b905b4` na lokalnej gałęzi `redesign`, czysty katalog roboczy.
Zmiany przygotowano na osobnej gałęzi `audit/seo-security-optimization`.
Nie wykonano commita, pushowania, wdrożenia ani modyfikacji produkcji.

Kod został poprawiony lokalnie i przetestowany. Konfiguracja hostingu oraz dane biznesowe wymagają wskazanych poniżej potwierdzeń przed wdrożeniem. Raport nie stanowi potwierdzenia pełnej zgodności WCAG ani prawnej zgodności polityki prywatności.

## 1. Zakres i metoda

Przejrzano wszystkie pliki śledzone w repozytorium: oba dokumenty HTML, CSS, JavaScript, sitemapę, konfigurację cPanel, `.gitignore` i dziewięć oryginalnych grafik. Sprawdzono wymiary, sygnatury i rozmiary obrazów oraz ich wykorzystanie w kodzie. Wśród oryginałów nie wykryto identycznych plików według SHA-256.

Publiczną stronę otwarto w Chrome przy szerokościach 1440 i 390 px. Potwierdzono nieczytelną mobilną siatkę usług i brak linku do polityki. Pobrany publiczny HTML strony głównej i polityki odpowiadał wersji początkowej repozytorium po normalizacji końców linii.

Poprawioną wersję badano lokalnie przez HTTP, w osobnym profilu Chrome, z wymuszoną CSP odpowiadającą proponowanej polityce. Produkcję sprawdzano wyłącznie odczytowo. Szczegółowe wyniki i sumy kontrolne źródeł znajdują się w [audit/results.json](audit/results.json).

## 2. Problemy, priorytety i stan

| Waga | Problem i dowód | Stan |
| --- | --- | --- |
| Critical | Nie potwierdzono problemu tej wagi. Odpowiedź 200 na `/.git/HEAD` okazała się stroną HTML „Weryfikacja”, a nie rozpoznawalnym plikiem Git. | Brak dowodu wycieku; blokady trzeba potwierdzić na hostingu. |
| High | Aktywne grafiki miały wielomegabajtowe rozmiary; Lighthouse przed zmianami pobrał około 15,15 MB. Wszystkie oryginały zajmowały łącznie 17 487 152 B. | Dodano lżejsze warianty WebP i małe ikony; oryginały zachowano. |
| High | Mobilny CSS przywracał pięć kolumn w sekcji usług. Na produkcji przy 390 px karty miały około 58–61 px szerokości. | Poprawiono siatkę: jedna kolumna do 430 px, dwie do 760 px. |
| High | HTTP, HTTPS, www i `/index.html` zwracały 200 bez przekierowań, z identyczną treścią główną. | Dodano canonical. Przekierowania 301 i wymuszenie HTTPS pozostają do zatwierdzenia na hostingu. |
| High | `.cpanel.yml` nie kopiował `privacy.html`; wdrażanie zasobów po HTML zwiększało ryzyko chwilowych błędów po publikacji. | Dodano politykę i robots.txt; zasoby są kopiowane przed dokumentami HTML. Wdrożenie nadal nie jest transakcyjne. |
| Medium | CSS na produkcji ma cache 604800 s; publikacja nowych reguł pod starym URL mogła pozostawić stary wygląd w przeglądarce. | Oba HTML używają wersji CSS, a strona główna także JS, w parametrze opartym na SHA-256. |
| Medium | Brak canonical, JSON-LD i metadanych udostępniania; tytuł nie opisywał polskiej oferty. | Uzupełniono metadane i LocalBusiness. Istniejący opis meta i H1 zachowano. |
| Medium | `robots.txt` nie istniał, odpowiedź produkcyjna 404; sitemap zawierała tylko stronę główną. | Dodano robots.txt i politykę do mapy. Brak robots.txt sam w sobie nie oznaczał zakazu indeksowania. |
| Medium | Brak linku do polityki na stronie głównej oraz błędny `index.html#kontakt` w polityce. | Link w stopce i poprawny `/#contact`. |
| Medium | Klasy polityki prywatności nie miały odpowiadających im reguł CSS; tekst i dane stopki były nieuporządkowane. | Dodano ograniczoną szerokość tekstu, odstępy i responsywną stopkę, zachowując treść prawną. |
| Medium | Menu nie obsługiwało Escape, przywracania fokusu i zmiany breakpointu; mogło pozostawić blokadę przewijania. | Uporządkowano stan, fokus, Tab/Shift+Tab, Escape, `aria-controls`, ukrywanie i `inert` tła. |
| Medium | Kontrast białych napisów na niebieskich CTA i niebieskiego linku na bieli wynosił 3,54:1. | Przyciemniono wyłącznie wymagające tego tła i link; axe nie zgłasza już naruszenia. |
| Medium | JavaScript wymuszał smooth scroll mimo ustawień ruchu i nie aktualizował historii fragmentów; animacji tła nie można było zatrzymać. | Przywrócono natywne anchory, dodano pauzę animacji i obsługę reduced motion. |
| Medium | Zewnętrzny arkusz Google Fonts blokował renderowanie i powodował połączenia z Google. | Ten sam Manrope jest hostowany lokalnie jako WOFF2, z licencją OFL i `font-display: swap`. |
| Medium | Z produkcyjnych odpowiedzi nie otrzymano CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy ani Permissions-Policy. | Przygotowano przykład konfiguracji do osobnej akceptacji. Nie uruchomiono go na produkcji. |
| Medium | Sześć plików `.jpg` miało sygnaturę PNG. | Strona używa nowych plików z prawidłowym formatem WebP. Oryginały pozostają archiwalnymi zasobami. |
| Low | Hero zawierało dwie kopie tego samego tła. | Pozostawiono jedną. |
| Low | CSS odwoływał się do nieistniejącego `assets/contact-camera.jpg`. | Usunięto odwołanie, zachowując gradient kontaktu. |
| Low | Przyciski poprzedniej/następnej realizacji nie miały żadnej obsługi; były też puste numery kart i style usuniętego HUD. | Usunięto nieczynne kontrolki, puste elementy i nieużywane style. Obie realizacje nadal są widoczne. |
| Low | `.gitignore` obejmował tylko `.idea`. | Dodano typowe pliki środowiska, kluczy, edytorów i zależności. Sam ignore nie zabezpiecza wcześniej zapisanych sekretów. |

## 3. Wykonane zmiany w plikach

- `index.html:17`: polski tytuł opisujący rzeczywiste usługi. `index.html:39`: canonical, robots, Open Graph i Twitter Card. `index.html:55`: JSON-LD LocalBusiness.
- `index.html:232`: jeden obraz hero, warianty 960/1672 px, `srcset`, `sizes`, rozmiary i `fetchpriority="high"`.
- `index.html:510`: zdjęcia usług jako dekoracyjne obrazy z pustym alt, wymiarami, lazy loadingiem i asynchronicznym dekodowaniem. `index.html:663` oraz `index.html:729`: zdjęcia realizacji z opisowymi altami, bez dopisywania niepotwierdzonych nazw obiektów.
- `index.html:1301`: link do polityki. `index.html:1329`: adres firmy przepisany z istniejącej polityki, zgodny z JSON-LD. Bez nowych miast, obszarów obsługi, opinii lub certyfikatów.
- `privacy.html:24`: canonical, metadane, lokalna czcionka i ikony. `privacy.html:73`: dostępny cel linku pomijającego nawigację. `privacy.html:421`: poprawny kontakt. Litery GROUP mają odstępy CSS zamiast spacji, co usuwa problem zgodności etykiety z tekstem.
- `script.js:1`: dostępne menu i kontrola ruchu, natywna nawigacja fragmentami, klasy CSS zamiast stylów inline przy animowaniu kart. Brak nowych bibliotek, zapisu cookies i browser storage.
- `style.css:1`: lokalne warianty łacińskie Manrope, w tym polskie znaki. Pozostałe zmiany obejmują mobilne kolumny, warstwy zdjęć, czytelność kontaktu i stopki, fokus, skip link, reduced motion i wygląd polityki.
- `.cpanel.yml:1`: jawna lista plików, zasoby najpierw, polityka i index na końcu. Bez kopiowania katalogu Git, raportu, narzędzi i konfiguracji przykładowej.
- `robots.txt:1`, `sitemap.xml:1`: kanoniczne publiczne adresy obu istniejących stron. Nie wpisano fikcyjnych dat `lastmod`.
- `.gitignore:1`: rozszerzona higiena repozytorium.
- `deployment/apache.htaccess.example:1`: propozycja ochrony i konfiguracji serwera, niewdrażana automatycznie.
- `assets/`: 11 nowych wariantów obrazów/ikon oraz `fonts/manrope-latin.woff2`, `fonts/manrope-latin-ext.woff2` i `fonts/OFL-Manrope.txt`. Pełna lista z rozmiarami jest w wynikach JSON.

Wybrane rozmiary plików, w bajtach:

| Zasób | Przed | Nowy wariant |
| --- | ---: | ---: |
| Tło hero, desktop | 1 834 049 | 193 692 |
| Tło hero, wariant 960 px | 1 834 049 | 80 816 |
| CCTV | 2 012 619 | 59 546 |
| SSWiN | 2 399 838 | 79 780 |
| LAN | 1 814 905 | 74 650 |
| Instalacje elektryczne | 2 024 302 | 105 088 |
| Zdjęcie prac instalacyjnych | 2 560 420 | 210 152 |
| Szafa sieciowa | 2 044 212 | 161 814 |
| Favicon | 353 769 | 1 118 |

WebP jest kompresją stratną; wygląd sprawdzono na zrzutach. Nie użyto generatywnej zmiany fotografii. Zachowane oryginały, w tym nieużywany `project-dpd.jpg`, nadal zajmują miejsce w repozytorium i na hostingu, ale strona ich już nie pobiera. Ich ewentualne usunięcie można rozważyć po weryfikacji zewnętrznych odnośników i kopii zapasowej.

## 4. Wyniki testów

### Lighthouse 13.6.0

Pomiary dotyczą wersji początkowej i poprawionej na tym samym lokalnym serwerze, w tym samym Chrome i z domyślnymi profilami symulacji Lighthouse. Mobile: 412×823, DPR 1,75, spowolnienie CPU ×4; desktop: 1350×940, CPU ×1. Zewnętrzne czcionki pozostały w próbie „przed”, zgodnie z oryginalnym kodem.

| Wskaźnik | Mobile przed | Mobile po | Desktop przed | Desktop po |
| --- | ---: | ---: | ---: | ---: |
| Performance | 75 | 95 | 75 | 99 |
| Accessibility | 95 | 100 | 95 | 100 |
| Best Practices | 96 | 100 | 96 | 100 |
| SEO | 100 | 100 | 100 | 100 |
| LCP | 37,17 s | 2,89 s | 10,43 s | 0,97 s |
| TBT | 20 ms | 97 ms | 0 ms | 21 ms |
| CLS | 0,00309 | 0 | 0,00095 | 0 |
| Pobrane zasoby | 15,15 MB | 0,73 MB | 15,15 MB | 1,00 MB |

To pojedyncze końcowe pomiary laboratoryjne, nie pomiar produkcji ani dowód przejścia Core Web Vitals. Mobilny LCP pozostaje powyżej 2,5 s. TBT wzrósł w tych próbach i nie jest pomiarem INP. Nie uzyskano danych CrUX ani danych z Search Console. Pierwsza próba poprawionej strony wykryła blokadę pobrania robots.txt przez nadmierne `connect-src 'none'` w serwerze testowym; po zmianie na `'self'` powtórzono pomiar. Wynik SEO 100 występował również przed zmianami i nie mierzy całego technicznego SEO ani pozycji w Google.

Serwer testowy celowo używał `Cache-Control: no-store` dla powtarzalnych odczytów, co powoduje ostrzeżenia bfcache. Nie należy przenosić tego ustawienia na statyczną witrynę. Gzip produkcyjnego CSS został potwierdzony osobnym odczytem; kompresja na localhost nie była włączona.

Pełne raporty HTML i JSON znajdują się lokalnie w ignorowanym katalogu `.idea/`: `lighthouse-before-mobile.report.*`, `lighthouse-after-mobile.report.*`, `lighthouse-before-desktop.report.*`, `lighthouse-after-desktop.report.*`. [Opis metod i zmienności Lighthouse](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring).

### Pozostałe testy

- 262 asercje przeglądarkowe: 0 niepowodzeń. Strona główna: szerokości 320, 360, 390, 430, 600, 760, 768, 1024, 1440 i 1920 px. Polityka: 320, 390, 768 i 1440 px.
- Sprawdzono brak poziomego overflow, nagłówki i unikalne ID, anchory, metadane, parsowanie JSON-LD, rzeczywiste wczytanie obrazów, widoczność nazw usług nad zdjęciami, brak przepełnienia tekstu oraz brak zewnętrznych żądań w poprawionej wersji.
- 16 scenariuszy interakcji: wszystkie przeszły. Enter, Tab/Shift+Tab, Escape, powrót fokusu, zmiana breakpointu, historia fragmentów, kontakt z polityki, menu w poziomej orientacji, pauza, reduced motion i wersja bez JS. Nie stwierdzono zapisu cookies ani local/session storage przez lokalną stronę.
- Axe-core 4.14.0: 0 wykrytych naruszeń dla strony głównej i polityki, każdej przy 390 i 1440 px, po przewinięciu i ujawnieniu wszystkich kart. Wcześniej wykrywał kontrast 3,54:1 i problem etykiety wordmarku polityki. Użyto reguł WCAG 2 A/AA, 2.1 A/AA, 2.2 AA i best practice.
- Axe nadal wskazuje ręczne kontrole kontrastu na złożonych tłach oraz etykiety przycisku ze strzałką powrotu. Zero automatycznych naruszeń nie potwierdza pełnej zgodności WCAG 2.2.
- `html-validate` 11.21.1: oba dokumenty HTML przechodzą bez błędów. `node --check`: JavaScript przechodzi. Sitemap parsuje się jako XML.
- Kontrola kodu nie wykazała `innerHTML`, `eval`, formularzy, pobierania danych użytkownika ani zewnętrznych skryptów. Ograniczony skan śledzonych plików tekstowych i tekstowych diffów lokalnej historii dla kluczy prywatnych, AWS Access Key i klasycznych tokenów GitHub: 0 dopasowań. Nie jest to pełny skan wszystkich formatów sekretów ani test penetracyjny.
- Wykonano lokalną próbę wszystkich siedmiu poleceń `.cpanel.yml` w Git Bash, z podmienioną ścieżką docelową na `.idea/deploy-output`. Sprawdzono zgodność sześciu wdrażanych plików oraz wszystkich zasobów przez SHA-256; nie skopiowano konfiguracji, Git ani narzędzi. To nie jest wykonanie wdrożenia na cPanel i nie potwierdza uprawnień hostingu.
- Zrzuty przed/po oraz skrypty audytowe są lokalnie w `.idea/`. Przejrzano różnice źródeł; poprawiono wykrytą w trakcie prac regresję warstw nazw usług. Końcowe porównanie SHA-256 sprawdza zgodność zapisanych plików z testowanymi źródłami; wynik jest w `finalSourceVerification` pliku wyników. Przed zakończeniem wykonano także `git diff --check`.

## 5. Stan publicznej witryny i bezpieczeństwo

Odczyty z dnia audytu:

| Adres / ustawienie | Wynik |
| --- | --- |
| `/`, HTTP i HTTPS, z www i bez | 200; ta sama treść; brak zaobserwowanych przekierowań |
| `/index.html` | 200; ta sama treść co `/` |
| `/privacy.html` | 200; polityka jest już dostępna publicznie mimo pominięcia w obecnym procesie Git |
| `/robots.txt` | 404 |
| `/sitemap.xml` | 200 |
| Losowy nieistniejący dokument | 404, bez zaobserwowanego soft 404 |
| `/assets/` | HEAD 403 |
| `/.cpanel.yml` | HEAD 404 |
| `/.git/HEAD` | HEAD 200; GET zwrócił HTML „Weryfikacja”, nie rozpoznawalny plik HEAD. Nie potwierdzono wycieku ani skutecznej ochrony całego Git. |
| Kompresja CSS | Potwierdzono `Content-Encoding: gzip` |
| Cache CSS | `public, max-age=604800` |
| Nagłówki ochronne opisane w tabeli problemów | Nieobecne w zebranych odpowiedziach |
| Oprogramowanie serwera | Nagłówki wskazują LiteSpeed; brak dostępu do konfiguracji cPanel i AllowOverride |

Nie pobierano konfiguracji Git, indeksu, obiektów repozytorium ani potencjalnych sekretów z serwera. Odpowiedzi pośrednich warstw lub ochrony hostingu mogą różnić się od konfiguracji serwera źródłowego.

Przykład `.htaccess` zawiera blokowanie ukrytych ścieżek z wyjątkiem `.well-known`, wyłączenie listowania, ochronę typowych plików konfiguracyjnych, nagłówki bezpieczeństwa, CSP Report-Only, MIME WebP/WOFF2, cache oraz opcjonalną kompresję. Przekierowania i HSTS są zakomentowane. Nie dołączono go do wdrożenia. Politykę CSP przetestowano lokalnie jako wymuszaną; sama konfiguracja Apache/LiteSpeed nie została wykonana ani zweryfikowana na docelowym serwerze.

## 6. Prywatność i granice weryfikacji

Kod nie zawiera formularza, analityki, reklam, embeddowanych map ani mechanizmu zapisu cookies. W sprawdzonych odpowiedziach produkcji nie zaobserwowano Set-Cookie. Po przeniesieniu fontów poprawiona wersja pobiera zasoby wyłącznie z własnego originu. Nie dodano banera zgód bez istniejącego mechanizmu opcjonalnych cookies.

Treść prawną pozostawiono do osobnej weryfikacji: aktualne dane administratora, podstawy i zakres przetwarzania, okresy przechowywania, odbiorcy danych, obowiązki informacyjne i ewentualne działania dostawcy hostingu. Brak cookies w kodzie nie przesądza wszystkich obowiązków prawnych.

Nie sprawdzono kont cPanel/SSH/FTP, uprawnień plików, logów i kopii zapasowych, reguł WAF, TLS/OCSP, wszystkich subdomen, rzeczywistej obsługi dyrektyw `.htaccess`, danych GSC/GBP ani praw do zdjęć i logotypów. Nie testowano na fizycznym telefonie, Safari, Firefox ani czytniku ekranu. Publiczne nagłówki i Chrome nie zastępują tych kontroli.

## 7. Elementy do decyzji i dalsze SEO

1. **Hosting:** zatwierdzić konfigurację po teście na stagingu, w szczególności 301 do `https://artsystem-group.pl/`, przekierowanie `/index.html`, ochronę plików oraz nagłówki. Ustalić, gdzie kończy się TLS. Nie ufać dowolnemu X-Forwarded-Proto ani nie uruchamiać reguł powodujących pętlę przekierowań. HSTS włączać etapami, bez obejmowania niezweryfikowanych subdomen.
2. **Dane firmy:** potwierdzić aktualność adresu i telefonów przepisanych z istniejących dokumentów. Nie dodano godzin, współrzędnych, ocen, profili społecznościowych ani `areaServed`. Dawne realizacje w PL/UE nie zostały automatycznie uznane za aktualny obszar obsługi. Potwierdzić też obecne w oryginale liczby realizacji, klientów oraz zgody na materiały.
3. **Search Console:** zweryfikować właściwość domenową, przesłać sitemapę po wdrożeniu, sprawdzić indeksację i canonical obu stron, błędy mobilne oraz dane Core Web Vitals. Poprawność JSON-LD sprawdzono przez parsowanie i własne asercje; po wdrożeniu potrzebny jest także Google Rich Results Test i Inspekcja URL. [Dokumentacja Google LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business).
4. **Google Business Profile:** sprawdzić spójność rzeczywistej nazwy, adresu i kontaktów oraz faktycznego modelu obsługi. Nie tworzyć fikcyjnych oddziałów lub lokalizacji. Nie zmieniano profilu firmy.
5. **Podstrony usług — propozycja, bez implementacji:** cztery odrębne podstrony CCTV, SSWiN, sieci LAN i instalacji elektrycznych mogą pomóc, jeśli firma dostarczy konkretne informacje o zakresie, projektowaniu, wdrożeniu, serwisie i udokumentowanych realizacjach. Każda powinna mieć własny cel i treść, link z oferty i kontakt, unikalne title/H1/canonical oraz wpis w sitemapie. Nie tworzyć podobnych stron dla listy miast ani kopii tych samych opisów.
6. **Kolejny pomiar:** powtórzyć Lighthouse/PageSpeed na docelowym hostingu po wdrożeniu i oprzeć dalszą pracę nad LCP/INP na danych rzeczywistych użytkowników. Nie deklaruje się pozycji w Google ani produkcyjnego wyniku CWV.

## 8. Bezpieczne wdrożenie na Domenomanii

1. Zrobić kopię plików bieżącego `public_html`, obecnego `.htaccess` i konfiguracji domeny. Zanotować commit obecnie wdrożony i działającą gałąź cPanel. Nie zakładać, że jest to lokalne `redesign` albo `main`.
2. Przejrzeć `git diff`, nowe pliki i `audit/results.json`. Zatwierdzić metadane firmy i wygląd na stagingu. Sprawdzić, czy ścieżka DEPLOYPATH z `.cpanel.yml` odpowiada właściwej domenie. Na stagingu ustawić osobny katalog docelowy oraz blokadę indeksowania i dostęp dla testerów.
3. Dopiero po akceptacji utworzyć commit obejmujący poprawione pliki i nowe zasoby. Parametry `v` CSS/JS trzeba zmieniać przy kolejnych publikacjach tych plików; obecne wartości są skrótami ich treści. Nie dodawać `.idea`, narzędzi pomiarowych, kluczy ani plików środowiska.
4. Wysłać zaakceptowaną gałąź do GitHub i wykonać przegląd/merge zgodnie z faktycznym procesem. To czynności właściciela po akceptacji — audyt ich nie wykonał. Najpierw ustalić, czy push uruchamia automatyczne wdrożenie.
5. W cPanel → Git Version Control wybrać właściwe repozytorium i gałąź. Przy wdrożeniu ręcznym zaktualizować checkout z remote, sprawdzić commit i czysty working tree, następnie użyć Deploy HEAD Commit. `.cpanel.yml` musi być zapisany w commicie. [Wymagania i tryby wdrożeń cPanel](https://docs.cpanel.net/knowledge-base/web-services/guide-to-git-deployment/).
6. Manifest kopiuje `assets/` przed CSS/JS i dokumentami. Kopiuje `robots.txt`, `sitemap.xml`, `privacy.html` i `index.html`. Nie kopiuje raportu, katalogów audit/deployment ani przykładowego `.htaccess`. Nie wykonuje kasowania plików produkcji. Zwykłe kopiowanie nie zapewnia atomowego wydania; wybrać okres małego ruchu i zachować możliwość natychmiastowego rollbacku.
7. **Osobny etap serwerowy:** po akceptacji scalić `deployment/apache.htaccess.example` z istniejącą konfiguracją na stagingu. Nie nadpisywać reguł cPanel, SSL lub poczty. Potwierdzić brak 500, ochronę dotfiles, dostępność `.well-known`, MIME fontów i obrazów oraz brak naruszeń CSP. Następnie uzgodnione zmiany przenieść na produkcję. Przekierowania zacząć testować jako 302, a po poprawnym teście ustawić 301. HSTS dopiero po zweryfikowaniu HTTPS. CSP zacząć od Report-Only.
8. Po publikacji sprawdzić w świeżej sesji stronę główną, politykę i link kontaktowy, menu na telefonie, wszystkie obrazy i polskie znaki. W DevTools potwierdzić nowe wersje CSS/JS, brak błędów i mixed content. Zweryfikować 200 dla dwóch stron, robots i sitemapy, 404 dla nieistniejącej strony oraz docelowe przekierowania bez pętli i niepotrzebnych łańcuchów.
9. Powtórzyć pomiary na produkcji, Rich Results Test i Inspekcję URL; obserwować indeksację, logi i CWV po zebraniu danych. Gdy pojawią się nowe formularze, analityka lub osadzenia, ponownie przejrzeć CSP i prywatność.
10. Przy regresji odtworzyć kopię plików albo wdrożyć znany, poprzedni commit. Przy błędzie 500 po zmianie `.htaccess` przywrócić jego kopię. Nie wykonywać resetu historii Git ani masowego usuwania katalogu produkcyjnego.

Źródła konfiguracji: [nagłówki Apache](https://httpd.apache.org/docs/2.4/mod/mod_headers.html), [konfiguracja i zgodność LiteSpeed](https://docs.litespeedtech.com/lsws/configuration/). Przykład wymaga rzeczywistych uprawnień i ustawień hostingu, których audyt nie otrzymał.

## 9. Usunięcie kontrolki animacji i strzałki — 13.11.2026

Na prośbę użytkownika przed zmianami wykonano commit i push dotychczasowej wersji: `81967e5`, gałąź `audit/seo-security-optimization`.

Usunięto przycisk „Wstrzymaj animacje”, jego obsługę JavaScript i style oraz strzałkę w karcie „Instalacje elektryczne”. Zachowano oryginalne klatki i tempo animacji. Ułamkowa liczba powtórzeń kończy ruch tła i orbit po 4,4–4,5 s; `forwards` utrzymuje ostatnią klatkę. Rozwiązanie działa także bez JavaScriptu. Nie ma już automatycznego ruchu trwającego ponad 5 sekund, który wymagałby kontrolki według [WCAG 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).

Zachowano `prefers-reduced-motion`, reakcję na zmianę preferencji w czasie działania strony, animacje ujawniania kart i efekty interakcji. Pozostałe zmiany SEO, wydajności i dostępności zachowano. Zaktualizowano wersje CSS i JS w adresach zasobów, także w polityce prywatności.

Weryfikacja: 183 zaliczone asercje, 0 niepowodzeń; oba dokumenty HTML poprawne; JavaScript przechodzi `node --check`. Chrome: obie strony przy 320, 390, 760 i 1440 px; testy klawiatury, menu, anchorów, reduced motion i wersji bez JS. Potwierdzono rzeczywisty ruch, automatyczne zakończenie i utrzymanie ostatniej klatki. Axe-core: 0 naruszeń na obu stronach przy 390 i 1440 px. Przejrzano zrzuty mobilny i desktopowy. Szczegóły i sumy SHA-256 testowanych źródeł: [audit/motion-results.json](audit/motion-results.json).
