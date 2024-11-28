# View: v_conciliacion_nomina_novasoft_ByCentro

## Usa los objetos:
- [[v_conciliacion_nomina_novasoft_CO]]

```sql


CREATE VIEW [dbo].[v_conciliacion_nomina_novasoft_ByCentro]
AS
SELECT        Ano_Periodo, Mes_Periodo, idEmpresas, NombreEmpresa, idCentros, NombreCentro, SUM(Saldo) AS Saldo
FROM            dbo.v_conciliacion_nomina_novasoft_CO
GROUP BY Ano_Periodo, Mes_Periodo, idEmpresas, NombreEmpresa, idCentros, NombreCentro

```
