# Stored Procedure: sp_DBClientes_ConsultarClientesVO

## Usa los objetos:
- [[vw_DB_Clientes_VO]]

```sql
CREATE PROCEDURE [dbo].[sp_DBClientes_ConsultarClientesVO]

	@CodEmpresa int = null,
	@Centro VARCHAR(100) = null,	
	@Procedencia VARCHAR(50) = null,
	@ProcedenciaDetalle VARCHAR(50)=null,
	@FechaInicial VARCHAR(50)=null,
	@FechaFinal VARCHAR(50)=null		
	
AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

	IF ( @FechaInicial is null AND @FechaFinal is null)
		BEGIN		
			SELECT   *
			FROM vw_DB_Clientes_VO		
			WHERE   (
							  ( ( @CodEmpresa = Codigoempresa AND @CodEmpresa is not null ) OR (@CodEmpresa is null) )
						AND   ( ( @Centro = Centro AND @Centro is not null ) OR (@Centro is null) )
						AND   ( ( @Procedencia = Procedencia AND @Procedencia is not null) or (@Procedencia is null) )
						AND   ( ( @ProcedenciaDetalle = Procedenciadetalle AND @ProcedenciaDetalle is not null) or (@ProcedenciaDetalle is null) )
					)
		END

	ELSE 
		BEGIN
			SELECT  *
			FROM vw_DB_Clientes_VO		
			WHERE  (
							  (   @FechaInicial <= FechaEntregaCliente AND FechaEntregaCliente <= @FechaFinal   ) 
						AND   ( ( @CodEmpresa = Codigoempresa AND @CodEmpresa is not null ) OR (@CodEmpresa is null) )
						AND   ( ( @Centro = Centro AND @Centro is not null ) OR (@Centro is null) )
						AND   ( ( @Procedencia = Procedencia AND @Procedencia is not null) or (@Procedencia is null) )
						AND   ( ( @ProcedenciaDetalle = Procedenciadetalle AND @ProcedenciaDetalle is not null) or (@ProcedenciaDetalle is null) )
				   )
			ORDER BY FechaEntregaCliente
		END
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
END

```
