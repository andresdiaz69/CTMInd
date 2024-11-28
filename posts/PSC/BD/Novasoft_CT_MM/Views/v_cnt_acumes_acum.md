# View: v_cnt_acumes_acum

## Usa los objetos:
- [[cnt_acusyc]]
- [[cnt_puc]]
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_sucursal]]
- [[gen_terceros]]

```sql

CREATE VIEW [dbo].[v_cnt_acumes_acum] 
AS
SELECT acu.ano_acu, '01' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, 
	acu.cod_cl3, acu.sal_00 AS sal_ant, 
	acu.deb_01 AS acu_deb, 
	acu.cre_01 AS acu_cre, 
	acu.sal_01 AS sal_nue, 
	ter.ter_nombre, suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
FROM dbo.cnt_acusyc AS acu WITH(NOLOCK)
	INNER JOIN dbo.cnt_puc AS puc WITH(NOLOCK) ON acu.cod_cta = puc.cod_cta 
	INNER JOIN dbo.gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter = ter.ter_nit 
	INNER JOIN dbo.gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc = suc.cod_suc 
	INNER JOIN dbo.gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco = cco.cod_cco 
	INNER JOIN dbo.gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1 = cl1.codigo 
	INNER JOIN dbo.gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2 = cl2.codigo 
	INNER JOIN dbo.gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3 = cl3.codigo

UNION ALL

SELECT acu.ano_acu, '02' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, 
	acu.cod_cl3, acu.sal_01 AS sal_ant, 
	acu.deb_01+acu.deb_02 AS acu_deb, 
	acu.cre_01+acu.cre_02 AS acu_cre, 
	acu.sal_02 AS sal_nue, 
	ter.ter_nombre, suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
FROM dbo.cnt_acusyc AS acu WITH(NOLOCK) 
	INNER JOIN dbo.cnt_puc AS puc WITH(NOLOCK) ON acu.cod_cta = puc.cod_cta 
	INNER JOIN dbo.gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter = ter.ter_nit 
	INNER JOIN dbo.gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc = suc.cod_suc 
	INNER JOIN dbo.gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco = cco.cod_cco 
	INNER JOIN dbo.gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1 = cl1.codigo 
	INNER JOIN dbo.gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2 = cl2.codigo 
	INNER JOIN dbo.gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3 = cl3.codigo

UNION ALL

SELECT acu.ano_acu, '03' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, 
	acu.cod_cl3, acu.sal_02 AS sal_ant, 
	acu.deb_01+acu.deb_02+acu.deb_03 AS acu_deb, 
	acu.cre_01+acu.cre_02+acu.cre_03 AS acu_cre, 
	acu.sal_03 AS sal_nue, 
	ter.ter_nombre, suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
FROM dbo.cnt_acusyc AS acu WITH(NOLOCK) 
	INNER JOIN dbo.cnt_puc AS puc WITH(NOLOCK) ON acu.cod_cta = puc.cod_cta 
	INNER JOIN dbo.gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter = ter.ter_nit 
	INNER JOIN dbo.gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc = suc.cod_suc 
	INNER JOIN dbo.gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco = cco.cod_cco 
	INNER JOIN dbo.gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1 = cl1.codigo 
	INNER JOIN dbo.gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2 = cl2.codigo 
	INNER JOIN dbo.gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3 = cl3.codigo

UNION ALL

SELECT acu.ano_acu, '04' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, 
	acu.cod_cl3, acu.sal_03 AS sal_ant, 
	acu.deb_01+acu.deb_02+acu.deb_03+acu.deb_04 AS acu_deb, 
	acu.cre_01+acu.cre_02+acu.cre_03+acu.cre_04 AS acu_cre, 
	acu.sal_04 AS sal_nue, 
	ter.ter_nombre, suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
FROM dbo.cnt_acusyc AS acu WITH(NOLOCK) 
	INNER JOIN dbo.cnt_puc AS puc WITH(NOLOCK) ON acu.cod_cta = puc.cod_cta 
	INNER JOIN dbo.gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter = ter.ter_nit 
	INNER JOIN dbo.gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc = suc.cod_suc 
	INNER JOIN dbo.gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco = cco.cod_cco 
	INNER JOIN dbo.gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1 = cl1.codigo 
	INNER JOIN dbo.gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2 = cl2.codigo 
	INNER JOIN dbo.gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3 = cl3.codigo

UNION ALL

SELECT acu.ano_acu, '05' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, 
	acu.cod_cl3, acu.sal_04 AS sal_ant, 
	acu.deb_01+acu.deb_02+acu.deb_03+acu.deb_04+acu.deb_05 AS acu_deb, 
	acu.cre_01+acu.cre_02+acu.cre_03+acu.cre_04+acu.cre_05 AS acu_cre, 
	acu.sal_05 AS sal_nue, 
	ter.ter_nombre, suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
FROM dbo.cnt_acusyc AS acu WITH(NOLOCK) 
	INNER JOIN dbo.cnt_puc AS puc WITH(NOLOCK) ON acu.cod_cta = puc.cod_cta 
	INNER JOIN dbo.gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter = ter.ter_nit 
	INNER JOIN dbo.gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc = suc.cod_suc 
	INNER JOIN dbo.gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco = cco.cod_cco 
	INNER JOIN dbo.gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1 = cl1.codigo 
	INNER JOIN dbo.gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2 = cl2.codigo 
	INNER JOIN dbo.gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3 = cl3.codigo

UNION ALL

SELECT acu.ano_acu, '06' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, 
	acu.cod_cl3, acu.sal_05 AS sal_ant, 
	acu.deb_01+acu.deb_02+acu.deb_03+acu.deb_04+acu.deb_05+acu.deb_06 AS acu_deb, 
	acu.cre_01+acu.cre_02+acu.cre_03+acu.cre_04+acu.cre_05+acu.cre_06 AS acu_cre, 
	acu.sal_06 AS sal_nue, 
	ter.ter_nombre, suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
FROM dbo.cnt_acusyc AS acu WITH(NOLOCK) 
	INNER JOIN dbo.cnt_puc AS puc WITH(NOLOCK) ON acu.cod_cta = puc.cod_cta 
	INNER JOIN dbo.gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter = ter.ter_nit 
	INNER JOIN dbo.gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc = suc.cod_suc 
	INNER JOIN dbo.gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco = cco.cod_cco 
	INNER JOIN dbo.gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1 = cl1.codigo 
	INNER JOIN dbo.gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2 = cl2.codigo 
	INNER JOIN dbo.gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3 = cl3.codigo

UNION ALL

SELECT acu.ano_acu, '07' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, 
	acu.cod_cl3, acu.sal_06 AS sal_ant, 
	acu.deb_01+acu.deb_02+acu.deb_03+acu.deb_04+acu.deb_05+acu.deb_06+acu.deb_07 AS acu_deb, 
	acu.cre_01+acu.cre_02+acu.cre_03+acu.cre_04+acu.cre_05+acu.cre_06+acu.cre_07 AS acu_cre, 
	acu.sal_07 AS sal_nue, 
	ter.ter_nombre, suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
FROM dbo.cnt_acusyc AS acu WITH(NOLOCK) 
	INNER JOIN dbo.cnt_puc AS puc WITH(NOLOCK) ON acu.cod_cta = puc.cod_cta 
	INNER JOIN dbo.gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter = ter.ter_nit 
	INNER JOIN dbo.gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc = suc.cod_suc 
	INNER JOIN dbo.gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco = cco.cod_cco 
	INNER JOIN dbo.gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1 = cl1.codigo 
	INNER JOIN dbo.gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2 = cl2.codigo 
	INNER JOIN dbo.gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3 = cl3.codigo

UNION ALL

SELECT acu.ano_acu, '08' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, 
	acu.cod_cl3, acu.sal_07 AS sal_ant, 
	acu.deb_01+acu.deb_02+acu.deb_03+acu.deb_04+acu.deb_05+acu.deb_06+acu.deb_07+acu.deb_08 AS acu_deb, 
	acu.cre_01+acu.cre_02+acu.cre_03+acu.cre_04+acu.cre_05+acu.cre_06+acu.cre_07+acu.cre_08 AS acu_cre, 
	acu.sal_08 AS sal_nue, 
	ter.ter_nombre, suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
FROM dbo.cnt_acusyc AS acu WITH(NOLOCK) 
	INNER JOIN dbo.cnt_puc AS puc WITH(NOLOCK) ON acu.cod_cta = puc.cod_cta 
	INNER JOIN dbo.gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter = ter.ter_nit 
	INNER JOIN dbo.gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc = suc.cod_suc 
	INNER JOIN dbo.gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco = cco.cod_cco 
	INNER JOIN dbo.gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1 = cl1.codigo 
	INNER JOIN dbo.gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2 = cl2.codigo 
	INNER JOIN dbo.gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3 = cl3.codigo

UNION ALL

SELECT acu.ano_acu, '09' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, 
	acu.cod_cl3, acu.sal_08 AS sal_ant, 
	acu.deb_01+acu.deb_02+acu.deb_03+acu.deb_04+acu.deb_05+acu.deb_06+acu.deb_07+acu.deb_08+acu.deb_09 AS acu_deb, 
	acu.cre_01+acu.cre_02+acu.cre_03+acu.cre_04+acu.cre_05+acu.cre_06+acu.cre_07+acu.cre_08+acu.cre_09 AS acu_cre, 
	acu.sal_09 AS sal_nue, 
	ter.ter_nombre, suc.nom_suc, 
	cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
FROM dbo.cnt_acusyc AS acu WITH(NOLOCK) 
	INNER JOIN dbo.cnt_puc AS puc WITH(NOLOCK) ON acu.cod_cta = puc.cod_cta 
	INNER JOIN dbo.gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter = ter.ter_nit 
	INNER JOIN dbo.gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc = suc.cod_suc 
	INNER JOIN dbo.gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco = cco.cod_cco 
	INNER JOIN dbo.gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1 = cl1.codigo 
	INNER JOIN dbo.gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2 = cl2.codigo 
	INNER JOIN dbo.gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3 = cl3.codigo

UNION ALL

SELECT acu.ano_acu, '10' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, 
	acu.cod_cl3, acu.sal_09 AS sal_ant, 
	acu.deb_01+acu.deb_02+acu.deb_03+acu.deb_04+acu.deb_05+acu.deb_06+acu.deb_07+acu.deb_08+acu.deb_09+acu.deb_10 AS acu_deb, 
	acu.cre_01+acu.cre_02+acu.cre_03+acu.cre_04+acu.cre_05+acu.cre_06+acu.cre_07+acu.cre_08+acu.cre_09+acu.cre_10 AS acu_cre, 
	acu.sal_10 AS sal_nue, 
	ter.ter_nombre, suc.nom_suc, 
	cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
FROM dbo.cnt_acusyc AS acu WITH(NOLOCK) 
	INNER JOIN dbo.cnt_puc AS puc WITH(NOLOCK) ON acu.cod_cta = puc.cod_cta 
	INNER JOIN dbo.gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter = ter.ter_nit 
	INNER JOIN dbo.gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc = suc.cod_suc 
	INNER JOIN dbo.gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco = cco.cod_cco 
	INNER JOIN dbo.gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1 = cl1.codigo 
	INNER JOIN dbo.gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2 = cl2.codigo 
	INNER JOIN dbo.gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3 = cl3.codigo

UNION ALL

SELECT acu.ano_acu, '11' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, 
	acu.cod_cl3, acu.sal_10 AS sal_ant, 
	acu.deb_01+acu.deb_02+acu.deb_03+acu.deb_04+acu.deb_05+acu.deb_06+acu.deb_07+acu.deb_08+acu.deb_09+acu.deb_10+acu.deb_11 AS acu_deb, 
	acu.cre_01+acu.cre_02+acu.cre_03+acu.cre_04+acu.cre_05+acu.cre_06+acu.cre_07+acu.cre_08+acu.cre_09+acu.cre_10+acu.cre_11 AS acu_cre, 
	acu.sal_11 AS sal_nue, 
	ter.ter_nombre, suc.nom_suc, 
	cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
FROM dbo.cnt_acusyc AS acu WITH(NOLOCK) 
	INNER JOIN dbo.cnt_puc AS puc WITH(NOLOCK) ON acu.cod_cta = puc.cod_cta 
	INNER JOIN dbo.gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter = ter.ter_nit 
	INNER JOIN dbo.gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc = suc.cod_suc 
	INNER JOIN dbo.gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco = cco.cod_cco 
	INNER JOIN dbo.gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1 = cl1.codigo 
	INNER JOIN dbo.gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2 = cl2.codigo 
	INNER JOIN dbo.gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3 = cl3.codigo

UNION ALL

SELECT acu.ano_acu, '12' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, 
	acu.cod_cl3, acu.sal_11 AS sal_ant, 
	acu.deb_01+acu.deb_02+acu.deb_03+acu.deb_04+acu.deb_05+acu.deb_06+acu.deb_07+acu.deb_08+acu.deb_09+acu.deb_10+acu.deb_11+acu.deb_12 AS acu_deb, 
	acu.cre_01+acu.cre_02+acu.cre_03+acu.cre_04+acu.cre_05+acu.cre_06+acu.cre_07+acu.cre_08+acu.cre_09+acu.cre_10+acu.cre_11+acu.cre_12 AS acu_cre, 
	acu.sal_12 AS sal_nue, 
	ter.ter_nombre, suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
FROM dbo.cnt_acusyc AS acu WITH(NOLOCK) 
	INNER JOIN dbo.cnt_puc AS puc WITH(NOLOCK) ON acu.cod_cta = puc.cod_cta 
	INNER JOIN dbo.gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter = ter.ter_nit 
	INNER JOIN dbo.gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc = suc.cod_suc 
	INNER JOIN dbo.gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco = cco.cod_cco 
	INNER JOIN dbo.gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1 = cl1.codigo 
	INNER JOIN dbo.gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2 = cl2.codigo 
	INNER JOIN dbo.gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3 = cl3.codigo

UNION ALL

SELECT acu.ano_acu, '13' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, 
	acu.cod_cl3, acu.sal_12 AS sal_ant, 
	acu.deb_01+acu.deb_02+acu.deb_03+acu.deb_04+acu.deb_05+acu.deb_06+acu.deb_07+acu.deb_08+acu.deb_09+acu.deb_10+acu.deb_11+acu.deb_12+acu.deb_13 AS acu_deb, 
	acu.deb_01+acu.deb_02+acu.deb_03+acu.deb_04+acu.deb_05+acu.deb_06+acu.deb_07+acu.deb_08+acu.deb_09+acu.deb_10+acu.deb_11+acu.deb_12+acu.cre_13 AS acu_cre, 
	acu.sal_13 AS sal_nue, 
	ter.ter_nombre, suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
FROM dbo.cnt_acusyc AS acu WITH(NOLOCK) 
	INNER JOIN dbo.cnt_puc AS puc WITH(NOLOCK) ON acu.cod_cta = puc.cod_cta 
	INNER JOIN dbo.gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter = ter.ter_nit 
	INNER JOIN dbo.gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc = suc.cod_suc 
	INNER JOIN dbo.gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco = cco.cod_cco 
	INNER JOIN dbo.gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1 = cl1.codigo 
	INNER JOIN dbo.gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2 = cl2.codigo 
	INNER JOIN dbo.gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3 = cl3.codigo;

```
