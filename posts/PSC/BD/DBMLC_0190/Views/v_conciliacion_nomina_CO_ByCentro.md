# View: v_conciliacion_nomina_CO_ByCentro

## Usa los objetos:
- [[v_conciliacion_nomina_novasoft_ByCentro]]
- [[v_conciliacion_nomina_spiga_ByCentro]]

```sql




CREATE VIEW [dbo].[v_conciliacion_nomina_CO_ByCentro]
AS
SELECT  

ISNULL(dbo.v_conciliacion_nomina_novasoft_ByCentro.Ano_Periodo, dbo.v_conciliacion_nomina_spiga_ByCentro.Ano_Periodo) AS Ano_Periodo, 
ISNULL(dbo.v_conciliacion_nomina_novasoft_ByCentro.Mes_Periodo, dbo.v_conciliacion_nomina_spiga_ByCentro.Mes_Periodo) AS Mes_Periodo, 
ISNULL(dbo.v_conciliacion_nomina_novasoft_ByCentro.idEmpresas, dbo.v_conciliacion_nomina_spiga_ByCentro.idEmpresas) AS idEmpresas, 
ISNULL(dbo.v_conciliacion_nomina_novasoft_ByCentro.NombreEmpresa, dbo.v_conciliacion_nomina_spiga_ByCentro.NombreEmpresa) AS NombreEmpresa, 
ISNULL(dbo.v_conciliacion_nomina_novasoft_ByCentro.idCentros, dbo.v_conciliacion_nomina_spiga_ByCentro.idCentros) AS idCentros, 
ISNULL(dbo.v_conciliacion_nomina_novasoft_ByCentro.NombreCentro, dbo.v_conciliacion_nomina_spiga_ByCentro.NombreCentro) AS NombreCentro, 

ISNULL(dbo.v_conciliacion_nomina_novasoft_ByCentro.Saldo, 0) AS Saldo_Novasoft, 
ISNULL(dbo.v_conciliacion_nomina_spiga_ByCentro.Saldo, 0) AS Saldo_Spiga, 
ISNULL(dbo.v_conciliacion_nomina_novasoft_ByCentro.Saldo, 0) - ISNULL(dbo.v_conciliacion_nomina_spiga_ByCentro.Saldo, 0) AS Diferencia

FROM    

dbo.v_conciliacion_nomina_novasoft_ByCentro 
FULL OUTER JOIN
dbo.v_conciliacion_nomina_spiga_ByCentro 

ON 

dbo.v_conciliacion_nomina_novasoft_ByCentro.Ano_Periodo = dbo.v_conciliacion_nomina_spiga_ByCentro.Ano_Periodo 
AND 
dbo.v_conciliacion_nomina_novasoft_ByCentro.Mes_Periodo = dbo.v_conciliacion_nomina_spiga_ByCentro.Mes_Periodo 
AND 
dbo.v_conciliacion_nomina_novasoft_ByCentro.idEmpresas = dbo.v_conciliacion_nomina_spiga_ByCentro.idEmpresas 
AND 
dbo.v_conciliacion_nomina_novasoft_ByCentro.idCentros = dbo.v_conciliacion_nomina_spiga_ByCentro.idCentros


```
