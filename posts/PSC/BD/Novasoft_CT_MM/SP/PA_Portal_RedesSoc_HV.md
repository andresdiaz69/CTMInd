# Stored Procedure: PA_Portal_RedesSoc_HV

## Usa los objetos:
- [[GTH_EmpRedSocial]]
- [[GTH_portal_EmpRedSocial]]
- [[GTH_RedesSociales]]
- [[GTH_RptEmpRedSocial]]
- [[rhh_emplea]]

```sql


CREATE PROCEDURE [dbo].[PA_Portal_RedesSoc_HV]
	@cod_emp CHAR(12) = NULL,
	@cod_redsoc CHAR(2) = NULL,
	@opc		CHAR(1)='A'  --A-ACTUALIZA, N-NUEVO

--WITH ENCRYPTION	
AS
BEGIN

SET @cod_emp= ISNULL(@cod_emp,'%')

IF(@opc='A')
BEGIN
		
SELECT DISTINCT CONVERT(VARCHAR(255),EXT.Descripcion) AS Descripcion, CONVERT(VARCHAR(255),TN2.cod_emp) AS cod_emp,CONVERT(VARCHAR(255),TN2.campo) AS campo, CONVERT(VARCHAR(255),TN2.valor_actual) AS valor_actual,CONVERT(VARCHAR(255),valor_nuevo) AS valor_nuevo 
FROM
(	
--Se consultan los datos actuales de la HV del empleado
				SELECT A.cod_emp, CAST(A.cod_redsoc AS VARCHAR(255)) AS  cod_redsoc, RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp', C.nom_redsoc, CAST(A.usuario AS VARCHAR(255)) AS  usuario, 
		--Campos para comparar con los nuevos
		D.cod_emp as 'T.cod_emp', D.cod_redsoc as 'T.cod_redSocial', D.usuario AS 'T.usuario'
		--===================================
		FROM GTH_portal_EmpRedSocial A 
			INNER JOIN rhh_emplea B ON B.cod_emp = A.cod_emp COLLATE DATABASE_DEFAULT 
			LEFT JOIN GTH_RedesSociales C ON C.cod_redsoc = A.cod_redsoc 
			LEFT JOIN GTH_EmpRedSocial D ON A.cod_emp = D.cod_emp COLLATE DATABASE_DEFAULT  AND A.cod_redsoc = D.cod_redsoc 
			LEFT JOIN GTH_RptEmpRedSocial E ON A.cod_emp = E.cod_emp COLLATE DATABASE_DEFAULT  AND A.cod_redsoc = E.cod_redsoc 
		WHERE A.cod_emp LIKE RTRIM(@cod_emp) AND A.cod_redsoc = RTRIM(@cod_redsoc)
		
		) P
UNPIVOT (valor_nuevo FOR campo IN (usuario)) AS TA

LEFT JOIN 
(
SELECT cod_emp, campo, valor_actual
FROM
(		
--Se consultan los datos nuevos de la HV modificados por el empleado 
				SELECT A.cod_emp, CAST(A.cod_redsoc AS VARCHAR(255)) AS  cod_redsoc, RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp', C.nom_redsoc, CAST(D.usuario AS VARCHAR(255)) AS  usuario, 
		--Campos para comparar con los nuevos
		D.cod_emp as 'T.cod_emp', D.cod_redsoc as 'T.cod_redSocial', D.usuario AS 'T.usuario'
		--===================================
		FROM GTH_EmpRedSocial A 
			INNER JOIN rhh_emplea B ON B.cod_emp = A.cod_emp COLLATE DATABASE_DEFAULT 
			LEFT JOIN GTH_RedesSociales C ON C.cod_redsoc = A.cod_redsoc 
			LEFT JOIN GTH_EmpRedSocial D ON A.cod_emp = D.cod_emp COLLATE DATABASE_DEFAULT  AND A.cod_redsoc = D.cod_redsoc 
			LEFT JOIN GTH_RptEmpRedSocial E ON A.cod_emp = E.cod_emp COLLATE DATABASE_DEFAULT  AND A.cod_redsoc = E.cod_redsoc 
		WHERE A.cod_emp LIKE RTRIM(@cod_emp) AND A.cod_redsoc = RTRIM(@cod_redsoc)
		) P
UNPIVOT (valor_actual FOR campo IN (usuario)) AS TN
) AS TN2
ON TA.campo=TN2.CAMPO -- AND valor_actual<>valor_nuevo

INNER JOIN 
(
	SELECT c.name AS Campo, value AS Descripcion
	FROM sys.extended_properties AS ep
	INNER JOIN sys.tables AS t ON ep.major_id = t.object_id 
	INNER JOIN sys.columns AS c ON ep.major_id = c.object_id AND ep.minor_id = c.column_id
	WHERE class = 1 and t.name='GTH_EmpRedSocial'
) AS EXT
ON TA.campo=EXT.Campo 


WHERE RTRIM(valor_nuevo)<>RTRIM(valor_actual )

END

IF(@opc='N')
BEGIN
		
SELECT DISTINCT CONVERT(VARCHAR(255),EXT.Descripcion) AS Descripcion, CONVERT(VARCHAR(255),TA.cod_emp) AS cod_emp,CONVERT(VARCHAR(255),TA.campo) AS campo, CONVERT(VARCHAR(255),TN2.valor_actual) AS valor_actual,CONVERT(VARCHAR(255),valor_nuevo) AS valor_nuevo 
FROM
(	
--Se consultan los datos actuales de la HV del empleado
				SELECT A.cod_emp, CAST(A.cod_redsoc AS VARCHAR(255)) AS  cod_redsoc, RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp', C.nom_redsoc, CAST(A.usuario AS VARCHAR(255)) AS  usuario, 
		--Campos para comparar con los nuevos
		D.cod_emp as 'T.cod_emp', D.cod_redsoc as 'T.cod_redSocial', D.usuario AS 'T.usuario'
		--===================================
		FROM GTH_portal_EmpRedSocial A 
			INNER JOIN rhh_emplea B ON B.cod_emp = A.cod_emp COLLATE DATABASE_DEFAULT 
			LEFT JOIN GTH_RedesSociales C ON C.cod_redsoc = A.cod_redsoc 
			LEFT JOIN GTH_EmpRedSocial D ON A.cod_emp = D.cod_emp COLLATE DATABASE_DEFAULT  AND A.cod_redsoc = D.cod_redsoc 
			LEFT JOIN GTH_RptEmpRedSocial E ON A.cod_emp = E.cod_emp COLLATE DATABASE_DEFAULT  AND A.cod_redsoc = E.cod_redsoc 
		WHERE A.cod_emp LIKE RTRIM(@cod_emp) AND A.cod_redsoc = RTRIM(@cod_redsoc)
		
		) P
UNPIVOT (valor_nuevo FOR campo IN (usuario)) AS TA

LEFT JOIN 
(
SELECT cod_emp, campo, valor_actual
FROM
(		
--Se consultan los datos nuevos de la HV modificados por el empleado 
				SELECT A.cod_emp, CAST(A.cod_redsoc AS VARCHAR(255)) AS  cod_redsoc, RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp', C.nom_redsoc, CAST(D.usuario AS VARCHAR(255)) AS  usuario, 
		--Campos para comparar con los nuevos
		D.cod_emp as 'T.cod_emp', D.cod_redsoc as 'T.cod_redSocial', D.usuario AS 'T.usuario'
		--===================================
		FROM GTH_EmpRedSocial A 
			INNER JOIN rhh_emplea B ON B.cod_emp = A.cod_emp COLLATE DATABASE_DEFAULT 
			LEFT JOIN GTH_RedesSociales C ON C.cod_redsoc = A.cod_redsoc 
			LEFT JOIN GTH_EmpRedSocial D ON A.cod_emp = D.cod_emp COLLATE DATABASE_DEFAULT  AND A.cod_redsoc = D.cod_redsoc 
			LEFT JOIN GTH_RptEmpRedSocial E ON A.cod_emp = E.cod_emp COLLATE DATABASE_DEFAULT  AND A.cod_redsoc = E.cod_redsoc 
		WHERE A.cod_emp LIKE RTRIM(@cod_emp) AND A.cod_redsoc = RTRIM(@cod_redsoc)
		) P
UNPIVOT (valor_actual FOR campo IN (usuario)) AS TN
) AS TN2
ON TA.campo=TN2.CAMPO -- AND valor_actual<>valor_nuevo

INNER JOIN 
(
	SELECT c.name AS Campo, value AS Descripcion
	FROM sys.extended_properties AS ep
	INNER JOIN sys.tables AS t ON ep.major_id = t.object_id 
	INNER JOIN sys.columns AS c ON ep.major_id = c.object_id AND ep.minor_id = c.column_id
	WHERE class = 1 and t.name='GTH_EmpRedSocial'
) AS EXT
ON TA.campo=EXT.Campo 


END
END

```
