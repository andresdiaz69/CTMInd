# View: v_cnt_acumes_ext

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

CREATE VIEW [dbo].[v_cnt_acumes_ext] 
AS
SELECT acu.ano_acu, '01' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, 
			acu.cod_cl3, acu.sax_00 AS sal_ant, acu.dex_01 AS acu_deb, acu.cex_01 AS acu_cre, acu.sax_01 AS sal_nue, ter.ter_nombre, suc.nom_suc, 
			cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta, puc.tip_mon
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
			acu.cod_cl3, acu.sax_01 AS sal_ant, acu.dex_02 AS acu_deb, acu.cex_02 AS acu_cre, acu.sax_02 AS sal_nue, ter.ter_nombre, suc.nom_suc, 
			cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta, puc.tip_mon
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
			acu.cod_cl3, acu.sax_02 AS sal_ant, acu.dex_03 AS acu_deb, acu.cex_03 AS acu_cre, acu.sax_03 AS sal_nue, ter.ter_nombre, suc.nom_suc, 
			cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta, puc.tip_mon
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
			acu.cod_cl3, acu.sax_03 AS sal_ant, acu.dex_04 AS acu_deb, acu.cex_04 AS acu_cre, acu.sax_04 AS sal_nue, ter.ter_nombre, suc.nom_suc, 
			cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta, puc.tip_mon
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
			acu.cod_cl3, acu.sax_04 AS sal_ant, acu.dex_05 AS acu_deb, acu.cex_05 AS acu_cre, acu.sax_05 AS sal_nue, ter.ter_nombre, suc.nom_suc, 
			cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta, puc.tip_mon
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
			acu.cod_cl3, acu.sax_05 AS sal_ant, acu.dex_06 AS acu_deb, acu.cex_06 AS acu_cre, acu.sax_06 AS sal_nue, ter.ter_nombre, suc.nom_suc, 
			cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta, puc.tip_mon
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
			acu.cod_cl3, acu.sax_06 AS sal_ant, acu.dex_07 AS acu_deb, acu.cex_07 AS acu_cre, acu.sax_07 AS sal_nue, ter.ter_nombre, suc.nom_suc, 
			cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta, puc.tip_mon
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
                      acu.cod_cl3, acu.sax_07 AS sal_ant, acu.dex_08 AS acu_deb, acu.cex_08 AS acu_cre, acu.sax_08 AS sal_nue, ter.ter_nombre, suc.nom_suc, 
                      cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta, puc.tip_mon
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
			acu.cod_cl3, acu.sax_08 AS sal_ant, acu.dex_09 AS acu_deb, acu.cex_09 AS acu_cre, acu.sax_09 AS sal_nue, ter.ter_nombre, suc.nom_suc, 
			cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta, puc.tip_mon
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
			acu.cod_cl3, acu.sax_09 AS sal_ant, acu.dex_10 AS acu_deb, acu.cex_10 AS acu_cre, acu.sax_10 AS sal_nue, ter.ter_nombre, suc.nom_suc, 
			cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta, puc.tip_mon
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
			acu.cod_cl3, acu.sax_10 AS sal_ant, acu.dex_11 AS acu_deb, acu.cex_11 AS acu_cre, acu.sax_11 AS sal_nue, ter.ter_nombre, suc.nom_suc, 
			cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta, puc.tip_mon
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
			acu.cod_cl3, acu.sax_11 AS sal_ant, acu.dex_12 AS acu_deb, acu.cex_12 AS acu_cre, acu.sax_12 AS sal_nue, ter.ter_nombre, suc.nom_suc, 
			cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta, puc.tip_mon
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
			acu.cod_cl3, acu.sax_12 AS sal_ant, acu.dex_13 AS acu_deb, acu.cex_13 AS acu_cre, acu.sax_13 AS sal_nue, ter.ter_nombre, suc.nom_suc, 
			cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta, puc.tip_mon
FROM dbo.cnt_acusyc AS acu WITH(NOLOCK) 
	INNER JOIN dbo.cnt_puc AS puc WITH(NOLOCK) ON acu.cod_cta = puc.cod_cta 
	INNER JOIN dbo.gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter = ter.ter_nit 
	INNER JOIN dbo.gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc = suc.cod_suc 
	INNER JOIN dbo.gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco = cco.cod_cco 
	INNER JOIN dbo.gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1 = cl1.codigo 
	INNER JOIN dbo.gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2 = cl2.codigo 
	INNER JOIN dbo.gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3 = cl3.codigo;

```
