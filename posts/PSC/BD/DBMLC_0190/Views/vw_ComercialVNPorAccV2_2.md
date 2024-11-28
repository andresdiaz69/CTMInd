# View: vw_ComercialVNPorAccV2_2

## Usa los objetos:
- [[vw_ComercialVNPorAccV2_2_Detalle]]

```sql




CREATE VIEW [dbo].[vw_ComercialVNPorAccV2_2]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, SUM(ValorNetoTaller) AS ValorNetoTaller, SUM(BonificacionTaller) AS BonificacionTaller, MAX(ValorVariableCT) AS ValorVariableCT, 
                         MAX(ValorVariableMM) AS ValorVariableMM
FROM            dbo.vw_ComercialVNPorAccV2_2_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos



```
