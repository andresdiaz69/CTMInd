# Stored Procedure: PA_Portal_Dotacion_HV

## Usa los objetos:
- [[GTH_DotaEle]]
- [[GTH_DotaTallaEmplea]]
- [[GTH_portal_DotaTallaEmplea]]
- [[inv_tallas]]
- [[rhh_emplea]]

```sql




-- =============================================
-- SRS2020-1385 Autorizacion dotacion
-- Modify date: 29/12/2020
-- Modify by:	Alexander Vargas
-- Description: se agrega descripción de tallas para mostrar el 
-- valor de esta forma: codigo_descripcion

-- SRS2021-0351 Autorizacion dotacion
-- Modify date: 26/04/2021
-- Modify by:	Alexander Vargas
-- Description: se agrega el where para mostrar los 
-- campos diferentes. En el JOIN genera problema
-- probablemente por el left que hay entre las 2 'tablas' (actual y nuevo)

--SPA Estado autorizacion HV
--Modified by: Alexander Vargas
--Modified date:	28/04/2023
--Description: se convierten los campos a varchar de 255 para poderlos 
--llamar desde otro procedimiento

-- =============================================

CREATE PROCEDURE [dbo].[PA_Portal_Dotacion_HV]
	@cod_emp CHAR(12) = NULL,
	@cod_ele CHAR(5) = NULL

--WITH ENCRYPTION	
AS
BEGIN

SET @cod_emp= ISNULL(@cod_emp,'%')
	
	
	SELECT DISTINCT  convert(varchar(255),EXT.Descripcion) AS Descripcion,convert(varchar(255),TA.cod_emp) AS cod_emp,convert(varchar(255),TA.campo) AS campo, convert(varchar(255),TN2.valor_actual) AS valor_actual,convert(varchar(255),valor_nuevo) AS valor_nuevo 
FROM
(	
		SELECT A.cod_emp,RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp',
			A.cod_ele, RTRIM(C.des_ele) AS 'des_ele', (RTRIM(A.Talla) + '_' + RTRIM(tallas.des_talla)) AS Talla,
			--Campos para comparar con los nuevos
			D.cod_emp as 'T.cod_emp', D.Talla as 'T.Talla'
			--===================================
			FROM GTH_portal_DotaTallaEmplea A INNER JOIN rhh_emplea B on B.cod_emp=A.cod_emp COLLATE DATABASE_DEFAULT 
				INNER JOIN inv_tallas tallas ON A.Talla=tallas.cod_talla COLLATE DATABASE_DEFAULT 
				LEFT JOIN GTH_DotaEle C on A.cod_ele=C.cod_ele COLLATE DATABASE_DEFAULT 
					LEFT JOIN GTH_DotaTallaEmplea D on D.cod_emp = A.cod_emp COLLATE DATABASE_DEFAULT  and D.cod_ele = A.cod_ele COLLATE DATABASE_DEFAULT 
					WHERE A.cod_emp=RTRIM(@cod_emp) AND A.cod_ele=RTRIM(@cod_ele)

							) P
UNPIVOT (valor_nuevo FOR campo IN (Talla)) AS TA

LEFT JOIN 
(
SELECT cod_emp, campo, valor_actual
FROM
(	
			SELECT A.cod_emp,RTRIM(B.nom_emp) + ' ' + RTRIM(B.ap1_emp) + ' ' + RTRIM(B.ap2_emp) AS 'nom_emp',
			A.cod_ele, RTRIM(C.des_ele) AS 'des_ele', ISNULL(RTRIM(A.Talla) + '_' + RTRIM(tallas.des_talla),'') AS Talla,
			--Campos para comparar con los nuevos
			D.cod_emp as 'T.cod_emp', D.Talla as 'T.Talla'
			--===================================
			FROM GTH_DotaTallaEmplea A INNER JOIN rhh_emplea B on B.cod_emp=A.cod_emp
				LEFT JOIN inv_tallas tallas ON A.Talla=tallas.cod_talla COLLATE DATABASE_DEFAULT 
				LEFT JOIN GTH_DotaEle C on A.cod_ele=C.cod_ele COLLATE DATABASE_DEFAULT 
					LEFT JOIN GTH_DotaTallaEmplea D on D.cod_emp = A.cod_emp COLLATE DATABASE_DEFAULT  and D.cod_ele = A.cod_ele COLLATE DATABASE_DEFAULT 
					WHERE A.cod_emp=RTRIM(@cod_emp) AND A.cod_ele=RTRIM(@cod_ele)
							) P
UNPIVOT (valor_actual FOR campo IN (Talla)) AS TN
) AS TN2
ON TA.campo=TN2.CAMPO --AND valor_actual<>valor_nuevo

INNER JOIN 
(
	SELECT c.name AS Campo, value AS Descripcion
	FROM sys.extended_properties AS ep
	INNER JOIN sys.tables AS t ON ep.major_id = t.object_id 
	INNER JOIN sys.columns AS c ON ep.major_id = c.object_id AND ep.minor_id = c.column_id
	WHERE class = 1 and t.name='GTH_portal_DotaTallaEmplea'
) AS EXT
ON TA.campo=EXT.Campo 

WHERE valor_actual <> valor_nuevo

END

```
