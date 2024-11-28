# View: vw_cMandos_ClientesPotenciales

## Usa los objetos:
- [[spiga_ClientesPotenciales]]

```sql









CREATE VIEW [dbo].[vw_cMandos_ClientesPotenciales]
AS

	select distinct PkFkEmpresas CodigoEmpresa,PkFkCentros CodigoCentro,Ano_Periodo,Mes_Periodo,count(*) Cantidad 
	from(
		select distinct PkFkEmpresas,PkFkCentros,Ano_Periodo,Mes_Periodo,PkFkTerceros
		from PSCService_DB.dbo.spiga_ClientesPotenciales
	) Datos
	GROUP BY PkFkEmpresas, PkFkCentros, Ano_Periodo, Mes_Periodo



```
