# View: V_SST_NovedadesRACI

## Usa los objetos:
- [[SST_ActosInseguros]]
- [[SST_CondicionesInseguras]]
- [[SST_NovedadesRACI]]
- [[SST_RACI]]

```sql

CREATE VIEW [dbo].[V_SST_NovedadesRACI]
AS
SELECT NOV.cod_cia, NOV.cons,  CONCAT(NOV.cons_nov, ' - ',NOV.cod_nov) AS novedad,
(CASE
	WHEN RAC.tipo = 1 THEN ACT.des_act
	WHEN RAC.tipo = 2 THEN CON.des_con
	ELSE ''
END) AS des_nov
FROM SST_NovedadesRACI AS NOV
INNER JOIN SST_RACI AS RAC ON NOV.cons = RAC.cons AND NOV.cod_cia = RAC.cod_cia
LEFT JOIN SST_ActosInseguros AS ACT ON NOV.cod_nov = ACT.cod_act
LEFT JOIN SST_CondicionesInseguras AS CON ON NOV.cod_nov = CON.cod_con
WHERE NOV.cod_est IN (3, 4);

```
