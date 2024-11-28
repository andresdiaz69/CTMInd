# View: v_ptv_usucaj

## Usa los objetos:
- [[gen_cajas]]
- [[ptv_usucaj]]
- [[tes_bancos]]

```sql

-- VISTA PARA INFORMAR USUARIOS, CAJA Y MONEDA
-- 2020/01/23 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_ptv_usucaj]
AS

SELECT a.cod_usu,a.cod_caja,b.tip_mon
FROM ptv_usucaj AS a WITH (NOLOCK) INNER JOIN gen_cajas AS c WITH (NOLOCK) ON a.cod_caja=c.cod_caj
INNER JOIN tes_bancos AS b WITH (NOLOCK) ON b.bancos=c.cod_ban

```
