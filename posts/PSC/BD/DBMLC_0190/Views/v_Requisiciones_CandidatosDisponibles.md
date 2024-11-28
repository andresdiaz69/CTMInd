# View: v_Requisiciones_CandidatosDisponibles

## Usa los objetos:
- [[Requisiciones_Candidatos]]
- [[Requisiciones_Solicitudes]]
- [[Requisiciones_SolicitudesCandidatos]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_CandidatosDisponibles] AS
SELECT	DISTINCT		IdSolicitud,			IdEstado,			CodigoCargo,			IdEstadoCandidato, 
		Cedula,			Nombres,				Apellido1,			Apellido2,				NombreCompleto		
FROM (
	SELECT	db.IdSolicitud,			db.IdEstado,			db.CodigoCargo,			db2.IdEstadoCandidato, 		
		db3.Nombres,				db3.Apellido1,			db3.Apellido2,			CONVERT(BIGINT,ISNULL(db3.Cedula, 0))Cedula, 
		NombreCompleto = REPLACE(REPLACE(REPLACE(db3.Nombres + ' ' + db3.Apellido1 + ' ' + db3.Apellido2,' ','<>'),'><',''),'<>',' '), 
		CASE WHEN db4.Cedula IS NOT NULL THEN 1 ELSE 0 END Existe
	FROM Requisiciones_Solicitudes db
	
	INNER JOIN Requisiciones_SolicitudesCandidatos db2 ON db2.IdSolicitud = db.IdSolicitud
	
	INNER JOIN Requisiciones_Candidatos db3 ON db3.Cedula = db2.Cedula
	
	LEFT JOIN (
		SELECT DISTINCT Cedula FROM Requisiciones_SolicitudesCandidatos WHERE IdEstadoCandidato = 8) db4 ON db2.Cedula = db4.Cedula
	
	WHERE db.IdEstado IN (7, 8, 9, 12) AND db2.IdEstadoCandidato NOT IN (5, 8) 
) A
WHERE Existe = 0

```
