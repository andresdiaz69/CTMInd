# View: v_sp_rhh_Registraduria

## Usa los objetos:
- [[fn_rhh_Hislab_NumSec_cont]]
- [[rhh_emplea]]
- [[rhh_estudio]]
- [[rhh_hislab]]
- [[rhh_tbclaest]]
- [[rhh_tbestud]]

```sql

-- Alexandra Mesa, 11/2019
-- Consulta para archivo plano Registraduría

CREATE VIEW v_sp_rhh_Registraduria
AS

	SELECT num_ide, RTRIM(nom1_emp) AS NOMBRE1, RTRIM(nom2_emp) AS NOMBRE2, RTRIM(ap1_emp) AS APELLIDO1, RTRIM(ap2_emp) AS APELLIDO2,
		   RTRIM(dir_res) AS DIRECCION, 
		   CASE WHEN RTRIM(tel_res) IS NULL OR RTRIM(tel_res) = '' THEN '0' 
				ELSE RTRIM(tel_res) 
		   END AS TELEFONO, 
		   CASE WHEN  RTRIM(tel_cel) IS NULL OR  RTRIM(tel_cel) = '' THEN '0' 
				ELSE  RTRIM(tel_cel) 
		   END AS CELULAR, 
		   RTRIM(e_mail) AS CORREO,
		   convert(int,isnull(MAX(EST.tip_est),'0')) AS NIVEL_EDUCATIVO, '99' AS FILIACION_POLITICA, 
		   CASE ISNULL(hl.clasif_cat,'0') WHEN '' THEN '0' ELSE isnull(hl.clasif_cat,'0') END AS TIPO_EMPLEADO, HL.fec_ini, 
		   isnull(MAX(C.ord_est),0) AS ORD
	FROM rhh_emplea E
	INNER JOIN rhh_hislab HL ON E.cod_emp = HL.cod_emp AND HL.num_sec = dbo.fn_rhh_Hislab_NumSec_cont(E.cod_emp,HL.cod_con,GETDATE(),0,1)
	--LEFT JOIN rhh_clasif_vh CV ON CV.cod_cla = HL.clasif_cat
	LEFT JOIN rhh_estudio ES ON E.cod_emp = ES.cod_emp
	LEFT JOIN	rhh_tbestud  EST ON ES.cod_est = EST.cod_est
	LEFT JOIN rhh_tbclaest C ON EST.tip_est = EST.tip_est AND ord_est IS NOT NULL
	WHERE est_lab NOT IN ('0','99')
	GROUP BY num_ide, nom1_emp, nom2_emp, ap1_emp, ap2_emp, dir_res, tel_res, tel_cel, e_mail, hl.clasif_cat, HL.fec_ini

```
