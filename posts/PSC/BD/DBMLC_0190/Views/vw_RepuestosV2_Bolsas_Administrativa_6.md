# View: vw_RepuestosV2_Bolsas_Administrativa_6

## Usa los objetos:
- [[EmpleadosRangosMaestras]]
- [[vw_RangosVersionesMaxSub]]
- [[vw_RepuestosV2_Bolsas_Administrativa_5]]

```sql

CREATE VIEW [dbo].[vw_RepuestosV2_Bolsas_Administrativa_6]
AS
SELECT        dbo.vw_RepuestosV2_Bolsas_Administrativa_5.Ano_Periodo, dbo.vw_RepuestosV2_Bolsas_Administrativa_5.Mes_Periodo, dbo.vw_RepuestosV2_Bolsas_Administrativa_5.CodigoEmpleado, dbo.vw_RepuestosV2_Bolsas_Administrativa_5.CedulaVendedorRepuestos, 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_5.Empleado, dbo.vw_RepuestosV2_Bolsas_Administrativa_5.FechaRetiro, dbo.vw_RepuestosV2_Bolsas_Administrativa_5.CodigoEmpresa, dbo.vw_RepuestosV2_Bolsas_Administrativa_5.NombreEmpresa, 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_5.CodigoCargo, dbo.vw_RepuestosV2_Bolsas_Administrativa_5.NombreCargo, dbo.vw_RepuestosV2_Bolsas_Administrativa_5.cod_marca, 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_5.nombre_marca, dbo.vw_RepuestosV2_Bolsas_Administrativa_5.CodigoCentro, dbo.vw_RepuestosV2_Bolsas_Administrativa_5.NombreCentro, 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_5.CantidadEmpleados, dbo.vw_RepuestosV2_Bolsas_Administrativa_5.TopeMaximoBolsa, dbo.vw_RepuestosV2_Bolsas_Administrativa_5.PesoAsignadoBolsa, 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_5.PesoTotal, dbo.vw_RepuestosV2_Bolsas_Administrativa_5.PesoTotalConsolidado, dbo.vw_RepuestosV2_Bolsas_Administrativa_5.Distribucion, 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_5.ValorBolsa, dbo.vw_RepuestosV2_Bolsas_Administrativa_5.Faltantes, dbo.vw_RepuestosV2_Bolsas_Administrativa_5.PesoBolsaOtroCargo, 
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_5.ValorBolsaOtroCargo, dbo.vw_RepuestosV2_Bolsas_Administrativa_5.Comision, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, 
                         dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
FROM            dbo.vw_RangosVersionesMaxSub INNER JOIN
                         dbo.EmpleadosRangosMaestras ON dbo.vw_RangosVersionesMaxSub.IdRangoMaestra = dbo.EmpleadosRangosMaestras.IdRangoMaestra RIGHT OUTER JOIN
                         dbo.vw_RepuestosV2_Bolsas_Administrativa_5 ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.vw_RepuestosV2_Bolsas_Administrativa_5.CodigoEmpleado
WHERE        (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 61) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 108) OR
                         (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 62) AND (dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 114)

```
