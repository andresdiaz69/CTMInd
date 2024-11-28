# Stored Procedure: sp_Act_centros_sincr_CentrosSeccionTaller

## Usa los objetos:
- [[spiga_EmpresasCentrosSeccionesTaller]]
- [[spiga_EstructuraDeCostos]]

```sql
CREATE PROCEDURE  [dbo].[sp_Act_centros_sincr_CentrosSeccionTaller]
AS
BEGIN
	BEGIN TRAN 
	--Uso de begin tran para determinar si el proceso fué satisfactorio
		BEGIN TRY
    --Uso de begin try para poder saber si tenemos algún error en la consulta o en la insersión 
		IF OBJECT_ID('tempdb.dbo.#EmpresasCentrosSeccionesTaller', 'U')IS NOT NULL
		DROP TABLE #EmpresasCentrosSeccionesTaller
    --Borra tabla temporal si existe para evitar que el proceso tenga algún error
-------------------------------------------------------------------------------------------------	
		SELECT Cod_Empresa
			  ,Cod_Centro
			  ,cod_seccion
		INTO #EmpresasCentrosSeccionesTaller
		FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos 
		WHERE Cod_Departamento in ('TM','TC')
		AND Cod_empresa in (1,5,6,22,24,27)
		EXCEPT
		SELECT  Cod_Empresa
			   ,Cod_Centro
			   ,cod_seccion
		FROM [PSCService_DB].dbo.spiga_EmpresasCentrosSeccionesTaller
		WHERE Cod_empresa in  (1,5,6,22,24,27)
-----------------------------------------------------------------------------------------------------
 IF OBJECT_ID('tempdb.dbo.#EmpresasCentrosSeccionesTaller2', 'U')IS NOT NULL
DROP TABLE #EmpresasCentrosSeccionesTaller2
		SELECT   CT.Cod_Empresa
			   ,(SELECT TOP 1  EC.Nombre_Empresa
				 FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos EC     
				 WHERE EC.Cod_empresa = CT.Cod_empresa
				)AS Nombre_Empresa
				,CT.Cod_Centro
			   ,(SELECT TOP 1  EC.Nombre_Centro
				 FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos EC     
				 WHERE EC.Cod_Centro=CT.Cod_Centro
				)AS Nombre_Centro
				,CT.cod_seccion
			   ,(SELECT TOP 1  EC.Nombre_Seccion
				 FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos EC     
				 WHERE EC.Cod_seccion = CT.Cod_seccion
				)AS Nombre_Seccion  
 INTO #EmpresasCentrosSeccionesTaller2
		FROM #EmpresasCentrosSeccionesTaller CT 
--Merge para comparar los datos e insertar los que no se encuentren en la tabla EmpresasCentrosSeccionesTaller---
				--SELECT * FROM #EmpresasCentrosSeccionesTaller2
				MERGE INTO [PSCService_DB].dbo.spiga_EmpresasCentrosSeccionesTaller ST 
				USING #EmpresasCentrosSeccionesTaller2 ST2
				ON ST.Cod_Empresa= ST2.Cod_Empresa
				AND ST.Cod_Centro =ST2.Cod_Centro
				AND ST.cod_seccion =ST2.cod_seccion
				WHEN MATCHED THEN
				UPDATE SET
					ST.Cod_Centro =ST2.Cod_Centro
				WHEN NOT MATCHED THEN
				INSERT VALUES (Cod_Empresa, Nombre_Empresa,Cod_Centro,Nombre_Centro, Cod_seccion,Nombre_Seccion);
							
		 COMMIT
		END TRY 
		BEGIN CATCH
			ROLLBACK
		END CATCH
END

```
