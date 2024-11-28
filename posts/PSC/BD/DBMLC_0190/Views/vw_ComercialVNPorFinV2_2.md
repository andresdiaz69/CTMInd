# View: vw_ComercialVNPorFinV2_2

## Usa los objetos:
- [[Liquidaciones_ComercialVNPorCom]]

```sql



CREATE view [dbo].[vw_ComercialVNPorFinV2_2]
AS

SELECT        IdHistorico, IdLiquidacion, Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CedulaVendedor, CodigoEmpleado, NombreVendedor, Empleado, FechaRetiro, VehiculosRecaudados, ComisionRecaudo, IdRangoMaestra, 
                         IdComisionModeloSub
FROM            Liquidaciones_ComercialVNPorCom
WHERE        (IdComisionModeloSub IN (95, 96))


```
