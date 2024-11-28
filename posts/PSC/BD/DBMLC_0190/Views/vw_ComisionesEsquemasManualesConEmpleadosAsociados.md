# View: vw_ComisionesEsquemasManualesConEmpleadosAsociados

## Usa los objetos:
- [[ComisionesEsquemasManuales]]
- [[EmpleadosRangosManualesMaestras]]
- [[vw_ComisionesMaestrasManuales]]

```sql
CREATE VIEW [com].[vw_ComisionesEsquemasManualesConEmpleadosAsociados]
AS
select     a.IdEsquema,         NombreEsquema,           IdComisionModelo,   NombreModelo, 
		   IdUnidadNegocio,     NombreUnidadNegocio,     DiaCorte,           Activar,
		   cem.FechaCreacion,   cem.IdTipoEsquema
	from (select distinct IdEsquema,  NombreModelo, NombreUnidadNegocio
			from com.vw_ComisionesMaestrasManuales cmm
			inner join com.EmpleadosRangosManualesMaestras ermm on cmm.IdMaestra = ermm.IdRangoMaestra) a
			join com.ComisionesEsquemasManuales cem on cem.IdEsquema = a.IdEsquema


```
