# View: v_conciliacion_nomina_spiga_ByCuenta

## Usa los objetos:
- [[v_conciliacion_nomina_spiga_CO]]

```sql



CREATE VIEW [dbo].[v_conciliacion_nomina_spiga_ByCuenta]
AS
SELECT        Ano_Periodo, Mes_Periodo, idEmpresas, NombreEmpresa, idCentros, NombreCentro, Cuenta, NombreCuenta, SUM(Saldo) AS Saldo
FROM            dbo.v_conciliacion_nomina_spiga_CO
GROUP BY Ano_Periodo, Mes_Periodo, idEmpresas, NombreEmpresa, idCentros, NombreCentro, Cuenta, NombreCuenta

```
