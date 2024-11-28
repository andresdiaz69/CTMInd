# View: vw_RepuestosVendedoresBonPorRepMM_4_Full

## Usa los objetos:
- [[vw_RepuestosVendedoresBonPorRepMM_4_Detalle_Full]]

```sql

CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorRepMM_4_Full]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, SUM(CumplimientoAl15_AL) AS CumplimientoAl15_AL, CodigoSede, NombreSede, MAX(Presupuesto) AS Presupuesto, MAX(CumplimientoAl15_AL_Sede) 
                         AS CumplimientoAl15_AL_Sede
FROM            dbo.vw_RepuestosVendedoresBonPorRepMM_4_Detalle_Full
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, CodigoSede, NombreSede


```
