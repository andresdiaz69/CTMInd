# Stored Procedure: sp_Act_centros_sincr_CambioNomSecciones

## Usa los objetos:
- [[spiga_EstructuraDeCostos]]
- [[UnidadDeNegocio]]
- [[UnidadDeNegocio]]

```sql
--drop procedure sp_Act_centros_sincr_CambioNomSecciones
CREATE PROCEDURE [dbo].[sp_Act_centros_sincr_CambioNomSecciones]
AS
BEGIN
	  BEGIN TRAN 
--	  --Uso de begin tran para determinar si el proceso fué satisfactorio
		BEGIN TRY
        ----Uso de begin try para poder saber si tenemos algún error en la consulta o en la insersión 
		iF OBJECT_ID('tempdb.dbo.#UnidadDeNegocio ', 'U')IS NOT NULL
		DROP TABLE #UnidadDeNegocio 
		SELECT Cod_Empresa,Cod_Centro,cod_seccion,Cod_Departamento
		INTO #UnidadDeNegocio   
		FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos 
		WHERE Cod_empresa in (1,5,6,22,24,27) and cod_seccion IS NOT NULL
		EXCEPT
		SELECT CodEmpresa,CodCentro,codseccion,CodDepartamento
		FROM UnidadDeNegocio
		--SELECT * FROM #UnidadDeNegocio  
------------------------------------------------------------
		IF OBJECT_ID('tempdb.dbo.#UnidadDeNegocio2', 'U')IS NOT NULL
			DROP TABLE #UnidadDeNegocio2 
				SELECT Cod_empresa, Cod_Centro, Cod_seccion, Cod_Departamento, Nombre_Seccion, NombreSeccion, dep1 
				INTO #UnidadDeNegocio2 
					FROM (
							SELECT c.Cod_Centro ,c.Cod_Departamento  ,c.Cod_empresa ,c.Cod_seccion
									,b.Nombre_Seccion,n.NombreSeccion,dep1= b.Cod_Departamento , dep2=n.CodDepartamento
							FROM  #UnidadDeNegocio c
							LEFT JOIN [PSCService_DB].dbo.spiga_EstructuraDeCostos b
							                                        ON c.Cod_empresa=b.Cod_empresa 
																	 AND c.Cod_Centro=b.Cod_Centro
																	 AND c.Cod_seccion=b.Cod_seccion
							LEFT JOIN [DBMLC_0190].dbo.UnidadDeNegocio n			
							                                        ON  b.Cod_empresa=n.CodEmpresa 
																	 AND b.Cod_Centro=n.CodCentro 
																     AND b.Nombre_Centro=n.NombreCentro
																	 AND b.Cod_seccion=n.CodSeccion
							 WHERE b.Nombre_Seccion<>n.NombreSeccion			      
						  )a
        --SELECT * FROM  #UnidadDeNegocio2 
			MERGE INTO [DBMLC_0190].dbo.UnidadDeNegocio CC
				USING #UnidadDeNegocio2 CC2				
				ON CC.CodEmpresa=CC2.Cod_Empresa
				AND CC.CodCentro = CC2.Cod_Centro
				AND CC.CodSeccion=CC2.Cod_seccion
				WHEN MATCHED THEN 
				UPDATE SET
					 CC.NombreSeccion=CC2.Nombre_Seccion
				    ,CC.CodDepartamento=CC2.Cod_Departamento;
 
		 COMMIT
		END TRY 
		BEGIN CATCH
			ROLLBACK
		END CATCH
END
--**Creado Por Sergio Quizobony**--

```
