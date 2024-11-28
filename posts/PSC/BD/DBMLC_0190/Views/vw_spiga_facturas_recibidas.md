# View: vw_spiga_facturas_recibidas

## Usa los objetos:
- [[spiga_FacturasRecibidas]]

```sql
create VIEW [dbo].[vw_spiga_facturas_recibidas] AS
	SELECT Ano_Periodo as ano,Mes_Periodo as mes,pkfkempresas,marca,cantidad,nombre,FkAsientoGestionEliminacion 
		FROM [PSCService_DB].[dbo].[spiga_FacturasRecibidas]
		WHERE PkFkEmpresas in (1,2,3,4,5,6,22)

```
