# View: v_pre_nombre

## Usa los objetos:
- [[pre_grupo]]
- [[pre_rubro]]
- [[pre_sec1]]
- [[pre_subgru]]
- [[pre_tiporub]]

```sql




CREATE VIEW [dbo].[v_pre_nombre]
AS
SELECT cod_tipo AS rubro, 
   des_tipo as nombre 
FROM  pre_tiporub where cod_tipo>'0'
UNION ALL
SELECT  cod_tip +cod_gru AS rubro, des_gru AS nombre 
   FROM  pre_grupo where cod_tip>'0'
UNION ALL
SELECT  cod_tip + pre_subgru.cod_gru + pre_subgru.cod_sub AS rubro, 
   des_sub AS nombre
FROM  pre_subgru where cod_tip>'0'
UNION ALL
SELECT  cod_tip + pre_sec1.cod_gru + pre_sec1.cod_sub + pre_sec1.cod_sec1
    AS rubro, des_sec1 AS nombre
FROM pre_sec1 where cod_tip>'0'
  
UNION ALL
SELECT   cod_rub AS rubro, nom_rub AS nombre
FROM  pre_rubro where len(cod_rub)>8 and  cod_rub>'0'





```
