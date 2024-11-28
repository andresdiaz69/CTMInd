# View: vw_RepuestosVendedoresBonPorRepMM_2_Full

## Usa los objetos:
- [[vw_RepuestosVendedoresBonPorRepMM_2_Detalle_Full]]

```sql

CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorRepMM_2_Full]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, SUM(CumplimientoAl30_AL) AS CumplimientoAl30_AL, CodigoSede, NombreSede, MAX(Presupuesto) AS Presupuesto, MAX(CumplimientoAl30_AL_Sede) 
                         AS CumplimientoAl30_AL_Sede
FROM            dbo.vw_RepuestosVendedoresBonPorRepMM_2_Detalle_Full
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, CodigoSede, NombreSede


```
