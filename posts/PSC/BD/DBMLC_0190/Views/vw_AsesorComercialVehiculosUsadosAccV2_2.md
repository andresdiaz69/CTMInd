# View: vw_AsesorComercialVehiculosUsadosAccV2_2

## Usa los objetos:
- [[vw_AsesorComercialVehiculosUsadosAccV2_2_Detalle]]

```sql






CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsadosAccV2_2]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos, SUM(ValorNetoTaller) AS ValorNetoTaller, SUM(BonificacionTaller) AS BonificacionTaller, MAX(ValorVariable) AS ValorVariable
FROM            dbo.vw_AsesorComercialVehiculosUsadosAccV2_2_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaVendedorRepuestos



```
