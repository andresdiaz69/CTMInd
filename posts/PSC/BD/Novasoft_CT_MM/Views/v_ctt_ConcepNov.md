# View: v_ctt_ConcepNov

## Usa los objetos:
- [[v_ctt_concep]]

```sql

CREATE VIEW [dbo].[v_ctt_ConcepNov]
AS
WITH Conceptos AS(
				    SELECT cod_con,min(mod_liq) AS modo FROM v_ctt_concep
				    WHERE  ind_ctt = 1 AND
					(nov_rel = 4) OR (cod_con IN ('001050', '001300')) 
				    GROUP BY cod_con,ind_ctt )

SELECT  C.cod_con,C.nom_con,c.ind_ctt  
FROM    v_ctt_concep C INNER JOIN Conceptos ON c.cod_con=Conceptos.cod_con AND c.mod_liq=modo

```
