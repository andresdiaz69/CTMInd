# View: vw_RepuestosVendedoresBonPorRepMM_3

## Usa los objetos:
- [[vw_RepuestosVendedoresBonPorRepMM_3_Detalle]]

```sql
CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorRepMM_3]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, SUM(CumplimientoAl15_OT) AS CumplimientoAl15_OT, CodigoSede, NombreSede, MAX(Presupuesto) AS Presupuesto, MAX(CumplimientoAl15_OT_Sede) 
                         AS CumplimientoAl15_OT_Sede
FROM            dbo.vw_RepuestosVendedoresBonPorRepMM_3_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, CodigoSede, NombreSede


```
