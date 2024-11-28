# View: vw_ComisionesMaestrasManualesConDetalles

## Usa los objetos:
- [[HitosManualesDetalles]]
- [[MatricesManualesDetalles]]
- [[RangosManualesDetalles]]
- [[RangosManualesVersiones]]
- [[VariablesManualesDetalles]]
- [[vw_ComisionesMaestrasManuales]]

```sql



/**** alter view ****/

CREATE VIEW [com].[vw_ComisionesMaestrasManualesConDetalles]
AS

select ISNULL(CAST((ROW_NUMBER() OVER (ORDER BY cm.IdMaestra)) AS INT), 0) AS Id, 
cm.IdEsquema,            cm.NombreEsquema,        cm.IdTipoMaestra,         cm.NombreTipoMaestra,    cm.IdMaestra, 
cm.NombreMaestra,        cm.IdCriterio,           cm.NombreCriterio,        cm.IdCriterio2,          cm.NombreCriterio2,
cm.IdComisionModelo,     cm.CodigoModelo,         cm.NombreModelo,          cm.DiaCorte,             cm.IdUnidadNegocio,  
cm.NombreUnidadNegocio,  cm.UnidadDeMedidaEscala, cm.UnidadDeMedidaEscala2, cm.UnidadDeMedidaValor,  cm.CodigoConcepto,   
cm.NombreConcepto,       cm.CodigoConceptoAux,    cm.Activar,   cm.Activa

from (
	select distinct cmm.* from com.vw_ComisionesMaestrasManuales cmm
		join com.RangosManualesVersiones rmv       on rmv.IdRangoMaestra = cmm.IdMaestra
		right join com.RangosManualesDetalles rmd  on rmd.IdRangoVersion = rmv.IdRangoVersion 
	UNION 
	select distinct cmm.* from com.vw_ComisionesMaestrasManuales cmm
		join com.RangosManualesVersiones rmv          on rmv.IdRangoMaestra = cmm.IdMaestra
		right join com.VariablesManualesDetalles vmd  on vmd.IdVariableVersion = rmv.IdRangoVersion
	UNION
	select distinct cmm.* from com.vw_ComisionesMaestrasManuales cmm
		join com.RangosManualesVersiones rmv      on rmv.IdRangoMaestra = cmm.IdMaestra
		right join com.HitosManualesDetalles hmd  on hmd.IdHitoVersion = rmv.IdRangoVersion 
	UNION
	select distinct cmm.* from com.vw_ComisionesMaestrasManuales cmm
		join com.RangosManualesVersiones rmv         on rmv.IdRangoMaestra = cmm.IdMaestra
		right join com.MatricesManualesDetalles mmd  on mmd.IdRangoVersion = rmv.IdRangoVersion ) cm

```
