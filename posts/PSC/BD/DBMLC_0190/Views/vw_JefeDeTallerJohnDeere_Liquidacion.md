# View: vw_JefeDeTallerJohnDeere_Liquidacion

## Usa los objetos:
- [[vw_EmpleadosDetalle]]
- [[vw_JefeDeTallerJohnDeere_11]]
- [[vw_JefeDeTallerJohnDeere_12]]

```sql
CREATE VIEW [dbo].[vw_JefeDeTallerJohnDeere_Liquidacion]
AS
SELECT        dbo.vw_JefeDeTallerJohnDeere_11.Ano_Periodo, dbo.vw_JefeDeTallerJohnDeere_11.Mes_Periodo, dbo.vw_JefeDeTallerJohnDeere_11.CodigoEmpresa, dbo.vw_JefeDeTallerJohnDeere_11.Empresa, 
                         dbo.vw_JefeDeTallerJohnDeere_12.CodigoEmpleado, dbo.vw_EmpleadosDetalle.Empleado, dbo.vw_EmpleadosDetalle.FechaRetiro, dbo.vw_JefeDeTallerJohnDeere_11.CodigoCentro, 
                         dbo.vw_JefeDeTallerJohnDeere_11.Centro, dbo.vw_JefeDeTallerJohnDeere_11.ValorNeto, dbo.vw_JefeDeTallerJohnDeere_11.ValorVariable, dbo.vw_JefeDeTallerJohnDeere_11.Comision, 
                         dbo.vw_JefeDeTallerJohnDeere_12.IdRangoMaestra, dbo.vw_JefeDeTallerJohnDeere_12.IdRangoVersionMax, dbo.vw_JefeDeTallerJohnDeere_12.IdComisionModeloSub, 
                         dbo.vw_JefeDeTallerJohnDeere_12.IdComisionModeloSubCriterio, 0 AS IdLiquidacion, 0 AS IdHistorico, GETDATE() AS FechaLiquidacion
FROM            dbo.vw_JefeDeTallerJohnDeere_11 INNER JOIN
                         dbo.vw_JefeDeTallerJohnDeere_12 ON dbo.vw_JefeDeTallerJohnDeere_11.CodigoCentro = dbo.vw_JefeDeTallerJohnDeere_12.CodigoCentro INNER JOIN
                         dbo.vw_EmpleadosDetalle ON dbo.vw_JefeDeTallerJohnDeere_12.CodigoEmpleado = dbo.vw_EmpleadosDetalle.CodigoEmpleado

```
