# View: v_gen_ciudad

## Usa los objetos:
- [[gen_ciudad]]
- [[gen_deptos]]
- [[gen_paises]]

```sql

CREATE VIEW [dbo].[v_gen_ciudad]
AS
SELECT RTRIM(a.cod_pai)+RTRIM(a.cod_dep)+RTRIM(a.cod_ciu) AS codigo,RTRIM(a.nom_ciu)+'-'+RTRIM(b.nom_dep)+'-'+RTRIM(c.nom_pai) AS nombre,a.cod_ciu,a.cod_dep,a.cod_pai
FROM gen_ciudad AS a WITH(NOLOCK)
	INNER JOIN gen_deptos AS b WITH(NOLOCK) ON a.cod_dep=b.cod_dep AND a.cod_pai=b.cod_pai
	INNER JOIN gen_paises AS c WITH(NOLOCK) ON b.cod_pai=c.cod_pai;

```
