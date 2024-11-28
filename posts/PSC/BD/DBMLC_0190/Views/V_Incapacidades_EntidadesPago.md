# View: V_Incapacidades_EntidadesPago

## Usa los objetos:
- [[rhh_hisfon]]
- [[rhh_tbfondos]]

```sql


CREATE VIEW V_Incapacidades_EntidadesPago
AS
select	h.*,
		f.nom_fdo,
		f.nit_ter,
		f.cod_SAP
from	[Novasoft_CT_MM].[dbo].[rhh_hisfon] h
left join	[Novasoft_CT_MM].[dbo].[rhh_tbfondos] f on h.cod_fdo = f.cod_fdo
where	h.tip_fdo in (2,3)

```
