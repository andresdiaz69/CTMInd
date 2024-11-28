# Stored Procedure: sp_prt_CambiosHVDatosFinancieros

## Usa los objetos:
- [[prt_portal_DatosFinancieros]]
- [[rhh_emplea]]

```sql



-- =============================================
-- Author:		Alexander Vargas
-- Create date: 06/03/2023
-- Description:	Consulta los cambios que estan pendientes de datos financieros.

--exec sp_prt_CambiosHVDatosFinancieros

-- =============================================
CREATE PROCEDURE [dbo].[sp_prt_CambiosHVDatosFinancieros]
	@cod_emp	CHAR(12) = NULL,
	@opcion		CHAR(30)
	
--WITH ENCRYPTION	
AS
BEGIN
	IF (@opcion='ConsultaPorEmpleado')
	BEGIN
		SELECT	PDF.cod_emp, 
				RTRIM(e.nom_emp) + ' ' + RTRIM(e.ap1_emp) + ' ' + RTRIM(e.ap2_emp) AS 'nom_emp', 

				IIF(E.cod_emp IS NULL,'Nuevo','Modificación') as TipoCambio
			--===================================
				

		FROM prt_portal_DatosFinancieros PDF
		INNER JOIN rhh_emplea E ON E.cod_emp = PDF.cod_emp
		WHERE PDF.cod_emp=@cod_emp	

	END


	IF (@opcion='ModificacionRegistro')
	BEGIN
		SELECT  CONVERT(VARCHAR(12),nueva.cod_emp) AS cod_emp , CONVERT(VARCHAR(255),ext.Descripcion) AS Descripcion, CONVERT(VARCHAR(255),nueva.campo) AS campo,CONVERT(VARCHAR(255),valor_nuevo) AS valor_nuevo,CONVERT(VARCHAR(255),Act_valor_actual) AS valor_actual  
		FROM
		(	SELECT cod_emp,campo, valor_nuevo
				FROM
					(	SELECT	A.cod_emp
								,CAST (A.ind_DecRenta  + '_' +  CASE A.ind_DecRenta WHEN 0 THEN 'No aplica' 
									WHEN '1' THEN 'Aplica' WHEN '2' THEN 'Trabajador por cuenta propia' END  
									AS VARCHAR(255)) AS 'ind_DecRenta'
								,CAST(CONVERT(VARCHAR(3),A.met_ret) + '_' +  CASE A.met_ret WHEN 1 THEN 'Modalidad 1' 
									WHEN 2 THEN 'Modalidad 2' END AS VARCHAR(255)) AS met_ret
								,CAST(A.pto_gas AS VARCHAR(255)) AS pto_gas
								,CAST(ISNULL(A.Cpto_deudas,'') AS VARCHAR(255)) AS Cpto_deudas 
								,CAST(A.per_car AS VARCHAR(255)) AS per_car
								,CAST(IIF(A.deudas = 1, '1_Sí', '0_No') AS VARCHAR(255)) AS deudas  
								
						FROM prt_portal_DatosFinancieros A
							INNER JOIN rhh_emplea B ON A.cod_emp = B.cod_emp
						WHERE A.cod_emp=@cod_emp --'1018465875'--
					) NuevoDatoFinanciero
				
				UNPIVOT (valor_nuevo FOR campo IN (ind_DecRenta, met_ret, pto_gas, Cpto_deudas, per_car, deudas)
				) AS ColumnaNuevoDatoFinanciero
		
		) as nueva
		
		INNER JOIN
		(
			SELECT cod_emp Act_cod_emp,campo Act_campo, valor_actual Act_valor_actual
			FROM
			(	SELECT	A.cod_emp
						,CAST (A.ind_DecRenta  + '_' +  CASE A.ind_DecRenta WHEN 0 THEN 'No aplica' 
									WHEN '1' THEN 'Aplica' WHEN '2' THEN 'Trabajador por cuenta propia' END  
									AS VARCHAR(255)) AS 'ind_DecRenta'
						,CAST(CONVERT(VARCHAR(3),A.met_ret) + '_' +  CASE A.met_ret WHEN 1 THEN 'Modalidad 1' 
							WHEN 2 THEN 'Modalidad 2' END AS VARCHAR(255)) AS met_ret
						,CAST(A.pto_gas AS VARCHAR(255)) AS pto_gas
						,CAST(ISNULL(A.Cpto_deudas,'') AS VARCHAR(255)) AS Cpto_deudas 
						,CAST(A.per_car AS VARCHAR(255)) AS per_car
						,CAST(IIF(A.deudas = 1, '1_Sí', '0_No') AS VARCHAR(255)) AS deudas  
						
				FROM rhh_emplea A  
					INNER JOIN prt_portal_DatosFinancieros B ON A.cod_emp = B.cod_emp
				WHERE A.cod_emp=@cod_emp --'1018465875'--
			) DatoActual 
		
			UNPIVOT (valor_actual FOR campo IN (ind_DecRenta, met_ret, pto_gas, Cpto_deudas, per_car, deudas)
			) AS ColumnaActualDatosFinancieros
		)as  actual ON nueva.cod_emp = actual.Act_cod_emp 
					AND nueva.campo=actual.Act_campo
					AND RTRIM(nueva.valor_nuevo) <> RTRIM(actual.Act_valor_actual)

		INNER JOIN 
		(
			SELECT c.name AS Campo, value AS Descripcion
			FROM sys.extended_properties AS ep
			INNER JOIN sys.tables AS t ON ep.major_id = t.object_id 
			INNER JOIN sys.columns AS c ON ep.major_id = c.object_id AND ep.minor_id = c.column_id
			WHERE class = 1 and t.name='rhh_emplea'
		) AS EXT ON nueva.campo=EXT.Campo 
		

	END


	ELSE IF (@opcion='IngresaCambioDatosFinancieros') --Borrar cambios de portal cuando se han revisado todos
	BEGIN
		
		DELETE FROM prt_portal_DatosFinancieros WHERE cod_emp=@cod_emp 
	END

	ELSE IF (@opcion='EliminaCambioDatosFinancieros') --Borrar cambios de portal cuando se han revisado todos
	BEGIN

		DELETE FROM prt_portal_DatosFinancieros WHERE cod_emp=@cod_emp
	END

END

```
