# Stored Procedure: sp_CF_Consulta

## Usa los objetos:
- [[CF_Consulta]]
- [[CF_Datos]]

```sql





CREATE PROC [dbo].[sp_CF_Consulta]
@fechaInicial DATE,
@fechaFinal DATE,
@idEmpresa INT
AS
BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF
	
	TRUNCATE TABLE [CF_Consulta]

	INSERT INTO [CF_Consulta] (Fecha,IdEmpresa,IdLinea,IdCentro,N1,N2,N3,Valor)
	SELECT	*
	FROM	[CF_Datos]
	WHERE	Fecha >= @fechaInicial AND Fecha <= @fechaFinal AND IdEmpresa = @idEmpresa AND IdLinea <> '' 
END

```
