# Stored Procedure: sp_Act_centros_sincr_CumplimientoPedidosCl

## Usa los objetos:
- [[spiga_EmpresasCentrosCumplimientoPedidosDeClientes]]
- [[spiga_EstructuraDeCostos]]

```sql
 --drop procedure sp_Act_centros_sincr_CumplimientoPedidosCl
--Procedimiento almacenado para conocer los datos nuevos de la base de datos estructura de costos
CREATE PROCEDURE [dbo].[sp_Act_centros_sincr_CumplimientoPedidosCl]
AS
BEGIN
	  BEGIN TRAN 
	  --Uso de begin tran para determinar si el proceso fué satisfactorio
		BEGIN TRY
        --Uso de begin try para poder saber si tenemos algún error en la consulta o en la insersión 
		IF OBJECT_ID('tempdb.dbo.#EmpresasCentrosCumplimientoPedidosDeClientes', 'U')IS NOT NULL
				DROP TABLE #EmpresasCentrosCumplimientoPedidosDeClientes
				--Borra tabla temporal si existe para evitar que el proceso tenga algún error

				SELECT Cod_Empresa
					  ,Cod_Centro
				INTO #EmpresasCentrosCumplimientoPedidosDeClientes  
				--Se crea la tabla TEMPORAL #EmpresasCentrosCumplimientoPedidosDeClientes para poder insertar los resultados de la anterior comparación
				--con el objetivo de inputarle los demás datos  de código empresa, código centro etc.
				FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos 
				WHERE Cod_empresa in (1,5,6,22,24,27)
				EXCEPT
				--Se realiza el #Except entre [PSCService_DB].dbo.spiga_EstructuraDeCostos y [PSCService_DB].dbo.spiga_EmpresasCentrosCumplimientoPedidosDeClientes para 
				--determinar los datos que no están insertados en la tabla [PSCService_DB].dbo.spiga_EmpresasCentrosCumplimientoPedidosDeClientes.
				SELECT  Cod_Empresa       
					   ,Cod_Centro
				FROM [PSCService_DB].dbo.spiga_EmpresasCentrosCumplimientoPedidosDeClientes
				WHERE Cod_Empresa in  (1,5,6,22,24,27)

		IF OBJECT_ID('tempdb.dbo.#EmpresasCentrosCumplimientoPedidosDeClientes2', 'U')IS NOT NULL
				DROP TABLE #EmpresasCentrosCumplimientoPedidosDeClientes2	

				DROP SEQUENCE IF EXISTS dbo.objSecuencia				
				CREATE SEQUENCE dbo.objSecuencia  AS INT					
	            START WITH   1
				INCREMENT BY 1 					
		  
				SELECT  
				       --NEXT VALUE FOR dbo.objSecuencia + 
				       --(SELECT max(EC.Id)FROM [PSCService_DB].dbo.spiga_EmpresasCentrosCumplimientoPedidosDeClientes EC) AS id 
				       --,
					   ECC.Cod_empresa   
					   ,(SELECT TOP 1  EC.Nombre_Empresa
						 FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos EC     
						 WHERE ECC.Cod_empresa = EC.Cod_empresa
						)AS Nombre_Empresa
					   ,ECC.Cod_Centro
					   ,(SELECT TOP 1  EC.Nombre_Centro
						 FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos EC     
						 WHERE ECC.Cod_Centro = EC.Cod_Centro
						)AS Nombre_Centro
			  INTO #EmpresasCentrosCumplimientoPedidosDeClientes2
				FROM #EmpresasCentrosCumplimientoPedidosDeClientes ECC 		 
			  --select * from #EmpresasCentrosCumplimientoPedidosDeClientes2 
						MERGE INTO [PSCService_DB].dbo.spiga_EmpresasCentrosCumplimientoPedidosDeClientes CC
						USING #EmpresasCentrosCumplimientoPedidosDeClientes2 CC2				
						ON  cc.Cod_Centro=cc2.Cod_Centro
						AND CC.Cod_empresa=CC2.Cod_empresa
						WHEN MATCHED THEN
						UPDATE SET
						cc.Cod_Centro=cc2.Cod_Centro
						WHEN NOT MATCHED THEN						
						INSERT VALUES (Cod_Empresa, Nombre_Empresa, Cod_Centro, Nombre_Centro);
 
				 COMMIT
				END TRY 
				BEGIN CATCH
					ROLLBACK
				END CATCH
END
		--**Creado Por Sergio Quizobony**--
 

```
