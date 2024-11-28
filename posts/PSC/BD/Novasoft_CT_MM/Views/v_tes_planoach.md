# View: v_tes_planoach

## Usa los objetos:
- [[gen_bancos]]
- [[tes_bancos]]
- [[tes_plano_ins_ach]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_tes_planoach]
AS
SELECT     dbo.tes_bancos.bancos, dbo.tes_bancos.nombre, dbo.tes_plano_ins_ach.cod_plan, dbo.tes_plano_ins_ach.des_plan, 
           dbo.tes_plano_ins_ach.tip_arc
FROM       dbo.tes_bancos WITH (NOLOCK) INNER JOIN
           dbo.tes_plano_ins_ach WITH (NOLOCK) ON dbo.tes_bancos.cod_ban = dbo.tes_plano_ins_ach.cod_ban INNER JOIN
           dbo.gen_bancos WITH (NOLOCK) ON dbo.tes_plano_ins_ach.cod_ban = dbo.gen_bancos.cod_ban

```
