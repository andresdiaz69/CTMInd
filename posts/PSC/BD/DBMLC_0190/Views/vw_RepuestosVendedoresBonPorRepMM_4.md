# View: vw_RepuestosVendedoresBonPorRepMM_4

## Usa los objetos:
- [[vw_RepuestosVendedoresBonPorRepMM_4_Detalle]]

```sql
CREATE VIEW [dbo].[vw_RepuestosVendedoresBonPorRepMM_4]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, SUM(CumplimientoAl15_AL) AS CumplimientoAl15_AL, CodigoSede, NombreSede, MAX(Presupuesto) AS Presupuesto, MAX(CumplimientoAl15_AL_Sede) 
                         AS CumplimientoAl15_AL_Sede
FROM            dbo.vw_RepuestosVendedoresBonPorRepMM_4_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, CodigoSede, NombreSede


```
