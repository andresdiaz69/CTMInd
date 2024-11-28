# View: v_conciliacion_nomina_spiga_ByCentro

## Usa los objetos:
- [[v_conciliacion_nomina_spiga_CO]]

```sql


CREATE VIEW [dbo].[v_conciliacion_nomina_spiga_ByCentro]
AS
SELECT        Ano_Periodo, Mes_Periodo, idEmpresas, NombreEmpresa, idCentros, NombreCentro, SUM(Saldo) AS Saldo
FROM            dbo.v_conciliacion_nomina_spiga_CO
GROUP BY Ano_Periodo, Mes_Periodo, idEmpresas, NombreEmpresa, idCentros, NombreCentro

```
