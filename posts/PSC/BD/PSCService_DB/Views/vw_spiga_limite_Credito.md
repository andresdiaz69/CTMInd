# View: vw_spiga_limite_Credito

## Usa los objetos:
- [[EmpresaCentroTercerosLimitesCreditoTipos]]
- [[LimitesCreditoTipos]]

```sql




CREATE  view [dbo].[vw_spiga_limite_Credito] as
SELECT distinct pkfkempresas,PkFkTerceros, LimiteCredito
FROM		[192.168.90.10\SPIGAPLUS].[DMS00280].CM.EmpresaCentroTercerosLimitesCreditoTipos 
inner join	[192.168.90.10\SPIGAPLUS].[DMS00280].CM.LimitesCreditoTipos						on PkLimitesCreditoTipos_Iden=PkFkLimitesCreditoTipos
where	PkFkEmpresas in (1,5,6,22)
and EmpresaCentroTercerosLimitesCreditoTipos.fechabaja is null 
and LimiteCredito <> 0
group by pkfkempresas,PkFkTerceros, LimiteCredito
--order by PkFkTerceros,pkfkempresas

```
