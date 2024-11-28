# View: vw_ComisionesManualesLiquidacionesDetalles

## Usa los objetos:
- [[ComisionesManualesMaestrasTipos]]
- [[RangosManualesVersiones]]
- [[vw_ComisionesMaestrasManuales]]
- [[vw_ComisionesManualesEmpleados]]
- [[vw_ComisionesManualesLiquidaciones]]

```sql


CREATE VIEW [com].[vw_ComisionesManualesLiquidacionesDetalles]
AS
SELECT  cml.IdConsecutivo, 
		Ano_Periodo, Mes_Periodo, cml.CodigoEmpleado, cme.NombreEmpleado, cme.CodigoCargo, cme.NombreCargo,
		cmm.IdEsquema, cmm.NombreEsquema, cmm.IdComisionModelo, cmm.NombreModelo, cmm.IdUnidadNegocio, 
		cmm.NombreUnidadNegocio, cmm.DiaCorte, cmm.IdCriterio, cmm.NombreCriterio, cmm.IdCriterio2, 
		cmm.NombreCriterio2, cml.IdRangoMaestra, cmm.NombreMaestra, cml.IdTipoMaestra, cmmt.NombreTipoMaestra, 
		cmm.CodigoConcepto, cml.IdRangoVersion, rmv.ConsecutivoVersion, cml.IdDetalle,	cml.ValorNovedadCriterio1, 
		cml.DesdeCriterio1, cml.HastaCriterio1, cml.ValorNovedadCriterio2, cml.DesdeCriterio2, 
		cml.HastaCriterio2, cml.Comision, cmm.Activa, cmm.Activar, cme.FechaRetiro

FROM com.vw_ComisionesManualesLiquidaciones as cml 
  join com.vw_ComisionesManualesEmpleados cme on cme.CodigoEmpleado = cml.CodigoEmpleado
  join com.vw_ComisionesMaestrasManuales cmm on cmm.IdMaestra = cml.IdRangoMaestra
  join com.RangosManualesVersiones rmv on rmv.IdRangoVersion = cml.IdRangoVersion
  join com.ComisionesManualesMaestrasTipos cmmt on cmmt.IdTipoMaestra = cml.IdTipoMaestra

```
