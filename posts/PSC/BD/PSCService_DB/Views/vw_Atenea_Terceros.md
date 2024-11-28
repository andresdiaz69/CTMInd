# View: vw_Atenea_Terceros

## Usa los objetos:
- [[v_habeas_data]]
- [[VW_Terceros_consolidado]]

```sql




CREATE view [dbo].[vw_Atenea_Terceros] as
select tc.pkterceros, Nombre_completo,   Nifcif,       Direccion_principal,   telprincipal Telefono1,
       telParticular1 Telefono2,   celular1,         email_principal,       ciudadPrincipal
  from [DBMLC_0190].dbo.VW_Terceros_consolidado      tc
  --left join	[DBMLC_0190].dbo.v_habeas_data	v	on	tc.pkterceros = v.Pkterceros
  left join	dbo.v_habeas_data	v	on	tc.pkterceros = v.Pkterceros
 where v.ValorBool is NULL
   and Nifcif is not null

```
