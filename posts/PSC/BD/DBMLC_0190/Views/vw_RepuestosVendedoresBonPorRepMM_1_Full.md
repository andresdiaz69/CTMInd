# View: vw_RepuestosVendedoresBonPorRepMM_1_Full

## Usa los objetos:
- [[vw_RepuestosVendedoresBonPorRepMM_1_Detalle_Full]]

```sql

CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorRepMM_1_Full]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, SUM(CumplimientoAl30_OT) AS CumplimientoAl30_OT, CodigoSede, NombreSede, MAX(Presupuesto) AS Presupuesto, MAX(CumplimientoAl30_OT_Sede) 
                         AS CumplimientoAl30_OT_Sede
FROM            dbo.vw_RepuestosVendedoresBonPorRepMM_1_Detalle_Full
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, CodigoSede, NombreSede


```
