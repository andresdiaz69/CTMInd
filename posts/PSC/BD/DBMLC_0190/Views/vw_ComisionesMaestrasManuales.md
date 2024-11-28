# View: vw_ComisionesMaestrasManuales

## Usa los objetos:
- [[ComisionesConceptos]]
- [[ComisionesCriteriosManuales]]
- [[ComisionesMaestrasManuales]]
- [[ComisionesManualesMaestrasTipos]]
- [[vw_ComisionesEsquemasManuales]]

```sql
CREATE VIEW [com].[vw_ComisionesMaestrasManuales]

as select ISNULL(CAST((ROW_NUMBER() OVER (ORDER BY cmm.IdMaestra)) AS INT), 0) AS Id, 
		cmm.IdEsquema,               cem.NombreEsquema,            cmm.IdTipoMaestra,         
		cmmt.NombreTipoMaestra,      cmm.IdMaestra,                cmm.NombreMaestra,           
		cmm.IdCriterio,              ccm.NombreCriterio,           cmm.IdCriterio2,            
		ccm2.NombreCriterio          NombreCriterio2,              cem.IdComisionModelo,         
		cem.CodigoModelo,            cem.NombreModelo,             cem.DiaCorte,                 
		cem.IdUnidadNegocio,         cem.NombreUnidadNegocio,      cmm.UnidadDeMedidaEscala,     
		cmm.UnidadDeMedidaEscala2,   cmm.UnidadDeMedidaValor,      cmm.CodigoConcepto,          
		CONCAT(cmc.CodigoConcepto,'-',cmc.NombreConcepto) NombreConcepto,
		cmm.CodigoConceptoAux,       cem.Activar, cmm.Activa,      cem.IdTipoEsquema
from com.ComisionesMaestrasManuales as cmm
join com.vw_ComisionesEsquemasManuales as cem on  cem.IdEsquema = cmm.IdEsquema
join com.ComisionesCriteriosManuales as ccm on ccm.IdCriterio = cmm.IdCriterio 
left join com.ComisionesCriteriosManuales as ccm2 on ccm2.IdCriterio = cmm.IdCriterio2
join ComisionesConceptos as cmc on cmc.CodigoConcepto = cmm.CodigoConcepto
join com.ComisionesManualesMaestrasTipos as cmmt on cmmt.IdTipoMaestra = cmm.IdTipoMaestra

```
