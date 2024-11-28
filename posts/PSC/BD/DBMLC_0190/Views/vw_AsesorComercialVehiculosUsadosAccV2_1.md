# View: vw_AsesorComercialVehiculosUsadosAccV2_1

## Usa los objetos:
- [[vw_AsesorComercialVehiculosUsadosAccV2_1_Detalle]]

```sql






CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsadosAccV2_1]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, SUM(ValorNetoMostrador) AS ValorNetoMostrador, SUM(BonificacionMostrador) AS BonificacionMostrador, MAX(ValorVariable) AS ValorVariable
FROM            dbo.vw_AsesorComercialVehiculosUsadosAccV2_1_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos



```
