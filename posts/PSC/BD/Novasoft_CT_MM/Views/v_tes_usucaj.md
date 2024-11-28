# View: v_tes_usucaj

## Usa los objetos:
- [[tes_bancos]]
- [[tes_cajas]]
- [[tes_usucaj]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_tes_usucaj]
AS

SELECT a.cod_usu,a.cod_caja,b.tip_mon
FROM tes_usucaj AS a WITH (NOLOCK) 
	INNER JOIN tes_cajas AS c WITH (NOLOCK) ON a.cod_caja=c.cod_caj
	INNER JOIN tes_bancos b WITH (NOLOCK) ON b.bancos=c.cod_ban;

```
