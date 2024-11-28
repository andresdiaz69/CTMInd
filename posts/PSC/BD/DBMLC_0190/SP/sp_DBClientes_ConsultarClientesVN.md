# Stored Procedure: sp_DBClientes_ConsultarClientesVN

## Usa los objetos:
- [[vw_DB_Clientes_VN]]

```sql
CREATE PROCEDURE [dbo].[sp_DBClientes_ConsultarClientesVN]

	@CodEmpresa int = null,
	@Marca VARCHAR(50) = null,	
	@Centro VARCHAR(100) = null,	
	@Procedencia VARCHAR(50) = null,
	@ProcedenciaDetalle VARCHAR(50)=null,
	@Gama VARCHAR(50)=null,
	@Modelo VARCHAR(80)=null,
	@AñoModelo VARCHAR(10)=null,
	@FechaInicial VARCHAR(50)=null,
	@FechaFinal VARCHAR(50)=null		
	
AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	IF ( @FechaInicial is null AND @FechaFinal is null)
		BEGIN		
			SELECT   *
			FROM vw_DB_Clientes_VN		
			WHERE   (
							  ( ( @CodEmpresa = Codigoempresa AND @CodEmpresa is not null ) OR (@CodEmpresa is null) )
					    AND   ( ( @Marca = Marca AND @Marca is not null ) OR (@Marca is null) )
						AND   ( ( @Centro = Centro AND @Centro is not null ) OR (@Centro is null) )			
						AND   ( ( @Procedencia = UPPER(Procedencia) AND @Procedencia is not null) or (@Procedencia is null) )
						AND   ( ( @ProcedenciaDetalle = UPPER(Procedenciadetalle) AND @ProcedenciaDetalle is not null) or (@ProcedenciaDetalle is null) )
						AND   ( ( @Gama = Gama AND @Gama is not null ) OR (@Gama is null) )	
						AND   ( ( @Modelo = Modelo AND @Modelo is not null ) OR (@Modelo is null) )	
						AND   ( ( @AñoModelo = AñoModelo AND @AñoModelo is not null ) OR (@AñoModelo is null) )							
					)
		    
		END

	ELSE 
		BEGIN
			SELECT  *
			FROM vw_DB_Clientes_VN		
			WHERE  (
							  (   @FechaInicial <= FechaEntregaCliente AND FechaEntregaCliente <= @FechaFinal   ) 
						AND   ( ( @CodEmpresa = Codigoempresa AND @CodEmpresa is not null ) OR (@CodEmpresa is null) )
						AND   ( ( @Marca = Marca AND @Marca is not null ) OR (@Marca is null) )
						AND   ( ( @Centro = Centro AND @Centro is not null ) OR (@Centro is null) )			
						AND   ( ( @Procedencia = UPPER(Procedencia) AND @Procedencia is not null) or (@Procedencia is null) )
						AND   ( ( @ProcedenciaDetalle = UPPER(Procedenciadetalle) AND @ProcedenciaDetalle is not null) or (@ProcedenciaDetalle is null) )
						AND   ( ( @Gama = Gama AND @Gama is not null ) OR (@Gama is null) )	
						AND   ( ( @Modelo = Modelo AND @Modelo is not null ) OR (@Modelo is null) )	
						AND   ( ( @AñoModelo = AñoModelo AND @AñoModelo is not null ) OR (@AñoModelo is null) )	
				   )
			
		END
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
END

```
