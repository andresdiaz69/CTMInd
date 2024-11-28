# View: vw_Novasoft_Bancos

## Usa los objetos:
- [[gen_bancos]]

```sql

CREATE VIEW [dbo].[vw_Novasoft_Bancos] AS
SELECT CodigoBanco=cod_ban, NombreBanco=nom_ban
FROM 
(
	SELECT cod_ban,nom_ban,cod_tra,cod_super,nit_ban,
		ban_union,ban_ele,ban_ec,ban_nacha,cod_banach
	FROM [Novasoft_CT_MM].[dbo].[gen_bancos] 
	WHERE nom_ban NOT LIKE '%(%'
)A

```
