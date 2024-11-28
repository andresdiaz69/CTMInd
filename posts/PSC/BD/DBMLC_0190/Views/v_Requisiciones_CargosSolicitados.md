# View: v_Requisiciones_CargosSolicitados

## Usa los objetos:
- [[Cargos]]
- [[Requisiciones_Solicitudes]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_CargosSolicitados] AS
SELECT CodigoCargo, NombreCargo, Orden
FROM (
	SELECT DISTINCT A.CodigoCargo, B.NombreCargo, Orden = 1
	FROM Requisiciones_Solicitudes A
	LEFT JOIN Cargos B ON A.CodigoCargo = B.CodigoCargo
	WHERE NombreCargo NOT LIKE '(NA)%'

	UNION ALL 

	SELECT DISTINCT A.CodigoCargo, B.NombreCargo, Orden = 2
	FROM Requisiciones_Solicitudes A
	LEFT JOIN Cargos B ON A.CodigoCargo = B.CodigoCargo
	WHERE NombreCargo LIKE '(NA)%'
) A

```
