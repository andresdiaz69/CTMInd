# View: v_tes_terprocpagos

## Usa los objetos:
- [[cxc_cliente]]
- [[gen_subtipodoc]]
- [[gen_terceros]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_tes_terprocpagos]
AS
SELECT t.ter_nit AS codigo,t.ter_nombre AS nombre,'99' AS tip_mon,S.cod_sub
FROM gen_terceros t WITH (NOLOCK) CROSS JOIN gen_subtipodoc s WITH (NOLOCK)
WHERE s.cod_tip IN ('410','420')
UNION ALL
SELECT c.cod_cli AS codigo,c.nom_cli AS nombre,c.tip_mon,S.cod_sub
FROM cxc_cliente c WITH (NOLOCK) CROSS JOIN gen_subtipodoc s WITH (NOLOCK)
WHERE s.cod_tip IN ('040','060')

```
