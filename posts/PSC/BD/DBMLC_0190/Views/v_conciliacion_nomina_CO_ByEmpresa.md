# View: v_conciliacion_nomina_CO_ByEmpresa

## Usa los objetos:
- [[v_conciliacion_nomina_novasoft_ByEmpresa]]
- [[v_conciliacion_nomina_spiga_ByEmpresa]]

```sql




CREATE VIEW [dbo].[v_conciliacion_nomina_CO_ByEmpresa]
AS
SELECT  

ISNULL(dbo.v_conciliacion_nomina_novasoft_ByEmpresa.Ano_Periodo, dbo.v_conciliacion_nomina_spiga_ByEmpresa.Ano_Periodo) AS Ano_Periodo, 
ISNULL(dbo.v_conciliacion_nomina_novasoft_ByEmpresa.Mes_Periodo, dbo.v_conciliacion_nomina_spiga_ByEmpresa.Mes_Periodo) AS Mes_Periodo, 
ISNULL(dbo.v_conciliacion_nomina_novasoft_ByEmpresa.idEmpresas, dbo.v_conciliacion_nomina_spiga_ByEmpresa.idEmpresas) AS idEmpresas, 
ISNULL(dbo.v_conciliacion_nomina_novasoft_ByEmpresa.NombreEmpresa, dbo.v_conciliacion_nomina_spiga_ByEmpresa.NombreEmpresa) AS NombreEmpresa, 

ISNULL(dbo.v_conciliacion_nomina_novasoft_ByEmpresa.Saldo, 0) AS Saldo_Novasoft, 
ISNULL(dbo.v_conciliacion_nomina_spiga_ByEmpresa.Saldo, 0) AS Saldo_Spiga, 
ISNULL(dbo.v_conciliacion_nomina_novasoft_ByEmpresa.Saldo, 0) - ISNULL(dbo.v_conciliacion_nomina_spiga_ByEmpresa.Saldo, 0) AS Diferencia

FROM    

dbo.v_conciliacion_nomina_novasoft_ByEmpresa 
FULL OUTER JOIN
dbo.v_conciliacion_nomina_spiga_ByEmpresa 

ON 

dbo.v_conciliacion_nomina_novasoft_ByEmpresa.Ano_Periodo = dbo.v_conciliacion_nomina_spiga_ByEmpresa.Ano_Periodo 
AND 
dbo.v_conciliacion_nomina_novasoft_ByEmpresa.Mes_Periodo = dbo.v_conciliacion_nomina_spiga_ByEmpresa.Mes_Periodo 
AND 
dbo.v_conciliacion_nomina_novasoft_ByEmpresa.idEmpresas = dbo.v_conciliacion_nomina_spiga_ByEmpresa.idEmpresas 


```
