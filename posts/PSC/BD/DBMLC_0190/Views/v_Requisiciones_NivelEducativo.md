# View: v_Requisiciones_NivelEducativo

## Usa los objetos:
- [[Requisiciones_Contratacion]]
- [[Requisiciones_Entrevista]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_NivelEducativo] AS
SELECT E.IdSolicitud, CedulaCandidato=CONVERT(BIGINT,(CASE WHEN C.NuevaCedulaCandidato IS NOT NULL THEN C.NuevaCedulaCandidato ELSE E.CedulaCandidato END)),
	CedulaCandidatoAnterior = E.CedulaCandidato, E.Primaria, E.Bachillerato, E.Tecnico, E.Tecnologo, E.Profesional, E.Postgrado,
	CASE WHEN Postgrado = 1 THEN 'Especialistas'
		WHEN Profesional = 1 THEN 'Profesional'
		WHEN Tecnologo = 1 THEN 'Tecnólogo'
		WHEN Tecnico = 1 THEN 'Tecnico'
		WHEN Bachillerato = 1 THEN 'Bachiller'
		--WHEN Primaria = 1 THEN 'PRIMARIA'
		ELSE 'Bachiller' END NivelEducativo
	
FROM Requisiciones_Entrevista E
LEFT JOIN Requisiciones_Contratacion C ON E.IdSolicitud = C.IdSolicitud AND C.CedulaCandidato = E.CedulaCandidato

```
