# Stored Procedure: PA_Portal_Datos_Basicos_HV_1608

## Usa los objetos:
- [[gen_ciudad]]
- [[gen_deptos]]
- [[gen_paises]]
- [[gth_estcivil]]
- [[rhh_emplea]]
- [[rhh_portal_emplea]]

```sql


-- =============================================
-- Author:		Alexander Vargas
-- Create date: 23/11/2017
-- Description:	Consulta los datos básicos actuales y nuevos para ser autorizados

-- Modificado: Alexander Vargas
-- Fecha:		26 mar 2018
-- comentario: se agregan las descripciones de los campos de lista como ciudad. Ej 1105-Bogota
--				tambien se validan valores en nulo

-- Modificado: Alexander Vargas
-- Fecha:		08 Ago 2018
-- comentario: SRS2019 - 0707
--				se agrega validación de campos null en celular, in dec renta,
--				avisar a y personas a cargo.
-- =============================================
CREATE PROCEDURE [dbo].[PA_Portal_Datos_Basicos_HV]
	@cod_emp CHAR(12) = NULL

--WITH ENCRYPTION	
AS
BEGIN

SELECT EXT.Descripcion, TA.cod_emp,TA.campo, TN2.valor_actual,valor_nuevo 
FROM
(	
--Se consultan los datos actuales de la HV del empleado
			SELECT A.cod_emp,RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp', CAST(A.dir_res AS VARCHAR(255)) AS dir_res,CAST(RTRIM(A.pai_res)+'_'+  P.nom_pai AS VARCHAR(255)) AS  pai_res,  CAST(A.tel_res AS VARCHAR(255)) AS tel_res,
			CAST(ISNULL(A.tel_cel,'') AS VARCHAR(255)) AS tel_cel, CAST(P.nom_pai AS VARCHAR(255)) AS nom_pai,  
			CAST(RTRIM(A.ciu_res)+'_'+ C.nom_ciu AS VARCHAR(255)) AS  'ciu_res',CAST(RTRIM(A.dpt_res +'_'+ D.nom_dep) AS VARCHAR(255)) AS dpt_res,CAST(AE.des_est AS VARCHAR(255)) AS des_est , CAST(ISNULL(A.per_car,'') AS VARCHAR(255)) AS per_car, CAST(A.e_mail AS VARCHAR(255)) AS e_mail, 
			 CAST(A.barrio AS VARCHAR(255)) AS barrio, CAST(ISNULL(A.ind_DecRenta,'') AS VARCHAR(255)) AS ind_DecRenta, CAST(ISNULL(A.avi_emp,'') AS VARCHAR(255)) AS avi_emp, CAST(RIGHT(A.fto_emp,5) AS VARCHAR(255)) AS fto_emp, CAST(RTRIM(A.est_civ)+'_'+ AE.des_est AS VARCHAR(255)) AS est_civ,   
			--Campos para comparar con los nuevos
			BE.des_est AS 'T.des_estCiv',  
			B.ciu_res as 'T.ciu_res', B.per_car as 'T.per_car', B.e_mail as 'T.e_mail', B.tel_cel  as 'T.tel_cel', B.tel_res as 'T.tel_res', B.barrio  as 'T.barrio',
			B.ind_DecRenta as 'T.ind_DecRenta', B.avi_emp as 'T.avi_emp', B.fto_emp as 'T.fto_emp', CASE A.ind_DecRenta WHEN 0 THEN 'No aplica' WHEN '1' THEN 'Aplica' WHEN '2' THEN 'Trabajador por cuenta propia' END AS 'Declarante'
			--====================================
			FROM rhh_portal_emplea A left JOIN rhh_emplea B on B.cod_emp=A.cod_emp
				left JOIN gth_estcivil AE on AE.cod_est = A.est_civ
					LEFT JOIN gth_estcivil BE on BE.cod_est = B.est_civ
						LEFT JOIN gen_paises P ON P.cod_pai = A.pai_res
							LEFT JOIN gen_deptos D ON D.cod_dep=A.dpt_res and D.cod_pai=A.pai_res
								LEFT JOIN gen_ciudad C ON C.cod_ciu=A.ciu_res and C.cod_dep=A.dpt_res and C.cod_pai=A.pai_res
								WHERE A.cod_emp=@cod_emp) P
UNPIVOT (valor_nuevo FOR campo IN (ciu_res,pai_res,dpt_res,dir_res,tel_res,tel_cel,nom_pai,des_est,per_car,e_mail,barrio,ind_DecRenta,avi_emp,est_civ,fto_emp)) AS TA

LEFT JOIN 
(
SELECT *
FROM
(		
--Se consultan los datos nuevos de la HV modificados por el empleado 
	SELECT A.cod_emp,--Campos para comparar con los nuevos
			CAST(BE.des_est AS VARCHAR(255)) AS  'des_estCiv', CAST(B.dir_res AS VARCHAR(255)) AS  'dir_res', CAST(RTRIM(B.pai_res)+'_'+  P.nom_pai AS VARCHAR(255)) AS  pai_res, 
			 CAST(RTRIM(B.ciu_res)+'_'+ C.nom_ciu AS VARCHAR(255)) AS  'ciu_res',CAST(RTRIM(A.dpt_res +'_'+ D.nom_dep) AS VARCHAR(255)) AS dpt_res,CAST(ISNULL(B.per_car,'') AS VARCHAR(255)) AS  'per_car', CAST(B.e_mail AS VARCHAR(255)) AS  'e_mail', CAST(ISNULL(B.tel_cel,'') AS VARCHAR(255)) AS tel_cel , CAST(B.barrio AS VARCHAR(255)) AS barrio,
			 CAST(P.nom_pai AS VARCHAR(255)) AS nom_pai,CAST(C.nom_ciu AS VARCHAR(255)) AS nom_ciu,CAST(D.nom_dep AS VARCHAR(255)) AS nom_dep, CAST(B.tel_res AS VARCHAR(255)) AS tel_res, CAST(IIF(A.fto_emp IS NULL,'', RIGHT(A.fto_emp,5)) AS VARCHAR(255)) AS fto_emp, CAST(RTRIM(A.est_civ)+'_'+ AE.des_est AS VARCHAR(255)) AS est_civ, 
			CAST(ISNULL(B.ind_DecRenta,'') AS VARCHAR(255)) AS  'ind_DecRenta',CAST(ISNULL(B.avi_emp,'') AS VARCHAR(255)) AS 'avi_emp', B.fto_emp as 'T.fto_emp', CASE CAST(A.ind_DecRenta AS VARCHAR(255)) WHEN 0 THEN 'No aplica' WHEN '1' THEN 'Aplica' WHEN '2' THEN 'Trabajador por cuenta propia' END AS 'Declarante'
			--====================================
			FROM rhh_emplea A left JOIN rhh_emplea B on B.cod_emp=A.cod_emp
				left JOIN gth_estcivil AE on AE.cod_est = A.est_civ
					LEFT JOIN gth_estcivil BE on BE.cod_est = B.est_civ
						LEFT JOIN gen_paises P ON P.cod_pai = B.pai_res
							LEFT JOIN gen_deptos D ON D.cod_dep=A.dpt_res and D.cod_pai=A.pai_res
								LEFT JOIN gen_ciudad C ON C.cod_ciu=A.ciu_res and C.cod_dep=A.dpt_res and C.cod_pai=A.pai_res
								WHERE A.cod_emp=@cod_emp) P
UNPIVOT (valor_actual FOR campo IN (est_civ,des_estCiv,dir_res,pai_res,dpt_res,ciu_res,per_car,e_mail,tel_cel,tel_res,barrio,ind_DecRenta,avi_emp,nom_pai,fto_emp)) AS TN
) AS TN2
ON TA.campo=TN2.CAMPO -- AND TA.valor_nuevo<>TN2.valor_actual 

INNER JOIN 
(
SELECT c.name AS Campo, value AS Descripcion
FROM sys.extended_properties AS ep
INNER JOIN sys.tables AS t ON ep.major_id = t.object_id 
INNER JOIN sys.columns AS c ON ep.major_id = c.object_id AND ep.minor_id = c.column_id
WHERE class = 1  and t.name IN ('rhh_emplea')
) AS EXT
ON TA.campo=EXT.Campo 

WHERE RTRIM(valor_nuevo)<>RTRIM(valor_actual )

END




```
