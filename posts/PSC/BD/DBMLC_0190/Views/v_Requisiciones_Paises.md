# View: v_Requisiciones_Paises

## Usa los objetos:
- [[gen_paises]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_Paises] AS
SELECT (cod_pai)CodPais, (nom_pai)Pais, (ind_tel)Indicativo_Tel
FROM [Novasoft_CT_MM].[dbo].[gen_paises]

```
