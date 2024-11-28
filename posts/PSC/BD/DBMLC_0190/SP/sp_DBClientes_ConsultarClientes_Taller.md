# Stored Procedure: sp_DBClientes_ConsultarClientes_Taller

## Usa los objetos:
- [[vw_DB_Clientes_Taller]]

```sql
CREATE PROCEDURE [dbo].[sp_DBClientes_ConsultarClientes_Taller]

	@CodEmpresa int = null,
	@Marca VARCHAR(50) = null,	
	@Centro VARCHAR(100) = null,	
	@Gama VARCHAR(50)=null,
	@Modelo VARCHAR(50) = null,
	@AñoModelo VARCHAR(10)=null,
	@KmsInicial INT,
	@KmsFinal INT,
	@TipoIntCargo VARCHAR(5) = null,
	@FechaInicial VARCHAR(50)=null,
	@FechaFinal VARCHAR(50)=null	
	
	
AS
   
BEGIN

 

	SET NOCOUNT ON
	SET FMTONLY OFF

	--SI selecciona FECHA FACTURA y SI SE INGRESAN KMS
	IF ( @FechaInicial is not null AND @FechaFinal is not null) AND (@KmsInicial is not null AND @KmsFinal is not null)

		BEGIN	
		
	SET NOCOUNT ON
	SET FMTONLY OFF
		 SELECT ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS IdRegistro,  a.* 
		 FROM
		 (
			SELECT   
	   [Codigoempresa]
      ,[Empresa]
      ,[TipoDocumento]
      ,[cedula]
      ,[NombreCliente]
      ,[Telefono]
      ,[ciudad]
      ,[Dirección_correspondencia]
      ,[Email]
      ,[cargo]
      ,[FechaNacimiento]
      ,[NombreMarca]
      ,[NombreGama]
      ,[Modelo]
      ,[AñoModelo]
      ,[VIN]
      ,[placa]
      ,[NombreClasificacion]
      ,[Combustible]
      ,[kmsactuales]
      ,[Centro]
      ,[seccion]
      ,[DescuentoCategoriaTarjeta]
      ,[DescripcionTrabajoTipos]
      ,[DescripcionMotivoEntrada]
      ,[DescripcionTrabajo]
      ,[NumOT]
      ,[NumeroFacturaTaller]
      ,[FechaFactura]
      ,[tipoOperacion]
      ,[TipoIntCargo]
      ,[CedulaVendedorRepuestos]
      ,[NombreVendedorRepuestos]
      ,[CedulaAsesorServicioResponsable]
      ,[AsesorServicioResponsable]
      ,[valor]
			FROM vw_DB_Clientes_Taller		
			WHERE   (
							  (   @FechaInicial <= FechaFactura AND FechaFactura <= @FechaFinal   ) 
						AND	  ( ( @CodEmpresa = Codigoempresa AND @CodEmpresa is not null ) OR (@CodEmpresa is null) )
					    AND   ( ( @Marca = NombreMarca AND @Marca is not null ) OR (@Marca is null) )
						AND   ( ( @Centro = Centro AND @Centro is not null ) OR (@Centro is null) )								
						AND   ( ( @Gama = NombreGama AND @Gama is not null ) OR (@Gama is null) )	
						AND   ( ( @Modelo = Modelo AND @Modelo is not null ) OR (@Modelo is null) )	
						AND   ( ( @AñoModelo = AñoModelo AND @AñoModelo is not null ) OR (@AñoModelo is null) )			
						AND   ( ( @TipoIntCargo = TipoIntCargo AND @TipoIntCargo is not null ) OR (@TipoIntCargo is null) )	
						AND   (   @KmsInicial <= kmsactuales AND kmsactuales <= @KmsFinal) 
											
					)
						 
		 ) a
		END

	--SI Selecciona FECHA FACTURA y NO SE INGRESAN KMS
	ELSE IF ( @FechaInicial is not null AND @FechaFinal is not null) AND (@KmsInicial is null AND @KmsFinal is null)
		BEGIN
		
	SET NOCOUNT ON
	SET FMTONLY OFF
		 SELECT ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS IdRegistro,  a.* 
		 FROM
		 (
			SELECT  
	   [Codigoempresa]
      ,[Empresa]
      ,[TipoDocumento]
      ,[cedula]
      ,[NombreCliente]
      ,[Telefono]
      ,[ciudad]
      ,[Dirección_correspondencia]
      ,[Email]
      ,[cargo]
      ,[FechaNacimiento]
      ,[NombreMarca]
      ,[NombreGama]
      ,[Modelo]
      ,[AñoModelo]
      ,[VIN]
      ,[placa]
      ,[NombreClasificacion]
      ,[Combustible]
      ,[kmsactuales]
      ,[Centro]
      ,[seccion]
      ,[DescuentoCategoriaTarjeta]
      ,[DescripcionTrabajoTipos]
      ,[DescripcionMotivoEntrada]
      ,[DescripcionTrabajo]
      ,[NumOT]
      ,[NumeroFacturaTaller]
      ,[FechaFactura]
      ,[tipoOperacion]
      ,[TipoIntCargo]
      ,[CedulaVendedorRepuestos]
      ,[NombreVendedorRepuestos]
      ,[CedulaAsesorServicioResponsable]
      ,[AsesorServicioResponsable]
      ,[valor]
			FROM vw_DB_Clientes_Taller		
			WHERE  (
							  (   @FechaInicial <= FechaFactura AND FechaFactura <= @FechaFinal   ) 
						AND   ( ( @CodEmpresa = Codigoempresa AND @CodEmpresa is not null ) OR (@CodEmpresa is null) )
						AND   ( ( @Marca = NombreMarca AND @Marca is not null ) OR (@Marca is null) )
						AND   ( ( @Centro = Centro AND @Centro is not null ) OR (@Centro is null) )		
						AND   ( ( @Gama = NombreGama AND @Gama is not null ) OR (@Gama is null) )	
						AND   ( ( @Modelo = Modelo AND @Modelo is not null ) OR (@Modelo is null) )	
						AND   ( ( @AñoModelo = AñoModelo AND @AñoModelo is not null ) OR (@AñoModelo is null) )	
						
				   )
         ) a 	
		END

	--NO SELECCIONA FECHA FACTURA Y SI SE INGRESAN KMS
		ELSE IF ( @FechaInicial is null AND @FechaFinal is null) AND (@KmsInicial is not null AND @KmsFinal is not null)
		BEGIN
		
	SET NOCOUNT ON
	SET FMTONLY OFF
		 SELECT ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS IdRegistro,  a.* 
		 FROM
		 (
			SELECT  
       [Codigoempresa]
      ,[Empresa]
      ,[TipoDocumento]
      ,[cedula]
      ,[NombreCliente]
      ,[Telefono]
      ,[ciudad]
      ,[Dirección_correspondencia]
      ,[Email]
      ,[cargo]
      ,[FechaNacimiento]
      ,[NombreMarca]
      ,[NombreGama]
      ,[Modelo]
      ,[AñoModelo]
      ,[VIN]
      ,[placa]
      ,[NombreClasificacion]
      ,[Combustible]
      ,[kmsactuales]
      ,[Centro]
      ,[seccion]
      ,[DescuentoCategoriaTarjeta]
      ,[DescripcionTrabajoTipos]
      ,[DescripcionMotivoEntrada]
      ,[DescripcionTrabajo]
      ,[NumOT]
      ,[NumeroFacturaTaller]
      ,[FechaFactura]
      ,[tipoOperacion]
      ,[TipoIntCargo]
      ,[CedulaVendedorRepuestos]
      ,[NombreVendedorRepuestos]
      ,[CedulaAsesorServicioResponsable]
      ,[AsesorServicioResponsable]
      ,[valor]
			FROM vw_DB_Clientes_Taller		
			WHERE  (							
						      ( ( @CodEmpresa = Codigoempresa AND @CodEmpresa is not null ) OR (@CodEmpresa is null) )
						AND   ( ( @Marca = NombreMarca AND @Marca is not null ) OR (@Marca is null) )
						AND   ( ( @Centro = Centro AND @Centro is not null ) OR (@Centro is null) )		
						AND   ( ( @Gama = NombreGama AND @Gama is not null ) OR (@Gama is null) )	
						AND   ( ( @Modelo = Modelo AND @Modelo is not null ) OR (@Modelo is null) )	
						AND   ( ( @AñoModelo = AñoModelo AND @AñoModelo is not null ) OR (@AñoModelo is null) )	
						AND   (   @KmsInicial <= kmsactuales AND kmsactuales <= @KmsFinal) 
						
				   )
         ) a 	
		END

	--NO SELECCIONA FECHA FACTURA Y NO SE INGRESAN KMS
	ELSE IF ( @FechaInicial is null AND @FechaFinal is null) AND (@KmsInicial is null AND @KmsFinal is null)
	BEGIN
	
	SET NOCOUNT ON
	SET FMTONLY OFF
	   SELECT ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS IdRegistro,  a.* 
	   FROM
		 (
		SELECT  
	   [Codigoempresa]
      ,[Empresa]
      ,[TipoDocumento]
      ,[cedula]
      ,[NombreCliente]
      ,[Telefono]
      ,[ciudad]
      ,[Dirección_correspondencia]
      ,[Email]
      ,[cargo]
      ,[FechaNacimiento]
      ,[NombreMarca]
      ,[NombreGama]
      ,[Modelo]
      ,[AñoModelo]
      ,[VIN]
      ,[placa]
      ,[NombreClasificacion]
      ,[Combustible]
      ,[kmsactuales]
      ,[Centro]
      ,[seccion]
      ,[DescuentoCategoriaTarjeta]
      ,[DescripcionTrabajoTipos]
      ,[DescripcionMotivoEntrada]
      ,[DescripcionTrabajo]
      ,[NumOT]
      ,[NumeroFacturaTaller]
      ,[FechaFactura]
      ,[tipoOperacion]
      ,[TipoIntCargo]
      ,[CedulaVendedorRepuestos]
      ,[NombreVendedorRepuestos]
      ,[CedulaAsesorServicioResponsable]
      ,[AsesorServicioResponsable]
      ,[valor]
		FROM vw_DB_Clientes_Taller		
		WHERE  (							
						    ( ( @CodEmpresa = Codigoempresa AND @CodEmpresa is not null ) OR (@CodEmpresa is null) )
					AND   ( ( @Marca = NombreMarca AND @Marca is not null ) OR (@Marca is null) )
					AND   ( ( @Centro = Centro AND @Centro is not null ) OR (@Centro is null) )		
					AND   ( ( @Gama = NombreGama AND @Gama is not null ) OR (@Gama is null) )	
					AND   ( ( @Modelo = Modelo AND @Modelo is not null ) OR (@Modelo is null) )	
					AND   ( ( @AñoModelo = AñoModelo AND @AñoModelo is not null ) OR (@AñoModelo is null) )	
					
						
				)
       ) a 	
	END
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
END

```
