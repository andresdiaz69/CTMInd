# View: vw_RepuestosV2_Bolsas_Administrativa_Especialista_1

## Usa los objetos:
- [[vw_RepuestosV2_Bolsas_Administrativa_Especialista_1_Detalle]]

```sql


CREATE VIEW [dbo].[vw_RepuestosV2_Bolsas_Administrativa_Especialista_1]
AS

SELECT *,

-- ANTES TODO ERA IGUAL
--CASE 
--WHEN ValorBaseTaller > 0 AND ValorBaseTaller <= 200000000 THEN 250000
--WHEN ValorBaseTaller > 200000000 AND ValorBaseTaller <= 300000000 THEN 350000
--WHEN ValorBaseTaller > 300000000 AND ValorBaseTaller <=  9999999999 THEN 450000
--ELSE 0 
--END AS TopeMaximoBolsaEspecialista
--2023/09/06 - JCS: MODIFICACIÓN DE TOPES
CASE 
WHEN ValorBaseTaller > 0 AND ValorBaseTaller < 300000000 THEN 290000
WHEN ValorBaseTaller >= 300000000 AND ValorBaseTaller < 400000000 THEN 400000
WHEN ValorBaseTaller >= 400000000 AND ValorBaseTaller <= 9999999999 THEN 525000
ELSE 0 
END AS TopeMaximoBolsaEspecialista_Taller,

-- AHORA HAY UNA SEPARACION DE COLISION
--CASE 
--WHEN ValorBaseTaller > 0 AND ValorBaseTaller <= 400000000 THEN 250000
--WHEN ValorBaseTaller > 400000000 AND ValorBaseTaller <= 500000000 THEN 350000
--WHEN ValorBaseTaller > 500000000 AND ValorBaseTaller <=  9999999999 THEN 450000
--ELSE 0 
--END AS TopeMaximoBolsaEspecialista
--2023/09/06 - JCS: MODIFICACIÓN DE TOPES
CASE 
WHEN ValorBaseTaller > 0 AND ValorBaseTaller < 400000000 THEN 290000
WHEN ValorBaseTaller >= 400000000 AND ValorBaseTaller < 500000000 THEN 400000
WHEN ValorBaseTaller >= 500000000 AND ValorBaseTaller <= 9999999999 THEN 525000
ELSE 0 
END AS TopeMaximoBolsaEspecialista_Colision

FROM

(

SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoCentro, SUM(ValorBaseTaller) AS ValorBaseTaller
FROM            dbo.vw_RepuestosV2_Bolsas_Administrativa_Especialista_1_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CodigoCentro

) AS BASE_ESPECIALISTA


```
