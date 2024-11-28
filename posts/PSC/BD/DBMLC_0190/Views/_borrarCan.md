# View: _borrarCan

## Usa los objetos:
- [[Requisiciones_Candidatos]]
- [[Requisiciones_SolicitudesCandidatos]]

```sql
CREATE VIEW dbo._borrarCan
AS
SELECT        dbo.Requisiciones_SolicitudesCandidatos.IdSolicitud, dbo.Requisiciones_SolicitudesCandidatos.Cedula AS Cedula_AsosiadaALaSolicitud, dbo.Requisiciones_SolicitudesCandidatos.IdEstadoCandidato, 
                         dbo.Requisiciones_SolicitudesCandidatos.OrdenSeleccion, dbo.Requisiciones_Candidatos.Cedula AS Cedula_Cantidato, dbo.Requisiciones_Candidatos.Nombres, dbo.Requisiciones_Candidatos.Apellido1, 
                         dbo.Requisiciones_Candidatos.Apellido2
FROM            dbo.Requisiciones_SolicitudesCandidatos FULL OUTER JOIN
                         dbo.Requisiciones_Candidatos ON dbo.Requisiciones_SolicitudesCandidatos.Cedula = dbo.Requisiciones_Candidatos.Cedula

```
