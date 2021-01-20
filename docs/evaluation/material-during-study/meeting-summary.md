**Sitzungsprotokoll - 12.01.2021, 14:00 bis 17:30**

**Protokollant**: Anna Mustermann



|**Name**|**Anwesend**|
| - | - |
|Anna Mustermann|Ja|
|Bob Musterfrau|Ja|
|Marco Mayer|Ja|
|Matt Müller|Nein|

## Thema des Meetings

Einsetzung von E2E Frameworks

**Kontext**:

Wir brauchen ein E2E Test Framework für unsere Anwendung. Es muss JavaScript unterstützen. Welches Test Framework verwenden wir?

**Vorschläge**:

- Anna schlägt die Anwendung von Cypress vor
- Bilbo ist eher für Selenium
- Marco ist gegen E2E

**Beschlüsse**:


- Cypress
    - Vorteile: 
        - Cypress läuft direkt im Browser und ist schnell.
        - Es ist in kurzer Zeit installiert und keine Konfiguration nötig.
        - Tests lassen sich einfach debuggen.
        - Keine großen Vorkenntnisse erforderlich
        - Erfasst Snapshots zum Zeitpunkt der Testausführung
    - Nachteile:
        - Unterstützt keine Multi-Tabs
        - Limited support for iFrames
        - Unterstützt nur JavaScript um test cases zu erstellen

- Selenium
    - Vorteile:
        - Kompatibel mit den neuesten Browsern
        - Mehrere Browser-Instanzen
        - Mobile Tests
    - Nachteile:
        - Die Einrichtung ist ein wenig schwierig
        - Ausführungsgeschwindigkeit ist langsam
        - Zeitreise (time travel) nicht vorhanden

- Keine E2E tests
    - Vorteile:
        - Zeitersparnis
    - Nachteile
        - Testüberdeckung wird nicht erhöht
        - Bugs können unentdeckt bleiben

- Cypress wurde für E2E-Tests als Framework entschieden
    - Positive Konsequenzen:
        - Gute Abdeckung vom Code durch Cypress E2E-tests
        - Schnelle Implementierung
        - Fehler lassen sich leicht debuggen
        - Erstellung von Screenshots und Videos in der pipeline
    - Negative Konsequenzen:
        - Aufwendige Ausführung der Pipeline
        - Aufwendige Anpassung von Tests bei Änderungen vom Code
- Links
    - https://www.cypress.io

**Nächster Protokollant mit voraussichtlichem Termin**: Bilbo Musterfrau, Nächstes Treffen: 22.01.2023, 14 Uhr
