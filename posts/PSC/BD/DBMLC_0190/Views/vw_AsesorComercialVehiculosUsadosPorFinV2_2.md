# View: vw_AsesorComercialVehiculosUsadosPorFinV2_2

## Usa los objetos:
- [[Liquidaciones_AsesorComercialVehiculosUsados]]

```sql







CREATE view [dbo].[vw_AsesorComercialVehiculosUsadosPorFinV2_2]
AS

SELECT        IdHistorico, IdLiquidacion, Ano_Periodo, Mes_Periodo, CodigoEmpresa, NombreEmpresa AS Empresa, CodigoEmpleado AS CedulaVendedor, CodigoEmpleado, Empleado AS NombreVendedor, Empleado, FechaRetiro, CantidadEntregas AS VehiculosRecaudados, Valor_ComisionEntregas AS ComisionRecaudo, 0 AS IdRangoMaestra, 
                         IdComisionModeloSub
FROM            Liquidaciones_AsesorComercialVehiculosUsados
WHERE        (IdComisionModeloSub IN (99))


```
