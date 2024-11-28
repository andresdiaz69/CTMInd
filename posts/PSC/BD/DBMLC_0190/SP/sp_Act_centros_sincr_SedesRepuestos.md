# Stored Procedure: sp_Act_centros_sincr_SedesRepuestos

## Usa los objetos:
- [[SedesRepuestos]]
- [[spiga_EstructuraDeCostos]]
- [[vw_Act_SedeRepuestosyEC]]

```sql
--drop procedure sp_Act_centros_sincr_SedesRepuestos
CREATE PROCEDURE [dbo].[sp_Act_centros_sincr_SedesRepuestos]
AS
BEGIN
	    BEGIN TRAN 
	    --Uso de begin tran para determinar si el proceso fué satisfactorio
		BEGIN TRY

		IF OBJECT_ID('tempdb.dbo.#SedesRepuestos', 'U')IS NOT NULL
		DROP TABLE #SedesRepuestos
        --Borra tabla temporal si existe para evitar que el proceso tenga algún error
		SELECT Cod_Empresa
			  ,Cod_Centro
			  ,Cod_seccion
			  ,Cod_Departamento 
		INTO #SedesRepuestos
		--Creación de tabla TEMPORAL #SedesRepuestos para poder insertar los resultados de la anterior comparación
		--con el objetivo de inputarle los demás datos nombre, codigo de empresa, nombre, codigo de centro,
		--para finalmente Insertar los datos en [DBMLC_0190].dbo.SedesRepuestos con la estructura determinada de esta tabla.
		FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos 
		WHERE Cod_Departamento in ('TM','TC','RE')
		AND Cod_empresa in (1,5,6,22,24,27)
		EXCEPT 
		--Se realiza el #Except entre [PSCService_DB].dbo.spiga_EstructuraDeCostos y [DBMLC_0190].dbo.SedesRepuestos para 
		--determinar los datos que no están insertados en la tabla [DBMLC_0190].dbo.SedesRepuestos.
		SELECT  CodigoEmpresa
			   ,CodigoCentro
			   ,CodigoSeccion
			   ,CodigoDepartamento
		FROM [DBMLC_0190].dbo.SedesRepuestos 
		WHERE CodigoEmpresa in  (1,5,6,22,24,27) 
		--Inserción de datos nuevos encontrados en la tabla temporal #SedesRepuestos 

		 IF OBJECT_ID('tempdb.dbo.#SedesRepuestos2', 'U')IS NOT NULL
		 DROP TABLE #SedesRepuestos2
 
					SELECT  
					 SR.Cod_empresa 
					,(SELECT TOP 1 SR2.Nombre_Empresa
						FROM vw_Act_SedeRepuestosyEC SR2	       
						 WHERE SR2.Cod_empresa=SR.Cod_empresa
					  ) AS Nombre_Empresa
					,CASE  when 
					(SELECT TOP 1  SR1.CodiSedeRepuestos2    
					 FROM vw_Act_SedeRepuestosyEC SR1	       
					  WHERE SR1.Cod_Centro=SR.Cod_Centro
					  )is null then 999 else 
					  (SELECT TOP 1  SR1.CodiSedeRepuestos2    
					 FROM vw_Act_SedeRepuestosyEC SR1	       
					  WHERE SR1.Cod_Centro=SR.Cod_Centro
					  ) end as 'CodSedeRep'
					 ,CASE  when 
					 (SELECT TOP 1 SR1.NombreSedeRepuestos2 
						 FROM vw_Act_SedeRepuestosyEC SR1	       
						 WHERE SR1.Cod_Centro=SR.Cod_Centro
					   ) is null then 'NuevaSede' else
						(SELECT TOP 1 SR1.NombreSedeRepuestos2 
						 FROM vw_Act_SedeRepuestosyEC SR1	       
						 WHERE SR1.Cod_Centro=SR.Cod_Centro
					   )end
					   AS 'NombSedeRep'
					 ,SR.Cod_Centro
					 ,(SELECT TOP 1 SR1.Nombre_Centro
						 FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos SR1	       
						 WHERE SR1.Cod_Centro=SR.Cod_Centro
						) AS NombreCentro
					  ,SR.Cod_seccion
					  ,(SELECT TOP 1 SR1.Nombre_Seccion
						 FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos  SR1	       
						 WHERE SR1.Cod_seccion=SR.Cod_seccion
						) AS NombreSeccion
					  ,SR.Cod_Departamento 
			 INTO #SedesRepuestos2
					FROM  #SedesRepuestos SR	
				 
--Merge para unir la tabla SedesRepuestos con la tabla temporal para insertar los datos que no sean encontrados
          --select * from #SedesRepuestos2
				MERGE INTO [DBMLC_0190].dbo.SedesRepuestos CM
				USING #SedesRepuestos2  TC
				ON CM.CodigoCentro= TC.Cod_Centro 
				AND cm.CodigoSeccion=tc.Cod_seccion
				WHEN MATCHED THEN
				UPDATE SET
					CM.CodigoCentro=  TC.Cod_Centro 
				WHEN NOT MATCHED THEN
                INSERT VALUES ( Cod_Empresa, Nombre_Empresa, CodSedeRep
		                      ,NombSedeRep , Cod_Centro, NombreCentro
						      ,Cod_seccion ,NombreSeccion, Cod_Departamento );
 
			COMMIT
		END TRY 
		BEGIN CATCH
			ROLLBACK
		END CATCH
END
--**Creado Por Sergio Quizobony**--


```
