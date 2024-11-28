# View: vw_ComercialVNPorPro_2_ORIGINAL

## Usa los objetos:
- [[vw_ComercialVNPorPro_1]]

```sql

CREATE VIEW [dbo].[vw_ComercialVNPorPro_2_ORIGINAL]
AS
SELECT DISTINCT Ano_Periodo, Mes_Periodo, Codigoempresa, Empresa, CedulaVendedor, NombreVendedor, CodigoEmpleado, FechaRetiro, IdRangoMaestra, IdRangoVersionMax, NumerEntregas
FROM            dbo.vw_ComercialVNPorPro_1


```
