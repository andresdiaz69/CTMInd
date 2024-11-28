# View: vw_Descargos_AlertaFueros

## Usa los objetos:
- [[Descargos_HistoricoSolicitud]]
- [[vw_Descargos_Estados]]
- [[vw_Descargos_Solicitudes]]

```sql
CREATE VIEW [dbo].[vw_Descargos_AlertaFueros] AS
SELECT	DISTINCT				Descargo.IdDescargo,		Descargo.IdEstado, 
	Descargo.NombreEstado,		Estados.EstadoUsuario,		FechaCambioEstado=Historico.FechaModificacion
FROM vw_Descargos_Solicitudes AS Descargo
LEFT JOIN (
	SELECT *
	FROM Descargos_HistoricoSolicitud
	WHERE IdEstado IN (20, 21)
) AS Historico ON Descargo.IdDescargo = Historico.IdSolicitud
				AND Descargo.IdEstado = Historico.IdEstado
INNER JOIN vw_Descargos_Estados AS Estados ON Descargo.IdEstado = Estados.IdEstado
WHERE Descargo.IdEstado IN (20, 21)

```
