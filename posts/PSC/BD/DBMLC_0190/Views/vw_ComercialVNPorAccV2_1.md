# View: vw_ComercialVNPorAccV2_1

## Usa los objetos:
- [[vw_ComercialVNPorAccV2_1_Detalle]]

```sql



CREATE VIEW [dbo].[vw_ComercialVNPorAccV2_1]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, SUM(ValorNetoMostrador) AS ValorNetoMostrador, SUM(BonificacionMostrador) AS BonificacionMostrador, MAX(ValorVariableCT) AS ValorVariableCT, 
                         MAX(ValorVariableMM) AS ValorVariableMM
FROM            dbo.vw_ComercialVNPorAccV2_1_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos



```
