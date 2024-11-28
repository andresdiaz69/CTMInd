# View: vw_SecretariaComercialRenault_Liquidacion

## Usa los objetos:
- [[vw_EmpleadosDetalle]]
- [[vw_SecretariaComercialRenault_11]]

```sql



CREATE VIEW [dbo].[vw_SecretariaComercialRenault_Liquidacion]
AS

SELECT vw_SecretariaComercialRenault_11.Ano_Periodo, vw_SecretariaComercialRenault_11.Mes_Periodo, vw_SecretariaComercialRenault_11.CodigoEmpleado, vw_EmpleadosDetalle.Empleado,
vw_EmpleadosDetalle.CodigoEmpresa, vw_EmpleadosDetalle.NombreEmpresa, vw_SecretariaComercialRenault_11.CodigoCentro, vw_SecretariaComercialRenault_11.Centro,vw_EmpleadosDetalle.FechaRetiro, vw_SecretariaComercialRenault_11.EntregaEfectiva, vw_SecretariaComercialRenault_11.Desde, vw_SecretariaComercialRenault_11.Hasta, (vw_SecretariaComercialRenault_11.Valor)Comision,
vw_SecretariaComercialRenault_11.IdComisionModeloSub, vw_SecretariaComercialRenault_11.IdComisionModeloSubCriterio,vw_SecretariaComercialRenault_11.IdRangoMaestra, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM vw_SecretariaComercialRenault_11
INNER JOIN vw_EmpleadosDetalle ON vw_SecretariaComercialRenault_11.CodigoEmpleado = vw_EmpleadosDetalle.CodigoEmpleado


```
