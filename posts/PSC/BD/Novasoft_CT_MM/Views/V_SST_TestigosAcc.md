# View: V_SST_TestigosAcc

## Usa los objetos:
- [[Fn_rhh_NombreCompleto]]
- [[GTH_Accidente]]
- [[GTH_Emplea_Externo]]
- [[SST_IntegraInvestigacionAcc]]

```sql
CREATE VIEW [dbo].[V_SST_TestigosAcc]
AS
SELECT cod_emp, cod_acc, NULL AS cons_doc, cod_emp AS cod_testigo, dbo.Fn_rhh_NombreCompleto(cod_emp,2) AS nombre
FROM GTH_Accidente
UNION
SELECT cod_emp, cod_acc, NULL AS cons_doc, num_doc1 AS cod_testigo, nombre1 AS nombre
FROM GTH_Accidente
WHERE num_doc1 IS NOT NULL AND nombre1 IS NOT NULL AND num_doc1 <> '' AND nombre1 <> ''
UNION
SELECT cod_emp, cod_acc, NULL AS cons_doc, num_doc2 AS cod_testigo, nombre2 AS nombre
FROM GTH_Accidente
WHERE num_doc2 IS NOT NULL AND nombre2 IS NOT NULL AND num_doc2 <> '' AND nombre2 <> ''
UNION
SELECT cod_emp, cod_acc, cons_doc, emp_inv AS cod_testigo, 
(CASE 
	WHEN RTRIM(dbo.Fn_rhh_NombreCompleto(emp_inv,2)) <> '' THEN RTRIM(dbo.Fn_rhh_NombreCompleto(emp_inv,2))
	ELSE EXT.nom_emp_ext
END) AS nombre
FROM SST_IntegraInvestigacionAcc AS ACC
LEFT JOIN GTH_Emplea_Externo AS EXT ON ACC.emp_inv = EXT.cod_emp_ext

```
