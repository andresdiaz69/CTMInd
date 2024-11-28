# View: v_nif_acumes

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_sucursal]]
- [[gen_terceros]]
- [[nif_acusyc]]
- [[nif_puc]]

```sql

/*AFLOREZ MAYO/2022 SRS2022-0461 SE AGREGAN CAMPOS DE LA CUENTA CONSULTADA*/
CREATE VIEW [dbo].[v_nif_acumes] 
AS
SELECT acu.ano_acu, '01' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, 
	acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, acu.cod_cl3, 
	sal_00 AS sal_ant, deb_01 AS acu_deb, cre_01 AS acu_cre, sal_01 AS sal_nue,
	ter.ter_nombre, suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
	,puc.est_cta,puc.tip_mon
FROM nif_acusyc AS acu WITH(NOLOCK)
	INNER JOIN nif_puc AS puc WITH(NOLOCK) ON acu.cod_cta=puc.cod_cta
	INNER JOIN gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter=ter.ter_nit
	INNER JOIN gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc=suc.cod_suc
	INNER JOIN gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco=cco.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1=cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2=cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3=cl3.codigo

UNION ALL 

SELECT acu.ano_acu, '02' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, 
	acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, acu.cod_cl3, 
	sal_01 AS sal_ant, deb_02 AS acu_deb, cre_02 AS acu_cre, sal_02 AS sal_nue,
	ter.ter_nombre, suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
	,puc.est_cta,puc.tip_mon
FROM nif_acusyc AS acu WITH(NOLOCK) 
	INNER JOIN nif_puc AS puc WITH(NOLOCK) ON acu.cod_cta=puc.cod_cta
	INNER JOIN gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter=ter.ter_nit
	INNER JOIN gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc=suc.cod_suc
	INNER JOIN gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco=cco.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1=cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2=cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3=cl3.codigo

UNION ALL 

SELECT acu.ano_acu, '03' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, 
	acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, acu.cod_cl3, 
	sal_02 AS sal_ant, deb_03 AS acu_deb, cre_03 AS acu_cre, sal_03 AS sal_nue,
	ter.ter_nombre, suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
	,puc.est_cta,puc.tip_mon
FROM nif_acusyc AS acu 
	INNER JOIN nif_puc AS puc WITH(NOLOCK) ON acu.cod_cta=puc.cod_cta
	INNER JOIN gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter=ter.ter_nit
	INNER JOIN gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc=suc.cod_suc
	INNER JOIN gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco=cco.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1=cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2=cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3=cl3.codigo

UNION ALL 

SELECT acu.ano_acu, '04' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, 
	acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, acu.cod_cl3, 
	sal_03 AS sal_ant, deb_04 AS acu_deb, cre_04 AS acu_cre, sal_04 AS sal_nue,
	ter.ter_nombre, suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
	,puc.est_cta,puc.tip_mon
FROM nif_acusyc AS acu WITH(NOLOCK) 
	INNER JOIN nif_puc AS puc WITH(NOLOCK) ON acu.cod_cta=puc.cod_cta
	INNER JOIN gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter=ter.ter_nit
	INNER JOIN gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc=suc.cod_suc
	INNER JOIN gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco=cco.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1=cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2=cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3=cl3.codigo

UNION ALL 

SELECT acu.ano_acu, '05' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, 
	acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, acu.cod_cl3, 
	sal_04 AS sal_ant, deb_05 AS acu_deb, cre_05 AS acu_cre, sal_05 AS sal_nue,
	ter.ter_nombre, suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
	,puc.est_cta,puc.tip_mon
FROM nif_acusyc AS acu WITH(NOLOCK) 
	INNER JOIN nif_puc AS puc WITH(NOLOCK) ON acu.cod_cta=puc.cod_cta
	INNER JOIN gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter=ter.ter_nit
	INNER JOIN gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc=suc.cod_suc
	INNER JOIN gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco=cco.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1=cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2=cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3=cl3.codigo

UNION ALL 

SELECT acu.ano_acu, '06' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, 
	acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, acu.cod_cl3, 
	sal_05 AS sal_ant, deb_06 AS acu_deb, cre_06 AS acu_cre, sal_06 AS sal_nue,
	ter.ter_nombre, suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
	,puc.est_cta,puc.tip_mon
FROM nif_acusyc AS acu WITH(NOLOCK) 
	INNER JOIN nif_puc AS puc WITH(NOLOCK) ON acu.cod_cta=puc.cod_cta
	INNER JOIN gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter=ter.ter_nit
	INNER JOIN gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc=suc.cod_suc
	INNER JOIN gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco=cco.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1=cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2=cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3=cl3.codigo

UNION ALL 

SELECT acu.ano_acu, '07' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, 
	acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, acu.cod_cl3, 
	sal_06 AS sal_ant, deb_07 AS acu_deb, cre_07 AS acu_cre, sal_07 AS sal_nue,
	ter.ter_nombre, suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
	,puc.est_cta,puc.tip_mon
FROM nif_acusyc AS acu WITH(NOLOCK) 
	INNER JOIN nif_puc AS puc WITH(NOLOCK) ON acu.cod_cta=puc.cod_cta
	INNER JOIN gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter=ter.ter_nit
	INNER JOIN gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc=suc.cod_suc
	INNER JOIN gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco=cco.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1=cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2=cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3=cl3.codigo

UNION ALL 

SELECT acu.ano_acu, '08' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, 
	acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, acu.cod_cl3, 
	sal_07 AS sal_ant, deb_08 AS acu_deb, cre_08 AS acu_cre, sal_08 AS sal_nue,
	ter.ter_nombre, suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
	,puc.est_cta,puc.tip_mon
FROM nif_acusyc AS acu WITH(NOLOCK) 
	INNER JOIN nif_puc AS puc WITH(NOLOCK) ON acu.cod_cta=puc.cod_cta
	INNER JOIN gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter=ter.ter_nit
	INNER JOIN gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc=suc.cod_suc
	INNER JOIN gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco=cco.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1=cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2=cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3=cl3.codigo

UNION ALL 

SELECT acu.ano_acu, '09' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, 
	acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, acu.cod_cl3, 
	sal_08 AS sal_ant, deb_09 AS acu_deb, cre_09 AS acu_cre, sal_09 AS sal_nue,
	ter.ter_nombre, suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
	,puc.est_cta,puc.tip_mon
FROM nif_acusyc AS acu WITH(NOLOCK) 
	INNER JOIN nif_puc AS puc WITH(NOLOCK) ON acu.cod_cta=puc.cod_cta
	INNER JOIN gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter=ter.ter_nit
	INNER JOIN gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc=suc.cod_suc
	INNER JOIN gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco=cco.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1=cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2=cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3=cl3.codigo

UNION ALL 

SELECT acu.ano_acu, '10' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, 
	acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, acu.cod_cl3, 
	sal_09 AS sal_ant, deb_10 AS acu_deb, cre_10 AS acu_cre, sal_10 AS sal_nue,
	ter.ter_nombre, suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
	,puc.est_cta,puc.tip_mon
FROM nif_acusyc AS acu WITH(NOLOCK) 
	INNER JOIN nif_puc AS puc WITH(NOLOCK) ON acu.cod_cta=puc.cod_cta
	INNER JOIN gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter=ter.ter_nit
	INNER JOIN gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc=suc.cod_suc
	INNER JOIN gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco=cco.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1=cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2=cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3=cl3.codigo

UNION ALL 

SELECT acu.ano_acu, '11' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, 
	acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, acu.cod_cl3, 
	sal_10 AS sal_ant, deb_11 AS acu_deb, cre_11 AS acu_cre, sal_11 AS sal_nue,
	ter.ter_nombre, suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
	,puc.est_cta,puc.tip_mon
FROM nif_acusyc AS acu WITH(NOLOCK) 
	INNER JOIN nif_puc AS puc WITH(NOLOCK) ON acu.cod_cta=puc.cod_cta
	INNER JOIN gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter=ter.ter_nit
	INNER JOIN gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc=suc.cod_suc
	INNER JOIN gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco=cco.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1=cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2=cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3=cl3.codigo

UNION ALL 

SELECT acu.ano_acu, '12' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, 
	acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, acu.cod_cl3, 
	sal_11 AS sal_ant, deb_12 AS acu_deb, cre_12 AS acu_cre, sal_12 AS sal_nue,
	ter.ter_nombre, suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
	,puc.est_cta,puc.tip_mon
FROM nif_acusyc AS acu WITH(NOLOCK) 
	INNER JOIN nif_puc AS puc WITH(NOLOCK) ON acu.cod_cta=puc.cod_cta
	INNER JOIN gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter=ter.ter_nit
	INNER JOIN gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc=suc.cod_suc
	INNER JOIN gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco=cco.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1=cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2=cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3=cl3.codigo

UNION ALL 

SELECT acu.ano_acu, '13' AS Periodo, acu.cod_cta, puc.nom_cta, puc.niv_cta, puc.tip_cta, acu.cod_suc, 
	acu.cod_cco, acu.cod_ter, acu.cod_cl1, acu.cod_cl2, acu.cod_cl3, 
	sal_12 AS sal_ant, deb_13 AS acu_deb, cre_13 AS acu_cre, sal_13 AS sal_nue,
	ter.ter_nombre, suc.nom_suc, cco.nom_cco, cl1.nombre AS nom_cl1, cl2.nombre AS nom_cl2, cl3.nombre AS nom_cl3, puc.nat_cta
	,puc.est_cta,puc.tip_mon
FROM nif_acusyc AS acu WITH(NOLOCK) 
	INNER JOIN nif_puc AS puc WITH(NOLOCK) ON acu.cod_cta=puc.cod_cta
	INNER JOIN gen_terceros AS ter WITH(NOLOCK) ON acu.cod_ter=ter.ter_nit
	INNER JOIN gen_sucursal AS suc WITH(NOLOCK) ON acu.cod_suc=suc.cod_suc
	INNER JOIN gen_ccosto AS cco WITH(NOLOCK) ON acu.cod_cco=cco.cod_cco
	INNER JOIN gen_clasif1 AS cl1 WITH(NOLOCK) ON acu.cod_cl1=cl1.codigo
	INNER JOIN gen_clasif2 AS cl2 WITH(NOLOCK) ON acu.cod_cl2=cl2.codigo
	INNER JOIN gen_clasif3 AS cl3 WITH(NOLOCK) ON acu.cod_cl3=cl3.codigo;

```
