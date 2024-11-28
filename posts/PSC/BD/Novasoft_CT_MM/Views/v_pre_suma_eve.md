# View: v_pre_suma_eve

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_sucursal]]
- [[pre_rubro]]
- [[v_pre_acum_deta]]

```sql




CREATE VIEW [dbo].[v_pre_suma_eve]
AS
SELECT a.ano_acu,a.cod_rubro,b.nom_rub,a.cod_cl1,c.nombre AS nom_cl1,a.cod_cl2,d.nombre AS nom_cl2,a.cod_cl3,e.nombre AS nom_cl3,a.cod_suc,g.nom_suc,a.cod_cco,f.nom_cco,
SUM(det01) AS det1,
SUM(det01+det02) AS det2,
SUM(det01+det02+det03) AS det3,
SUM(det01+det02+det03+det04) AS det4,
SUM(det01+det02+det03+det04+det05) AS det5,
SUM(det01+det02+det03+det04+det05+det06) AS det6,
SUM(det01+det02+det03+det04+det05+det06+det07) AS det7,
SUM(det01+det02+det03+det04+det05+det06+det07+det08) AS det8,
SUM(det01+det02+det03+det04+det05+det06+det07+det08+det09) AS det9,
SUM(det01+det02+det03+det04+det05+det06+det07+det08+det09+det10) AS det10,
SUM(det01+det02+det03+det04+det05+det06+det07+det08+det09+det10+det11) AS det11,
SUM(det01+det02+det03+det04+det05+det06+det07+det08+det09+det10+det11+det12) AS presupuesto,
SUM(com_01) AS com1,
SUM(com_01+com_02) AS com2,
SUM(com_01+com_02+com_03) AS com3,
SUM(com_01+com_02+com_03+com_04) AS com4,
SUM(com_01+com_02+com_03+com_04+com_05) AS com5,
SUM(com_01+com_02+com_03+com_04+com_05+com_06) AS com6,
SUM(com_01+com_02+com_03+com_04+com_05+com_06+com_07) AS com7,
SUM(com_01+com_02+com_03+com_04+com_05+com_06+com_07+com_08) AS com8,
SUM(com_01+com_02+com_03+com_04+com_05+com_06+com_07+com_08+com_09) AS com9,
SUM(com_01+com_02+com_03+com_04+com_05+com_06+com_07+com_08+com_09+com_10) AS com10,
SUM(com_01+com_02+com_03+com_04+com_05+com_06+com_07+com_08+com_09+com_10+com_11) AS com11,
SUM(com_01+com_02+com_03+com_04+com_05+com_06+com_07+com_08+com_09+com_10+com_11+com_12) AS compromiso,
SUM(fac_01) AS fac1,
SUM(fac_01+fac_02) AS fac2,
SUM(fac_01+fac_02+fac_03) AS fac3,
SUM(fac_01+fac_02+fac_03+fac_04) AS fac4,
SUM(fac_01+fac_02+fac_03+fac_04+fac_05) AS fac5,
SUM(fac_01+fac_02+fac_03+fac_04+fac_05+fac_06) AS fac6,
SUM(fac_01+fac_02+fac_03+fac_04+fac_05+fac_06+fac_07) AS fac7,
SUM(fac_01+fac_02+fac_03+fac_04+fac_05+fac_06+fac_07+fac_08) AS fac8,
SUM(fac_01+fac_02+fac_03+fac_04+fac_05+fac_06+fac_07+fac_08+fac_09) AS fac9,
SUM(fac_01+fac_02+fac_03+fac_04+fac_05+fac_06+fac_07+fac_08+fac_09+fac_10) AS fac10,
SUM(fac_01+fac_02+fac_03+fac_04+fac_05+fac_06+fac_07+fac_08+fac_09+fac_10+fac_11) AS fac11,
SUM(fac_01+fac_02+fac_03+fac_04+fac_05+fac_06+fac_07+fac_08+fac_09+fac_10+fac_11+fac_12)  AS Ejecucion
FROM v_pre_acum_deta a INNER JOIN pre_rubro b ON a.cod_rubro=b.cod_rub  
INNER JOIN gen_clasif1 c ON a.cod_cl1=c.codigo
INNER JOIN gen_clasif2 d ON a.cod_cl2=d.codigo
INNER JOIN gen_clasif3 e ON a.cod_cl3=e.codigo
INNER JOIN gen_ccosto f ON a.cod_cco=f.cod_cco 
INNER JOIN gen_sucursal g ON a.cod_suc=g.cod_suc
group by a.ano_acu,a.cod_rubro,b.nom_rub,a.cod_cl1,a.cod_cl2,a.cod_cl3,c.nombre,d.nombre,e.nombre,a.cod_suc,g.nom_suc,a.cod_cco,f.nom_cco



```
