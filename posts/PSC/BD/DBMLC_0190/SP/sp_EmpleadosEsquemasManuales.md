# Stored Procedure: sp_EmpleadosEsquemasManuales

## Usa los objetos:
- [[EmpleadosRangosManualesMaestras]]
- [[vw_ComisionesCargosEsquemasManuales]]
- [[vw_ComisionesMaestrasManuales]]
- [[vw_EmpleadosActivosRangosMaestras]]

```sql
CREATE PROCEDURE com.sp_EmpleadosEsquemasManuales
    @IdEsquema int
AS   
    SELECT 
	erm.CodigoEmpleado,		e.Apellido1,		 e.Apellido2,		   e.Nombres, 
	CONCAT(e.Nombres, ' ',  e.Apellido1, ' ',    e.Apellido2)  AS      NombreEmpleadoCompleto,
	rmm.IdEsquema,          rmm.NombreEsquema,   erm.IdRangoMaestra,   rmm.NombreMaestra,   
	rmm.NombreCriterio,		rmm.IdTipoMaestra,   erm.Comentarios,	   e.FechaRetiro,      e.CodigoCargo,
	CASE WHEN ccem.CodigoCargo = e.CodigoCargo THEN 1 ELSE 0 END CargoInconsistente

		FROM com.EmpleadosRangosManualesMaestras erm  
		join com.vw_ComisionesMaestrasManuales AS rmm ON rmm.IdMaestra = erm.IdRangoMaestra
		--join Empleados as e on e.CodigoEmpleado = erm.CodigoEmpleado
		join vw_EmpleadosActivosRangosMaestras AS e ON e.CodigoEmpleado = erm.CodigoEmpleado
		join com.vw_ComisionesCargosEsquemasManuales AS ccem ON ccem.IdEsquema = rmm.IdEsquema

    WHERE rmm.IdEsquema = @IdEsquema AND erm.Comentarios = 'ACTIVO';  

```
