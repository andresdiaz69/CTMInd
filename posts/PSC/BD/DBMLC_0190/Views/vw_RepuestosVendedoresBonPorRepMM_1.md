# View: vw_RepuestosVendedoresBonPorRepMM_1

## Usa los objetos:
- [[vw_RepuestosVendedoresBonPorRepMM_1_Detalle]]

```sql
CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorRepMM_1]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, SUM(CumplimientoAl30_OT) AS CumplimientoAl30_OT, CodigoSede, NombreSede, MAX(Presupuesto) AS Presupuesto, MAX(CumplimientoAl30_OT_Sede) 
                         AS CumplimientoAl30_OT_Sede
FROM            dbo.vw_RepuestosVendedoresBonPorRepMM_1_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, CodigoSede, NombreSede


```
