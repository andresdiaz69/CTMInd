# Stored Procedure: PA_Portal_Estudios_HV_02ago

## Usa los objetos:
- [[rhh_emplea]]
- [[rhh_estudio]]
- [[rhh_portal_estudio]]
- [[rhh_tbestud]]
- [[rhh_tbinsti]]

```sql

-- =============================================
-- Author:		Alexander Vargas
-- Create date: 243/11/2017
-- Description:	Consulta los estudios actuales y nuevos para ser autorizados

-- =============================================
CREATE PROCEDURE [dbo].[PA_Portal_Estudios_HV]
	@cod_emp CHAR(12) = NULL,
	@cod_est CHAR(5) = NULL,
	@cod_ins CHAR(10) = NULL,
	@opc		CHAR(1)='A'  --A-ACTUALIZA, N-NUEVO

--WITH ENCRYPTION	
AS
BEGIN

IF(@opc='A')
BEGIN

SELECT  EXT.Descripcion,TN.cod_emp,TN.campo, valor_actual,valor_nuevo
FROM
(		SELECT     A.cod_emp, RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp', A.cod_est,CAST(A.nom_est AS VARCHAR(255)) AS nom_est , A.nom_est AS des_est, 
			 A.cod_ins,CAST(D.nom_ins AS VARCHAR(255)) AS nom_ins,  CAST(A.ano_est AS VARCHAR(255)) AS 'ano_est', CAST(A.sem_apr AS VARCHAR(255)) AS sem_apr, CAST(A.hor_est AS VARCHAR(255)) AS hor_est,
			  CAST(IIF(A.gra_son=0,'0_No','1_Sí') AS VARCHAR(255)) AS gra_son, CAST(FORMAT(A.fec_gra,'dd/MM/yyyy') AS VARCHAR(255)) AS fec_gra, CAST(A.nro_tar AS VARCHAR(255)) AS nro_tar, 
			   CAST(A.tip_est AS VARCHAR(255)) AS tip_est, CAST(A.nom_arch AS VARCHAR(255)) AS nom_arch, CAST(IIF(A.ind_can=0,'0_No_Canceló','1_Canceló') AS VARCHAR(255))  AS ind_can, CAST(RIGHT(A.arch_soporte,5) AS VARCHAR(255)) AS arch_soporte, 
			--Campos para comparar con los nuevos
			E.cod_emp as 'T.cod_emp', E.nom_est as 'T.des_est', E.ano_est as 'T.ano_est', E.sem_apr as 'T.sem_apr',  
			E.hor_est as 'T.hor_est', E.gra_son as 'T.gra_son', E.fec_gra as 'T.fec_gra', e.nro_tar as 'T.nro_tar', CONVERT(BIT,E.ind_can) as 'T.ind_can',
			E.tip_est as 'T.tip_est', E.nom_anex as 'T.nom_arch'
			--===================================
			FROM  rhh_portal_estudio A left JOIN rhh_estudio E ON A.cod_emp = E.cod_emp and A.cod_est = E.cod_est and A.cod_ins = E.cod_ins
				INNER JOIN rhh_emplea B ON B.cod_emp=A.cod_emp
				LEFT JOIN rhh_tbestud C ON C.cod_est=A.cod_est
				LEFT JOIN rhh_tbinsti D ON D.cod_ins=A.cod_ins
				WHERE A.cod_emp=@cod_emp AND A.cod_est=@cod_est AND A.cod_ins=@cod_ins  ) P
UNPIVOT (valor_nuevo FOR campo IN (ind_can,nom_est,nom_ins,ano_est,sem_apr,hor_est,gra_son,fec_gra,nro_tar,tip_est,arch_soporte)) AS TN

LEFT JOIN
(
SELECT * 
FROM
(		SELECT  A.cod_emp, RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp',
			--Campos para comparar con los nuevos
			E.cod_emp as 'T.cod_emp', CAST(ISNULL(E.nom_est,'') AS VARCHAR(255)) AS  nom_est, CAST(A.ano_est AS VARCHAR(255)) AS  ano_est,CAST(E.sem_apr AS VARCHAR(255)) AS sem_apr ,  
			CAST(D.nom_ins AS VARCHAR(255)) AS nom_ins,CAST(ISNULL(A.hor_est,'') AS VARCHAR(255)) AS  hor_est, CAST(IIF(A.gra_son=0,'0_No','1_Sí') AS VARCHAR(255)) AS gra_son, 
			CAST(FORMAT(E.fec_gra,'dd/MM/yyyy') AS VARCHAR(255)) AS fec_gra, CAST(ISNULL(A.nro_tar,'') AS VARCHAR(255)) AS nro_tar, CONVERT(BIT,E.ind_can) as 'T.ind_can',
			CAST(E.tip_est AS VARCHAR(255)) AS tip_est,CAST(A.nom_anex AS VARCHAR(255)) AS nom_arch, CAST(IIF(A.ind_can=0,'0_No_Canceló','1_Canceló') AS VARCHAR(255)) AS ind_can, CAST(IIF(A.fto_certif IS NULL,'', RIGHT(A.fto_certif,5)) AS VARCHAR(255)) AS arch_soporte  
			--===================================
			FROM  rhh_estudio A left JOIN rhh_estudio E ON A.cod_emp = E.cod_emp and A.cod_est = E.cod_est  and A.cod_ins = E.cod_ins
				INNER JOIN rhh_emplea B ON B.cod_emp=E.cod_emp
				LEFT JOIN rhh_tbestud C ON C.cod_est=E.cod_est
				LEFT JOIN rhh_tbinsti D ON D.cod_ins=E.cod_ins
				WHERE A.cod_emp=@cod_emp AND A.cod_est=@cod_est AND A.cod_ins=@cod_ins   ) P
UNPIVOT (valor_actual FOR campo IN (ind_can,nom_est,nom_ins,ano_est,sem_apr,hor_est,gra_son,fec_gra,nro_tar,tip_est,arch_soporte)) AS TA2
) AS TA
ON TA.campo=TN.CAMPO AND TA.valor_actual<>TN.valor_nuevo 

INNER JOIN 

(
SELECT c.name AS Campo, value AS Descripcion
FROM sys.extended_properties AS ep
INNER JOIN sys.tables AS t ON ep.major_id = t.object_id 
INNER JOIN sys.columns AS c ON ep.major_id = c.object_id AND ep.minor_id = c.column_id
WHERE class = 1 and t.name='rhh_estudio'
) AS EXT
ON TN.campo=EXT.Campo 

WHERE valor_actual<>valor_nuevo

END

IF(@opc='N')
BEGIN

SELECT  EXT.Descripcion,TN.cod_emp,TN.campo, valor_actual,valor_nuevo
FROM
(		SELECT     A.cod_emp, RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp', A.cod_est,CAST(C.nom_est AS VARCHAR(255)) AS nom_est , A.nom_est AS des_est, 
			 A.cod_ins,CAST(D.nom_ins AS VARCHAR(255)) AS nom_ins, CAST(A.ano_est AS VARCHAR(255)) AS 'ano_est', CAST(A.sem_apr AS VARCHAR(255)) AS sem_apr, CAST(A.hor_est AS VARCHAR(255)) AS hor_est,
			  CAST(IIF(A.gra_son=0,'0_No','1_Sí') AS VARCHAR(255)) AS gra_son, CAST(FORMAT(A.fec_gra,'dd/MM/yyyy') AS VARCHAR(255)) AS fec_gra, CAST(ISNULL(A.nro_tar,'') AS VARCHAR(255)) AS nro_tar, 
			   CAST(A.tip_est AS VARCHAR(255)) AS tip_est, CAST(A.nom_arch AS VARCHAR(255)) AS nom_arch, CAST(IIF(A.ind_can=0,'0_No_Canceló','1_Canceló') AS VARCHAR(255)) AS ind_can,   
			--Campos para comparar con los nuevos
			E.cod_emp as 'T.cod_emp', E.nom_est as 'T.des_est', E.ano_est as 'T.ano_est', E.sem_apr as 'T.sem_apr',  
			E.hor_est as 'T.hor_est', E.gra_son as 'T.gra_son', E.fec_gra as 'T.fec_gra', e.nro_tar as 'T.nro_tar', CONVERT(BIT,E.ind_can) as 'T.ind_can',
			E.tip_est as 'T.tip_est', E.nom_anex as 'T.nom_arch'
			--===================================
			FROM  rhh_portal_estudio A left JOIN rhh_estudio E ON A.cod_emp = E.cod_emp and A.cod_est = E.cod_est and A.cod_ins = E.cod_ins
				INNER JOIN rhh_emplea B ON B.cod_emp=A.cod_emp
				LEFT JOIN rhh_tbestud C ON C.cod_est=A.cod_est
				LEFT JOIN rhh_tbinsti D ON D.cod_ins=A.cod_ins
				WHERE A.cod_emp=@cod_emp AND A.cod_est=@cod_est AND A.cod_ins=@cod_ins  ) P
UNPIVOT (valor_nuevo FOR campo IN (ind_can,nom_est,nom_ins,ano_est,sem_apr,hor_est,gra_son,fec_gra,nro_tar,tip_est)) AS TN

LEFT JOIN
(
SELECT * 
FROM
(		SELECT  A.cod_emp, RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp',
			--Campos para comparar con los nuevos
			E.cod_emp as 'T.cod_emp', CAST(ISNULL(E.nom_est,'') AS VARCHAR(255)) AS  nom_est, CAST(E.ano_est AS VARCHAR(255)) AS  ano_est,CAST(E.sem_apr AS VARCHAR(255)) AS sem_apr ,  
			CAST(D.nom_ins AS VARCHAR(255)) AS nom_ins,CAST(E.hor_est AS VARCHAR(255)) AS  hor_est, CAST(IIF(E.gra_son=0,'0_No','1_Sí') AS VARCHAR(255)) AS gra_son, 
			CAST(FORMAT(E.fec_gra,'dd/MM/yyyy') AS VARCHAR(255)) AS fec_gra, CAST(A.nro_tar AS VARCHAR(255)) AS nro_tar, CONVERT(BIT,E.ind_can) as 'T.ind_can',
			CAST(E.tip_est AS VARCHAR(255)) AS tip_est,CAST(A.nom_anex AS VARCHAR(255)) AS nom_arch, CAST(IIF(A.ind_can=0,'0_No_Canceló','1_Canceló') AS VARCHAR(255)) AS ind_can  
			--===================================
			FROM  rhh_estudio A left JOIN rhh_estudio E ON A.cod_emp = E.cod_emp and A.cod_est = E.cod_est  and A.cod_ins = E.cod_ins
				INNER JOIN rhh_emplea B ON B.cod_emp=E.cod_emp
				LEFT JOIN rhh_tbestud C ON C.cod_est=E.cod_est
				LEFT JOIN rhh_tbinsti D ON D.cod_ins=E.cod_ins
				WHERE A.cod_emp=@cod_emp AND A.cod_est=@cod_est AND A.cod_ins=@cod_ins   ) P
UNPIVOT (valor_actual FOR campo IN (ind_can,nom_est,nom_ins,ano_est,sem_apr,hor_est,gra_son,fec_gra,nro_tar,tip_est)) AS TA2
) AS TA
ON TA.campo=TN.CAMPO AND TA.valor_actual<>TN.valor_nuevo 

INNER JOIN 

(
SELECT c.name AS Campo, value AS Descripcion
FROM sys.extended_properties AS ep
INNER JOIN sys.tables AS t ON ep.major_id = t.object_id 
INNER JOIN sys.columns AS c ON ep.major_id = c.object_id AND ep.minor_id = c.column_id
WHERE class = 1 and t.name='rhh_estudio'
) AS EXT
ON TN.campo=EXT.Campo 

--WHERE valor_actual<>valor_nuevo

END




END


```
