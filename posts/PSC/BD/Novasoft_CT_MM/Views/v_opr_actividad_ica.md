# View: v_opr_actividad_ica

## Usa los objetos:
- [[cxc_succli]]
- [[gen_actividad]]
- [[opr_sitios]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_opr_actividad_ica]

AS

SELECT	cod_act,nom_act,d.cod_cli,c.sit_cli,d.nom_suc,c.nom_sit
FROM	opr_sitios AS c WITH (NOLOCK)
		INNER JOIN  cxc_succli AS d WITH (NOLOCK) ON d.suc_cli = c.suc_cli and d.cod_cli = c.cod_cli
		INNER JOIN  gen_actividad AS e WITH (NOLOCK) ON e.cod_pai = d.cod_pai  AND e.cod_dep = d.cod_dep AND e.cod_ciu = d.cod_ciu

```
