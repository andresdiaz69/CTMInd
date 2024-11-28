# View: vw_ComercialVNPorPro_2

## Usa los objetos:
- [[vw_ComercialVNPorPro_1]]

```sql



CREATE VIEW [dbo].[vw_ComercialVNPorPro_2]
AS

-- NORMAL
SELECT DISTINCT Ano_Periodo, Mes_Periodo, Codigoempresa, MAX(Empresa) AS Empresa, CedulaVendedor, MAX(NombreVendedor) AS NombreVendedor, CodigoEmpleado, FechaRetiro, IdRangoMaestra, IdRangoVersionMax, 
NumerEntregas
FROM dbo.vw_ComercialVNPorPro_1
WHERE IdRangoMaestra <> 395
GROUP BY -- JCS: 10/05/2022 NECESARIO PARA EVITAR DUPLICIDAD PQ EL NOMBRE DEL VENDEDOR Y/O EMPRESA PUEDE CAMBIAR
Ano_Periodo, Mes_Periodo, Codigoempresa, CedulaVendedor, CodigoEmpleado, FechaRetiro, IdRangoMaestra, IdRangoVersionMax, 
NumerEntregas

UNION ALL

--RENAULT PRO PLUS
SELECT DISTINCT Ano_Periodo, Mes_Periodo, Codigoempresa, MAX(Empresa) AS Empresa, CedulaVendedor, MAX(NombreVendedor) AS NombreVendedor, CodigoEmpleado, FechaRetiro, IdRangoMaestra, IdRangoVersionMax, 
NumerEntregas_VehUtil AS NumerEntregas
FROM dbo.vw_ComercialVNPorPro_1
WHERE IdRangoMaestra = 395
GROUP BY -- JCS: 10/05/2022 NECESARIO PARA EVITAR DUPLICIDAD PQ EL NOMBRE DEL VENDEDOR Y/O EMPRESA PUEDE CAMBIAR
Ano_Periodo, Mes_Periodo, Codigoempresa, CedulaVendedor, CodigoEmpleado, FechaRetiro, IdRangoMaestra, IdRangoVersionMax, 
NumerEntregas_VehUtil


```
