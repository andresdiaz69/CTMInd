# View: vw_RepuestosV2_Bolsas_Vendedores_4

## Usa los objetos:
- [[EmpleadosRangosMaestras]]
- [[vw_RangosVersionesMaxSub]]
- [[vw_RepuestosV2_Bolsas_Vendedores_3]]

```sql








CREATE VIEW [dbo].[vw_RepuestosV2_Bolsas_Vendedores_4]
AS
SELECT        dbo.vw_RepuestosV2_Bolsas_Vendedores_3.Ano_Periodo, dbo.vw_RepuestosV2_Bolsas_Vendedores_3.Mes_Periodo, dbo.vw_RepuestosV2_Bolsas_Vendedores_3.CodigoEmpresa, 
                         dbo.vw_RepuestosV2_Bolsas_Vendedores_3.CedulaVendedorRepuestos, dbo.vw_RepuestosV2_Bolsas_Vendedores_3.CodigoEmpleado, dbo.vw_RepuestosV2_Bolsas_Vendedores_3.Empleado, 
                         dbo.vw_RepuestosV2_Bolsas_Vendedores_3.FechaRetiro, dbo.vw_RepuestosV2_Bolsas_Vendedores_3.ValorBaseComision, dbo.vw_RepuestosV2_Bolsas_Vendedores_3.ValorBaseTotal, 
                         dbo.vw_RepuestosV2_Bolsas_Vendedores_3.CodigoCentro, dbo.vw_RepuestosV2_Bolsas_Vendedores_3.NombreCentro, dbo.vw_RepuestosV2_Bolsas_Vendedores_3.cod_marca, 
                         dbo.vw_RepuestosV2_Bolsas_Vendedores_3.nombre_marca, dbo.vw_RepuestosV2_Bolsas_Vendedores_3.CodigoCargo, dbo.vw_RepuestosV2_Bolsas_Vendedores_3.NombreCargo, 
                         dbo.vw_RepuestosV2_Bolsas_Vendedores_3.Participacion, dbo.vw_RepuestosV2_Bolsas_Vendedores_3.ValorBolsa, dbo.vw_RepuestosV2_Bolsas_Vendedores_3.Faltantes, 
                         dbo.vw_RepuestosV2_Bolsas_Vendedores_3.PesoBolsaVendedor, dbo.vw_RepuestosV2_Bolsas_Vendedores_3.TopeMaximoBolsa, dbo.vw_RepuestosV2_Bolsas_Vendedores_3.ValorBolsaVendedor, 
                         dbo.vw_RepuestosV2_Bolsas_Vendedores_3.Comision, dbo.vw_RangosVersionesMaxSub.IdRangoMaestra, dbo.vw_RangosVersionesMaxSub.IdRangoVersionMax, dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub, 
                         dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio
FROM            dbo.EmpleadosRangosMaestras INNER JOIN
                         dbo.vw_RangosVersionesMaxSub ON dbo.EmpleadosRangosMaestras.IdRangoMaestra = dbo.vw_RangosVersionesMaxSub.IdRangoMaestra RIGHT OUTER JOIN
                         dbo.vw_RepuestosV2_Bolsas_Vendedores_3 ON dbo.EmpleadosRangosMaestras.CodigoEmpleado = dbo.vw_RepuestosV2_Bolsas_Vendedores_3.CodigoEmpleado

-- JCS: 2022/07/07 EN PRO DEL PERFORMANCE (ES UNA DOBLE VALIDACIÓN), SE VALIDA TAMBIÉN EN vw_RepuestosV2_Bolsas_Vendedores_Liquidacion
--WHERE 
--(dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 61 AND dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 107) 
--OR
--(dbo.vw_RangosVersionesMaxSub.IdComisionModeloSub = 62 AND dbo.vw_RangosVersionesMaxSub.IdComisionModeloSubCriterio = 113)


```
