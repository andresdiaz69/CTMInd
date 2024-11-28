# View: v_rhh_ConcepNov

## Usa los objetos:
- [[v_rhh_concep]]

```sql

CREATE VIEW [dbo].[v_rhh_ConcepNov]
AS
WITH Conceptos AS(
				    SELECT cod_con,min(mod_liq) AS modo FROM v_rhh_concep
				    WHERE  (nov_rel = 4) OR (cod_con IN ('001050', '001300'))
				    GROUP BY cod_con )

SELECT  C.cod_con,C.nom_con 
FROM    v_rhh_concep C INNER JOIN Conceptos ON c.cod_con=Conceptos.cod_con AND c.mod_liq=modo
                      

```
