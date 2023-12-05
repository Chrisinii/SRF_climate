# Klimakrisen Berichterstattung SRF im Jahr 2023

Im Rahmen meiner Bachelorarbeit möchte ich gerne untersuchen, wie SRF im Jahr 2023 über die Auswirkungen der Klimakrise berichtet hat.

Dieses IM5 Projekt soll mich bei der Inhaltsanalyse der Beiträge auf srf.ch unterstützen. Mithilfe der SRGSSR Content API werden alle Artikel aus dem Jahr 2023 ausgelesen, die die Keywords Klimaschutz, Klimawandel, Klimaerwärmung, Klimakrise, Klimakatastrophe enthalten. Dadurch wess ich am Ende des Jahres, welche Artikel ich in meiner Inhaltsanalyse berücksichtigen muss. Zudem kann ich Artikel mit dem "Favorite" Button aussortieren.

## Techstack

- HTML, CSS und JavaScript
- Content API von SRGSSR: [API-Dokumentation](https://developer.srgssr.ch/api-catalog/srgssr-content)
- Local Storage

## Herausforderungen

### API 

- Sie ist nicht öffentlich zugänglich, somit musste ich den Zugang anfragen.
- Während dem Ausführen meines Projektes, war die API mehrmals nicht ansprechbar, was das Arbeiten mit der API erschwerte.
- Die API-Dokumentation ist nicht besonders ausführlich, was das Arbeiten mit der API erschwert. Zum einen nicht erklärt wie man sich mit der API connecten kann (ausser mit curl). Auf GitHub fand ich ein Beispiel mit JavaScript das die öffentliche Meteo API anzapfte.
- Die Maximale Anzahl von Daten, die die API mit einem Request ausgibt, beläuft sich auf 500 Elemente. Da ich allerdings die Artikel von einem gesamten Jahr durchsuchen muss, muss ich mehrere Request machen. Dies war komplizierter als gedacht. Mit der Hilfe von Alain konnte ich es umsetzen.

## Hilfsmittel

- ChatGPT 
- GitHub (Das Repository finde ich leider nicht mehr)


