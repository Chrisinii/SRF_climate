# Klimakrisen Berichterstattung SRF im Jahr 2023

Im Rahmen meiner Bachelorarbeit möchte ich gerne untersuchen, wie SRF im Jahr 2023 über die Auswirkungen der Klimakrise berichtet hat.

Dieses IM5 Projekt soll mich bei der Inhaltsanalyse der Beiträge auf srf.ch unterstützen. Um die Inhaltsanalyse durchzuführen, nutze ich die SRGSSR Content API, um alle Artikel aus dem Jahr 2023 zu extrahieren, die relevante Keywords wie Klimaschutz, Klimawandel, Klimaerwärmung, Klimakrise und Klimakatastrophe enthalten. Dies ermöglicht es mir, am Ende des Jahres zu wissen, welche Artikel für meine Inhaltsanalyse relevant sind. Zudem habe ich eine Funktion implementiert, mit der ich Artikel mit dem "Favorite" Button markieren und aussortieren kann.

## Techstack

- HTML, CSS und JavaScript
- Content API von SRGSSR: [API-Dokumentation](https://developer.srgssr.ch/api-catalog/srgssr-content)
- Local Storage

## Herausforderungen
### API 

- Der Zugang zur API ist nicht öffentlich zugänglich, daher musste ich einen speziellen Zugang beantragen.
- Während der Durchführung meines Projekts war die API mehrmals nicht verfügbar, was die Entwicklung erschwerte.
- Die Dokumentation der API ist unvollständig und bietet keine klare Anleitung für die Anbindung per JavaScript. Auf GitHub konnte ich ein Projekt finden, das die öffentliche SRGSSR Meteo API anknüpft und konnte mich dan dem Code orientieren.
- Die API beschränkt die Anzahl der zurückgegebenen Daten pro Anfrage auf 500 Elemente. Da ich jedoch die Artikel eines ganzen Jahres durchsuchen musste, war ich gezwungen, mehrere Anfragen zu stellen (insgesamt 24 Anfragen). Dies erwies sich als komplexer als erwartet und erforderte die Hilfe von Alen, um erfolgreich implementiert zu werden.

## Hilfsmittel

- ChatGPT 
- GitHub: [API Fetch mit JS](https://github.com/whereisalex/weather-app)


