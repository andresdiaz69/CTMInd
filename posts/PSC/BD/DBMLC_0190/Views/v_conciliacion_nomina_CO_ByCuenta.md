# View: v_conciliacion_nomina_CO_ByCuenta

## Usa los objetos:
- [[v_conciliacion_nomina_novasoft_ByCuenta]]
- [[v_conciliacion_nomina_spiga_ByCuenta]]

```sql





CREATE VIEW [dbo].[v_conciliacion_nomina_CO_ByCuenta]
AS
SELECT  

ISNULL(dbo.v_conciliacion_nomina_novasoft_ByCuenta.Ano_Periodo, dbo.v_conciliacion_nomina_spiga_ByCuenta.Ano_Periodo) AS Ano_Periodo, 
ISNULL(dbo.v_conciliacion_nomina_novasoft_ByCuenta.Mes_Periodo, dbo.v_conciliacion_nomina_spiga_ByCuenta.Mes_Periodo) AS Mes_Periodo, 
ISNULL(dbo.v_conciliacion_nomina_novasoft_ByCuenta.idEmpresas, dbo.v_conciliacion_nomina_spiga_ByCuenta.idEmpresas) AS idEmpresas, 
ISNULL(dbo.v_conciliacion_nomina_novasoft_ByCuenta.NombreEmpresa, dbo.v_conciliacion_nomina_spiga_ByCuenta.NombreEmpresa) AS NombreEmpresa, 
ISNULL(dbo.v_conciliacion_nomina_novasoft_ByCuenta.idCentros, dbo.v_conciliacion_nomina_spiga_ByCuenta.idCentros) AS idCentros, 
ISNULL(dbo.v_conciliacion_nomina_novasoft_ByCuenta.NombreCentro, dbo.v_conciliacion_nomina_spiga_ByCuenta.NombreCentro) AS NombreCentro, 
ISNULL(dbo.v_conciliacion_nomina_novasoft_ByCuenta.Cuenta, dbo.v_conciliacion_nomina_spiga_ByCuenta.Cuenta) AS Cuenta, 
ISNULL(dbo.v_conciliacion_nomina_novasoft_ByCuenta.NombreCuenta, dbo.v_conciliacion_nomina_spiga_ByCuenta.NombreCuenta) AS NombreCuenta, 

ISNULL(dbo.v_conciliacion_nomina_novasoft_ByCuenta.Saldo, 0) AS Saldo_Novasoft, 
ISNULL(dbo.v_conciliacion_nomina_spiga_ByCuenta.Saldo, 0) AS Saldo_Spiga, 
ISNULL(dbo.v_conciliacion_nomina_novasoft_ByCuenta.Saldo, 0) - ISNULL(dbo.v_conciliacion_nomina_spiga_ByCuenta.Saldo, 0) AS Diferencia

FROM    

dbo.v_conciliacion_nomina_novasoft_ByCuenta 
FULL OUTER JOIN
dbo.v_conciliacion_nomina_spiga_ByCuenta 

ON 

dbo.v_conciliacion_nomina_novasoft_ByCuenta.Ano_Periodo = dbo.v_conciliacion_nomina_spiga_ByCuenta.Ano_Periodo 
AND 
dbo.v_conciliacion_nomina_novasoft_ByCuenta.Mes_Periodo = dbo.v_conciliacion_nomina_spiga_ByCuenta.Mes_Periodo 
AND 
dbo.v_conciliacion_nomina_novasoft_ByCuenta.idEmpresas = dbo.v_conciliacion_nomina_spiga_ByCuenta.idEmpresas 
AND 
dbo.v_conciliacion_nomina_novasoft_ByCuenta.idCentros = dbo.v_conciliacion_nomina_spiga_ByCuenta.idCentros
AND 
dbo.v_conciliacion_nomina_novasoft_ByCuenta.Cuenta = dbo.v_conciliacion_nomina_spiga_ByCuenta.Cuenta


```
