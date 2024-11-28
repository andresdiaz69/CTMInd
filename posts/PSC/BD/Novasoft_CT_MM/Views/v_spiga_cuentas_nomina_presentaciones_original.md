# View: v_spiga_cuentas_nomina_presentaciones_original

## Usa los objetos:
- [[BalanceConceptos]]
- [[Balances]]
- [[ContCtaBalances]]
- [[ContCtas]]
- [[empresas]]

```sql

CREATE view [dbo].[v_spiga_cuentas_nomina_presentaciones_original] as
select Codigo_Empresa=b.PkFkEmpresas,Nombre_empresa=e.Nombre,Codigo_Balance=b.PkFkBalances,
Descripcion_Balance=s.Descripcion,Codigo_Conceptos_Balance=b.PKFkBalanceConceptos,
Descripcion_Conceptos_Balance=c.descripcion,Cuentas=convert(varchar,b.PkFkContCtas),Descripcion_Cuentas=t.Nombre
from         [192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[ContCtaBalances]    b
left join    [192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[BalanceConceptos]   c    on       b.PkFkEmpresas = c.PkFkEmpresas
																				and b.PkFkBalances = c.PkFkBalances
																				and b.PKFkBalanceConceptos = c.PkBalanceConceptos    
left join    [192.168.90.10\SPIGAPLUS].[DMS00280].[cm].[empresas]           e      on       b.PkFkEmpresas = e.PkEmpresas    
left join    [192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[Balances]           s      on       b.PkFkEmpresas = s.PkFkEmpresas  
																					and b.PkFkBalances = s.PkBalances_Iden
left join    [192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[ContCtas]				t      on       b.PkFkEmpresas = t.PkFkEmpresas
																					and b.PkFkContCtas = t.PkContCtas
where  b.PkFkEmpresas= 1
and    b.PkFkBalances=17

```
