# View: v_Requisiciones_RazonesRechazoCandidato

## Usa los objetos:
- [[Requisiciones_RazonesRechazoCandidato]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_RazonesRechazoCandidato] AS
SELECT IdRazonRechazo, NombreRazonRechazo, DescripcionRazonRechazo, Activo,
	Acceso = CASE WHEN IdRazonRechazo IN (1,2,3,6,10) THEN 'Solicitante' ELSE 'Reclutador' END
FROM Requisiciones_RazonesRechazoCandidato

```
