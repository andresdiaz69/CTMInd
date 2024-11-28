# View: vw_SituacionesdeTrabajoyFechas

## Usa los objetos:
- [[Empresas]]
- [[spiga_TrabajosHistoricoSituacion]]

```sql


CREATE VIEW [dbo].[vw_SituacionesdeTrabajoyFechas] AS
SELECT a.CodEmpresa, b.NombreEmpresa, a.CodCentro, a.Centro, a.CodSeccion, a.Seccion, a.Placa, a.Marca, a.Gama, a.OT, a.NumTrabajo, a.DescipcionTrabajo, a.FechaAltaOT, 
	a.FechaAltaTrabajo, a.FechaPrevistaEntregaPrimera, a.FechaPrevistaEntrega, a.FechaEntrega, a.SituacionTrabajo, a.ObservacionesSituacionTrabajo, a.FechaAltaSituacionTrabajo,
	a.EquipoAltaSituacionTrabajo, a.EmpleadoAltaSituacionTrabajo, a.CodCliente, a.ClienteCargo, a.AsesorServicioResponsable, a.Nombre 

FROM	    PSCService_DB.dbo.spiga_TrabajosHistoricoSituacion AS a
INNER JOIN	Empresas AS b ON a.CodEmpresa = b.CodigoEmpresa

```
