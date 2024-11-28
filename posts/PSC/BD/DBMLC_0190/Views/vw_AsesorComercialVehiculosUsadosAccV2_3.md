# View: vw_AsesorComercialVehiculosUsadosAccV2_3

## Usa los objetos:
- [[vw_AsesorComercialVehiculosUsadosAccV2_1]]
- [[vw_AsesorComercialVehiculosUsadosAccV2_2]]

```sql








CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsadosAccV2_3]
AS
SELECT        ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAccV2_1.Ano_Periodo, dbo.vw_AsesorComercialVehiculosUsadosAccV2_2.Ano_Periodo) AS Ano_Periodo, ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAccV2_1.Mes_Periodo, 
                         dbo.vw_AsesorComercialVehiculosUsadosAccV2_2.Mes_Periodo) AS Mes_Periodo, ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAccV2_1.CodigoEmpresa, dbo.vw_AsesorComercialVehiculosUsadosAccV2_2.CodigoEmpresa) 
                         AS CodigoEmpresa, ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAccV2_1.CedulaVendedorRepuestos, dbo.vw_AsesorComercialVehiculosUsadosAccV2_2.CedulaVendedorRepuestos) AS CedulaVendedorRepuestos, 
                         ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAccV2_1.ValorVariable, dbo.vw_AsesorComercialVehiculosUsadosAccV2_2.ValorVariable) AS ValorVariable,  
                         ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAccV2_1.ValorNetoMostrador, 0) AS ValorNetoMostrador, ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAccV2_1.BonificacionMostrador, 0) AS BonificacionMostrador, 
                         ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAccV2_2.ValorNetoTaller, 0) AS ValorNetoTaller, ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAccV2_2.BonificacionTaller, 0) AS BonificacionTaller, 
                         ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAccV2_1.BonificacionMostrador, 0) + ISNULL(dbo.vw_AsesorComercialVehiculosUsadosAccV2_2.BonificacionTaller, 0) AS BonificacionTotal
FROM            dbo.vw_AsesorComercialVehiculosUsadosAccV2_1 FULL OUTER JOIN
                         dbo.vw_AsesorComercialVehiculosUsadosAccV2_2 ON dbo.vw_AsesorComercialVehiculosUsadosAccV2_1.Ano_Periodo = dbo.vw_AsesorComercialVehiculosUsadosAccV2_2.Ano_Periodo AND 
                         dbo.vw_AsesorComercialVehiculosUsadosAccV2_1.Mes_Periodo = dbo.vw_AsesorComercialVehiculosUsadosAccV2_2.Mes_Periodo AND 
                         dbo.vw_AsesorComercialVehiculosUsadosAccV2_1.CodigoEmpresa = dbo.vw_AsesorComercialVehiculosUsadosAccV2_2.CodigoEmpresa AND 
                         dbo.vw_AsesorComercialVehiculosUsadosAccV2_1.CedulaVendedorRepuestos = dbo.vw_AsesorComercialVehiculosUsadosAccV2_2.CedulaVendedorRepuestos







```
