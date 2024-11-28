# View: v_conciliacion_nomina_novasoft_CO

## Usa los objetos:
- [[v_conciliacion_nomina_novasoft]]

```sql











CREATE VIEW [dbo].[v_conciliacion_nomina_novasoft_CO]
AS
SELECT        

ISNULL(CAST(ano_Doc AS int),0) AS Ano_Periodo, 
ISNULL(CAST(per_doc AS int),0) AS Mes_Periodo, 
ISNULL(CAST(CodigoCompania AS smallint),0) AS idEmpresas, 
CAST(NombreCompania AS nvarchar(255)) AS NombreEmpresa, 
ISNULL(CAST(CodigoCentro AS smallint), 0) AS idCentros, 
CAST(NombreCentro AS nvarchar(255)) AS NombreCentro, 
ISNULL(CAST(Cuenta AS bigint), 0) AS Cuenta,
CAST(NombreCuenta AS nvarchar(255)) AS NombreCuenta,
CAST((ISNULL(Debito, 0) - ISNULL(Credito, 0)) AS decimal(38,14)) AS Saldo

FROM dbo.v_conciliacion_nomina_novasoft

```
