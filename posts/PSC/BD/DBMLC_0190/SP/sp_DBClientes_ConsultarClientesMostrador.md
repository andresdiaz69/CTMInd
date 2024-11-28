# Stored Procedure: sp_DBClientes_ConsultarClientesMostrador

## Usa los objetos:
- [[vw_DB_Clientes_Mostrador]]

```sql
CREATE PROCEDURE [dbo].[sp_DBClientes_ConsultarClientesMostrador]

	@CodEmpresa int = null,
	@Marca VARCHAR(50) = null,	
	@Centro VARCHAR(100) = null,	
	@FechaInicial VARCHAR(50)=null,
	@FechaFinal VARCHAR(50)=null		
	
AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	IF ( @FechaInicial is null AND @FechaFinal is null)
		BEGIN		
		    SET NOCOUNT ON
		    SET FMTONLY OFF
			
			SELECT ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS IdRegistro,  a.* 
			FROM
			(
			
			SELECT   
			   [CodigoEmpresa]
			  ,[Empresa]
			  ,[TipoDocumento]
			  ,[Documento]
			  ,[NombreCliente]
			  ,[telefono]
			  ,[Email]
			  ,[ciudad]
			  ,[Dirección]
			  ,[FechaNacimiento]
			  ,[Marca]
			  ,[Centro]
			  ,[Seccion]
			  ,[DescripcionReferencia]
			  ,[CedulaVendedorRepuestos]
			  ,[NombreVendedorRepuestos]
			  ,[FechaFactura]
			  ,[DescuentoCategoriaTarjeta]
			  ,[ValorNeto]
			FROM vw_DB_Clientes_Mostrador		
			WHERE   (
							  ( ( @CodEmpresa = Codigoempresa AND @CodEmpresa is not null ) OR (@CodEmpresa is null) )
					    AND   ( ( @Marca = Marca AND @Marca is not null ) OR (@Marca is null) )
						AND   ( ( @Centro = Centro AND @Centro is not null ) OR (@Centro is null) )		
											
					)
		    ) a
		END

	ELSE 
		BEGIN
		    SET NOCOUNT ON
		    SET FMTONLY OFF

			SELECT ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS IdRegistro,  a.* 
			
			FROM
			(

			SELECT  
			  [CodigoEmpresa]
			  ,[Empresa]
			  ,[TipoDocumento]
			  ,[Documento]
			  ,[NombreCliente]
			  ,[telefono]
			  ,[Email]
			  ,[ciudad]
			  ,[Dirección]
			  ,[FechaNacimiento]
			  ,[Marca]
			  ,[Centro]
			  ,[Seccion]
			  ,[DescripcionReferencia]
			  ,[CedulaVendedorRepuestos]
			  ,[NombreVendedorRepuestos]
			  ,[FechaFactura]
			  ,[DescuentoCategoriaTarjeta]
			  ,[ValorNeto]
			FROM vw_DB_Clientes_Mostrador		
			WHERE  (
							  (   @FechaInicial <= FechaFactura AND FechaFactura <= @FechaFinal   ) 
						AND   ( ( @CodEmpresa = Codigoempresa AND @CodEmpresa is not null ) OR (@CodEmpresa is null) )
						AND   ( ( @Marca = Marca AND @Marca is not null ) OR (@Marca is null) )
						AND   ( ( @Centro = Centro AND @Centro is not null ) OR (@Centro is null) )			
						
				   )
			) a
			
		END
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
END

```
