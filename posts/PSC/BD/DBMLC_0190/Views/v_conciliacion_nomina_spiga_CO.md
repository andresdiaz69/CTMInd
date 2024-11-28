# View: v_conciliacion_nomina_spiga_CO

## Usa los objetos:
- [[v_conciliacion_nomina_spiga]]

```sql










CREATE VIEW [dbo].[v_conciliacion_nomina_spiga_CO]
AS
SELECT        

ISNULL(YEAR(FechaAsiento), 0) AS Ano_Periodo, 
ISNULL(MONTH(FechaAsiento), 0) AS Mes_Periodo, 
idEmpresas, 
NombreEmpresa, 
ISNULL(CAST(Centro AS smallint), 0) AS idCentros, 
CAST(NombreCentro AS nvarchar(255)) AS NombreCentro, 
ISNULL(CAST(cuenta AS bigint), 0) AS Cuenta,
CAST(NombreCuenta AS nvarchar(255)) AS NombreCuenta,
(ISNULL(Debe, 0) - ISNULL(Haber, 0)) AS Saldo

FROM dbo.v_conciliacion_nomina_spiga

```
