# View: v_nif_premes

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_sucursal]]
- [[nif_presup]]
- [[nif_puc]]

```sql

CREATE VIEW [dbo].[v_nif_premes] AS
SELECT acu.ano_acu, '01' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, 
			acu.cod_cco, acu.cod_cl1, acu.cod_cl2, acu.cod_cl3, val_01 AS pre_mes, acu_01 AS acu_mes, 
			suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
FROM nif_presup AS acu WITH(NOLOCK) 
	INNER JOIN nif_puc AS puc WITH(NOLOCK) ON acu.cod_cta=puc.cod_cta
	INNER JOIN gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc=suc.cod_suc
	INNER JOIN gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco=cco.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1=cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2=cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3=cl3.codigo

UNION ALL 

SELECT acu.ano_acu, '02' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, 
			acu.cod_cco, acu.cod_cl1, acu.cod_cl2, acu.cod_cl3, val_02 AS pre_mes, acu_02 AS acu_mes, 
			suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
FROM nif_presup AS acu WITH(NOLOCK) 
	INNER JOIN nif_puc AS puc WITH(NOLOCK) ON acu.cod_cta=puc.cod_cta
	INNER JOIN gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc=suc.cod_suc
	INNER JOIN gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco=cco.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1=cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2=cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3=cl3.codigo

UNION ALL 

SELECT acu.ano_acu, '03' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, 
			acu.cod_cco, acu.cod_cl1, acu.cod_cl2, acu.cod_cl3, val_03 AS pre_mes, acu_03 AS acu_mes, 
			suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
FROM nif_presup AS acu WITH(NOLOCK) 
	INNER JOIN nif_puc AS puc WITH(NOLOCK) ON acu.cod_cta=puc.cod_cta
	INNER JOIN gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc=suc.cod_suc
	INNER JOIN gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco=cco.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1=cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2=cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3=cl3.codigo

UNION ALL 

SELECT acu.ano_acu, '04' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, 
			acu.cod_cco, acu.cod_cl1, acu.cod_cl2, acu.cod_cl3, val_04 AS pre_mes, acu_04 AS acu_mes, 
			suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
FROM nif_presup AS acu WITH(NOLOCK) 
	INNER JOIN nif_puc AS puc WITH(NOLOCK) ON acu.cod_cta=puc.cod_cta
	INNER JOIN gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc=suc.cod_suc
	INNER JOIN gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco=cco.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1=cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2=cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3=cl3.codigo

UNION ALL 

SELECT acu.ano_acu, '05' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, 
			acu.cod_cco, acu.cod_cl1, acu.cod_cl2, acu.cod_cl3, val_05 AS pre_mes, acu_05 AS acu_mes, 
			suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
FROM nif_presup AS acu WITH(NOLOCK) 
	INNER JOIN nif_puc AS puc WITH(NOLOCK) ON acu.cod_cta=puc.cod_cta
	INNER JOIN gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc=suc.cod_suc
	INNER JOIN gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco=cco.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1=cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2=cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3=cl3.codigo

UNION ALL 

SELECT acu.ano_acu, '06' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, 
			acu.cod_cco, acu.cod_cl1, acu.cod_cl2, acu.cod_cl3, val_06 AS pre_mes, acu_06 AS acu_mes, 
			suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
FROM nif_presup AS acu WITH(NOLOCK) 
INNER JOIN nif_puc AS puc WITH(NOLOCK) ON acu.cod_cta=puc.cod_cta
	INNER JOIN gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc=suc.cod_suc
	INNER JOIN gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco=cco.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1=cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2=cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3=cl3.codigo

UNION ALL 

SELECT acu.ano_acu, '07' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, 
			acu.cod_cco, acu.cod_cl1, acu.cod_cl2, acu.cod_cl3, val_07 AS pre_mes, acu_07 AS acu_mes, 
			suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
FROM nif_presup AS acu WITH(NOLOCK) 
	INNER JOIN nif_puc AS puc WITH(NOLOCK) ON acu.cod_cta=puc.cod_cta
	INNER JOIN gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc=suc.cod_suc
	INNER JOIN gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco=cco.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1=cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2=cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3=cl3.codigo

UNION ALL 

SELECT acu.ano_acu, '08' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, 
			acu.cod_cco, acu.cod_cl1, acu.cod_cl2, acu.cod_cl3, val_08 AS pre_mes, acu_08 AS acu_mes, 
			suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
FROM nif_presup AS acu WITH(NOLOCK) 
	INNER JOIN nif_puc AS puc WITH(NOLOCK) ON acu.cod_cta=puc.cod_cta
	INNER JOIN gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc=suc.cod_suc
	INNER JOIN gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco=cco.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1=cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2=cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3=cl3.codigo

UNION ALL 

SELECT acu.ano_acu, '09' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, 
			acu.cod_cco, acu.cod_cl1, acu.cod_cl2, acu.cod_cl3, val_09 AS pre_mes, acu_09 AS acu_mes, 
			suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
FROM nif_presup AS acu WITH(NOLOCK) 
	INNER JOIN nif_puc AS puc WITH(NOLOCK) ON acu.cod_cta=puc.cod_cta
	INNER JOIN gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc=suc.cod_suc
	INNER JOIN gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco=cco.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1=cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2=cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3=cl3.codigo

UNION ALL 

SELECT acu.ano_acu, '10' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, 
			acu.cod_cco, acu.cod_cl1, acu.cod_cl2, acu.cod_cl3, val_10 AS pre_mes, acu_10 AS acu_mes, 
			suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
FROM nif_presup AS acu WITH(NOLOCK) 
	INNER JOIN nif_puc AS puc WITH(NOLOCK) ON acu.cod_cta=puc.cod_cta
	INNER JOIN gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc=suc.cod_suc
	INNER JOIN gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco=cco.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1=cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2=cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3=cl3.codigo

UNION ALL 

SELECT acu.ano_acu, '11' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, 
			acu.cod_cco, acu.cod_cl1, acu.cod_cl2, acu.cod_cl3, val_11 AS pre_mes, acu_11 AS acu_mes, 
			suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
FROM nif_presup AS acu WITH(NOLOCK) 
	INNER JOIN nif_puc AS puc WITH(NOLOCK) ON acu.cod_cta=puc.cod_cta
	INNER JOIN gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc=suc.cod_suc
	INNER JOIN gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco=cco.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1=cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2=cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3=cl3.codigo

UNION ALL 

SELECT acu.ano_acu, '12' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, 
			acu.cod_cco, acu.cod_cl1, acu.cod_cl2, acu.cod_cl3, val_12 AS pre_mes, acu_12 AS acu_mes, 
			suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
FROM nif_presup AS acu WITH(NOLOCK) 
	INNER JOIN nif_puc AS puc WITH(NOLOCK) ON acu.cod_cta=puc.cod_cta
	INNER JOIN gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc=suc.cod_suc
	INNER JOIN gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco=cco.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1=cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2=cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3=cl3.codigo

```