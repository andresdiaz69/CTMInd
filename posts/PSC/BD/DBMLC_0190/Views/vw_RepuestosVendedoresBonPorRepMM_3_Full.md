# View: vw_RepuestosVendedoresBonPorRepMM_3_Full

## Usa los objetos:
- [[vw_RepuestosVendedoresBonPorRepMM_3_Detalle_Full]]

```sql

CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorRepMM_3_Full]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, SUM(CumplimientoAl15_OT) AS CumplimientoAl15_OT, CodigoSede, NombreSede, MAX(Presupuesto) AS Presupuesto, MAX(CumplimientoAl15_OT_Sede) 
                         AS CumplimientoAl15_OT_Sede
FROM            dbo.vw_RepuestosVendedoresBonPorRepMM_3_Detalle_Full
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, CodigoSede, NombreSede


```
