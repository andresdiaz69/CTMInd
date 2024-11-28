# View: v_pre_acumula

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_sucursal]]
- [[pre_acumula]]
- [[pre_rubro]]

```sql



CREATE VIEW [dbo].[v_pre_acumula] 
AS
SELECT a.ano_acu,'01' AS periodo,a.cod_rubro,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,a.com_01 AS compromiso,a.sal_apr01 AS saldo,
a.fac_01 AS facturado,b.nom_rub,c.nom_suc,d.nom_cco,e.nombre AS nom_cl1,f.nombre AS nom_cl2,g.nombre AS nom_cl3
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
INNER JOIN gen_sucursal c ON a.cod_suc=c.cod_suc
INNER JOIN gen_ccosto d ON a.cod_cco=d.cod_cco
INNER JOIN gen_clasif1 e ON a.cod_cl1=e.codigo
INNER JOIN gen_clasif2 f ON a.cod_cl2=f.codigo
INNER JOIN gen_clasif3 g ON a.cod_cl3=g.codigo
UNION ALL SELECT a.ano_acu,'02' AS periodo,a.cod_rubro,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,a.com_02 AS compromiso,a.sal_apr02 AS saldo,
a.fac_02 AS facturado,b.nom_rub,c.nom_suc,d.nom_cco,e.nombre AS nom_cl1,f.nombre AS nom_cl2,g.nombre AS nom_cl3
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
INNER JOIN gen_sucursal c ON a.cod_suc=c.cod_suc
INNER JOIN gen_ccosto d ON a.cod_cco=d.cod_cco
INNER JOIN gen_clasif1 e ON a.cod_cl1=e.codigo
INNER JOIN gen_clasif2 f ON a.cod_cl2=f.codigo
INNER JOIN gen_clasif3 g ON a.cod_cl3=g.codigo
UNION ALL SELECT a.ano_acu,'03' AS periodo,a.cod_rubro,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,a.com_03 AS compromiso,a.sal_apr03 AS saldo,
a.fac_03 AS facturado,b.nom_rub,c.nom_suc,d.nom_cco,e.nombre AS nom_cl1,f.nombre AS nom_cl2,g.nombre AS nom_cl3
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
INNER JOIN gen_sucursal c ON a.cod_suc=c.cod_suc
INNER JOIN gen_ccosto d ON a.cod_cco=d.cod_cco
INNER JOIN gen_clasif1 e ON a.cod_cl1=e.codigo
INNER JOIN gen_clasif2 f ON a.cod_cl2=f.codigo
INNER JOIN gen_clasif3 g ON a.cod_cl3=g.codigo
UNION ALL SELECT a.ano_acu,'04' AS periodo,a.cod_rubro,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,a.com_04 AS compromiso,a.sal_apr04 AS saldo,
a.fac_04 AS facturado,b.nom_rub,c.nom_suc,d.nom_cco,e.nombre AS nom_cl1,f.nombre AS nom_cl2,g.nombre AS nom_cl3
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
INNER JOIN gen_sucursal c ON a.cod_suc=c.cod_suc
INNER JOIN gen_ccosto d ON a.cod_cco=d.cod_cco
INNER JOIN gen_clasif1 e ON a.cod_cl1=e.codigo
INNER JOIN gen_clasif2 f ON a.cod_cl2=f.codigo
INNER JOIN gen_clasif3 g ON a.cod_cl3=g.codigo
UNION ALL SELECT a.ano_acu,'05' AS periodo,a.cod_rubro,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,a.com_05 AS compromiso,a.sal_apr05 AS saldo,
a.fac_05 AS facturado,b.nom_rub,c.nom_suc,d.nom_cco,e.nombre AS nom_cl1,f.nombre AS nom_cl2,g.nombre AS nom_cl3
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
INNER JOIN gen_sucursal c ON a.cod_suc=c.cod_suc
INNER JOIN gen_ccosto d ON a.cod_cco=d.cod_cco
INNER JOIN gen_clasif1 e ON a.cod_cl1=e.codigo
INNER JOIN gen_clasif2 f ON a.cod_cl2=f.codigo
INNER JOIN gen_clasif3 g ON a.cod_cl3=g.codigo
UNION ALL SELECT a.ano_acu,'06' AS periodo,a.cod_rubro,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,a.com_06 AS compromiso,a.sal_apr06 AS saldo,
a.fac_06 AS facturado,b.nom_rub,c.nom_suc,d.nom_cco,e.nombre AS nom_cl1,f.nombre AS nom_cl2,g.nombre AS nom_cl3
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
INNER JOIN gen_sucursal c ON a.cod_suc=c.cod_suc
INNER JOIN gen_ccosto d ON a.cod_cco=d.cod_cco
INNER JOIN gen_clasif1 e ON a.cod_cl1=e.codigo
INNER JOIN gen_clasif2 f ON a.cod_cl2=f.codigo
INNER JOIN gen_clasif3 g ON a.cod_cl3=g.codigo
UNION ALL SELECT a.ano_acu,'07' AS periodo,a.cod_rubro,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,a.com_07 AS compromiso,a.sal_apr07 AS saldo,
a.fac_07 AS facturado,b.nom_rub,c.nom_suc,d.nom_cco,e.nombre AS nom_cl1,f.nombre AS nom_cl2,g.nombre AS nom_cl3
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
INNER JOIN gen_sucursal c ON a.cod_suc=c.cod_suc
INNER JOIN gen_ccosto d ON a.cod_cco=d.cod_cco
INNER JOIN gen_clasif1 e ON a.cod_cl1=e.codigo
INNER JOIN gen_clasif2 f ON a.cod_cl2=f.codigo
INNER JOIN gen_clasif3 g ON a.cod_cl3=g.codigo
UNION ALL SELECT a.ano_acu,'08' AS periodo,a.cod_rubro,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,a.com_08 AS compromiso,a.sal_apr08 AS saldo,
a.fac_08 AS facturado,b.nom_rub,c.nom_suc,d.nom_cco,e.nombre AS nom_cl1,f.nombre AS nom_cl2,g.nombre AS nom_cl3
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
INNER JOIN gen_sucursal c ON a.cod_suc=c.cod_suc
INNER JOIN gen_ccosto d ON a.cod_cco=d.cod_cco
INNER JOIN gen_clasif1 e ON a.cod_cl1=e.codigo
INNER JOIN gen_clasif2 f ON a.cod_cl2=f.codigo
INNER JOIN gen_clasif3 g ON a.cod_cl3=g.codigo
UNION ALL SELECT a.ano_acu,'09' AS periodo,a.cod_rubro,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,a.com_09 AS compromiso,a.sal_apr09 AS saldo,
a.fac_09 AS facturado,b.nom_rub,c.nom_suc,d.nom_cco,e.nombre AS nom_cl1,f.nombre AS nom_cl2,g.nombre AS nom_cl3
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
INNER JOIN gen_sucursal c ON a.cod_suc=c.cod_suc
INNER JOIN gen_ccosto d ON a.cod_cco=d.cod_cco
INNER JOIN gen_clasif1 e ON a.cod_cl1=e.codigo
INNER JOIN gen_clasif2 f ON a.cod_cl2=f.codigo
INNER JOIN gen_clasif3 g ON a.cod_cl3=g.codigo
UNION ALL SELECT a.ano_acu,'10' AS periodo,a.cod_rubro,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,a.com_10 AS compromiso,a.sal_apr10 AS saldo,
a.fac_10 AS facturado,b.nom_rub,c.nom_suc,d.nom_cco,e.nombre AS nom_cl1,f.nombre AS nom_cl2,g.nombre AS nom_cl3
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
INNER JOIN gen_sucursal c ON a.cod_suc=c.cod_suc
INNER JOIN gen_ccosto d ON a.cod_cco=d.cod_cco
INNER JOIN gen_clasif1 e ON a.cod_cl1=e.codigo
INNER JOIN gen_clasif2 f ON a.cod_cl2=f.codigo
INNER JOIN gen_clasif3 g ON a.cod_cl3=g.codigo
UNION ALL SELECT a.ano_acu,'11' AS periodo,a.cod_rubro,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,a.com_11 AS compromiso,a.sal_apr11 AS saldo,
a.fac_11 AS facturado,b.nom_rub,c.nom_suc,d.nom_cco,e.nombre AS nom_cl1,f.nombre AS nom_cl2,g.nombre AS nom_cl3
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
INNER JOIN gen_sucursal c ON a.cod_suc=c.cod_suc
INNER JOIN gen_ccosto d ON a.cod_cco=d.cod_cco
INNER JOIN gen_clasif1 e ON a.cod_cl1=e.codigo
INNER JOIN gen_clasif2 f ON a.cod_cl2=f.codigo
INNER JOIN gen_clasif3 g ON a.cod_cl3=g.codigo
UNION ALL SELECT a.ano_acu,'12' AS periodo,a.cod_rubro,a.cod_suc,a.cod_cco,a.cod_cl1,a.cod_cl2,a.cod_cl3,a.com_12 AS compromiso,a.sal_apr12 AS saldo,
a.fac_12 AS facturado,b.nom_rub,c.nom_suc,d.nom_cco,e.nombre AS nom_cl1,f.nombre AS nom_cl2,g.nombre AS nom_cl3
FROM pre_acumula a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub
INNER JOIN gen_sucursal c ON a.cod_suc=c.cod_suc
INNER JOIN gen_ccosto d ON a.cod_cco=d.cod_cco
INNER JOIN gen_clasif1 e ON a.cod_cl1=e.codigo
INNER JOIN gen_clasif2 f ON a.cod_cl2=f.codigo
INNER JOIN gen_clasif3 g ON a.cod_cl3=g.codigo





```
