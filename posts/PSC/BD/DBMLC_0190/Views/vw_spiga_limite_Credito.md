# View: vw_spiga_limite_Credito

## Usa los objetos:
- [[spiga_LimiteCreditoTerceros]]

```sql
CREATE view [dbo].[vw_spiga_limite_Credito] as
SELECT distinct pkfkempresas,PkFkTerceros, LimiteCredito
FROM	[PSCService_DB].DBO.spiga_LimiteCreditoTerceros	
where	PkFkEmpresas in (1,5,6,22)
group by pkfkempresas,PkFkTerceros, LimiteCredito
--order by PkFkTerceros,pkfkempresas

```
