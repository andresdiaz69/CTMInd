# View: vw_Terceros_Proveedores_Bancos

## Usa los objetos:
- [[BancoEntidades]]
- [[CtaBancariaTipos]]
- [[EmpresaCentroTercerosCuentasBancarias]]
- [[terceros]]

```sql



CREATE view [dbo].[vw_Terceros_Proveedores_Bancos] as
select distinct t.PkTerceros,t.NifCif,a.CuentaNumero,a.FkCuentaEntidad,e.Nombre,Fkctabancariatipos,descripcion,pkfkempresas
from		[192.168.90.10\SPIGAPLUS].[DMS00280].cm.terceros										t
left join	(select distinct PkFkTerceros,CuentaNumero,FkCuentaEntidad,Fkctabancariatipos,pkfkempresas
			from [192.168.90.10\SPIGAPLUS].[DMS00280].[CM].[EmpresaCentroTercerosCuentasBancarias]
			--where PkFkTerceros='568161'
			)																			a	on	a.PkFkterceros = t.PkTerceros
left join	[192.168.90.10\SPIGAPLUS].[DMS00280].cm.BancoEntidades									e	on	a.FkCuentaEntidad = e.PkBancoEntidades
left join	[192.168.90.10\SPIGAPLUS].[DMS00280].FI.CtaBancariaTipos								b	on	a.Fkctabancariatipos = b.PKCtaBancariaTipos_Iden
																								and b.FechaBaja is null
where a.CuentaNumero is not null
--and t.pkterceros = '16815' 
--29062

```
