# View: v_conciliacion_nomina_spiga_ByEmpresa

## Usa los objetos:
- [[v_conciliacion_nomina_spiga_CO]]

```sql


CREATE VIEW [dbo].[v_conciliacion_nomina_spiga_ByEmpresa]
AS
SELECT        Ano_Periodo, Mes_Periodo, idEmpresas, NombreEmpresa, SUM(Saldo) AS Saldo
FROM            dbo.v_conciliacion_nomina_spiga_CO
GROUP BY Ano_Periodo, Mes_Periodo, idEmpresas, NombreEmpresa

```
